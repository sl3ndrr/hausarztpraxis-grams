/**
 * Konfiguration und allgemeine Bedien- und Statusbeschriftungen.
 * Eingaben: Projektauftrag; keine DOM-Abhängigkeiten.
 * Demo-Modus hier ändern; Backend nur in src/lib/submit-request.js anbinden.
 * @typedef {{text:string,href:string}} Link
 */
export const DEMO_MODE = true;
export const site = { url: 'https://hausarztpraxis-grams.de/', locale: 'de-DE' };
export const ui = {
  settingsShort: 'Aa', settings: 'Lesen & Darstellung', fontSmaller: 'A−', fontLarger: 'A+', skip: 'Zum Inhalt', menu: 'Menü', close: 'Schließen', phone: 'Telefon', fax: 'Telefax', email: 'E-Mail',
  call: 'Praxis anrufen', directions: 'Anfahrt', contact: 'Kontakt', hours: 'Sprechzeiten',
  theme: 'Darstellung', themes: [{ value: 'auto', text: 'Automatisch' }, { value: 'light', text: 'Hell' }, { value: 'dark', text: 'Dunkel' }],
  font: 'Schriftgröße', smaller: 'Schrift verkleinern', larger: 'Schrift vergrößern',
  open: 'Jetzt geöffnet', closed: 'Jetzt geschlossen', until: 'bis', again: 'wieder', from: 'ab', today: 'heute', tomorrow: 'morgen', clock: 'Uhr',
  statusNote: 'Status nach regulären Sprechzeiten. Feiertage und Urlaub sind dabei unberücksichtigt.', noHours: 'Bitte erfragen Sie die nächsten Sprechzeiten telefonisch.',
  day: 'Tag', time: 'Zeiten', more: 'Mehr erfahren', back: 'Zur Startseite', showServices: 'Alle Leistungen',
  qualifications: 'Eine Auswahl an Genehmigungen durch die Kassenärztliche Vereinigung Hessen',
  privateProcedures: 'Eine Auswahl zusätzlicher privatärztlicher Verfahren',
  notFound: { title: 'Diese Seite wurde nicht gefunden.', text: 'Über die Startseite finden Sie Sprechzeiten, Kontakt und alle Angebote unserer Praxis.' },
  routeNotice: 'Seite geöffnet:', imageFallback: 'Bild derzeit nicht verfügbar',
  demo: 'Website-Entwurf', demoNote: 'Die Formulare sind eine Vorschau. Es werden keine Daten übermittelt.',
  noscript: 'Für weitere Ansichten benötigen Sie JavaScript.'
};

