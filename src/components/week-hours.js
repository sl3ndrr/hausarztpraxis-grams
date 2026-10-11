/**
 * Lesbare Wochenzeiten mit ergänzenden Balken, Heute-Text und Jetzt-Marke.
 * Eingaben: hours/weekend und reine Geometrie; exakte Zeiten bleiben sichtbar.
 * Keine Daten duplizieren; Timer durch die aufrufende View beenden.
 */
import { hours, weekend, timeZone } from '../../content/hours.js';
import { ui } from '../../content/site.js';
import { presentation } from '../../content/presentation.js';
import { h } from '../lib/dom.js';
import { localParts, formatTime } from '../lib/opening-status.js';
import { weekScale, weekSegments, nowPosition } from '../lib/week-segments.js';
export function weekHours() {
  const scale = weekScale(hours);
  const rows = [...hours, ...weekend].map(day => {
    const today = h('span', { className: 'week-hours__today', hidden: true }, ui.today);
    const marker = h('span', { className: 'week-hours__now', hidden: true }, h('span', {}, presentation.now));
    const segments = weekSegments(day.intervals, scale).map(segment => {
      const bar = h('span', { className: 'week-hours__segment' });
      bar.style.left = `${segment.left}%`; bar.style.width = `${segment.width}%`; return bar;
    });
    const element = h('li', { className: 'week-hours__day' }, h('div', { className: 'week-hours__label' }, h('strong', {}, day.label), today),
      h('div', { className: 'week-hours__times' }, day.intervals.length ? day.intervals.map(([start, end]) => h('span', {}, `${formatTime(start)}–${formatTime(end)}`)) : presentation.closedDay),
      h('div', { className: 'week-hours__track', 'aria-hidden': 'true' }, segments, marker));
    return { day, element, today, marker };
  });
  const element = h('section', { className: 'week-hours', 'aria-label': ui.hours }, h('h2', {}, ui.hours), h('ol', { className: 'week-hours__list' }, rows.map(row => row.element)), h('p', { className: 'small' }, ui.statusNote));
  function update() {
    const local = localParts(new Date(), timeZone);
    rows.forEach(row => {
      const current = row.day.weekday === local.weekday;
      row.element.toggleAttribute('data-current-day', current); row.today.hidden = !current;
      const position = current ? nowPosition(local.minutes, scale) : null;
      row.marker.hidden = position === null;
      if (position !== null) { row.marker.style.left = `${position}%`; row.marker.toggleAttribute('data-leading', position < 50); }
    });
  }
  update(); const timer = setInterval(update, 30000);
  return { element, destroy: () => clearInterval(timer) };
}
