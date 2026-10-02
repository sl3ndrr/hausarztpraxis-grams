/**
 * Erweiterbare Teamkarte mit kleinem Porträt.
 * Eingaben: Team-Datensatz und zentrale picture-Komponente.
 * Neue Personen in content/team.js ergänzen.
 */
import { h } from '../lib/dom.js';
import { picture } from './picture.js';
export function personCard(person) { return h('article', { className: 'card person-card', 'data-reveal': '' }, picture(person.image, { className: 'picture--portrait' }), h('h3', {}, person.name), h('p', {}, person.role), person.note && h('p', { className: 'small' }, person.note)); }
