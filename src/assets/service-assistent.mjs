const initialState = { step: "choose", selected: null, checked: [] };

export function updateService(state = initialState, action) {
  switch (action.type) {
    case "select":
      return { step: "prepare", selected: action.id, checked: state.selected === action.id ? state.checked : [] };
    case "toggle":
      if (state.step !== "prepare") return state;
      return {
        ...state,
        checked: state.checked.includes(action.index)
          ? state.checked.filter(index => index !== action.index)
          : [...state.checked, action.index]
      };
    case "continue":
      return state.step === "prepare" ? { ...state, step: "next" } : state;
    case "back":
      if (state.step === "choose") return state;
      return { ...state, step: state.step === "next" ? "prepare" : "choose" };
    case "restart":
      return initialState;
    default:
      return state;
  }
}

export async function copyPreparation(items, clipboard) {
  const text = items.map(item => `• ${item}`).join("\n");
  try {
    await clipboard.writeText(text);
    return { copied: true, text };
  } catch {
    return { copied: false, text };
  }
}

function enhanceService(root) {
  const assistant = root.querySelector("[data-service-assistant]");
  const direct = root.querySelector("[data-direct-service]");
  const controls = root.querySelector("[data-service-controls]");
  const choice = root.querySelector("[data-choose]");
  const choiceHeading = root.querySelector("h2");
  const stages = [...root.querySelectorAll("[data-service-stage]")];
  const options = [...root.querySelectorAll("button[data-flow-id]")];
  const flows = new Map([...root.querySelectorAll("[data-flow]")].map(panel => {
    const prepare = panel.querySelector("[data-prepare]");
    const next = panel.querySelector("[data-next]");
    return [panel.dataset.flow, {
      panel, prepare, next,
      prepareHeading: prepare?.querySelector("h3"), nextHeading: next?.querySelector("h3"),
      checks: [...panel.querySelectorAll("[data-check-index]")],
      items: [...panel.querySelectorAll("[data-check-text]")].map(item => item.textContent.trim()),
      copyFeedback: panel.querySelector("[data-copy-feedback]"), copyText: panel.querySelector("[data-copy-text]")
    }];
  }));
  if (!assistant || !direct || !controls || !choice || !choiceHeading || !options.length ||
      options.some(option => !flows.has(option.dataset.flowId))) return;
  for (const flow of flows.values()) {
    if (!flow.prepareHeading || !flow.nextHeading || !flow.copyFeedback || !flow.copyText || !flow.items.length) return;
  }

  let state = initialState;
  let copyAttempt = 0;

  function render(shouldFocus) {
    const choosing = state.step === "choose";
    choice.hidden = !choosing;
    controls.hidden = choosing;
    for (const stage of stages) {
      if (stage.dataset.serviceStage === state.step) stage.setAttribute("aria-current", "step");
      else stage.removeAttribute("aria-current");
    }
    for (const option of options) option.setAttribute("aria-pressed", option.dataset.flowId === state.selected);
    for (const [id, flow] of flows) {
      const selected = id === state.selected;
      flow.panel.hidden = choosing || !selected;
      flow.prepare.hidden = state.step !== "prepare";
      flow.next.hidden = state.step !== "next";
      for (const check of flow.checks) {
        check.setAttribute("aria-pressed", selected && state.checked.includes(Number(check.dataset.checkIndex)));
      }
    }
    if (shouldFocus) {
      const active = flows.get(state.selected);
      const heading = choosing ? choiceHeading : active[`${state.step}Heading`];
      heading.focus();
    }
  }

  async function handleCopy(flow) {
    const attempt = ++copyAttempt;
    flow.copyFeedback.textContent = "";
    flow.copyText.hidden = true;
    const clipboard = root.ownerDocument.defaultView?.navigator.clipboard;
    const result = await copyPreparation(flow.items, clipboard);
    if (attempt !== copyAttempt) return;
    flow.copyFeedback.textContent = result.copied
      ? "Checkliste in die Zwischenablage kopiert."
      : "Sie können die Checkliste unten auswählen und selbst kopieren.";
    flow.copyText.textContent = result.text;
    flow.copyText.hidden = result.copied;
  }

  assistant.addEventListener("click", event => {
    const button = event.target.closest("button[data-service-action]");
    if (!button || !assistant.contains(button)) return;
    const action = { type: button.dataset.serviceAction, id: button.dataset.flowId, index: Number(button.dataset.checkIndex) };
    const active = flows.get(state.selected);
    if (action.type === "copy") {
      handleCopy(active);
      return;
    }
    const next = updateService(state, action);
    const stepChanged = next.step !== state.step;
    if (stepChanged) {
      copyAttempt += 1;
      if (active) {
        active.copyFeedback.textContent = "";
        active.copyText.hidden = true;
      }
    }
    state = next;
    render(stepChanged);
  });

  render(false);
  direct.open = false;
  assistant.hidden = false;
}

const service = globalThis.document?.querySelector("[data-patient-service]");
if (service) enhanceService(service);
