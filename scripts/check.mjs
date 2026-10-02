/**
 * Statische Konsistenz-, Architektur- und Kontrastprüfung ohne Pakete.
 * Eingaben: Repository-Dateien und zentrale Content-Module.
 * Neue Regeln hier ergänzen; jeder Fehler nennt Pfad und endet mit Exit-Code 1.
 */
import { readdir, readFile, access } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { practice } from '../content/practice.js';
import { hours } from '../content/hours.js';
import { site, ui } from '../content/site.js';
import { images } from '../content/images.js';
import { navigation, footerLinks } from '../content/navigation.js';
import { seo } from '../content/seo.js';
import { home } from '../content/home.js';
import { team } from '../content/team.js';
import { routes, fallbackRoute } from '../src/routes.js';
import { checkTokens } from './lib/check-tokens.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
let failures = 0;
function fail(path, message) { console.error(`${path}: ${message}`); failures++; }
function expect(condition, path, message) { if (!condition) fail(path, message); }
async function walk(directory = '') {
  const result = [];
  for (const entry of await readdir(root + directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.') && !['.editorconfig', '.gitignore', '.nojekyll'].includes(entry.name)) continue;
    const path = directory + entry.name;
    if (entry.isDirectory()) result.push(...await walk(path + '/')); else result.push(path);
  }
  return result;
}
const files = await walk();
const textFiles = files.filter(path => /\.(?:html|css|js|mjs|md)$/.test(path));
const sources = Object.fromEntries(await Promise.all(textFiles.map(async path => [path, await readFile(root + path, 'utf8')])));
const allowedHost = (url, path) => {
  if (url.hostname === 'hausarztpraxis-grams.de') return true;
  if (url.hostname === 'www.unimedizin-mainz.de') return url.pathname === '/allgemeinmedizin/allgemeinmedizin/uebersicht.html';
  if (url.hostname === 'www.google.com') return url.pathname.startsWith('/maps/');
  if (url.hostname === 'www.openstreetmap.org') return url.pathname === '/search';
  if (url.hostname === 'schema.org') return path === 'index.html' && url.pathname === '/';
  return url.hostname === 'www.w3.org' && path === 'src/components/icons.js' && url.pathname === '/2000/svg';
};
for (const [path, text] of Object.entries(sources)) {
  if (/\.(?:html|css|js)$/.test(path)) {
    for (const match of text.matchAll(/https?:\/\/[^\s'"<>`]+/g)) {
      try { expect(allowedHost(new URL(match[0]), path), path, `Unerlaubtes URL-Ziel: ${match[0]}`); } catch { fail(path, `Ungültige URL: ${match[0]}`); }
      if (match[0].includes('/.cm4all/')) expect(path === 'content/images.js' || (path === 'index.html' && match[0] === images.hero.src), path, 'Bild-URL außerhalb der zentralen Bilddaten.');
    }
    expect(!/(?:<script[^>]+src|<link[^>]+href)\s*=\s*["'](?:https?:)?\/\//i.test(text), path, 'Externes Skript oder Stylesheet ist verboten.');
    expect(!/@import|fonts\.googleapis|innerHTML\s*=/.test(text), path, 'Verbotener Import, externer Font oder innerHTML.');
    if (path !== 'styles/tokens.css') expect(!/#[\da-f]{3,8}\b|\b(?:rgba?|hsla?)\(/i.test(text), path, 'Farbwert außerhalb von styles/tokens.css.');
    for (const image of Object.values(images)) if (text.includes(image.src) && path !== 'content/images.js') expect(path === 'index.html' && image === images.hero, path, 'Praxis-Bild-URL muss aus content/images.js stammen.');
    if (path.startsWith('src/') && path !== 'src/components/picture.js') expect(!/h\(['"]img['"]|createElement\(['"]img['"]/.test(text), path, 'Bilder ausschließlich über picture.js ausgeben.');
  }
  if (/\.(?:js|mjs)$/.test(path)) {
    try { execFileSync(process.execPath, ['--check', root + path], { stdio: 'pipe' }); } catch { fail(path, 'JavaScript-Syntax ungültig.'); }
    for (const match of text.matchAll(/(?:from\s*|import\s*)['"](\.[^'"]+)['"]/g)) {
      try { await access(fileURLToPath(new URL(match[1], new URL(path, `file://${root}`)))); } catch { fail(path, `Import fehlt: ${match[1]}`); }
    }
  }
  if (/\.(?:js|mjs|css)$/.test(path)) expect(text.startsWith('/**') || text.startsWith('/*'), path, 'Kopfkommentar fehlt.');
  expect(!text.includes('Chiru' + 'gie'), path, 'Tippfehler: Chirurgie verwenden.');
  if (path.startsWith('src/')) {
    for (const fact of [practice.phone.text, practice.phone.href, practice.fax, practice.email, practice.address.street, practice.address.postalCode]) expect(!text.includes(fact), path, `Fakt ist außerhalb von content/ hartkodiert: ${fact}`);
  }
  if (path.startsWith('content/')) expect(!/<\/?[a-z]+[\s>]|\bfunction\b|=>/.test(text), path, 'Content muss reine Daten ohne HTML oder Funktionen enthalten.');
}
const html = sources['index.html'];
const jsonMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
let structured;
try { structured = JSON.parse(jsonMatch?.[1]); } catch { fail('index.html', 'JSON-LD fehlt oder ist ungültig.'); }
if (structured) {
  const expected = { name: practice.name, url: site.url, telephone: practice.phone.text, faxNumber: practice.fax, email: practice.email };
  for (const [key, value] of Object.entries(expected)) expect(structured[key] === value, 'index.html', `JSON-LD ${key} stimmt nicht mit content/ überein.`);
  for (const [key, value] of Object.entries({ streetAddress: practice.address.street, postalCode: practice.address.postalCode, addressLocality: practice.address.city })) expect(structured.address?.[key] === value, 'index.html', `JSON-LD Adresse: ${key} stimmt nicht.`);
  const weekdays = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const expectedHours = hours.flatMap(day => day.intervals.map(([opens, closes]) => ({ dayOfWeek: weekdays[day.weekday], opens, closes })));
  const actualHours = structured.openingHoursSpecification?.map(({ dayOfWeek, opens, closes }) => ({ dayOfWeek, opens, closes }));
  try { assert.deepEqual(actualHours, expectedHours); } catch { fail('index.html', 'JSON-LD Sprechzeiten stimmen nicht mit content/hours.js überein.'); }
}
const fallback = html.match(/<noscript>([\s\S]*?)<\/noscript>/)?.[1] ?? '';
const contactPhone = fallback.match(/Telefon: <a href="([^"]+)">([^<]+)<\/a> · Telefax: ([^<]+)<\/p>/);
expect(contactPhone?.[1] === practice.phone.href && contactPhone?.[2] === practice.phone.text && contactPhone?.[3] === practice.fax, 'index.html', 'noscript-Telefon/Fax weicht von practice.js ab.');
expect(fallback.includes(`<p>${practice.doctor} · ${practice.address.street}, ${practice.address.postalCode} ${practice.address.city}</p>`), 'index.html', 'noscript-Adresszeile stimmt nicht mit practice.js überein.');
expect(fallback.includes(`<a href="mailto:${practice.email}">${practice.email}</a>`), 'index.html', 'noscript-E-Mail-Link stimmt nicht.');
for (const fact of [practice.name, practice.doctor, practice.address.street, practice.address.postalCode, practice.address.city, practice.phone.text, practice.phone.href, practice.fax, practice.email]) expect(fallback.includes(fact), 'index.html', `noscript enthält den Fakt nicht: ${fact}`);
const fallbackRows = [...fallback.matchAll(/<tr data-weekday="(\d+)"><th scope="row">([^<]+)<\/th><td>(.*?)<\/td><\/tr>/g)];
const wantedRows = hours.map(day => ({ weekday: day.weekday, label: day.label, intervals: day.intervals.map(pair => pair.map(value => value.replace(/^0/, '')).join('–')) }));
const actualRows = fallbackRows.map(row => ({ weekday: Number(row[1]), label: row[2], intervals: [...row[3].matchAll(/<span>(.*?)<\/span>/g)].map(part => part[1]) }));
try { assert.deepEqual(actualRows, wantedRows); } catch { fail('index.html', 'noscript-Sprechzeiten stimmen nicht mit content/hours.js überein.'); }
for (const link of practice.legal) expect(fallback.includes(link.href), 'index.html', `Rechtslink fehlt: ${link.text}`);
expect(fallback.includes('112') && fallback.includes('116 117') && ui.statusNote, 'index.html', 'Notfall-/Live-Status-Hinweis fehlt.');
expect(html.includes(images.hero.src), 'index.html', 'OG-Bild stimmt nicht mit content/images.js überein.');
expect(html.includes(seo.home.title) && html.includes(seo.home.description), 'index.html', 'Statische Startseiten-SEO weicht von content/seo.js ab.');
const known = new Set(routes.map(route => '#' + route.path));
expect(known.size === routes.length, 'src/routes.js', 'Doppelte Route.');
for (const route of [...routes, fallbackRoute]) {
  expect(Boolean(seo[route.seo]?.title && seo[route.seo]?.description), 'content/seo.js', `SEO-Eintrag fehlt: ${route.seo}`);
  expect(typeof route.view === 'function', 'src/routes.js', `View-Funktion fehlt: ${route.file}`);
  expect(files.includes('src/views/' + route.file), 'src/routes.js', `View-Datei fehlt: ${route.file}`);
}
function checkLink(link) { if (link.href.startsWith('#/')) expect(known.has(link.href), 'content/navigation.js', `Unbekannte Route: ${link.href}`); link.children?.forEach(checkLink); }
[...navigation, ...footerLinks, ...home.shortcuts].forEach(checkLink);
for (const [key, image] of Object.entries(images)) expect(Boolean(image.alt && image.initials && image.width > 0 && image.height > 0), 'content/images.js', `Bild ${key}: alt, Maße oder Fallback fehlen.`);
for (const person of team) {
  expect(!person.image || Boolean(images[person.image]), 'content/team.js', `Bildschlüssel fehlt: ${person.image}`);
  if (person.image && images[person.image]) expect(images[person.image].alt.includes(person.name), 'content/images.js', `Alttext passt nicht zum Teammitglied: ${person.image}`);
}
checkTokens(sources['styles/tokens.css'], sources, fail);
const pkg = JSON.parse(await readFile(root + 'package.json', 'utf8'));
expect(Object.keys(pkg).every(key => ['type', 'scripts'].includes(key)) && pkg.type === 'module', 'package.json', 'Nur type:module und scripts sind erlaubt.');
for (const key of ['check', 'test', 'serve']) expect(Boolean(pkg.scripts?.[key]), 'package.json', `Script ${key} fehlt.`);
for (const path of ['README.md', 'AGENTS.md', 'docs/ARCHITECTURE.md', 'docs/CONTENT-GUIDE.md', 'docs/DESIGN-SYSTEM.md', 'docs/TEXT-CHANGES.md', 'docs/OPEN-POINTS.md']) expect(files.includes(path), path, 'Pflichtdokument fehlt.');
if (failures) { console.error(`Prüfung fehlgeschlagen: ${failures} Fehler.`); process.exitCode = 1; }
else console.log(`Prüfung bestanden: ${files.length} Dateien, ${routes.length} Routen, ${Object.keys(images).length} Bilder; Fakten, Imports, Tokens und Kontraste konsistent.`);
