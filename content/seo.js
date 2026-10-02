/**
 * Suchmaschinen-Titel und Beschreibungen je Routenschlüssel.
 * Eingaben: Seiteninhalte und zentraler Praxisname.
 * Eine neue Seite hier und in src/routes.js eintragen.
 * @typedef {{title:string,description:string}} SeoEntry
 */
import { practice } from './practice.js';
export const seo = {
  home: { title: `Willkommen · ${practice.name}`, description: 'Sprechzeiten, Kontakt und Leistungen Ihrer Hausarztpraxis in Wiesbaden.' },
  services: { title: `Leistungen · ${practice.name}`, description: 'Gesundheit, Vorsorge und Sportmedizin: die Leistungen unserer Praxis.' },
  health: { title: `Gesundheit · ${practice.name}`, description: 'Gesundheitsuntersuchungen, akute Behandlung und Betreuung chronischer Erkrankungen.' },
  prevention: { title: `Vorsorge · ${practice.name}`, description: 'Krebsvorsorge, Impfungen, Herz-Kreislauf-Vorsorge und Ernährungsberatung.' },
  sports: { title: `Sportmedizin · ${practice.name}`, description: 'Sportmedizinische Untersuchung, Beratung und Behandlung von Sportverletzungen.' },
  doctor: { title: `Arzt · ${practice.name}`, description: 'Lernen Sie Ihren Arzt und seinen Werdegang kennen.' },
  prescription: { title: `Rezeptwunsch · ${practice.name}`, description: 'Entwurf eines Formulars für Wiederholungsrezepte. Keine Übermittlung von Daten.' },
  referral: { title: `Überweisungswunsch · ${practice.name}`, description: 'Entwurf eines Formulars für Routineüberweisungen. Keine Übermittlung von Daten.' },
  directions: { title: `Anfahrt · ${practice.name}`, description: 'Adresse, Kontakt und Anfahrt mit öffentlichen Verkehrsmitteln.' },
  notFound: { title: `Seite nicht gefunden · ${practice.name}`, description: 'Diese Seite wurde nicht gefunden. Zurück zur Startseite der Praxis.' }
};
