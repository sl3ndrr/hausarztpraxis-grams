/**
 * Hierarchische Startseite: Hero, Anliegen, Leistungen, Menschen und Kontakt.
 * Eingaben: vorhandene Content-Daten; Bild stets ohne Textüberlagerung.
 * Texte in content/ pflegen; beide Zeitkomponenten beim Unmount beenden.
 */
import { home as data } from '../../content/home.js';
import { practice } from '../../content/practice.js';
import { doctor } from '../../content/doctor.js';
import { team } from '../../content/team.js';
import { overview } from '../../content/services/overview.js';
import { ui } from '../../content/site.js';
import { presentation } from '../../content/presentation.js';
import { h, sectionHeading, list } from '../lib/dom.js';
import { picture } from '../components/picture.js';
import { icon, organicCurve } from '../components/icons.js';
import { liveStatus } from '../components/live-status.js';
import { weekHours } from '../components/week-hours.js';
import { notice } from '../components/notice.js';
import { personCard } from '../components/person-card.js';
import { serviceCard } from '../components/service-card.js';
import { concerns } from '../components/concerns.js';
export function homeView() {
  const status = liveStatus(); const hours = weekHours();
  const element = h('div', { className: 'home-view' },
    h('section', { className: 'hero' }, h('div', { className: 'container hero__inner' },
      h('div', { className: 'hero__text' }, h('p', { className: 'eyebrow' }, data.eyebrow), h('h1', { tabindex: '-1' }, data.title),
        status.element, h('a', { className: 'button hero__call', href: practice.phone.href }, icon('phone'), ui.call, h('span', {}, practice.phone.text)),
        h('p', { className: 'lead' }, data.intro), h('p', { className: 'small' }, `${practice.address.street} · ${practice.address.postalCode} ${practice.address.city}`)),
      h('div', { className: 'hero__media' }, picture('hero', { priority: true, className: 'hero__picture' }))), organicCurve()),
    h('section', { className: 'container glance', 'aria-label': presentation.glance }, h('p', { className: 'eyebrow' }, presentation.glance), h('ul', {}, data.glance.map(item => h('li', {}, item)))),
    concerns(),
    h('section', { className: 'container section', id: 'services', tabindex: '-1' }, sectionHeading(presentation.services, presentation.servicesIntro),
      h('div', { className: 'grid grid--three' }, overview.cards.map(card => serviceCard(card))), h('a', { href: '#/leistungen', className: 'text-link' }, ui.showServices, icon('arrow'))),
    h('section', { className: 'section section--tinted', id: 'doctor', tabindex: '-1' }, h('div', { className: 'container doctor-intro' },
      h('div', { className: 'portrait-frame accent--prevention' }, picture('doctorHome', { className: 'picture--portrait' })),
      h('div', {}, h('p', { className: 'eyebrow' }, doctor.eyebrow), h('h2', {}, data.doctorTitle), h('h3', {}, practice.doctor), list(doctor.summary), h('a', { className: 'text-link', href: data.doctorLink.href }, data.doctorLink.text, icon('arrow'))))),
    h('section', { className: 'container section', id: 'team', tabindex: '-1' }, sectionHeading(data.teamTitle, data.teamIntro), h('div', { className: 'grid grid--four' }, team.map(personCard))),
    h('section', { className: 'container teaching section', id: 'teaching', tabindex: '-1' }, h('div', { className: 'teaching__logo' }, picture('university')), h('div', {}, h('h2', {}, data.teaching.title), h('p', {}, data.teaching.text), h('a', { href: data.teaching.link.href, className: 'text-link' }, data.teaching.link.text, icon('arrow')))),
    h('section', { className: 'section section--tinted', id: 'contact', tabindex: '-1' }, h('div', { className: 'container home-contact' },
      h('div', {}, sectionHeading(presentation.contactTitle), h('div', { className: 'button-row' }, h('a', { href: practice.phone.href, className: 'button' }, icon('phone'), practice.phone.text), h('a', { href: '#/anfahrt', className: 'button button--quiet' }, ui.directions)), notice(data.appointment.title, data.appointment.text)), hours.element)));
  return { element, destroy: () => { status.destroy(); hours.destroy(); } };
}
