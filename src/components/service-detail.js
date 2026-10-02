/**
 * Gemeinsamer Aufbau aller Leistungs-Detailseiten.
 * Eingaben: Abschnitte mit Text, Listen oder Zeitleisten.
 * Leistungen ausschließlich in content/services/ ergänzen.
 */
import { ui } from '../../content/site.js';
import { h, pageHeading, list } from '../lib/dom.js';
import { accordion } from './accordion.js';
import { timeline } from './timeline.js';
export function serviceDetail(data, extra = []) {
  const content = data.sections.map(section => accordion(section.id, section.title,
    h('div', { className: 'prose' }, h('p', {}, section.text), section.items && list(section.items), section.steps && timeline(section.steps))));
  return { element: h('div', { className: 'container page page--reading' }, pageHeading(data), h('a', { href: '#/leistungen', className: 'text-link' }, ui.showServices), h('div', { className: 'accordion-list' }, content, extra)) };
}
