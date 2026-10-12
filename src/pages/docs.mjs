import { site } from '../site.config.mjs';
import { esc, pageHead, crumbs, breadcrumbLd } from '../layout.mjs';
import { docCategories, allDocs } from '../content/docs.mjs';

const sidebar = (current) => `<aside class="docs-side" aria-label="Documentation">${docCategories
  .map((c) => `<h2>${esc(c.title)}</h2><ul>${c.articles.map((a) => `<li><a href="/docs/${a.slug}/"${a.slug === current ? ' aria-current="page"' : ''}>${esc(a.title)}</a></li>`).join('')}</ul>`)
  .join('')}</aside>`;

export function docsIndex() {
  const body = `${pageHead('Documentation', 'Help and documentation', 'Guides for using eBook Pro, written to match what the app actually does.')}
<section><div class="wrap">
<div class="narrow" style="margin:0 0 2.5rem;max-width:var(--narrow)">
  <label for="doc-search" class="sr-only">Search documentation</label>
  <input id="doc-search" class="search" type="search" placeholder="Search the docs…" autocomplete="off">
  <p id="doc-search-state" class="small muted" role="status" aria-live="polite" style="margin:.5rem 0 0"></p>
  <ul id="doc-results" class="search-results"></ul>
</div>
<div class="doc-cats">${docCategories
  .map((c) => `<div class="card"><h2 style="font-size:1.15rem;font-family:var(--sans)">${esc(c.title)}</h2><ul>${c.articles.map((a) => `<li><a href="/docs/${a.slug}/">${esc(a.title)}</a></li>`).join('')}</ul></div>`)
  .join('')}</div>
<p style="margin-top:2rem">Can’t find it? <a href="/faq/">FAQ</a> or <a href="/support/">contact support</a>.</p>
</div></section>`;
  return { path: '/docs/', title: 'Documentation', description: 'eBook Pro help: getting started, reading, AI, account, Premium and troubleshooting.', body };
}

export function docPages() {
  return allDocs.map((a, i) => {
    const prev = allDocs[i - 1], next = allDocs[i + 1];
    const path = `/docs/${a.slug}/`;
    const trail = [['Docs', '/docs/'], [a.category, '/docs/'], [a.title, path]];
    const body = `<section style="padding-top:2rem"><div class="wrap"><div class="docs-layout">${sidebar(a.slug)}
<article class="prose"><nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="/docs/">Docs</a></li><li>${esc(a.category)}</li><li aria-current="page">${esc(a.title)}</li></ol></nav>
<h1 style="font-size:clamp(1.8rem,4vw,2.6rem)">${esc(a.title)}</h1>${a.body}
<div class="pn">${prev ? `<a href="/docs/${prev.slug}/" rel="prev"><small>Previous</small>${esc(prev.title)}</a>` : '<span></span>'}${next ? `<a href="/docs/${next.slug}/" rel="next" style="text-align:right"><small>Next</small>${esc(next.title)}</a>` : ''}</div>
<p class="small muted" style="margin-top:2rem">Something wrong or missing? <a href="mailto:${site.supportEmail}?subject=${encodeURIComponent('Docs: ' + a.title)}">Tell us</a>.</p>
</article></div></div></section>`;
    return { path, title: a.title, description: `${a.summary} eBook Pro help and documentation: ${a.category}.`, body, ld: [breadcrumbLd([['Home', '/'], ...trail])] };
  });
}

export const searchIndex = () =>
  allDocs.map((a) => ({ title: a.title, category: a.category, url: `/docs/${a.slug}/`, text: (a.summary + ' ' + a.body.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ') }));
