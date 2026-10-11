/**
 * Genehmigungen und zusätzliche privatärztliche Verfahren.
 * Eingaben: Originalseite; keine neuen medizinischen Angebote ergänzen.
 * Qualifikationen durch einen Listeneintrag hier pflegen.
 * @typedef {string[]} QualificationList
 */
export const qualifications = [
  'Diabetikerschulung mit Insulinbehandlung im DMP',
  'Diabetikerschulung ohne Insulinbehandlung im DMP',
  'DMP Asthma bronchiale – koordinierender Arzt',
  'DMP Chronisch obstruktive Lungenerkrankung – koordinierender Arzt',
  'DMP Diabetes mellitus Typ II – koordinierender Arzt',
  'DMP Koronare Herzkrankheit – koordinierender Arzt',
  'Gestationsdiabetes Schulung mit Insulin',
  'Gestationsdiabetes Schulung ohne Insulin',
  'Hypertonieschulung nach Grüßer, Jörgens im DMP',
  'Psychosomatische Grundversorgung',
  'Sonographie: Abdomen und Retroperitoneum, Jugendliche, Erwachsene, B-Modus transkutan',
  'Sonographie: Bewegungsapparat (ohne Säuglingshüfte), B-Modus',
  'Sonographie: Schilddrüse, B-Modus',
  'Sonographie: Venen der Extremitäten, B-Modus',
  'EKG in Ruhe und Belastung'
];
export const privateProcedures = [
  'Duplexuntersuchung der hirnversorgenden Arterien (Duplex-Carotiden)',
  'Sportmedizinische Betreuung',
  'Ästhetische Medizin: Botoxanwendung',
  'Aufbauinfusionen'
];


// Indexgruppen sind ausschließlich Darstellung, keine neue Genehmigungskategorie.
export const qualificationGroups = [
  { key: 'dmp', indices: [2, 3, 4, 5] },
  { key: 'training', indices: [0, 1, 6, 7, 8] },
  { key: 'ultrasound', indices: [10, 11, 12, 13] },
  { key: 'other', indices: [9, 14] }
];
