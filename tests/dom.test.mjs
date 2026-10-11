/**
 * Komponenten- und Routing-Smoke-Tests mit DOM-Testdouble ohne Layoutengine.
 * Eingaben: echte Views und synthetische Bedienereignisse, keine Patientendaten.
 * Layout/Screenreader separat prüfen; Cleanup und offene Inhalte hier absichern.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { installDOM, TestNode } from './helpers/dom.mjs';
import { routes } from '../src/routes.js';
import { home } from '../content/home.js';
import { forms } from '../content/forms.js';
import { routeLocation } from '../src/lib/route-location.js';
import { header } from '../src/components/header.js';
import { footer } from '../src/components/footer.js';
import { startRouter } from '../src/router.js';
const env = installDOM();
test('Alle neun Views rendern, haben genau ein H1, eindeutige IDs und räumen Timer auf', () => {
  for (const route of routes) {
    const before = env.timers.size; const view = route.view();
    assert.equal(view.element.querySelectorAll('h1').length, 1, route.path);
    const ids = view.element.querySelectorAll('[id]').map(node => node.id);
    assert.equal(new Set(ids).size, ids.length, route.path);
    view.destroy?.(); assert.equal(env.timers.size, before, route.path);
  }
});
test('Anliegen-Deep-Anker führen zu vorhandenen sichtbaren und fokussierbaren Zielen', () => {
  for (const item of home.shortcuts) {
    const target = routeLocation(item.href); const view = routes.find(route => route.path === target.path).view();
    if (target.section) {
      const section = view.element.querySelector(`[id="${target.section}"]`);
      assert.ok(section, item.title); assert.equal(section.hidden, false); assert.equal(section.getAttribute('tabindex'), '-1');
    }
    view.destroy?.();
  }
});
test('Leistungsinhalte sind ohne Öffnen eines Akkordeons sichtbar', () => {
  for (const route of routes.filter(route => route.path.startsWith('/leistungen/'))) {
    const view = route.view();
    assert.equal(view.element.querySelectorAll('.accordion').length, 0);
    assert.ok(view.element.querySelectorAll('.chapter').every(node => !node.hidden));
    assert.ok(view.element.querySelector('.next-area'));
  }
});
test('Suche zeigt Treffer und leeren Zustand sowie Rückkehr zu allen Einträgen', async () => {
  const view = routes.find(route => route.path === '/leistungen').view();
  const search = view.element.querySelector('[data-service-search]'); const input = search.querySelector('input');
  input.value = 'Sonographie'; await input.emit('input');
  assert.equal(search.querySelectorAll('li').length, 4);
  input.value = 'unbekannter Suchbegriff'; await input.emit('input');
  assert.equal(search.querySelectorAll('li').length, 0); assert.ok(search.textContent.includes('Keine passenden Einträge'));
  await search.querySelector('button').emit('click'); assert.equal(search.querySelectorAll('li').length, 32);
});
test('Header-Panel und Escape erhalten Fokus und schließen korrekt', async () => {
  const before = env.timers.size; const nav = header();
  const toggle = nav.element.querySelector('.header__settings-toggle'); const panel = nav.element.querySelector('[id="settings-panel"]');
  assert.equal(panel.hidden, true); await toggle.emit('click'); assert.equal(panel.hidden, false);
  await toggle.emit('keydown', { key: 'Escape' }); assert.equal(panel.hidden, true); assert.equal(document.activeElement, toggle);
  nav.destroy(); assert.equal(env.timers.size, before);
  assert.equal(footer().querySelector('.emergency-band').querySelectorAll('a').length, 2);
});
test('Beide Formulare zeigen Fehler und ausschließlich lokale Demo-Erfolge', async () => {
  for (const [kind, path] of [['prescription', '/rezeptwunsch'], ['referral', '/ueberweisungswunsch']]) {
    const view = routes.find(route => route.path === path).view(); const form = view.element.querySelector('form');
    await form.emit('submit'); assert.equal(form.querySelector('.form__summary').hidden, false);
    for (const field of forms[kind].fields.filter(field => field.required)) form.querySelector(`[id="${kind}-${field.name}"]`).value = 'Demo';
    for (const [name, value] of [['birthDay', '1'], ['birthMonth', '1'], ['birthYear', '2000']]) form.querySelector(`[id="${kind}-${name}"]`).value = value;
    form.querySelector(`[id="${kind}-consent"]`).checked = true;
    await form.emit('submit'); assert.equal(form.querySelector('.form__summary').hidden, true);
    assert.ok(form.querySelector('.form__result').textContent.includes('Es wurde nichts übermittelt'));
    assert.equal(form.querySelector('.request-progress').querySelector('[aria-current="step"]').querySelector('strong').textContent, 'Telefonisch Kontakt aufnehmen');
    assert.ok(form.querySelectorAll('input').every(input => input.value === '')); view.destroy();
  }
});
test('Router fokussiert Deep-Anker, markiert Route und erhält eine Fehleransicht', () => {
  const mount = new TestNode('main'); const meta = new TestNode('meta'); meta.matches = selector => selector === 'meta[name="description"]';
  const announcer = new TestNode('p'); announcer.setAttribute('data-route-announcer', ''); document.append(mount, meta, announcer);
  location.hash = '#/leistungen/gesundheit?section=acute'; const stop = startRouter(mount, () => {});
  assert.equal(document.activeElement.id, 'acute'); assert.equal(document.activeElement.scrolled, true);
  location.hash = '#/unbekannt'; window.listeners.hashchange[0]();
  assert.equal(mount.querySelectorAll('h1').length, 1); assert.ok(document.title.includes('Seite nicht gefunden'));
  stop(); assert.equal(env.timers.size, 0);
});
