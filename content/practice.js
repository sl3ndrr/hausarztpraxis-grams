/**
 * Zentrale, gesicherte Kontaktdaten und externe Linkziele.
 * Eingaben: Originalseite und freigegebener Projektauftrag.
 * Kontakt, Notfallhinweis oder Anfahrtlinks ausschließlich hier ändern.
 * @typedef {{name:string, doctor:string, address:{street:string, postalCode:string, city:string}, phone:{text:string,href:string}, fax:string, email:string}} Practice
 */
export const practice = {
  name: 'Hausarztpraxis Grams',
  doctor: 'Oliver Grams',
  address: { street: 'Narzissenweg 4', postalCode: '65201', city: 'Wiesbaden' },
  phone: { text: '0611 21211', href: 'tel:061121211' },
  fax: '0611 2617050',
  email: 'kontakt@hausarztpraxis-grams.de',
  emergency: { text: 'Im Notfall: 112', href: 'tel:112' },
  onCall: { text: 'Ärztlicher Bereitschaftsdienst: 116 117', href: 'tel:116117' },
  legal: [
    { text: 'Impressum', href: 'https://hausarztpraxis-grams.de/Impressum/' },
    { text: 'Datenschutzerklärung', href: 'https://hausarztpraxis-grams.de/Datenschutzerklaerung/' }
  ],
  maps: [
    { text: 'Route in Google Maps öffnen', href: 'https://www.google.com/maps/dir/?api=1&destination=Narzissenweg%204%2C%2065201%20Wiesbaden' },
    { text: 'In OpenStreetMap öffnen', href: 'https://www.openstreetmap.org/search?query=Narzissenweg%204%2C%2065201%20Wiesbaden' }
  ]
};
