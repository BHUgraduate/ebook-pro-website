// The product story, in the order a reader lives it. Each stage groups features that already exist in the app
// (see features.mjs and the changelog). Only list what is released. `premium: true` marks Premium features.
export const stages = [
  {
    name: 'Read',
    promise: 'Open your own books.',
    items: [
      { text: 'PDF, EPUB, EPUB 3 and TXT in one reader, with page-curl or slide turning, themes and read aloud' },
      { text: 'Import web articles to read offline' },
    ],
    href: '/formats/',
    link: 'Supported formats',
  },
  {
    name: 'Understand',
    promise: 'Stay on the page while you work it out.',
    items: [
      { text: 'Translate a selection on your device' },
      { text: 'Scanned pages and images read on your device, English and Hindi (Android)' },
      { text: 'Explain, simplify, summarise or give examples for a passage, up to 20 requests a day', premium: true },
      { text: 'Read a chapter next to its translation', premium: true },
    ],
    href: '/ai/',
    link: 'How the AI works',
  },
  {
    name: 'Capture',
    promise: 'Keep what matters, with its source.',
    items: [
      { text: 'Highlights, notes, saved passages and pen marks on PDF pages' },
      { text: 'One tap from any note back to the exact page' },
      { text: 'Collections that hold books, notes, highlights, cards and words' },
    ],
    href: '/features/#notes',
    link: 'Notes and highlights',
  },
  {
    name: 'Connect',
    promise: 'See how your ideas relate.',
    items: [
      { text: 'Search everything you saved from one place' },
      { text: 'Knowledge canvas: cards connected by labelled links', premium: true },
      { text: 'Research workspaces: search, compare and ask across several books, with cited answers', premium: true },
    ],
    href: '/features/#notes',
    link: 'Canvas and research',
  },
  {
    name: 'Remember',
    promise: 'Turn what you saved into what you know.',
    items: [
      { text: 'Flashcards with spaced repetition from anything you saved' },
      { text: 'My Dictionary for new words' },
      { text: 'A reading dashboard with goals and streaks' },
    ],
    href: '/features/#learning',
    link: 'Study tools',
  },
  {
    name: 'Create',
    promise: 'Turn notes into writing.',
    items: [
      { text: 'Edit / Write workspace, with Markdown and PDF export' },
      { text: 'Export notes, collections and research as Word documents', premium: true },
      { text: 'Cloud sync keeps your notes and knowledge in step across devices', premium: true },
    ],
    href: '/docs/',
    link: 'What sync covers',
  },
];
