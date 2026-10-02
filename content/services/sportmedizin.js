/**
 * Sportmedizin: vorhandene Angebote ohne Erfolgsversprechen.
 * Eingaben: Originalseite und sachliche redaktionelle Überarbeitung.
 * Einen Leistungsabschnitt durch einen Datensatz hier ergänzen.
 * @typedef {{id:string,title:string,text:string,items:string[]}} ServiceSection
 */
export const sports = {
  eyebrow: 'Leistungen · Sportmedizin', title: 'Bewegung medizinisch begleiten.',
  intro: 'Untersuchung, Beratung und Behandlung für Ihre sportliche Aktivität.',
  sections: [
    { id: 'assessment', title: 'Sportmedizinische Untersuchungen und Beratung', text: 'Auf Wunsch prüfen wir Ihre körperliche Belastbarkeit und Fitness. Wir beraten Sie zu Training und Verletzungsprävention.', items: ['Sporttauglichkeitsuntersuchungen', 'Leistungsdiagnostik', 'Individuelle Trainingsberatung'] },
    { id: 'injuries', title: 'Behandlung von Sportverletzungen', text: 'Wir behandeln akute und chronische Sportverletzungen und begleiten Sie während der Genesung.', items: ['Akutversorgung', 'Therapie chronischer Überlastungsschäden', 'Rehabilitation nach Verletzungen'] },
    { id: 'training', title: 'Prävention und Trainingsplanung', text: 'Wir unterstützen Sie bei Ihrer Trainingsplanung und beraten Sie zur Vorbeugung von Verletzungen.', items: ['Individuelle Trainingspläne', 'Muskelaufbau- und Regenerationsstrategien', 'Beratung zu Ernährung und Supplementierung im Sport'] }
  ]
};
