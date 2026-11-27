export function weekdayInZone(date, timeZone) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short"
  }).format(date);
}

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const clockPattern = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
const calendarPattern = /^\d{4}-\d{2}-\d{2}$/;

function minuteOfDay(time) {
  if (typeof time !== "string" || !clockPattern.test(time)) throw new RangeError("Ungültige Uhrzeit");
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

function normalizeIntervals(intervals) {
  const slots = [];
  for (const interval of intervals) {
    if (!Array.isArray(interval) || interval.length !== 2) throw new RangeError("Ungültiges Zeitintervall");
    const [start, end] = interval;
    const from = minuteOfDay(start);
    const until = minuteOfDay(end);
    const previous = slots.at(-1);
    if (until <= from || (previous && previous.until > from)) throw new RangeError("Ungeordnete Zeitintervalle");
    if (previous?.until === from) {
      previous.end = end;
      previous.until = until;
    } else {
      slots.push({ start, end, from, until });
    }
  }
  return slots;
}

function calendarDate(date) {
  if (typeof date !== "string" || !calendarPattern.test(date)) throw new RangeError("Ungültiges Kalenderdatum");
  const day = new Date(`${date}T00:00:00Z`);
  if (day.toISOString().slice(0, 10) !== date) throw new RangeError("Ungültiges Kalenderdatum");
  return day;
}

function normalizeSchedule({ timeZone, hours, hoursExceptions = [], holidays }) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone, year: "numeric", month: "2-digit", day: "2-digit", weekday: "short",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23"
  });
  const dateFormatter = new Intl.DateTimeFormat("de-DE", {
    timeZone, weekday: "long", day: "numeric", month: "long", year: "numeric"
  });
  if (!timeZone || hours.length !== weekdays.length || !Array.isArray(holidays.years)) {
    throw new RangeError("Unvollständiger Wochenplan oder Feiertagskalender");
  }
  const week = new Map();
  for (const { day, name, morning, afternoon } of hours) {
    if (!weekdays.includes(day) || week.has(day) || !name) throw new RangeError("Ungültiger Wochentag");
    week.set(day, { name, slots: normalizeIntervals([morning, afternoon].filter(slot => slot !== undefined)) });
  }
  const calendarYears = new Set(holidays.years);
  for (const year of calendarYears) {
    if (!Number.isInteger(year) || year < 1000 || year > 9999) throw new RangeError("Ungültiges Kalenderjahr");
  }
  const holidayDates = new Map(Object.entries(holidays.dates));
  for (const [date, name] of holidayDates) {
    if (!calendarYears.has(calendarDate(date).getUTCFullYear()) || typeof name !== "string" || !name.trim()) {
      throw new RangeError("Ungültiger Feiertag");
    }
  }
  const exceptions = new Map();
  for (const { date, intervals, note = "" } of hoursExceptions) {
    calendarDate(date);
    if (exceptions.has(date) || !Array.isArray(intervals) || typeof note !== "string") {
      throw new RangeError("Ungültige Praxisabweichung");
    }
    exceptions.set(date, { slots: normalizeIntervals(intervals), note });
  }
  return { formatter, dateFormatter, week, calendarYears, holidayDates, exceptions };
}

function planForDate(plan, date, weekday) {
  const exception = plan.exceptions.get(date);
  if (exception) return { source: "exception", ...exception };
  if (!plan.calendarYears.has(Number(date.slice(0, 4)))) return { source: "uncovered", slots: [] };
  const holiday = plan.holidayDates.get(date);
  if (holiday) return { source: "holiday", slots: [], note: holiday };
  return { source: "regular", slots: plan.week.get(weekday).slots };
}

function nextOpening(plan, date) {
  // This cursor represents the local calendar, not the instant of Berlin midnight.
  const cursor = calendarDate(date);
  while (cursor.getUTCFullYear() < 10000) {
    cursor.setUTCDate(cursor.getUTCDate() + 1);
    const weekday = weekdays[cursor.getUTCDay()];
    const future = planForDate(plan, cursor.toISOString().slice(0, 10), weekday);
    if (future.source === "holiday" || future.source === "uncovered") break;
    if (future.slots.length) {
      const label = future.source === "regular" ? "Nächste reguläre Sprechstunde" : "Nächste Sonderöffnung";
      return `${label} ${plan.week.get(weekday).name}, ${future.slots[0].start} Uhr.`;
    }
  }
  return "Bitte klären Sie die nächste Sprechstunde telefonisch.";
}

function statusForDate(now, plan) {
  const parts = Object.fromEntries(plan.formatter.formatToParts(now).map(({ type, value }) => [type, value]));
  const { year, month, day, weekday, hour, minute } = parts;
  const date = `${year}-${month}-${day}`;
  const time = `${hour}:${minute}`;
  const currentMinute = minuteOfDay(time);
  const { source, slots, note } = planForDate(plan, date, weekday);
  const today = {
    date, weekday, time, dateLabel: plan.dateFormatter.format(now),
    intervals: slots.map(({ start, end }) => [start, end]), note
  };
  if (source === "uncovered") {
    return {
      ...today, state: "calendar-uncovered", title: "Reguläre Sprechzeiten",
      detail: "Für dieses Jahr fehlt ein vollständiger Feiertagskalender. Bitte klären Sie die Sprechzeiten telefonisch."
    };
  }
  if (source === "holiday") {
    return { ...today, state: "holiday", title: "Feiertag", detail: "Sprechzeiten bitte telefonisch klären." };
  }
  const special = source === "exception";
  if (!slots.length) {
    return {
      ...today, state: "closed", title: special ? "Praxis geschlossen" : "Heute regulär geschlossen",
      detail: nextOpening(plan, date)
    };
  }
  const active = slots.find(({ from, until }) => currentMinute >= from && currentMinute < until);
  if (active) {
    const remaining = active.until - currentMinute;
    return {
      ...today, state: "open", title: special ? "Sonderöffnung · geöffnet" : "Laut Wochenplan geöffnet",
      detail: `Schließt um ${active.end} Uhr.`,
      countdown: remaining < 60 ? `Schließt in ${remaining} ${remaining === 1 ? "Minute" : "Minuten"}.` : ""
    };
  }
  const next = slots.find(({ from }) => currentMinute < from);
  if (!next) {
    return { ...today, state: "ended", title: special ? "Sonderöffnung beendet" : "Heute beendet", detail: nextOpening(plan, date) };
  }
  if (next === slots[0]) {
    return {
      ...today, state: "before", title: special ? "Sonderöffnung · noch geschlossen" : "Vor der Sprechstunde",
      detail: `Heute ab ${next.start} Uhr.`
    };
  }
  return {
    ...today, state: "break", title: special ? "Sonderöffnung · Sprechstundenpause" : "Mittagspause",
    detail: `Heute wieder ab ${next.start} Uhr.`
  };
}

