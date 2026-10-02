/**
 * Wunschansicht im ersten lauffähigen Zwischenstand.
 * Eingaben: zentrale Hinweise und Kontakt; Formular folgt im nächsten Commit.
 * Texte in content/forms.js, Kontakt in content/practice.js ändern.
 */
import { forms } from '../../content/forms.js';
import { practice } from '../../content/practice.js';
import { ui } from '../../content/site.js';
import { h, pageHeading } from '../lib/dom.js';
export function prescriptionView() {
  return { element: h('div', { className: 'container page page--reading' }, pageHeading(forms.prescription), h('p', { className: 'lead' }, forms.prescription.notice), h('a', { href: practice.phone.href, className: 'button' }, ui.call)) };
}
