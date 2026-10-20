// Static QA: run after `npm run build`. Exits non-zero on any problem.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const skip = new Set(['src', 'scripts', 'node_modules', '.git']);
const htmlFiles = [];
(function walk(d) { for (const n of readdirSync(d)) { if (skip.has(n)) continue; const p = join(d, n); statSync(p).isDirectory() ? walk(p) : n.endsWith('.html') && htmlFiles.push(p); } })(root);

const problems = [];
const titles = new Map(), descs = new Map();
const base = 'https://ebookpro.hycyon.com';
const exists = (urlPath) => {
  const clean = decodeURIComponent(urlPath.split('#')[0].split('?')[0]);
  const f = join(root, clean);
  if (clean.endsWith('/')) return existsSync(join(f, 'index.html'));
  return existsSync(f) || existsSync(f + '.html') || existsSync(join(f, 'index.html'));
};
const secretRe = /(AIza[0-9A-Za-z_-]{35}|rzp_(live|test)_\w+|-----BEGIN|sk_live|app.?password|webhook.?secret)/;

for (const f of htmlFiles) {
  const rel = relative(root, f).split('\\').join('/');
  const h = readFileSync(f, 'utf8');
  const bad = (m) => problems.push(`${rel}: ${m}`);
  const title = (h.match(/<title>(.*?)<\/title>/s) || [])[1];
  const desc = (h.match(/<meta name="description" content="(.*?)">/s) || [])[1];
  const canon = (h.match(/<link rel="canonical" href="(.*?)">/) || [])[1];
  if (!title) bad('missing title'); else { if (titles.has(title)) bad(`duplicate title with ${titles.get(title)}`); titles.set(title, rel); }
  if (!desc) bad('missing description'); else { if (desc.length < 50 || desc.length > 200) bad(`description length ${desc.length}`); if (descs.has(desc)) bad(`duplicate description with ${descs.get(desc)}`); descs.set(desc, rel); }
  if (!canon || !canon.startsWith(base)) bad('bad canonical');
  for (const k of ['og:title', 'og:description', 'og:image', 'og:url', 'twitter:card', 'twitter:image']) if (!h.includes(k)) bad('missing ' + k);
  const h1 = (h.match(/<h1[ >]/g) || []).length; if (h1 !== 1) bad(`h1 count ${h1}`);
  if (!/<html lang="en">/.test(h)) bad('missing lang');
  // heading order: no jump of more than one level
  let last = 0; for (const m of h.matchAll(/<h([1-6])[ >]/g)) { const n = +m[1]; if (last && n > last + 1) { bad(`heading jump h${last}->h${n}`); break; } last = n; }
  // json-ld validity
  for (const m of h.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) { try { JSON.parse(m[1]); } catch { bad('invalid JSON-LD'); } }
  // links & assets
  for (const m of h.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const u = m[1];
    if (/^(mailto:|tel:|#|data:)/.test(u)) { continue; }
    if (u.startsWith('http')) { if (u.startsWith(base)) { if (!exists(u.slice(base.length) || '/')) bad(`broken absolute ${u}`); } else if (!/^https:\/\/(ebookpro\.web\.app|hycyon\.com|www\.gstatic\.com|play\.google\.com)/.test(u)) bad(`unexpected external ${u}`); continue; }
    if (u.startsWith('/')) { if (!exists(u)) bad(`broken link ${u}`); } else bad(`relative url ${u}`);
  }
  // in-page anchors
  for (const m of h.matchAll(/href="#([^"]+)"/g)) if (!h.includes(`id="${m[1]}"`)) bad(`missing anchor #${m[1]}`);
  for (const m of h.matchAll(/href="(\/[^"#]*)#([^"]+)"/g)) { const t = join(root, m[1], 'index.html'); if (existsSync(t) && !readFileSync(t, 'utf8').includes(`id="${m[2]}"`)) bad(`missing anchor ${m[1]}#${m[2]}`); }
  for (const m of h.matchAll(/<img\b[^>]*>/g)) if (!/ alt=/.test(m[0])) bad('img without alt');
  if (secretRe.test(h) && !rel.startsWith('delete-account')) bad('possible secret'); 
  if (/\b(TODO|lorem|undefined|\[object)/i.test(h)) bad('placeholder text');
  for (const bannedPhrase of ['Millions of', 'military-grade', '100% secure', 'Zero data', 'Most advanced', 'Best reading']) if (h.includes(bannedPhrase)) bad('overclaim: ' + bannedPhrase);
}
// sitemap/robots
const sm = readFileSync(join(root, 'sitemap.xml'), 'utf8');
for (const m of sm.matchAll(/<loc>(.*?)<\/loc>/g)) if (!exists(m[1].slice(base.length))) problems.push('sitemap broken ' + m[1]);
if (/404/.test(sm)) problems.push('sitemap includes 404');
const rb = readFileSync(join(root, 'robots.txt'), 'utf8'); if (/Disallow:\s*\//.test(rb)) problems.push('robots blocks site');
for (const p of ['/privacy/', '/terms/', '/delete-account/', '/support/', '/faq/', '/features/']) if (!sm.includes(base + p)) problems.push('sitemap missing ' + p);
// Trust evidence: every entry must be verifiable (source + date) and must not look like a placeholder.
const { metrics, reviews, stories } = await import('../src/content/trust.mjs');
for (const [kind, list] of [['metric', metrics], ['review', reviews], ['story', stories]]) {
  list.forEach((e, i) => {
    const w = `trust ${kind} #${i + 1}`;
    if (!/^https:\/\//.test(e.source || '')) problems.push(`${w}: needs an https \`source\` a reader can verify`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(e.date || '')) problems.push(`${w}: needs an ISO \`date\``);
    if (/lorem|placeholder|todo|tbd|xx+|\.\.\./i.test(JSON.stringify(e))) problems.push(`${w}: looks like placeholder text`);
  });
}
console.log(`${htmlFiles.length} HTML files checked.`);
if (problems.length) { console.error(problems.join('\n')); process.exit(1); } else console.log('All checks passed.');
