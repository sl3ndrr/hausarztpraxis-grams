/**
 * Reale Datumsgrenzen, Pflichtfelder und Zustimmung beider Formulare.
 * Eingaben: synthetische Werte, Content-Schema und fester heutiger Tag.
 * Meldungen in forms.js ändern; Datumsgültigkeit hier absichern.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { forms, formText } from '../content/forms.js';
import { validateBirth, validateRequest } from '../src/lib/validate.js';
const today = { year: 2026, month: 10, day: 2 };
const values = { firstName: 'Test', lastName: 'Beispiel', birthDay: '29', birthMonth: '2', birthYear: '2000', medication1: 'Demo', referral1: 'Demo', consent: true };
test('Echtes Schaltjahr und unmögliche Daten', () => {
  assert.equal(validateBirth(values, today), null);
  for (const patch of [{ birthYear: '1900' }, { birthYear: '2001' }, { birthDay: '31', birthMonth: '4' }, { birthMonth: '13' }, { birthDay: '0' }]) assert.equal(validateBirth({ ...values, ...patch }, today), formText.birthInvalid);
});
test('Unvollständige, nicht numerische und nicht vierstellige Datumsangaben', () => {
  assert.equal(validateBirth({ ...values, birthDay: '' }, today), formText.birthMissing);
  for (const birthYear of ['20e2', '-2000', '00', '2000.0']) assert.equal(validateBirth({ ...values, birthYear }, today), formText.birthInvalid);
});
test('Zukunft, Plausibilität und heute geboren', () => {
  assert.equal(validateBirth({ ...values, birthYear: '2026', birthMonth: '10', birthDay: '3' }, today), formText.birthFuture);
  assert.equal(validateBirth({ ...values, birthYear: '2026', birthMonth: '10', birthDay: '2' }, today), null);
  assert.equal(validateBirth({ ...values, birthYear: '1800', birthDay: '1' }, today), formText.birthOld);
});
test('Beide Konfigurationen akzeptieren gültige Pflichtfelder', () => { for (const form of Object.values(forms)) assert.deepEqual(validateRequest(form, values, today), []); });
test('Pflichtfelder behandeln Leerzeichen als leer und Zustimmung ausdrücklich', () => {
  const errors = validateRequest(forms.prescription, { ...values, lastName: '  ', medication1: '', consent: 'on' }, today);
  assert.deepEqual(errors.map(error => error.name), ['lastName', 'medication1', 'consent']);
  assert.equal(validateRequest(forms.referral, { ...values, referral1: '' }, today)[0].name, 'referral1');
});
