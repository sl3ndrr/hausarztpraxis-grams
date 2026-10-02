/**
 * Reine Validierung beider Wunschformulare inklusive echtem Geburtsdatum.
 * Eingaben: Feldschema, Werte und heutiges lokales Kalenderdatum.
 * Meldungen in content/forms.js ändern; Logik hier mit Grenzfällen testen.
 */
import { formText } from '../../content/forms.js';
export function validateBirth(values, today) {
  const raw = [values.birthYear, values.birthMonth, values.birthDay];
  if (raw.some(value => !String(value ?? '').trim())) return formText.birthMissing;
  if (raw.some(value => !/^\d+$/.test(String(value)))) return formText.birthInvalid;
  const [year, month, day] = raw.map(Number);
  const date = new Date(0);
  date.setUTCFullYear(year, month - 1, day);
  date.setUTCHours(0, 0, 0, 0);
  if (String(values.birthYear).length !== 4 || month < 1 || month > 12 || day < 1 || date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return formText.birthInvalid;
  if (year < today.year - 130) return formText.birthOld;
  if (year * 10000 + month * 100 + day > today.year * 10000 + today.month * 100 + today.day) return formText.birthFuture;
  return null;
}
export function validateRequest(config, values, today) {
  const errors = [];
  for (const field of config.fields) if (field.required && !String(values[field.name] ?? '').trim()) errors.push({ name: field.name, message: field.error });
  const birthError = validateBirth(values, today);
  if (birthError) errors.push({ name: 'birth', message: birthError });
  if (values.consent !== true) errors.push({ name: 'consent', message: formText.consentError });
  return errors;
}
