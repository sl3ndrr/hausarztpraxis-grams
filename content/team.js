/**
 * Praxisteam und zugehörige zentrale Bildschlüssel.
 * Eingaben: Originalseite; Rollen bleiben sachlich.
 * Ein Teammitglied durch einen Datensatz in diesem Array ergänzen.
 * @typedef {{name:string,role:string,image:string,note?:string}} TeamMember
 */
export const teamNames = { tatjana: 'Tatjana Rathgeber', ebru: 'Ebru Zincir', constance: 'Constance Grams', leonard: 'Leonard Grams' };
export const team = [
  { name: teamNames.tatjana, role: 'Leitende Medizinische Fachangestellte', accent: 'health', image: 'tatjana' },
  { name: teamNames.ebru, role: 'Stellvertretende Leitende Medizinische Fachangestellte', accent: 'prevention', image: 'ebru' },
  { name: teamNames.constance, role: 'Pharmazeutisch-technische Assistentin, Verwaltungsdirektorin & Datenschutzbeauftragte', accent: 'sports', image: 'constance' },
  { name: teamNames.leonard, role: 'IT-Mitarbeiter', note: 'Studium MSc Banking & Finance an der Zürcher Hochschule für Angewandte Wissenschaften', accent: 'health', image: 'leonard' }
];

