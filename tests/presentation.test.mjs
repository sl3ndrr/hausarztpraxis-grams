/**
 * Grenzfälle der Wochenbalken und Hash-Deep-Anker ohne Browser.
 * Eingaben: feste Zeitpunkte, echter Wochenplan und ungültige Parameter.
 * Neue reine Präsentationslogik mit aussagekräftigen Fällen ergänzen.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { hours } from '../content/hours.js';
import { weekScale, weekSegments, nowPosition } from '../src/lib/week-segments.js';
import { routeLocation } from '../src/lib/route-location.js';
test('Wochenbalken erhalten Mittagspause und kürzere Tage', () => {
  const scale = weekScale(hours); assert.deepEqual(scale, { start: 450, end: 1050 });
  const monday = weekSegments(hours[0].intervals, scale);
  assert.equal(monday[0].left, 0); assert.equal(monday[0].width, 45);
  assert.equal(monday[1].left, 75); assert.equal(monday[1].width, 25);
  assert.equal(weekSegments(hours[2].intervals, scale).length, 1);
  assert.deepEqual(weekSegments([], scale), []);
});
test('Jetzt-Marke an Grenzen, in Pause und außerhalb der Skala', () => {
  const scale = weekScale(hours);
  assert.equal(nowPosition(450, scale), 0); assert.equal(nowPosition(1050, scale), 100);
  assert.equal(nowPosition(750, scale), 50); assert.equal(nowPosition(449, scale), null);
  assert.equal(nowPosition(1051, scale), null); assert.equal(nowPosition(0, { start: 0, end: 0 }), null);
});
test('Deep-Anker erhalten Route und erlauben keine Selektoren', () => {
  assert.deepEqual(routeLocation('#/leistungen/gesundheit?section=home-visits'), { path: '/leistungen/gesundheit', section: 'home-visits' });
  assert.deepEqual(routeLocation(''), { path: '/', section: null });
  assert.equal(routeLocation('#/arzt?section=%22%5D').section, null);
});

import { health } from '../content/services/gesundheit.js';
import { ageStages } from '../src/lib/age-stages.js';
import { qualifications, qualificationGroups } from '../content/qualifications.js';
test('Altersstufen behalten Grenzen und alle Originaltexte', () => {
  const steps = health.sections[0].steps; const result = ageStages(steps);
  assert.deepEqual(result.map(step => step.range), ['18–34', '35+', '45+', '50+', '65+']);
  assert.deepEqual(result.map(step => step.text), steps.map(step => step.text));
  assert.deepEqual(ageStages([]), []);
});
test('Qualifikationsgruppen enthalten jeden Eintrag genau einmal', () => {
  const indices = qualificationGroups.flatMap(group => group.indices);
  assert.equal(indices.length, qualifications.length); assert.equal(new Set(indices).size, qualifications.length);
  assert.deepEqual(indices.toSorted((a, b) => a - b), qualifications.map((_, index) => index));
});
