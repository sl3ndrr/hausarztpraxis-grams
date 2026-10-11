/**
 * Live-Status aus der vorhandenen reinen Öffnungslogik, mit sichtbarer Grundlage.
 * Eingaben: zentraler Wochenplan, Zeitzone und UI-Beschriftungen.
 * Reguläre Zeiten in content/ ändern; Timer beim Entfernen beenden.
 */
import { hours, timeZone } from '../../content/hours.js';
import { ui } from '../../content/site.js';
import { presentation } from '../../content/presentation.js';
import { h } from '../lib/dom.js';
import { openingStatus, formatTime } from '../lib/opening-status.js';
export function liveStatus() {
  const chip = h('p', { className: 'live-status__chip', role: 'status', 'aria-live': 'polite', 'aria-atomic': 'true' });
  const element = h('div', { className: 'live-status', 'aria-label': presentation.statusLabel }, chip, h('p', { className: 'small live-status__note' }, ui.statusNote));
  function update() {
    const status = openingStatus(new Date(), hours, timeZone);
    const day = status.next?.daysAhead === 0 ? ui.today : status.next?.daysAhead === 1 ? ui.tomorrow : status.next?.label;
    const text = status.open ? `${ui.open} ${ui.until} ${formatTime(status.until)} ${ui.clock}` : status.next ? `${ui.closed} · ${day} ${ui.from} ${formatTime(status.next.start)} ${ui.clock}` : `${ui.closed}. ${ui.noHours}`;
    if (chip.textContent !== text) chip.textContent = text;
    chip.dataset.open = String(status.open);
  }
  update();
  const timer = setInterval(update, 30000);
  return { element, destroy: () => clearInterval(timer) };
}
