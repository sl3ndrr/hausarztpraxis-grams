/**
 * Startseite mit Praxisschild, Leistungsregister, Menschen und Besuchsinformationen.
 * Eingaben: zentrale Praxisdaten, Originalbilder und feste Ziele.
 * Texte in content/ pflegen; den Status-Timer beim Unmount beenden.
 */
import { home as data } from '../../content/home.js';
import { practice } from '../../content/practice.js';
import { doctor } from '../../content/doctor.js';
import { team } from '../../content/team.js';
import { overview } from '../../content/services/overview.js';
import { ui } from '../../content/site.js';
import { h, list } from '../lib/dom.js';
import { picture } from '../components/picture.js';
import { icon } from '../components/icons.js';
import { weekHours } from '../components/week-hours.js';
import { personCard } from '../components/person-card.js';
import { serviceCard } from '../components/service-card.js';
import { serviceSearch } from '../components/service-search.js';
import { concerns } from '../components/concerns.js';

export function homeView() {
  const hours = weekHours();
  const element = h('div', { className: 'home-view' },
    h('section', { className: 'hero' }, h('div', { className: 'container hero__inner' },
      h('div', { className: 'hero__text' },
        h('h1', { tabindex: '-1' }, data.title),
        h('p', { className: 'hero__address' }, practice.address.street, h('br'), `${practice.address.postalCode} ${practice.address.city}`),
        h('p', { className: 'lead' }, data.intro),
        h('a', { className: 'button hero__call', href: practice.phone.href, 'aria-label': `${ui.call}: ${practice.phone.text}` }, icon('phone'), practice.phone.text)),
      hours.element)),
    concerns(),
    h('section', { className: 'container section home-services', id: 'services', tabindex: '-1' },
      h('h2', {}, overview.title),
      h('div', { className: 'service-index' }, overview.cards.map(card =>
        serviceCard(card, { links: data.shortcuts.filter(item => item.area === card.accent) }))),
      h('a', { href: '#/leistungen', className: 'text-link' }, ui.showServices),
      serviceSearch('home-services')),
    h('section', { className: 'section section--tinted', id: 'doctor', tabindex: '-1' },
      h('div', { className: 'container doctor-intro' },
        picture('doctorHome', { className: 'picture--portrait' }),
        h('div', {},
          h('h2', {}, practice.doctor),
          list(doctor.summary),
          h('a', { className: 'text-link', href: data.doctorLink.href }, data.doctorLink.text)))),
    h('section', { className: 'container section home-team', id: 'team', tabindex: '-1' },
      h('h2', {}, data.teamTitle),
      h('div', { className: 'team-grid' }, team.map(personCard))),
    h('section', { className: 'container teaching section', id: 'teaching', tabindex: '-1' },
      h('div', {},
        h('h2', {}, data.teaching.title),
        h('p', {}, data.teaching.text),
        h('a', { href: data.teaching.link.href, className: 'text-link' }, data.teaching.link.text)),
      h('div', { className: 'teaching__logo' }, picture('university'))),
    h('section', { className: 'section section--tinted', id: 'contact', tabindex: '-1' },
      h('div', { className: 'container home-contact' },
        h('div', {},
          h('h2', {}, ui.contact),
          h('h3', {}, data.appointment.title),
          h('p', {}, data.appointment.text),
          h('div', { className: 'button-row' },
            h('a', { href: practice.phone.href, className: 'text-link' }, icon('phone'), practice.phone.text),
            h('a', { href: '#/anfahrt', className: 'text-link' }, ui.directions))),
        picture('hero', { className: 'home-contact__photo' }))));
  return { element, destroy: hours.destroy };
}
