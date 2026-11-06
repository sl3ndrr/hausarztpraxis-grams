<!--
  Annahmen, Bestätigungsbedarf, Erweiterungsvorschläge und tatsächliche Abnahme.
  Eingaben: verbindlicher Auftrag, vorhandene Fakten und gemessene Prüfergebnisse.
  Freigaben und neue bestätigte Quellen mit Datum nachführen.
-->
# Offene Punkte

## Praxisschild am 06.11.2026

Ausgangsstand ist `main` bei `4340587ef083dba3fa4a32763f6884db5010f803`. Hallmark v2.0.0 wurde aus dem Originalrepository bei `407fa689f4a276f2fd389208d271d0fef08f5058` gelesen und für ein vollständiges Custom-Redesign eingesetzt. Die technische Umsetzung liegt im lokalen Arbeitsbranch `redesign/praxisschild`.

| Prüfung | Tatsächlicher Umfang |
| --- | --- |
| Repository | `node scripts/check.mjs`, 33 Node-Tests, HTTP-Prüfung von 85 Ressourcen einschließlich 404 und 403 sowie `git diff --check` erfolgreich. |
| Kontraste | Je Modus 22 Textpaare und 8 Paare für Fokus, Grenzen und die Schildlinie. Kleinster Textkontrast 7,45:1 in Hell und 8,12:1 in Dunkel. Kleinster Wert für Fokus und Grenzen 4,08:1 in Hell und 4,41:1 in Dunkel. |
| Hallmark | `sloplint --render --before`, `--stage hero` und `--render --kept` mit laufenden lokalen Servern aufgerufen. Vorher und nachher waren die neun unten aufgeführten Hash-Routen als URLs übergeben. Statischer Abschluss ohne FAIL, REFLEX oder WARN. Der statische Erhaltungsabgleich fand 7/7 Links und 4/4 Skript-Hooks in der HTML-Shell. |
| Erhaltungsabgleich der Views | Zusätzlich alle neun Ansichten, Header, Footer und Mobilleiste mit dem vorhandenen DOM-Testdouble verglichen. Alle 75 Linkzielvorkommen, 72 Abschnitts- und Feld-IDs, 24 Eingaben, 29 Listener und 12 Bildvorkommen des Ausgangsstands sind wieder vorhanden. Die Suche erreicht weiterhin alle bisherigen Ergebnisziele. Das entfernte Reveal-Attribut diente der weggefallenen Einblendung. |
| Zustände | DOM-Tests decken Menü/Escape/Fokus, regulären Berliner Wochentag, leere und gefüllte Suche, Formularfehler und lokales Demo-Ergebnis ab. Zusätzlich geprüft wurden die bestehenden Sprungziele, der Bild-Fallback, Kopierfeedback, der Druckaufruf und die Freigabe der vCard-URL. |
| Frischer Kontext | Ein unabhängiger Code- und DOM-Review führte zu Korrekturen an Druck, Anliegeneinstieg, schmalem Header und Terminbegründung. |

Routen für Hallmark und DOM-Abgleich: `#/`, `#/leistungen`, `#/leistungen/gesundheit`, `#/leistungen/vorsorge`, `#/leistungen/sportmedizin`, `#/arzt`, `#/rezeptwunsch`, `#/ueberweisungswunsch`, `#/anfahrt`.

Der Hallmark-Renderteil meldete fehlendes `puppeteer-core`. Ein lokal ausführbares Chromium war ebenfalls nicht vorhanden. Der Cloud-Browser scheiterte schon an der Verbindungsprüfung. Deshalb stehen die visuellen Hallmark-Reviews, gerenderte Screenshots und die Abnahme bei 360, 390, 768, 1280 und 1440 CSS-Pixeln sowie 1920 für die Breitenbegrenzung aus. Das gilt auch für 200 % Browser-Zoom, die sichtbare Tastaturfokuslage bei fester Leiste, beide Themes, größte Schrift, reduzierte Bewegung, tatsächliche Bilder und den Druck auf Papier. DOM-Momentaufnahmen dienen als Vorher/Nachher-Ansicht zum Öffnen im Browser.

Die Originalfotos bleiben in der vorhandenen Bildpipeline. Das bisherige Titelbild ist untergeordnet bei den Besuchsinformationen eingebunden. Eine verlässliche visuelle Prüfung aller Motive, der tatsächlichen Ausschnitte und Bildrechte steht aus. Inhaltliche Freigaben für Praxisangaben und Verkehrsinformationen sind weiterhin offen. Die Formulare bleiben lokale Demos.

