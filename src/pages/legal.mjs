import { site, premium } from '../site.config.mjs';
import { esc, pageHead, updatedLine, ctaBand } from '../layout.mjs';

const mail = `<a href="mailto:${site.supportEmail}">${site.supportEmail}</a>`;
const toc = (items) => `<nav class="toc" aria-label="On this page"><h2>On this page</h2><ol>${items.map(([id, t]) => `<li><a href="#${id}">${t}</a></li>`).join('')}</ol></nav>`;
const table = (head, rows, cap) => `<div class="table-wrap"><table><caption class="sr-only">${cap}</caption><thead><tr>${head.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => (i === 0 ? `<th scope="row">${c}</th>` : `<td>${c}</td>`)).join('')}</tr>`).join('')}</tbody></table></div>`;

/* ---------------------------------------------------------------- PRIVACY */
export function privacy() {
  const sections = [
    ['who', 'Who we are and what this covers'], ['summary', 'Summary'], ['collect', 'Information we collect'], ['device', 'Data that stays on your device'],
    ['use', 'How we use information'], ['ai', 'AI features'], ['third', 'Third-party services'], ['visible', 'What other people can see'],
    ['security', 'Security'], ['retention', 'Retention and deletion'], ['choices', 'Your choices and rights'], ['children', 'Children'],
    ['transfers', 'Where data is processed'], ['website', 'This website'], ['changes', 'Changes to this policy'], ['contact', 'Contact'],
  ];
  const body = `${pageHead('Legal', 'Privacy Policy', 'How eBook Pro handles your information. This is the single, official privacy policy for the eBook Pro Android app, the eBook Pro web app and this website.')}
<section><div class="wrap narrow prose">
${updatedLine(site.updated.privacy)}
${toc(sections)}

<h2 id="who">1. Who we are and what this covers</h2>
<p>eBook Pro is a reading and learning app developed by <strong>${site.developer.name}</strong>, ${site.developer.location} (“we”, “us”). This policy covers the eBook Pro Android app (package <code>${site.android.packageName}</code>), the web app at ${site.webAppUrl.replace('https://', '')}, and this website. It describes what the apps actually do today. Contact: ${mail}.</p>

<h2 id="summary">2. Summary</h2>
<ul>
<li>You can read without an account. <strong>Books you import, your reading progress, highlights, flashcards and streaks stay on your device</strong> (or in your browser for the web app). We do not upload them.</li>
<li>If you create an account, we store your account details and a few account-related records online (see section 3).</li>
<li>If you use <strong>AI explanations</strong> (Premium), the text you select and its surrounding paragraph are sent through our server to Google’s Gemini.</li>
<li>We do not sell your personal information. The app does not include an advertising SDK or a dedicated analytics or crash-reporting SDK.</li>
<li>You can delete your account in the app or at <a href="/delete-account/">Account &amp; data deletion</a>.</li>
</ul>

<h2 id="collect">3. Information we collect</h2>
<p>Only the categories below are collected, and only if you use the related feature.</p>
${table(
    ['Category', 'What', 'Why', 'Where it is stored'],
    [
      ['Account', 'Sign-in identifier (email, phone number or username), display name, optional recovery email and recovery phone, account ID, creation time. For Google sign-in, the profile details Google returns.', 'Create and secure your account; account recovery; show your name on reviews.', 'Google Firebase Authentication and Cloud Firestore'],
      ['Password', 'Handled by Firebase Authentication. We cannot read it. Username accounts use an internal “shadow” email address created by the app.', 'Authentication.', 'Firebase Authentication'],
      ['Profile photo (optional)', 'An image you choose, uploaded from your photo library.', 'Show your avatar.', 'Firebase Storage (the image link is publicly readable)'],
      ['Store library', 'Which store books or newspapers you saved or bought.', 'Let you re-open books you own.', 'Cloud Firestore'],
      ['Reviews and reports', 'Review text and rating you post; reports you file against a review.', 'Show reviews; moderate abuse.', 'Cloud Firestore'],
      ['Community highlights (optional)', 'When you share a highlight in a store book: the book, and the character range. The count of readers who highlighted a range is stored; your identity is not.', 'Show popular passages.', 'Cloud Firestore'],
      ['AI request data', 'Selected text, surrounding paragraph, language, your sign-in token (see section 6). A per-day request counter is saved to your account.', 'Provide AI explanations and enforce limits.', 'Processed by Google Cloud Functions and Google Gemini; counter in Firestore'],
      ['Premium status and payment', 'A Premium flag and activation time on your account. Payment is made through Razorpay; we receive confirmation that a payment succeeded, not your card or UPI details. Your email and phone are passed to Razorpay checkout to pre-fill it.', 'Activate Premium; support.', 'Cloud Firestore; payment records are held by Razorpay'],
      ['Notification setting', 'If you turn on notifications, the app asks the operating system for permission and uses Firebase Cloud Messaging.', 'Optional notifications.', 'Google Firebase Cloud Messaging'],
      ['Search and lookups', 'Text you type into store search, or a word you look up on Wikipedia (see section 7).', 'Return results.', 'Sent to the services listed in section 7; not stored by us'],
    ],
    'Information we collect'
  )}
