/**
 * Vorsorgeansicht aus zentralen Leistungsdaten.
 * Eingaben: prevention und gemeinsamer Detailaufbau.
 * Leistungen in content/services/vorsorge.js ändern.
 */
import { prevention } from '../../content/services/vorsorge.js';
import { serviceDetail } from '../components/service-detail.js';
export function preventionView() { return serviceDetail(prevention); }
