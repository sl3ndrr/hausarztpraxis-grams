/**
 * Anfahrt mit Kontakt, Wochenzeiten und offenen Hinweisen zu den Buslinien.
 * Eingaben: ausschließlich vorhandene directions/practice-Daten.
 * Verkehrsangaben vor Freigabe bestätigen; kein Karten-Embed.
 */
import { directions } from '../../content/anfahrt.js';
import { practice } from '../../content/practice.js';
import { ui } from '../../content/site.js';
import { h, pageHeading } from '../lib/dom.js';
import { contactBlock } from '../components/footer.js';
import { weekHours } from '../components/week-hours.js';
import { contactTools } from '../components/contact-tools.js';
import { practiceCard } from '../components/practice-card.js';
import { breadcrumbs } from '../components/breadcrumbs.js';

export function directionsView() {
  const hours = weekHours();
  const tools = contactTools();
  const contact = h('section', { className: 'directions-contact', id: 'contact', tabindex: '-1' },
    h('h2', {}, ui.contact), contactBlock(),
    h('div', { className: 'directions-maps' },
      h('div', { className: 'button-row' }, practice.maps.map(link => h('a', {
        href: link.href, className: 'text-link', target: '_blank', rel: 'noopener noreferrer'
      }, link.text))),
      h('p', { className: 'small' }, directions.mapsNote)),
    tools.element);
  const travel = h('section', { className: 'section directions-travel', id: 'travel', tabindex: '-1' },
    h('h2', {}, directions.publicTitle),
    h('div', { className: 'travel-lines' }, directions.travel.map(item => h('article', { className: 'travel-line' },
      h('h3', {}, item.title), h('p', {}, item.text)))),
    h('p', { className: 'small' }, directions.sourceNote));

  return {
    element: h('div', { className: 'container page directions-view' },
      breadcrumbs([{ text: ui.directions }]), pageHeading(directions),
      h('div', { className: 'directions-info' }, contact, hours.element), travel, practiceCard()),
    destroy: () => { hours.destroy(); tools.destroy(); }
  };
}
