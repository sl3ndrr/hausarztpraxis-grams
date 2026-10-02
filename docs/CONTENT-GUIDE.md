<!--
  Kurze Pflege-Rezepte mit echten Dateipfaden und schematischen Beispielen.
  Eingaben: Content-Schemata und Architektur.
  Beispiele nicht ungeprüft als medizinische Fakten übernehmen.
-->
# Inhalte sicher pflegen

Vor jeder Änderung `AGENTS.md` lesen. Danach die angegebenen Dateien ändern, Textänderungen protokollieren und `node scripts/check.mjs` sowie `node --test` ausführen. Medizinische Aussagen und neue Fakten nur nach Bestätigung übernehmen.

## Sprechzeit ändern

1. In `content/hours.js` den passenden Wochentag suchen.
2. `intervals` ändern; Zeiten mit führender Null im 24-Stunden-Format. Beispiel des bestehenden Montags:

```js
{ weekday: 1, label: 'Montag', intervals: [['07:30', '12:00'], ['15:00', '17:30']] }
```

3. In `index.html` die zugehörigen JSON-LD-Einträge und die `noscript`-Tabellenzeile abgleichen. Der Checker erkennt auch zusätzliche oder fehlende Intervalle. Keine View oder Statuslogik ändern.

## Leistung ergänzen

1. Die zuständige Datei unter `content/services/` öffnen.
2. In `sections` einen bestätigten Datensatz ergänzen; vorhandenes Beispiel:

```js
{ id: 'certificates', title: 'Gesundheitszeugnisse und Atteste',
  text: 'Bei Bedarf stellen wir Bescheinigungen für Beruf, Schule oder Versicherungen aus.',
  items: ['Arbeitsunfähigkeitsbescheinigungen', 'Gesundheitszeugnisse'] }
```

3. Eindeutige englische ID verwenden und die Quelle in `docs/TEXT-CHANGES.md` nennen. Karten/Akkordeons erscheinen automatisch. Ein neuer Leistungsbereich mit eigener Route ist eine neue Seite, siehe unten.

## Teammitglied ergänzen

1. Einen bestätigten Datensatz in `content/team.js` ergänzen; Schema:

```js
{ name: 'Bestätigter Name', role: 'Bestätigte Aufgabe', note: 'Optionaler bestätigter Zusatz' }
```

2. Ohne Bildschlüssel erscheint der zentrale Initialen-Fallback; die Karte bleibt lesbar. Damit reicht eine Content-Datei. Für ein neues freigegebenes Praxisfoto zusätzlich einen Eintrag in `content/images.js` anlegen und dessen Schlüssel als `image` setzen; Alttext, Layoutmaße und Initialen gehören dort hin.
3. Die Karte erscheint automatisch. Keine Änderungen an `home.js` oder `person-card.js` erforderlich.

## Qualifikation ergänzen

1. In `content/qualifications.js` die passende Liste wählen.
2. Nur den bestätigten Wortlaut als zusätzlichen String eintragen. Die Gesundheitsseite liest beide Listen automatisch.

## Seite hinzufügen

1. Eine kleine View-Datei in `src/views/` anlegen. `pageHeading()` verwenden; genau ein `h1` mit `tabindex="-1"`. Inhalte als Daten im passenden bestehenden Content-Modul halten. View liefert `{ element, destroy? }`.
2. In `src/routes.js` die View explizit importieren und einen Datensatz ergänzen, zum Beispiel `{ path: '/neue-seite', view: newView, seo: 'newPage', file: 'new-page.js' }`.
3. In `content/navigation.js` einen Link `{ text: 'Freigegebener Titel', href: '#/neue-seite' }` ergänzen.
4. In `content/seo.js` den passenden `newPage`-Eintrag mit Titel/Beschreibung ergänzen. Keine Routerlogik ändern.

## Farbe ändern

1. Das semantische Token in `styles/tokens.css` identifizieren, zum Beispiel `--color-primary`.
2. Light-Wert sowie beide identischen Dark-Werte ändern. Beispiel der bestehenden Light-Farbe: `--color-primary: #0D5666;`.
3. Keine Farbe direkt in Komponenten-CSS eintragen. Der Checker kontrolliert Token-Parität und definierte Kontrastpaare; bei Fehlern Farbwert anpassen.

## Formularfeld ändern

1. In `content/forms.js` die Konfiguration auswählen und einen Feld-Datensatz pflegen, zum Beispiel `{ name: 'medication1', label: '1. Medikament', required: true, error: 'Bitte tragen Sie Ihr erstes Medikament ein.' }`.
2. Eindeutigen englischen Namen und bei Pflichtfeldern einen verständlichen Fehlertext verwenden. Die gemeinsame Komponente rendert Labels, Felder und Fehlermeldungen automatisch. Keine Übermittlung/ Speicherung ergänzen.

## Kontakt ändern

1. `content/practice.js` pflegen, einschließlich passender `tel:`-/Maps-Links.
2. JSON-LD und `noscript` in `index.html` abgleichen; Metadaten bei geändertem Praxisnamen ebenfalls prüfen. Keine Telefonnummern oder Adressen in `src/` eintragen.
