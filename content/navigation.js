/**
 * Hauptnavigation, Untermenü und Footer-Reihenfolge.
 * Eingaben: vorgegebene Hash-Routen; keine Darstellung.
 * Menüpunkte hier ändern; neue Seiten außerdem in routes.js und seo.js ergänzen.
 * @typedef {{text:string,href:string,children?:{text:string,href:string}[]}} NavigationItem
 */
export const footerLinks = [
  { text: 'Willkommen', href: '#/' },
  { text: 'Leistungen', href: '#/leistungen', children: [
    { accent: 'health', text: 'Gesundheit', href: '#/leistungen/gesundheit' },
    { accent: 'prevention', text: 'Vorsorge', href: '#/leistungen/vorsorge' },
    { accent: 'sports', text: 'Sportmedizin', href: '#/leistungen/sportmedizin' }
  ] },
  { text: 'Arzt', href: '#/arzt' },
  { text: 'Rezeptwunsch', href: '#/rezeptwunsch' },
  { text: 'Überweisungswunsch', href: '#/ueberweisungswunsch' },
  { text: 'Anfahrt', href: '#/anfahrt' }
];
export const navigation = [footerLinks[1], { text: 'Arzt & Team', href: '#/arzt' }, { text: 'Kontakt & Anfahrt', href: '#/anfahrt' }];

