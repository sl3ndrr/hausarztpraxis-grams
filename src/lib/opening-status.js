/**
 * Reine Statusberechnung für reguläre Zeiten, ohne DOM und ohne Texte.
 * Eingaben: Zeitpunkt, Wochenplan und IANA-Zeitzone; Berlin über Intl.
 * Zeiten in content/hours.js ändern; Grenzfälle hier und in Tests prüfen.
 */
export function localParts(now, timeZone) {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(now);
  const values = Object.fromEntries(parts.filter(p => p.type !== 'literal').map(p => [p.type, Number(p.value)]));
  const weekday = new Date(Date.UTC(values.year, values.month - 1, values.day)).getUTCDay() || 7;
  return { ...values, weekday, minutes: values.hour * 60 + values.minute };
}
export function minutesOf(time) { const [hour, minute] = time.split(':').map(Number); return hour * 60 + minute; }
export function openingStatus(now, schedule, timeZone) {
  const local = localParts(now, timeZone);
  for (let daysAhead = 0; daysAhead < 8; daysAhead++) {
    const weekday = (local.weekday - 1 + daysAhead) % 7 + 1;
    const day = schedule.find(entry => entry.weekday === weekday);
    for (const [start, end] of day?.intervals ?? []) {
      if (daysAhead === 0 && local.minutes >= minutesOf(start) && local.minutes < minutesOf(end)) return { open: true, until: end, weekday: local.weekday };
      if (daysAhead > 0 || local.minutes < minutesOf(start)) return { open: false, weekday: local.weekday, next: { daysAhead, weekday, label: day.label, start } };
    }
  }
  return { open: false, weekday: local.weekday, next: null };
}
export function formatTime(time) { return time.replace(/^0/, ''); }
