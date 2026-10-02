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
8. `styles/`: Tokens, Basis, Layout, Komponenten, Ansichten, Bewegung, Druck.
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
```

Die Prüfung kontrolliert Fakten, Importpfade, Routen, Bildmetadaten, externe Hosts, Token-Parität und Kontraste beider Themes. Die Tests decken Öffnungsgrenzen, Berliner Sommer-/Winterzeit, Geburtsdatum, Pflichtfelder und Theme-Auflösung ab. `npm run check`, `npm test` und `npm run serve` sind gleichwertige Kurzbefehle.

## GitHub Pages

In GitHub unter **Settings → Pages → Build and deployment** „Deploy from a branch“, Branch **main**, Ordner **/ (root)** wählen und speichern. Die Branch-Root enthält direkt die Website; `.nojekyll` verhindert Jekyll-Verarbeitung. Nach erfolgreicher Veröffentlichung lautet die Vorschau `https://sl3ndrr.github.io/hausarztpraxis-grams/`. Pages wurde während der Umsetzung nicht aktiviert. Alle lokalen Ressourcen nutzen relative URLs und funktionieren auch unter diesem Unterpfad.

Vor einem späteren Livegang: `docs/OPEN-POINTS.md` abarbeiten, Fakten bestätigen, Datenschutz prüfen, Backend sicher anbinden und die statischen SEO-URLs an das tatsächliche Veröffentlichungsziel anpassen. Hash-Routing ist für Suchmaschinen eingeschränkt.

## Pflege

Zuerst `AGENTS.md` und `docs/CONTENT-GUIDE.md` lesen. Änderungen an Sprechzeiten oder Kontakt erfordern zusätzlich den Abgleich von JSON-LD und `noscript` in `index.html`; der Checker erzwingt dies. Bild-URLs bleiben auf der Originaldomain, Impressum und Datenschutzerklärung bleiben Links auf die Originalseiten.
