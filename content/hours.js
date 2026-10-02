/**
 * Reguläre Sprechzeiten als lokale Uhrzeiten.
 * Eingabe: Originalseite; weekday folgt ISO (Montag = 1).
 * Sprechzeiten und Zeitzone ausschließlich hier ändern; Shell danach abgleichen.
 * @typedef {{weekday:number,label:string,intervals:[string,string][]}} OpeningDay
 */
export const timeZone = 'Europe/Berlin';
export const hours = [
  { weekday: 1, label: 'Montag', intervals: [['07:30', '12:00'], ['15:00', '17:30']] },
  { weekday: 2, label: 'Dienstag', intervals: [['07:30', '12:00'], ['15:00', '17:30']] },
  { weekday: 3, label: 'Mittwoch', intervals: [['07:30', '12:00']] },
  { weekday: 4, label: 'Donnerstag', intervals: [['07:30', '12:00'], ['15:00', '17:30']] },
  { weekday: 5, label: 'Freitag', intervals: [['07:30', '12:00']] }
];
