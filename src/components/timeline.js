/**
 * Semantische Liste für den Werdegang.
 * Eingaben: reine Schritte mit Titel und Text.
 * Schritte im zuständigen Content-Modul pflegen.
 */
import { h } from '../lib/dom.js';
export function timeline(steps, heading = 'h3') { return h('ol', { className: 'timeline' }, steps.map(step => h('li', { className: 'timeline__item' }, h(heading, {}, step.title), h('p', {}, step.text)))); }

