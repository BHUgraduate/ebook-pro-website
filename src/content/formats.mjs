// Per-format capability matrix, verified against lib/core/data/parsing and lib/core/ocr.
// Values: 'yes' | 'partial' | 'no' plus a note.
export const formatCols = ['Import', 'Reading', 'Search', 'Text extraction', 'Images', 'Layout', 'Navigation', 'Zoom', 'Highlights & annotations'];

export const formats = [
  {
    name: 'PDF',
    summary: 'Fixed-layout pages rendered with the PDFium engine.',
    rows: {
      Import: ['yes', 'From device storage, copied into the app.'],
      Reading: ['yes', 'Page-by-page; one page on phones, optionally two-page spreads on wide screens.'],
      Search: ['yes', 'Uses the PDF’s own text layer. Pages without text are read with on-device OCR (Android and iOS only).'],
      'Text extraction': ['yes', 'Used for selection, lookups and search. Scanned PDFs depend on OCR quality.'],
      Images: ['yes', 'Pages are rendered as images, so figures appear as in the original.'],
      Layout: ['yes', 'Original layout preserved. Optional automatic margin cropping.'],
      Navigation: ['partial', 'PDF outline (bookmarks) is used when the file contains one.'],
      Zoom: ['yes', 'Pinch-to-zoom and pan.'],
      'Highlights & annotations': ['yes', 'Pen and highlighter drawn over the page.'],
    },
  },
  {
    name: 'EPUB (EPUB 2 and EPUB 3)',
    summary: 'Packages are unpacked and re-flowed as text in eBook Pro’s typography.',
    rows: {
      Import: ['yes', 'EPUB 2 and EPUB 3 packages are recognised.'],
      Reading: ['yes', 'Re-flowed text with your chosen theme and typography.'],
      Search: ['partial', 'Basic text search; verify results on large books.'],
      'Text extraction': ['yes', 'Text is extracted directly from the book.'],
      Images: ['partial', 'Image-only fixed-layout EPUBs (comics, picture books) open as page images. Images inside reflowable chapters are not displayed currently.'],
      Layout: ['partial', 'The book’s own CSS is not applied; eBook Pro’s typography is used instead. Fixed-layout books that contain text are shown as reflowable text.'],
      Navigation: ['yes', 'EPUB 3 navigation document and EPUB 2 NCX are both read.'],
      Zoom: ['partial', 'Adjust text size and typography; pinch-zoom applies to PDF and image-page books.'],
      'Highlights & annotations': ['yes', 'Pen and highlighter, and flashcards from highlights.'],
    },
  },
  {
    name: 'TXT',
    summary: 'Plain text, split into paragraphs.',
    rows: {
      Import: ['yes', 'Plain text files.'],
      Reading: ['yes', 'Re-flowed text.'],
      Search: ['partial', 'Basic text search.'],
      'Text extraction': ['yes', 'The file is already text.'],
      Images: ['no', 'Not applicable.'],
      Layout: ['yes', 'Paragraphs are split on blank lines.'],
      Navigation: ['partial', 'No chapters; progress by page and percentage.'],
      Zoom: ['partial', 'Adjust text size and typography.'],
      'Highlights & annotations': ['yes', 'Pen and highlighter.'],
    },
  },
];

export const unsupported = ['MOBI / AZW', 'DOCX', 'CBZ / CBR comic archives', 'DRM-protected files'];
