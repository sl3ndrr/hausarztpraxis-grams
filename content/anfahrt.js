/**
 * Anfahrttexte aus der Originalseite, abgerufen am 02.10.2026.
 * Eingabe: https://hausarztpraxis-grams.de/Anfahrt/; Kontakt bleibt in practice.js.
 * Verkehrsangaben vor dem Livegang vom Praxisinhaber bestätigen lassen.
 * @typedef {{title:string,text:string}} TravelNote
 */
export const directions = {
  eyebrow: 'Ihr Weg zu uns', title: 'So finden Sie unsere Praxis.',
  intro: 'Sie erreichen uns unter der folgenden Adresse. Bitte vereinbaren Sie Ihren Termin telefonisch.',
  publicTitle: 'Mit öffentlichen Verkehrsmitteln',
  sourceNote: 'Angaben der bestehenden Praxis-Webseite.',
  travel: [
    { title: 'Buslinie 23 · Sonnenblumenweg', text: 'Ausstieg an der Haltestelle Wiesbaden-Dotzheim Sonnenblumenweg. Von dort sind es weniger als 300 Meter zu Fuß zur Praxis.' },
    { title: 'Buslinien 23 und 39 · Ludwig-Erhard-Straße', text: 'Ausstieg an der Haltestelle Wiesbaden-Dotzheim Ludwig-Erhard-Straße. Von dort sind es etwa 500 Meter zur Praxis.' }
  ],
  mapsNote: 'Die Karten öffnen erst, wenn Sie einen der Links auswählen.'
};
