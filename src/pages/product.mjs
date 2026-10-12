import { site, premium } from '../site.config.mjs';
import { esc, pageHead, status, ctaBand, updatedLine, websiteLd, orgLd, abs, fmtDate, crumbs } from '../layout.mjs';
import { featureGroups, homeHighlights } from '../content/features.mjs';
import { formats, formatCols, unsupported } from '../content/formats.mjs';
import { faq } from '../content/faq.mjs';
import { roadmap, roadmapGroups } from '../content/roadmap.mjs';
import { changelog, changelogNote } from '../content/changelog.mjs';
import { screenshots } from '../content/screenshots.mjs';

const launchBtn = (cls = 'btn-primary') => `<a class="btn ${cls}" href="${site.webAppUrl}" rel="noopener">Launch web app</a>`;
const androidBtn = (cls = 'btn-secondary') =>
  site.android.playStoreUrl
    ? `<a class="btn ${cls}" href="${site.android.playStoreUrl}" rel="noopener">Get it on Google Play</a>`
    : `<a class="btn ${cls}" href="/download/">Get the Android app</a>`;

const softwareLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: site.name,
  description: 'A reading and learning app for PDF, EPUB and text books.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Android, Web',
  url: site.url + '/',
  installUrl: site.android.playStoreUrl || undefined,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR', description: 'Free to use. Optional Premium purchase.' },
  publisher: { '@id': site.url + '/#developer' },
};

const featureItem = (f) => `<li><span class="t"><strong>${esc(f.name)}</strong>${f.premium ? ' ' + status.premium : ''}<small>${esc(f.text)}</small></span>${status[f.status] || ''}</li>`;

