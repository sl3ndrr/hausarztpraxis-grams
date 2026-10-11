/**
 * Offene Leistungskapitel mit Sticky-Ankern, Breadcrumbs und nächstem Bereich.
 * Eingaben: zentrale Leistungsabschnitte und optionale Zusatzkapitel.
 * Jeder Text ist standardmäßig sichtbar; Deep-Anker stabil halten.
 */
import { ui } from '../../content/site.js';
import { overview } from '../../content/services/overview.js';
import { presentation } from '../../content/presentation.js';
import { h, pageHeading, list } from '../lib/dom.js';
import { ageBar } from './age-stages.js';
import { breadcrumbs } from './breadcrumbs.js';
import { icon } from './icons.js';
export function serviceDetail(data, extra = []) {
  const index = overview.cards.findIndex(card => card.accent === data.accent);
  const current = overview.cards[index];
  const next = overview.cards[index + 1] ?? { title: ui.showServices, href: '#/leistungen', accent: 'health' };
  const chapters = [...data.sections, ...extra];
  const nav = h('nav', { className: `chapter-nav accent--${data.accent}`, 'aria-label': presentation.chapters }, h('p', { className: 'eyebrow' }, presentation.chapters),
    h('ol', {}, chapters.map(section => h('li', {}, h('a', { href: `${current.href}?section=${section.id}`, 'data-chapter-link': '' }, section.title)))));
  const content = chapters.map((section, index) => h('section', { className: 'chapter', id: section.id, tabindex: '-1' },
    h('span', { className: `chapter__number accent--${data.accent}`, 'aria-hidden': 'true' }, String(index + 1).padStart(2, '0')),
    h('h2', {}, section.title), section.text && h('p', { className: 'lead' }, section.text), section.items && list(section.items), section.steps && ageBar(section.steps), section.content));
  return { element: h('div', { className: 'container page' }, breadcrumbs([{ text: ui.showServices, href: '#/leistungen' }, { text: current.title }]),
    h('div', { className: `service-heading accent--${data.accent}` }, pageHeading(data)),
    h('div', { className: 'chapter-layout' }, nav, h('div', { className: 'chapter-content' }, content,
      h('a', { className: `next-area accent--${next.accent}`, href: next.href }, h('span', { className: 'small' }, presentation.next), h('strong', {}, next.title), icon('arrow'))))) };
}
