/**
 * Reine Wochenbalken-Geometrie und Jetzt-Position ohne Gestaltung oder Texte.
 * Eingaben: Intervalle und Berliner lokale Zeitanteile.
 * Zeitgrenzen aus dem Plan ableiten; Grenzfälle in tests/ pflegen.
 */
import { minutesOf } from './opening-status.js';
export function weekScale(schedule) {
  const values = schedule.flatMap(day => day.intervals.flatMap(pair => pair.map(minutesOf)));
  return values.length ? { start: Math.min(...values), end: Math.max(...values) } : { start: 0, end: 1440 };
}
export function weekSegments(intervals, scale) {
  const span = scale.end - scale.start;
  if (span <= 0) return [];
  return intervals.map(([start, end]) => ({ start, end, left: (minutesOf(start) - scale.start) / span * 100, width: (minutesOf(end) - minutesOf(start)) / span * 100 }));
}
export function nowPosition(minutes, scale) {
  return scale.end > scale.start && minutes >= scale.start && minutes <= scale.end ? (minutes - scale.start) / (scale.end - scale.start) * 100 : null;
}
