/**
 * Großflächig bedienbares Akkordeon mit eigener Region.
 * Eingaben: stabile ID, Titel und DOM-Inhalt; keine globale Zustandsmutation.
 * Inhalte im content-Modul und Animation in motion.css ändern.
 */
import { h } from '../lib/dom.js';
export function accordion(id, title, content) {
  const panel = h('div', { id: `${id}-panel`, role: 'region', 'aria-labelledby': `${id}-button`, className: 'accordion__panel', hidden: true }, content);
  const mark = h('span', { className: 'accordion__mark', 'aria-hidden': 'true' }, '+');
  const button = h('button', { type: 'button', id: `${id}-button`, 'aria-expanded': 'false', 'aria-controls': `${id}-panel`, className: 'accordion__button' }, h('span', {}, title), mark);
  button.addEventListener('click', () => { const open = button.getAttribute('aria-expanded') !== 'true'; button.setAttribute('aria-expanded', String(open)); panel.hidden = !open; mark.textContent = open ? '−' : '+'; });
  return h('section', { className: 'accordion', 'data-reveal': '' }, h('h2', {}, button), panel);
}