export function getScheduleStatus(now, schedule) {
  try {
    if (!(now instanceof Date) || !Number.isFinite(now.getTime())) return null;
    return statusForDate(now, normalizeSchedule(schedule));
  } catch (error) {
    if (error instanceof RangeError || error instanceof TypeError) return null;
    throw error;
  }
}

function readIntervals(scope) {
  return [...scope.querySelectorAll("[data-start][data-end]")].map(({ dataset }) => [dataset.start, dataset.end]);
}

function readSchedule(board, rows) {
  return {
    timeZone: board.dataset.timeZone,
    hours: rows.map(row => {
      const periods = [...row.querySelectorAll("[data-period]")];
      return {
        day: row.dataset.weekday,
        name: row.dataset.dayName,
        ...Object.fromEntries(periods.map(({ dataset }) => [dataset.period, [dataset.start, dataset.end]]))
      };
    }),
    hoursExceptions: [...board.querySelectorAll("[data-schedule-exception]")].map(entry => ({
      date: entry.dataset.scheduleException,
      intervals: entry.hasAttribute("data-unknown-hours") ? undefined : readIntervals(entry),
      note: entry.querySelector("[data-exception-note]")?.textContent.trim() ?? ""
    })),
    holidays: {
      years: board.dataset.calendarYears ? board.dataset.calendarYears.split(",").map(Number) : [],
      dates: Object.fromEntries([...board.querySelectorAll("[data-holiday]")].map(({ dataset }) => [dataset.holiday, dataset.holidayName]))
    }
  };
}

function setText(element, value = "", visible = Boolean(value)) {
  if (element.textContent !== value) element.textContent = value;
  element.hidden = !visible;
}

function enhanceSchedule(board) {
  const rows = [...board.querySelectorAll("[data-weekday]")];
  const plan = normalizeSchedule(readSchedule(board, rows));
  const date = board.querySelector("[data-schedule-date]");
  const status = board.querySelector("[data-schedule-status]");
  const title = board.querySelector("[data-status-title]");
  const detail = board.querySelector("[data-status-detail]");
  const countdown = board.querySelector("[data-status-countdown]");
  const note = board.querySelector("[data-status-note]");
  const todayHours = board.querySelector("[data-today-hours]");
  const announcement = board.querySelector("[data-schedule-announcement]");
  const toggle = board.querySelector("[data-schedule-toggle]");
  const pausedAt = board.querySelector("[data-schedule-paused]");
  const todayLabels = rows.map(row => row.querySelector(".today-label"));
  if ([date, status, title, detail, countdown, note, todayHours, announcement, toggle, pausedAt, ...todayLabels].some(element => !element)) return;

  const document = board.ownerDocument;
  let timer;
  let paused = false;
  let lastStatus;
  let lastAnnouncement;

  function render(next) {
    date.dataset.date = next.date;
    setText(date, next.dateLabel);
    status.dataset.state = next.state;
    setText(title, next.title);
    setText(detail, next.detail, !next.countdown);
    setText(countdown, next.countdown);
    setText(note, next.note);
    const intervals = next.intervals.map(interval => interval.join("–")).join(" und ");
    setText(todayHours, intervals ? `Heute ${intervals} Uhr` : "");

    if (lastStatus?.weekday !== next.weekday) {
      for (const [index, row] of rows.entries()) {
        const today = row.dataset.weekday === next.weekday;
        row.classList.toggle("is-today", today);
        todayLabels[index].hidden = !today;
      }
    }
    const message = [`${next.title}.`, next.detail, next.note].filter(Boolean).join(" ");
    if (lastAnnouncement && lastAnnouncement !== message) announcement.textContent = message;
    lastAnnouncement = message;
    lastStatus = next;
  }

  function refresh() {
    clearTimeout(timer);
    if (paused || (document.hidden && lastStatus)) return;
    const now = new Date();
    render(statusForDate(now, plan));
    if (!document.hidden) timer = setTimeout(refresh, 60_000 - now.getTime() % 60_000);
  }

  refresh();
  toggle.hidden = false;
  toggle.addEventListener("click", () => {
    paused = !paused;
    toggle.textContent = paused ? "Automatische Aktualisierung fortsetzen" : "Automatische Aktualisierung pausieren";
    setText(pausedAt, paused ? `Stand ${lastStatus.time} Uhr · automatische Aktualisierung pausiert.` : "");
    refresh();
  });
  document.addEventListener("visibilitychange", refresh);
}

const board = globalThis.document?.querySelector("[data-schedule]");
if (board) {
  try {
    enhanceSchedule(board);
  } catch (error) {
    if (!(error instanceof RangeError || error instanceof TypeError)) throw error;
  }
}
