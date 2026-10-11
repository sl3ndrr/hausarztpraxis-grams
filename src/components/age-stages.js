/**
 * Sichtbare Altersleiste mit vollständigen bestehenden Untersuchungsangaben.
 * Eingaben: Content-Stufen und reiner Altersformatter; keine Auswahl versteckt Text.
 * Inhalte in gesundheit.js pflegen; Farbe ist nur eine zusätzliche Orientierung.
 */
import { presentation } from '../../content/presentation.js';
import { h } from '../lib/dom.js';
import { ageStages } from '../lib/age-stages.js';
export function ageBar(steps) {
  return h('div', { className: 'age-bar' }, h('h3', {}, presentation.ageTitle), h('ol', { className: 'age-bar__list' },
    ageStages(steps).map(step => h('li', { className: 'age-bar__stage' }, h('span', { className: 'age-bar__number', 'aria-hidden': 'true' }, step.range), h('h4', {}, step.title), h('p', {}, step.text)))));
}
