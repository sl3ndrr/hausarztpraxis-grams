/**
 * Person mit Originalporträt, Namen und Rolle.
 * Eingaben: team.js und zentrales Bild über picture.js.
 * Porträts nie über 200 CSS-Pixel zeigen; neue Personen in content/team.js.
 */
import { h } from '../lib/dom.js';
import { picture } from './picture.js';

export function personCard(person) {
  return h('article', { className: 'person-card' },
    picture(person.image, { className: 'picture--portrait' }),
    h('div', {}, h('h3', {}, person.name), h('p', {}, person.role),
      person.note && h('p', { className: 'small' }, person.note)));
}
