import { site, nav, footer } from './site.config.mjs';

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const fmtDate = (iso) =>
  new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export const abs = (path) => site.url + path;

const OG_IMAGE = abs('/assets/img/og_preview.png');

/* First-visit "get the app" card. An inert <template>: it renders nothing and changes no layout.
   site.js turns it into a modal <dialog> on each refresh or arrival from outside the site, never without JS. */
const appPromo = () => {
  const url = site.android.playStoreUrl;
  if (!url) return '';
  return `<template id="app-promo-tpl">
<dialog class="promo" aria-labelledby="promo-title" aria-describedby="promo-text">
  <div class="promo-card">
    <button type="button" class="promo-close" data-promo-close aria-label="Close">
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
    </button>
    <div class="promo-art" aria-hidden="true">
      <span class="promo-page p1"></span><span class="promo-page p2"></span>
      <img src="/assets/img/logo-128.png" width="88" height="88" alt="" class="promo-icon">
      <span class="promo-spark s1">✦</span><span class="promo-spark s2">✦</span><span class="promo-spark s3">✦</span>
    </div>
    <div class="promo-body">
      <p class="promo-eyebrow">New · Now on Google Play</p>
      <p class="promo-title" id="promo-title">Your library, now in your pocket.</p>
      <p class="promo-text" id="promo-text">Get the free eBook Pro app for Android: read PDFs and EPUBs, highlight, translate and scan pages on your device, and keep learning wherever you are.</p>
      <!-- Play Store button slot: can be swapped for Google's official "Get it on Google Play" badge image. -->
      <a class="promo-badge" href="${esc(url)}" rel="noopener" data-promo-go>
        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path fill="#00d7fe" d="M3.6 1.8 13.8 12 3.6 22.2c-.4-.2-.6-.6-.6-1.1V2.9c0-.5.2-.9.6-1.1z"/><path fill="#ffce00" d="m17.2 8.6-3.4 3.4 3.4 3.4 3.8-2.2c.9-.5.9-1.8 0-2.4z"/><path fill="#00f076" d="M3.6 1.8c.3-.2.8-.2 1.2 0l12.4 6.8-3.4 3.4z"/><path fill="#f63448" d="M13.8 12l3.4 3.4-12.4 6.8c-.4.2-.9.2-1.2 0z"/></svg>
        <span><small>GET IT ON</small>Google Play</span>
      </a>
      <p class="promo-meta">Free · Android · Not on the App Store yet</p>
      <button type="button" class="promo-skip" data-promo-close>Skip to website</button>
    </div>
  </div>
</dialog>
</template>`;
};

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
  alternateName: ['eBook Pro app', 'eBook Pro reader', 'ebookpro'],
  description: 'Official website of eBook Pro, a free ebook reader and learning app for PDF, EPUB and TXT books.',
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
  const fullTitle = path === '/' ? `${site.name}: Free Ebook Reader for PDF, EPUB and TXT Books` : `${title} — ${site.name}`;
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
${appPromo()}
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
