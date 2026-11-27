export default [
  {
    id: "rezept",
    label: "Wiederholungsrezept",
    serviceKey: "recipe",
    checklist: [
      "Bezeichnung, Dosierung und benötigte Menge für das Praxisformular bereitlegen.",
      "Datum der letzten Verordnung bereitlegen, falls bekannt."
    ],
    actionType: "externalForm",
    icon: "document"
  },
  {
    id: "ueberweisung",
    label: "Routineüberweisung",
    serviceKey: "referral",
    checklist: [
      "Fachrichtung für das Praxisformular bereitlegen.",
      "Grund der Kontroll- oder Vorsorgeuntersuchung bereithalten."
    ],
    actionType: "externalForm",
    icon: "document"
  },
  {
    id: "termin",
    label: "Terminanfrage",
    checklist: [
      "Anliegen für das Telefonat bereithalten.",
      "Überlegen, an welchen Tagen und zu welchen Uhrzeiten ein Termin möglich wäre."
    ],
    actionType: "phone",
    actionLabel: "Praxis anrufen",
    icon: "calendar"
  },
  {
    id: "erstbesuch",
    label: "Erstbesuch",
    checklist: [
      "Beim Anruf sagen, dass es Ihr erster Besuch in der Praxis ist.",
      "Nach einem Termin und den benötigten Unterlagen fragen."
    ],
    actionType: "phone",
    actionLabel: "Erstbesuch telefonisch abstimmen",
    showDirections: true,
    icon: "person"
  }
];
