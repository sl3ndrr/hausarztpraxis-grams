/**
 * Explizite Quellen der lokalen Leistungs- und Qualifikationssuche.
 * Eingaben: unveränderte Leistungsdaten; keine eigene Kopie medizinischer Texte.
 * Neue Leistungsbereiche hier mit bestätigtem Routenziel ergänzen.
 */
import { health } from './services/gesundheit.js';
import { prevention } from './services/vorsorge.js';
import { sports } from './services/sportmedizin.js';
import { overview } from './services/overview.js';
export const searchSources = [
  { data: health, href: overview.cards[0].href, label: overview.cards[0].title },
  { data: prevention, href: overview.cards[1].href, label: overview.cards[1].title },
  { data: sports, href: overview.cards[2].href, label: overview.cards[2].title }
];
