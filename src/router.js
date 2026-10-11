/**
 * Hash-Router mit Aufräumen, Metadaten, Scroll-Reset und Fokusverwaltung.
 * Eingaben: explizite Routentabelle, SEO und Mountpunkt.
 * Neue Seiten in routes.js ergänzen; Render-Ergebnisse liefern optional destroy.
 */
import { routes, fallbackRoute } from './routes.js';
import { seo } from '../content/seo.js';
import { ui } from '../content/site.js';
import { routeLocation } from './lib/route-location.js';
import { reveal } from './behaviors/reveal.js';
export function startRouter(mount, closeMenu) {
  let current;
  let stopReveal = () => {};
  function render() {
    const { path, section } = routeLocation(location.hash);
    const route = routes.find(entry => entry.path === path) ?? fallbackRoute;
    stopReveal(); current?.destroy?.(); closeMenu();
    current = route.view(); mount.replaceChildren(current.element);
    const metadata = seo[route.seo];
    document.title = metadata.title;
    document.querySelector('meta[name="description"]').content = metadata.description;
    document.querySelectorAll('[data-nav-link]').forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${path}`) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
      link.toggleAttribute('data-active-section', href !== '#/' && path.startsWith(href.slice(1) + '/'));
    });
    stopReveal = reveal(mount);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const title = mount.querySelector('h1');
    const target = section && mount.querySelector(`[id="${section}"]`);
    if (target) { target.scrollIntoView({ behavior: 'instant', block: 'start' }); target.focus({ preventScroll: true }); }
    else title?.focus({ preventScroll: true });
    document.querySelector('[data-route-announcer]').textContent = `${ui.routeNotice} ${title?.textContent ?? metadata.title}`;
  }
  window.addEventListener('hashchange', render);
  render();
  return () => { window.removeEventListener('hashchange', render); stopReveal(); current?.destroy?.(); };
}

