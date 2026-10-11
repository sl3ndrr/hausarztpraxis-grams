/**
 * Semantische Brotkrumennavigation mit eindeutiger aktueller Seite.
 * Eingaben: bestätigte Linktexte und Ziele; Startseite aus presentation.js.
 * Reihenfolge in der aufrufenden View pflegen; keine globale DOM-Verbindung.
 */
import { presentation } from '../../content/presentation.js';
import { h } from '../lib/dom.js';
export function breadcrumbs(items) {
  return h('nav', { className: 'breadcrumbs', 'aria-label': presentation.breadcrumb }, h('ol', {},
    [{ text: presentation.home, href: '#/' }, ...items].map((item, index, all) => h('li', {},
      index === all.length - 1 ? h('span', { 'aria-current': 'page' }, item.text) : h('a', { href: item.href }, item.text)))));
}
