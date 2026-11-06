<!--
  Verbindliches Gestaltungssystem für alle Praxisrouten.
  Eingaben: Redesign-Briefing, vorhandenes Praxismaterial und zentrale Tokens.
  Änderungen zusammen mit den Kontrastprüfungen dokumentieren.
-->
# Design-System

Das offene Praxisschild stellt Praxisname, Adresse, Rufnummer und reguläre Sprechzeiten auf eine gemeinsame Fläche. Ein helles, kühles Grundfeld und eine tintenblaue Kontaktfläche halten die Hierarchie auf der Startseite und den Unterseiten zusammen. Die Sprechzeiten stehen als Tabelle mit ausgeschriebenem Wochentag und sichtbarem „heute“. Der Status bezieht sich auf Europe/Berlin und die regulären Intervalle.

## Layout

- Eine zentrierte Außenkante mit höchstens 1.200 CSS-Pixeln. Breitere Fenster vergrößern den Rand. Lesetexte haben eine eigene begrenzte Zeilenlänge.
- Auf der Startseite folgen auf das Praxisschild vier direkte Wege, die Leistungsübersicht, Arzt und Team, Lehrpraxis und Kontakt. Die beiden Wunschlinks nennen die Demo direkt am Einstieg.
- Unterseiten beginnen mit einem bündigen Titel. Offene Leistungskapitel, Anfahrt und Werdegang verwenden Linien und typografische Absätze. Linien können Bereiche ordnen, wenn Abstände allein nicht ausreichen.
- Gerade Konturen bei Informationsflächen. Eine kleine Rundung gehört zu Bedienelementen. Porträts bleiben in Originalproportionen bei höchstens 200 CSS-Pixeln. Das vorhandene Titelbild steht untergeordnet neben den Besuchsinformationen. Das Logo der Universitätsmedizin behält seine helle Unterlage und seinen unveränderten Ausschnitt.
- Bei schmaler Ansicht stehen Navigation und Einstellungen im Dokumentfluss. Die feste Kontaktleiste hat reservierten Platz mit Safe-Area-Abstand. Am Desktop bleiben die Einstellungen an der Praxisleiste erreichbar.

## Typografie, Farbe und Zustand

| Rolle | Hell | Dunkel |
| --- | --- | --- |
| Grundfeld | `#F4F7FB` | `#151C27` |
| Text | `#222B38` | `#EDF3FC` |
| Erhöhte Fläche | `#E9EFF8` | `#253143` |
| Link und Bedienung | `#173D78` | `#B6D2FF` |
| Praxisschild | `#173561` | `#203B63` |
| Text auf Praxisschild | `#F4F8FF` | `#F0F6FF` |

Der vorhandene Systemschrift-Stack und die Stufen 20, 22 und 24 CSS-Pixel bleiben. Normaltext verwendet Gewicht 400, Bedienelemente 600 und Überschriften 700. Zahlen in Zeitplänen sind tabellarisch. Alle Farbwerte, Größen und Abstände stammen aus `styles/tokens.css`. Beide Dark-Blöcke sind identisch. Der Checker prüft Textpaare ab 7:1 sowie Fokus und Feldgrenzen ab 3:1 in beiden Modi. Fehler, Auswahl und Status haben immer eine sichtbare Beschriftung oder Markierung zusätzlich zur Farbe.

Inhalte erscheinen sofort. Hover, Fokus und Druckzustände verwenden unmittelbare Rückmeldungen. Druckansichten haben helle Flächen und dunkle Schrift. Auf der Anfahrtsseite erscheint die vorhandene separate Praxiskarte.

## Hallmark

Full redesign, custom mit [Hallmark v2.0.0](https://github.com/Nutlope/hallmark/tree/407fa689f4a276f2fd389208d271d0fef08f5058). Die identitätsgeführte Richtung „Praxisschild“ trägt den Auftritt. Das Praxisporträt bleibt auf Arzt und Team konzentriert, der Wegweiser steckt in den kurzen Klickwegen. Als Ausgangsmaterial dienen die tatsächlichen Praxisdaten und die vorhandenen Originalbilder. Kontrastpaare werden aus sRGB-Tokens mit dem bestehenden Repository-Checker geprüft. Die vorgeschriebene Systemschrift ist im Hallmark-Stempel festgehalten.
