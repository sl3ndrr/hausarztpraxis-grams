/**
 * Offener Eintrag im Leistungsverzeichnis.
 * Eingaben: zentraler Bereich und optionale Links zu dessen Kapiteln.
 * Angebotsbeschreibungen und Ziele ausschließlich in content/ pflegen.
 */
import { h, list } from '../lib/dom.js';

export function serviceCard(data, { heading = 'h3', links = [] } = {}) {
  return h('article', { className: 'service-card' },
    h(heading, {}, h('a', { className: 'text-link', href: data.href }, data.title)),
    h('div', { className: 'service-card__content' },
      h('p', {}, data.text), data.items && list(data.items),
      links.length > 0 && h('ul', { className: 'service-card__links' }, links.map(link =>
        h('li', {}, h('a', { className: 'text-link', href: link.href }, link.title))))));
}