/* ------------------------------------------------------------------ HOME */
export function home() {
  const body = `
<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <p class="eyebrow">Reading + learning</p>
      <h1>Read. Learn. Understand.</h1>
      <p class="lead">eBook Pro is a reading app for your PDF, EPUB and text books, with the tools to look up, translate, listen, highlight and remember what you read.</p>
      <div class="btn-row">${launchBtn()}${androidBtn()}</div>
      <div class="platforms" aria-label="Platform availability">
        <span class="chip">Web <strong>available</strong></span>
        <span class="chip">Android <strong>${site.android.playStoreUrl ? 'available' : 'coming to Google Play'}</strong></span>
        <span class="chip">iPhone &amp; iPad <strong>not yet</strong></span>
      </div>
    </div>
    <div>
      <div class="page-art" aria-hidden="true">
        <div class="ch">Chapter one</div>
        <p>It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a <mark>wife</mark>.</p>
        <p>However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families.</p>
        <div class="tip">Tap a word to look it up, translate it or listen.</div>
      </div>
      <p class="art-note">Illustration, not a screenshot. Text from <em>Pride and Prejudice</em> (public domain).</p>
    </div>
  </div>
</section>

<section class="alt reveal">
  <div class="wrap">
    <div class="section-head"><h2>A reader for the books you already have</h2>
    <p class="lead">Import PDF, EPUB and TXT files and read them in one consistent place. Your imported books stay on your device.</p></div>
    <div class="grid g4">${homeHighlights.map((h) => `<div class="card"><h3>${esc(h.title)}</h3><p>${esc(h.text)}</p></div>`).join('')}</div>
    <p style="margin-top:1.5rem"><a href="/features/">See all features →</a></p>
  </div>
</section>

<section class="reveal">
  <div class="wrap grid g2" style="align-items:start;gap:3rem">
    <div>
      <p class="eyebrow">Reading experience</p>
      <h2>Made for long-form reading</h2>
      <p>Page-curl or slide page turning, three colour themes and adjustable typography. PDFs keep their original layout with zoom and search; EPUB and TXT re-flow to fit your screen. A focus timer and daily streak help you keep going.</p>
      <p><a href="/formats/">See supported formats →</a></p>
    </div>
    <div>
      <p class="eyebrow">AI-powered learning</p>
      <h2>Understand what you read</h2>
      <p>Long-press a word for a definition, a Wikipedia summary, an on-device translation or to hear it read aloud. Premium readers can also ask Google’s Gemini to explain a passage in context. Today that is the only AI feature, and it is limited to ${premium.aiDailyLimit} requests a day.</p>
      <p><a href="/ai/">How the AI works →</a></p>
    </div>
  </div>
</section>

<section class="alt reveal">
  <div class="wrap grid g2" style="align-items:start;gap:3rem">
    <div>
      <p class="eyebrow">Personal library</p>
      <h2>Your library, on your device</h2>
      <p>Imported books, reading progress, highlights, flashcards and streaks are stored on the device or browser you use. An optional account adds a store where you can download books and leave reviews.</p>
    </div>
    <div>
      <p class="eyebrow">Cross-device</p>
      <h2>Honest about sync</h2>
      <p>Your account and store library are stored online, but imported books and reading data do <strong>not</strong> sync between devices yet. We list it on the <a href="/roadmap/">roadmap</a> as something we are exploring, not as a feature you have today.</p>
    </div>
  </div>
</section>

<section class="reveal">
  <div class="wrap">
    <div class="section-head"><h2>Supported formats</h2><p class="lead">PDF, EPUB (2 and 3) and TXT.</p></div>
    <div class="grid g3">
      ${formats.map((f) => `<div class="card"><h3>${esc(f.name)}</h3><p>${esc(f.summary)}</p></div>`).join('')}
    </div>
    <p style="margin-top:1.5rem"><a href="/formats/">Capabilities and limitations →</a></p>
  </div>
</section>

<section class="alt reveal">
  <div class="wrap">
    <div class="section-head"><h2>Free and Premium</h2></div>
    <div class="grid g2">
      <div class="card"><h3>Free</h3><ul><li>Import and read PDF, EPUB and TXT</li><li>Highlights, flashcards, focus mode, streaks</li><li>On-device translation and listen mode</li><li>Browse the store; free store downloads with an account</li></ul></div>
      <div class="card"><h3>Premium — ${premium.priceDisplay}</h3><ul><li>AI explanations (up to ${premium.aiDailyLimit} per day)</li><li>Premium store books and newspapers</li><li>Paid once through ${premium.provider}; no automatic renewal today</li></ul><p><a href="/premium/">Premium details →</a></p></div>
    </div>
  </div>
</section>

<section class="reveal">
  <div class="wrap narrow">
    <div class="section-head"><h2>Screenshots</h2></div>
    ${screenshots.length
      ? `<div class="shots">${screenshots.map((s) => `<figure><img src="/assets/screenshots/${s.file}" alt="${esc(s.alt)}" width="${s.width}" height="${s.height}" loading="lazy" decoding="async"><figcaption>${esc(s.caption)}</figcaption></figure>`).join('')}</div>`
      : `<div class="empty"><p><strong>Screenshots are coming soon.</strong></p><p class="small">We only show real screenshots of the released app. Until they are added, see the <a href="/docs/">documentation</a> for how each feature works.</p></div>`}
  </div>
</section>

<section class="alt reveal">
  <div class="wrap narrow">
    <div class="section-head"><h2>Latest update</h2></div>
    <div class="card"><h3>${esc(changelog[0].version)} <span class="muted small">· ${fmtDate(changelog[0].date)}</span></h3><p>${esc(changelog[0].added[0])}</p><p><a href="/changelog/">Read the changelog →</a></p></div>
  </div>
</section>

<section class="reveal">
  <div class="wrap narrow">
    <div class="section-head"><h2>Common questions</h2></div>
    ${faq.slice(0, 5).map(faqItem).join('')}
    <p><a href="/faq/">All questions →</a></p>
  </div>
</section>

${ctaBand('Start reading', 'Open the web app in your browser, or get the Android app.', `${launchBtn()}${androidBtn()}`)}`;
  return {
    path: '/',
    title: site.name,
    description: 'eBook Pro is a reading and learning app for PDF, EPUB and text books, with highlights, flashcards, translation, listen mode and AI explanations.',
    body,
    ld: [{ '@context': 'https://schema.org', '@graph': [websiteLd, orgLd] }, softwareLd],
  };
}

const faqItem = (f) => `<details class="faq"><summary>${esc(f.q)}</summary><div class="a">${f.a}</div></details>`;

/* -------------------------------------------------------------- FEATURES */
export function features() {
  const body = `${pageHead('Features', 'What eBook Pro can do today', 'Each feature is labelled with its real status. Anything not released is marked Planned and also appears on the <a href="/roadmap/">roadmap</a>.')}
<section><div class="wrap narrow">
${featureGroups
  .map(
    (g) => `<div id="${g.id}" class="reveal" style="margin-bottom:3rem"><h2>${esc(g.title)}</h2><p class="muted">${esc(g.intro)}</p><ul class="feature-list">${g.items.map(featureItem).join('')}</ul></div>`
  )
  .join('')}
<div class="note"><strong>AI</strong><p>AI explanations are the only AI feature released today. Everything else listed under Learning, including translation, OCR and listen mode, runs on your device. See <a href="/ai/">AI</a>.</p></div>
</div></section>
${ctaBand('Try it', 'Open the web app or get the Android app.', `${launchBtn()}${androidBtn()}`)}`;
  return { path: '/features/', title: 'Features', description: 'Everything eBook Pro does today: PDF, EPUB and TXT reading, highlights, flashcards, translation, listen mode, AI explanations, focus mode and streaks.', body, ld: [softwareLd] };
}

