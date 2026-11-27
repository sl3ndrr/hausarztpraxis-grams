import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { cpSync, globSync, mkdtempDisposableSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { parse } from "parse5";
import holidays from "../src/_data/feiertage.js";
import leistungen from "../src/_data/leistungen.js";
import patientenservice from "../src/_data/patientenservice.js";
import site from "../src/_data/site.js";
import praxis from "../src/_data/praxis.js";
import { changeFilters, filterTopics } from "../src/assets/kompass.mjs";
import { copyPreparation, updateService } from "../src/assets/service-assistent.mjs";
import { getScheduleStatus, weekdayInZone } from "../src/assets/sprechzeiten.mjs";

const output = "_site";
const origin = "https://preview.invalid";
const base = new URL(site.pathPrefix, origin);
const files = new Set(globSync("**/*", { cwd: output }).map(file => file.split(path.sep).join("/")));

const pages = [
  "", "Willkommen/", "Leistungen/", "Leistungen/Gesundheit/", "Leistungen/Vorsorge/",
  "Leistungen/Sportmedizin/", "Arzt/", "Rezeptwunsch/", "Ueberweisungswunsch/",
  "Anfahrt/", "Impressum/", "Datenschutzerklaerung/"
];

function nodeText(node) {
  if (node.nodeName === "#text") return node.value;
  return (node.childNodes ?? []).map(nodeText).join("");
}

function inspectHtml(file, directory = output) {
  const document = parse(readFileSync(path.join(directory, file), "utf8"));
  const elements = [];
  function walk(node) {
    if (node.tagName) {
      elements.push({
        tag: node.tagName,
        attrs: Object.fromEntries(node.attrs.map(attr => [attr.name, attr.value])),
        text: nodeText(node).replace(/\s+/g, " ").trim()
      });
    }
    node.childNodes?.forEach(walk);
  }
  walk(document);
  return elements;
}

function checkReference(reference, from, localOnly, documents) {
  const target = new URL(reference, from);
  if (target.origin !== origin) {
    assert.ok(!localOnly, `External asset in ${from.pathname}: ${reference}`);
    return;
  }
  assert.ok(target.pathname.startsWith(base.pathname), `Path outside project in ${from.pathname}: ${reference}`);
  let file = decodeURIComponent(target.pathname.slice(base.pathname.length));
  if (!file || file.endsWith("/")) file += "index.html";
  assert.ok(files.has(file), `Missing target in ${from.pathname}: ${reference} (${file})`);
  if (target.hash && documents.has(file)) {
    const id = decodeURIComponent(target.hash.slice(1));
    assert.ok(documents.get(file).some(({ attrs }) => attrs.id === id), `Missing fragment in ${from.pathname}: ${reference}`);
  }
}

test("generated pages, links and local assets work under the Pages project path", () => {
  const documents = new Map(
    [...files].filter(file => file.endsWith(".html")).map(file => [file, inspectHtml(file)])
  );
  assert.deepEqual([...documents.keys()].sort(), pages.map(page => `${page}index.html`).sort());

  for (const [file, elements] of documents) {
    const from = new URL(file.replace(/index\.html$/, ""), base);
    assert.equal(elements.some(({ tag, attrs }) => tag === "meta" &&
      attrs.name === "robots" && attrs.content === "noindex"), !site.indexable);
    assert.ok(!elements.some(({ tag }) => ["form", "input", "iframe"].includes(tag)), `Unexpected embed or form: ${file}`);
    assert.ok(elements.some(({ tag, attrs }) => tag === "html" && attrs.lang === "de"));
    assert.equal(elements.filter(({ tag }) => tag === "h1").length, 1);
    const ids = elements.flatMap(({ attrs }) => attrs.id ? [attrs.id] : []);
    assert.equal(new Set(ids).size, ids.length, `Duplicate ID in ${file}`);
    const modules = elements.filter(({ tag }) => tag === "script").map(({ attrs }) => {
      assert.equal(attrs.type, "module");
      return new URL(attrs.src, from).pathname.slice(base.pathname.length);
    });
    const expectedModules = {
      "index.html": ["assets/sprechzeiten.mjs", "assets/service-assistent.mjs"],
      "Willkommen/index.html": ["assets/sprechzeiten.mjs", "assets/service-assistent.mjs"],
      "Leistungen/index.html": ["assets/kompass.mjs"]
    };
    assert.deepEqual(modules, expectedModules[file] ?? []);

    for (const { tag, attrs } of elements) {
      if ("href" in attrs) checkReference(attrs.href, from, tag !== "a", documents);
      if ("src" in attrs) checkReference(attrs.src, from, true, documents);
      if (tag === "button") assert.equal(attrs.type, "button");
      if (tag === "svg") {
        assert.equal(attrs["aria-hidden"], "true");
        assert.equal(attrs.focusable, "false");
      }
    }
  }

  for (const file of [...files].filter(file => file.endsWith(".css"))) {
    const css = readFileSync(path.join(output, file), "utf8");
    for (const match of css.matchAll(/url\(\s*["']?([^"'\s)]+)["']?\s*\)/g)) {
      checkReference(match[1], new URL(file, base), true, documents);
    }
  }
});

test("Berlin advances to Monday while UTC is still Sunday", () => {
  assert.equal(weekdayInZone(new Date("2026-11-22T23:30:00Z"), praxis.timeZone), "Mon");
});

test("Saturday maps to the weekend row", () => {
  assert.equal(weekdayInZone(new Date("2026-11-21T12:00:00Z"), praxis.timeZone), "Sat");
});

test("Berlin weekday uses summer time after the UTC evening hour", () => {
  assert.equal(weekdayInZone(new Date("2026-07-15T22:15:00Z"), praxis.timeZone), "Thu");
});

const schedule = { timeZone: praxis.timeZone, hours: praxis.hours, hoursExceptions: praxis.hoursExceptions, holidays };
const at = (iso, data = schedule) => getScheduleStatus(new Date(iso), data);

test("Berlin Monday follows inclusive starts and exclusive ends", () => {
  const cases = [
    ["06:29", "before", "Heute ab 07:30 Uhr."],
    ["06:30", "open", "Schließt um 12:00 Uhr."],
    ["10:45", "open", "Schließt um 12:00 Uhr.", "Schließt in 15 Minuten."],
    ["10:59", "open", "Schließt um 12:00 Uhr.", "Schließt in 1 Minute."],
    ["11:00", "break", "Heute wieder ab 15:00 Uhr."],
    ["14:00", "open", "Schließt um 17:30 Uhr."],
    ["16:30", "ended", "Nächste reguläre Sprechstunde Dienstag, 07:30 Uhr."]
  ];
  for (const [utc, state, detail, countdown = ""] of cases) {
    const status = at(`2026-11-23T${utc}:00Z`);
    assert.equal(status.state, state, utc);
    assert.equal(status.detail, detail, utc);
    assert.equal(status.countdown ?? "", countdown, utc);
  }
});

test("single-session days and weekends point to the right Berlin calendar day", () => {
  const wednesday = at("2026-11-25T11:00:00Z");
  assert.equal(wednesday.state, "ended");
  assert.equal(wednesday.detail, "Nächste reguläre Sprechstunde Donnerstag, 07:30 Uhr.");
  const friday = at("2026-11-27T18:00:00Z");
  assert.equal(friday.state, "ended");
  assert.equal(friday.detail, "Nächste reguläre Sprechstunde Montag, 07:30 Uhr.");
  const weekend = at("2026-11-21T12:00:00Z");
  assert.equal(weekend.state, "closed");
  assert.equal(weekend.detail, friday.detail);
  assert.equal(at("2026-11-22T22:59:59Z").weekday, "Sun");
  assert.equal(at("2026-11-22T23:00:00Z").weekday, "Mon");
});

test("future openings follow calendar days across both clock changes and New Year", () => {
  for (const utc of ["2026-03-27T18:00:00Z", "2026-10-23T18:00:00Z"]) {
    assert.equal(at(utc).detail, "Nächste reguläre Sprechstunde Montag, 07:30 Uhr.");
  }
  assert.equal(at("2026-03-29T22:00:00Z").date, "2026-03-30");
  assert.equal(at("2026-10-25T22:00:00Z").date, "2026-10-25");
  assert.equal(at("2026-10-25T23:00:00Z").date, "2026-10-26");
  assert.equal(at("2026-12-31T23:00:00Z").note, "Neujahr");
});

test("exceptions take precedence and unknown intermediate days stop the search", () => {
  const holiday = at("2026-12-25T08:00:00Z");
  assert.equal(holiday.state, "holiday");
  assert.equal(holiday.note, "1. Weihnachtsfeiertag");
  const christmasEve = "2026-12-24T17:30:00Z";
  assert.equal(at(christmasEve).detail, "Bitte klären Sie die nächste Sprechstunde telefonisch.");

  const exceptions = [
    { date: "2026-12-25", intervals: [], note: "Praxisferien" },
    { date: "2026-12-26", intervals: [["10:00", "11:00"]], note: "Sondersprechstunde" }
  ];
  const plan = { ...schedule, hoursExceptions: exceptions };
  const closed = at("2026-12-25T08:00:00Z", plan);
  assert.equal(closed.title, "Praxis geschlossen");
  assert.equal(closed.note, "Praxisferien");
  assert.equal(at(christmasEve, plan).detail, "Nächste Sonderöffnung Samstag, 10:00 Uhr.");
  const specialOpening = at("2026-12-26T09:00:00Z", plan);
  assert.equal(specialOpening.title, "Sonderöffnung · geöffnet");
  assert.equal(specialOpening.note, "Sondersprechstunde");
  assert.equal(at("2026-12-26T10:00:00Z", plan).state, "ended");
});

test("outside coverage shows the weekly plan and invalid time data returns a fallback", () => {
  const uncovered = at("2028-01-03T08:00:00Z");
  assert.equal(uncovered.state, "calendar-uncovered");
  assert.equal(uncovered.title, "Reguläre Sprechzeiten");
  assert.match(uncovered.detail, /Feiertagskalender/);
  assert.deepEqual(uncovered.intervals, []);
  assert.equal(at("2027-12-31T18:00:00Z").detail, "Bitte klären Sie die nächste Sprechstunde telefonisch.");
  const plan = { ...schedule, hoursExceptions: [{ date: "2028-01-03", intervals: [], note: "Praxisferien" }] };
  assert.equal(at("2028-01-03T08:00:00Z", plan).state, "closed");
  for (const intervals of [[["07:30", "12:01"], ["12:00", "15:00"]], [["10:60", "18:00"]], [["12:00", "12:00"]]]) {
    assert.equal(at("2026-11-23T08:00:00Z", { ...schedule, hoursExceptions: [{ date: "2026-11-23", intervals }] }), null);
  }
  assert.equal(at("invalid"), null);
});

test("a complete holiday year has ten verified dates and 2027 includes Hessen's Fronleichnam", () => {
  for (const year of holidays.years) {
    assert.equal(Object.keys(holidays.dates).filter(date => date.startsWith(`${year}-`)).length, 10);
  }
  assert.equal(holidays.dates["2027-05-27"], "Fronleichnam");
});

test("check-up results keep each age boundary and its original conditions", () => {
  const topics = leistungen.flatMap(area => area.topics);
  const originalChecks = topics.find(topic => topic.id === "check-up").checks;
  const boundaries = [[17, []], [18, [0]], [34, [0]], [35, [1]], [44, [1]], [45, [1, 2]],
    [49, [1, 2]], [50, [1, 2, 3]], [64, [1, 2, 3]], [65, [1, 2, 3, 4]]];
  for (const [age, indexes] of boundaries) {
    const result = filterTopics(topics, "check-up", { minAge: age, maxAge: age });
    assert.deepEqual(result.flatMap(topic => topic.checks), indexes.map(index => originalChecks[index]), `${age} years`);
  }
  assert.deepEqual(filterTopics(topics, "check-up", { minAge: 18, maxAge: 34 })[0].checks, originalChecks.slice(0, 1));
  assert.deepEqual(filterTopics(topics, "impfungen", { minAge: 0, maxAge: 17 }).map(({ anchor }) => anchor), ["impfungen"]);
  assert.deepEqual(filterTopics(topics, "all"), topics);

  const selection = { intent: "check-up", age: "50-64" };
  for (const intent of ["impfungen", "sportmedizin", "all"]) {
    assert.deepEqual(changeFilters(selection, "intent", intent), { intent, age: "all" });
  }
  assert.deepEqual(changeFilters({ intent: "impfungen", age: "all" }, "age", "50-64"), { intent: "impfungen", age: "all" });
});

test("built pages contain the complete static schedule, compass and direct patient links", () => {
  for (const file of ["index.html", "Willkommen/index.html"]) {
    const elements = inspectHtml(file);
    const rows = elements.filter(({ attrs }) => "data-weekday" in attrs);
    assert.deepEqual(rows.map(({ attrs }) => attrs["data-weekday"]), praxis.hours.map(({ day }) => day));
    assert.ok(elements.some(({ tag, text }) => tag === "caption" && text.includes("Wochenplan")));
    assert.equal(elements.filter(({ tag, attrs }) => tag === "th" && attrs.scope === "col").length, 3);
    assert.equal(elements.filter(({ tag, attrs }) => tag === "th" && attrs.scope === "row").length, 7);
    assert.ok(elements.some(({ attrs, text }) => "data-status-title" in attrs && text === "Reguläre Sprechzeiten"));
    assert.ok(elements.some(({ attrs }) => "data-direct-service" in attrs && "open" in attrs));
    assert.deepEqual(elements.filter(({ attrs }) => "data-flow-id" in attrs).map(({ attrs }) => attrs["data-flow-id"]),
      patientenservice.map(({ id }) => id));
    for (const service of Object.values(praxis.services)) {
      assert.ok(elements.some(({ attrs }) => attrs.href === new URL(service.path.slice(1), base).pathname));
      assert.ok(elements.some(({ attrs, text }) => attrs.href === service.form && text.includes("extern")));
    }
  }

  const compass = inspectHtml("Leistungen/index.html");
  const health = inspectHtml("Leistungen/Gesundheit/index.html");
  assert.ok(compass.some(({ attrs }) => "data-kompass-controls" in attrs && "hidden" in attrs));
  assert.equal(compass.filter(({ attrs }) => "data-topic" in attrs).length, leistungen.flatMap(area => area.topics).length);
  for (const check of leistungen[0].topics.find(topic => topic.checks).checks) {
    for (const elements of [compass, health]) {
      assert.ok(elements.some(({ tag, text }) => tag === "dt" && text === check.label));
      assert.ok(elements.some(({ tag, text }) => tag === "dd" && text === check.text));
    }
  }
});

test("service keeps preparation on back, clears it when changing concerns, and restarts", () => {
  for (const [index, flow] of patientenservice.entries()) {
    let state = updateService(undefined, { type: "select", id: flow.id });
    state = updateService(state, { type: "toggle", index: 0 });
    state = updateService(state, { type: "continue" });
    assert.deepEqual(state, { step: "next", selected: flow.id, checked: [0] });
    state = updateService(updateService(state, { type: "back" }), { type: "back" });
    assert.deepEqual(state, { step: "choose", selected: flow.id, checked: [0] });
    assert.deepEqual(updateService(state, { type: "select", id: flow.id }).checked, [0]);
    const other = patientenservice[(index + 1) % patientenservice.length];
    assert.deepEqual(updateService(state, { type: "select", id: other.id }).checked, []);
    assert.deepEqual(updateService(state, { type: "restart" }), { step: "choose", selected: null, checked: [] });
  }
});

test("clipboard writes only the general checklist and returns it on refusal or without the API", async () => {
  const items = patientenservice[0].checklist;
  const text = items.map(item => `• ${item}`).join("\n");
  let written;
  const clipboard = { async writeText(value) { written = value; } };
  assert.deepEqual(await copyPreparation(items, clipboard), { copied: true, text });
  assert.equal(written, text);
  const blocked = { async writeText() { throw new DOMException("Permission denied", "NotAllowedError"); } };
  assert.deepEqual(await copyPreparation(items, blocked), { copied: false, text });
  assert.deepEqual(await copyPreparation(items), { copied: false, text });
});

test("both unavailable forms use the same phone fallback on start and detail pages", () => {
  using fixture = mkdtempDisposableSync(path.join(path.resolve("node_modules"), ".grams-site-"));
  cpSync("src", path.join(fixture.path, "src"), { recursive: true });
  for (const file of ["package.json", "eleventy.config.js"]) cpSync(file, path.join(fixture.path, file));
  const practice = structuredClone(praxis);
  for (const service of Object.values(practice.services)) service.formAvailable = false;
  practice.hoursExceptions = [
    { date: "2026-12-25", intervals: [], note: "Geschlossen <Hinweis>" },
    { date: "2026-12-26", intervals: [["10:00", "11:00"]], note: "Sonderöffnung" },
    { date: "2026-12-27", note: "Rückfrage" }
  ];
  writeFileSync(path.join(fixture.path, "src/_data/praxis.js"), `export default ${JSON.stringify(practice)};\n`);
  writeFileSync(path.join(fixture.path, "src/_data/site.js"), `export default ${JSON.stringify({ ...site, indexable: true })};\n`);
  const cli = fileURLToPath(new URL("../node_modules/@11ty/eleventy/cmd.cjs", import.meta.url));
  const build = spawnSync(process.execPath, [cli], { cwd: fixture.path, encoding: "utf8" });
  assert.equal(build.status, 0, build.stderr || build.stdout || build.error?.message);

  const directory = path.join(fixture.path, output);
  const start = inspectHtml("index.html", directory);
  assert.ok(start.some(({ tag, attrs, text }) => tag === "li" && attrs["data-schedule-exception"] === "2026-12-25" &&
    text.includes("geschlossen.") && text.includes("<Hinweis>")));
  assert.ok(start.some(({ attrs, text }) => attrs["data-start"] === "10:00" && text.includes("10:00–11:00 Uhr")));
  assert.ok(start.some(({ tag, attrs, text }) => tag === "li" && "data-unknown-hours" in attrs &&
    text.includes("Sprechzeiten bitte telefonisch klären.")));
  assert.ok(!start.some(({ tag, attrs }) => tag === "meta" && attrs.name === "robots"));
  for (const file of ["index.html", "Willkommen/index.html", "Rezeptwunsch/index.html", "Ueberweisungswunsch/index.html"]) {
    const elements = inspectHtml(file, directory);
    const alternatives = elements.filter(({ attrs }) => attrs.class === "form-fallback");
    assert.equal(alternatives.length, ["index.html", "Willkommen/index.html"].includes(file) ? 4 : 1);
    assert.ok(alternatives.every(({ text }) => text.includes(praxis.phone.display)));
    assert.ok(elements.some(({ attrs }) => attrs.href === praxis.phone.href));
    assert.ok(!elements.some(({ attrs }) => Object.values(praxis.services).some(service => attrs.href === service.form)));
  }
});
