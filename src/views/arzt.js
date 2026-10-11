/**
 * Arzt und Team mit gerahmtem Originalporträt und großer Jahres-Timeline.
 * Eingaben: bestehende doctor/team/home-Daten; keine zusätzlichen Angaben.
 * Persönliche Texte in content/ pflegen, Bildbreiten in Tokens begrenzen.
 */
import { doctor } from '../../content/doctor.js';
import { practice } from '../../content/practice.js';
import { team } from '../../content/team.js';
import { home } from '../../content/home.js';
import { ui } from '../../content/site.js';
import { h, pageHeading, list, sectionHeading } from '../lib/dom.js';
import { picture } from '../components/picture.js';
import { timeline } from '../components/timeline.js';
import { personCard } from '../components/person-card.js';
import { breadcrumbs } from '../components/breadcrumbs.js';
export function doctorView() {
  return { element: h('div', { className: 'container page' }, breadcrumbs([{ text: doctor.eyebrow }]), pageHeading(doctor),
    h('div', { className: 'doctor-page' },
      h('section', { className: 'doctor-page__profile' }, h('div', { className: 'portrait-frame accent--prevention' }, picture('doctor', { className: 'picture--portrait' })),
        h('h2', {}, practice.doctor), h('p', {}, doctor.focus), h('h3', {}, doctor.personalTitle), list(doctor.personal),
        h('a', { href: '#/leistungen/gesundheit?section=qualifications', className: 'text-link' }, ui.qualifications)),
      h('div', {}, h('section', { id: 'career', tabindex: '-1' }, h('h2', {}, doctor.careerTitle), timeline(doctor.career)),
        h('section', { className: 'notice notice--mint' }, h('h2', {}, doctor.interestsTitle), list(doctor.interests)))),
    h('section', { className: 'section', id: 'team', tabindex: '-1' }, sectionHeading(home.teamTitle, home.teamIntro), h('div', { className: 'grid grid--four' }, team.map(personCard)))) };
}
