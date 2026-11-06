/**
 * Sichtbarer Ablauf und aktueller Schritt der Demo-Wunschformulare.
 * Eingaben: zentrale Ablauftexte und lokaler Fortschritt der Formularprüfung.
 * Keine Übermittlung suggerieren; aktuellen Schritt zusätzlich textlich markieren.
 */
import { requestFlow } from '../../content/forms.js';
import { h } from '../lib/dom.js';
export function requestProgress() {
  const items = requestFlow.steps.map((step, index) => h('li', {}, h('span', { className: 'request-progress__number', 'aria-hidden': 'true' }, index + 1), h('div', {}, h('strong', {}, step.title), h('p', {}, step.text))));
  const element = h('section', { className: 'request-progress', 'aria-label': requestFlow.title }, h('p', { className: 'request-progress__title' }, requestFlow.title), h('ol', {}, items));
  const update = index => items.forEach((item, current) => { if (index === current) item.setAttribute('aria-current', 'step'); else item.removeAttribute('aria-current'); });
  update(0); return { element, update };
}