<p>We do <strong>not</strong> collect your contacts, precise location, microphone, camera or advertising ID. The app does not include a dedicated analytics or crash-reporting SDK (Google’s Firebase and ML Kit components it uses may process basic technical data as described by Google). The Android app declares internet access; it asks for photo access only when you pick a profile photo, and for notification permission only if you turn notifications on. Your Google Play listing and Android system settings show the final permission list.</p>

<h2 id="device">4. Data that stays on your device</h2>
<p>The following are saved only on your device (in your browser for the web app) and are not sent to us: imported book files, reading progress and position, highlights and pen annotations, flashcards and study schedule, reading streaks and statistics, and app settings. Uninstalling the app or clearing browser data removes them. We cannot recover them for you.</p>

<h2 id="use">5. How we use information</h2>
<ul><li>To create and secure your account, sign you in and let you recover access.</li><li>To provide features you ask for: store downloads, reviews, community highlights, AI explanations, Premium.</li><li>To enforce usage limits and prevent abuse.</li><li>To process and support Premium purchases.</li><li>To respond to your support requests.</li></ul>
<p>We do not use your data for advertising, and we do not sell it.</p>

<h2 id="ai">6. AI features</h2>
<p>AI explanations are available to Premium accounts. When you request one, the app sends the selected text, its surrounding paragraph, the output language and your sign-in token over HTTPS to a Google Cloud function that we operate. The function verifies your account and Premium status, counts the request against your daily limit (${premium.aiDailyLimit} per day), and sends the text to a Google Gemini model to produce the explanation. The Gemini API key is held on our server, not in the app.</p>
<p>To avoid repeating identical requests, the function caches the answer in Firestore under a one-way hash of the text, context and language. The cache holds the answer text and a timestamp, not your account ID. Google handles data sent to the Gemini API under its own terms; please review Google’s documentation. Please do not select sensitive personal information. See also <a href="/ai/">AI</a>.</p>
<p>Translation, OCR and read-aloud run on your device and do not send your text to us.</p>

<h2 id="third">7. Third-party services</h2>
<p>These are the external services that eBook Pro actually uses.</p>
${table(
    ['Service', 'Why', 'Data it may process', 'Required?'],
    [
      ['Google Firebase (Authentication, Cloud Firestore, Cloud Storage, Cloud Functions, Cloud Messaging, Hosting)', 'Accounts, our database, file storage, server functions, notifications, hosting the web app.', 'Account details, store library, reviews, avatar, AI counters, device tokens for notifications, technical logs.', 'Required for accounts and online features; not for reading your own books.'],
      ['Google Sign-In', 'Optional sign-in with Google.', 'Google account email, name and photo returned to the app.', 'Optional.'],
      ['Sign in with Apple', 'The app contains Apple sign-in code; it is not an announced method yet.', 'Name and email if used.', 'Optional.'],
      ['Google Gemini API', 'Generates AI explanations.', 'Selected text and surrounding paragraph (via our server).', 'Only if you use AI explanations (Premium).'],
      ['Google ML Kit', 'On-device translation and OCR. Translation language models are downloaded from Google on demand.', 'Processing is on your device. Model download requests reveal normal network information (such as IP address) to Google.', 'Only if you use those features.'],
      ['Gmail (SMTP)', 'Sends the password-reset code to the recovery email of username accounts.', 'Recovery email address and the code.', 'Only if you reset a username-account password.'],
      ['Razorpay', 'Takes Premium payments.', 'Payment details you enter at checkout; pre-filled email and phone.', 'Only if you buy Premium.'],
      ['Wikipedia (Wikimedia)', 'Short summaries for a selected word.', 'The word you look up.', 'Only when you tap Wikipedia.'],
      ['Book and research catalogues: Google Books, Open Library, Internet Archive, Project Gutenberg (Gutendex), arXiv, Semantic Scholar, Crossref', 'Store search, book details and public downloads.', 'Your search words, and the requests needed to download a file.', 'Only when you search or download.'],
      ['News sources (a NewsAPI mirror and Inshorts) and Unsplash', 'Headlines and placeholder images in the store.', 'Standard request information such as IP address.', 'Only when you browse news.'],
      ['Google Play', 'Distributes the Android app. Google may provide us aggregated install and stability data.', 'Per Google’s own policies.', 'If you install from Google Play.'],
    ],
    'Third-party services'
  )}
<p>Each service has its own privacy policy. We share data with them only as described here, to run the features above. We do not share data for advertising.</p>

<h2 id="visible">8. What other people can see</h2>
<ul><li>Your <strong>display name and profile photo</strong> appear next to reviews you post.</li><li>Your profile photo is stored at a web address that is publicly readable if someone has the link.</li><li>Community highlights show anonymous counts only.</li></ul>

