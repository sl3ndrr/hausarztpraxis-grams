/**
 * Tastaturbedienbare lokale Suche mit sichtbarer Trefferzahl und Deep-Links.
 * Eingaben: zentraler Suchindex und Bedientexte; keine Speicherung.
 * Ergebnisse entstehen ausschließlich mit h(); keine externen Dienste.
 */
import { searchSources } from '../../content/search.js';
import { qualifications, privateProcedures } from '../../content/qualifications.js';
import { presentation } from '../../content/presentation.js';
import { h } from '../lib/dom.js';
import { serviceIndex, filterServices } from '../lib/service-search.js';
export function serviceSearch(id) {
  const index = serviceIndex(searchSources, qualifications, privateProcedures);
  const input = h('input', { type: 'search', id: `${id}-query`, autocomplete: 'off', 'aria-describedby': `${id}-hint ${id}-count` });
  const count = h('p', { id: `${id}-count`, className: 'small', role: 'status', 'aria-live': 'polite', 'aria-atomic': 'true' });
  const results = h('ul', { className: 'service-search__results' });
  const empty = h('p', { hidden: true }, presentation.searchEmpty);
  let showAll = false;
  const render = () => {
    const ready = Boolean(input.value.trim()) || showAll;
    const matches = ready ? filterServices(index, input.value) : [];
    count.textContent = ready ? `${presentation.searchCount} ${matches.length}` : `${presentation.searchReady} ${index.length}`;
    results.replaceChildren(matches.map(entry => h('li', {}, h('a', { href: entry.href, className: `accent--${entry.accent}` }, h('strong', {}, entry.title), h('span', {}, entry.category)))));
    empty.hidden = !ready || matches.length > 0;
  };
  input.addEventListener('input', render);
  const all = h('button', { type: 'button', className: 'button button--quiet', onclick: () => { input.value = ''; showAll = true; render(); input.focus(); } }, presentation.searchAll);
  const clear = h('button', { type: 'button', className: 'button button--quiet', onclick: () => { input.value = ''; showAll = false; render(); input.focus(); } }, presentation.searchReset);
  render();
  return h('section', { className: 'service-search card', 'data-service-search': '' }, h('label', { for: input.id }, presentation.search),
    h('p', { className: 'small', id: `${id}-hint` }, presentation.searchHint), input, h('div', { className: 'button-row' }, all, clear), count, empty, results);
}
