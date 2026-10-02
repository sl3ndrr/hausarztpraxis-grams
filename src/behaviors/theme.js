/**
 * Zentraler Darstellungszustand mit synchronisierten Radio-Gruppen.
 * Eingaben: Systemänderungen, lib/theme und fehlertoleranter Einstellungsspeicher.
 * Beschriftungen in content/site.js, Farben in BEIDEN Dark-Blöcken pflegen.
 */
import { normalizeTheme, resolveTheme } from '../lib/theme.js';
import { readSetting, writeSetting } from '../lib/storage.js';
export function initializeTheme() {
  const system = matchMedia('(prefers-color-scheme: dark)');
  let choice = normalizeTheme(readSetting('grams-theme'));
  function apply() {
    const root = document.documentElement;
    if (choice === 'auto') delete root.dataset.theme; else root.dataset.theme = choice;
    root.style.colorScheme = choice === 'auto' ? 'light dark' : choice;
    document.querySelectorAll('[data-theme-choice]').forEach(input => { input.checked = input.value === choice; });
    const effective = resolveTheme(choice, system.matches);
    const color = getComputedStyle(root).getPropertyValue('--color-bg').trim();
    document.querySelector('meta[name="theme-color"]').content = color;
    root.dataset.effectiveTheme = effective;
  }
  document.addEventListener('change', event => { if (event.target.matches('[data-theme-choice]')) { choice = normalizeTheme(event.target.value); writeSetting('grams-theme', choice === 'auto' ? null : choice); apply(); } });
  window.addEventListener('storage', event => { if (event.key === 'grams-theme' || event.key === null) { choice = normalizeTheme(readSetting('grams-theme')); apply(); } });
  system.addEventListener('change', apply);
  apply();
}
