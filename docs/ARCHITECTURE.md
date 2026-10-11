<!--
  Architektur und Datenfluss des statischen Praxisentwurfs.
  Eingaben: tatsächliche Content-Module, Komponenten und Tests.
  Struktur- und Verhaltensänderungen hier zusammen mit README/AGENTS nachführen.
-->
# Architektur

`content/` enthält ausschließlich Daten ohne Markup/Funktionen. Praxis und reguläre Zeiten bleiben in practice.js/hours.js, Leistungsdaten in services/, Qualifikationen in qualifications.js. `presentation.js` enthält neue Bedienbeschriftungen, `search.js` referenziert die drei Leistungsquellen ohne Kopie medizinischer Texte. `h()` erzeugt DOM/Text sicher, niemals Inhalts-innerHTML. Statische JSON-LD-/noscript-Daten sind geprüfte Ausnahmen.

`main.js` verbindet globale Mountpunkte, Einstellungen und Außenklick. Der Header liefert eigenes Element, Menüschließung, Außenklick-Handler und Cleanup; sein Live-Status-Timer wird beim Entfernen beendet. Schrift und Theme besitzen weiterhin drei Stufen bzw. Automatik/Hell/Dunkel und speichern ausschließlich diese Einstellungen fehlertolerant. Beide Dark-Tokenblöcke sind identisch; die automatische CSS-Wahl und theme-init.js vermeiden Darstellungsflackern.

`route-location.js` zerlegt `#/route?section=id` rein und akzeptiert ausschließlich sichere englische IDs. Der Router räumt View-Ressourcen/Reveal auf, setzt SEO, Navigation, höfliche Ansage und Fokus. Existiert der Deep-Anker, scrollt/fokussiert er dieses Ziel und markiert den Kapitel-Link mit aria-current=location; andernfalls das einzige H1. Browser-Zurück bleibt Hash-Verhalten. Der Skip-Link fokussiert main ohne Route zu ändern.

## Komponenten und reine Logik

| Verantwortung | Dateien |
| --- | --- |
| Reguläre Berliner Öffnung | `lib/opening-status.js`, `components/live-status.js` |
| Textzeiten, Wochenbalken und Jetzt-Marke | `lib/week-segments.js`, `components/week-hours.js` |
| Sichtbare Altersstufen | `lib/age-stages.js`, `components/age-stages.js` |
| Lokale Suchfilter und Inhaltsindex | `lib/service-search.js`, `components/service-search.js` |
| Lokale vCard, Escaping und UTF-8-Faltung | `lib/vcard.js`, `components/contact-tools.js` |
| Offene Kapitel und Orientierung | `components/service-detail.js`, `breadcrumbs.js`, `qualifications.js` |
| Demo-Ablauf und gemeinsame Validierung | `components/request-progress.js`, `request-form.js`, `lib/validate.js` |
| Isolierte Druckkarte | `components/practice-card.js`, `styles/print.css` |

Die Statuslogik verwendet Europe/Berlin statt Browser-/UTC-Tagesgrenzen und modelliert ausschließlich reguläre Zeiten. Keine Feiertags-/Urlaubsaussage. Globaler kompakter Header-Chip hat einen zugänglichen Grundlagenhinweis und Titel; im Hero und an Wochenzeiten steht die Grundlage sichtbar. Wochenbalken leiten Skala/Segmente aus den Intervallen ab; Textzeiten und das ausgeschriebene „heute“ bleiben sichtbar, die geometrische Grafik ist ergänzend. Komponenten mit Timern oder Blob-URLs liefern destroy; Views reichen diesen Cleanup weiter.

Leistungen sind offen gerenderte Kapitel; Qualifikationen erscheinen genau einmal in rein gestalterischen Indexgruppen. Die Altersleiste ergänzt bestehende Titel durch dieselben numerischen Grenzen, ohne Ansprüche oder Intervalle abzuleiten. Suche indexiert Kapiteltexte/Listen/Stufen, Qualifikationen und Privatverfahren. Alle Suchwörter müssen passen; Groß-/Kleinschreibung, diakritische Zeichen und ß werden normalisiert. Ergebnisse sind normale Tastatur-Links mit Trefferansage; nichts wird gespeichert oder extern übertragen.

Die Formulare teilen Schema, Datum/Pflichtfeld-Validierung und submit-request.js. Im Demo-Modus werden Eingaben ausschließlich lokal geprüft; der dritte Ablaufschritt nennt telefonischen Kontakt. Keine Übermittlung, Speicherung oder Gesundheitsdaten per mailto. Nach Erfolg und Unmount werden Werte zurückgesetzt. Datum muss existieren, vierstellig sein, darf nicht zukünftig oder über 130 Kalenderjahre alt sein; dies ist technische Plausibilität, keine medizinische Aussage. Fehler erscheinen textlich an Feld und Zusammenfassung mit Fokusführung. Ohne sicheres Backend scheitert deaktivierter Demo-Modus weiter sicher.

Kontaktkomfort generiert vCard ausschließlich lokal aus practice.js, maskiert Sonderzeichen und faltet nach 75 UTF-8-Oktetten. Der Blob-URL bleibt nur für die View-Lebensdauer. Clipboard-Fehler führen zu sichtbarer manueller Kopierhilfe. Druck der Anfahrt zeigt die gesonderte Praxiskarte mit Adresse, Telefon und Sprechzeiten; reine CSS-Selektion, keine globalen Druckzustände.

## Gestaltung und Ressourcen

`picture.js` bleibt die einzige Bildausgabe, liest ausschließlich images.js und liefert reservierte Maße sowie Initialen-Fallback. Porträts wachsen nie über 200 CSS-Pixel, auch nicht mit größter Schrift. Das Hero-Foto steht in einem eigenen Rahmen ohne Overlay/Textüberlagerung; das Motiv bleibt freigabepflichtig. Das Universitätslogo und sein Fallback haben gesondert geprüfte helle Farben.

CSS ist nach Basis, Layout, Komponenten, Startseite, Stunden, Leistungen, Menschen, Kontakt/Formular, Suche, Bewegung und Druck geteilt. Sämtliche Designwerte sind Tokens; die drei Tokenblöcke werden auf Schlüssel-/Wertparität und definierte Kontrastpaare geprüft. Mediengrenzen dürfen feste Pixelwerte haben. Berechnete Balken-Prozentwerte stammen aus reinen Datenfunktionen. Reveal/Feedback bewegen nur transform/opacity, ohne automatische Bildbewegung oder pulsierenden Status; reduced-motion deaktiviert alle Bewegungen, auch bei Systemwechsel. Auf kleinen Ansichten bleibt der Header im Dokumentfluss, die mobile Telefon-/Anfahrtleiste erreichbar; Desktop-Header und Kapitelanker sind sticky.

Kein Build, keine Abhängigkeiten, Tracker, externen Fonts/Skripte oder Karten-Embeds. Rechts-/Maps-/Universitätsziele bleiben normale Links, Praxisbilder die einzige externe Bildquelle. Hosting weiterhin statisch mit Hash-Routing und relativen URLs, inklusive GitHub-Pages-Unterpfad. Checker und reine Tests plus DOM-Testdouble sind keine visuelle Browser-, Screenreader- oder vollständige WCAG-Abnahme.

`scripts/check-http.mjs` startet den vorhandenen Server kurz auf einem zufälligen lokalen Port, prüft alle Website-Ressourcen/MIME-Typen und 404/403 und beendet den Kindprozess. Kein externer Aufruf.
