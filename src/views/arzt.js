/**
 * Arztprofil mit moderatem Porträt und vertikalem Werdegang.
 * Eingaben: doctor/practice und Timeline.
 * Lebenslauf in content/doctor.js ändern.
 */
import { doctor } from '../../content/doctor.js';
import { practice } from '../../content/practice.js';
import { h, pageHeading, list } from '../lib/dom.js';
import { picture } from '../components/picture.js';
import { timeline } from '../components/timeline.js';
export function doctorView() {
  return { element: h('div', { className: 'container page' }, pageHeading(doctor),
    h('div', { className: 'doctor-page' }, h('section', { className: 'card doctor-page__profile' }, picture('doctor', { className: 'picture--portrait' }), h('h2', {}, practice.doctor), h('p', {}, doctor.focus), h('h3', {}, doctor.personalTitle), list(doctor.personal)),
      h('div', {}, h('section', {}, h('h2', {}, doctor.careerTitle), timeline(doctor.career)), h('section', { className: 'notice notice--mint' }, h('h2', {}, doctor.interestsTitle), list(doctor.interests))))) };
}
