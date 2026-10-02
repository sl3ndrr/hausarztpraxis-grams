/**
 * Kontakt, Notfallhinweis, Zeiten und Original-Rechtslinks auf jeder Seite.
 * Eingaben: practice/hours/navigation; keine duplizierten Fakten.
 * Kontakt in practice.js, Zeiten in hours.js ändern.
 */
import { practice } from '../../content/practice.js';
import { footerLinks } from '../../content/navigation.js';
import { ui } from '../../content/site.js';
import { h } from '../lib/dom.js';
import { hoursTable } from './hours-card.js';
export function contactBlock() {
  return h('address', { className: 'contact' }, h('p', {}, practice.address.street, h('br'), `${practice.address.postalCode} ${practice.address.city}`),
    h('p', {}, h('span', {}, `${ui.phone}: `), h('a', { href: practice.phone.href }, practice.phone.text)),
    h('p', {}, `${ui.fax}: ${practice.fax}`), h('p', {}, `${ui.email}: `, h('a', { href: `mailto:${practice.email}` }, practice.email)));
}
export function footer() {
  return h('footer', { className: 'footer' }, h('div', { className: 'container footer__grid' },
    h('section', {}, h('h2', {}, practice.name), h('p', {}, practice.doctor), contactBlock()),
    h('section', {}, h('h2', {}, ui.hours), hoursTable()),
    h('nav', { 'aria-label': ui.contact, className: 'footer__nav' }, footerLinks.map(item => h('a', { href: item.href }, item.text)))),
    h('div', { className: 'container footer__bottom' }, h('div', { className: 'footer__emergency' }, h('a', { href: practice.emergency.href }, practice.emergency.text), h('a', { href: practice.onCall.href }, practice.onCall.text)),
      h('div', { className: 'footer__legal' }, practice.legal.map(link => h('a', { href: link.href }, link.text)), h('span', { className: 'small' }, ui.demo))));
}