/* --------------------------------------------------------------- FORMATS */
const mark = { yes: '✔ Yes', partial: '◐ Partial', no: '— No' };
export function formatsPage() {
  const body = `${pageHead('Formats', 'Supported formats', 'eBook Pro opens PDF, EPUB (2 and 3) and TXT files. This page states exactly what works for each, including limitations.')}
<section><div class="wrap narrow">
${formats
  .map(
    (f) => `<div class="reveal" style="margin-bottom:2.5rem"><h2>${esc(f.name)}</h2><p>${esc(f.summary)}</p>
<div class="table-wrap"><table><caption class="sr-only">${esc(f.name)} capabilities</caption><thead><tr><th scope="col">Capability</th><th scope="col">Support</th><th scope="col">Notes</th></tr></thead><tbody>
${formatCols.map((c) => `<tr><th scope="row">${esc(c)}</th><td>${mark[f.rows[c][0]]}</td><td>${esc(f.rows[c][1])}</td></tr>`).join('')}
</tbody></table></div></div>`
  )
  .join('')}
<h2>Not supported</h2><ul>${unsupported.map((u) => `<li>${esc(u)}</li>`).join('')}</ul>
<div class="note"><strong>OCR</strong><p>OCR is used to search scanned PDF pages. It runs on your device (Google ML Kit, Latin script) on Android and iOS, and is not available in the web app.</p></div>
</div></section>`;
  return { path: '/formats/', title: 'Supported formats', description: 'PDF, EPUB 2/3 and TXT support in eBook Pro: import, reading, search, text extraction, images, layout, navigation, zoom and annotations, with limitations.', body };
}

/* -------------------------------------------------------------------- AI */
export function ai() {
  const body = `${pageHead('AI', 'How AI works in eBook Pro', 'One AI feature is released today. This page explains what it does, who can use it, and where your text goes.')}
<section><div class="wrap narrow prose">
<h2>Available now</h2>
<div class="card" style="margin-bottom:1rem"><h3>AI explanations ${status.premium}</h3><p>Select a passage and ask for an explanation. eBook Pro sends the selected text and its surrounding paragraph to a Google Cloud function that we run. That function verifies your account and Premium status, applies your daily limit, and asks a Google Gemini model to explain the passage concisely in the language you choose. The answer streams back to the app.</p></div>
<h2>Runs on your device (not AI requests to us)</h2>
<ul><li><strong>Translation</strong>: Google ML Kit, on-device. Models download on demand.</li><li><strong>OCR</strong>: Google ML Kit, on-device (Android, iOS).</li><li><strong>Listen (read aloud)</strong>: your device’s text-to-speech voices.</li><li><strong>Dictionary</strong>: a small bundled dictionary; Wikipedia lookups call Wikipedia.</li></ul>
<h2>Limits</h2>
<div class="table-wrap"><table><thead><tr><th scope="col">Plan</th><th scope="col">AI explanations</th></tr></thead><tbody>
<tr><td>Signed out</td><td>Not available</td></tr>
<tr><td>Free account</td><td>Not available (Premium required)</td></tr>
<tr><td>Premium</td><td>Up to ${premium.aiDailyLimit} per day, reset at midnight UTC</td></tr></tbody></table></div>
<h2>How requests are handled</h2>
<ul>
<li>Sent over HTTPS with your sign-in token, which our server verifies.</li>
<li>The text is forwarded to Google’s Gemini API, using a key that is stored on our server and never shipped in the app.</li>
<li>A shared cache stores answers keyed by a one-way hash of the text, context and language, so identical requests can be answered without calling Gemini again. The cache stores the answer, not your account ID.</li>
<li>Your account stores only a per-day counter of AI requests, for the limit.</li>
<li>Google processes the text under its own terms for the Gemini API. See Google’s documentation for how Google handles API data.</li>
</ul>
<h2>What not to submit</h2>
<p>Do not select passages that contain passwords, financial or health details, government IDs, or other sensitive personal information, and avoid material you are not allowed to share. AI answers can be wrong; verify anything important.</p>
<h2>Coming soon / planned</h2>
<ul><li>${status.planned} AI-written flashcards (today’s flashcards are made without AI).</li></ul>
<p>We will not describe anything here as available until it ships. See the <a href="/roadmap/">roadmap</a> and <a href="/privacy/">Privacy Policy</a>.</p>
</div></section>`;
  return { path: '/ai/', title: 'AI', description: 'What AI does in eBook Pro today: Premium AI explanations through Google Gemini, with a 20-per-day limit, and which features run on your device instead.', body };
}

