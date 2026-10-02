/**
 * Reine Auflösung von Darstellungswahl und Systemmodus.
 * Eingaben: gespeicherte Wahl und boolesche Systemeinstellung.
 * Neue Modi hier ändern; theme-init.js synchron halten und Tests ergänzen.
 */
export function normalizeTheme(value) { return value === 'light' || value === 'dark' ? value : 'auto'; }
export function resolveTheme(value, systemDark) { return normalizeTheme(value) === 'auto' ? (systemDark ? 'dark' : 'light') : value; }
