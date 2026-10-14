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
<div class="note warn"><strong>What sync covers</strong><p>With <strong>Settings → Sync</strong> turned on (signed in), your notes, highlights, bookmarks, flashcards, dictionary, collections, saved passages, canvases, research workspaces and voice notes follow you to your other devices. Book files, reading positions and pen marks stay on the device where you made them. Without Sync, everything stays local, and deleting the app or clearing browser data removes it.</p></div>`,
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
<p>Wikipedia lookups send the selected word or phrase to Wikipedia (Hindi text goes to hi.wikipedia.org). On Android, translation runs on-device; in the web app the text you translate is sent to an online translation service. See <a href="/privacy/">Privacy Policy</a>.</p>` },
      { slug: 'highlights', title: 'Highlights and annotations', summary: 'Pen, highlighter, flashcards.', body: `<p>Tap the edit button to annotate. Choose the pen or highlighter and a colour. With <em>Smart Highlight Snapping</em> on, the highlighter aligns to the line of text. When you finish a highlight you can turn it into a flashcard. Annotations are stored on your device.</p>` },
      { slug: 'flashcards', title: 'Flashcards', summary: 'Spaced-repetition study.', body: `<p>Long-press a book on the shelf and choose <em>Study deck</em>. Cards are created from your highlights by blanking the highlighted words in their sentence. Review with Again / Hard / Good / Easy; the scheduler (SM-2) decides when each card returns.</p>` },
      { slug: 'focus-and-streaks', title: 'Focus mode, goals and streaks', summary: 'Build a reading habit.', body: `<p>The focus timer runs 25-minute work and 5-minute break cycles by default and dims reading controls while it runs. A streak counts consecutive days with at least 15 minutes of reading (the default threshold). All of this is stored on your device.</p>` },
    ],
  },
  {
    title: 'AI',
    articles: [
      { slug: 'ai-explanations', title: 'AI explanations', summary: 'Ask for an explanation of a passage.', body: `<p>Select a word or passage, open the pop-up and choose the AI explanation. The reply streams in, in the language you choose. This is a <a href="/premium/">Premium</a> feature. It needs an internet connection and a signed-in account. Treat AI output as a study aid, not as authoritative fact.</p>` },
      { slug: 'search-everything', title: 'Search everything', summary: 'One search for your whole library.', body: `<p>Tap the search button next to <strong>Home</strong> or <strong>Library</strong> (or press Ctrl or Cmd + K on a keyboard). Type a word: eBook Pro looks through book titles and authors, your notes, highlights, flashcards and My Dictionary at once, in English, Hindi and other scripts.</p>
<p>Each result shows where it came from. Tap a highlight or a flashcard to open the exact page in the book, tap a note to open it, tap a word to open it in My Dictionary. Results that come from a book also have a second button (for example <em>Open note</em> or <em>Open source</em>). With the box empty, the same screen lists quick actions such as New note, Your Cards and Settings.</p>
<p>Search runs on your device. Nothing you type is sent anywhere.</p>` },
      { slug: 'my-dictionary', title: 'My Dictionary and flashcards', summary: 'Keep words and review them.', body: `<p>Select a word or phrase while reading and tap <strong>Translate</strong>. Under the result you can tap <strong>Save word</strong> (a word or short phrase), <strong>Save as note</strong> or <strong>Flashcard</strong>. The same buttons appear under an AI answer and a Wikipedia summary. Everything you save remembers the book and page it came from.</p>
<p>Open <strong>My Dictionary</strong> from the Tools button (the grid icon next to the search button) to search, edit, add your own words and notes, turn a word into a flashcard or jump back to the page where you found it. <strong>Your Cards</strong> lists every flashcard from every book and lets you review everything that is due. Both screens can export a CSV file that opens in Anki, Excel, Numbers or Google Sheets.</p>
<p>Your dictionary and flashcards are stored on your device only. They are not uploaded and are not backed up by us, so export them if you want a copy.</p>` },
      { slug: 'translation', title: 'Translation', summary: 'English, Hindi and more.', body: `<p>Select text in a PDF or EPUB and tap <strong>Translate</strong> (or long-press a word). eBook Pro detects the language of the selection and translates it into your chosen language; pick a different source or target in the pop-up. If the text is already in your language, it translates the other way, so Hindi becomes English and English becomes Hindi.</p>
<p><strong>Android:</strong> translation uses Google ML Kit on your device. The first time you use a language, its pack downloads (tens of MB), so use Wi-Fi if you are on a limited data plan; afterwards it works offline and your text is not sent anywhere.</p>
<p><strong>Web app:</strong> on-device models are not available in a browser, so the text you translate is sent to the MyMemory online translation service. It has a free daily limit; when it is reached the pop-up says so.</p>
<p>Long selections are split automatically; very long ones are shortened and the pop-up tells you. Use <em>Copy</em> to copy the translation.</p>` },
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
      { slug: 'premium-features', title: 'Premium features', summary: 'What Premium unlocks.', body: `<p>Premium (${premium.pricePerPeriod}, renews monthly until cancelled) unlocks AI explanations and summaries (up to ${premium.aiDailyLimit} requests a day), the knowledge canvas, research workspaces with cited AI answers, bilingual reading, Word (.docx) export and cloud sync. Reading, notes, highlights, OCR, translation, flashcards and voice notes stay free. If Premium ends, nothing you made is deleted; you cannot create new canvases or workspaces, use AI or Word export, or sync until you subscribe again.</p><p>Paid store books are bought one by one and are not part of Premium.</p>` },
      { slug: 'billing-and-refunds', title: 'Billing, cancellation and refunds', summary: 'Monthly billing, cancelling, refunds.', body: `<p>Premium is a monthly subscription at ${premium.pricePerPeriod}, paid through ${premium.provider}. To cancel: Settings → Premium → Cancel subscription; Premium stays on until the end of the paid month. On a new device or if a payment did not register: Settings → Premium → Restore purchases. Payment problems or a duplicate charge: email <a href="mailto:${site.supportEmail}">${site.supportEmail}</a> with the ${premium.provider} payment ID. See the <a href="/refund-policy/">refund policy</a>.</p>` },
    ],
  },
  {
    title: 'Troubleshooting',
    articles: [
      { slug: 'sync-problems', title: 'My books or progress are missing', summary: 'What follows you and what does not.', body: `<p>Book files and reading positions are stored on the device or browser where you created them and do not sync. Notes, highlights, bookmarks, flashcards, your dictionary, collections, canvases, research workspaces and voice notes sync only when <strong>Settings → Sync</strong> is on and you are signed in with the same account on both devices. If something is missing, check that Sync is on (it shows when it last synced and any waiting changes), that you are signed in to the same account, and that app or browser data was not cleared.</p>` },
      { slug: 'import-problems', title: 'Import problems', summary: 'When a book will not open.', body: `<ul><li>Check the format: PDF, EPUB or TXT only. DRM-protected files cannot be opened.</li><li>Try re-downloading the file; truncated files fail to parse.</li><li>Very large or scanned PDFs can be slow on first open.</li><li>If it still fails, email the format and file size (not the book) to <a href="mailto:${site.supportEmail}">${site.supportEmail}</a>.</li></ul>` },
      { slug: 'login-problems', title: 'Login problems', summary: 'Cannot sign in.', body: `<ul><li>Check the sign-in method you used originally (email, phone, username or Google).</li><li>Reset a username password with the recovery email you added.</li><li>Phone sign-in needs a working mobile network for the code.</li><li>Choose a username password of at least 8 characters that is not a common one and does not contain your username.</li><li>Email sign-in sends a one-time link. Open it on the phone where eBook Pro is installed, ideally using the same device you requested it from. If you open it somewhere else, eBook Pro asks you to type the email address. Links expire and work once, so request a new one if you see an expired-link message. Update to version 1.1.1 or later: earlier versions could open the link in the browser instead of the app.</li><li>Still stuck: contact <a href="/support/">support</a> from any email you can read.</li></ul>` },
      { slug: 'ai-problems', title: 'AI problems', summary: 'AI will not answer.', body: `<ul><li><strong>“Premium”</strong>: AI is part of Premium (${premium.pricePerPeriod}). If you subscribed, open Settings → Premium → Restore purchases.</li><li><strong>Daily limit reached</strong>: wait for the reset at midnight UTC.</li><li><strong>Connection errors</strong>: AI needs the internet and a signed-in account.</li><li>Paid but still locked? Email support with the payment ID.</li></ul>` },
      { slug: 'reading-problems', title: 'Reading problems', summary: 'Display and performance.', body: `<ul><li>Try slide page-turning if curl animation feels slow on your device.</li><li>For scanned PDFs, wait for OCR to finish before searching.</li><li>Blank pages in an EPUB can mean images that are not shown yet; see <a href="/formats/">formats</a>.</li></ul>` },
    ],
  },
];

export const allDocs = docCategories.flatMap((c) => c.articles.map((a) => ({ ...a, category: c.title })));
