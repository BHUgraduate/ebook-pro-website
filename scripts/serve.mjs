// Tiny local preview server: node scripts/serve.mjs [port]
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json' };
createServer(async (req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  try { const f = join(root, p); if (!f.startsWith(root)) throw 0; res.writeHead(200, { 'Content-Type': types[extname(f)] || 'application/octet-stream' }); res.end(await readFile(f)); }
  catch { res.writeHead(404, { 'Content-Type': 'text/html' }); res.end(await readFile(join(root, '404.html'))); }
}).listen(+process.argv[2] || 8080, () => console.log('http://localhost:' + (+process.argv[2] || 8080)));
