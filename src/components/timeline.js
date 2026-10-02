/**
 * Vertikale, semantische Zeitleiste für Untersuchungen und Werdegang.
 * Eingaben: reine Schritte mit Titel und Text.
 * Schritte im jeweiligen content-Modul, Linienanimation in motion.css ändern.
 */
import { h } from '../lib/dom.js';
export function timeline(steps, heading = 'h3') { return h('ol', { className: 'timeline', 'data-reveal': '' }, steps.map(step => h('li', { className: 'timeline__item' }, h(heading, {}, step.title), h('p', {}, step.text)))); }
