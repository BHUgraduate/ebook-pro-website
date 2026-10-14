// Newest first. Dates are real (ISO). Add a new object at the top for each release.
// Only list things that were implemented AND verified (tests or on-device) for that release.
export const changelog = [
  {
    version: '1.1.1 (build 4)',
    date: '2026-10-14',
    kind: 'App',
    added: [],
    changed: [
      'If you open a sign-in link on a device that did not request it (for example, a link emailed to you but opened on another phone), eBook Pro now asks you to confirm your email address instead of doing nothing.',
    ],
    fixed: [
      'Email sign-in links (magic links) now open eBook Pro and sign you in. The release signing key was not registered for the app’s sign-in link domain, so Android opened the link in the browser instead of the app.',
      'Sign-in link errors (expired, already used, wrong email, no connection) now show a clear message instead of failing silently.',
      'A sign-in link is redeemed once, and screens such as the phone-code screen are closed after you are signed in.',
      'Web app: opening an email sign-in link in the browser now completes the sign-in.',
    ],
  },
  {
    version: '1.1.0 (build 3)',
    date: '2026-10-13',
    kind: 'App',
    added: [
      'Translate button in the selected-text toolbar for PDF and EPUB. The source language is detected automatically, and you can change the source or target language in the card; about 30 languages are offered, with Hindi first.',
      'Hindi translation in both directions (Hindi \u2194 English), including mixed Hindi and English text.',
      'Hindi Wikipedia: Hindi text is looked up on hi.wikipedia.org (falling back to English), with title, summary, thumbnail and a link to the article. Unrelated search hits are no longer shown.',
      'Hindi OCR: scanned pages are read in Latin and Devanagari scripts. PDFs whose built-in text is stored in a form that breaks Hindi (detached or reordered vowel signs) are detected and re-read with OCR, so selection and copy are correct.',
      'Bundled Noto Sans and Noto Serif Devanagari fonts, so Hindi renders the same on every device, in the reader, the notes editor, exports and the web app.',
      'Hindi notes: create, rename, edit, search and save in Hindi. Note search now ignores case for every script (not only English), treats equivalent Devanagari spellings as equal, and snippets never cut a letter in half.',
      'PDF export of Hindi notes is correctly shaped (conjuncts and vowel signs) and the text stays searchable; EPUB export embeds the Devanagari font and sets the book language.',
      'The in-app Privacy Policy is now the full, current policy from the website, with a contents list, links and a date, instead of a short placeholder. The website and the app share one source.',
      'Notes, Edit / Write, collections and export are now described on the Features page.',
    ],
    changed: [
      'The default translation language is Hindi.',
      'The AI explanation request now sends the surrounding paragraph for EPUB long-presses too, asks for the answer in your chosen language, and handles expired sign-in tokens by refreshing once.',
      'The About/Settings version is read from one constant that a test keeps equal to the app version.',
      'The translation card was redesigned: it opens on the translation, copies results, and stays on screen in portrait, landscape and on tablets.',
    ],
    fixed: [
      'Translation never worked in the EPUB reader and returned nothing in the PDF reader (a placeholder translator was used); both now use the real translator.',
      'AI explanations could spin forever if the connection stalled or the server returned no text; they now time out, keep partial answers, and show a clear message. Premium, sign-in and daily-limit rejections each have their own message.',
      'Web app: the local database files were missing from the web build.',
      'Large text sizes no longer overflow the lookup card.',
    ],
  },
  {
    version: 'Website 2.0',
    date: '2026-10-11',
    kind: 'Website',
    added: [
      'Official product site with Features, Formats, AI, Premium, Download, Docs, FAQ, Roadmap and Support pages.',
      'A single Privacy Policy, Terms of Service, Refund & Cancellation Policy and Security page, written from the app\u2019s actual behaviour.',
      'Account and data deletion page that signs you in and deletes your account on our servers.',
    ],
    changed: [
      'Feature, pricing and AI-limit statements were corrected to match the app. Cloud sync of books and annotations is no longer advertised because it is not implemented.',
    ],
    fixed: ['Replaced the single-page legal text with dedicated, linkable pages.'],
  },
];
export const changelogNote = 'Release notes list what was implemented and verified for each release.';
