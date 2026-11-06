/**
 * Überweisungsansicht als Konfiguration derselben Formular-Komponente.
 * Eingaben: forms.referral, zentrale Demo-Beschriftungen und Praxistelefon.
 * Felder und Hinweise in content/forms.js, Rufnummer in content/practice.js ändern.
 */
import { forms, formText } from '../../content/forms.js';
import { practice } from '../../content/practice.js';
import { ui } from '../../content/site.js';
import { breadcrumbs } from '../components/breadcrumbs.js';
import { notice } from '../components/notice.js';
import { requestForm } from '../components/request-form.js';
import { h, pageHeading } from '../lib/dom.js';

export function referralView() {
  const form = requestForm('referral');
  return {
    element: h('div', { className: 'container page page--reading request-page' },
      breadcrumbs([{ text: forms.referral.title }]),
      pageHeading(forms.referral),
      notice(formText.demoTitle, formText.demoNote),
      h('p', { className: 'lead' }, forms.referral.notice),
      h('a', { className: 'text-link request-page__phone', href: practice.phone.href }, `${ui.call}: ${practice.phone.text}`),
      form.element),
    destroy: form.destroy
  };
}

