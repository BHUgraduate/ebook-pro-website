import { site, premium } from '../site.config.mjs';
import { esc, pageHead, status, ctaBand, updatedLine, websiteLd, orgLd, abs, fmtDate, crumbs } from '../layout.mjs';
import { featureGroups, homeHighlights } from '../content/features.mjs';
import { formats, formatCols, unsupported } from '../content/formats.mjs';
import { faq } from '../content/faq.mjs';
import { roadmap, roadmapGroups } from '../content/roadmap.mjs';
import { changelog, changelogNote } from '../content/changelog.mjs';
import { screenshots, screenshotsVersion } from '../content/screenshots.mjs';
import { freeFeatures, premiumFeatures, afterPremiumEnds } from '../content/plans.mjs';
import { stages } from '../content/stages.mjs';
import { metrics, reviews, stories } from '../content/trust.mjs';

const launchBtn = (cls = 'btn-primary') => `<a class="btn ${cls}" href="${site.webAppUrl}" rel="noopener">Launch web app</a>`;
const androidBtn = (cls = 'btn-secondary') =>
  site.android.playStoreUrl
    ? `<a class="btn ${cls}" href="${site.android.playStoreUrl}" rel="noopener">Get it on Google Play</a>`
    : `<a class="btn ${cls}" href="/download/">Get the Android app</a>`;

const softwareLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: site.name,
  alternateName: ['eBook Pro app', 'eBook Pro reader', 'ebookpro'],
  description: 'A free ebook reader and learning app for PDF, EPUB and text books, with highlights, notes, OCR and translation.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Android, Web',
  url: site.url + '/',
  installUrl: site.android.playStoreUrl || undefined,
  offers: [
    { '@type': 'Offer', price: '0', priceCurrency: 'INR', description: 'Free: reading, library, highlights, notes, OCR, translation, flashcards.' },
    { '@type': 'Offer', price: '9', priceCurrency: 'INR', description: 'eBook Pro Premium, ₹9 per month, renews monthly until cancelled.', priceSpecification: { '@type': 'UnitPriceSpecification', price: '9', priceCurrency: 'INR', unitCode: 'MON', referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' } } },
  ],
  publisher: { '@id': site.url + '/#developer' },
};

const featureItem = (f) => `<li><span class="t"><strong>${esc(f.name)}</strong>${f.premium ? ' ' + status.premium : ''}<small>${esc(f.text)}</small></span>${status[f.status] || ''}</li>`;

const planCards = () => `<div class="grid g2">
  <div class="card"><h3>Free</h3><p class="muted">A complete reader, always</p><ul>${freeFeatures.map((f) => `<li><strong>${esc(f.title)}</strong>: ${esc(f.detail)}</li>`).join('')}</ul></div>
  <div class="card" style="border-color:var(--accent)"><h3>Premium · ${premium.pricePerPeriod}</h3><p class="muted">Everything in Free, plus</p><ul>${premiumFeatures.map((f) => `<li><strong>${esc(f.title)}</strong>: ${esc(f.detail)}</li>`).join('')}</ul><p class="small">Renews every month until you cancel. Cancel any time in the app (Settings → Premium); Premium stays on until the end of the month you paid for.</p></div>
</div>`;


const stageCard = (st, i) => `<li class="card stage"><p class="eyebrow">${i + 1} · ${esc(st.name)}</p><h3>${esc(st.promise)}</h3><ul>${st.items
  .map((it) => `<li>${esc(it.text)}${it.premium ? ' ' + status.premium : ''}</li>`)
  .join('')}</ul><p><a href="${st.href}">${esc(st.link)} →</a></p></li>`;

const shotsBlock = () =>
  screenshots.length
    ? `<div class="shots">${screenshots.map((s) => `<figure${s.wide ? ' class="wide"' : ''}><img src="/assets/screenshots/${s.file}" alt="${esc(s.alt)}" width="${s.width}" height="${s.height}" loading="lazy" decoding="async"><figcaption>${esc(s.caption)}</figcaption></figure>`).join('')}</div><p class="small muted">Real screenshots of the Android app, captured on version ${esc(screenshotsVersion)} with public-domain sample books and sample notes. The canvas, research workspaces and sync arrived in later versions and are not pictured yet.</p>`
    : `<div class="empty"><p><strong>Screenshots are coming soon.</strong></p><p class="small">We only show real screenshots of the released app. Until they are added, see the <a href="/docs/">documentation</a> for how each feature works.</p></div>`;

const fact = (label, value) => `<div class="card fact"><p class="eyebrow">${esc(label)}</p><p>${value}</p></div>`;

const evidence = () => {
  const entries = (label, list, render) => (list.length ? `<h3>${label}</h3><ul class="evidence">${list.map(render).join('')}</ul>` : '');
  const src = (e) => `<small class="muted"><a href="${esc(e.source)}" rel="noopener">Source</a> · ${fmtDate(e.date)}</small>`;
  const real = metrics.length + reviews.length + stories.length;
  return `<section class="reveal" id="evidence">
  <div class="wrap">
    <div class="section-head"><h2>What you can verify today</h2><p class="lead">Facts you can check yourself. Nothing here is estimated or rounded up.</p></div>
    <div class="grid g4">
      ${fact('Web app', `${status.available} <a href="${site.webAppUrl}" rel="noopener">Open it in a browser</a>`)}
      ${fact('Android', site.android.playStoreUrl ? `${status.available} <a href="${site.android.playStoreUrl}" rel="noopener">Google Play</a>` : `${status.dev} Preparing the Google Play release`)}
      ${fact('iPhone and iPad', `${status.planned} No iOS app yet`)}
      ${fact('Current version', `${esc(site.app.version)}, released ${fmtDate(site.app.releasedOn)}. <a href="/changelog/">Every release →</a>`)}
    </div>
    ${real
      ? `${entries('Numbers', metrics, (m) => `<li><strong>${esc(m.label)}:</strong> ${esc(m.value)} ${src(m)}</li>`)}${entries('Reviews', reviews, (r) => `<li><blockquote>${esc(r.quote)}</blockquote><p>${esc(r.name)}, ${esc(r.context)} ${src(r)}</p></li>`)}${entries('User stories', stories, (t) => `<li><strong>${esc(t.title)}</strong> ${esc(t.summary)} ${src(t)}</li>`)}`
      : `<div class="empty" style="margin-top:1.25rem"><p><strong>No ratings, reviews or download counts are published yet.</strong></p><p class="small">They will appear here once they exist, each with its source and date. We do not show placeholder numbers. See the <a href="/privacy/">privacy policy</a> and the <a href="/security/">security page</a> for how data is handled.</p></div>`}
  </div>
</section>`;
};

/* ------------------------------------------------------------------ HOME */
export function home() {
  const body = `
<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <p class="eyebrow">Read · Understand · Capture · Connect · Remember · Create</p>
      <h1>Not just another ebook reader.</h1>
      <p class="lead">eBook Pro reads your PDF, EPUB and text books, and turns what you read into knowledge: highlights and notes that remember their source, AI that explains, canvases that connect ideas, research across several books, and flashcards that help you remember.</p>
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
        <div class="tip">Highlight, note, translate or explain, then connect it to the rest of your knowledge.</div>
      </div>
      <p class="art-note">Illustration, not a screenshot. Text from <em>Pride and Prejudice</em> (public domain).</p>
    </div>
  </div>
</section>

<section class="reveal" id="see-it">
  <div class="wrap">
    <div class="section-head"><h2>See the app</h2></div>
    ${shotsBlock()}
  </div>
</section>

<section class="alt reveal" id="stages">
  <div class="wrap">
    <div class="section-head"><h2>From reading to knowledge</h2><p class="lead">Everything you save is one linked object, shown wherever it is useful: in the book, in a collection, on a canvas, in a research workspace and in search. Six stages, in the order you use them.</p></div>
    <ol class="grid g3 stages">${stages.map(stageCard).join('')}</ol>
  </div>
</section>

<section class="reveal" id="pricing">
  <div class="wrap">
    <div class="section-head"><h2>Free and Premium</h2><p class="lead">Reading stays free. Premium is <strong>${premium.pricePerPeriod}</strong>, renews monthly until you cancel, and unlocks the knowledge and research tools.</p></div>
    ${planCards()}
    <p class="small muted" style="margin-top:1rem">${esc(afterPremiumEnds)} Paid store books are bought one by one and are not part of Premium. <a href="/premium/">Premium details →</a></p>
  </div>
</section>

<section class="alt reveal">
  <div class="wrap narrow">
    <p class="eyebrow">Privacy</p>
    <h2>Your books stay yours</h2>
    <p>Imported books and reading positions stay on your device. AI features send only the text needed for the request, through our server. Sync is off until you turn it on. Read the <a href="/privacy/">Privacy Policy</a>.</p>
  </div>
</section>

${evidence()}

<section class="alt reveal">
  <div class="wrap narrow">
    <div class="section-head"><h2>Latest update</h2></div>
    <div class="card"><h3>${esc(changelog[0].version)} <span class="muted small">· ${fmtDate(changelog[0].date)}</span></h3><p>${esc(changelog[0].added?.[0] || changelog[0].fixed?.[0] || changelog[0].changed?.[0] || "")}</p><p><a href="/changelog/">Read the changelog →</a></p></div>
  </div>
</section>

<section class="reveal">
  <div class="wrap narrow">
    <div class="section-head"><h2>Common questions</h2></div>
    ${faq.slice(0, 6).map(faqItem).join('')}
    <p><a href="/faq/">All questions →</a></p>
  </div>
</section>

${ctaBand('Start reading', 'Open the web app in your browser, or get the Android app.', `${launchBtn()}${androidBtn()}`)}`;
  return {
    path: '/',
    title: site.name,
    description: `eBook Pro turns reading into knowledge: a free ebook reader app for PDF, EPUB and TXT with highlights, notes and OCR, plus Premium (${premium.pricePerPeriod}) AI, canvas, research and sync.`,
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
<div class="note"><strong>Free and Premium</strong><p>Items marked Premium need eBook Pro Premium (${premium.pricePerPeriod}, renews monthly until cancelled); everything else is free. AI features (explanations, summaries, research answers, Sanskrit translation) go through our server to Google Gemini; OCR, listen mode and translation in the Android app run on your device. See <a href="/premium/">Premium</a> and <a href="/ai/">AI</a>.</p></div>
</div></section>
${ctaBand('Try it', 'Open the web app or get the Android app.', `${launchBtn()}${androidBtn()}`)}`;
  return { path: '/features/', title: 'Ebook reader features', description: 'Everything the eBook Pro ebook reader does today, free and Premium: PDF, EPUB and TXT reading, notes, OCR, translation, flashcards, AI and sync.', body, ld: [softwareLd] };
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
<div class="note"><strong>OCR</strong><p>OCR reads scanned PDF pages and illustrations so their text can be selected, copied, searched and translated. It runs on your device (Google ML Kit, Latin and Devanagari scripts) on Android and is not available in the web app.</p></div>
</div></section>`;
  return { path: '/formats/', title: 'PDF, EPUB and TXT ebook reader', description: 'PDF, EPUB 2/3 and TXT ebook support in eBook Pro: import, reading, search, text extraction, images, layout, navigation, zoom and annotations, with limitations.', body };
}

/* -------------------------------------------------------------------- AI */
export function ai() {
  const body = `${pageHead('AI', 'How AI works in eBook Pro', `AI is part of Premium (${premium.pricePerPeriod}). This page explains what each AI feature does and where your text goes.`)}
<section><div class="wrap narrow prose">
<h2>Available now ${status.premium}</h2>
<div class="card" style="margin-bottom:1rem"><h3>AI explanations</h3><p>Select a passage and choose Explain, Simplify, Summarize or Examples. The selected text and its surrounding paragraph go to a Google Cloud function that we run; it checks your account and Premium, applies your daily limit, and asks a Google Gemini model. The answer streams back and is labelled as generated. Sanskrit passages, which on-device translation cannot handle, can be translated the same way.</p></div>
<div class="card" style="margin-bottom:1rem"><h3>AI summaries</h3><p>Summarise the current page, a chapter or the whole book. For a page or chapter the app sends that text. A whole book is never sent: the summary is built from the contents with your saved chapter summaries or each chapter’s opening, and it says so. Summaries are saved with their source and open again offline. A whole-book summary counts as 3 of the daily requests.</p></div>
<div class="card" style="margin-bottom:1rem"><h3>Research answers</h3><p>In a research workspace, ask a question across its documents. The app sends your question and the most relevant excerpts it found on your device, numbered, and the answer cites them; each citation opens the passage. It counts as 2 requests.</p></div>
<h2>Runs on your device (not AI requests to us)</h2>
<ul><li><strong>Translation</strong>: Google ML Kit on your device in the Android app (language packs download once); an online translation service in the web app.</li><li><strong>OCR</strong>: Google ML Kit, on your device (Android), Latin and Devanagari.</li><li><strong>Listen (read aloud)</strong>: your device’s text-to-speech voices.</li><li><strong>Search, canvases, flashcards</strong>: on your device.</li></ul>
<h2>Limits</h2>
<div class="table-wrap"><table><thead><tr><th scope="col">Plan</th><th scope="col">AI</th></tr></thead><tbody>
<tr><td>Signed out</td><td>Not available</td></tr>
<tr><td>Free account</td><td>Not available (Premium)</td></tr>
<tr><td>Premium (${premium.pricePerPeriod})</td><td>Up to ${premium.aiDailyLimit} requests per day, reset at midnight UTC</td></tr></tbody></table></div>
<h2>How requests are handled</h2>
<ul>
<li>Sent over HTTPS with your sign-in token, which our server verifies together with your Premium subscription.</li>
<li>The text is forwarded to Google’s Gemini API, using a key that is stored on our server and never shipped in the app.</li>
<li>A shared cache stores answers keyed by a one-way hash of the text, context and language, so identical requests can be answered without calling Gemini again. The cache stores the answer, not your account ID.</li>
<li>Your account stores only a per-day counter of AI requests, for the limit.</li>
<li>Google processes the text under its own terms for the Gemini API.</li>
</ul>
<h2>What not to submit</h2>
<p>Do not select passages that contain passwords, financial or health details, government IDs, or other sensitive personal information, and avoid material you are not allowed to share. AI answers can be wrong; verify anything important.</p>
<h2>Planned</h2>
<ul><li>${status.planned} AI-written flashcards (today’s flashcards are made without AI).</li></ul>
<p>See the <a href="/roadmap/">roadmap</a> and <a href="/privacy/">Privacy Policy</a>.</p>
</div></section>`;
  return { path: '/ai/', title: 'AI', description: `AI in eBook Pro Premium (${premium.pricePerPeriod}): explanations, page/chapter/book summaries and cited research answers through Google Gemini, ${premium.aiDailyLimit} requests a day, and what runs on your device instead.`, body };
}

/* --------------------------------------------------------------- PREMIUM */
export function premiumPage() {
  const body = `${pageHead('Premium', 'eBook Pro Premium', `${premium.pricePerPeriod}. Renews every month until you cancel.`)}
<section><div class="wrap">
<div style="max-width:960px;margin:0 auto 2.5rem"><h2 style="text-align:center">Free and Premium</h2>${planCards()}</div>
<div class="prose" style="margin:0 auto">
<h2>Price and billing</h2>
<p>Premium is a <strong>monthly subscription at ${premium.pricePerPeriod}</strong>. The first month is charged when you subscribe, then ${premium.priceDisplay} every month on the same date until you cancel. It is not a one-time purchase and not lifetime access. You subscribe in the app (Settings → Premium → Start Premium). Payment is handled by ${premium.provider}, which sets up the recurring payment through UPI Autopay, a card or another method it supports for subscriptions; you approve it once in your payment app. We never see or store your card or UPI details.</p>
<p>Prices are in Indian rupees. The amount shown at checkout is what you pay; your bank or payment app may show it with its own description.</p>
<h2>Cancelling</h2>
<p>Cancel any time in the app: Settings → Premium → Cancel subscription. Premium stays on until the end of the month you already paid for, and you are not charged again. If you revoke the mandate in your UPI app or card instead, the next renewal cannot be charged and Premium ends after the paid month.</p>
<h2>If a renewal payment fails</h2>
<p>${premium.provider} retries for a few days. Premium continues for a short grace period while it does, and the Premium screen tells you there is a payment problem. If the retries fail, the subscription stops and Premium ends.</p>
<h2>When Premium ends</h2>
<p>${esc(afterPremiumEnds)}</p>
<h2>Restore purchases</h2>
<p>On a new phone, or if a payment did not register, open Settings → Premium → Restore purchases while signed in to the account you subscribed with. Our server re-checks your subscription with ${premium.provider}.</p>
<h2>Bought Premium before subscriptions?</h2>
<p>Premium used to be a single ${premium.priceDisplay} payment (app 1.3 and earlier). If you bought it that way, it stays active for that account and you will not be charged.</p>
<h2>Refunds</h2>
<p>See the <a href="/refund-policy/">Refund &amp; cancellation policy</a>.</p>
<h2>If you delete your account</h2>
<p>Deleting your account cancels the subscription’s renewal and removes your Premium status. See <a href="/delete-account/">Account &amp; data deletion</a>.</p>
</div></div></section>`;
  return { path: '/premium/', title: 'Premium', description: `eBook Pro Premium is ${premium.pricePerPeriod} and renews monthly until cancelled: AI, summaries, canvas, research, bilingual reading, Word export and sync.`, body };
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
  return { path: '/download/', title: 'Get the ebook reader app', description: 'Get the eBook Pro ebook reader app: launch the web app, get the Android app on Google Play when it is live. iPhone and iPad are not available yet.', body, ld: [softwareLd] };
}

export function webApp() {
  const body = `${pageHead('Web app', 'The eBook Pro web app', `The browser-based version of eBook Pro, at <a href="${site.webAppUrl}">${site.webAppUrl.replace('https://', '')}</a>.`, `<div class="btn-row" style="margin-top:1.25rem">${launchBtn()}</div>`)}
<section><div class="wrap narrow prose">
<h2>What it is</h2><p>The same reader and tools as the app, running in your browser. Import PDF, EPUB and TXT files, read, highlight, and sign in for store features.</p>
<h2>What to know</h2>
<ul><li>Imported books and reading data are stored in your browser. Clearing site data removes them, and they do not follow you to other browsers or devices.</li>
<li>OCR (scanned pages) and on-device translation are available in the Android app only; the web app translates through an online service.</li>
<li>AI explanations need a Premium account and an internet connection.</li></ul>
<div class="btn-row">${launchBtn()}</div>
</div></section>`;
  return { path: '/web-app/', title: 'Read ebooks online, web app', description: 'Launch the eBook Pro web app in your browser and read ebooks online: PDF, EPUB and TXT books with highlights, flashcards and more.', body };
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
