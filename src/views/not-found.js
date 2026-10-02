/**
 * Freundliche Ansicht für unbekannte Hash-Routen.
 * Eingaben: zentrale UI-Texte; keine vom Hash eingebauten Texte.
 * Rückkehrtext in content/site.js ändern.
 */
import { ui } from '../../content/site.js';
import { h, pageHeading } from '../lib/dom.js';
export function notFoundView() { return { element: h('div', { className: 'container page page--reading' }, pageHeading(ui.notFound), h('p', {}, ui.notFound.text), h('a', { href: '#/', className: 'button' }, ui.back)) }; }
