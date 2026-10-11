/**
 * Gesundheit mit Altersleiste und vollständig sichtbaren Qualifikationsgruppen.
 * Eingaben: health und gemeinsame Kapitelkomponenten.
 * Medizinische Angaben ausschließlich in content/ ändern.
 */
import { health } from '../../content/services/gesundheit.js';
import { qualificationChapters } from '../components/qualifications.js';
import { serviceDetail } from '../components/service-detail.js';
export function healthView() { return serviceDetail(health, qualificationChapters()); }
