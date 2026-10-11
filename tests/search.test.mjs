/**
 * Lokale Suchergebnisse, Inhaltsabdeckung und Sonderzeichen.
 * Eingaben: echter Content-Index und synthetische Suchanfragen.
 * Neue Quellen müssen im Index und über Deep-Anker erreichbar bleiben.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { searchSources } from '../content/search.js';
import { qualifications, privateProcedures } from '../content/qualifications.js';
import { serviceIndex, filterServices, normalizeSearch } from '../src/lib/service-search.js';
const index = serviceIndex(searchSources, qualifications, privateProcedures);
test('Suche enthält alle Leistungen, Stufen und Qualifikationen', () => {
  assert.equal(index.length, 32); assert.equal(filterServices(index, '').length, 32);
  assert.ok(filterServices(index, '35').some(entry => entry.href.endsWith('section=checkups')));
  assert.equal(filterServices(index, 'Sonographie').length, 4);
  assert.ok(filterServices(index, 'Botox').length > 0);
});
test('Suchwörter werden gemeinsam, unabhängig von Großschreibung gefiltert', () => {
  assert.ok(filterServices(index, 'DMP INSULIN').length > 0);
  assert.equal(filterServices(index, 'Impfungen Sonographie').length, 0);
  assert.equal(filterServices(index, '[.*]').length, 0);
  assert.equal(normalizeSearch('Ärztliche Straße'), 'arztliche strasse');
});
test('Jeder Suchtreffer führt zu einem vorhandenen Kapitel', () => {
  for (const entry of index) {
    const [href, query] = entry.href.split('?'); const section = new URLSearchParams(query).get('section');
    const source = searchSources.find(source => source.href === href);
    assert.ok(source); assert.ok(source.data.sections.some(item => item.id === section) || ['qualifications', 'private-procedures'].includes(section));
  }
});
