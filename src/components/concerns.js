/**
 * Große, vollständig klickbare Anliegenflächen in Patientensprache.
 * Eingaben: zentrale Startseiten-Anliegen; ausschließlich bestehende Ziele.
 * Wortlaut und Deep-Anker in content/home.js pflegen.
 */
import { home } from '../../content/home.js';
import { presentation } from '../../content/presentation.js';
import { h, sectionHeading } from '../lib/dom.js';
import { icon } from './icons.js';
export function concerns() {
  return h('section', { className: 'container section', id: 'concerns', tabindex: '-1' }, sectionHeading(presentation.concerns),
    h('div', { className: 'bento' }, home.shortcuts.map(item => h('a', { className: `concern accent--${item.accent}`, href: item.href, 'data-reveal': '' },
      icon(item.icon), h('h3', {}, item.title), h('p', {}, item.text), h('span', { className: 'concern__arrow' }, icon('arrow'))))));
}
