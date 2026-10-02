/**
 * Feldschemata und Texte für beide Wunschformulare.
 * Eingaben: Originalseite; Datenschutzlink wird aus practice.js gelesen.
 * Felder, Hinweise und verständliche Fehlermeldungen ausschließlich hier ändern.
 * @typedef {{name:string,label:string,required?:boolean,autocomplete?:string,type?:string,error?:string}} RequestField
 */
const identity = [
  { name: 'firstName', label: 'Vorname', required: true, autocomplete: 'given-name', error: 'Bitte tragen Sie Ihren Vornamen ein.' },
  { name: 'lastName', label: 'Nachname', required: true, autocomplete: 'family-name', error: 'Bitte tragen Sie Ihren Nachnamen ein.' }
];
export const birthFields = [
  { name: 'birthDay', label: 'Tag', autocomplete: 'bday-day', length: 2 },
  { name: 'birthMonth', label: 'Monat', autocomplete: 'bday-month', length: 2 },
  { name: 'birthYear', label: 'Jahr', autocomplete: 'bday-year', length: 4 }
];
export const formText = {
  birth: 'Geburtsdatum', birthHint: 'Bitte geben Sie Tag, Monat und das vierstellige Jahr ein.',
  birthMissing: 'Bitte tragen Sie Ihr vollständiges Geburtsdatum ein.',
  birthInvalid: 'Bitte prüfen Sie Ihr Geburtsdatum. Dieses Datum gibt es nicht.',
  birthFuture: 'Das Geburtsdatum darf nicht in der Zukunft liegen.',
  birthOld: 'Bitte prüfen Sie das Jahr Ihres Geburtsdatums.',
  consent: 'Ich erkläre mich mit der Verarbeitung meiner personenbezogenen Daten zum Zweck der Bearbeitung und Dokumentation sowie mit der Datenschutzerklärung einverstanden.',
  consentError: 'Bitte stimmen Sie der Verarbeitung Ihrer Daten zu.',
  required: '* Pflichtfelder', submit: 'Wunsch prüfen und absenden', sending: 'Wunsch wird geprüft …',
  summary: 'Bitte prüfen Sie folgende Angaben:',
  errorMark: 'Hinweis:',
  successTitle: 'Ihr Wunsch wurde im Entwurf geprüft.',
  success: 'Dies ist ein Entwurf. Es wurde nichts übermittelt. Bitte wenden Sie sich für Ihren Wunsch telefonisch an die Praxis.',
  unavailable: 'Die Übermittlung ist noch nicht eingerichtet. Bitte wenden Sie sich telefonisch an die Praxis.',
  demoTitle: 'Demo-Formular', demoNote: 'Diese Vorschau sendet und speichert keine Formulardaten.'
};
export const forms = {
  prescription: {
    eyebrow: 'Ihr Anliegen', title: 'Rezeptwunsch',
    notice: 'Dieser Dienst ist nur für Wiederholungsrezepte vorgesehen. Bitte rechnen Sie mit mindestens zwei Werktagen Bearbeitungszeit.',
    fields: [...identity,
      { name: 'medication1', label: '1. Medikament', required: true, error: 'Bitte tragen Sie Ihr erstes Medikament ein.' },
      { name: 'medication2', label: '2. Medikament' }, { name: 'medication3', label: '3. Medikament' },
      { name: 'lastPrescription', label: 'Datum der letzten Verordnung', type: 'date' }
    ]
  },
  referral: {
    eyebrow: 'Ihr Anliegen', title: 'Überweisungswunsch',
    notice: 'Dieser Dienst ist nur für Routinekontrollen vorgesehen, zum Beispiel eine Kontrolluntersuchung oder Facharzt-Vorsorgeuntersuchung. Bitte rechnen Sie mit mindestens zwei Werktagen Bearbeitungszeit.',
    fields: [...identity,
      { name: 'referral1', label: '1. Überweisung', required: true, error: 'Bitte tragen Sie Ihre erste Überweisung ein.' },
      { name: 'referral2', label: '2. Überweisung' }, { name: 'referral3', label: '3. Überweisung' }
    ]
  }
};
