/**
 * Direkte Wege zu den häufigsten Anliegen.
 * Eingaben: Startseiten-Ziele und Demo-Hinweise aus content/.
 * Medizinische Schnelllinks erscheinen im zugehörigen Leistungsbereich.
 */
import { home } from '../../content/home.js';
import { h } from '../lib/dom.js';

export function concerns() {
  const items = home.shortcuts.filter(item => !item.area);
  return h('section', { className: 'container section concerns', id: 'concerns', tabindex: '-1' },
    h('h2', { id: 'concerns-title' }, home.shortcutsTitle),
    h('nav', { 'aria-labelledby': 'concerns-title' },
      h('ul', { className: 'concerns__list' }, items.map(item =>
        h('li', {}, h('a', { className: 'concerns__link', href: item.href },
          h('strong', {}, item.title), item.text && h('span', {}, item.text)))))));
}
