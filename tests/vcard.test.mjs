/**
 * vCard-Fakten, Sonderzeichen und UTF-8-Zeilenfaltung.
 * Eingaben: zentrale Praxisdaten und synthetischer Text, keine Dateien/Netzwerke.
 * Interoperabilität bei Formatänderungen anhand dieser Grenzen absichern.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { practice } from '../content/practice.js';
import { createVCard, escapeVCard, foldVCardLine } from '../src/lib/vcard.js';
test('vCard enthält ausschließlich zentrale Kontaktdaten und CRLF', () => {
  const card = createVCard(practice);
  assert.ok(card.startsWith('BEGIN:VCARD\r\nVERSION:3.0\r\n'));
  assert.ok(card.endsWith('END:VCARD\r\n')); assert.ok(card.includes(`FN:${practice.name}`));
  assert.ok(card.includes(practice.address.street)); assert.ok(card.includes(practice.address.postalCode));
  assert.ok(card.includes(practice.email)); assert.ok(card.includes(practice.phone.href.slice(4)));
  assert.ok(!/(?<!\r)\n/.test(card));
});
test('Sonderzeichen und Zeilenumbrüche erzeugen keine zusätzlichen Eigenschaften', () => {
  assert.equal(escapeVCard('A;B,C\\D\r\nE'), 'A\\;B\\,C\\\\D\\nE');
  const card = createVCard({ ...practice, name: 'Name\nURL:unerwünscht' });
  assert.ok(!card.includes('\r\nURL:'));
});
test('Zeilenfaltung überschreitet 75 UTF-8-Oktette nicht', () => {
  const source = 'FN:' + 'ÄÖß🙂'.repeat(35); const folded = foldVCardLine(source);
  assert.equal(folded.replace(/\r\n /g, ''), source);
  for (const line of folded.split('\r\n')) assert.ok(new TextEncoder().encode(line).length <= 75);
});