/* --------------------------------------------------------------- PREMIUM */
export function premiumPage() {
  const body = `${pageHead('Premium', 'eBook Pro Premium', `Premium costs ${premium.priceDisplay}. This page describes how it works today.`)}
<section><div class="wrap">
<div class="grid g2" style="max-width:860px;margin:0 auto 2.5rem">
  <div class="card"><h2>Free</h2><p><strong>₹0</strong></p><ul>
  <li>Import and read PDF, EPUB, TXT</li><li>Highlights, pen annotations, flashcards</li><li>On-device translation, OCR, listen mode</li><li>Dictionary and Wikipedia lookups</li><li>Focus mode, streaks, statistics</li><li>Browse the store; free store downloads with an account</li></ul></div>
  <div class="card" style="border-color:var(--accent)"><h2>Premium ${status.premium}</h2><p><strong>${premium.priceDisplay}</strong> · paid through ${premium.provider}</p><ul>
  <li>AI explanations, up to ${premium.aiDailyLimit} per day</li><li>Access to books and newspapers in the store that are marked premium</li></ul></div>
</div>
<div class="prose" style="margin:0 auto">
<h2>Billing</h2>
<p>Premium is bought inside the app on the Upgrade screen. Payment is handled by ${premium.provider} and supports UPI, cards, net banking and wallets. We never see or store your card or UPI details. The app passes your email and phone number to the checkout only to pre-fill it.</p>
<h2>Renewal and cancellation</h2>
<p>The app currently takes a single ${premium.priceDisplay} payment and then activates Premium on your account. It does <strong>not</strong> set up automatic renewals, so there is nothing to cancel and you are not charged again automatically. If we introduce recurring billing or an expiry, we will say so clearly before you pay and update this page and the <a href="/refund-policy/">Refund &amp; cancellation policy</a>.</p>
<div class="note warn"><strong>About the wording in the app</strong><p>The Upgrade screen labels Premium as “monthly”. The payment system behind it is currently a one-time payment with no renewal logic. We are aligning the app and the payment system; until then, this page describes the behaviour that actually happens.</p></div>
<h2>Refunds</h2>
<p>Purchases are generally final. Exceptions (failed activation, duplicate charge) are in the <a href="/refund-policy/">Refund &amp; cancellation policy</a>.</p>
<h2>If you delete your account</h2>
<p>Deleting your account removes your Premium status with it. See <a href="/delete-account/">Account &amp; data deletion</a>.</p>
<h2>Prices</h2>
<p>Prices are shown in the app at checkout and are in Indian rupees. If a price on this page and the price at checkout ever differ, the checkout price applies, and please tell us.</p>
</div></div></section>`;
  return { path: '/premium/', title: 'Premium', description: `eBook Pro Premium: ${premium.priceDisplay}, AI explanations (up to ${premium.aiDailyLimit}/day) and premium store content. Billing, renewal, cancellation and refunds explained.`, body };
}

/* -------------------------------------------------------------- DOWNLOAD */
export function download() {
  const play = site.android.playStoreUrl
    ? `<a class="btn btn-primary" href="${site.android.playStoreUrl}" rel="noopener">Get it on Google Play</a>`
    : `<span class="btn btn-secondary" aria-disabled="true" role="text">Google Play: coming soon</span>`;
  const body = `${pageHead('Download', 'Get eBook Pro', 'Use eBook Pro in your browser today. The Android app is coming to Google Play.')}
<section><div class="wrap narrow"><div class="grid" style="gap:1.25rem">
  <div class="card"><h2 style="font-size:1.4rem">Android ${site.android.playStoreUrl ? status.available : status.soon}</h2>
  <p>${site.android.playStoreUrl ? 'Install from Google Play.' : 'The Android app is being prepared for Google Play. This button will link to the listing when it is live; until then it is intentionally not a link.'}</p>
  <div class="btn-row">${play}</div><p class="small muted" style="margin-top:.75rem">Package: <code>${site.android.packageName}</code>. Minimum Android version: shown on the Google Play listing.</p></div>
  <div class="card"><h2 style="font-size:1.4rem">Web ${status.available}</h2><p>Open eBook Pro in any modern browser. No install needed.</p><div class="btn-row">${launchBtn()}</div><p class="small muted" style="margin-top:.75rem">Some features (OCR, on-device translation) are Android-only. See <a href="/web-app/">web app</a>.</p></div>
  <div class="card"><h2 style="font-size:1.4rem">iPhone &amp; iPad ${status.planned}</h2><p>There is no iOS app yet. We will add an App Store link here only when one exists.</p></div>
</div></div></section>`;
  return { path: '/download/', title: 'Download', description: 'Get eBook Pro: launch the web app, get the Android app on Google Play when it is live. iPhone and iPad are not available yet.', body, ld: [softwareLd] };
}

