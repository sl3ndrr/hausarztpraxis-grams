/**
 * Synchroner Start vor CSS: verhindert Flackern einer expliziten Wahl.
 * Eingabe: ausschließlich gespeicherter Darstellungsmodus; spiegelt lib/theme.js.
 * Bei Modusänderungen beide Dateien und tests/theme.test.mjs anpassen.
 */
(function () {
  try {
    var mode = localStorage.getItem('grams-theme');
    if (mode === 'light' || mode === 'dark') document.documentElement.dataset.theme = mode;
  } catch (_) { /* Automatisch bleibt ohne Attribut funktionsfähig. */ }
}());
