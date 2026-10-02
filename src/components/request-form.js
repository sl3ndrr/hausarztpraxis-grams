/**
 * Gemeinsames konfigurationsgetriebenes Wunschformular mit Fokus und Fehlern.
 * Eingaben: forms.js, reine Validierung und einziger Submit-Austauschpunkt.
 * Felder in content/forms.js ändern; niemals Eingaben speichern oder per mailto senden.
 */
import { forms, birthFields, formText } from '../../content/forms.js';
import { practice } from '../../content/practice.js';
import { timeZone } from '../../content/hours.js';
import { h } from '../lib/dom.js';
import { localParts } from '../lib/opening-status.js';
import { validateRequest } from '../lib/validate.js';
import { submitRequest } from '../lib/submit-request.js';
export function requestForm(kind) {
  const config = forms[kind];
  const summary = h('div', { className: 'form__summary', tabindex: '-1', role: 'alert', hidden: true });
  const result = h('div', { className: 'form__result', tabindex: '-1', role: 'status', 'aria-live': 'polite', hidden: true });
  const controls = new Map();
  const errors = new Map();
  const wrappers = new Map();
  const submit = h('button', { type: 'submit', className: 'button form__submit' }, formText.submit);
  const form = h('form', { className: 'request-form card', novalidate: true }, summary, h('p', { className: 'small' }, formText.required));
  function makeField(field) {
    const id = `${kind}-${field.name}`;
    const input = h('input', { id, name: field.name, type: field.type ?? 'text', required: field.required, autocomplete: field.autocomplete ?? 'off', maxlength: field.type === 'date' ? undefined : 200, 'aria-describedby': `${id}-error` });
    const error = h('p', { id: `${id}-error`, className: 'form__error', hidden: true });
    controls.set(field.name, [input]); errors.set(field.name, error);
    const wrapper = h('div', { className: 'form__field' }, h('label', { for: id }, `${field.label}${field.required ? ' *' : ''}`), input, error);
    wrappers.set(field.name, wrapper);
    return wrapper;
  }
  const birthError = h('p', { id: `${kind}-birth-error`, className: 'form__error', hidden: true });
  const birthControls = birthFields.map(field => {
    const input = h('input', { id: `${kind}-${field.name}`, name: field.name, type: 'text', inputmode: 'numeric', pattern: '[0-9]*', maxlength: field.length, required: true, autocomplete: field.autocomplete, 'aria-describedby': `${kind}-birth-hint ${kind}-birth-error` });
    controls.set(field.name, [input]);
    return input;
  });
  const birth = h('fieldset', { className: 'form__birth' }, h('legend', {}, `${formText.birth} *`), h('p', { className: 'small', id: `${kind}-birth-hint` }, formText.birthHint),
    h('div', { className: 'form__birth-fields' }, birthFields.map((field, index) => h('div', {}, h('label', { for: `${kind}-${field.name}` }, field.label), birthControls[index]))), birthError);
  controls.set('birth', birthControls); errors.set('birth', birthError); wrappers.set('birth', birth);
  const names = config.fields.filter(field => ['firstName', 'lastName'].includes(field.name));
  form.append(h('div', { className: 'form__names' }, names.map(makeField)), birth,
    config.fields.filter(field => !names.includes(field)).map(makeField).reduce((fragment, node) => { fragment.append(node); return fragment; }, document.createDocumentFragment()));
  const consentId = `${kind}-consent`;
  const consent = h('input', { type: 'checkbox', id: consentId, name: 'consent', required: true, 'aria-describedby': `${consentId}-error` });
  const consentError = h('p', { id: `${consentId}-error`, className: 'form__error', hidden: true });
  const consentWrap = h('div', { className: 'form__consent' }, h('div', { className: 'form__consent-row' }, consent,
    h('div', {}, h('label', { for: consentId }, `${formText.consent} *`), h('a', { href: practice.legal[1].href }, practice.legal[1].text))), consentError);
  controls.set('consent', [consent]); errors.set('consent', consentError); wrappers.set('consent', consentWrap);
  form.append(consentWrap, submit, result);
  let destroyed = false;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(form));
    values.consent = consent.checked;
    result.hidden = true;
    for (const [name, fieldControls] of controls) { fieldControls.forEach(input => input.removeAttribute('aria-invalid')); if (errors.has(name)) { errors.get(name).hidden = true; wrappers.get(name).removeAttribute('data-error'); } }
    const problems = validateRequest(config, values, localParts(new Date(), timeZone));
    if (problems.length) {
      const links = problems.map(problem => {
        const inputs = controls.get(problem.name);
        inputs.forEach(input => input.setAttribute('aria-invalid', 'true'));
        const error = errors.get(problem.name); error.textContent = `${formText.errorMark} ${problem.message}`; error.hidden = false;
        wrappers.get(problem.name).dataset.error = '';
        return h('li', {}, h('a', { href: `#${inputs[0].id}`, onclick: event => { event.preventDefault(); inputs[0].focus(); } }, problem.message));
      });
      summary.replaceChildren(h('h2', {}, formText.summary), h('ul', {}, links));
      summary.hidden = false; summary.focus(); return;
    }
    summary.hidden = true;
    submit.disabled = true; submit.textContent = formText.sending; form.setAttribute('aria-busy', 'true');
    let response;
    try { response = await submitRequest(kind, values); } catch { response = { ok: false }; }
    if (destroyed) return;
    submit.disabled = false; submit.textContent = formText.submit; form.removeAttribute('aria-busy');
    result.replaceChildren(response.ok && response.demo ? h('h2', {}, formText.successTitle) : h('h2', {}, formText.demoTitle), h('p', {}, response.ok && response.demo ? formText.success : formText.unavailable));
    result.hidden = false;
    if (response.ok) form.reset();
    result.focus();
  });
  return { element: form, destroy: () => { destroyed = true; form.reset(); } };
}
