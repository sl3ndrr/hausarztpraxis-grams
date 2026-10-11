/**
 * Kleines DOM-Testdouble für Komponenten- und Router-Verhalten ohne Browser.
 * Eingaben: DOM-Operationen des Projekts; keine Layout- oder CSS-Berechnung.
 * Nur benötigte Plattformoperationen abbilden, visuelle Prüfung nicht behaupten.
 */
export class TestNode {
  constructor(tag = '', value = '') {
    this.tagName = tag.toLowerCase(); this.value = value; this.children = []; this.attrs = {}; this.listeners = {}; this.style = {}; this.parentElement = null; this.checked = false;
    this.dataset = new Proxy({}, { set: (object, key, value) => { object[key] = value; this.attrs['data-' + key.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase())] = String(value); return true; } });
  }
  append(...nodes) {
    for (const node of nodes.flat()) {
      if (node.tagName === '#fragment') { this.append(...node.children); continue; }
      if (node.parentElement) node.parentElement.children = node.parentElement.children.filter(child => child !== node);
      node.parentElement = this; this.children.push(node);
    }
  }
  replaceChildren(...nodes) { this.children.forEach(node => { node.parentElement = null; }); this.children = []; this.append(...nodes); }
  get textContent() { return this.tagName === '#text' ? this.value : this.children.map(child => child.textContent).join(''); }
  set textContent(value) { this.replaceChildren(new TestNode('#text', String(value))); }
  get childElementCount() { return this.children.filter(child => child.tagName !== '#text').length; }
  get className() { return this.attrs.class ?? ''; }
  set className(value) { this.attrs.class = value; }
  get id() { return this.attrs.id ?? ''; }
  get hidden() { return 'hidden' in this.attrs; }
  set hidden(value) { if (value) this.attrs.hidden = ''; else delete this.attrs.hidden; }
  setAttribute(key, value) { this.attrs[key] = String(value); }
  getAttribute(key) { return this.attrs[key] ?? null; }
  removeAttribute(key) { delete this.attrs[key]; }
  toggleAttribute(key, force = !(key in this.attrs)) { if (force) this.setAttribute(key, ''); else this.removeAttribute(key); return force; }
  addEventListener(name, callback) { (this.listeners[name] ??= []).push(callback); }
  removeEventListener(name, callback) { this.listeners[name] = (this.listeners[name] ?? []).filter(entry => entry !== callback); }
  async emit(name, extras = {}) {
    const event = { target: this, preventDefault() {}, ...extras };
    for (let node = this; node; node = node.parentElement) for (const handler of node.listeners[name] ?? []) await handler(event);
  }
  matches(selector) {
    if (selector.startsWith('.')) return this.className.split(' ').includes(selector.slice(1));
    const attr = selector.match(/^\[([^=\]]+)(?:="?([^"\]]+)"?)?\]$/);
    if (attr) return attr[2] === undefined ? attr[1] in this.attrs : this.attrs[attr[1]] === attr[2];
    return this.tagName === selector.toLowerCase();
  }
  querySelectorAll(selector) { return this.children.flatMap(child => [...(child.matches(selector) ? [child] : []), ...child.querySelectorAll(selector)]); }
  querySelector(selector) { return this.querySelectorAll(selector)[0] ?? null; }
  closest(selector) { return this.matches(selector) ? this : this.parentElement?.closest(selector) ?? null; }
  contains(node) { return node === this || this.children.some(child => child.contains(node)); }
  focus() { globalThis.document.activeElement = this; }
  scrollIntoView() { this.scrolled = true; }
  reset() { this.querySelectorAll('input').forEach(input => { input.value = ''; input.checked = false; }); }
}
export function installDOM() {
  const document = new TestNode('#document');
  document.createElement = tag => new TestNode(tag);
  document.createElementNS = (_namespace, tag) => new TestNode(tag);
  document.createTextNode = text => new TestNode('#text', text);
  document.createDocumentFragment = () => new TestNode('#fragment');
  globalThis.document = document; globalThis.Node = TestNode;
  globalThis.window = new TestNode('#window'); window.scrollTo = () => {};
  globalThis.location = { hash: '#/' };
  const timers = new Set(); let timerId = 0;
  globalThis.setInterval = () => { timers.add(++timerId); return timerId; };
  globalThis.clearInterval = id => timers.delete(id);
  globalThis.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
  globalThis.FormData = class {
    constructor(form) { this.entries = form.querySelectorAll('input').filter(input => input.getAttribute('name') && (input.getAttribute('type') !== 'checkbox' || input.checked)).map(input => [input.getAttribute('name'), input.value]); }
    [Symbol.iterator]() { return this.entries[Symbol.iterator](); }
  };
  return { document, timers };
}
