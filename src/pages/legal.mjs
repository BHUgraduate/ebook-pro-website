import { site, premium } from '../site.config.mjs';
import { esc, pageHead, updatedLine, ctaBand } from '../layout.mjs';
import { privacySections } from '../content/privacy.mjs';

const mail = `<a href="mailto:${site.supportEmail}">${site.supportEmail}</a>`;
const toc = (items) => `<nav class="toc" aria-label="On this page"><h2>On this page</h2><ol>${items.map(([id, t]) => `<li><a href="#${id}">${t}</a></li>`).join('')}</ol></nav>`;
const table = (head, rows, cap) => `<div class="table-wrap"><table><caption class="sr-only">${cap}</caption><thead><tr>${head.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => (i === 0 ? `<th scope="row">${c}</th>` : `<td>${c}</td>`)).join('')}</tr>`).join('')}</tbody></table></div>`;

/* ---------------------------------------------------------------- PRIVACY */
/** Inline markup used by the shared policy text: **bold**, `code`, [label](url). */
export const inlineHtml = (text) =>
  esc(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/\n/g, '<br>');

function renderBlock(block) {
  if (typeof block === 'string') return `<p>${inlineHtml(block)}</p>`;
  if (block.ul) return `<ul>${block.ul.map((i) => `<li>${inlineHtml(i)}</li>`).join('')}</ul>`;
  if (block.table) {
    const { caption, head, rows } = block.table;
    return `<div class="table-wrap"><table><caption class="sr-only">${esc(caption)}</caption><thead><tr>${head.map((h) => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => (i === 0 ? `<th scope="row">${inlineHtml(c)}</th>` : `<td>${inlineHtml(c)}</td>`)).join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  return '';
}

export function privacy() {
  const body = `${pageHead('Legal', 'Privacy Policy', 'How eBook Pro handles your information. This is the single, official privacy policy for the eBook Pro Android app, the eBook Pro web app and this website.')}
<section><div class="wrap narrow prose">
${updatedLine(site.updated.privacy)}
${toc(privacySections.map((s) => [s.id, esc(s.title.replace(/^\d+\. /, ''))]))}
${privacySections.map((s) => `<h2 id="${s.id}">${esc(s.title)}</h2>\n${s.blocks.map(renderBlock).join('\n')}`).join('\n\n')}
</div></section>`;
  return {
    path: '/privacy/',
    title: 'Privacy Policy',
    description: 'The eBook Pro Privacy Policy: what stays on your device, what is stored online, how AI requests are handled, third-party services, retention and account deletion.',
    body,
    ld: [{ '@context': 'https://schema.org', '@type': 'WebPage', name: 'eBook Pro Privacy Policy', url: site.url + '/privacy/', dateModified: site.updated.privacy, isPartOf: { '@id': site.url + '/#website' } }],
  };
}

