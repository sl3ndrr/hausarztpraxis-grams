/**
 * Leistungsübersicht als Index der vorhandenen Bereiche.
 * Eingaben: vorhandene medizinische Angebote der Originalseite.
 * Einen weiteren Bereich durch einen Datensatz hier ergänzen.
 * @typedef {{title:string,text:string,items:string[],href:string,icon:string}} ServiceCard
 */
export const overview = {
  title: 'Leistungen',
  intro: 'Hausärztliche Betreuung, Vorsorge und Sportmedizin.',
  cards: [
    { accent: 'health', title: 'Gesundheit', text: 'Medizinische Betreuung bei akuten Beschwerden und chronischen Erkrankungen.', items: ['Gesundheitsuntersuchungen', 'Akutbehandlung und chronische Erkrankungen', 'Hausbesuche, Atteste und Zeugnisse', 'Individuelle Leistungen'], href: '#/leistungen/gesundheit', icon: 'health' },
    { accent: 'prevention', title: 'Vorsorge', text: 'Frühzeitig auf die Gesundheit achten.', items: ['Krebsvorsorge', 'Impfungen', 'Herz-Kreislauf-Check', 'Ernährungsberatung'], href: '#/leistungen/vorsorge', icon: 'shield' },
    { accent: 'sports', title: 'Sportmedizin', text: 'Medizinische Begleitung für Ihre sportliche Aktivität.', items: ['Untersuchung und Beratung', 'Verletzungsbehandlung', 'Prävention und Trainingsplanung'], href: '#/leistungen/sportmedizin', icon: 'activity' }
  ]
};

