<!--
  Bestätigungsbedarf, Ausgangszustand und Grenzen des visuellen Entwurfs.
  Eingaben: Repository-Prüfung und tatsächlich durchgeführte Verifikation.
  Erledigte Punkte mit Datum und Nachweis aktualisieren.
-->
> Zwischenstand: Die Praxis-Seiten sind lauffähig. Wunschansichten zeigen derzeit Hinweise und Telefonkontakt; gemeinsame Formular-Komponente und Datumsvalidierung folgen im nächsten Commit. Die Dokumentation beschreibt zusätzlich den Zielzustand.

# Offene Punkte

## Vorgefundener Repository-Zustand

Am 02.10.2026 war `sl3ndrr/hausarztpraxis-grams` leer: keine Branches und keine Dateien. Lese-/Schreibzugriff wurde über das GitHub-Plugin geprüft. `main` wurde mit einem ersten README-Commit angelegt; keine vorhandenen Inhalte wurden überschrieben. Der Auftrag wurde als neuer statischer Entwurf umgesetzt. Kein Framework, Build oder Paket hinzugefügt.

## Vor Freigabe und Livegang

- **Praxisinhaber:** Alle Inhalte, Rollen, Lebenslauf, Qualifikationen und medizinischen Angaben bestätigen. Altersgrenzen und Untersuchungsintervalle wurden gemäß Auftrag bewahrt; fachliche Aktualität vor Veröffentlichung bestätigen.
- **Backend:** `DEMO_MODE = true`. Keine Übermittlung, kein `mailto:` für Gesundheitsdaten, keine Speicherung von Formulardaten. Sicheren Backend-Endpunkt ausschließlich in `src/lib/submit-request.js` anbinden, Anforderungen an Datenschutz/Transport und Bearbeitung klären. Deaktivierter Demo-Modus bricht derzeit sicher ab.
- **Anfahrt:** Originalseite ließ sich über Webabruf lesen. Die beiden Busangaben wurden mit Quellenhinweis übernommen. **PLATZHALTER: Anreisehinweise vom Praxisinhaber bestätigen lassen.** Buslinien, Haltestellen und Fußwege auf aktuelle Gültigkeit bestätigen. Angaben zu Parkplätzen, Barrierefreiheit oder weiteren Verbindungen wurden nicht erfunden.
- **Bilder/Hero:** Die vorgegebene Hero-URL wurde per Webabruf erreicht, das Bildmotiv konnte in dieser Umgebung jedoch nicht verlässlich visuell geprüft werden. Direktdownload und Browseransicht wurden mit HTTP 403 bzw. `ERR_BLOCKED_BY_CLIENT` blockiert. Alttext bleibt deshalb neutral, Ausschnitt konfigurierbar. Vor Freigabe Motiv, präzisen Alttext, `objectPosition`, Originalmaße und Wirkung mit Overlay prüfen. Angegebene Maße reservieren Layoutverhältnisse; Porträtbreite maximal 200 px. Alle Bilder haben einen Initialen-Fallback.
- **Visuelle Abnahme:** Automatisierte Browseransicht auf den lokalen Server wurde durch die Umgebung blockiert; Chromium ist lokal nicht installiert. Kein Screenshot- oder Screenreader-Audit erfolgt. Manuell bei 360 px und Desktop, in beiden Modi, mit größter Schrift, Tastatur, Browser-Zurück, Systemänderung während Automatik, gesperrtem Speicher, Bildfehlern und reduzierter Bewegung prüfen. Token-Kontraste und reine Logik sind automatisiert geprüft; dies ist keine vollständige WCAG-Abnahme.
- **Hash-Routing/SEO:** Hash-Ansichten werden von Suchmaschinen eingeschränkt verarbeitet. Bei späterem Livegang Einzelseiten oder Pfad-Routing prüfen. Statische Open-Graph-/JSON-LD-URLs zeigen auf die Originaldomain; vor Veröffentlichung die tatsächliche Zieladresse und Freigabe abgleichen. Die statischen Metadaten sind auf die Startseite ausgerichtet.
- **GitHub Pages:** Website ist für `main` → `/ (root)` vorbereitet. Hosting wurde nicht automatisch aktiviert; Einstellungen und Veröffentlichungsstatus separat prüfen. Lokale Vorschau mit `node scripts/serve.mjs` oder `python3 -m http.server 8080`.
- **Regulärer Live-Status:** Feiertage, Urlaub, Notfälle und Sondertermine sind nicht modelliert. Hinweis auf reguläre Zeiten steht sichtbar an jeder Live-Statuskarte. Für spätere Ausnahmen eine bestätigte Datenquelle bestimmen.
- **Datenschutz/Rechtsprüfung:** Original-Impressum und Datenschutzerklärung bleiben verlinkt. Nur Theme und Schriftgröße werden lokal gespeichert. Diese Einstellungen und direkte Praxisbildabrufe ggf. in der Datenschutzerklärung berücksichtigen. Finale rechtliche Freigabe einschließlich ärztlicher Berufsordnung/HWG durch Praxisinhaber.

## Technische Abnahme

`node scripts/check.mjs` prüft Fakten-/Fallback-Konsistenz, Importpfade und Syntax, neun Routen, Bildmetadaten, erlaubte Hosts, Token-Verwendung, Dark-Parität und definierte Kontrastpaare. `node --test` prüft Öffnungsgrenzen, Mittagspause/Wochenende, Berliner Zeitumstellungen, Theme-Auflösung und Geburtsdatum/Pflichtfelder. Ergebnisse vor jedem Commit erneut ausführen.