/* ------------------------------------------------------------------ TERMS */
export function terms() {
  const sections = [
    ['use', 'Using eBook Pro'], ['accounts', 'Accounts'], ['content', 'Your content and imported books'], ['ip', 'Intellectual property'], ['ai', 'AI features'],
    ['premium', 'Premium and payments'], ['prohibited', 'What you may not do'], ['availability', 'Availability and changes'], ['termination', 'Ending your account'],
    ['disclaimer', 'Disclaimers and liability'], ['law', 'Governing law'], ['contact', 'Contact'],
  ];
  const body = `${pageHead('Legal', 'Terms of Service', 'The rules for using eBook Pro, in plain language.')}
<section><div class="wrap narrow prose">
${updatedLine(site.updated.terms)}
${toc(sections)}
<p>By installing or using eBook Pro (the Android app, the web app and this website) you agree to these terms and to our <a href="/privacy/">Privacy Policy</a>. If you do not agree, please do not use eBook Pro.</p>
<h2 id="use">1. Using eBook Pro</h2><p>eBook Pro is a reading and learning app. You may use it for personal, lawful purposes. You can read without an account; some features need one.</p>
<h2 id="accounts">2. Accounts</h2><p>Give accurate information and keep your sign-in details and device secure. You are responsible for activity on your account. Tell us promptly if you think it has been accessed without permission.</p>
<h2 id="content">3. Your content and imported books</h2><p>Books you import stay on your device. You confirm you have the right to read the files you import and the content you add (reviews, highlights you share). You keep your rights in your content, and you give us a limited licence to store and display reviews you post so the service can work. Do not import or share material you have no right to use.</p>
<h2 id="ip">4. Intellectual property</h2><p>The eBook Pro app, name, logo and website are owned by ${site.developer.name} or its licensors. These terms do not give you any right to them other than to use the service. Books in the store and in third-party catalogues belong to their respective owners and are provided under their licences.</p>
<h2 id="ai">5. AI features</h2><p>AI explanations, summaries and research answers are generated by a third-party model and may be inaccurate or incomplete. Use them as a study aid, not as professional, legal, medical or financial advice. Do not submit sensitive personal information. Daily limits apply (${premium.aiDailyLimit} per day for Premium accounts at the time of writing).</p>
<h2 id="premium">6. Premium subscription and payments</h2><p>Premium is a subscription that costs ${premium.pricePerPeriod} and <strong>renews automatically every month until you cancel</strong>. By subscribing you authorise ${premium.provider} to charge ${premium.priceDisplay} each month on the date you subscribed. You can cancel at any time in the app (Settings → Premium); Premium then stays on until the end of the paid month and is not renewed. If a renewal payment fails and cannot be collected, Premium ends. What Premium includes is described on the <a href="/premium/">Premium page</a>; we may change the features or the price, and we will tell you before a price change applies to your subscription, so you can cancel. Refunds are covered in the <a href="/refund-policy/">Refund &amp; Cancellation Policy</a>. Paid store books are separate one-time purchases.</p>
<h2 id="prohibited">7. What you may not do</h2><ul><li>Copy, modify, reverse engineer or extract the source code of the app, except where the law allows it.</li><li>Bypass usage limits, Premium checks or security measures.</li><li>Use eBook Pro to infringe others’ rights, to harass others, or to post unlawful or abusive reviews.</li><li>Interfere with or overload our servers, or access other people’s accounts or data.</li><li>Automate the AI feature or resell access to it.</li></ul>
<h2 id="availability">8. Availability and changes</h2><p>We aim to keep eBook Pro available but do not promise uninterrupted service. Features may change, and online features depend on third-party services. We may update the app, pricing or these terms. For material changes we will update the date above and notify you in the app or on this site. Continuing to use eBook Pro after a change means you accept it.</p>
<h2 id="termination">9. Ending your account</h2><p>You can delete your account at any time (<a href="/delete-account/">how</a>). We may suspend or close accounts that break these terms or misuse the service. On deletion your data is handled as described in the Privacy Policy.</p>
<h2 id="disclaimer">10. Disclaimers and liability</h2><p>eBook Pro is provided “as is” and “as available”, without warranties of any kind to the extent the law allows. To the extent the law allows, we are not liable for indirect or consequential losses or for loss of data stored only on your device, and our total liability for any claim is limited to the amount you paid us for Premium in the twelve months before the claim. Nothing in these terms limits rights you have under consumer law that cannot be excluded.</p>
<h2 id="law">11. Governing law</h2><p>These terms are governed by the laws of India. If a dispute cannot be resolved by talking to us first, the courts of India have jurisdiction, subject to any mandatory consumer rights in your country.</p>
<h2 id="contact">12. Contact</h2><p>${mail}<br>${site.developer.name}, ${site.developer.location}.</p>
</div></section>`;
  return { path: '/terms/', title: 'Terms of Service', description: 'The eBook Pro Terms of Service: accounts, your content, AI features, Premium, prohibited use, availability and liability.', body };
}

