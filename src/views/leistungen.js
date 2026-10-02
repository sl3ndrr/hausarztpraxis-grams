/**
 * Übersicht über alle drei Leistungsbereiche.
 * Eingaben: content/services/overview.js und Service-Karten.
 * Neue Übersichtskarte im Content ergänzen.
 */
import { overview } from '../../content/services/overview.js';
import { h, pageHeading } from '../lib/dom.js';
import { serviceCard } from '../components/service-card.js';
export function servicesView() { return { element: h('div', { className: 'container page' }, pageHeading(overview), h('div', { className: 'grid grid--three' }, overview.cards.map(card => serviceCard(card)))) }; }
