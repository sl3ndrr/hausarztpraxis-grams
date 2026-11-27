export default [
  {
    id: "gesundheit",
    icon: "heart",
    title: "Gesundheit",
    path: "/Leistungen/Gesundheit/",
    summary: "Behandlung akuter Beschwerden, Begleitung bei chronischen Erkrankungen und allgemeine Gesundheitsuntersuchungen.",
    topics: [
      { id: "behandlung", label: "Hausärztliche Behandlung", anchor: "behandlung", intent: "behandlung" },
      {
        id: "check-up", label: "Gesundheitsuntersuchungen", anchor: "untersuchungen", intent: "check-up",
        checks: [
          {
            minAge: 18, maxAge: 34, label: "18 bis 34 Jahre, einmalig",
            text: "Erhebung der Krankengeschichte, Beratung und körperliche Untersuchung."
          },
          {
            minAge: 35, label: "Ab 35 Jahren, alle drei Jahre",
            text: "Beratung, körperliche Untersuchung und Kontrolle der Zucker- und Blutfettwerte."
          },
          {
            minAge: 45, label: "Männer ab 45 Jahren",
            text: "Untersuchung der Geschlechtsorgane einschließlich Prostata und Beratung. Die PSA-Untersuchung ist zusätzlich als Wunschleistung möglich."
          },
          {
            minAge: 50, label: "Ab 50 Jahren",
            text: "Beratung zur Darmkrebsfrüherkennung und gegebenenfalls Test auf Blut im Stuhl. Bei Bedarf leitet die Praxis Sie zur Darmspiegelung weiter."
          },
          {
            minAge: 65, label: "Männer ab 65 Jahren, einmalig",
            text: "Ultraschall zur Früherkennung eines Bauchaortenaneurysmas."
          }
        ]
      },
      { id: "atteste", label: "Bescheinigungen und Atteste", anchor: "attest", intent: "atteste" },
      { id: "genehmigungen", label: "Genehmigungen der KV Hessen", anchor: "genehmigungen", intent: "behandlung" }
    ]
  },
  {
    id: "vorsorge",
    icon: "shield",
    title: "Vorsorge",
    path: "/Leistungen/Vorsorge/",
    summary: "Krebsfrüherkennung, Impfungen und Beratung zu Herz-Kreislauf-Gesundheit und Ernährung.",
    topics: [
      { id: "krebsfrueherkennung", label: "Krebsfrüherkennung", anchor: "krebsfrueherkennung", intent: "krebsfrueherkennung" },
      { id: "impfungen", label: "Impfungen", anchor: "impfungen", intent: "impfungen" },
      { id: "herz-kreislauf", label: "Herz-Kreislauf-Vorsorge", anchor: "herz-kreislauf", intent: "beratung" },
      { id: "ernaehrung", label: "Ernährungsberatung und Gewichtsmanagement", anchor: "ernaehrung", intent: "beratung" }
    ]
  },
  {
    id: "sportmedizin",
    icon: "activity",
    title: "Sportmedizin",
    path: "/Leistungen/Sportmedizin/",
    summary: "Sporttauglichkeitsuntersuchungen, Behandlung von Sportverletzungen und Trainingsberatung.",
    topics: [
      { id: "sporttauglichkeit", label: "Sporttauglichkeit und Beratung", anchor: "sporttauglichkeit", intent: "sportmedizin" },
      { id: "sportverletzungen", label: "Behandlung von Sportverletzungen", anchor: "sportverletzungen", intent: "sportmedizin" },
      { id: "trainingsplanung", label: "Prävention und Trainingsplanung", anchor: "trainingsplanung", intent: "sportmedizin" }
    ]
  }
];
