/**
 * Arztprofil, Werdegang und persönliche Angaben.
 * Eingaben: Originalseite; Name bleibt in practice.js.
 * Werdegang und persönliche Angaben ausschließlich hier pflegen.
 * @typedef {{title:string,text:string}} CareerStep
 */
export const doctor = {
  eyebrow: 'Ihr Arzt', title: 'Hausärztliche Versorgung. Persönlich begleitet.',
  focus: 'Hausärztliche Versorgung als Facharzt für Allgemeinmedizin, Innere Medizin, Sportmedizin',
  summary: ['Facharzt für Allgemeinmedizin', 'Innere Medizin und Sportmedizin'],
  personal: ['Jahrgang 1972', 'Verheiratet, zwei Kinder'],
  careerTitle: 'Der Werdegang',
  career: [
    { title: '1992–1994', text: 'Humanmedizin an der Martin-Luther-Universität Halle-Wittenberg' },
    { title: '1994–1998', text: 'Humanmedizin an der Ruprecht-Karls-Universität Heidelberg' },
    { title: 'Facharztausbildung', text: 'Innere Medizin, Notfallmedizin, Anästhesie, Sportmedizin, Orthopädie/Chirurgie und Allgemeinmedizin' },
    { title: 'September 2004', text: 'Facharztprüfung' }
  ],
  personalTitle: 'Persönliches', interestsTitle: 'Außerhalb der Praxis',
  interests: ['Leistungssport und Trainingslehre', 'Musik und Komposition', 'Kunstfotografie']
};
