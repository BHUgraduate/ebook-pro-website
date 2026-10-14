// Free and Premium, as the app defines them. This mirrors lib/core/billing/premium.dart in the app repository
// (freeFeatures and PremiumFeature): same names, same wording. Change both together.
//
// Premium is a subscription: ₹9 every month until cancelled (Razorpay Subscriptions). The server decides who is
// Premium; the price and period below are what the app shows at checkout.

export const freeFeatures = [
  { title: 'Reading', detail: 'PDF, EPUB, EPUB 3 and TXT, themes, typography, page turning, contents, bookmarks, read aloud' },
  { title: 'Your library', detail: 'Import books and web articles, collections of anything, smart collections, reading progress and goals' },
  { title: 'Highlights and notes', detail: 'Select, highlight, note, save passages, pen marks on PDFs, Edit / Write, Markdown and PDF export' },
  { title: 'Search', detail: 'Search inside a book and across everything you saved' },
  { title: 'OCR', detail: 'Scanned pages and images, English and Hindi, on your device (Android)' },
  { title: 'Translation and dictionary', detail: 'On-device translation of selections, Wikipedia, My Dictionary' },
  { title: 'Study', detail: 'Flashcards with spaced repetition, Your Cards, reading dashboard' },
  { title: 'Voice notes', detail: 'Record, play, name and share voice notes on this device' },
];

export const premiumFeatures = [
  { title: 'AI explanations', detail: 'Explain, simplify, summarise or give examples for any passage, and translate Sanskrit, with up to 20 AI requests a day.' },
  { title: 'AI summaries', detail: 'Summaries of a page, a chapter or a whole book, saved with their source so they open again offline.' },
  { title: 'Knowledge canvas', detail: 'Lay out notes, highlights, passages, AI answers, voice notes and books as cards, connect them with labelled links, and open any card at its source.' },
  { title: 'Research workspaces', detail: 'Study several books and articles together: search across all of them, compare passages side by side, pin evidence and ask AI questions answered with citations.' },
  { title: 'Bilingual reading', detail: 'Read a chapter or a PDF page paragraph by paragraph next to its translation, side by side on tablets.' },
  { title: 'Word export', detail: 'Export notes, collections and research workspaces as Word documents (.docx) with headings, tables, images and citations.' },
  { title: 'Cloud sync', detail: 'Keep notes, highlights, cards, words, collections, canvases, workspaces and voice notes in step across your devices.' },
];

/** What happens when Premium ends: shown wherever Premium is described. */
export const afterPremiumEnds =
  'If Premium ends, nothing you made is deleted: canvases, research workspaces, summaries and notes stay on your device and still open. You cannot create new canvases or workspaces, use AI or Word export, or sync until you subscribe again; your cloud copy stays in your account.';
