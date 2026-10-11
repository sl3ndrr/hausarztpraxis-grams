<!--
  Gestaltungskonzept und Abnahmekriterien für den Relaunch.
  Eingaben: Auftrag, vorhandene Inhalte und semantische Tokens.
  Bei jeder Gestaltungsänderung beide Modi und Kontrastpaare abgleichen.
-->
# Design-System

Die Praxis erhält einen typografischen, warmen und selbstbewussten Auftritt mit großen serifenlosen Systemüberschriften und deutlichem Gewichtskontrast. Petrol verankert Marke und Bedienung, Mint steht für Gesundheit, Apricot für Vorsorge und ein kräftiges Gelbgrün für Sportmedizin. Unterschiedlich große Flächen, asymmetrische Radien, organische SVG-Kurven und große Jahreszahlen ersetzen die gleichförmige Rahmenoptik. Kurze gestaffelte Einblendungen und fühlbare Hover-/Press-Reaktionen bewegen ausschließlich transform/opacity; reduzierte Bewegung schaltet sie vollständig ab, nichts blinkt oder läuft in Dauerschleifen. Die Hierarchie führt vom Telefon und Status über Anliegen und sichtbare Leistungen zu den Menschen und Kontaktinformationen, damit ältere und mobile Nutzer schnell ihr Ziel erreichen.

## Palette und Typografie

| Bereich | Hell: Fläche / Schrift | Dunkel: Fläche / Schrift |
| --- | --- | --- |
| Basis | #FAF7F0 / #142D30 | #101F23 / #F0F5EE |
| Gesundheit | #D0EEDC / #14362B | #203F35 / #D6F5E2 |
| Vorsorge | #FFC4A3 / #46281F | #503126 / #FFE2D0 |
| Sportmedizin | #E0ED81 / #273117 | #343C20 / #EBF5B2 |
| Bedienung | #094751 / #FFFFFF | #98D9DB / #102E33 |

Systemschriften ausschließlich, Basis 20/22/24 px, H1 bis 4,8 rem, H2 bis 3,15 rem, Überschriftengewicht 800 und Laufweite −0,045 em. Großzügige Rundungen (1,8 rem), Touch-Ziele mindestens 2,8 rem. Designwerte stehen ausschließlich in tokens.css und in allen drei Token-Blöcken. Neue Text-/Flächenpaare im Checker prüfen: mindestens 7:1 auch für Buttons, Fokus/Feldgrenzen mindestens 3:1. Farbe ergänzt immer Titel, Symbole oder Textmarkierungen.

## Aufbau und Bedienung

Schlanker Header mit drei Bereichen, dauerhaft erreichbarem Telefon und eigenem Panel für Schrift/Darstellung; Escape schließt mit Fokus-Rückkehr. Hero-Text und Foto erhalten getrennte Flächen; das Motiv trägt keine Information und keine Textkontraste. Bento-Anliegen, farbcodierte Leistungen und Wochenbalken schaffen verschiedene Gewichtungen. Leistungsseiten zeigen Kapitel offen und eine Ankernavigation; Gruppen-Chips, Altersleiste und Jahres-Timeline erhalten sämtliche Inhalte. Porträts sind unabhängig von der Schriftstufe auf höchstens 200 CSS-Pixel begrenzt. Dark Mode nutzt eigenständige warme, satte Flächen statt einer Inversion.

## Bewegung und Abnahme

Reveal 520 ms mit 70-ms-Staffelung, Seitenwechsel 240 ms; keine automatische Bildbewegung oder Statusanimation. Ohne Observer bleiben Inhalte sichtbar, fokussierte Elemente werden sofort gezeigt. Bei reduced-motion ist jede Animation/Transition deaktiviert. 360/768/1280 px, beide Themes, größte Schrift und reduzierte Bewegung prüfen; Druck zeigt Adresse und Zeiten ohne Bedienleisten. Rechnerische Kontraste ersetzen keine vollständige WCAG- oder Screenreader-Abnahme.
