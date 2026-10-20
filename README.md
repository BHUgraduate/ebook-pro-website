# eBook Pro website

Official website of **eBook Pro** — https://ebookpro.hycyon.com

A zero-dependency static site (Node ≥ 18 to *build*; plain HTML/CSS/JS to *serve*). Hosted on GitHub Pages from the root of `main`; the `CNAME` file must stay.

## Architecture

```
src/
  site.config.mjs     facts used everywhere: URLs, support email, developer, legal "last updated" dates, premium price/limit, nav, footer
  layout.mjs          global <head> (SEO/OG/Twitter/icons), header, footer, shared HTML helpers
  content/            editable content: features, formats, faq, roadmap, changelog, docs, screenshots
  pages/              page builders: product.mjs (home, features, ai, premium…), docs.mjs, legal.mjs (privacy, terms, refund, security, delete-account)
  assets/             css/site.css (design system), js/ (site.js, delete-account.js), fonts/ (self-hosted), img/ (brand + og_preview.png), screenshots/
build.mjs             generates the site into the repo root
scripts/check.mjs     QA: links, anchors, titles/descriptions, canonicals, OG tags, JSON-LD, headings, sitemap, secret/overclaim scan
```

**Generated files** (committed, because Pages serves the branch root): `index.html`, `*/index.html`, `404.html`, `assets/`, `docs/search-index.json`, `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, `favicon.ico`. **Never edit these by hand — edit `src/` and rebuild.**

```
npm run build     # regenerate the site
npm run check     # QA (must print "All checks passed.")
npm run serve     # optional local preview (or: python -m http.server)
```

## Routes

`/` · `/features/` · `/formats/` · `/ai/` · `/premium/` · `/download/` · `/web-app/` · `/about/` · `/faq/` · `/roadmap/` · `/changelog/` · `/support/` · `/docs/` (+ `/docs/<slug>/`) · `/privacy/` · `/terms/` · `/refund-policy/` · `/security/` · `/delete-account/` · `/legal/` · `404.html`.
Old hash links (`/#features`, `/#pricing`, `/#roadmap`) redirect to the new pages.

## Design system

Tokens at the top of `src/assets/css/site.css` (`:root`, with a dark-mode override). Brand colours come from the app icon (blue `#1f3df0`, amber accent). Playfair Display (headings) + Inter (body), self-hosted, no external font requests. Light by default, follows the system dark mode. Motion is limited to a subtle reveal and is disabled under `prefers-reduced-motion`.

## Content truthfulness rule

The app repository (`folio_reader`) is the source of truth. Do not mark a feature **Available** unless it exists in the app. Use `status: 'planned'` or the Roadmap for anything unreleased. See `WEBSITE_AUDIT.md` for what was verified.

## How to…

| Task | Edit |
|---|---|
| Change the support email, developer name, Play/App Store link, legal dates | `src/site.config.mjs` |
| Add / change a feature | `src/content/features.mjs` |
| Change supported-format details | `src/content/formats.mjs` |
| Change Premium price or AI daily limit | `premium` in `src/site.config.mjs` (then re-read `src/pages/product.mjs` Premium text and `legal.mjs` for wording) |
| Add a docs article | append to a category in `src/content/docs.mjs` (sidebar, prev/next, search index and sitemap update automatically) |
| Add an FAQ | `src/content/faq.mjs` (also feeds FAQ structured data) |
| Update the roadmap | `src/content/roadmap.mjs` |
| Add a changelog entry | add an object at the **top** of `src/content/changelog.mjs` |
| Add screenshots | put real images in `src/assets/screenshots/`, list them in `src/content/screenshots.mjs`, and update `screenshotsVersion` to the app version they were captured on |
| Change the home page story (Read → Create) | `src/content/stages.mjs` (only released features; mark Premium ones) |
| Publish downloads, ratings, reviews or user stories | `src/content/trust.mjs`. Real entries only, each with an https `source` and an ISO `date`; `npm run check` rejects entries without them. While empty, the home page says nothing is published yet |
| Publish the Google Play link | set `android.playStoreUrl` in `site.config.mjs` |
| Change the social preview | replace `src/assets/img/og_preview.png` (1200×630) |

After any edit: `npm run build && npm run check`, then commit **both** `src/` and the generated files.

## Legal pages

`/privacy/`, `/terms/`, `/refund-policy/`, `/security/`, `/delete-account/` are plain HTML (no PDFs), public, linked from every page's footer. Each shows a real "Last updated" date from `site.updated.*`. Bump the date whenever the text materially changes, and keep `/privacy/` consistent with the app and with the Play Console Data Safety form. There is exactly one privacy policy; the app should link to it instead of embedding its own copy.

## Account deletion

`/delete-account/` signs the user in with Firebase Auth (email/username + password, or Google; in-memory session only) and calls the `deleteMyAccount` callable Cloud Function in the app repo (`functions/account/deleteAccount.js`). The function deletes only the caller's own account (uid from the verified token), requires a sign-in within 5 minutes and an explicit confirm. Requirements for it to work:

1. Deploy the function and the collection-group index: `firebase deploy --only functions:deleteMyAccount,firestore:indexes`.
2. Add `ebookpro.hycyon.com` to Firebase Console → Authentication → Settings → **Authorized domains**.
3. Google sign-in must be enabled as a provider (it already is for the app).

The public Firebase *web* config in `site.config.mjs` (`firebaseWeb`) contains identifiers, not secrets (the same values ship in every copy of the web app); access is protected by Firebase Auth and security rules.

## SEO

Every page has a unique title and description, canonical URL, Open Graph + Twitter tags (absolute `og_preview.png` URL, 1200×630), and JSON-LD where valid (`WebSite`, `Organization`, `SoftwareApplication`, `FAQPage`, `BreadcrumbList`). `sitemap.xml` and `robots.txt` are generated; `404.html` is `noindex` and excluded from the sitemap.

## Environment variables

None. No secrets belong in this repository.

## Deployment

GitHub Pages → branch `main`, folder `/ (root)`. `CNAME` = `ebookpro.hycyon.com`. `.nojekyll` is generated so folders are served as-is.
