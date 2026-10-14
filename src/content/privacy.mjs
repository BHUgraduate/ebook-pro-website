// The eBook Pro Privacy Policy — the SINGLE source of truth.
//
// It is rendered to HTML for /privacy/ and exported as /privacy-policy.json, which the app bundles
// (assets/legal/privacy_policy.json) so the in-app policy screen shows exactly this text.
//
// Text uses a tiny inline markup: **bold**, `code`, [label](url). A block is one of:
//   'a paragraph string'
//   { ul: ['item', …] }
//   { table: { caption, head: [...], rows: [[...], …] } }  (first column is the row header)
import { site, premium } from '../site.config.mjs';

const mail = `[${site.supportEmail}](mailto:${site.supportEmail})`;

export const privacySections = [
  {
    id: 'who',
    title: '1. Who we are and what this covers',
    blocks: [
      `eBook Pro is a reading and learning app developed by **${site.developer.name}**, ${site.developer.location} (“we”, “us”). This policy covers the eBook Pro Android app (package \`${site.android.packageName}\`), the web app at ${site.webAppUrl.replace('https://', '')}, and this website. It describes what the apps actually do today. Contact: ${mail}.`,
    ],
  },
  {
    id: 'summary',
    title: '2. Summary',
    blocks: [
      {
        ul: [
          'You can read without an account. **Books you import, your reading progress, highlights, notes, flashcards and streaks stay on your device** (or in your browser for the web app). We do not upload them.',
          'If you create an account, we store your account details and a few account-related records online (see section 3).',
          'If you use **AI explanations** (Premium), the text you select and its surrounding paragraph are sent through our server to Google’s Gemini.',
          'On Android, **translation and OCR run on your device**. In the web app, translation is performed by an online translation service and the text you translate is sent to it (see sections 6 and 7).',
          'We do not sell your personal information. The app does not include an advertising SDK or a dedicated analytics or crash-reporting SDK.',
          'You can delete your account in the app or at [Account & data deletion](/delete-account/).',
        ],
      },
    ],
  },
  {
    id: 'collect',
    title: '3. Information we collect',
    blocks: [
      'Only the categories below are collected, and only if you use the related feature.',
      {
        table: {
          caption: 'Information we collect',
          head: ['Category', 'What', 'Why', 'Where it is stored'],
          rows: [
            ['Account', 'Sign-in identifier (email, phone number or username), display name, optional recovery email and recovery phone, account ID, creation time. For Google sign-in, the profile details Google returns.', 'Create and secure your account; account recovery; show your name on reviews.', 'Google Firebase Authentication and Cloud Firestore'],
            ['Password', 'Handled by Firebase Authentication. We cannot read it. Username accounts use an internal “shadow” email address created by the app.', 'Authentication.', 'Firebase Authentication'],
            ['Profile photo (optional)', 'An image you choose, uploaded from your photo library.', 'Show your avatar.', 'Firebase Storage (the image link is publicly readable)'],
            ['Store library and wishlist', 'Which store books or newspapers you saved or bought, and the books you marked with a heart (your wishlist: the book’s catalogue details and when you added it).', 'Let you re-open books you own and keep your wishlist when you refresh, reinstall or change device.', 'Cloud Firestore'],
            ['Public profile', 'Your username, display name and profile photo link, copied to a separate public record so it can be shown next to your reviews. It holds no email, phone number or Premium status.', 'Show your name on reviews without exposing private details.', 'Cloud Firestore'],
            ['Reviews and reports', 'Review text and rating you post; reports you file against a review.', 'Show reviews; moderate abuse.', 'Cloud Firestore'],
            ['Community highlights (optional)', 'When you share a highlight in a store book: the book, and the character range. The count of readers who highlighted a range is stored; your identity is not.', 'Show popular passages.', 'Cloud Firestore'],
            ['AI request data', 'Selected text, surrounding paragraph, language, your sign-in token (see section 6). A per-day request counter is saved to your account.', 'Provide AI explanations and enforce limits.', 'Processed by Google Cloud Functions and Google Gemini; counter in Firestore'],
            ['Premium status and payment', 'A Premium flag and activation time on your account. Payment is made through Razorpay; we receive confirmation that a payment succeeded, not your card or UPI details. Your email and phone are passed to Razorpay checkout to pre-fill it. Our server keeps a minimal record of each verified payment (payment and order ID, amount, what was bought and your account ID) so a purchase can be checked, restored and refunded.', 'Activate Premium or unlock a paid book; restore a purchase; support and accounting.', 'Cloud Firestore; payment details are held by Razorpay'],
            ['Notifications', 'Daily reading reminders are scheduled on your device and use your reminder time and whether you have reached today’s reading goal; nothing about them is sent to us. If you keep update alerts on, your device subscribes to a Firebase Cloud Messaging topic so we can announce new versions. The app asks the operating system for permission first, and you can turn either off in Settings.', 'Optional reminders and update alerts.', 'On your device; Google Firebase Cloud Messaging for update alerts'],
            ['Search and lookups', 'Text you type into store search, a word or phrase you look up on Wikipedia, and — in the web app only — text you translate (see section 7).', 'Return results.', 'Sent to the services listed in section 7; not stored by us'],
          ],
        },
      },
      'We do **not** collect your contacts, precise location, camera or advertising ID. The Android app uses the **microphone** only while you record a voice note (you start and stop it yourself); the recording is saved in the app on your device and is never sent to us. The app does not include a dedicated analytics or crash-reporting SDK (Google’s Firebase and ML Kit components it uses may process basic technical data as described by Google). The Android app declares internet access; it asks for photo access only when you pick a profile photo, for microphone access only the first time you record a voice note, and for notification permission only if you turn notifications on. Your Google Play listing and Android system settings show the final permission list.',
    ],
  },
  {
    id: 'device',
    title: '4. Data that stays on your device',
    blocks: [
      'The following are saved only on your device (in your browser for the web app) and are not sent to us: imported book files and web articles (with the address each came from), reading progress and position, highlights and pen annotations, **notes and handwriting you write (including exported files, which you save or share yourself)**, text recognised from scanned pages (OCR), translations made for bilingual reading (kept so a paragraph is not translated twice), flashcards and study schedule, **My Dictionary** (the words, meanings and notes you save), **voice notes** (the audio you record and any title or transcript you type), passages you save and the AI answers, translations and Wikipedia summaries you choose to keep, the collections, canvases and research workspaces you put these in, and the places in your books that saved items point to, search across your notes, highlights, cards and words (it runs on the device and sends nothing), reading streaks and statistics, and app settings. Files you export from the app (for example a flashcard or dictionary CSV) are created on your device and shared only where you choose. Uninstalling the app or clearing browser data removes them. We cannot recover them for you.',
    ],
  },
  {
    id: 'use',
    title: '5. How we use information',
    blocks: [
      {
        ul: [
          'To create and secure your account, sign you in and let you recover access.',
          'To provide features you ask for: store downloads, reviews, community highlights, AI explanations, Premium.',
          'To enforce usage limits and prevent abuse.',
          'To process and support Premium purchases.',
          'To respond to your support requests.',
        ],
      },
      'We do not use your data for advertising, and we do not sell it.',
    ],
  },
  {
    id: 'ai',
    title: '6. AI, translation and OCR',
    blocks: [
      `**AI explanations** are available to Premium accounts. When you request one, the app sends the selected text, its surrounding paragraph, the output language, what you asked for (explain, simplify, summarize or examples) and your sign-in token over HTTPS to a Google Cloud function that we operate. The function verifies your account and Premium status, counts the request against your daily limit (${premium.aiDailyLimit} per day), and sends the text to a Google Gemini model to produce the explanation. The Gemini API key is held on our server, not in the app.`,
      'To avoid repeating identical requests, the function caches the answer in Firestore under a one-way hash of the text, context, language and the kind of answer asked for. The cache holds the answer text and a timestamp, not your account ID. Google handles data sent to the Gemini API under its own terms; please review Google’s documentation. Please do not select sensitive personal information. See also [AI](/ai/).',
      '**Translation.** In the Android app, translation runs on your device with Google ML Kit; the selected text is not sent to us or to a translation server. The first time you use a language, its model is downloaded from Google. In the **web app**, on-device models are not available, so when you tap Translate the selected text is sent over HTTPS to the MyMemory translation service (api.mymemory.translated.net), which returns the translation. It is not sent to our servers.',
      '**OCR** (reading text from scanned pages and images, including Hindi/Devanagari) and **read-aloud** run on your device and do not send your pages or text to us.',
    ],
  },
  {
    id: 'third',
    title: '7. Third-party services',
    blocks: [
      'These are the external services that eBook Pro actually uses.',
      {
        table: {
          caption: 'Third-party services',
          head: ['Service', 'Why', 'Data it may process', 'Required?'],
          rows: [
            ['Google Firebase (Authentication, Cloud Firestore, Cloud Storage, Cloud Functions, Cloud Messaging, Hosting)', 'Accounts, our database, file storage, server functions, notifications, hosting the web app.', 'Account details, store library, reviews, avatar, AI counters, device tokens for notifications, technical logs.', 'Required for accounts and online features; not for reading your own books.'],
            ['Google Sign-In', 'Optional sign-in with Google.', 'Google account email, name and photo returned to the app.', 'Optional.'],
            ['Sign in with Apple', 'The app contains Apple sign-in code; it is not an announced method yet.', 'Name and email if used.', 'Optional.'],
            ['Google Gemini API', 'Generates AI explanations.', 'Selected text and surrounding paragraph (via our server).', 'Only if you use AI explanations (Premium).'],
            ['Google ML Kit', 'On-device translation, language identification and OCR (Latin and Devanagari). Translation language models are downloaded from Google on demand.', 'Processing is on your device. Model download requests reveal normal network information (such as IP address) to Google.', 'Only if you use those features on Android.'],
            ['MyMemory (translated.net)', 'Translation in the web app, where on-device models are not available.', 'The text you choose to translate and its language pair, plus normal request information such as IP address.', 'Only if you tap Translate in the web app.'],
            ['Gmail (SMTP)', 'Sends the password-reset code to the recovery email of username accounts.', 'Recovery email address and the code.', 'Only if you reset a username-account password.'],
            ['Razorpay', 'Takes Premium payments.', 'Payment details you enter at checkout; pre-filled email and phone.', 'Only if you buy Premium.'],
            ['Wikipedia (Wikimedia): en.wikipedia.org and hi.wikipedia.org', 'Short summaries, links and a thumbnail for a selected word or phrase, in English or Hindi.', 'The word or phrase you look up; the thumbnail is loaded from Wikimedia.', 'Only when you tap Wikipedia.'],
            ['Book and research catalogues: Google Books, Open Library, Internet Archive, Project Gutenberg (Gutendex), arXiv, Semantic Scholar, Crossref', 'Store search, book details and public downloads.', 'Your search words, and the requests needed to download a file.', 'Only when you search or download.'],
            ['Web pages you import (Android app)', 'Saves an article you choose to your library, to read offline.', 'The app downloads the page you entered directly from its website, which sees a normal request (such as your IP address), as when you open it in a browser. The address and the page do not go through our servers.', 'Only when you import a web page.'],
            ['News sources (a NewsAPI mirror and Inshorts) and Unsplash', 'Headlines and placeholder images in the store.', 'Standard request information such as IP address.', 'Only when you browse news.'],
            ['Google Play', 'Distributes the Android app. Google may provide us aggregated install and stability data.', 'Per Google’s own policies.', 'If you install from Google Play.'],
          ],
        },
      },
      'Each service has its own privacy policy. We share data with them only as described here, to run the features above. We do not share data for advertising.',
    ],
  },
  {
    id: 'visible',
    title: '8. What other people can see',
    blocks: [
      {
        ul: [
          'Your **display name, username and profile photo** appear next to reviews you post, from a separate public profile record. Your email address, phone number, wishlist and Premium status are private to your account.',
          'Your profile photo is stored at a web address that is publicly readable if someone has the link.',
          'Community highlights show anonymous counts only.',
        ],
      },
    ],
  },
  {
    id: 'security',
    title: '9. Security',
    blocks: [
      'We use industry-standard services and safeguards, described on our [Security](/security/) page: HTTPS for network traffic, Firebase Authentication, access rules on our database and storage, server-side verification of Premium status, and keeping API secrets on the server. No online service can promise absolute security.',
    ],
  },
  {
    id: 'retention',
    title: '10. Retention and deletion',
    blocks: [
      '**While your account exists** we keep the records in section 3. **When you delete your account** (in the app, or at [Account & data deletion](/delete-account/)), our server permanently deletes: your profile and everything under it (store library, wishlist, AI counters, settings), your public profile, your username record, any pending password-reset code, your reviews, your profile photo, and your sign-in account. Reports you filed against others are kept for moderation but no longer carry your identity.',
      '**What may remain:** payment records held by Razorpay and by banks, which are kept under financial and legal rules; the minimal payment record our server keeps for each verified payment (payment and order ID, amount, what was bought and your account ID), kept for accounting, refunds and legal reasons; anonymous community-highlight counts; cached AI answers that are not linked to you; and short-lived technical logs and residual copies that Google Cloud may keep for a limited period under its own policies. We do not intentionally keep separate long-term copies of your account data. Data on your device is removed by uninstalling the app or clearing browser data.',
    ],
  },
  {
    id: 'choices',
    title: '11. Your choices and rights',
    blocks: [
      `You can use eBook Pro without an account, edit your name, photo and recovery details in My Account, turn community highlights and AI off in settings, and delete your account at any time. You may ask us for access to, correction of, or deletion of your data by emailing ${mail}. We will respond within a reasonable time and may need to verify that the request comes from you.`,
    ],
  },
  {
    id: 'children',
    title: '12. Children',
    blocks: ['eBook Pro is not directed at children under 13, and we do not knowingly collect their personal information. If you believe a child has created an account, contact us and we will delete it.'],
  },
  {
    id: 'transfers',
    title: '13. Where data is processed',
    blocks: ['Google Firebase and Google Cloud process data on servers that may be outside your country, including in the United States. Our AI function runs in Google Cloud’s us-central1 region. By using online features you understand your data may be transferred there.'],
  },
  {
    id: 'website',
    title: '14. This website',
    blocks: ['This website does not use cookies, advertising or analytics scripts, and its fonts are served from the site itself. Like any web host, the hosting provider (GitHub Pages) may log standard request data such as IP address. The [account deletion page](/delete-account/) loads Google’s Firebase scripts so you can sign in to your account.'],
  },
  {
    id: 'changes',
    title: '15. Changes to this policy',
    blocks: ['When we change this policy we will update the date above and, for material changes, tell you in the app or on this site. Earlier versions are available on request.'],
  },
  {
    id: 'contact',
    title: '16. Contact',
    blocks: [`Privacy questions or requests: ${mail}\n${site.developer.name}, ${site.developer.location}.`],
  },
];
