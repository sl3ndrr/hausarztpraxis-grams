export function weekdayInZone(date, timeZone) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short"
  }).format(date);
}

const board = globalThis.document?.querySelector("[data-time-zone]");

if (board) {
  const day = weekdayInZone(new Date(), board.dataset.timeZone);
  const today = board.querySelector(`[data-weekday="${day}"]`);
  if (today) {
    today.classList.add("is-today");
    today.querySelector(".today-label").hidden = false;
  }
}
