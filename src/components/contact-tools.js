/**
 * Lokaler Kontaktkomfort: Adresse kopieren, vCard laden und Praxiskarte drucken.
 * Eingaben: practice.js und reiner vCard-Generator; keine externen Dienste.
 * Download-URL beim Entfernen freigeben, Zwischenablagefehler sichtbar melden.
 */
import { practice } from '../../content/practice.js';
import { presentation } from '../../content/presentation.js';
import { h } from '../lib/dom.js';
import { createVCard } from '../lib/vcard.js';
export function contactTools() {
  const feedback = h('p', { role: 'status', 'aria-live': 'polite', className: 'small' });
  const address = `${practice.address.street}
${practice.address.postalCode} ${practice.address.city}`;
  const copy = h('button', { type: 'button', className: 'button button--quiet', onclick: async () => {
    try { await navigator.clipboard.writeText(address); feedback.textContent = presentation.copied; }
    catch { feedback.textContent = presentation.copyFailed; }
  } }, presentation.copyAddress);
  const url = URL.createObjectURL(new Blob([createVCard(practice)], { type: 'text/vcard;charset=utf-8' }));
  const download = h('a', { href: url, download: presentation.contactFilename, className: 'button button--quiet' }, presentation.saveContact);
  const print = h('button', { type: 'button', className: 'button button--quiet', onclick: () => window.print() }, presentation.printCard);
  return { element: h('div', { className: 'contact-tools' }, h('div', { className: 'button-row' }, copy, download, print), feedback), destroy: () => URL.revokeObjectURL(url) };
}
