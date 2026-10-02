/**
 * Hauptnavigation, Untermenü und Footer-Reihenfolge.
 * Eingaben: vorgegebene Hash-Routen; keine Darstellung.
 * Menüpunkte hier ändern; neue Seiten außerdem in routes.js und seo.js ergänzen.
 * @typedef {{text:string,href:string,children?:{text:string,href:string}[]}} NavigationItem
 */
export const navigation = [
  { text: 'Willkommen', href: '#/' },
  { text: 'Leistungen', href: '#/leistungen', children: [
    { text: 'Gesundheit', href: '#/leistungen/gesundheit' },
    { text: 'Vorsorge', href: '#/leistungen/vorsorge' },
    { text: 'Sportmedizin', href: '#/leistungen/sportmedizin' }
  ] },
  { text: 'Arzt', href: '#/arzt' },
  { text: 'Rezeptwunsch', href: '#/rezeptwunsch' },
  { text: 'Überweisungswunsch', href: '#/ueberweisungswunsch' },
  { text: 'Anfahrt', href: '#/anfahrt' }
];
export const footerLinks = navigation;
