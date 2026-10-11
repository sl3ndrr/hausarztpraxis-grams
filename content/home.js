/**
 * Startseitentexte, Termin-Hinweis und Schnellzugriffe.
 * Eingaben: Originalseite und Projektauftrag.
 * Begrüßung und Startseitenabschnitte hier ändern; Fakten in practice/hours belassen.
 * @typedef {{title:string,text:string}} TextSection
 */
import { practice } from './practice.js';
export const home = {
  eyebrow: 'Willkommen in unserer Praxis',
  title: 'Ihre Gesundheit. Unser Alltag.',
  intro: 'Wir sind vor Ort für Sie da. Melden Sie sich gerne telefonisch bei uns. Unser Praxisteam freut sich auf Ihren Besuch.',
  appointment: { title: 'Bitte vereinbaren Sie einen Termin.', text: 'So können wir Notfälle schnellstmöglich versorgen und Ihre Wartezeit kurz halten. Nach Absprache sind auch Termine außerhalb der regulären Sprechzeiten möglich, zum Beispiel am Abend.' },
  shortcutsTitle: 'Ihr Anliegen. Ein kurzer Weg.',
  shortcutsIntro: 'Hier finden Sie unsere Leistungen und die Wünsche, die Sie online vorbereiten können.',
  shortcuts: [
    { title: 'Wiederholungsrezept anfordern', text: 'Rezeptwunsch im Demo-Formular vorbereiten.', href: '#/rezeptwunsch', icon: 'prescription', accent: 'health' },
    { title: 'Akute Beschwerden', text: 'Unsere akuten Behandlungen ansehen.', href: '#/leistungen/gesundheit?section=acute', icon: 'health', accent: 'health' },
    { title: 'Vorsorge', text: 'Untersuchungen und Impfungen entdecken.', href: '#/leistungen/vorsorge?section=cancer', icon: 'shield', accent: 'prevention' },
    { title: 'Hausbesuch', text: 'Hausbesuche nach Absprache.', href: '#/leistungen/gesundheit?section=home-visits', icon: 'pin', accent: 'health' },
    { title: 'Attest', text: 'Gesundheitszeugnisse und Atteste ansehen.', href: '#/leistungen/gesundheit?section=certificates', icon: 'referral', accent: 'health' },
    { title: 'Sportmedizin', text: 'Untersuchung, Beratung und Behandlung.', href: '#/leistungen/sportmedizin?section=assessment', icon: 'activity', accent: 'sports' }
  ],
  glance: ['Facharzt für Allgemeinmedizin', 'Innere Medizin und Sportmedizin', 'Akademische Lehrpraxis', 'Hausbesuche nach Absprache', 'Termine außerhalb der Sprechzeiten nach Absprache'],
  doctorTitle: 'Medizin mit einem persönlichen Gesicht.',
  doctorLink: { text: `${practice.doctor} kennenlernen`, href: '#/arzt' },
  teamTitle: 'Das Praxisteam',
  teamIntro: 'Wir freuen uns auf Ihren Besuch.',
  teaching: { title: 'Akademische Lehrpraxis', text: 'Wir sind akademische Lehrpraxis des Zentrums für Allgemeinmedizin der Universitätsmedizin Mainz.', link: { text: 'Universitätsmedizin Mainz', href: 'https://www.unimedizin-mainz.de/allgemeinmedizin/allgemeinmedizin/uebersicht.html' } }
};

