/**
 * Startseite: Begrüßung, Zeiten, Termin, Anliegen, Arzt, Team und Lehrpraxis.
 * Eingaben: zentrale Content-Module und kleine Komponenten.
 * Texte in content/home.js ändern, Abschnitte hier umordnen.
 */
import { home as data } from '../../content/home.js';
import { practice } from '../../content/practice.js';
import { doctor } from '../../content/doctor.js';
import { team } from '../../content/team.js';
import { ui } from '../../content/site.js';
import { h, sectionHeading, list } from '../lib/dom.js';
import { picture } from '../components/picture.js';
import { icon } from '../components/icons.js';
import { hoursCard } from '../components/hours-card.js';
import { notice } from '../components/notice.js';
import { personCard } from '../components/person-card.js';
import { serviceCard } from '../components/service-card.js';
export function homeView() {
  const hours = hoursCard();
  const element = h('div', { className: 'home-view' },
    h('section', { className: 'hero' }, picture('hero', { priority: true, className: 'hero__picture' }),
      h('div', { className: 'container hero__inner' }, h('div', { className: 'hero__text' },
        h('p', { className: 'eyebrow' }, data.eyebrow), h('h1', { tabindex: '-1' }, data.title), h('p', { className: 'lead' }, data.intro),
        h('div', { className: 'button-row' }, h('a', { className: 'button button--hero', href: practice.phone.href }, icon('phone'), ui.call), h('a', { className: 'button button--hero-secondary', href: '#/anfahrt' }, icon('pin'), ui.directions)),
        h('p', { className: 'hero__address' }, `${practice.address.street} · ${practice.address.postalCode} ${practice.address.city}`)))),
    h('div', { className: 'container home-info' }, hours.element, notice(data.appointment.title, data.appointment.text)),
    h('section', { className: 'container section' }, sectionHeading(data.shortcutsTitle, data.shortcutsIntro), h('div', { className: 'grid grid--four' }, data.shortcuts.map(item => serviceCard(item, true)))),
    h('section', { className: 'section section--tinted' }, h('div', { className: 'container doctor-intro' },
      picture('doctorHome', { className: 'picture--portrait doctor-intro__picture' }),
      h('div', {}, h('p', { className: 'eyebrow' }, doctor.eyebrow), h('h2', {}, data.doctorTitle), h('h3', {}, practice.doctor), list(doctor.summary), h('a', { className: 'text-link', href: data.doctorLink.href }, data.doctorLink.text, icon('arrow'))))),
    h('section', { className: 'container section' }, sectionHeading(data.teamTitle, data.teamIntro), h('div', { className: 'grid grid--four' }, team.map(personCard))),
    h('section', { className: 'container teaching section' }, h('div', { className: 'teaching__logo' }, picture('university')), h('div', {}, h('h2', {}, data.teaching.title), h('p', {}, data.teaching.text), h('a', { href: data.teaching.link.href, className: 'text-link' }, data.teaching.link.text, icon('arrow')))));
  return { element, destroy: hours.destroy };
}
