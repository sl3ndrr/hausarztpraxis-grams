/**
 * Startseitentexte, Termin-Hinweis und Schnellzugriffe.
 * Eingaben: Originalseite und Projektauftrag.
 * Begrüßung und Startseitenabschnitte hier ändern; Fakten in practice/hours belassen.
 * @typedef {{title:string,text:string}} TextSection
 */
import { practice } from './practice.js';
export const home = {
  eyebrow: 'Willkommen in unserer Praxis',
  title: 'Herzlich willkommen in Ihrer Hausarztpraxis.',
  intro: 'Wir sind vor Ort für Sie da. Melden Sie sich gerne telefonisch bei uns. Unser Praxisteam freut sich auf Ihren Besuch.',
  appointment: { title: 'Bitte vereinbaren Sie einen Termin.', text: 'So können wir Notfälle schnellstmöglich versorgen und Ihre Wartezeit kurz halten. Nach Absprache sind auch Termine außerhalb der regulären Sprechzeiten möglich, zum Beispiel am Abend.' },
  shortcutsTitle: 'Ihr Anliegen. Ein kurzer Weg.',
  shortcutsIntro: 'Hier finden Sie unsere Leistungen und die Wünsche, die Sie online vorbereiten können.',
  shortcuts: [
    { title: 'Rezeptwunsch', text: 'Wiederholungsrezepte anfragen.', href: '#/rezeptwunsch', icon: 'prescription' },
    { title: 'Überweisungswunsch', text: 'Überweisungen für Routinekontrollen anfragen.', href: '#/ueberweisungswunsch', icon: 'referral' },
    { title: 'Unsere Leistungen', text: 'Gesundheit, Vorsorge und Sportmedizin.', href: '#/leistungen', icon: 'health' },
    { title: 'So finden Sie uns', text: 'Adresse und Wege zur Praxis.', href: '#/anfahrt', icon: 'pin' }
  ],
  doctorTitle: 'Medizin mit einem persönlichen Gesicht.',
  doctorLink: { text: `${practice.doctor} kennenlernen`, href: '#/arzt' },
  teamTitle: 'Das Praxisteam',
  teamIntro: 'Wir freuen uns auf Ihren Besuch.',
  teaching: { title: 'Akademische Lehrpraxis', text: 'Wir sind akademische Lehrpraxis des Zentrums für Allgemeinmedizin der Universitätsmedizin Mainz.', link: { text: 'Universitätsmedizin Mainz', href: 'https://www.unimedizin-mainz.de/allgemeinmedizin/allgemeinmedizin/uebersicht.html' } }
};
