/**
 * Gut sichtbares Notfallband auf jeder Route, aus practice.js.
 * Eingaben: vorhandene Notfallnummern und zentrale Bedienüberschrift.
 * Keine medizinischen Empfehlungen oder zusätzliche Dringlichkeitsfakten.
 */
import { practice } from '../../content/practice.js';
import { presentation } from '../../content/presentation.js';
import { h } from '../lib/dom.js';
import { icon } from './icons.js';
export function emergencyBand() {
  return h('section', { className: 'emergency-band accent--prevention' }, h('div', { className: 'container' }, h('h2', {}, presentation.emergencyTitle),
    h('div', { className: 'emergency-band__links' }, [practice.emergency, practice.onCall].map(item => h('a', { href: item.href }, icon('phone'), h('div', {}, h('span', {}, item.label), h('strong', {}, item.number)))))));
}
