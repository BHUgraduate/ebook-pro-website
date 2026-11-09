// Real app screenshots for the home page. To add one: drop the image into src/assets/screenshots/ and add an entry here.
// Only real screenshots of the app belong here. If the list is empty, the site shows a "screenshots coming soon"
// state instead of fake imagery. The full set (every feature, phone and tablet, light and dark) is on /screenshots/.
// Captured from the app (tool/store_listing/ in the app repository) with public-domain and invented demo books,
// sample notes, and example translations and AI answers written for the demo.
/** App version the captures were taken on. Update it when screenshots are refreshed. */
export const screenshotsVersion = '1.5.1 with the fixes that follow it';

export const screenshots = [
  { file: 'library-home.webp', alt: 'eBook Pro home screen: a Continue card for Pride and Prejudice with time left and a progress bar, and a shelf of books with eBook Pro covers', caption: 'Home and library', width: 540, height: 1200 },
  { file: 'reader.webp', alt: 'Pride and Prejudice open in the reader on cream paper, with a yellow and a blue highlight and the reader toolbar', caption: 'Reading, with highlights', width: 540, height: 1200 },
  { file: 'translate-hindi.webp', alt: 'The word "acknowledged" selected in the reader; the card shows the original word and its Hindi translation', caption: 'Translate a word into Hindi', width: 540, height: 1200 },
  { file: 'ai-explain.webp', alt: 'The word "Netherfield" selected; the card shows an AI explanation of the place in the context of the passage', caption: 'AI explains a word in context (Premium)', width: 540, height: 1200 },
  { file: 'wikipedia.webp', alt: 'The same card showing a Wikipedia summary of Netherfield with a link to read on Wikipedia', caption: 'Wikipedia in the same card', width: 540, height: 1200 },
  { file: 'bilingual.webp', alt: 'Bilingual reading: each English paragraph of Chapter I followed by its Hindi translation', caption: 'Bilingual reading (Premium)', width: 540, height: 1200 },
  { file: 'reader-notes-panel.webp', alt: 'The notes panel in the reader listing colour-coded highlights and a note for the current book', caption: 'Notes for the book you are reading', width: 540, height: 1200 },
  { file: 'flashcards.webp', alt: 'A flashcard review: the question, the revealed answer and Again, Hard, Good and Easy buttons', caption: 'Flashcards with spaced repetition', width: 540, height: 1200 },
  { file: 'notes-workspace.webp', alt: 'The Edit / Write workspace on a tablet with folders, a list of notes and an essay open in the editor', caption: 'Edit / Write workspace', width: 1200, height: 750, wide: true },
  { file: 'canvas.webp', alt: 'A knowledge canvas on a tablet: a central idea card linked to a highlight, a note, an AI answer, a summary and a book', caption: 'Knowledge canvas (Premium)', width: 1200, height: 750, wide: true },
];
