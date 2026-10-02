/**
 * Fehlertoleranter Speicher ausschließlich für Darstellungseinstellungen.
 * Eingaben: ein Schlüssel und ein nicht personenbezogener Einstellungswert.
 * Niemals Formulardaten an diese Funktionen übergeben.
 */
export function readSetting(key) { try { return localStorage.getItem(key); } catch { return null; } }
export function writeSetting(key, value) {
  try { if (value === null) localStorage.removeItem(key); else localStorage.setItem(key, value); } catch { /* Speicherung kann gesperrt sein. */ }
}