## Ausgangspunkt der Überarbeitung vom 11.10.2026

- Überarbeitung am 11.10.2026 auf `main`, Ausgangscommit `eed1a004633ed847e7930fc41cbd965a9b2e6c90`. Ausgangschecker bestanden, 13 Tests grün. Kein Framework, Build oder Paket ergänzt.
- Alle vorhandenen medizinischen Aussagen, Rollen, Kontaktdaten und Zeiten bleiben verbindlicher Quellenstand. Die Überarbeitung ist keine fachliche Aktualisierung.
- Drei Hauptbereiche reichen im Header. Alle ursprünglichen Seiten bleiben über Anliegen, Leistungsnavigation und Footer erreichbar. Smartphone-Header im Dokumentfluss verhindert dauerhafte Überdeckung; Telefon bleibt in der festen Mobilleiste erreichbar.
- Das ungeprüfte Hero-Motiv ist rein ergänzend und steht ohne Textüberlagerung. Porträts maximal 200 CSS-Pixel; Bildfehler haben einen lesbaren Fallback.
- DMP/Schulungen/Sonographie/Weiteres sind reine Darstellung. Schulungen mit DMP-Bezug stehen unter Schulungen; jede Originalqualifikation erscheint genau einmal.
- Die Altersleiste zeigt vorhandene Stufen ohne geometrischen Anspruch auf Lebensaltermaßstab oder neue medizinische Ableitungen.
- Status nur auf Grundlage regulärer Zeiten in Europe/Berlin. Wochenendzeilen bedeuten ausschließlich keine regulären Intervalle. Urlaub/Feiertage werden nicht vermutet.
- Wunschformulare bleiben Demo, auch nach erfolgreicher lokaler Prüfung. Mindestens zwei Werktage bleiben vorhandene Information, keine Zusage der Demo.

## Vor Freigabe durch den Praxisinhaber

1. Medizinische Aktualität, Altersgrenzen/Intervalle, Qualifikationen, Lebenslauf, Teamrollen und Anfahrtangaben bestätigen. Keine unbestätigten Fakten wurden neu ergänzt.
2. Hero-Motiv, präziseren Alttext, Originalmaße/Ausschnitt und alle Bildrechte prüfen. Direktabrufe bleiben auf der Praxisdomain; Bilder wurden in dieser Sitzung nicht visuell geprüft.
3. Visuelle Abnahme bei den oben aufgeführten Größen und Zuständen nachholen. Insbesondere keine horizontale Überbreite und sichtbarer Fokus sind ohne Layoutengine nicht abschließend bestätigt.
4. Screenreader-Abnahme, tatsächliche vCard-Importe und Druckausgabe auf den Geräten der Praxis prüfen. Rechnerische Kontraste und DOM-Smoke-Tests ersetzen das nicht.
5. Rechtliche Freigabe einschließlich HWG/Berufsordnung/Datenschutz, direkte Praxisbilder und Speicherung nur von Theme/Schrift prüfen. Original-Rechtslinks bleiben erhalten.
6. Hosting-/SEO-Ziel bestätigen: Hash-Routing und statische Metadaten bleiben, GitHub Pages wurde nicht neu aktiviert. Demo niemals ohne sichere Anbindung zur echten Übermittlung erklären.

## Erweiterungsvorschläge

Alle folgenden Punkte wurden ausschließlich vorgeschlagen, nicht umgesetzt.

