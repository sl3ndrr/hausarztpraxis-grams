/**
 * Praxisteam und zugehörige zentrale Bildschlüssel.
 * Eingaben: Originalseite; Rollen bleiben sachlich.
 * Ein Teammitglied durch einen Datensatz in diesem Array ergänzen.
 * @typedef {{name:string,role:string,image:string,note?:string}} TeamMember
 */
export const team = [
  { name: 'Tatjana Rathgeber', role: 'Leitende Medizinische Fachangestellte', image: 'tatjana' },
  { name: 'Ebru Zincir', role: 'Stellvertretende Leitende Medizinische Fachangestellte', image: 'ebru' },
  { name: 'Constance Grams', role: 'Pharmazeutisch-technische Assistentin, Verwaltungsdirektorin & Datenschutzbeauftragte', image: 'constance' },
  { name: 'Leonard Grams', role: 'IT-Mitarbeiter', note: 'Studium MSc Banking & Finance an der Zürcher Hochschule für Angewandte Wissenschaften', image: 'leonard' }
];
