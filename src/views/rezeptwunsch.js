/**
 * Rezeptansicht als Konfiguration der gemeinsamen Formular-Komponente.
 * Eingaben: forms.prescription, Demo-Beschriftungen und Praxistelefon.
 * Felder und Hinweise in content/forms.js ändern.
 */
import { breadcrumbs } from '../components/breadcrumbs.js';
import { forms, formText } from '../../content/forms.js';
import { practice } from '../../content/practice.js';
import { ui } from '../../content/site.js';
import { h, pageHeading } from '../lib/dom.js';
import { requestForm } from '../components/request-form.js';
import { notice } from '../components/notice.js';
export function prescriptionView() {
  const form = requestForm('prescription');
  return {
    element: h('div', { className: 'container page page--reading request-page' },
      breadcrumbs([{ text: forms.prescription.title }]),
      pageHeading(forms.prescription),
      notice(formText.demoTitle, formText.demoNote),
      h('p', { className: 'lead' }, forms.prescription.notice),
      h('a', { className: 'text-link request-page__phone', href: practice.phone.href }, `${ui.call}: ${practice.phone.text}`),
      form.element),
    destroy: form.destroy
  };
}