| Vorschlag | Nutzen | Benötigte Information/Freigabe | Aufwand |
| --- | --- | --- | --- |
| FAQ „Was bringe ich zum Termin mit?“ | Vorbereitung erleichtern | Bestätigte Unterlagenliste je Anlass | Klein |
| Barrierefreiheit der Praxis / Parken | Anreise verlässlich planen | Zugang, Stufen, Aufzug, WC, Parkplätze, Entfernungen | Klein bis mittel |
| Im Team gesprochene Sprachen | Verständigung planen | Bestätigte Sprachen und Verfügbarkeit | Klein |
| Aktuelles-/Hinweisband | Urlaub, Vertretung, Feiertage, Impfaktionen sichtbar | Gepflegte Datenquelle, Zuständigkeit, Ablaufdatum, bestätigte Angaben | Mittel |
| Online-Terminbuchung | Telefonwege ergänzen | Anbieter, verfügbare Terminarten, Datenschutz und Freigabe | Mittel bis groß |
| Sichere Formularübermittlung | Wunschformulare tatsächlich nutzbar | Backend, Transport, Zugriff, Aufbewahrung, Prozess und Datenschutzfreigabe | Groß |
| Karte mit Zwei-Klick-Einwilligung | Räumliche Orientierung | Änderung/Freigabe von Regel 3, Kartenanbieter und Datenschutz | Mittel; derzeit ausgeschlossen |
| Praxisrundgang | Räume vorab kennenlernen | Echte freigegebene Praxisfotos, Bildrechte, Alttexte | Mittel |
| Kurzfassung in Leichter Sprache | Verständlichkeit erweitern | Fachliche und sprachliche Prüfung durch Zielgruppe | Mittel |
| Seite für Medizinstudierende | Lehrpraxis konkret vorstellen | Ansprechpartner, Ablauf, Voraussetzungen, Bewerbungsweg | Mittel |
| Ausbildung / Stellen | Bewerbende gezielt informieren | Tatsächliche Angebote, Anforderungen, Kontakt und Verfahren | Mittel |
| Statische Einzelseiten / Pfad-Routing | Suchmaschinen und Direktaufrufe verbessern | Hostingziel, URL-Konzept, Weiterleitungen; Änderung der Hash-Vorgabe | Mittel bis groß |
| Selbst gehostete freie Schrift, z. B. Atkinson Hyperlegible | Mehr typografischer Ausdruck | Lizenz, Dateien, Performancebudget und Freigabe der Schriftregel | Klein bis mittel |

## Eigene Verbesserungen

| Verbesserung | Status / Nutzen | Benötigte Information | Aufwand |
| --- | --- | --- | --- |
| Eindeutiger Demo-Prüfbutton statt „absenden“ | Umgesetzt: verhindert falsche Übermittlungserwartung | Vorhandener Demo-Modus | Klein |
| Kapitel-Deep-Links mit Fokus und aktuellem Anker | Umgesetzt: Teilen/Zurück/Orientierung verbessern | Bestehende Abschnitts-IDs | Klein |
| Kopierfehler sichtbar und Logo-Fallback kontrastgeprüft | Umgesetzt: auch bei Plattform-/Bildfehlern verständlich | Vorhandene Daten | Klein |
| Verantwortliche und regelmäßige Inhaltsprüfung | Vorschlag: fachliche/veraltete Angaben gezielt pflegen | Praxiszuständigkeit und Prüfrhythmus | Klein |
| Ablaufdatum für künftige Statusausnahmen | Vorschlag: veraltete Urlaubshinweise vermeiden | Gepflegte Ausnahmequelle und Verantwortliche | Mittel |
| Tatsächliche Gerätetests mit älteren Patientinnen/Patienten | Vorschlag: Bedienwege/Lesbarkeit validieren | Freiwillige Testgruppe und Freigabe | Mittel |

## Technische Abnahme 11.10.2026

- Vor jedem der sechs Phasen-Commits: `node scripts/check.mjs` und `node --test` fehlerfrei.
- Endzustand: statischer Checker prüft Fakten/Fallbacks, Syntax/Imports, neun Routen, neun Bilddatensätze, Tokens, Dark-Parität und alle definierten Farbpaare. Textpaare einschließlich Buttons mindestens 7:1; Fokus/Feldgrenzen mindestens 3:1. Hero-Overlay-Prüfung durch Verbot der alten Overlay-Regel ersetzt.
- 31 Tests bestanden, keine übersprungenen Tests: Berliner Öffnungsgrenzen, Datum/Pflichtfelder, Theme, Wochenbalken/Jetzt-Grenzen, Altersstufen, vollständige Qualifikationsgruppen, Suchfilter/Deep-Ziele, vCard-Sonderzeichen/75-UTF-8-Oktett-Faltung sowie sieben DOM-Smoke-Tests.
- DOM-Testdouble: alle neun Views, genau ein H1, eindeutige IDs, offene Leistungskapitel, Anliegenziele, Suchzustände, Einstellungen/Escape/Fokus, Formularfehler und Demo-Erfolg, Router/Fehlerroute und Ressourcen-Cleanup geprüft. Keine CSS-/Layoutberechnung.
- `node scripts/check-http.mjs`: 85 HTML/CSS/JS-Ressourcen mit Status 200 und passenden MIME-Typen; 404/403 korrekt. `git diff --check` fehlerfrei.
- Keine Screenshots oder visuelle Browserprüfung: Playwright ist installiert, Chromium-Binary fehlt. Cloud-Browser-Aufruf der lokalen Vorschau scheitert mit `net::ERR_BLOCKED_BY_CLIENT`. Keine Umgehung, keine behauptete visuelle Abnahme. Screenreader, Drucklayout und Gerätekontakte bleiben offen.
