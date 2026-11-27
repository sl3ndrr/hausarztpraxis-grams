const all = "all";
const checkUp = "check-up";

export function changeFilters(selection, group, value) {
  if (group === "intent") {
    return { intent: value, age: value === checkUp ? selection.age : all };
  }
  if (group === "age" && selection.intent === checkUp) return { ...selection, age: value };
  return selection;
}

export function filterTopics(topics, intent, ageRange) {
  const matches = topics.filter(topic => intent === all || topic.intent === intent);
  if (intent !== checkUp || !ageRange) return matches;
  return matches.flatMap(topic => {
    const checks = topic.checks?.filter(check =>
      check.minAge <= ageRange.maxAge && (check.maxAge ?? Infinity) >= ageRange.minAge
    );
    return checks?.length ? [{ ...topic, checks }] : [];
  });
}

function ageRangeFrom(element) {
  const minAge = Number(element.dataset.minAge);
  const maxAge = element.dataset.maxAge === undefined ? Infinity : Number(element.dataset.maxAge);
  if (!Number.isInteger(minAge) || minAge < 0 || maxAge < minAge || (maxAge !== Infinity && !Number.isInteger(maxAge))) {
    throw new RangeError("Ungültige Altersgrenze");
  }
  return { minAge, maxAge };
}

function enhanceCompass(root) {
  const controls = root.querySelector("[data-kompass-controls]");
  const ageGroup = root.querySelector("[data-age-group]");
  const count = root.querySelector("[data-result-count]");
  const empty = root.querySelector("[data-empty-results]");
  const list = root.querySelector("[data-topic-list]");
  const intentButtons = [...root.querySelectorAll("button[data-intent]")];
  const ageButtons = [...root.querySelectorAll("button[data-age]")];
  const allIntents = intentButtons.find(button => button.dataset.intent === all);
  const ages = new Map(ageButtons.map(button => [button.dataset.age, button.dataset.age === all ? null : ageRangeFrom(button)]));
  const topics = [...root.querySelectorAll("[data-topic]")].map(element => {
    const checks = [...element.querySelectorAll("[data-check]")].map(check => ({ element: check, ...ageRangeFrom(check) }));
    return { id: element.dataset.topic, intent: element.dataset.topicIntent, element, checks: checks.length ? checks : undefined };
  });
  if (!controls || !ageGroup || !count || !empty || !list || !allIntents || !ages.has(all) || !topics.length) return;

  let selection = { intent: all, age: all };
  function render() {
    ageGroup.hidden = selection.intent !== checkUp;
    for (const button of intentButtons) button.setAttribute("aria-pressed", button.dataset.intent === selection.intent);
    for (const button of ageButtons) button.setAttribute("aria-pressed", button.dataset.age === selection.age);

    const results = filterTopics(topics, selection.intent, ages.get(selection.age));
    const visible = new Map(results.map(topic => [topic.id, topic]));
    for (const topic of topics) {
      const match = visible.get(topic.id);
      topic.element.hidden = !match;
      for (const check of topic.checks ?? []) check.element.hidden = !match?.checks?.includes(check);
    }
    const entries = results.reduce((total, topic) => total + (topic.checks?.length ?? 1), 0);
    count.textContent = `${entries} ${entries === 1 ? "Eintrag" : "Einträge"}`;
    empty.hidden = entries > 0;
    list.hidden = entries === 0;
  }

  root.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button || !root.contains(button)) return;
    if (button.hasAttribute("data-reset-filters")) {
      selection = { intent: all, age: all };
      render();
      if (empty.contains(button)) allIntents.focus();
    } else if (intentButtons.includes(button)) {
      selection = changeFilters(selection, "intent", button.dataset.intent);
      render();
    } else if (ageButtons.includes(button)) {
      selection = changeFilters(selection, "age", button.dataset.age);
      render();
    }
  });
  render();
  controls.hidden = false;
}

const compass = globalThis.document?.querySelector("[data-kompass]");
if (compass) {
  try {
    enhanceCompass(compass);
  } catch (error) {
    if (!(error instanceof RangeError || error instanceof TypeError)) throw error;
  }
}
