/**
 * Anfahrt als Linienkarten, Wochenzeiten und lokaler Kontaktkomfort.
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
import { icon } from '../components/icons.js';
export function directionsView() {
  const hours = weekHours(); const tools = contactTools();
  return { element: h('div', { className: 'container page directions-view' }, breadcrumbs([{ text: ui.directions }]), pageHeading(directions),
    h('div', { className: 'grid grid--two' }, h('section', { className: 'card directions-contact', id: 'contact', tabindex: '-1' }, h('h2', {}, ui.contact), contactBlock(), tools.element,
      h('div', { className: 'button-row' }, practice.maps.map(link => h('a', { href: link.href, className: 'button button--quiet', target: '_blank', rel: 'noopener noreferrer' }, icon('pin'), link.text))),
      h('p', { className: 'small' }, directions.mapsNote)), hours.element),
    h('section', { className: 'section', id: 'travel', tabindex: '-1' }, h('h2', {}, directions.publicTitle), h('p', { className: 'small' }, directions.sourceNote),
      h('div', { className: 'grid grid--two travel-lines' }, directions.travel.map(item => h('article', { className: 'travel-line accent--health', 'data-reveal': '' },
        h('div', { className: 'travel-line__badges', 'aria-hidden': 'true' }, item.lines.map(line => h('span', {}, line))), h('h3', {}, item.title),
        h('p', {}, item.text), h('p', { className: 'travel-line__walk', 'aria-hidden': 'true' }, icon('pin'), item.walk))))), practiceCard()),
    destroy: () => { hours.destroy(); tools.destroy(); } };
}
