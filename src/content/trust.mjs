// Evidence the visitor can check. Rules:
//  * Add an entry only when it is real. Never add placeholders, estimates or rounded-up numbers.
//  * Every entry needs `source` (where a reader can verify it) and `date` (ISO). scripts/check.mjs enforces this.
//  * While a list is empty the site says so plainly; it never shows fake numbers.

/** Counts and ratings. e.g. { label: 'Google Play rating', value: '4.6 from 120 ratings', source: 'https://play.google.com/…', date: '2026-12-01' } */
export const metrics = [];

/** Reviews quoted with permission. e.g. { quote: '…', name: 'First name or handle', context: 'Google Play review', source: 'https://…', date: '2026-12-01' } */
export const reviews = [];

/** Longer user stories. e.g. { title: '…', summary: '…', source: 'https://…', date: '2026-12-01' } */
export const stories = [];
