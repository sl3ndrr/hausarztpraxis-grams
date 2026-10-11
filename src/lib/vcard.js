/**
 * Reine lokale vCard-3.0-Erzeugung aus zentralen Kontaktdaten.
 * Eingaben: Praxisobjekt; keine Netzwerkaufrufe oder zusätzlichen Fakten.
 * Escaping und UTF-8-Zeilenfaltung mit Tests absichern.
 */
export function escapeVCard(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/\r\n|\r|\n/g, '\\n').replace(/;/g, '\\;').replace(/,/g, '\\,');
}
export function foldVCardLine(line) {
  const encoder = new TextEncoder(); let result = ''; let bytes = 0;
  for (const character of line) {
    const size = encoder.encode(character).length;
    if (bytes + size > 75) { result += '\r\n '; bytes = 1; }
    result += character; bytes += size;
  }
  return result;
}
export function createVCard(practice) {
  const escape = escapeVCard; const address = practice.address;
  const lines = ['BEGIN:VCARD', 'VERSION:3.0', `FN:${escape(practice.name)}`, `N:;${escape(practice.name)};;;`, `ORG:${escape(practice.name)}`,
    `TEL;TYPE=WORK,VOICE:${escape(practice.phone.href.replace(/^tel:/, ''))}`, `TEL;TYPE=WORK,FAX:${escape(practice.fax)}`,
    `EMAIL;TYPE=WORK:${escape(practice.email)}`, `ADR;TYPE=WORK:;;${escape(address.street)};${escape(address.city)};;${escape(address.postalCode)};`, 'END:VCARD'];
  return lines.map(foldVCardLine).join('\r\n') + '\r\n';
}
