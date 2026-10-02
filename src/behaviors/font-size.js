/**
 * Drei Schriftstufen und Synchronisierung aller Schriftgrößen-Schalter.
 * Eingaben: Einstellungsspeicher und data-font-step-Klicks.
 * Größen in tokens.css ändern; keine Formulardaten speichern.
 */
import { readSetting, writeSetting } from '../lib/storage.js';
export function initializeFontSize() {
  let level = Math.max(0, Math.min(2, Number(readSetting('grams-font')) || 0));
  function apply() {
    document.documentElement.dataset.fontSize = String(level);
    document.querySelectorAll('[data-font-step]').forEach(button => { button.disabled = Number(button.dataset.fontStep) < 0 ? level === 0 : level === 2; });
  }
  document.addEventListener('click', event => { const button = event.target.closest('[data-font-step]'); if (!button) return; level = Math.max(0, Math.min(2, level + Number(button.dataset.fontStep))); writeSetting('grams-font', String(level)); apply(); });
  apply();
}
