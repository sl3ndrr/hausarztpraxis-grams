/**
 * Gesundheitsleistungen mit vollständiger Qualifikationsauswahl.
 * Eingaben: health, qualifications und gemeinsamer Detailaufbau.
 * Medizinische Angaben nur in content/ ändern.
 */
import { health } from '../../content/services/gesundheit.js';
import { qualifications, privateProcedures } from '../../content/qualifications.js';
import { ui } from '../../content/site.js';
import { list } from '../lib/dom.js';
import { accordion } from '../components/accordion.js';
import { serviceDetail } from '../components/service-detail.js';
export function healthView() { return serviceDetail(health, [accordion('qualifications', ui.qualifications, list(qualifications)), accordion('private-procedures', ui.privateProcedures, list(privateProcedures))]); }
