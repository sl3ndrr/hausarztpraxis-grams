/**
 * Feste mobile Schnellzugriffe mit großen Touch-Zielen.
 * Eingaben: zentrale Telefonnummer und allgemeine Beschriftungen.
 * Abstände in layout.css passend zum reservierten unteren Raum ändern.
 */
import { practice } from '../../content/practice.js';
import { ui } from '../../content/site.js';
import { h } from '../lib/dom.js';
import { icon } from './icons.js';
export function mobileBar() { return h('nav', { className: 'mobile-bar', 'aria-label': ui.contact }, h('a', { href: practice.phone.href }, icon('phone'), ui.call), h('a', { href: '#/anfahrt' }, icon('pin'), ui.directions)); }
