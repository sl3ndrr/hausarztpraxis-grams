/**
 * Team-Porträt als kleines Bild in einer großzügigen farbigen Rahmenfläche.
 * Eingaben: unveränderte Namen/Rollen und zentrales Bild über picture.js.
 * Porträts nie über 200 CSS-Pixel zeigen; neue Personen in content/team.js.
 */
import { h } from '../lib/dom.js';
import { picture } from './picture.js';
export function personCard(person) {
  return h('article', { className: 'person-card', 'data-reveal': '' },
    h('div', { className: `person-card__portrait accent--${person.accent ?? 'health'}` }, picture(person.image, { className: 'picture--portrait' })),
    h('h3', {}, person.name), h('p', {}, person.role), person.note && h('p', { className: 'small' }, person.note));
}
