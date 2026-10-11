/**
 * Reine Aufteilung einer Hash-Route und eines optionalen Deep-Ankers.
 * Eingaben: Hash mit section-Parameter; kein DOM oder globaler Zustand.
 * Hash-Routing beibehalten; neue Parameter hier und in Tests ergänzen.
 */
export function routeLocation(hash) {
  const [path, query = ''] = (hash.replace(/^#/, '') || '/').split('?');
  const section = new URLSearchParams(query).get('section');
  return { path, section: section && /^[a-z][a-z0-9-]*$/.test(section) ? section : null };
}
