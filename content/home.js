/**
 * Startseitentexte, Besuchshinweise und Ziele für häufige Anliegen.
 * Eingaben: Originalseite und Redesign-Briefing.
 * Praxisdaten in practice.js und hours.js pflegen.
 */
import { practice } from './practice.js';
import { formText } from './forms.js';

export const home = {
  title: practice.name,
  intro: 'Für einen Termin rufen Sie uns bitte an.',
  appointment: {
    title: 'Termin vereinbaren',
    text: 'Das hilft uns, auf Notfälle zu reagieren und Wartezeiten möglichst kurz zu halten. Nach Absprache sind Termine außerhalb der regulären Sprechzeiten möglich, zum Beispiel am Abend.'
  },
  shortcutsTitle: 'Häufige Anliegen',
  shortcuts: [
    { title: 'Rezeptwunsch', text: formText.demoShort, href: '#/rezeptwunsch?section=request-form' },
    { title: 'Überweisungswunsch', text: formText.demoShort, href: '#/ueberweisungswunsch?section=request-form' },
    { title: 'Leistungen', href: '#/leistungen' },
    { title: 'Anfahrt', href: '#/anfahrt' },
    { area: 'health', title: 'Akute Beschwerden', href: '#/leistungen/gesundheit?section=acute' },
    { area: 'prevention', title: 'Krebsvorsorge', href: '#/leistungen/vorsorge?section=cancer' },
    { area: 'health', title: 'Hausbesuche nach Absprache', href: '#/leistungen/gesundheit?section=home-visits' },
    { area: 'health', title: 'Atteste', href: '#/leistungen/gesundheit?section=certificates' },
    { area: 'sports', title: 'Sportmedizinische Untersuchung', href: '#/leistungen/sportmedizin?section=assessment' }
  ],
  doctorLink: { text: 'Zum Arztprofil', href: '#/arzt' },
  teamTitle: 'Das Praxisteam',
  teaching: {
    title: 'Akademische Lehrpraxis',
    text: 'Wir sind akademische Lehrpraxis des Zentrums für Allgemeinmedizin der Universitätsmedizin Mainz.',
    link: { text: 'Universitätsmedizin Mainz', href: 'https://www.unimedizin-mainz.de/allgemeinmedizin/allgemeinmedizin/uebersicht.html' }
  }
};
