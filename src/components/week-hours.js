/**
 * Vollständige Woche als Tabelle mit dem aktuellen regulären Praxisstatus.
 * Eingaben: gemeinsame Zeitentabelle und Berliner Öffnungslogik.
 * Beim Unmount den Status-Timer beenden.
 */
import { ui } from '../../content/site.js';
import { h } from '../lib/dom.js';
import { hoursTable } from './hours-card.js';
import { liveStatus } from './live-status.js';

export function weekHours() {
  const table = hoursTable({ fullWeek: true });
  const rows = table.querySelectorAll('[data-weekday]');
  const status = liveStatus({
    onUpdate: ({ weekday }) => {
      for (const row of rows) {
        const today = Number(row.getAttribute('data-weekday')) === weekday;
        row.toggleAttribute('data-current-day', today);
        row.querySelector('.weekday-marker').hidden = !today;
      }
    }
  });

  return {
    element: h('section', { className: 'week-hours', 'aria-labelledby': 'hours-title' },
      h('h2', { id: 'hours-title' }, ui.hours), status.element, table),
    destroy: status.destroy
  };
}
