/**
 * Einziger Austauschpunkt für eine spätere sichere Übermittlung.
 * Eingaben: geprüfte Werte und DEMO_MODE; derzeit kein Netzwerkzugriff.
 * Backend hier anbinden; niemals mailto oder Speicherung für Gesundheitsdaten.
 */
import { DEMO_MODE } from '../../content/site.js';
export async function submitRequest(_kind, _values) {
  // TODO: Backend-Endpunkt anbinden. Bei deaktiviertem Demo-Modus sicher abbrechen.
  return DEMO_MODE ? { ok: true, demo: true } : { ok: false, demo: false };
}
