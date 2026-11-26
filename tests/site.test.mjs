import assert from "node:assert/strict";
import { globSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { parse } from "parse5";
import site from "../src/_data/site.js";
import praxis from "../src/_data/praxis.js";
import { weekdayInZone } from "../src/assets/sprechzeiten.mjs";

const output = "_site";
const origin = "https://preview.invalid";
const base = new URL(site.pathPrefix, origin);
const files = new Set(globSync("**/*", { cwd: output }).map(file => file.split(path.sep).join("/")));

const pages = [
  "", "Willkommen/", "Leistungen/", "Leistungen/Gesundheit/", "Leistungen/Vorsorge/",
  "Leistungen/Sportmedizin/", "Arzt/", "Rezeptwunsch/", "Ueberweisungswunsch/",
  "Anfahrt/", "Impressum/", "Datenschutzerklaerung/"
];

function inspectHtml(file) {
  const document = parse(readFileSync(path.join(output, file), "utf8"));
  const elements = [];
  function walk(node) {
    if (node.tagName) {
      elements.push({ tag: node.tagName, attrs: Object.fromEntries(node.attrs.map(attr => [attr.name, attr.value])) });
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
  for (const page of pages) assert.ok(documents.has(page + "index.html"), `Missing page: /${page}`);

  for (const [file, elements] of documents) {
    const from = new URL(file.replace(/index\.html$/, ""), base);
    assert.equal(elements.some(({ tag, attrs }) => tag === "meta" &&
      attrs.name === "robots" && attrs.content === "noindex"), !site.indexable);
    assert.ok(!elements.some(({ tag }) => ["form", "input", "iframe"].includes(tag)), `Unexpected embed or form: ${file}`);

    for (const { tag, attrs } of elements) {
      if ("href" in attrs) checkReference(attrs.href, from, tag !== "a", documents);
      if ("src" in attrs) checkReference(attrs.src, from, true, documents);
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
