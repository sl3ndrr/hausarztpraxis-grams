/**
 * Grenzfälle der Sprechzeiten einschließlich Wochenende und Zeitumstellung.
 * Eingaben: feste Zeitpunkte und zentraler Wochenplan.
 * Neue Grenzfälle bei Änderungen der reinen Statuslogik hier ergänzen.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { hours, timeZone } from '../content/hours.js';
import { openingStatus, localParts } from '../src/lib/opening-status.js';
const status = date => openingStatus(new Date(date), hours, timeZone);
test('Montag vor, genau bei und nach Öffnung', () => {
  assert.equal(status('2026-10-05T05:29:00Z').open, false);
  assert.deepEqual(status('2026-10-05T05:30:00Z'), { open: true, until: '12:00', weekday: 1 });
  assert.equal(status('2026-10-05T09:59:00Z').open, true);
});
test('Mittagspause ab exakt 12 Uhr; Wiederöffnung exakt 15 Uhr', () => {
  assert.deepEqual(status('2026-10-05T10:00:00Z').next, { daysAhead: 0, weekday: 1, label: 'Montag', start: '15:00' });
  assert.equal(status('2026-10-05T13:00:00Z').open, true);
  assert.equal(status('2026-10-05T15:30:00Z').open, false);
});
test('Mittwoch hat keinen Nachmittag; Freitag führt zum Montag', () => {
  assert.equal(status('2026-10-07T10:00:00Z').next.label, 'Donnerstag');
  assert.equal(status('2026-10-09T10:00:00Z').next.daysAhead, 3);
  assert.equal(status('2026-10-10T08:00:00Z').next.daysAhead, 2);
  assert.equal(status('2026-10-11T08:00:00Z').next.daysAhead, 1);
});
test('Winterzeit berücksichtigt Europe/Berlin statt UTC oder Browserzeit', () => {
  assert.equal(status('2026-10-26T06:30:00Z').open, true);
  assert.equal(status('2026-10-26T05:30:00Z').open, false);
  assert.equal(localParts(new Date('2026-03-29T01:30:00Z'), timeZone).hour, 3);
  assert.equal(localParts(new Date('2026-10-25T01:30:00Z'), timeZone).hour, 2);
});
test('Lokaler Mitternachtswechsel und leerer Plan', () => {
  assert.equal(status('2026-10-04T22:01:00Z').weekday, 1);
  assert.deepEqual(openingStatus(new Date('2026-10-02'), [], timeZone).next, null);
});
