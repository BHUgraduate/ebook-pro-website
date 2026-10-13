// Single source of truth for facts that appear in many places.
// Change a value here, run `npm run build`, and every page updates.
// Every value below was verified against the eBook Pro app repository
// (folio_reader) during the 2026-10-11 audit — see WEBSITE_AUDIT.md.

export const site = {
  name: 'eBook Pro',
  tagline: 'Read. Learn. Understand.',
  url: 'https://ebookpro.hycyon.com',
  webAppUrl: 'https://ebookpro.web.app',

  // Official support address. Matches the sender/support account used by the
  // app backend. Do not change without updating the app + Play listing.
  supportEmail: 'support.ebookpro@gmail.com',

  developer: {
    // TODO(owner): make this EXACTLY match the developer name on the Google Play listing.
    name: 'Hycyon',
    location: 'Varanasi, Uttar Pradesh, India',
  },

  // Current release of the app. MUST match pubspec.yaml `version:` in the app repository
  // (name+code); the app has a test that checks its own constants against pubspec.
  app: {
    version: '1.1.0',
    versionCode: 3,
    releasedOn: '2026-10-13',
  },

  android: {
    packageName: 'com.hycyon.ebookpro',
    // Set to the real listing URL once the app is published, e.g.
    // 'https://play.google.com/store/apps/details?id=com.hycyon.ebookpro'
    // While null the site shows "Google Play: coming soon" and never a dead link.
    playStoreUrl: null,
  },
  ios: { appStoreUrl: null }, // Not released. Never add a fake link.

  // Real "Last updated" dates (ISO). Bump when the page text materially changes.
  updated: {
    site: '2026-10-11', // general site content (used for sitemap lastmod)
    privacy: '2026-10-13',
    terms: '2026-10-11',
    refund: '2026-10-11',
    deletion: '2026-10-11',
    security: '2026-10-11',
  },

  // Public Firebase *web* config (identifiers, not secrets: they ship inside
  // every copy of the web app and are protected by Firebase Auth + security
  // rules). Used only by /delete-account to sign the user in.
  firebaseWeb: {
    apiKey: 'AIzaSyDCXLOMkELMd7ZXynNTbFoZ8eJLfDIUsyk',
    authDomain: 'folioreader-f9583.firebaseapp.com',
    projectId: 'folioreader-f9583',
    appId: '1:407342423169:web:e4fb768257bf887c9a8180',
    functionsRegion: 'us-central1',
  },
};

// Premium facts, verified against upgrade_screen.dart, payment_service.dart,
// functions/index.js (Razorpay order + webhook) and functions/quota.
export const premium = {
  priceDisplay: '₹9',
  currency: 'INR',
  aiDailyLimit: 20, // functions/quota/quotaService.js DAILY_LIMIT
  provider: 'Razorpay',
};

export const nav = [
  { href: '/features/', label: 'Features' },
  { href: '/ai/', label: 'AI' },
  { href: '/premium/', label: 'Premium' },
  { href: '/docs/', label: 'Docs' },
  { href: '/download/', label: 'Download' },
];

export const footer = [
  {
    title: 'Product',
    links: [
      ['/features/', 'Features'],
      ['/formats/', 'Supported formats'],
      ['/premium/', 'Premium'],
      ['/download/', 'Download'],
      ['/web-app/', 'Web app'],
      ['/roadmap/', 'Roadmap'],
      ['/changelog/', 'Changelog'],
    ],
  },
  {
    title: 'Resources',
    links: [
      ['/docs/', 'Documentation'],
      ['/faq/', 'FAQ'],
      ['/support/', 'Help & support'],
    ],
  },
  {
    title: 'Legal',
    links: [
      ['/privacy/', 'Privacy Policy'],
      ['/terms/', 'Terms of Service'],
      ['/delete-account/', 'Account & data deletion'],
      ['/refund-policy/', 'Refund & cancellation'],
      ['/security/', 'Security'],
    ],
  },
  {
    title: 'Developer',
    links: [
      ['/about/', 'About'],
      ['/support/', 'Contact'],
    ],
  },
];
