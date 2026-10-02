/**
 * Vorsorge: sachlich formulierte vorhandene Angebote.
 * Eingaben: Originalseite; keine zusätzlichen medizinischen Aussagen.
 * Einen Leistungsabschnitt durch einen Datensatz hier ergänzen.
 * @typedef {{id:string,title:string,text:string,items:string[]}} ServiceSection
 */
export const prevention = {
  eyebrow: 'Leistungen · Vorsorge', title: 'Frühzeitig auf Ihre Gesundheit achten.',
  intro: 'Wir beraten Sie zu Vorsorgeuntersuchungen, Impfungen und Ihrem persönlichen Gesundheitsalltag.',
  sections: [
    { id: 'cancer', title: 'Krebsvorsorgeuntersuchungen', text: 'Vorsorge dient der frühen Erkennung häufiger Krebserkrankungen.', items: ['Darmkrebsvorsorge, zum Beispiel durch einen Stuhltest', 'Prostatakrebs-Vorsorge für Männer'] },
    { id: 'vaccines', title: 'Impfungen und Immunisierungen', text: 'Wir bieten Impfungen für alle Altersgruppen und beraten Sie zu Auffrischungen. Grundlage sind die aktuellen Leitlinien der Ständigen Impfkommission (STIKO).', items: ['Standardimpfungen, zum Beispiel Tetanus, Diphtherie und Masern', 'Grippeschutz- und Pneumokokken-Impfung', 'Reiseimpfungen', 'Beratung und Auffrischungsimpfungen für Erwachsene'] },
    { id: 'cardiovascular', title: 'Herz-Kreislauf-Vorsorge', text: 'Gezielte Vorsorge und frühe Diagnose helfen, Risiken zu erkennen.', items: ['Blutdruckkontrolle und Langzeitblutdruckmessung', 'Cholesterin- und Blutzuckermessung', 'EKG und Belastungs-EKG', 'Ernährungs- und Lebensstilberatung'] },
    { id: 'nutrition', title: 'Ernährungsberatung und Gewichtsmanagement', text: 'Wir beraten Sie zu Ihrer Ernährung und bieten individuelle Programme zur Gewichtsreduktion.', items: ['Individuelle Ernährungsberatung', 'Beratung bei Stoffwechselstörungen, zum Beispiel Diabetes', 'Unterstützung bei der Umstellung auf gesunde Ernährungsgewohnheiten'] }
  ]
};