<h2 id="security">9. Security</h2>
<p>We use industry-standard services and safeguards, described on our <a href="/security/">Security</a> page: HTTPS for network traffic, Firebase Authentication, access rules on our database and storage, server-side verification of Premium status, and keeping API secrets on the server. No online service can promise absolute security.</p>

<h2 id="retention">10. Retention and deletion</h2>
<p><strong>While your account exists</strong> we keep the records in section 3. <strong>When you delete your account</strong> (in the app, or at <a href="/delete-account/">Account &amp; data deletion</a>), our server permanently deletes: your profile and everything under it (store library, AI counters, settings), your username record, any pending password-reset code, your reviews, your profile photo, and your sign-in account. Reports you filed against others are kept for moderation but no longer carry your identity.</p>
<p><strong>What may remain:</strong> payment records held by Razorpay and by banks, which are kept under financial and legal rules and are not in our systems; anonymous community-highlight counts; cached AI answers that are not linked to you; and short-lived technical logs and residual copies that Google Cloud may keep for a limited period under its own policies. We do not intentionally keep separate long-term copies of your account data. Data on your device is removed by uninstalling the app or clearing browser data.</p>

<h2 id="choices">11. Your choices and rights</h2>
<p>You can use eBook Pro without an account, edit your name, photo and recovery details in My Account, turn community highlights and AI off in settings, and delete your account at any time. You may ask us for access to, correction of, or deletion of your data by emailing ${mail}. We will respond within a reasonable time and may need to verify that the request comes from you.</p>

<h2 id="children">12. Children</h2>
<p>eBook Pro is not directed at children under 13, and we do not knowingly collect their personal information. If you believe a child has created an account, contact us and we will delete it.</p>

<h2 id="transfers">13. Where data is processed</h2>
<p>Google Firebase and Google Cloud process data on servers that may be outside your country, including in the United States. Our AI function runs in Google Cloud’s us-central1 region. By using online features you understand your data may be transferred there.</p>

<h2 id="website">14. This website</h2>
<p>This website does not use cookies, advertising or analytics scripts, and its fonts are served from the site itself. Like any web host, the hosting provider (GitHub Pages) may log standard request data such as IP address. The <a href="/delete-account/">account deletion page</a> loads Google’s Firebase scripts so you can sign in to your account.</p>

<h2 id="changes">15. Changes to this policy</h2>
<p>When we change this policy we will update the date above and, for material changes, tell you in the app or on this site. Earlier versions are available on request.</p>

<h2 id="contact">16. Contact</h2>
<p>Privacy questions or requests: ${mail}<br>${site.developer.name}, ${site.developer.location}.</p>
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
<h2 id="ai">5. AI features</h2><p>AI explanations are generated by a third-party model and may be inaccurate or incomplete. Use them as a study aid, not as professional, legal, medical or financial advice. Do not submit sensitive personal information. Daily limits apply (${premium.aiDailyLimit} per day for Premium accounts at the time of writing).</p>
<h2 id="premium">6. Premium and payments</h2><p>Premium is described on the <a href="/premium/">Premium page</a>. It is paid through ${premium.provider}. Prices are shown at checkout. Cancellation and refunds are covered in the <a href="/refund-policy/">Refund &amp; Cancellation Policy</a>. We will not charge you without showing clearly what you are paying for.</p>
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
<h2>How Premium is paid</h2><p>Premium (${premium.priceDisplay}) is bought in the app and processed by ${premium.provider}. The app takes one payment and then activates Premium on your account. It does not currently set up automatic renewals.</p>
<h2>Cancellation</h2><p>Because there is no recurring charge today, there is nothing to cancel and you will not be billed again automatically. If we introduce recurring billing or an expiry date in future, we will show it clearly before you pay and update this policy first.</p>
<h2>Refunds</h2><p>Premium gives immediate access to AI features and premium content that use paid cloud services, so <strong>purchases are generally final and not refundable</strong>, and we do not give credits for partly used periods.</p>
<p>We will, however, help or refund you where:</p>
<ul><li>you were charged but Premium was not activated and we cannot fix it;</li><li>you were charged more than once for the same purchase;</li><li>a technical fault on our side prevented you from using what you paid for and we cannot resolve it; or</li><li>the law where you live gives you a right to a refund.</li></ul>
<h2>How to ask</h2><p>Email ${mail} within 7 days of the payment with the ${premium.provider} payment ID, the date, and the email or phone used. Approved refunds go back to the original payment method; timing depends on your bank or payment provider.</p>
<h2>Deleting your account</h2><p>Deleting your account ends your Premium access and does not by itself create a refund.</p>
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
<h2>Cloud data and access control</h2><p>Account data lives in Firebase (Firestore and Storage), protected by security rules that restrict who can read and write. Your Premium status can only be set by our server after a verified payment, not by the app. Payment checkout orders are created on our server, and payment confirmations are verified by signature before Premium is activated.</p>
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
