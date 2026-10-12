import { premium, site } from '../site.config.mjs';

// Documentation articles. To add one: append an object to the right category.
// { slug, title, summary, body (HTML) }. Order here = sidebar and prev/next order.
export const docCategories = [
  {
    title: 'Getting started',
    articles: [
      {
        slug: 'create-account', title: 'Create an account', summary: 'Sign-up methods and what an account is for.',
        body: `<p>You can read without an account. An account is needed to download store books, post reviews, use AI explanations and buy Premium.</p>
<p>On the sign-in screen you can create an account with:</p>
<ul><li>Email and password</li><li>Phone number and a one-time code (OTP)</li><li>A username and password</li><li>Google</li></ul>
<p>Add a <strong>recovery email</strong> in Settings → My Account. Username accounts need one to reset a forgotten password.</p>
<p>Sign in with Apple is part of the app’s code but is not an announced sign-in method yet.</p>`,
      },
      {
        slug: 'guest-mode', title: 'Use eBook Pro without an account', summary: 'What works signed out.',
        body: `<p>The bookshelf is local-first. Signed out, you can import your own PDF, EPUB and TXT books, read them, highlight, make flashcards, translate on-device, listen, and use focus mode and streaks.</p>
<p>Signed out, you cannot download store books, post reviews, use AI explanations or buy Premium.</p>`,
      },
      {
        slug: 'import-a-book', title: 'Import a book', summary: 'Add PDF, EPUB or TXT files.',
        body: `<ol><li>Open the bookshelf and tap the import button.</li><li>Pick a PDF, EPUB or TXT file from your device.</li><li>eBook Pro copies it into the app’s own storage, reads its details and adds it to your shelf.</li></ol>
<p>The original file is not changed. Imported files stay on your device (or, in the web app, in your browser) and are not uploaded to our servers. See <a href="/formats/">supported formats</a>.</p>`,
      },
      {
        slug: 'start-reading', title: 'Start reading', summary: 'Open a book and move around.',
        body: `<p>Tap a book to open it. Turn pages by dragging from the page edge (curl) or swiping (slide). Choose the style in Settings → App Settings → Page Turn Animation. Your position is saved automatically on this device.</p>`,
      },
      {
        slug: 'library-and-sync', title: 'Manage your library and understand sync', summary: 'What is stored where.',
        body: `<p><strong>On your device or browser:</strong> imported books, reading progress, highlights and pen annotations, flashcards, streaks and statistics, and app settings.</p>
<p><strong>In your online account:</strong> your profile, the store books you have saved or bought, your reviews, and daily AI usage counters.</p>
<div class="note warn"><strong>No cross-device sync yet</strong><p>Because reading data is stored locally, it does not move to another device when you sign in there. Cross-device sync is on the <a href="/roadmap/">roadmap</a> as “exploring”. Deleting the app or clearing browser data removes local data.</p></div>`,
      },
    ],
  },
  {
    title: 'Reading',
    articles: [
      { slug: 'reading-pdf', title: 'Reading PDFs', summary: 'Zoom, search, outline and margins.', body: `<p>PDF pages are shown as they appear in the original. Pinch to zoom and drag to pan. If the PDF has an outline, use the table of contents to jump between sections. Turn on <em>Auto-Crop PDF Margins</em> in settings to trim white borders. On wide screens, pages can appear as two-page spreads.</p>` },
      { slug: 'reading-epub', title: 'Reading EPUB and EPUB3', summary: 'How EPUB books are displayed.', body: `<p>EPUB 2 and EPUB 3 books open as reflowable text in eBook Pro’s own typography. Adjust theme and text settings to taste. The book’s own CSS is not applied, and images inside reflowable chapters are not displayed yet. Comics and picture books that are image-only fixed-layout EPUBs open as page images.</p>` },
      { slug: 'page-turning-and-zoom', title: 'Page turning and zoom', summary: 'Curl, slide and pinch-zoom.', body: `<p>Choose <em>curl</em> or <em>slide</em> page turning in settings. Pinch-to-zoom applies to PDF pages; for EPUB and TXT, change text settings instead.</p>` },
      { slug: 'search-in-book', title: 'Search inside a book', summary: 'Find text, including scanned pages.', body: `<p>Open search from the reader. For PDFs, search uses the embedded text. Pages that have no text layer (scans) are read with on-device OCR on Android and iOS the first time they are needed, so the first search of a scanned book can take a while. OCR is not available in the web app.</p>` },
      { slug: 'text-selection', title: 'Select text and look things up', summary: 'Definitions, Wikipedia, translation, AI.', body: `<p>Long-press a word to open the pop-up. It can show a dictionary definition (the bundled dictionary is currently small), a Wikipedia summary, a translation, and, for Premium readers, an AI explanation.</p>
<p>Wikipedia lookups send the selected word to Wikipedia. Translation runs on-device. See <a href="/privacy/">Privacy Policy</a>.</p>` },
      { slug: 'highlights', title: 'Highlights and annotations', summary: 'Pen, highlighter, flashcards.', body: `<p>Tap the edit button to annotate. Choose the pen or highlighter and a colour. With <em>Smart Highlight Snapping</em> on, the highlighter aligns to the line of text. When you finish a highlight you can turn it into a flashcard. Annotations are stored on your device.</p>` },
      { slug: 'flashcards', title: 'Flashcards', summary: 'Spaced-repetition study.', body: `<p>Long-press a book on the shelf and choose <em>Study deck</em>. Cards are created from your highlights by blanking the highlighted words in their sentence. Review with Again / Hard / Good / Easy; the scheduler (SM-2) decides when each card returns.</p>` },
      { slug: 'focus-and-streaks', title: 'Focus mode, goals and streaks', summary: 'Build a reading habit.', body: `<p>The focus timer runs 25-minute work and 5-minute break cycles by default and dims reading controls while it runs. A streak counts consecutive days with at least 15 minutes of reading (the default threshold). All of this is stored on your device.</p>` },
    ],
  },
  {
    title: 'AI',
    articles: [
      { slug: 'ai-explanations', title: 'AI explanations', summary: 'Ask for an explanation of a passage.', body: `<p>Select a word or passage, open the pop-up and choose the AI explanation. The reply streams in, in the language you choose. This is a <a href="/premium/">Premium</a> feature. It needs an internet connection and a signed-in account. Treat AI output as a study aid, not as authoritative fact.</p>` },
      { slug: 'translation', title: 'Translation', summary: 'On-device translation.', body: `<p>Translation uses Google ML Kit on your device. The first time you use a language, its model downloads (tens of MB), so use Wi-Fi if you are on a limited data plan. Afterwards it works offline. Your selected text is not sent to a translation server.</p>` },
      { slug: 'listen-mode', title: 'Listen (read aloud)', summary: 'Text-to-speech.', body: `<p>The listen button reads the page aloud with your device’s text-to-speech voices. Voice quality and available languages depend on your device. Turn the button on or off in settings.</p>` },
      { slug: 'ai-limits', title: 'AI limits', summary: `${premium.aiDailyLimit} requests per day.`, body: `<p>Premium accounts can make up to <strong>${premium.aiDailyLimit} AI explanation requests per day</strong>. The count resets at midnight UTC (05:30 IST). The pop-up shows how many uses are left. Repeated identical requests may be answered from a shared cache and still count towards your limit.</p>` },
      { slug: 'ai-privacy', title: 'Privacy considerations for AI', summary: 'What leaves your device.', body: `<p>When you request an explanation, eBook Pro sends the selected text, the surrounding paragraph, the target language and your sign-in token to our server, which forwards the text to Google’s Gemini API. Avoid selecting passages that contain sensitive personal information. Details: <a href="/ai/">AI</a> and <a href="/privacy/">Privacy Policy</a>.</p>` },
    ],
  },
  {
    title: 'Account',
    articles: [
      { slug: 'sign-in-and-out', title: 'Sign in and sign out', summary: 'Account basics.', body: `<p>Sign in from the account icon on the bookshelf. Sign out from Settings → My Account → Sign Out. Signing out does not delete books stored on this device.</p>` },
      { slug: 'account-security', title: 'Account security and password reset', summary: 'Recovery email and reset codes.', body: `<p>Set a recovery email in My Account. For username accounts, <em>Reset Password</em> emails a 6-digit code to your recovery email; it expires after 15 minutes. Never share the code. We will never ask for your password. Report problems at <a href="mailto:${site.supportEmail}">${site.supportEmail}</a>. See <a href="/security/">Security</a>.</p>` },
      { slug: 'delete-your-account', title: 'Delete your account', summary: 'In the app or on the web.', body: `<p>In the app: Settings → My Account → Delete My Account. Or use <a href="/delete-account/">Account &amp; data deletion</a> on this website. If you are asked to sign in again, that is a security step. Deletion is permanent.</p>` },
    ],
  },
  {
    title: 'Premium',
    articles: [
      { slug: 'premium-features', title: 'Premium features', summary: 'What Premium unlocks.', body: `<p>Premium unlocks AI explanations (up to ${premium.aiDailyLimit}/day) and access to books and newspapers in the store that are marked premium. See <a href="/premium/">Premium</a>.</p>` },
      { slug: 'billing-and-refunds', title: 'Billing, cancellation and refunds', summary: 'Payments and policy.', body: `<p>Premium is paid in the app through ${premium.provider}. Payment problems or a duplicate charge: email <a href="mailto:${site.supportEmail}">${site.supportEmail}</a> with the payment ID. Policy: <a href="/refund-policy/">Refund &amp; cancellation</a>.</p>` },
    ],
  },
  {
    title: 'Troubleshooting',
    articles: [
      { slug: 'sync-problems', title: 'My books or progress are missing', summary: 'Why data does not follow you.', body: `<p>Books, progress, highlights and flashcards are stored on the device or browser where you created them and do not sync between devices. If they vanished on one device, check that you are on the same device/browser, and that app or browser data was not cleared.</p>` },
      { slug: 'import-problems', title: 'Import problems', summary: 'When a book will not open.', body: `<ul><li>Check the format: PDF, EPUB or TXT only. DRM-protected files cannot be opened.</li><li>Try re-downloading the file; truncated files fail to parse.</li><li>Very large or scanned PDFs can be slow on first open.</li><li>If it still fails, email the format and file size (not the book) to <a href="mailto:${site.supportEmail}">${site.supportEmail}</a>.</li></ul>` },
      { slug: 'login-problems', title: 'Login problems', summary: 'Cannot sign in.', body: `<ul><li>Check the sign-in method you used originally (email, phone, username or Google).</li><li>Reset a username password with the recovery email you added.</li><li>Phone sign-in needs a working mobile network for the code.</li><li>Still stuck: contact <a href="/support/">support</a> from any email you can read.</li></ul>` },
      { slug: 'ai-problems', title: 'AI problems', summary: 'AI will not answer.', body: `<ul><li><strong>“Premium required”</strong>: AI explanations are Premium-only.</li><li><strong>Daily limit reached</strong>: wait for the reset at midnight UTC.</li><li><strong>Connection errors</strong>: AI needs the internet and a signed-in account.</li><li>Paid but still locked? Email support with the payment ID.</li></ul>` },
      { slug: 'reading-problems', title: 'Reading problems', summary: 'Display and performance.', body: `<ul><li>Try slide page-turning if curl animation feels slow on your device.</li><li>For scanned PDFs, wait for OCR to finish before searching.</li><li>Blank pages in an EPUB can mean images that are not shown yet; see <a href="/formats/">formats</a>.</li></ul>` },
    ],
  },
];

export const allDocs = docCategories.flatMap((c) => c.articles.map((a) => ({ ...a, category: c.title })));
