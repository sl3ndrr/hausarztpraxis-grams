# Hausarztpraxis Grams

- Node.js 24. `npm ci` installiert die gesperrten Versionen. `npm run dev` startet die Vorschau, `npm run build` schreibt `_site/`, `npm test` prüft den gebauten Stand.
- Seiten liegen unter `src/`, Layouts unter `src/_includes/`. Praxisanschrift, Telefon, Wochenplan und Formularziele stehen in `src/_data/praxis.js`. Vorschauzeile, Indexierung, Betreiberangaben und Basispfad stehen in `src/_data/site.js`. Interne Links nutzen den Eleventy-Filter `url`.
- Lokale Assets liegen in `src/assets/`. Die SIL Open Font License bleibt bei der Schriftdatei. Praxisbilder nur nach Freigabe für diese Veröffentlichung einbinden.
- Änderungen über einen Feature-Branch und PR einbringen. Die PR-Prüfung baut und validiert Seiten- und Assetpfade sowie die Zeitlogik. Betroffene Ansichten im Browser prüfen. Nach Merge baut der Push auf `main` erneut und GitHub Actions veröffentlicht ausschließlich `_site/` auf GitHub Pages. Veröffentlichungsquelle in den Repository-Einstellungen ist **GitHub Actions**.
- Bei einem späteren Domainwechsel brauchen beide Formularlinks weiterhin erreichbare Formularziele außerhalb der neuen statischen Serviceseiten. Sonst zeigen sie auf die Serviceseiten selbst.
