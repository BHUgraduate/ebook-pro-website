# Website audit & status — 2026-10-11

Source of truth: the app repo `C:\Abhishek\folio_reader` (Flutter app `com.hycyon.ebookpro`, Firebase project `folioreader-f9583`, Cloud Functions in `functions/`). Everything below was checked against code, `firestore.rules`, `storage.rules` and `functions/`.

## URGENT (security, in the app repo — not the website)

1. **A Gmail app password and the Razorpay webhook secret are hard-coded in `folio_reader/functions/index.js`** (SMTP `pass:` and `RAZORPAY_WEBHOOK_SECRET`). Assume they are compromised if that repo was ever pushed or shared: **revoke the Gmail app password, rotate the webhook secret in the Razorpay dashboard**, and move both to Firebase secrets (`defineSecret`), as already done for `GEMINI_API_KEY` / `RAZORPAY_*`. I did not change this (it would break deploys until you set the secrets) and I did not copy the values anywhere.
2. `firestore.rules`: any signed-in user can read every `users/{uid}` document (which contains `realEmail` / `realPhoneNumber`), and `usernames/*` is world-readable (username → uid → shadow email). Split a public profile (name, photo) from private contact data.
3. `storage.rules`: `user_avatars/*` is writable by any signed-in user for any filename (can overwrite others' avatars); restrict to `user_avatars/{uid}.jpg` for `request.auth.uid`.

## Implemented (website)

New static multi-page site (generator in `src/`, output in repo root): Home, Features, Formats, AI, Premium, Download, Web app, About, FAQ, Roadmap, Changelog, Support, Docs (28 articles, sidebar, breadcrumbs, prev/next, client-side search), Privacy Policy, Terms, Refund & Cancellation, Security, Account & data deletion, Legal hub, 404. Global nav + footer, mobile menu, self-hosted fonts, dark mode, reduced-motion support, skip link, semantic headings, focus states, tables scroll inside wrappers. SEO: unique title/description/canonical, OG/Twitter (absolute `og_preview.png`, 1200×630 — it did not exist before; created from the app icon), JSON-LD (WebSite, Organization, SoftwareApplication, FAQPage, BreadcrumbList), `sitemap.xml`, `robots.txt`, favicon/apple-touch/manifest icons from the real app icon. Old `#features/#pricing/#roadmap` links redirect. Tailwind CDN removed (no external runtime dependencies except Firebase scripts on `/delete-account/`).

Also changed in the **app repo** (uncommitted, not deployed): `functions/account/deleteAccount.js` (new callable `deleteMyAccount`), one export line in `functions/index.js`, `firestore.indexes.json` (collection-group index on `reviews.userId`) + reference in `firebase.json`, and `AuthService.deleteAccount()` in `lib/core/services/auth_service.dart` now calls the callable. `dart analyze` shows no new errors (only pre-existing `avoid_print` infos).

## Corrected (old site vs. app)

| Old website claim | Reality in the app | Now |
|---|---|---|
| Imported PDFs/ePubs, progress and highlights "backed up securely to the cloud", "universal cross-device sync" | Imported books, progress, ink annotations, flashcards, streaks are **local only** (Drift/SQLite, files). Online: profile, store entitlements, reviews, AI counters, avatar. | Stated as local; sync listed as *Exploring* on the roadmap. **Confirm with me if you intend to build sync.** |
| Registered free users get "Gemini AI (3 queries/day per page)"; Premium "Unlimited AI" | Backend `explainWord` **rejects non-Premium** (`premium_required`); Premium limit is **20/day** (UTC reset) | Premium only, 20/day |
| Premium "₹9/mo", "cancel anytime", monthly billing cycle | `PaymentService` creates a single Razorpay **order**; webhook sets `isProUser=true` permanently; no subscription, renewal, expiry or cancellation logic. UI text says "monthly / cancel in device subscriptions" — inaccurate | Described as a one-time ₹9 payment, no auto-renewal; discrepancy disclosed on `/premium/` |
| "Millions of books", "unlimited access to newspapers and research papers", "advanced notes & flashcards", "early access" as Premium perks | No code gating these. Premium = AI explain + Storage read access to premium store books/newspapers (`storage.rules`) | Removed; only verified perks listed |
| "Firebase Analytics" third-party service | **No** analytics or crash SDK; `StoreAnalytics` only `debugPrint`s | Not listed; policy says no dedicated analytics SDK |
| Third-party list "Google Play Services, Firebase Analytics, Razorpay" | Actual: Firebase (Auth, Firestore, Storage, Functions, Messaging, Hosting), Google Sign-In, Gemini API, ML Kit, Gmail SMTP, Razorpay, Wikipedia, Google Books, Open Library/Internet Archive, Gutendex, arXiv, Semantic Scholar, Crossref, NewsAPI mirror, Inshorts, Unsplash | Full table in `/privacy/` |
| Deletion "permanently wipes all data" | Old client code deleted only `users/{uid}` and the Auth user: subcollections (entitlements, ai_usage…), `usernames/*`, reviews, avatar remained | New `deleteMyAccount` function does the full purge; policy describes it (**deploy first**) |
| Phone `+91 9999999999`, "Varanasi - 221001", "© eBook Pro" | Placeholder phone | Phone removed; email only; city kept |
| "Curl mode & Wikipedia" gated to registered | Curl/slide and Wikipedia are not gated | Presented as free |
| iOS "Soon" | No iOS release | "Not yet / Planned"; no App Store link |

Support email `support.ebookpro@gmail.com` matches the account the backend uses; kept.

## Features discovered in the app (verified)

PDF (PDFium via `pdfx`, zoom, auto-crop, 2-up spreads, outline TOC, text selection, pen/highlighter), EPUB 2 **and EPUB 3** (nav.xhtml + NCX; reflowed text; image-only fixed-layout EPUBs open as page images; CSS and inline images not rendered), TXT, **on-device OCR** (ML Kit Latin, Android/iOS) for search of scanned PDFs, search, curl/slide page-turn, 3 themes, TTS "Listen", on-device translation (ML Kit), dictionary (bundled **25-word sample**) + Wikipedia, ink annotations, smart highlight snapping, flashcards (cloze + SM-2), focus timer (Pomodoro), streaks, stats, community marginalia (aggregated counts), store (Firestore catalogue + public sources), reviews/reports, Premium/AI (Gemini via Cloud Function, cache, quota), sign-in (email, phone OTP, username, Google; Apple code present but needs platform config), push-permission toggle (FCM, no sender implemented), password reset OTP by Gmail SMTP. Not found: bookmarks, magnifier, notes (separate from ink), cloud sync, analytics, crash reporting, recurring billing.

## Privacy

`/privacy/` is the single policy, written from the above: categories collected, local-only data, AI data flow (selection + paragraph + language + ID token → Cloud Function us-central1 → Gemini; hashed-key cache; per-day counter), full third-party table, what others can see (display name/photo on reviews; avatar URL is public), retention/deletion, children, transfers, website behaviour (no cookies/analytics; GitHub Pages logs). No claims of encryption beyond HTTPS/Google defaults, no "never shared"-type claims.

## Account deletion

Web: `/delete-account/` → Firebase sign-in (email/username+password or Google; in-memory session) → type DELETE → `deleteMyAccount`. In-app: Settings → My Account → Delete My Account (same function after you ship the Dart change). Function: uid from token only; requires sign-in ≤ 5 min; deletes username mapping, reset code, reviews, avatar, `users/{uid}` + all subcollections, then the Auth user; anonymises reports the user filed. Phone-only users can use the app or the email fallback (not built on web: needs reCAPTCHA).
**Not live until you:** deploy `functions:deleteMyAccount` + `firestore:indexes`, and add `ebookpro.hycyon.com` to Firebase Auth → Authorized domains. I could not deploy or test against production.

## Google Play readiness — website side

Done: public HTTPS HTML privacy policy at `/privacy/` (labelled, mobile-friendly, footer-linked, no login); deletion URL `/delete-account/` (use as the Play "Delete account URL"); Terms; refund; support/contact; developer address; accurate feature/data statements to base the Data Safety form on.

## Remaining app-side / manual items

- Deploy backend changes above; ship app update with new `deleteAccount()`.
- **In-app privacy text is a second, different, hard-coded policy** (`settings_screen.dart` `_showPrivacyPolicy`, "July 2026"): replace with a link to `https://ebookpro.hycyon.com/privacy/`. Add links to Terms/Delete-account too. Settings shows a hard-coded "Version 1.0.0 (Build 42)" while `pubspec.yaml` is `0.1.0+1`.
- **Payments:** Premium unlocks digital features via Razorpay. Google Play's payments policy generally requires Play Billing for digital goods in Play-distributed apps — review before release. Also decide: one-time vs. subscription; implement expiry/renewal/cancellation, or relabel the app ("monthly", "Cancel anytime in your device subscriptions").
- Data Safety form: declare account info, optional photos, user content (reviews), app activity/diagnostics as applicable, AI text sent to a server, payments via Razorpay; declare deletion URL. Consider an in-app disclosure before the first AI request (selected text leaves the device).
- Verify/finish: Sign in with Apple config; FCM (token handling, notification permission rationale); Firestore region and backup/PITR settings (policy says no intentional long-term copies); permission list in the release manifest after plugin merge.
- Developer name: `site.config.mjs` uses "Hycyon" — make it identical to the Play listing. Terms governing-law/liability wording is plain-language boilerplate: have it reviewed.
- Set `android.playStoreUrl` once the listing is live; add real screenshots; (optional) confirm minimum Android version for `/download/`.
- Rotate the leaked secrets (top of this file).

## Known limitations

- Phone-OTP web deletion not implemented (email fallback). Shared-highlight and AI-cache entries aren't user-linked, so they stay. Review aggregate ratings are not recomputed after a deleted user's reviews are removed.
- No automated visual regression; QA done with `scripts/check.mjs` (48 pages: links, anchors, metadata, JSON-LD, headings, sitemap, overclaim/secret scan) plus headless-Chrome checks (no horizontal overflow, no console errors, menu, docs search, delete page loads Firebase and shows sign-in).
- Social-share scrapers (WhatsApp/LinkedIn/X/Facebook/Discord/Slack) can only be validated after deployment; tags and image dimensions are correct.
- Legacy `index.html` content is preserved in git history.
