/**
 * Einstieg: Shell mounten, Einstellungen initialisieren, Router starten.
 * Eingaben: zentrale Content-Daten und explizit importierte Komponenten.
 * Neue globale Komponenten hier verbinden; Seitendaten bleiben in content/.
 */
import { ui } from '../content/site.js';
import { images } from '../content/images.js';
import { header } from './components/header.js';
import { footer } from './components/footer.js';
import { mobileBar } from './components/mobile-bar.js';
import { initializeTheme } from './behaviors/theme.js';
import { initializeFontSize } from './behaviors/font-size.js';
import { startRouter } from './router.js';
document.documentElement.classList.add('js');
const navigation = header();
document.querySelector('[data-header-mount]').replaceChildren(navigation.element);
document.querySelector('[data-footer-mount]').replaceChildren(footer());
document.querySelector('[data-mobile-mount]').replaceChildren(mobileBar());
document.querySelector('[data-skip-link]').textContent = ui.skip;
document.querySelector('[data-skip-link]').addEventListener('click', event => { event.preventDefault(); document.querySelector('main').focus(); });
document.querySelector('link[rel="icon"]').href = images.favicon.src;
initializeTheme(); initializeFontSize();
startRouter(document.querySelector('main'), navigation.closeMenu);
