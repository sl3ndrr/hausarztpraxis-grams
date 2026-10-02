/**
 * Theme-Parität, Token-Verwendung und rechnerische WCAG-Kontraste.
 * Eingaben: explizite Token-Blöcke und CSS-Quellen; keine Pakete.
 * Neue Text-/Flächenpaare hier prüfen, Farben nur in tokens.css ändern.
 */
import assert from 'node:assert/strict';
const parse = block => Object.fromEntries([...block.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map(match => [match[1], match[2].trim()]));
function luminance(hex) {
  const channels = hex.match(/[\da-f]{2}/gi).map(value => Number.parseInt(value, 16) / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  return .2126 * channels[0] + .7152 * channels[1] + .0722 * channels[2];
}
export function contrast(a, b) { const values = [luminance(a), luminance(b)].sort((x, y) => y - x); return (values[0] + .05) / (values[1] + .05); }
export function checkTokens(css, sources, fail) {
  const light = parse(css.match(/:root\s*\{([^}]+)\}/)?.[1] ?? '');
  const systemDark = parse(css.match(/:root:not\(\[data-theme="light"\]\)\s*\{([^}]+)\}/)?.[1] ?? '');
  const explicitDark = parse(css.match(/:root\[data-theme="dark"\]\s*\{([^}]+)\}/)?.[1] ?? '');
  try { assert.deepEqual(systemDark, explicitDark); } catch { fail('styles/tokens.css', 'Beide Dark-Blöcke müssen identisch sein.'); }
  try { assert.deepEqual(Object.keys(light).sort(), Object.keys(explicitDark).sort()); } catch { fail('styles/tokens.css', 'Light- und Dark-Tokens müssen dieselben Schlüssel enthalten.'); }
  for (const [path, text] of Object.entries(sources)) if (path.endsWith('.css') && path !== 'styles/tokens.css') {
    for (const match of text.matchAll(/var\((--[\w-]+)/g)) if (!(match[1] in light)) fail(path, `Unbekanntes Token: ${match[1]}`);
    const withoutMedia = text.replace(/@media[^\{]*\{/g, '{');
    if (/\b\d+(?:\.\d+)?m?s\b/.test(withoutMedia)) fail(path, 'Feste Dauer außerhalb von tokens.css.');
    if (/(?:font-size|padding(?:-[\w-]+)?|margin(?:-[\w-]+)?|gap|border-radius)\s*:[^;{}]*\b\d+(?:\.\d+)?(?:px|rem|em)\b/.test(withoutMedia)) fail(path, 'Schriftgröße, Abstand oder Radius muss ein Token verwenden.');
    if (/\b(?:white|black|red|blue|gray|grey|teal)\b\s*[;}]/i.test(withoutMedia)) fail(path, 'Farbname außerhalb von tokens.css.');
  }
  const pairs = [
    ['color-text', 'color-bg', 7], ['color-text', 'color-surface', 7], ['color-text', 'color-surface-raised', 7],
    ['color-muted', 'color-bg', 7], ['color-muted', 'color-surface', 7], ['color-muted', 'color-surface-raised', 7],
    ['color-primary', 'color-bg', 7], ['color-primary', 'color-surface', 7], ['color-primary', 'color-surface-raised', 7],
    ['color-on-primary', 'color-primary', 4.5], ['color-on-primary', 'color-primary-hover', 4.5],
    ['color-on-warm', 'color-warm', 7], ['color-status', 'color-surface', 7],
    ['color-error', 'color-surface', 7], ['color-error', 'color-error-bg', 7],
    ['color-border', 'color-surface', 3], ['color-border', 'color-bg', 3],
    ['color-focus', 'color-bg', 3], ['color-focus', 'color-surface', 3], ['color-focus', 'color-surface-raised', 3],
    ['color-footer-text', 'color-footer-bg', 7], ['color-hero-text', 'color-hero-bg', 7]
  ];
  for (const [mode, tokens] of [['Hell', light], ['Dunkel', explicitDark]]) for (const [foreground, background, minimum] of pairs) {
    const fg = tokens['--' + foreground]; const bg = tokens['--' + background];
    if (!/^#[\da-f]{6}$/i.test(fg ?? '') || !/^#[\da-f]{6}$/i.test(bg ?? '')) { fail('styles/tokens.css', `${mode}: Kontrastfarbe fehlt für ${foreground}/${background}.`); continue; }
    const ratio = contrast(fg, bg);
    if (ratio < minimum) fail('styles/tokens.css', `${mode}: ${foreground}/${background} ${ratio.toFixed(2)}:1; benötigt ${minimum}:1.`);
  }
  for (const [mode, tokens] of [['Hell', light], ['Dunkel', explicitDark]]) {
    const overlay = tokens['--color-overlay']?.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)$/);
    if (!overlay) { fail('styles/tokens.css', `${mode}: Hero-Overlay nicht als prüfbares rgba definiert.`); continue; }
    const alpha = Number(overlay[4]);
    const composite = '#' + overlay.slice(1, 4).map(value => Math.round(Number(value) * alpha + 255 * (1 - alpha)).toString(16).padStart(2, '0')).join('');
    if (contrast(tokens['--color-hero-text'], composite) < 7) fail('styles/tokens.css', `${mode}: Hero-Text auf Overlay über weißem Bild unter 7:1.`);
  }
}
