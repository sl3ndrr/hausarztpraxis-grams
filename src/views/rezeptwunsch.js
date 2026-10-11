/**
 * Rezeptansicht als Konfiguration der gemeinsamen Formular-Komponente.
 * Eingaben: forms.prescription und zentrale Demo-Beschriftungen.
 * Felder und Hinweise in content/forms.js ändern.
 */
import { breadcrumbs } from '../components/breadcrumbs.js';
import { forms, formText } from '../../content/forms.js';
import { h, pageHeading } from '../lib/dom.js';
import { requestForm } from '../components/request-form.js';
import { notice } from '../components/notice.js';
export function prescriptionView() {
  const form = requestForm('prescription');
  return { element: h('div', { className: 'container page page--reading' }, breadcrumbs([{ text: forms.prescription.title }]), pageHeading(forms.prescription), h('p', { className: 'lead' }, forms.prescription.notice), notice(formText.demoTitle, formText.demoNote, 'mint'), form.element), destroy: form.destroy };
}

