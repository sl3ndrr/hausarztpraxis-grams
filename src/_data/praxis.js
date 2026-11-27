const address = {
  street: "Narzissenweg 4",
  city: "65201 Wiesbaden",
  district: "Wiesbaden-Dotzheim"
};

const morning = ["07:30", "12:00"];
const afternoon = ["15:00", "17:30"];
const hours = [
  { day: "Mon", name: "Montag", morning, afternoon },
  { day: "Tue", name: "Dienstag", morning, afternoon },
  { day: "Wed", name: "Mittwoch", morning },
  { day: "Thu", name: "Donnerstag", morning, afternoon },
  { day: "Fri", name: "Freitag", morning },
  { day: "Sat", name: "Samstag" },
  { day: "Sun", name: "Sonntag" }
];

export default {
  name: "Hausarztpraxis Grams",
  description: "Facharztpraxis für Allgemeinmedizin",
  teachingPractice: "Akademische Lehrpraxis des Zentrums für Allgemeinmedizin der Universitätsmedizin Mainz",
  doctor: "Oliver Grams",
  address,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address.street + ", " + address.city)}`,
  phone: { display: "0611 21211", href: "tel:+4961121211" },
  fax: "0611 2617050",
  email: "kontakt@hausarztpraxis-grams.de",
  timeZone: "Europe/Berlin",
  hours,
  middayDays: hours.filter(slot => slot.morning && slot.afternoon).map(slot => slot.name.slice(0, 2)),
  midday: { start: morning[1], end: afternoon[0] },
  hoursExceptions: [],
  transitStops: [
    { name: "Wiesbaden-Dotzheim Sonnenblumenweg", lines: [23], walkText: "Unter 300 m Fußweg zur Praxis" },
    { name: "Wiesbaden-Dotzheim Ludwig-Erhard-Straße", lines: [23, 39], walkText: "Etwa 500 m Fußweg zur Praxis" }
  ],
  accessibilityNote: null,
  services: {
    recipe: {
      title: "Wiederholungsrezept",
      path: "/Rezeptwunsch/",
      form: "https://hausarztpraxis-grams.de/Rezeptwunsch/",
      formAvailable: true,
      action: "Zum Formular für Wiederholungsrezepte",
      description: "Für Medikamente, die Ihnen die Praxis bereits verordnet hat."
    },
    referral: {
      title: "Überweisung zur Routinekontrolle",
      path: "/Ueberweisungswunsch/",
      form: "https://hausarztpraxis-grams.de/Ueberweisungswunsch/",
      formAvailable: true,
      action: "Zum Formular für Routineüberweisungen",
      description: "Für Kontrolluntersuchungen und fachärztliche Vorsorgeuntersuchungen."
    }
  },
  serviceProcessing: "Die Bearbeitung dauert mindestens zwei Werktage."
};
