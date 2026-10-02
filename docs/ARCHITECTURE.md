<!--
  Datenfluss und technische Konventionen des Entwurfs.
  Eingaben: tatsächlicher Code; kein Build-System.
  Bei Struktur- oder Verhaltensänderungen hier nachführen.
-->
# Architektur

`content/` exportiert reine Objekte und Arrays. Inhalte werden mit expliziten Imports in Komponenten/Views gelesen. `h()` erzeugt DOM-Nodes und Text; Strings werden nie als HTML interpretiert. Geteilte Fakten stehen ausschließlich in `practice.js` bzw. `hours.js`. Name und Bild-Alttexte beziehen sich auf diese Daten. Ausnahmen sind statisches JSON-LD und `noscript` im HTML; `check.mjs` gleicht sie exakt ab.

`main.js` mountet Header, Footer und Mobilleiste einmalig und initialisiert Einstellungen. `router.js` liest die Route aus dem Hash und sucht sie in `routes.js`. Vor jedem Wechsel beendet er Reveal-Observer und View-Ressourcen, schließt Menüs und ersetzt nur den Main-Inhalt. Er setzt Titel/Beschreibung, `aria-current="page"`, Scrollposition und Fokus auf das einzige `h1`, dazu eine höfliche Live-Ansage. Unbekannte Routen werden als freundliche Fehleransicht gerendert. Der Skip-Link fokussiert `main` ohne Änderung des Routing-Hashes.

Views geben `{ element, destroy? }` zurück. Die Stundenkarte aktualisiert den Status regelmäßig und beendet ihr Intervall beim Entfernen. Die reine Statusfunktion berechnet das lokale Berliner Kalenderdatum mit `Intl`, statt Browserzeitzone oder UTC-Tagesgrenzen zu verwenden. Reguläre Zeiten bilden weder Feiertage noch Urlaub oder kurzfristige Abweichungen ab; der Statushinweis macht diese Grundlage sichtbar.

Die gemeinsamen Formulare werden aus `forms.js` gerendert. Namen, Anforderungen und Fehlermeldungen liegen dort; Datum und Pflichtfelder werden von der reinen `validate.js` geprüft. Das Geburtsjahr muss vierstellig sein, das Datum existieren, höchstens 130 Kalenderjahre zurückliegen und darf nicht in der Zukunft liegen. Diese technische Plausibilitätsgrenze ist keine medizinische Aussage. Fehlerzusammenfassung und feldbezogene Texte unterstützen Tastatur und Screenreader. Ausschließlich `submit-request.js` darf später übermitteln. Aktuell gibt die Funktion im Demo-Modus eine klare Simulation zurück; ohne eingerichtetes Backend scheitert sie sicher. Formularwerte bleiben nur kurzzeitig im Arbeitsspeicher und werden nach Demo-Erfolg oder Entfernen des Formulars zurückgesetzt.

`theme-init.js` liest synchron vor den Styles nur eine explizite Light-/Dark-Wahl. Fehlende/ungültige Werte bedeuten Automatik. CSS setzt Light-Tokens, automatische Dark-Tokens im Media-Block und manuelle Dark-Tokens im Attribut-Block. Die beiden Dark-Blöcke sind absichtlich identisch und werden geprüft. `behaviors/theme.js` synchronisiert alle Radio-Gruppen, verfolgt Systemänderungen live und setzt `color-scheme`/`theme-color`. Nur manuelle Wahl wird gespeichert; Automatik entfernt den Speicherwert. Schriftgrößen haben drei Stufen. Speicherzugriffe sind fehlertolerant.

`picture.js` lädt ausschließlich zentral definierte Praxisbilder, reserviert Layoutmaße und zeigt bei Ladefehlern Initialen. Der Hero lädt prioritär, alle anderen Bilder lazy. Maße sind reservierte Layoutmaße; tatsächliche Originalmaße/Motive müssen vor Freigabe geprüft werden. Das Uni-Logo bleibt auf einer hellen Fläche. Icons sind feste selbst gezeichnete SVG-Pfade mit `currentColor`, stets neben sichtbarem Text.

Keine Tracker, externen Fonts, Skripte oder automatischen Karten-Embeds. Externe Ressourcen sind ausschließlich Bilder der Praxisdomain; Rechts-, Universitäts- und Maps-Ziele sind normale Links. Es werden keine Cookies gesetzt. Ein Cookie-Banner ist für diese Umsetzung nicht vorgesehen. Nur Schriftgröße und expliziter Darstellungsmodus werden lokal im Browser gespeichert; die Datenschutzerklärung der Praxis muss diese Speicherung ggf. berücksichtigen. Rechtliche Freigabe vor dem Livegang steht aus.

Dateinamen/Klassen sind englisch, Kommentare/Texte deutsch. Styles verwenden semantische Tokens; Mediengrenzen dürfen feste Pixelwerte haben, da CSS-Variablen in Media-Queries nicht auswertbar sind. `motion.css` bewegt nur `transform`/`opacity`, zentral mit Tokens. Reveal-Ausgangszustände gelten nur mit aktivem JS/Observer; reduzierte Bewegung zeigt alle Inhalte sofort. Die Statusanimation ist auf drei Wiederholungen begrenzt. Druck erzwingt helle Flächen und dunkle Schrift, zeigt auch Akkordeoninhalte und verbirgt Navigation/feste Leisten.

Die Website läuft unter jedem statischen HTTP-Server, einschließlich GitHub Pages im Branch-Root und einem Unterpfad. ES-Module erfordern HTTP(S), nicht `file://`. Kein Build und keine Dependencies. `scripts/check.mjs` prüft syntaktische und inhaltliche Konsistenz; `scripts/lib/check-tokens.mjs` hält Kontrastmathematik separat. Diese Prüfungen ersetzen keine visuelle Browser- und Screenreader-Abnahme.
