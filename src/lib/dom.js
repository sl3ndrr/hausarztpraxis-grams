/**
 * Kleiner DOM-Helper ohne Interpretation von Inhalts-HTML.
 * Eingaben: Tag, Attribute und Text-/DOM-Kinder.
 * Neue DOM-Konventionen hier ergänzen; Texte bleiben in content/.
 */
export function h(tag, attributes = {}, ...children) {
  const element = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) {
    if (value === undefined || value === null || value === false) continue;
    if (key.startsWith('on') && typeof value === 'function') element.addEventListener(key.slice(2), value);
    else if (key === 'className') element.className = value;
    else if (key === 'dataset') Object.assign(element.dataset, value);
    else if (key === 'checked') element.checked = value;
    else element.setAttribute(key, value === true ? '' : String(value));
  }
  for (const child of children.flat(Infinity)) {
    if (child !== null && child !== undefined && child !== false) element.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return element;
}
export function sectionHeading(title, intro) {
  return h('div', { className: 'section-heading' }, h('h2', {}, title), intro && h('p', {}, intro));
}
export function pageHeading(data) {
  return h('div', { className: 'page-heading' }, h('p', { className: 'eyebrow' }, data.eyebrow), h('h1', { tabindex: '-1' }, data.title), data.intro && h('p', { className: 'lead' }, data.intro));
}
export function list(items) { return h('ul', { className: 'text-list' }, items.map(item => h('li', {}, item))); }
