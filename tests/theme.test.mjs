/**
 * Reine Theme-Auflösung mit Automatik, manueller Wahl und ungültigen Werten.
 * Eingaben: feste Kombinationen; kein DOM und kein echter Speicher.
 * Bei neuen Modi Tests und theme-init.js gemeinsam ändern.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeTheme, resolveTheme } from '../src/lib/theme.js';
test('Automatik folgt beiden Systemmodi', () => { assert.equal(resolveTheme('auto', false), 'light'); assert.equal(resolveTheme('auto', true), 'dark'); });
test('Manuelle Wahl überschreibt den Systemmodus', () => { assert.equal(resolveTheme('light', true), 'light'); assert.equal(resolveTheme('dark', false), 'dark'); });
test('Fehlende und beschädigte Einstellungen fallen auf Automatik zurück', () => { for (const value of [null, undefined, '', 'invalid', 'AUTO']) { assert.equal(normalizeTheme(value), 'auto'); assert.equal(resolveTheme(value, true), 'dark'); } });
