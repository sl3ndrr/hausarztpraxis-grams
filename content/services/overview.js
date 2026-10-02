/**
 * Leistungsübersicht als erweiterbare Kartenliste.
 * Eingaben: vorhandene medizinische Angebote der Originalseite.
 * Eine Übersichtskarte durch einen Datensatz hier ergänzen.
 * @typedef {{title:string,text:string,items:string[],href:string,icon:string}} ServiceCard
 */
export const overview = {
  eyebrow: 'Unsere Leistungen', title: 'Für Ihre Gesundheit. In jeder Lebensphase.',
  intro: 'Von akuten Beschwerden bis zur langfristigen Betreuung: Hier finden Sie die Leistungen unserer Praxis.',
  cards: [
    { title: 'Gesundheit', text: 'Medizinische Betreuung bei akuten Beschwerden und chronischen Erkrankungen.', items: ['Gesundheitsuntersuchungen', 'Akutbehandlung und chronische Erkrankungen', 'Hausbesuche, Atteste und Zeugnisse', 'Individuelle Leistungen'], href: '#/leistungen/gesundheit', icon: 'health' },
    { title: 'Vorsorge', text: 'Frühzeitig auf die Gesundheit achten.', items: ['Krebsvorsorge', 'Impfungen', 'Herz-Kreislauf-Check', 'Ernährungsberatung'], href: '#/leistungen/vorsorge', icon: 'shield' },
    { title: 'Sportmedizin', text: 'Medizinische Begleitung für Ihre sportliche Aktivität.', items: ['Untersuchung und Beratung', 'Verletzungsbehandlung', 'Prävention und Trainingsplanung'], href: '#/leistungen/sportmedizin', icon: 'activity' }
  ]
};
