/**
 * Druckbare Praxiskarte ausschließlich mit vorhandener Adresse und Zeiten.
 * Eingaben: zentrale Kontaktinformationen und hoursTable.
 * Karte wird im Druck der Anfahrtansicht isoliert angezeigt.
 */
import { practice } from '../../content/practice.js';
import { ui } from '../../content/site.js';
import { presentation } from '../../content/presentation.js';
import { h } from '../lib/dom.js';
import { hoursTable } from './hours-card.js';
export function practiceCard() {
  return h('section', { className: 'practice-card' }, h('p', { className: 'eyebrow' }, presentation.cardTitle), h('h2', {}, practice.name), h('p', {}, practice.doctor),
    h('address', {}, practice.address.street, h('br'), `${practice.address.postalCode} ${practice.address.city}`),
    h('p', {}, `${ui.phone}: ${practice.phone.text}`), h('h2', {}, ui.hours), hoursTable(), h('p', { className: 'small' }, ui.statusNote),
    h('p', {}, practice.emergency.text), h('p', {}, practice.onCall.text));
}
