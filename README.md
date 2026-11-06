<!--
  Überblick und Einstieg für Praxisinhaber und künftige Bearbeitungen.
  Eingaben: Architektur des statischen Entwurfs.
  Start- und Prüfbefehle bei Änderungen aktuell halten.
-->
# Hausarztpraxis Grams

Visueller Relaunch als Entwurf zur Freigabe durch den Praxisinhaber. Reines HTML, CSS und Vanilla-JavaScript, ohne Build und ohne Abhängigkeiten. Die Formulare laufen im Demo-Modus: Es werden keine Daten übermittelt oder gespeichert.

## Struktur in zehn Zeilen

1. `index.html`: Shell, statische SEO-Daten und JavaScript-Fallback.
2. `content/`: sämtliche Texte, Fakten, Bilder und Formularschemata.
3. `content/services/`: Leistungsübersicht und die drei Detailbereiche.
4. `src/main.js`, `router.js`, `routes.js`: Einstieg und Hash-Routing.
5. `src/views/`: Aufbau je Ansicht.
6. `src/components/`: wiederverwendbare DOM-Komponenten.
7. `src/lib/`, `src/behaviors/`: reine Logik und DOM-Verhalten.
8. `styles/`: Tokens, Basis/Layout, Komponenten, Ansichten/Stunden/Leistungen/Menschen/Kontakt/Suche, Bewegung und Druck.
9. `scripts/`, `tests/`: Prüfungen und lokaler Server ohne Pakete.
10. `docs/`, `AGENTS.md`: Pflegeanleitungen, Entscheidungen und offene Punkte.

## Lokal ansehen

Im Repository-Root mit Node.js 20 oder neuer:

```sh
node scripts/serve.mjs
```

Danach `http://localhost:8080` öffnen. Alternativ `python3 -m http.server 8080` im Root ausführen. ES-Module funktionieren **nicht über `file://`**. Keine Installation und kein `npm install` erforderlich.

## Prüfen

```sh
node scripts/check.mjs
node --test
node scripts/check-http.mjs
```

Die Prüfung kontrolliert Fakten, Importpfade, Routen, Bildmetadaten, externe Hosts, Token-Parität und Kontraste beider Themes. Die Tests decken Öffnungsgrenzen, Berliner Sommer-/Winterzeit, Datum/Pflichtfelder, Theme, Altersstufen, Wochenbalken, Suchfilter, vCard und DOM-Komponenten/Routing ohne Layoutengine ab. `npm run check`, `npm test` und `npm run serve` sind gleichwertige Kurzbefehle.

## GitHub Pages

In GitHub unter **Settings → Pages → Build and deployment** „Deploy from a branch“, Branch **main**, Ordner **/ (root)** wählen und speichern. Die Branch-Root enthält direkt die Website; `.nojekyll` verhindert Jekyll-Verarbeitung. Nach erfolgreicher Veröffentlichung lautet die Vorschau `https://sl3ndrr.github.io/hausarztpraxis-grams/`. Pages wurde während der Umsetzung nicht aktiviert. Alle lokalen Ressourcen nutzen relative URLs und funktionieren auch unter diesem Unterpfad.

Vor einem späteren Livegang: `docs/OPEN-POINTS.md` abarbeiten, Fakten bestätigen, Datenschutz prüfen, Backend sicher anbinden und die statischen SEO-URLs an das tatsächliche Veröffentlichungsziel anpassen. Hash-Routing ist für Suchmaschinen eingeschränkt.

## Pflege

Zuerst `AGENTS.md` und `docs/CONTENT-GUIDE.md` lesen. Änderungen an Sprechzeiten oder Kontakt erfordern zusätzlich den Abgleich von JSON-LD und `noscript` in `index.html`; der Checker erzwingt dies. Bild-URLs bleiben auf der Originaldomain, Impressum und Datenschutzerklärung bleiben Links auf die Originalseiten.


## Das offene Praxisschild

Der Einstieg zeigt die Praxis am Narzissenweg, den telefonischen Kontakt und die reguläre Woche. Rezept- und Überweisungswünsche führen in gekennzeichnete Demo-Formulare. Das Leistungsregister bündelt die medizinischen Einstiege und die lokale Suche. Arzt, Team, Lehrpraxis und Anfahrt behalten die vorhandenen Praxisinhalte.

Das Design-System gilt für alle neun Hash-Routen. Hell, Dunkel, Automatik und die drei Schriftstufen bleiben in der Praxisleiste erreichbar. Auf kleinen Fenstern ergänzt die Kontaktleiste Telefon und Anfahrt. In der Anfahrt bleiben Adresskopie, vCard und Druck der Praxiskarte verfügbar.

Stand und Grenzen der Prüfung stehen in [docs/OPEN-POINTS.md](docs/OPEN-POINTS.md). Das Design und die Redaktion sind in [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) und [docs/TEXT-CHANGES.md](docs/TEXT-CHANGES.md) dokumentiert.

## Mitwirkende

[Codex](https://github.com/codex) hat zu diesem Projekt beigetragen.
