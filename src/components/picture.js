/**
 * Einzige img-Ausgabe mit zentralen Maßen und lesbarem Fehler-Fallback.
 * Eingaben: Schlüssel in content/images.js und optionale Priorität.
 * Bilddaten dort ändern; keine externen Ersatzbilder nachladen.
 */
import { images, imageFallback } from '../../content/images.js';
import { ui } from '../../content/site.js';
import { h } from '../lib/dom.js';
export function picture(key, { priority = false, className = '' } = {}) {
  const data = images[key] ?? imageFallback;
  const fallback = h('span', { className: 'picture__fallback', hidden: Boolean(data.src), role: 'img', 'aria-label': `${data.alt}. ${ui.imageFallback}` }, data.initials);
  if (!data.src) return h('div', { className: `picture ${className}` }, fallback);
  const img = h('img', { src: data.src, alt: data.alt, width: data.width, height: data.height, loading: priority ? 'eager' : 'lazy', decoding: 'async', fetchpriority: priority ? 'high' : undefined });
  img.style.objectPosition = data.objectPosition ?? 'center';
  img.addEventListener('error', () => { img.hidden = true; fallback.hidden = false; });
  return h('div', { className: `picture ${className}` }, img, fallback);
}
