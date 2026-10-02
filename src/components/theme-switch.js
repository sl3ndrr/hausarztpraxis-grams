/**
 * Beschriftete Radio-Gruppe für Automatisch, Hell und Dunkel.
 * Eingaben: allgemeine UI-Texte; Verhalten zentral in behaviors/theme.js.
 * Beschriftungen in content/site.js ändern.
 */
import { ui } from '../../content/site.js';
import { h } from '../lib/dom.js';
export function themeSwitch(id) {
  return h('fieldset', { className: 'theme-switch', 'data-theme-switch': '' }, h('legend', {}, ui.theme),
    h('div', { className: 'theme-switch__options' }, ui.themes.map(option => h('label', {},
      h('input', { type: 'radio', name: `theme-${id}`, value: option.value, 'data-theme-choice': '', checked: option.value === 'auto' }), h('span', {}, option.text)))));
}
