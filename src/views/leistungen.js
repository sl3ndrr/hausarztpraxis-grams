/**
 * Offener Index der drei Leistungsbereiche mit lokaler Suche.
 * Eingaben: content/services/overview.js und gemeinsame Leistungszeilen.
 * Neue Bereiche im Content ergänzen.
 */
import { serviceSearch } from '../components/service-search.js';
import { overview } from '../../content/services/overview.js';
import { h, pageHeading } from '../lib/dom.js';
import { breadcrumbs } from '../components/breadcrumbs.js';
import { ui } from '../../content/site.js';
import { serviceCard } from '../components/service-card.js';
export function servicesView() {
  return { element: h('div', { className: 'container page' },
    breadcrumbs([{ text: ui.showServices }]),
    pageHeading(overview),
    h('div', { className: 'service-index' }, overview.cards.map(card => serviceCard(card, { heading: 'h2' }))),
    serviceSearch('services')) };
}