/* ----------------------------------------------------------------- REFUND */
export function refund() {
  const body = `${pageHead('Legal', 'Refund &amp; Cancellation Policy', 'How Premium payments, cancellation and refunds work.')}
<section><div class="wrap narrow prose">
${updatedLine(site.updated.refund)}
<h2>How Premium is paid</h2><p>Premium is a subscription at ${premium.pricePerPeriod}, processed by ${premium.provider}. The first month is charged when you subscribe, then ${premium.priceDisplay} every month until you cancel. Paid store books are separate one-time purchases.</p>
<h2>Cancellation</h2><p>Cancel any time in the app: Settings → Premium → Cancel subscription. You are not charged again; Premium stays on until the end of the month you already paid for. Cancelling does not by itself refund the current month. If you revoke the mandate in your UPI app or card instead, the next renewal cannot be charged and Premium ends after the paid month.</p>
<h2>Refunds</h2><p>Premium gives immediate access to AI features that use paid cloud services, so <strong>monthly payments are generally not refundable</strong>, and we do not give credits for partly used months.</p>
<p>We will, however, help or refund you where:</p>
<ul><li>you were charged but Premium was not activated and we cannot fix it;</li><li>you were charged more than once for the same month or purchase;</li><li>you were charged after cancelling;</li><li>a technical fault on our side prevented you from using what you paid for and we cannot resolve it; or</li><li>the law where you live gives you a right to a refund.</li></ul>
<h2>How to ask</h2><p>Email ${mail} within 7 days of the payment with the ${premium.provider} payment ID, the date, and the email or phone used. Approved refunds go back to the original payment method; timing depends on your bank or payment provider.</p>
<h2>Deleting your account</h2><p>Deleting your account cancels the subscription’s renewal and ends your Premium access; it does not by itself create a refund.</p>
<p class="small muted">Related: <a href="/premium/">Premium</a> · <a href="/terms/">Terms of Service</a> · <a href="/privacy/">Privacy Policy</a></p>
</div></section>`;
  return { path: '/refund-policy/', title: 'Refund & Cancellation Policy', description: 'eBook Pro Refund and Cancellation Policy: how Premium payments work, when refunds apply and how to ask.', body };
}

/* --------------------------------------------------------------- SECURITY */
export function security() {
  const body = `${pageHead('Security', 'Security at eBook Pro', 'What we actually do to protect your account and data, without exaggeration.')}
<section><div class="wrap narrow prose">
${updatedLine(site.updated.security)}
<h2>Authentication</h2><p>Sign-in is handled by Google Firebase Authentication (email and password, phone one-time code, username and password, or Google). We never see or store your password. Our server checks your sign-in token on every AI request. Password-reset codes for username accounts expire after 15 minutes.</p>
<h2>Secure communication</h2><p>The apps talk to our backend and to the third-party services listed in the <a href="/privacy/">Privacy Policy</a> over HTTPS.</p>
<h2>Cloud data and access control</h2><p>Account data lives in Firebase (Firestore and Storage), protected by security rules that restrict who can read and write. Your Premium status can only be set by our server, never by the app: subscriptions are created on our server, payment confirmations are verified by signature, and the subscription’s state (paid until, renewed, cancelled) is read from Razorpay by our server. The same check runs on our server and in the database rules, so changing the app cannot unlock Premium.</p>
<h2>Secrets</h2><p>The Gemini API key and payment secret keys are kept on the server, never in the app or this website.</p>
<h2>AI data handling</h2><p>AI requests are sent to Google’s Gemini through our server, as described on the <a href="/ai/">AI page</a>.</p>
<h2>Data on your device</h2><p>Books and reading data are stored in the app’s private storage on your device. Protect your device with a screen lock.</p>
<h2>Data deletion</h2><p>You can delete your account and server-side data at any time: <a href="/delete-account/">Account &amp; data deletion</a>.</p>
<h2>Limits</h2><p>We rely on Google’s infrastructure and its default protections, such as encryption in transit and at rest as documented by Google. We have not had an independent security certification, and no service can guarantee perfect security.</p>
<h2>Reporting a security issue</h2><p>Email ${mail} with the subject “Security report”. Please give us reasonable time to fix an issue before disclosing it, and do not access other people’s data while testing.</p>
</div></section>`;
  return { path: '/security/', title: 'Security', description: 'How eBook Pro protects accounts and data: Firebase Authentication, HTTPS, access rules, server-side secrets, and how to report a security issue.', body };
}

