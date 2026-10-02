/**
 * Leistungs- oder Schnellzugriffskarte aus reinen Daten.
 * Eingaben: Kartendatensatz; Icons und UI aus zentralen Modulen.
 * Kartentexte und Reihenfolge im zuständigen content-Modul ändern.
 */
import { ui } from '../../content/site.js';
import { h, list } from '../lib/dom.js';
import { icon } from './icons.js';
export function serviceCard(data, compact = false) {
  return h('article', { className: `card service-card${compact ? ' service-card--compact' : ''}`, 'data-reveal': '' },
    h('div', { className: 'service-card__icon' }, icon(data.icon)), h('h3', {}, h('a', { href: data.href }, data.title)), h('p', {}, data.text), data.items && list(data.items),
    h('a', { href: data.href, className: 'text-link', 'aria-label': `${data.title}: ${ui.more}` }, ui.more, icon('arrow')));
}
