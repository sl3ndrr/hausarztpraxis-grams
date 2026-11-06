/**
 * Hinweis mit Überschrift und Klartext.
 * Eingaben: Überschrift und Text.
 * Text im zuständigen content-Modul ändern.
 */
import { h } from '../lib/dom.js';
export function notice(title, text) { return h('aside', { className: 'notice' }, h('h2', {}, title), h('p', {}, text)); }