/* ----------------------------------------------------------- DELETE ACCOUNT */
export function deleteAccount() {
  const fb = site.firebaseWeb;
  const body = `${pageHead('Account', 'Delete your eBook Pro account', 'Permanently delete your account and the data we hold about you. You can do it here or in the app.')}
<section><div class="wrap narrow">
<div class="grid g2" style="margin-bottom:2rem;gap:1.25rem">
<div class="card"><h2 style="font-size:1.15rem;font-family:var(--sans)">What is deleted</h2><ul><li>Your sign-in account</li><li>Your profile, display name, recovery email and phone</li><li>Your store library, settings and AI usage counters</li><li>Your username record</li><li>Your reviews and profile photo</li><li>Premium status (no automatic refund)</li></ul></div>
<div class="card"><h2 style="font-size:1.15rem;font-family:var(--sans)">What may remain</h2><ul><li>Payment records held by Razorpay and banks</li><li>Anonymous community-highlight counts and cached AI answers not linked to you</li><li>Moderation reports you filed, without your identity</li><li>Short-lived technical logs held by Google Cloud</li></ul></div>
</div>
<div class="note warn"><strong>Deletion is permanent</strong><p>It cannot be undone. Books on your device are not affected until you uninstall the app or clear your browser data. See the <a href="/privacy/#retention">Privacy Policy</a>.</p></div>

<h2>Delete in the app</h2><p>Settings → My Account → <strong>Delete My Account</strong>.</p>

<h2>Delete here</h2>
<div id="del-app" data-config='${esc(JSON.stringify({ firebase: { apiKey: fb.apiKey, authDomain: fb.authDomain, projectId: fb.projectId, appId: fb.appId }, region: fb.functionsRegion }))}'>
  <noscript><div class="msg err">This page needs JavaScript to sign you in. Without it, delete your account in the app or email ${mail}.</div></noscript>
  <p id="del-loading" class="msg info" role="status">Loading secure sign-in…</p>

  <form id="del-signin" class="form hidden" novalidate>
    <h3>Step 1: Sign in</h3>
    <div class="field"><label for="del-id">Email or username</label><input id="del-id" name="id" autocomplete="username" required><p class="hint">Use the same method you signed up with.</p></div>
    <div class="field"><label for="del-pw">Password</label><input id="del-pw" name="pw" type="password" autocomplete="current-password" required></div>
    <div class="btn-row"><button class="btn btn-primary" type="submit">Sign in</button><button class="btn btn-secondary" type="button" id="del-google">Sign in with Google</button></div>
    <p class="hint small muted" style="margin-top:.75rem">Signed up with a phone number only? Delete from the app, or email ${mail} and we will help verify your ownership of the account.</p>
  </form>

  <form id="del-confirm" class="form hidden" novalidate>
    <h3>Step 2: Confirm</h3>
    <p>Signed in as <strong id="del-who"></strong>. Not you? <button type="button" class="btn btn-sm btn-secondary" id="del-switch">Use another account</button></p>
    <div class="field"><label for="del-type">Type DELETE to confirm</label><input id="del-type" autocomplete="off" autocapitalize="characters" required></div>
    <button class="btn btn-danger" type="submit" id="del-go" disabled>Permanently delete my account</button>
  </form>

  <div id="del-msg" role="alert" aria-live="assertive"></div>
  <div id="del-done" class="hidden"><div class="msg ok"><strong>Your account has been deleted.</strong><br>Your sign-in account and server-side data were removed. You can close this page.</div></div>
</div>

<h2 style="margin-top:3rem">Need help?</h2>
<p>If you cannot sign in, email ${mail} from the address on your account with the subject “Delete my account”. We verify ownership before deleting, and we will not delete an account for anyone else. We do not need any other personal information to process a deletion.</p>
${updatedLine(site.updated.deletion)}
</div></section>`;
  return {
    path: '/delete-account/', title: 'Account & data deletion',
    description: 'Delete your eBook Pro account and data: what is deleted, what may be retained, and a sign-in-protected way to delete it from the web.',
    body, scripts: ['<script type="module" src="/assets/js/delete-account.js"></script>'],
  };
}

export function legalHub() {
  const body = `${pageHead('Legal', 'Legal and policies', 'The official policies for eBook Pro.')}
<section><div class="wrap narrow"><div class="grid g2">
${[
    ['/privacy/', 'Privacy Policy', 'What we collect, how it is used, third-party services, retention.'],
    ['/terms/', 'Terms of Service', 'The rules for using eBook Pro.'],
    ['/delete-account/', 'Account &amp; data deletion', 'Delete your account and data.'],
    ['/refund-policy/', 'Refund &amp; Cancellation', 'Premium payments, cancellation and refunds.'],
    ['/security/', 'Security', 'How we protect your data.'],
    ['/support/', 'Contact', 'Reach support.'],
  ].map(([h, t, d]) => `<a class="card" href="${h}" style="text-decoration:none;color:inherit"><h2>${t}</h2><p>${d}</p></a>`).join('')}
</div></div></section>`;
  return { path: '/legal/', title: 'Legal', description: 'Official eBook Pro policies: Privacy Policy, Terms of Service, account deletion, refunds and security.', body };
}
