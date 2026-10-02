<!--
  Gestaltung, Kontrastziele und Regeln für wiederverwendbare Komponenten.
  Eingaben: tatsächliche Tokens und Styles.
  Bei visuellen Änderungen Light und Dark gemeinsam dokumentieren.
-->
# Design-System

Ruhige Petrol-/Mintflächen mit warmem Sand-Akzent. Große Systemschrift für Fließtext, Charter/Iowan Old Style/Georgia für Überschriften, keine externen Fonts. Basis 20 px, vergrößerbar auf 22 und 24 px. Mobile-first ab 360 px; Hauptraster ab 900 px mehrspaltig, Inhaltsbreite maximal 1200 px. Ab 1300 px können die Einstellungen neben dem Kopfbereich stehen; darunter erhalten sie Platz oberhalb der Navigation.

| Semantisches Token | Hell | Dunkel |
| --- | --- | --- |
| `--color-bg` | `#F8FBFB` | `#0F1C21` |
| `--color-surface` | `#FFFFFF` | `#172A31` |
| `--color-surface-raised` | `#E6F3F2` | `#1D343C` |
| `--color-text` | `#14272E` | `#E8F1F2` |
| `--color-muted` | `#334A51` | `#B8CDD2` |
| `--color-primary` | `#0D5666` | `#80CCDC` |
| `--color-on-primary` | `#FFFFFF` | `#0A2A32` |
| `--color-border` | `#60767D` | `#829FA8` |
| `--color-warm` | `#F3E3CF` | `#3A2F22` |
| `--color-on-warm` | `#392B1C` | `#F3E3CF` |
| `--color-status` | `#14522F` | `#5FD38D` |

Verbindliche Werte stehen ausschließlich in `styles/tokens.css`. Die Startwerte für Primärfarben wurden leicht angepasst, um auch auf Mint/erhöhten Dark-Flächen mindestens 7:1 zu erreichen. Dunkle Flächen verwenden feine Trennlinien statt Schatten; Formularrahmen sind heller und kontrastreich. Der Checker prüft Fließtext ≥ 7:1, Buttontext ≥ 4,5:1 sowie Feldrahmen/Fokus ≥ 3:1. Diese Tokenpaare sind keine vollständige WCAG-Zertifizierung.

`--space-1` bis `--space-9` bilden die Abstandsleiter von 0,25 bis 5 rem. Kartenradius 1 rem (20 px bei Basisschrift); kleine Elemente 0,5 rem. Touch-Zielhöhe 2,8 rem (56 px bei Basisschrift), mobile Kontaktleiste 4,5 rem. Inhalte dürfen umbrechen; Bilder und Grid-Kinder sind begrenzt. Mediengrenzen sind die einzigen festen Pixelwerte außerhalb der Tokens.

Komponenten: `card`, `button`/`button--quiet`, `notice--warm`/`notice--mint`, `service-card`, `person-card`, `hours-card`, `accordion`, `timeline`, `request-form`. `picture` reserviert Maße und bietet Initialen-Fallback. Porträts maximal 200 px breit; Logo auf `--color-logo-surface`. Der Hero verwendet identischen dunklen Hintergrund/Overlay und hellen Text in beiden Modi. Der Worst-Case des Overlays über einem weißen Bild erfüllt ebenfalls das Textziel; tatsächlicher Bildausschnitt bleibt abnahmepflichtig.

Automatik folgt dem System, manuelle Modi werden synchron vor dem Rendern gesetzt. Beide Dark-Blöcke enthalten dieselben Token-Namen/Werte. Neue Tokens in alle drei Blöcke aufnehmen. Gedämpfter Text bleibt gut lesbar. Der Schriftgrößenschalter erlaubt drei Stufen; die größte Stufe muss bei 360 px manuell geprüft werden.

Bewegung ist dezent: Reveal 450 ms, Seitenwechsel 350 ms, Hero-Einblenden 600 ms, einmaliger Bildzoom 16 s. Statuspunkt pulsiert nur dreimal und blinkt nicht. Nur `transform`/`opacity`, keine Parallax-Effekte. `prefers-reduced-motion` deaktiviert alles zentral; Inhalte bleiben sichtbar. Druck verwendet schwarze Schrift auf weißen Flächen, öffnet Akkordeoninhalte und entfernt Navigation/Leisten.
