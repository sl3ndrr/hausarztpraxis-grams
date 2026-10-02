/**
 * Gesundheit: Leistungen und Altersstufen der Untersuchungen.
 * Eingaben: Originalseite; unveränderte Alters- und Leistungsangaben.
 * Leistungen hier ergänzen; Freigabe und Aktualität vor Livegang prüfen.
 * @typedef {{id:string,title:string,text:string,items?:string[],steps?:{title:string,text:string}[]}} ServiceSection
 */
export const health = {
  eyebrow: 'Leistungen · Gesundheit', title: 'Gesundheit im Alltag begleiten.',
  intro: 'Wir betreuen Sie bei akuten Beschwerden und begleiten Sie bei chronischen Erkrankungen.',
  sections: [
    { id: 'checkups', title: 'Allgemeine Gesundheitsuntersuchungen', text: 'Regelmäßige Gesundheitsuntersuchungen helfen, Krankheiten früh zu erkennen und zu behandeln. Folgende Untersuchungen sind Krankenkassenleistungen:', steps: [
      { title: '18 bis 34 Jahre · einmalig', text: 'Anamnese, Beratung und körperliche Untersuchung.' },
      { title: 'Ab 35 Jahren · alle drei Jahre', text: 'Beratung, körperliche Untersuchung sowie Kontrolle von Zucker- und Blutfettwerten.' },
      { title: 'Ab 45 Jahren · Männer', text: 'Untersuchung der Geschlechtsorgane einschließlich Prostata und Beratung. Auf Wunsch zusätzlich PSA-Untersuchung.' },
      { title: 'Ab 50 Jahren', text: 'Beratung zur Darmkrebs-Früherkennung und gegebenenfalls Untersuchung auf Blut im Stuhl. Falls erforderlich Weiterleitung zur Darmspiegelung.' },
      { title: 'Ab 65 Jahren · Männer', text: 'Einmalige Früherkennung eines Bauchaortenaneurysmas per Ultraschall.' }
    ] },
    { id: 'private', title: 'Individuelle Privatleistungen', text: 'Zusätzliche Untersuchungen sind auf Wunsch möglich.', items: ['Blutuntersuchungen: großes Blutbild, Leberwerte, Schilddrüsenwerte, Vitaminstatus und weitere Werte', 'EKG als Wunschleistung', 'Lungenfunktionstest als Wunschleistung', 'Ultraschalluntersuchung als Wunschleistung'] },
    { id: 'acute', title: 'Akute Behandlungen', text: 'Bei Erkältung, Grippe, Magen-Darm-Problemen oder Verletzungen sind wir für Sie da.', items: ['Behandlung von Infektionskrankheiten', 'Wundversorgung', 'Schmerztherapie'] },
    { id: 'chronic', title: 'Chronische Erkrankungen', text: 'Diabetes, Bluthochdruck, Asthma und andere chronische Erkrankungen erfordern regelmäßige Betreuung. Wir begleiten Sie langfristig und passen die Therapie an.', items: ['DMP-Programme', 'Betreuung von Diabetespatienten', 'Asthma- und COPD-Behandlung', 'Management von Herz-Kreislauf-Erkrankungen'] },
    { id: 'home-visits', title: 'Hausbesuche', text: 'Wenn Sie aus gesundheitlichen Gründen nicht in die Praxis kommen können, sind Hausbesuche nach Absprache möglich. Wir entscheiden im Einzelfall nach Dringlichkeit.', items: ['Hausbesuche bei Bettlägerigkeit', 'Betreuung in Pflegeheimen', 'Palliativmedizinische Betreuung gemeinsam mit Palliativteams und Pflegediensten'] },
    { id: 'certificates', title: 'Gesundheitszeugnisse und Atteste', text: 'Bei Bedarf stellen wir Bescheinigungen für Beruf, Schule oder Versicherungen aus.', items: ['Arbeitsunfähigkeitsbescheinigungen', 'Gesundheitszeugnisse', 'Atteste für Schule und Sport', 'Reisefähigkeitsbescheinigungen'] }
  ]
};
