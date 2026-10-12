// Newest first. Dates are real (ISO). Add a new object at the top for each release.
// No history is invented: the log starts with the relaunch of this website.
export const changelog = [
  {
    version: 'Website 2.0',
    date: '2026-10-11',
    kind: 'Website',
    added: [
      'Official product site with Features, Formats, AI, Premium, Download, Docs, FAQ, Roadmap and Support pages.',
      'A single Privacy Policy, Terms of Service, Refund & Cancellation Policy and Security page, written from the app’s actual behaviour.',
      'Account and data deletion page that signs you in and deletes your account on our servers.',
    ],
    changed: [
      'Feature, pricing and AI-limit statements were corrected to match the app. Cloud sync of books and annotations is no longer advertised because it is not implemented.',
    ],
    fixed: ['Replaced the single-page legal text with dedicated, linkable pages.'],
  },
];
export const changelogNote = 'App release notes will be listed here from the first public release. Until then this log records website and policy changes only.';
