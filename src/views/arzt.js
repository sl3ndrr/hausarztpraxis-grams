/**
 * Arztprofil mit Originalporträt, Werdegang und Praxisteam.
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
  const profile = h('section', { className: 'doctor-page__profile' },
    picture('doctor', { className: 'picture--portrait' }),
    h('h2', {}, doctor.personalTitle), list(doctor.personal),
    h('a', { href: '#/leistungen/gesundheit?section=qualifications', className: 'text-link' }, ui.qualifications));
  const career = h('section', { id: 'career', tabindex: '-1' }, h('h2', {}, doctor.careerTitle), timeline(doctor.career));
  const interests = h('section', {}, h('h2', {}, doctor.interestsTitle), list(doctor.interests));
  const practiceTeam = h('section', { className: 'section', id: 'team', tabindex: '-1' },
    sectionHeading(home.teamTitle), h('div', { className: 'team-grid' }, team.map(personCard)));

  return { element: h('div', { className: 'container page' },
    breadcrumbs([{ text: doctor.breadcrumb }]), pageHeading({ title: practice.doctor, intro: doctor.focus }),
    h('div', { className: 'doctor-page' }, profile, h('div', {}, career, interests)), practiceTeam) };
}
