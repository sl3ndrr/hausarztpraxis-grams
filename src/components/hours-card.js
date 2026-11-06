/**
 * Gemeinsame Tabelle für Wochenplan, Footer und Praxiskarte.
 * Eingaben: zentrale Sprechzeiten und Beschriftungen.
 * Zeiten in content/hours.js ändern, die Druckkarte nutzt die Werktage.
 */
import { hours, weekend } from '../../content/hours.js';
import { ui } from '../../content/site.js';
import { presentation } from '../../content/presentation.js';
import { h } from '../lib/dom.js';
import { formatTime } from '../lib/opening-status.js';

export function hoursTable({ fullWeek = false } = {}) {
  const days = fullWeek ? [...hours, ...weekend] : hours;
  const rows = days.map(day => h('tr', { 'data-weekday': day.weekday },
    h('th', { scope: 'row' }, day.label,
      fullWeek && h('span', { className: 'weekday-marker', hidden: true }, ` ${ui.today}`)),
    h('td', {}, day.intervals.length
      ? day.intervals.map(([start, end]) => h('span', {}, `${formatTime(start)} ${ui.until} ${formatTime(end)}`))
      : presentation.closedDay)));

  return h('table', { className: 'hours-table' },
    h('caption', { className: 'sr-only' }, ui.hours),
    h('thead', { className: 'sr-only' }, h('tr', {}, h('th', { scope: 'col' }, ui.day), h('th', { scope: 'col' }, ui.time))),
    h('tbody', {}, rows));
}
