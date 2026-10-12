import { site, nav, footer } from './site.config.mjs';

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const fmtDate = (iso) =>
  new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export const abs = (path) => site.url + path;

const OG_IMAGE = abs('/assets/img/og_preview.png');

function jsonLd(objs) {
  return objs
    .filter(Boolean)
    .map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`)
    .join('\n');
}

export const orgLd = {
  '@type': 'Organization',
  '@id': site.url + '/#developer',
  name: site.developer.name,
  url: 'https://hycyon.com',
  address: { '@type': 'PostalAddress', addressLocality: 'Varanasi', addressRegion: 'Uttar Pradesh', addressCountry: 'IN' },
  contactPoint: { '@type': 'ContactPoint', email: site.supportEmail, contactType: 'customer support' },
};

export const websiteLd = {
  '@type': 'WebSite',
  '@id': site.url + '/#website',
  url: site.url + '/',
  name: site.name,
  description: 'Official website of eBook Pro, a reading and learning app.',
  publisher: { '@id': site.url + '/#developer' },
};

export function breadcrumbLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: abs(path),
    })),
  };
}

const logo = `<img src="/assets/img/logo-64.png" width="32" height="32" alt="" class="brand-mark">`;

export function header(path) {
  const link = ([href, label]) =>
    `<a href="${href}"${path.startsWith(href) && href !== '/' ? ' aria-current="page"' : ''}>${label}</a>`;
  return `<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <div class="wrap bar">
    <a class="brand" href="/" aria-label="eBook Pro home">${logo}<span>eBook Pro</span></a>
    <nav class="primary" id="primary-nav" aria-label="Primary">
      ${nav.map((n) => link([n.href, n.label])).join('\n      ')}
      <a class="btn btn-primary btn-sm nav-cta" href="${site.webAppUrl}" rel="noopener">Launch eBook Pro</a>
    </nav>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Menu">
      <span class="menu-icon" aria-hidden="true"></span>
    </button>
  </div>
</header>`;
}

export function footerHtml() {
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <a class="brand" href="/">${logo}<span>eBook Pro</span></a>
        <p>${site.tagline}</p>
        <p class="muted small">Support: <a href="mailto:${site.supportEmail}">${site.supportEmail}</a></p>
      </div>
      ${footer
        .map(
          (col) => `<nav aria-label="${col.title}">
        <h2 class="foot-title">${col.title}</h2>
        <ul>${col.links.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join('')}</ul>
      </nav>`
        )
        .join('\n      ')}
    </div>
    <p class="copy small muted">&copy; ${new Date().getUTCFullYear()} eBook Pro. Developed by ${site.developer.name}, ${site.developer.location}.</p>
  </div>
</footer>`;
}

/**
 * Wrap page body in the global layout.
 * opts: { path, title, description, body, ld[], noindex, bodyClass, scripts[], ogType }
 */
export function layout(opts) {
  const { path, title, description, body, ld = [], noindex = false, bodyClass = '', scripts = [], ogType = 'website' } = opts;
  const fullTitle = path === '/' ? `${site.name} — Read. Learn. Understand.` : `${title} — ${site.name}`;
  const canonical = abs(path);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">
<meta name="theme-color" content="#faf8f4" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0f1220" media="(prefers-color-scheme: dark)">
<meta property="og:site_name" content="${site.name}">
<meta property="og:type" content="${ogType}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${OG_IMAGE}">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="eBook Pro — Read. Learn. Understand.">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(fullTitle)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${OG_IMAGE}">
<meta name="twitter:image:alt" content="eBook Pro — Read. Learn. Understand.">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/img/favicon-16.png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="preload" href="/assets/fonts/Inter.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/PlayfairDisplay.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css">
${jsonLd(ld)}
</head>
<body class="${bodyClass}">
<script>document.documentElement.classList.add('js')</script>
${header(path)}
<main id="main" tabindex="-1">
${body}
</main>
${footerHtml()}
<script src="/assets/js/site.js" defer></script>
${scripts.join('\n')}
</body>
</html>
`;
}

// ---- small reusable HTML helpers used by page modules --------------------

export const status = {
  available: '<span class="badge badge-ok">Available</span>',
  partial: '<span class="badge badge-warn">Partial</span>',
  dev: '<span class="badge badge-dev">In development</span>',
  planned: '<span class="badge badge-plan">Planned</span>',
  soon: '<span class="badge badge-plan">Coming soon</span>',
  premium: '<span class="badge badge-prem">Premium</span>',
};

export const pageHead = (eyebrow, title, lead, extra = '') => `<section class="page-head">
  <div class="wrap narrow">
    ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
    <h1>${title}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
    ${extra}
  </div>
</section>`;

export const crumbs = (items) =>
  `<nav class="crumbs" aria-label="Breadcrumb"><ol>${items
    .map(([l, h], i) => (i === items.length - 1 ? `<li aria-current="page">${l}</li>` : `<li><a href="${h}">${l}</a></li>`))
    .join('')}</ol></nav>`;

export const updatedLine = (iso) => `<p class="updated">Last updated: <time datetime="${iso}">${fmtDate(iso)}</time></p>`;

export const ctaBand = (title, text, buttons) => `<section class="cta-band">
  <div class="wrap narrow center">
    <h2>${title}</h2>
    <p>${text}</p>
    <div class="btn-row">${buttons}</div>
  </div>
</section>`;
