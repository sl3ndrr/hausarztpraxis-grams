/**
 * Immer sichtbare Zeiten mit lokal berechnetem Live-Status.
 * Eingaben: hours/practice/UI und reine opening-status-Funktion.
 * Zeiten in content/hours.js ändern; Intervall bei Unmount unbedingt aufräumen.
 */
import { hours, timeZone } from '../../content/hours.js';
import { ui } from '../../content/site.js';
import { h } from '../lib/dom.js';
import { openingStatus, formatTime } from '../lib/opening-status.js';
export function hoursTable() {
  return h('table', { className: 'hours-table' }, h('caption', { className: 'sr-only' }, ui.hours),
    h('thead', { className: 'sr-only' }, h('tr', {}, h('th', { scope: 'col' }, ui.day), h('th', { scope: 'col' }, ui.time))),
    h('tbody', {}, hours.map(day => h('tr', { 'data-weekday': day.weekday }, h('th', { scope: 'row' }, day.label), h('td', {}, day.intervals.map(([start, end]) => h('span', {}, `${formatTime(start)}–${formatTime(end)}`)))))));
}
export function hoursCard() {
  const label = h('p', { className: 'hours-card__status', role: 'status', 'aria-live': 'polite' });
  const table = hoursTable();
  const root = h('section', { className: 'card hours-card', 'aria-labelledby': 'hours-title' }, h('h2', { id: 'hours-title' }, ui.hours), label, table, h('p', { className: 'small hours-card__note' }, ui.statusNote));
  function update() {
    const status = openingStatus(new Date(), hours, timeZone);
    const nextDay = status.next?.daysAhead === 0 ? ui.today : status.next?.daysAhead === 1 ? ui.tomorrow : status.next?.label;
    const text = status.open ? `${ui.open} – ${ui.until} ${formatTime(status.until)} ${ui.clock}` : status.next ? `${ui.closed} – ${nextDay} ${ui.again} ${ui.from} ${formatTime(status.next.start)} ${ui.clock}` : `${ui.closed}. ${ui.noHours}`;
    if (label.textContent !== text) label.textContent = text;
    label.dataset.open = String(status.open);
    table.querySelectorAll('[data-weekday]').forEach(row => row.toggleAttribute('data-current-day', Number(row.dataset.weekday) === status.weekday));
  }
  update();
  const timer = setInterval(update, 30000);
  return { element: root, destroy: () => clearInterval(timer) };
}
