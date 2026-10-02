/**
 * Ruhige Hinweisbox ohne versteckten Inhalt.
 * Eingaben: Überschrift, Text und optionaler Stil.
 * Text im zuständigen content-Modul ändern.
 */
import { h } from '../lib/dom.js';
export function notice(title, text, variant = 'warm') { return h('aside', { className: `notice notice--${variant}` }, h('h2', {}, title), h('p', {}, text)); }
