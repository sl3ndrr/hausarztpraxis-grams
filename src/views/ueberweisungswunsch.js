/**
 * Überweisungsansicht als Konfiguration derselben Formular-Komponente.
 * Eingaben: forms.referral und zentrale Demo-Beschriftungen.
 * Felder und Hinweise in content/forms.js ändern.
 */
import { forms, formText } from '../../content/forms.js';
import { h, pageHeading } from '../lib/dom.js';
import { requestForm } from '../components/request-form.js';
import { notice } from '../components/notice.js';
export function referralView() {
  const form = requestForm('referral');
  return { element: h('div', { className: 'container page page--reading' }, pageHeading(forms.referral), h('p', { className: 'lead' }, forms.referral.notice), notice(formText.demoTitle, formText.demoNote, 'mint'), form.element), destroy: form.destroy };
}
