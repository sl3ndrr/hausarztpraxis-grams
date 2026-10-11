/**
 * Übersicht über alle drei Leistungsbereiche.
 * Eingaben: content/services/overview.js und Service-Karten.
 * Neue Übersichtskarte im Content ergänzen.
 */
import { serviceSearch } from '../components/service-search.js';
import { overview } from '../../content/services/overview.js';
import { h, pageHeading } from '../lib/dom.js';
import { breadcrumbs } from '../components/breadcrumbs.js';
import { ui } from '../../content/site.js';
import { serviceCard } from '../components/service-card.js';
export function servicesView() { return { element: h('div', { className: 'container page' }, breadcrumbs([{ text: ui.showServices }]), pageHeading(overview), h('div', { className: 'grid grid--three' }, overview.cards.map(card => serviceCard(card))), serviceSearch('services')) }; }

