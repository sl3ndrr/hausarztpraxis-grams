/**
 * Vollständige Qualifikationen als thematisch gruppierte Chips.
 * Eingaben: Originalstrings und reine Darstellungsgruppen aus content/.
 * Zuordnung in qualifications.js pflegen; Wortlaut unverändert ausgeben.
 */
import { qualifications, qualificationGroups, privateProcedures } from '../../content/qualifications.js';
import { ui } from '../../content/site.js';
import { presentation } from '../../content/presentation.js';
import { h, list } from '../lib/dom.js';
export function qualificationChapters() {
  return [
    { id: 'qualifications', title: ui.qualifications, content: h('div', { className: 'qualification-groups' }, qualificationGroups.map(group =>
      h('section', {}, h('h3', {}, presentation.qualificationGroups[group.key]), h('ul', { className: 'chips' }, group.indices.map(index => h('li', {}, qualifications[index])))))) },
    { id: 'private-procedures', title: ui.privateProcedures, content: list(privateProcedures) }
  ];
}
