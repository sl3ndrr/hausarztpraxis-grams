/**
 * Sportmedizinansicht ohne zusätzliche medizinische Behauptungen.
 * Eingaben: sports und gemeinsamer Detailaufbau.
 * Leistungen in content/services/sportmedizin.js ändern.
 */
import { sports } from '../../content/services/sportmedizin.js';
import { serviceDetail } from '../components/service-detail.js';
export function sportsView() { return serviceDetail(sports); }
