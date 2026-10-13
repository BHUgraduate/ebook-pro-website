// Zero-dependency static site generator. Reads src/, writes the deployable site into the repo root
// (GitHub Pages serves the root of `main`). Run: npm run build
import { mkdirSync, writeFileSync, rmSync, cpSync, existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from './src/site.config.mjs';
import { layout, abs } from './src/layout.mjs';
import * as P from './src/pages/product.mjs';
import { docsIndex, docPages, searchIndex } from './src/pages/docs.mjs';
import * as L from './src/pages/legal.mjs';
import { privacySections } from './src/content/privacy.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const out = (p, data) => { const f = join(root, p); mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, data); };

const pages = [
  P.home(), P.features(), P.formatsPage(), P.ai(), P.premiumPage(), P.download(), P.webApp(), P.about(), P.faqPage(),
  P.roadmapPage(), P.changelogPage(), P.support(),
  docsIndex(), ...docPages(),
  L.privacy(), L.terms(), L.refund(), L.security(), L.deleteAccount(), L.legalHub(),
  P.notFound(),
];

// Remove previously generated output so deleted pages don't linger.
const generatedDirs = new Set(['assets', ...pages.map((p) => p.path.split('/')[1]).filter((s) => s && !s.includes('.'))]);
for (const d of generatedDirs) rmSync(join(root, d), { recursive: true, force: true });

for (const p of pages) {
  const file = p.file || (p.path === '/' ? 'index.html' : p.path.slice(1) + 'index.html');
  out(file, layout(p));
}

// Static assets
cpSync(join(root, 'src/assets'), join(root, 'assets'), { recursive: true });
if (existsSync(join(root, 'src/assets/screenshots/.gitkeep'))) rmSync(join(root, 'assets/screenshots/.gitkeep'));
cpSync(join(root, 'src/assets/img/favicon.ico'), join(root, 'favicon.ico'));
out('docs/search-index.json', JSON.stringify(searchIndex()));

// The privacy policy as data. The app bundles a copy (assets/legal/privacy_policy.json) so its in-app
// policy screen is the same text as /privacy/. After changing the policy: build, then copy this file.
out('privacy-policy.json', JSON.stringify({
  title: 'Privacy Policy',
  updated: site.updated.privacy,
  url: `${site.url}/privacy/`,
  contact: site.supportEmail,
  sections: privacySections,
}, null, 1));

// manifest
out('manifest.webmanifest', JSON.stringify({
  name: 'eBook Pro', short_name: 'eBook Pro', description: 'Read. Learn. Understand.',
  start_url: '/', scope: '/', display: 'browser', background_color: '#faf8f4', theme_color: '#faf8f4',
  icons: [
    { src: '/assets/img/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/assets/img/icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: '/assets/img/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
}, null, 2));

// sitemap: every indexable page, with real lastmod where we have one
const lastmod = { '/privacy/': site.updated.privacy, '/terms/': site.updated.terms, '/refund-policy/': site.updated.refund, '/security/': site.updated.security, '/delete-account/': site.updated.deletion };
const today = site.updated.site;
const urls = pages.filter((p) => !p.noindex).map((p) => `  <url><loc>${abs(p.path)}</loc><lastmod>${lastmod[p.path] || today}</lastmod></url>`);
out('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
out('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
out('.nojekyll', '');

console.log(`Built ${pages.length} pages.`);
