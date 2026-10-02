/**
 * Explizite Route-zu-View-Tabelle ohne berechnete Imports.
 * Eingaben: View-Funktionen und SEO-Schlüssel aus content/seo.js.
 * Neue Seite hier, in navigation.js und seo.js eintragen.
 */
import { homeView } from './views/home.js';
import { servicesView } from './views/leistungen.js';
import { healthView } from './views/leistungen-gesundheit.js';
import { preventionView } from './views/leistungen-vorsorge.js';
import { sportsView } from './views/leistungen-sportmedizin.js';
import { doctorView } from './views/arzt.js';
import { prescriptionView } from './views/rezeptwunsch.js';
import { referralView } from './views/ueberweisungswunsch.js';
import { directionsView } from './views/anfahrt.js';
import { notFoundView } from './views/not-found.js';
export const routes = [
  { path: '/', view: homeView, seo: 'home', file: 'home.js' },
  { path: '/leistungen', view: servicesView, seo: 'services', file: 'leistungen.js' },
  { path: '/leistungen/gesundheit', view: healthView, seo: 'health', file: 'leistungen-gesundheit.js' },
  { path: '/leistungen/vorsorge', view: preventionView, seo: 'prevention', file: 'leistungen-vorsorge.js' },
  { path: '/leistungen/sportmedizin', view: sportsView, seo: 'sports', file: 'leistungen-sportmedizin.js' },
  { path: '/arzt', view: doctorView, seo: 'doctor', file: 'arzt.js' },
  { path: '/rezeptwunsch', view: prescriptionView, seo: 'prescription', file: 'rezeptwunsch.js' },
  { path: '/ueberweisungswunsch', view: referralView, seo: 'referral', file: 'ueberweisungswunsch.js' },
  { path: '/anfahrt', view: directionsView, seo: 'directions', file: 'anfahrt.js' }
];
export const fallbackRoute = { view: notFoundView, seo: 'notFound', file: 'not-found.js' };