export function webApp() {
  const body = `${pageHead('Web app', 'The eBook Pro web app', `The browser-based version of eBook Pro, at <a href="${site.webAppUrl}">${site.webAppUrl.replace('https://', '')}</a>.`, `<div class="btn-row" style="margin-top:1.25rem">${launchBtn()}</div>`)}
<section><div class="wrap narrow prose">
<h2>What it is</h2><p>The same reader and tools as the app, running in your browser. Import PDF, EPUB and TXT files, read, highlight, and sign in for store features.</p>
<h2>What to know</h2>
<ul><li>Imported books and reading data are stored in your browser. Clearing site data removes them, and they do not follow you to other browsers or devices.</li>
<li>OCR (scanned-PDF search) and on-device translation are available in the Android app only.</li>
<li>AI explanations need a Premium account and an internet connection.</li></ul>
<div class="btn-row">${launchBtn()}</div>
</div></section>`;
  return { path: '/web-app/', title: 'Web app', description: 'Launch the eBook Pro web app in your browser: read PDF, EPUB and TXT books with highlights, flashcards and more.', body };
}

/* ----------------------------------------------------------------- ABOUT */
export function about() {
  const body = `${pageHead('About', 'About eBook Pro', 'A reading app that helps you understand what you read.')}
<section><div class="wrap narrow prose">
<h2>What it is</h2><p>eBook Pro is a reading and learning app for PDF, EPUB and text books. It combines a calm, consistent reader with lookups, translation, listening, highlights, flashcards and, for Premium readers, AI explanations.</p>
<h2>Why it exists</h2><p>Reading serious material means stopping to look things up. eBook Pro aims to keep you on the page: understand a word or passage, capture it, and remember it later.</p>
<h2>Principles</h2><ul><li><strong>Your books stay yours.</strong> Imported files stay on your device.</li><li><strong>Honest about what is built.</strong> Planned work is labelled as planned.</li><li><strong>AI where it helps.</strong> A study aid, clearly labelled, with limits we state.</li></ul>
<h2>Who makes it</h2><p>eBook Pro is developed by ${site.developer.name} in ${site.developer.location}. This website, <strong>ebookpro.hycyon.com</strong>, is the official home of eBook Pro. Contact: <a href="mailto:${site.supportEmail}">${site.supportEmail}</a>.</p>
</div></section>`;
  return { path: '/about/', title: 'About', description: 'About eBook Pro, a reading and learning app, and its developer.', body, ld: [{ '@context': 'https://schema.org', '@graph': [orgLd] }] };
}

/* ------------------------------------------------------------------- FAQ */
export function faqPage() {
  const body = `${pageHead('FAQ', 'Frequently asked questions')}
<section><div class="wrap narrow">${faq.map(faqItem).join('')}
<p style="margin-top:2rem">Not answered here? See the <a href="/docs/">documentation</a> or <a href="/support/">contact support</a>.</p></div></section>`;
  const ld = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
  return { path: '/faq/', title: 'FAQ', description: 'Answers about eBook Pro: formats, EPUB3, OCR, sync, AI, Premium, privacy, account deletion and platforms.', body, ld: [ld] };
}

