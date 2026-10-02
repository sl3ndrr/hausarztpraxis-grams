<!--
  Verbindliche Arbeitsanweisung für künftige LLM-Agenten.
  Eingaben: Projektauftrag und tatsächliche Repository-Struktur.
  Bei Architekturänderungen zusammen mit docs/ aktualisieren.
-->
# Arbeitsanweisung

Dieses Repository ist der visuelle Relaunch der Hausarztpraxis Grams zur Freigabe durch den Praxisinhaber. Inhalt und Fakten stammen aus der bestehenden Praxis-Webseite und dem Projektauftrag. Die Seite soll ruhig, gut lesbar und mit wenig Kontext sicher pflegbar bleiben.

**Stack:** HTML, CSS, Vanilla-JS als ES-Module; nur `src/theme-init.js` ist ein synchrones klassisches Skript. Kein Build, keine Frameworks, keine Abhängigkeiten und keine externen Ressourcen außer den erlaubten Praxisbildern. Dev-Skripte verwenden ausschließlich Node-Bordmittel.

## Repo-Karte

- `index.html`: Shell, statische SEO-/JSON-LD-Daten, `noscript`, Mountpunkte.
- `content/site.js`: Demo-Konfiguration, Basis-URL, Bedienbeschriftungen.
- `content/practice.js`, `hours.js`: Kontakt, Rechts-/Maps-Links, Sprechzeiten.
- `content/navigation.js`, `seo.js`, `images.js`: Menüs, Metadaten, Bilddaten.
- `content/home.js`, `team.js`, `doctor.js`, `qualifications.js`, `anfahrt.js`: Texte und Fakten.
- `content/forms.js`, `content/services/`: Formularschemata und Leistungen.
- `src/main.js`, `router.js`, `routes.js`: Einstieg, Routing, explizite View-Imports.
- `src/components/`, `views/`: sichere DOM-Komponenten und Seitenaufbau.
- `src/lib/`: reine Logik, DOM-Helper, Speicher, Submit-Austauschpunkt.
- `src/behaviors/`: Theme, Schrift und Reveal mit DOM-Zugriff.
- `styles/`: je Datei ein Zweck; sämtliche Designwerte in `tokens.css`.
- `scripts/`, `tests/`, `docs/`: Prüfung, Server, Tests und Pflegeanleitungen.

## Wo ändere ich was?

| Änderung | Datei |
| --- | --- |
| Texte | Zuständige Datei in `content/` |
| Telefon, Adresse, Fax, E-Mail | `content/practice.js`; Shell-Fallback/JSON-LD abgleichen |
| Sprechzeiten | `content/hours.js`; Shell-Fallback/JSON-LD abgleichen |
| Farben, Größen, Abstände | `styles/tokens.css`: Light **und beide Dark-Blöcke** |
| Seitenaufbau | `src/views/` |
| Teammitglied | `content/team.js` |
| Leistung | Zuständige Datei in `content/services/` |
| Qualifikation | `content/qualifications.js` |
| Bild-URL/Ausschnitt/Fallback | `content/images.js` |
| Formularfeld oder Meldung | `content/forms.js` |
| Backend | `src/lib/submit-request.js`; `DEMO_MODE` erst nach sicherer Anbindung ändern |
| Neue Seite | View, `src/routes.js`, `content/navigation.js`, `content/seo.js` |

## Harte Regeln

1. Keine erfundenen Fakten, Zahlen, Auszeichnungen, Patientenstimmen oder Leistungen. Nichts Medizinisches ergänzen, das nicht aus der Originalseite stammt. Inhaltliche Aktualisierung nur mit gesicherter Quelle und Freigabe.
2. Heilmittelwerbegesetz und ärztliche Berufsordnung beachten: keine Heilversprechen, Superlative oder reißerische Sprache. Ruhig, kompetent, menschlich und per „Sie“ formulieren.
3. Keine Gesundheitsdaten per `mailto:`, keine Speicherung von Formulardaten, keine Tracker, externen Fonts/Skripte oder Karten-Embeds. Nur Theme-/Schrift-Einstellungen lokal speichern; Speicherfehler abfangen.
4. Impressum und Datenschutzerklärung bleiben Links auf die Originalseiten. Rechtstexte nicht nachbauen.
5. Barrierefreiheit mit WCAG 2.1 AA als Ziel in Hell **und** Dunkel sowie `prefers-reduced-motion` nie verschlechtern. Große Touch-Ziele, sichtbarer Fokus und verständliche Fehler bleiben erhalten.
6. Neue Farben ausschließlich als semantische Tokens in beiden Modi anlegen. Beide Dark-Blöcke müssen dieselben Tokens und Werte enthalten. Kontraste durch den Checker absichern.
7. Daten bleiben ohne Markup in `content/`. Keine Fließtexte/Fakten in `src/`; DOM mit `h()`/`textContent`, niemals Inhalts-`innerHTML`. JSON-LD und `noscript` sind die geprüften statischen Ausnahmen.
8. Bilder nur aus `content/images.js` und über `picture.js`; Porträts klein halten. Keine lokalen Bilder, Stockfotos oder KI-Bilder. Favicon/OG sind dokumentierte Metadaten-Ausnahmen.
9. Kleine Dateien, eine Verantwortung, englische Namen und deutsche Texte/Kommentare. Kopfkommentar mit Zweck, Eingaben und Pflegehinweis; Richtwert unter 250 Zeilen. JS-Hooks über `data-`Attribute, CSS über einfaches BEM.
10. Explizite relative Imports, keine berechneten dynamischen Imports, keine globale Mutation oder Code-Generierung zur Laufzeit. Globale DOM-Verbindung ausschließlich im Einstieg; Komponenten liefern bei Ressourcenbedarf `destroy`.
11. Status-, Datum- und Theme-Logik rein und testbar halten. Formulare teilen eine Komponente und dieselbe Validierung. Fehlertexte sind zusätzlich zur Farbe sichtbar.

## Vor jedem Commit

```sh
node scripts/check.mjs
node --test
```

Beide Befehle müssen fehlerfrei sein. Änderungen mit kurzen deutschen Commit-Nachrichten in sinnvollen Schritten committen; `main` muss nach jedem Push lauffähig bleiben. Kein Force-Push. Textänderungen in `docs/TEXT-CHANGES.md` nachtragen. Unsichere Fakten und ungeprüfte Annahmen in `docs/OPEN-POINTS.md` festhalten.
