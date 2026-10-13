// Real app screenshots. To add one: drop the image into src/assets/screenshots/ and add an entry here.
// Only real screenshots of the released app belong here. If the list is empty, the site shows a
// "screenshots coming soon" state instead of fake imagery.
// All captures are from the Android app (version 1.1.0), using public-domain sample books (Alice's
// Adventures in Wonderland, Pride and Prejudice, Moby-Dick, Premchand's Idgah) and sample notes.
export const screenshots = [
  { file: 'translate-pdf.webp', alt: 'A PDF in eBook Pro with the word "White" selected; the translation card shows English to Hindi and the result "सफेद"', caption: 'Translate a selection in a PDF', width: 540, height: 1200 },
  { file: 'translate-epub.webp', alt: 'An EPUB in eBook Pro with the word "fortune" selected; the translation card shows the Hindi translation "भाग्य"', caption: 'Translate a selection in an EPUB', width: 540, height: 1200 },
  { file: 'translate-hindi-word.webp', alt: 'A Hindi PDF with the word "सुहावना" selected; the card detects Hindi and shows the English translation "Delightful"', caption: 'Hindi to English, language detected automatically', width: 540, height: 1200 },
  { file: 'translate-hindi-selection.webp', alt: 'A whole line of Hindi text selected in a PDF, with its English translation in the card', caption: 'Translate a whole Hindi line', width: 540, height: 1200 },
  { file: 'wikipedia-hindi.webp', alt: 'The translation card with a Hindi Wikipedia summary, thumbnail space and a link to read on Wikipedia', caption: 'Hindi Wikipedia in the same card', width: 540, height: 1200 },
  { file: 'library-home.webp', alt: 'eBook Pro home screen showing a Continue card and a library shelf of three books', caption: 'Home and library', width: 540, height: 1200 },
  { file: 'reader-highlight-note.webp', alt: 'A PDF page open in the eBook Pro reader with a yellow highlight and a note marker on the text', caption: 'Reading, highlights and notes', width: 540, height: 1200 },
  { file: 'reader-notes-panel.webp', alt: 'The notes panel in the reader listing one highlight and one note for the current book', caption: 'Notes for the book you are reading', width: 540, height: 1200 },
  { file: 'notes-workspace.webp', alt: 'The Edit / Write workspace with a list of notes and a checklist note open in the editor with a formatting toolbar', caption: 'Edit / Write workspace', width: 1200, height: 540, wide: true },
];
