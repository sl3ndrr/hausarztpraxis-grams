/**
 * Reiner Suchindex und Filter über vorhandene Leistungen und Qualifikationen.
 * Eingaben: Content-Quellen, Listen und Suchtext; keine externe Kommunikation.
 * Alle Suchwörter müssen passen; Sonderzeichen und leere Suche testen.
 */
export function normalizeSearch(value) {
  return String(value).toLocaleLowerCase('de-DE').normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/ß/g, 'ss');
}
export function serviceIndex(sources, qualifications, privateProcedures) {
  const sections = sources.flatMap(source => source.data.sections.map(section => ({
    title: section.title, category: source.label, accent: source.data.accent, href: `${source.href}?section=${section.id}`,
    searchText: normalizeSearch([source.label, section.title, section.text, ...(section.items ?? []), ...(section.steps ?? []).flatMap(step => [step.title, step.text])].join(' '))
  })));
  const health = sources[0];
  const additional = [
    ...qualifications.map(title => ({ title, id: 'qualifications' })),
    ...privateProcedures.map(title => ({ title, id: 'private-procedures' }))
  ].map(entry => ({ title: entry.title, category: health.label, accent: health.data.accent, href: `${health.href}?section=${entry.id}`, searchText: normalizeSearch(`${health.label} ${entry.title}`) }));
  return [...sections, ...additional];
}
export function filterServices(index, query) {
  const terms = normalizeSearch(query).trim().split(/\s+/).filter(Boolean);
  return index.filter(entry => terms.every(term => entry.searchText.includes(term)));
}