/* --------------------------------------------------------------- ROADMAP */
export function roadmapPage() {
  const body = `${pageHead('Roadmap', 'What is coming next', 'None of this is released. Items can change or be dropped.')}
<section><div class="wrap narrow">
${roadmapGroups
  .map(([k, t, d]) => {
    const items = roadmap.filter((r) => r.status === k);
    return `<div style="margin-bottom:2.5rem"><h2>${t}</h2><p class="muted">${d}</p>${
      items.length ? `<div class="grid">${items.map((i) => `<div class="card"><span class="badge badge-${k === 'dev' ? 'dev' : 'plan'}">${t}</span><h3>${esc(i.title)}</h3><p>${esc(i.text)}</p></div>`).join('')}</div>` : '<div class="empty">Nothing here right now.</div>'
    }</div>`;
  })
  .join('')}
<p>Looking for what exists today? See <a href="/features/">Features</a>.</p></div></section>`;
  return { path: '/roadmap/', title: 'Roadmap', description: 'What is in development, planned or being explored for eBook Pro. Nothing on this page is released.', body };
}

/* ------------------------------------------------------------- CHANGELOG */
export function changelogPage() {
  const list = (t, a) => (a && a.length ? `<h3>${t}</h3><ul>${a.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : '');
  const body = `${pageHead('Changelog', 'Changelog', esc(changelogNote))}
<section><div class="wrap narrow">${changelog
    .map(
      (r) => `<article class="release"><h2>${esc(r.version)}</h2><p class="muted small"><time datetime="${r.date}">${fmtDate(r.date)}</time> · ${esc(r.kind)}</p>${list('Added', r.added)}${list('Improved', r.improved)}${list('Changed', r.changed)}${list('Fixed', r.fixed)}</article>`
    )
    .join('')}</div></section>`;
  return { path: '/changelog/', title: 'Changelog', description: 'Official record of eBook Pro and website updates: added, improved, changed and fixed.', body };
}

/* --------------------------------------------------------------- SUPPORT */
export function support() {
  const m = (s) => `mailto:${site.supportEmail}?subject=${encodeURIComponent(s)}`;
  const body = `${pageHead('Support', 'Help and contact', 'We read every message. Email is the only support channel today.')}
<section><div class="wrap narrow">
<div class="card" style="margin-bottom:1.5rem"><h2 style="font-size:1.3rem">Email support</h2><p><a href="mailto:${site.supportEmail}">${site.supportEmail}</a></p><p class="small muted">Include your device and app version, what you expected and what happened. Do not send passwords or book files.</p></div>
<div class="grid g2">
 <div class="card"><h3>Bug reports</h3><p>Steps to reproduce, device model, Android version or browser.</p><p><a href="${m('Bug report')}">Report a bug</a></p></div>
 <div class="card"><h3>Account problems</h3><p>Sign-in, recovery email, password reset. Tell us which sign-in method you used.</p><p><a href="${m('Account problem')}">Email about your account</a></p></div>
 <div class="card"><h3>Payment problems</h3><p>Include the ${premium.provider} payment ID and the date. See <a href="/refund-policy/">refund policy</a>.</p><p><a href="${m('Payment problem')}">Email about a payment</a></p></div>
 <div class="card"><h3>Privacy questions</h3><p>See the <a href="/privacy/">Privacy Policy</a>. To delete your data use <a href="/delete-account/">account deletion</a>.</p><p><a href="${m('Privacy question')}">Email about privacy</a></p></div>
 <div class="card"><h3>Security issues</h3><p>Please report vulnerabilities privately first. See <a href="/security/">Security</a>.</p><p><a href="${m('Security report')}">Report a security issue</a></p></div>
 <div class="card"><h3>Self-help</h3><p>Guides and troubleshooting in the <a href="/docs/">documentation</a> and <a href="/faq/">FAQ</a>.</p></div>
</div>
<p class="muted small" style="margin-top:2rem">Developer: ${site.developer.name}, ${site.developer.location}.</p>
</div></section>`;
  return { path: '/support/', title: 'Support', description: 'Contact eBook Pro support for bugs, account problems, payments, privacy questions and security reports.', body };
}

/* ------------------------------------------------------------------- 404 */
export function notFound() {
  const body = `<section style="padding:6rem 0"><div class="wrap narrow center">
<p class="eyebrow">404</p><h1>This page couldn’t be found.</h1>
<p class="lead">The link may be old or mistyped.</p>
<div class="btn-row"><a class="btn btn-primary" href="/">Back to eBook Pro</a><a class="btn btn-secondary" href="${site.webAppUrl}" rel="noopener">Launch web app</a><a class="btn btn-secondary" href="/support/">Help &amp; support</a></div>
</div></section>`;
  return { path: '/404.html', title: 'Page not found', description: 'This page could not be found. Go back to eBook Pro, launch the web app, or get help.', body, noindex: true, file: '404.html' };
}
