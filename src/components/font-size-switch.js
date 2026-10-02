/**
 * Große Schalter für drei Schriftstufen.
 * Eingaben: UI-Texte; Zustand in behaviors/font-size.js.
 * Stufen in tokens.css und Schriftlogik ändern.
 */
import { ui } from '../../content/site.js';
import { h } from '../lib/dom.js';
export function fontSizeSwitch() {
  return h('div', { className: 'font-switch', role: 'group', 'aria-label': ui.font },
    h('button', { type: 'button', 'aria-label': ui.smaller, 'data-font-step': '-1' }, 'A−'),
    h('button', { type: 'button', 'aria-label': ui.larger, 'data-font-step': '1' }, 'A+'));
}
