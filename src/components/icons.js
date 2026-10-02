/**
 * Eigene Inline-SVGs in einem einheitlichen Strichstil.
 * Eingabe: Symbolschlüssel; sichtbare Beschriftung übernimmt die aufrufende Komponente.
 * Neue Symbole hier als feste Pfade ergänzen; keine Inhalts-HTML-Strings.
 */
const paths = {
  health: ['M12 20S3 14 3 8a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-9 12-9 12Z', 'M6 11h3l2-4 2 8 2-4h3'],
  shield: ['M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6Z', 'm8 12 3 3 5-6'],
  activity: ['M3 12h4l3-8 4 16 3-8h4'],
  prescription: ['M6 3h12v18H6Z', 'M9 8h6M9 12h6M9 16h3'],
  referral: ['M5 3h10l4 4v14H5Z', 'M14 3v5h5M8 14h8m-3-3 3 3-3 3'],
  pin: ['M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z', 'M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'],
  phone: ['M7 3 3 5c-1 8 8 17 16 16l2-4-5-3-3 3-6-6 3-3Z'],
  arrow: ['M4 12h16m-6-6 6 6-6 6'],
  plus: ['M12 5v14M5 12h14'],
  chevron: ['m6 9 6 6 6-6']
};
export function icon(name) {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  Object.entries({ viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.6', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true', focusable: 'false', class: 'icon' }).forEach(([key, value]) => svg.setAttribute(key, value));
  for (const d of paths[name] ?? paths.arrow) { const path = document.createElementNS(ns, 'path'); path.setAttribute('d', d); svg.append(path); }
  return svg;
}
