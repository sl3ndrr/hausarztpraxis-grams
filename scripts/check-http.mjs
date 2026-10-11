/**
 * HTTP-Smoke-Test für alle lokalen Website-Ressourcen und sichere Fehlerpfade.
 * Eingaben: Repository-Dateien und vorhandener Server auf zufälligem lokalen Port.
 * Keine Pakete oder externen Anfragen; Kindprozess stets beenden.
 */
import { spawn } from 'node:child_process';
import { readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
const root = fileURLToPath(new URL('../', import.meta.url));
async function walk(directory = '') {
  const entries = await readdir(root + directory, { withFileTypes: true });
  return (await Promise.all(entries.filter(entry => !entry.name.startsWith('.')).map(async entry => entry.isDirectory() ? walk(directory + entry.name + '/') : directory + entry.name))).flat();
}
const server = spawn(process.execPath, [root + 'scripts/serve.mjs'], { cwd: root, env: { ...process.env, PORT: '0' }, stdio: ['ignore', 'pipe', 'pipe'] });
try {
  const port = await new Promise((resolve, reject) => {
    server.stdout.once('data', data => resolve(Number(String(data).match(/:(\d+)/)?.[1])));
    server.once('error', reject); server.once('exit', code => reject(new Error(`Serverende: ${code}`)));
  });
  assert.ok(port > 0); const base = `http://127.0.0.1:${port}`;
  const files = (await walk()).filter(path => /\.(?:html|css|js)$/.test(path));
  await Promise.all(files.map(async path => {
    const response = await fetch(`${base}/${path}`); const mime = response.headers.get('content-type');
    assert.equal(response.status, 200, path);
    assert.ok(mime.startsWith(path.endsWith('.css') ? 'text/css' : path.endsWith('.js') ? 'text/javascript' : 'text/html'), path);
    await response.arrayBuffer();
  }));
  assert.equal((await fetch(`${base}/not-found`)).status, 404);
  assert.equal((await fetch(`${base}/..%2F..%2FREADME.md`)).status, 403);
  console.log(`HTTP-Prüfung bestanden: ${files.length} Ressourcen mit Status 200 und passenden MIME-Typen; 404/403 korrekt.`);
} finally { server.kill(); }
