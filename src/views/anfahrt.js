/**
 * Anfahrt mit bestätigbaren Originalangaben und klickbaren Kartenlinks.
 * Eingaben: directions/practice und Stundenkarte; kein Karten-Embed.
 * PLATZHALTER: Anreisehinweise vom Praxisinhaber bestätigen lassen.
 */
import { directions } from '../../content/anfahrt.js';
import { practice } from '../../content/practice.js';
import { ui } from '../../content/site.js';
import { h, pageHeading } from '../lib/dom.js';
import { contactBlock } from '../components/footer.js';
import { hoursCard } from '../components/hours-card.js';
import { icon } from '../components/icons.js';
export function directionsView() {
  const hours = hoursCard();
  return { element: h('div', { className: 'container page' }, pageHeading(directions),
    h('div', { className: 'grid grid--two' }, h('section', { className: 'card directions-contact' }, h('h2', {}, ui.contact), contactBlock(), h('div', { className: 'button-row' }, practice.maps.map(link => h('a', { href: link.href, className: 'button button--quiet', target: '_blank', rel: 'noopener noreferrer' }, icon('pin'), link.text))), h('p', { className: 'small' }, directions.mapsNote)), hours.element),
    h('section', { className: 'section' }, h('h2', {}, directions.publicTitle), h('p', { className: 'small' }, directions.sourceNote), h('div', { className: 'grid grid--two' }, directions.travel.map(item => h('article', { className: 'card', 'data-reveal': '' }, h('h3', {}, item.title), h('p', {}, item.text)))))), destroy: hours.destroy };
}
