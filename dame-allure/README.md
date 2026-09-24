# Dame Allure — Website

Next.js + Tailwind CSS project. All 7 build stages from the brief are
complete, plus a full-build pass adding a real cart, real checkout wiring,
real form capture, and more (see "Full-build pass" below).

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Brand amendment — complete

The brief was amended: "Edit" → "Curation" terminology, Shop restructured
into real product categories with a separate Shop by Occasion experience,
and a new Collections section. Both passes are in this delivery:

- **Terminology & forms:** every "Edit" renamed to "Curation" site-wide,
  the new 9-step Create Your Curation form, the reworked Gift Curation
  form, "Ask a Curator" wording.
- **Shop, restructured:** `/shop` now organizes by real product department
  (Clothing, Shoes, Bags, Jewellery & Accessories, Beauty & Self-Care,
  Travel, Gifts — `src/data/shop-taxonomy.js`), with subcategory filter
  chips on each department page rather than a separate static page per
  subcategory (there are ~45 subcategories across departments — one page
  each would be over-engineering for an MVP catalogue this size; chips get
  the same browsing outcome without the page explosion).
- **Shop By Occasion, genuinely separate from Shop:** `/shop-by-occasion`
  lists all nine situations from the brief; seven route to their own page
  pulling matching products via each product's `occasions` array
  (`src/data/products.js`); Travel and Gifting route to their existing
  dedicated pages instead of a duplicate listing.
- **Collections:** `/collections` — the Signature Collection plus the
  Odehei and Renee Royale collaborations.
- All 27 products re-tagged with department + subcategory + occasions
  (a product can appear in both a department page and an occasion page,
  same as the brief's Vacation example).

Verified: production build succeeds (67 routes) and `eslint` runs clean.

## Deploy on Netlify

1. Push this folder to a GitHub repo (or drag-and-drop the folder into Netlify's
   "Deploy manually" UI).
2. In Netlify: **New site from Git** -> select the repo.
3. Build command: `npm run build` - Publish directory: `.next`
   (already set in `netlify.toml`, along with the official
   `@netlify/plugin-nextjs` plugin - Netlify will detect and install it
   automatically).
4. Deploy.
5. **Turn on Netlify Forms**: Site configuration → Forms → make sure form
   detection is enabled (it is by default on most plans). After your first
   deploy, the four forms below should appear automatically under the
   Forms tab — no extra setup needed. Add a notification (Forms →
   Settings → Form notifications → email notification) so submissions
   actually reach you.

## Before you launch - replace these placeholders

- **`src/data/site.js`**
  - `whatsappNumber` - currently a placeholder. Set it to the real Dame
    Allure business number, international format, digits only (e.g.
    `233241234567`).
  - `email`, `instagram` - currently placeholders.
  - `paystackPublicKey` - currently a placeholder (`pk_test_replace_with_your_real_key`).
    Get your real key from your Paystack dashboard (Settings → API Keys &
    Webhooks). A `pk_test_...` key is safe to use here for testing; a
    `pk_live_...` key goes live. **Never put a secret key (`sk_...`)
    anywhere in this frontend code** — that belongs on a server only.
- **Logo files** are in `public/brand/` (`logo.png`, `icon.png`) - already
  wired into the header and footer from your uploaded artwork.

## Going live with real payments

Earlier builds only *looked* like they took payment: the Paystack popup
firing its `callback` was treated as proof of success, with nothing
checking that money actually moved. That's fixed. The flow is now:

1. Customer pays in the Paystack popup (client-side, as before).
2. On the popup's callback, the browser calls our own server —
   `netlify/functions/verify-payment.js` — with just the payment
   reference.
3. That function asks Paystack directly, using your **secret** key, "did
   this reference really succeed, and for how much?" Only Paystack's
   answer decides whether the order is treated as paid — the browser is
   never trusted on this.
4. Only once that comes back verified does the site show "Payment
   received" and clear the cart. If verification fails, the customer sees
   an error instead and the cart is preserved.

**To turn this on, in Netlify (Site configuration → Environment variables), set:**

- `PAYSTACK_SECRET_KEY` — your secret key from the Paystack dashboard
  (Settings → API Keys & Webhooks). Starts with `sk_test_...` while
  testing, `sk_live_...` once you're live. **Set this only here — never
  in `site.js` or any other file that ships to the browser.**

Also update `src/data/site.js`:

- `paystackPublicKey` — the matching **public** key (`pk_test_...` /
  `pk_live_...`). This one is safe in client-side code.

Use the matching test/live pair together (`sk_test_` with `pk_test_`, or
`sk_live_` with `pk_live_`) — mixing them will fail verification. Test
with Paystack's test card numbers before flipping to live keys.

### Optional: email yourself when an order comes in

`verify-payment.js` can also send you an email the moment a payment
verifies, using [Resend](https://resend.com) (free tier available, no
SMTP setup). Skipped automatically if unset — verification still works
either way. To turn it on, set these Netlify environment variables too:

- `RESEND_API_KEY` — from your Resend account.
- `ORDER_FROM_EMAIL` — the "from" address; must be on a domain you've
  verified with Resend.
- `ORDER_NOTIFICATION_EMAIL` — where you want order emails delivered
  (e.g. your own inbox).

Prefer a different provider (SMTP, SendGrid, etc.) instead? Swap the body
of `sendOrderNotification()` in `netlify/functions/verify-payment.js` —
the verification logic above it doesn't need to change.

### What's still manual for now

There's no order database or admin dashboard yet — a verified order
currently means "Paystack confirms it succeeded" plus, optionally, one
email to you. For early volume that's workable (Paystack's own dashboard
is your order log); a proper orders table is a natural next step once
volume picks up.

## Photography — real stock photos, contextually matched, tinted to the brand palette

Every image is a real photo from [LoremFlickr](https://loremflickr.com),
keyword-matched to what it's actually showing (built by
`src/lib/placeholder.js` + `imageKeywords` fields in the data files) — a
"Work" tile pulls office imagery, "Jewellery & Accessories" pulls jewelry
imagery, and so on — with a subtle plum tint
(built by `src/lib/placeholder.js`), not a flat colour block — with a subtle
plum tint (`PlaceholderPhoto.jsx`) so the random stock photography reads as
on-brand rather than random, plus a small "Sample image" tag in the corner
so it's obvious what still needs replacing. Swapping in real photography
later is a small, contained change per spot:

- `src/components/ui/PlaceholderPhoto.jsx` — the actual image + tint +
  "Sample image" tag. **This is the one place the tint/tag logic lives.**
- `src/components/shop/ProductImagePlaceholder.jsx` — wraps
  `PlaceholderPhoto` for every product card, product detail page, shop
  category tile, and journal card. **Swap this one component and most of
  the site updates.**
- `src/components/editorial/Hero.jsx` — homepage hero panel
- `src/components/brand/CollaborationCard.jsx` — Dame Allure Exclusives
  lookbook images (via `ProductImagePlaceholder`)
- `src/components/brand/PackagingShowcase.jsx` — packaging visual on the
  Curation Experience page
- `src/app/travel/page.js` — Travel page hero image

To swap any of these for a real photo: drop the image in `public/`, then
replace `<PlaceholderPhoto ... />` with a plain
`<Image src="/your-image.jpg" alt="..." fill sizes="..." className="object-cover" />`
(the parent `<div className="relative ...">` around it already handles
sizing — leave that as-is). Once nothing imports
`src/lib/placeholder.js` anymore, you can also remove the
`images.remotePatterns` entry for `loremflickr.com` in `next.config.mjs`.

## What's built

**Stage 1 — Design system & global layout**
- Design tokens: colour palette, Playfair Display / Inter type system,
  spacing container, focus states, reduced-motion support (`src/app/globals.css`)
- `Navbar` — logo, nav, search/bag icons, WhatsApp shortcut, mobile menu
- `Footer` — brand block, nav, customer care links, social, newsletter capture
- `WhatsAppButton` — floating, site-wide
- `Button` and `Input` UI primitives other components reuse
- Root layout wiring fonts, metadata, and skip-to-content accessibility link

**Stage 2 — Homepage**
- `Hero` — headline, supporting copy, Create Your Edit / Explore The
  Collections CTAs
- `PreparingFor` — the "What Are You Preparing For?" occasion grid (Work,
  Friday, Sunday, Vacation, Gifting, Occasions), driven by `src/data/occasions.js`
- `PhilosophyQuote` — full-width brand quote break ("You tell us what you
  need. We curate the rest.")
- `Exclusives` — Dame Allure Exclusives section (× Odehei, × Renee Royale),
  driven by `src/data/collaborations.js`
- `CTASection` — reusable closing CTA band, built to be reused on other pages

**Stage 3 — Shop & product pages**
- `/shop` — hub of the nine lifestyle collections (Work, Friday, Sunday,
  Vacation, Travel, Gift, Occasion Edits, Accessories, Beauty & Self-Care)
- `/shop/[category]` — category listing with an editorial product grid
- `/product/[slug]` — product detail: imagery, price, description, size
  and colour selection, "Ask a Dame Allure Curator" prompt, a
  delivery/returns/care accordion, and related products
- 18 mock products across all nine categories in `src/data/products.js` —
  easy to edit or swap for a CMS/database later
- New reusable primitives: `Accordion`, `ProductCard`, `ProductGrid`,
  `ProductImagePlaceholder`

**Stage 4 — Create Your Edit**
- `/create-your-edit` — the six-step consultation flow from the brief:
  who it's for, occasion, budget, style, preferences, contact details
- Confirmation screen ("Your Edit request has been received.") with a
  **WhatsApp Dame Allure** button that opens WhatsApp pre-filled with a
  formatted summary of everything the customer entered — this is the
  practical MVP backend the brief asked for (no CRM/email integration yet)
- `src/lib/create-edit-request.js` — builds that summary message and has a
  `submitEditRequest()` stub that's a one-line swap for a real email/CRM
  POST later
- New reusable primitives: `StepIndicator`, `OptionButton`

**Stage 5 — Travel & Gifting**
- `/travel` — "Travel, curated." with four travel-lifestyle category tiles
  and a "Build My Travel Edit" CTA that deep-links into Create Your Edit
  with the occasion pre-filled
- `/gifting` — "She deserves something thoughtful," a dedicated single-screen
  Gift Edit form (recipient, occasion, budget, style, colours, personal
  message, delivery date), with the same WhatsApp handoff pattern as
  Create Your Edit
- `Create Your Edit` now accepts an `?occasion=` query param so other pages
  can pre-fill step 2
- New: `src/components/curation/GiftEditForm.jsx`,
  `src/lib/gift-request.js`, `ui/Textarea`

**Stage 6 — About, Curation Experience, Journal, Contact**
- `/about` — the brand story as written in the brief (not a generic startup
  narrative), what Dame Allure curates, and the "every edit is personal"
  philosophy quote
- `/curation-experience` — "More than shopping": the five-step process
  (Tell Us → We Curate → You Approve → We Prepare → You Receive) and the
  packaging showcase
- `/journal` + `/journal/[slug]` — 7 articles from the brief's suggested
  list, each with real (if brief) editorial copy, in `src/data/journal.js`
- `/contact` — WhatsApp, email, Instagram, a contact form, and "Book A
  Private Consultation" (opens WhatsApp with a pre-filled message)
- New: `PackagingShowcase`, `JournalCard`, `ContactForm`

**Stage 7 — Responsive, accessibility, performance, SEO**
- **Accessibility:** fixed several text/background colour pairs that fell
  below WCAG AA contrast — added a `gold-deep` token for text/border use
  (the decorative `gold` reads too light on ivory for real text) and raised
  low-opacity charcoal/plum body text across the site; added `textarea` to
  the global focus-visible outline
- **Responsive:** replaced a `13vw` fluid heading in the hero with a fixed
  type scale, so mobile headline sizing is predictable rather than
  viewport-dependent
- **Functionality:** the footer newsletter form and Create Your Edit /
  Gifting / Contact forms all handle submission client-side (no more raw
  `<form>` page reloads)
- **SEO:** title template (`Page | Dame Allure`) with per-page titles
  fixed to work with it, Open Graph + Twitter card metadata, a generated
  `sitemap.xml` covering every static, category, product and journal
  route, and `robots.txt`
- **Polish:** branded 404 page, `theme-color` for mobile browser chrome
- Verified: production build succeeds (48 routes, all static/SSG) and
  `eslint` runs clean

## Full-build pass

This is the biggest single update to the project, adding real functionality
rather than more mockups:

- **Real cart** (`src/lib/cart-context.jsx`, `components/cart/CartDrawer.jsx`)
  — Add to Bag genuinely adds items with size/colour, quantities adjust,
  subtotal is real, and it persists across visits via localStorage.
- **Real Paystack checkout** (`components/cart/PaystackCheckoutButton.jsx`)
  — loads Paystack's actual Inline JS and opens a real payment popup.
  Runs a demo/test flow until you set a real key in `src/data/site.js`
  (see "Before you launch" above).
- **Real form capture via Netlify Forms** — Contact, Create Your Edit,
  Gifting, and the newsletter signup now submit to Netlify's built-in form
  handling (`src/lib/netlify-forms.js` + the static detection file
  `public/forms.html` — required because Netlify can't see JS-rendered
  forms at build time; this is the documented workaround). Submissions land
  in your Netlify dashboard once you turn Forms on (see "Deploy on
  Netlify" above). The WhatsApp handoff still works alongside this — it's
  additive, not a replacement.
- **Real client-side search** (`components/search/SearchModal.jsx`) — the
  navbar search icon now actually searches products, collections, and
  journal articles.
- **Save/resume on Create Your Edit** — progress saves to localStorage as
  you go; leaving and coming back shows a "Welcome back" notice and picks
  up where you left off.
- **Scroll-reveal motion + hero parallax** (`components/ui/Reveal.jsx`,
  `components/editorial/HeroParallaxImage.jsx`, via Framer Motion) —
  homepage sections fade/rise into view on scroll; the hero image has a
  subtle parallax. Both respect `prefers-reduced-motion`.
- **A confirmation chime** (`src/lib/sound.js`) — a soft two-note tone,
  synthesized with the Web Audio API on form/checkout success, so there's
  no audio file to ship or break.
- **Fuller content** — catalogue grew from 18 to 27 products (3 per
  category), journal from 7 to 10 articles, and an About page "Meet Your
  Curators" section (`src/data/curators.js`) gives the brief's repeated
  "your Curator" language an actual face.

**What this doesn't include, and why:** real photography (no photographer
or licensed stock available to me), a live database or CMS, and live
payment credentials — all called out with placeholders/TODOs at the
relevant files rather than silently faked. Verified: production build
succeeds (60 routes) and `eslint` runs clean.

## Beyond this build

Still open for a future pass: customer accounts, saved profiles/sizes
tied to an account (rather than the anonymous localStorage cart), a CMS
in place of `src/data/`, and server-side Paystack payment verification
(the current integration is entirely client-side, which is normal for
initiating a Paystack payment, but a production setup should verify the
transaction server-side via a Netlify Function before marking an order
complete).

## Real bugs found and fixed (not a deploy-lag issue this time)

Your report of `/shop/clothing` 404ing led to finding two genuine defects:

1. **Route conflict**: a static route (`/shop/new-arrivals/page.js`) sat
   directly alongside a dynamic route (`/shop/[department]/page.js`) at
   the same directory level — an invalid Next.js App Router combination.
   Fixed by folding New Arrivals into the dynamic route itself
   (`src/app/shop/[department]/page.js`); the URL is unchanged.
2. **The actual root cause**: this Next.js version requires `params` and
   `searchParams` to be `await`ed in Server Components (an async API
   change) — every dynamic page in the project (`product/[slug]`,
   `journal/[slug]`, `shop-by-occasion/[occasion]`, `shop/[department]`,
   `shop/[department]/[subcategory]`, plus `create-your-curation`'s
   `searchParams` usage) was reading them synchronously, which silently
   returned `undefined` and triggered `notFound()` on **every single
   dynamic route in the app** — not just Shop. Fixed across all 6 files.

**How this was verified**, properly this time: built the production
bundle, ran the actual `next start` server locally, and sent real HTTP
requests to every Shop link, all 13 Clothing subcategories, plus
products/journal/occasions/static pages — all returned genuine 200s, not
just "the file exists on disk."

**A second problem found while re-verifying**: `layout.js`'s Google Fonts
loading had been silently broken for several prior updates — a
strip-for-local-testing/restore-before-packaging process failed at some
point and the broken version kept getting carried forward as if it were
correct. Rebuilt `layout.js` from scratch and confirmed the restoration
three independent ways (grep for the font import, diff against the
pre-strip version, and unzipping the actual delivered file to check it
directly) before packaging this zip.

## Shop category pages rebuild (URL & filter overhaul)

A more detailed category-page spec came in after the first shop rebuild,
with real differences from what existed — implemented now:

- **Cleaner URLs**: `/shop/accessories` (was `/shop/jewellery-accessories`),
  `/shop/beauty` (was `/shop/beauty-self-care`), and short subcategory
  slugs — `/shop/clothing/trousers`, `/shop/clothing/blazers`,
  `/shop/clothing/ankara` (were the auto-generated
  `trousers-and-pants` / `blazers-and-jackets` / `ankara-and-african-inspired`).
  All old URLs are gone, not aliased — if anything external links to the
  old paths, they'll 404. Say if you want redirects added.
- **Department-specific filters**, not "show whatever varies": Clothing
  gets Size/Colour/Price/Occasion/Collection/Availability; Shoes drops
  Collection; Bags drops Size; Accessories/Beauty/Travel/Gifts get a
  **Type** filter (their subcategory) instead of Size/Occasion/Collection
  (`shop-taxonomy.js` → `departmentFilters`).
- **"Home" added to every breadcrumb** (`Breadcrumbs.jsx` now prepends it
  automatically) — `Home / Shop / Clothing / Dresses`, as specified.
- **Sort options corrected** to exactly Featured / Newest / Price Low-High
  / Price High-Low (dropped the Name A–Z I'd added, which wasn't
  requested).
- **Gifts got its 7 subcategories** (Gift Sets, Jewellery Gifts, Fragrance
  Gifts, Beauty & Self-Care Gifts, Travel Gifts, Nightwear Gifts,
  Accessories Gifts) and a **Create A Gift Curation** CTA specific to that
  page (every other department still says "Create Your Curation").
- **8 new products** to close per-department count gaps — catalogue is
  now 40 products: Shoes 4, Bags 4, Accessories 8, Beauty 4, Travel 4,
  Gifts 5, Clothing 11.
- **Editorial intro copy** written per subcategory that actually has
  products (`subcategory-intros.js`, ~35 entries) — the empty ones fall
  back to a generic line, matching the brief's own Dresses/Tops examples.
- **New Arrivals + Shop By Occasion sections added to every department
  landing page**, not just Clothing — a deliberate call: the brief's
  worked example was Clothing specifically, but nothing suggested other
  departments should work differently, so I applied it uniformly rather
  than leaving Clothing as a special case. Say if you want it Clothing-only.
- **Empty-state copy corrected** to the exact "Coming Soon / Beautiful
  things are on their way. / Explore Other Categories" from this brief.

**One number worth flagging**: Clothing sits at 11 products against the
brief's "4–8 per major category" guidance. I kept it there rather than
trimming, because cutting to 8 would mean re-introducing empty
subcategories the earlier pass had deliberately filled — a judgement
call, not an oversight.

Verified: production build succeeds (139 routes) and `eslint` runs clean.

## Both remaining gaps closed

- **Product image galleries.** Every product page now has a main image
  plus a 3-thumbnail strip (`ProductGallery.jsx`) — click a thumbnail to
  swap the main image. Real limitation, stated plainly: since there's no
  actual product yet, these are 3 different stock photos matching the
  same keywords, not genuine multiple angles of one item — that's not
  achievable with placeholder photography. The mechanism (main image +
  thumbnails + click-to-swap) is real and production-ready; once real
  photography exists, swap `ProductGallery`'s seed array for real image
  URLs and nothing else needs to change.
- **Complete The Look extended from 4 to all 11 clothing pieces** in the
  catalogue (`complete-the-look.js`) — every dress, top, skirt, set,
  trouser, blazer, nightwear, and swimwear piece now has a curated
  companion bundle. Scoped to garments deliberately: a candle or a
  luggage tag doesn't need an outfit bundle the way a dress does, so
  those 21 non-clothing products don't have one, by design rather than
  oversight.

## Post-delivery audit fixes

A direct re-check against the shop architecture spec turned up three real
gaps, now fixed:

- Wishlist and Quick View buttons on product cards only appeared on
  `:hover` — invisible (though still technically tappable) on touch
  devices, i.e. broken on actual phones. Now always visible below the
  `md` breakpoint, hover-reveal only on pointer-capable screens.
- The wishlist icon in the nav was hidden below the `sm` breakpoint —
  gone on real phone widths. Now visible at every size (unlike WhatsApp,
  wishlist has no floating-button fallback for mobile).
- No Brand/Collaboration filter existed in the filter panel despite being
  listed in the spec and already present in the product data model. Added
  — it won't visibly appear yet since every product currently shares the
  same brand and no collaboration, but the mechanism is wired for when
  that data diversifies.

Also tightened: product cards now show the actual colour name when a
product has one (not just a count), closer to "available colour where
relevant" as literally specified.

## Shop architecture rebuild

Full Shop taxonomy and e-commerce architecture, per spec:

- **7 departments, 46 real subcategories** — every one is a real route
  (`/shop/clothing/dresses`, `/shop/shoes/sandals`, etc.), not a
  client-side filter. Ones without products yet show a genuine "Coming
  soon to Dame Allure" page instead of a 404 (`EmptyState.jsx`).
- **Catalogue expanded 27 → 32 products** with the full data model:
  subcategory, salePrice (unused — no items are on sale, matching "don't
  oversell discounts"), stockQuantity, collection, **productSource**
  (internal-only: Dame Allure Exclusive / Curated / Partner / On Demand —
  never rendered to customers), brand, collaboration, SKU, tags, badge,
  isNewArrival.
- **Mega-menu** for Shop (desktop: click-toggled dropdown with all
  departments/subcategories; mobile: accordion, department-level only so
  the mobile menu doesn't become 46 items long).
- **Sort + filter** (`ShopProductBrowser.jsx`) on every department,
  subcategory, and occasion page — size, colour, price band, occasion,
  collection, availability. Each filter only renders when the current
  product set actually varies on that dimension (e.g. no colour filter
  shows on a subcategory where everything's ivory).
- **Breadcrumbs** everywhere in the shop hierarchy, including product
  pages.
- **Product cards**: badges (NEW / Dame Allure Exclusive / Limited / Low
  Stock — used on 6 of 32 products, not everywhere), a wishlist heart, and
  a Quick View button.
- **Quick View** — preview and add to bag without leaving the grid
  (`QuickViewModal.jsx` + `quick-view-context.jsx`).
- **Wishlist** — real, persisted to localStorage, with its own icon +
  count in the nav and a `/wishlist` page (`wishlist-context.jsx`).
- **Complete The Look** — wired onto 4 flagship products (Ankara Wrap
  Dress, Silk Column Gown, Midi Lace Dress, Resort Maxi Dress); each
  companion piece is individually selectable, plus a bundled "Shop The
  Look" button (`complete-the-look.js`, `CompleteTheLook.jsx`).
- **Dame Allure Selects** — the 6-item editorial pick, on the Shop hub,
  hand-picked via `dame-allure-selects.js` (not algorithmic).
- **New Arrivals** as its own real page and mega-menu entry.
- **Search** upgraded to match natural multi-word queries ("gold
  earrings," "work trousers," "travel bag") against tags, colours, and
  occasions, not just names.

Verified: production build succeeds (124 routes) and `eslint` runs clean.

### What this doesn't include

- **Real inventory-scale filtering.** The filter UI is genuinely
  functional, but with 1-3 products per subcategory in this launch
  assortment, its value is mostly architectural right now — it'll matter
  once the catalogue grows.
- **Server-side wishlist/cart sync across devices.** Both are
  localStorage-only (same as before) — a signed-in customer account would
  be needed for cross-device persistence.
- **Complete The Look isn't on all 32 products**, only the 4 flagship
  pieces listed above — extending it to more products is a `complete-the-look.js`
  data edit, not new code.

## Homepage refinements (targeted, not a rebuild)

- Hero eyebrow → "A Women's Lifestyle Destination"; secondary CTA →
  "Explore Dame Allure" (now points to `/shop`, broader than the old
  Collections-only link, matching the broader phrasing)
- Hero image swapped to less travel-specific keywords
  (`fashionmodel,editorial,confidentwoman`) — see the caveat below
- New homepage section between the hero and "What Are You Preparing
  For?": **"More than a wardrobe. A world curated around her."** — six
  tiles (Clothing, Shoes & Bags, Jewellery & Accessories, Beauty &
  Self-Care, Travel, Gifts) linking into Shop
  (`src/components/home/MoreThanAWardrobe.jsx`,
  `src/data/lifestyle-categories.js`)
- "Shoes & Bags" has no single matching department, so that tile links
  to `/shop` generally rather than favouring one — flagged in the data
  file's comment if you'd rather point it somewhere specific
- Everything else on the homepage (What Are You Preparing For, the
  philosophy quote, Exclusives, Create Your Curation CTA) is unchanged

## Since the amendment

- **Fixed real dead links:** the footer's Delivery, Returns, Privacy and
  Terms links pointed to pages that never existed — all four now exist
  with placeholder policy copy (clearly marked as needing real legal
  review before launch).
- **Placeholder images now contextually match their content:** switched
  from random Picsum photos to keyword-matched LoremFlickr — Work-related
  imagery looks like an office, Jewellery & Accessories looks like
  jewelry, the hero looks like fashion editorial, and so on. Every
  product, department, occasion, journal article, and curator portrait
  has explicit `imageKeywords` in its data file.
- **Fixed a real bug:** the Collections page's Signature Collection image
  had no positioned/sized wrapper around a `fill` image — would have
  rendered broken or invisible.
- **Subtle rounded corners** added throughout (`rounded-sm`) — images,
  buttons, filter chips, size/colour selectors, badges — per request,
  restrained rather than fully rounded.
- **Swept for leftover "Edit" terminology** the amendment pass missed:
  packaging copy, footer newsletter text, the cart drawer, the 404 page,
  the About page's philosophy line and curator bios, and one journal
  article whose slug/title/body still said "Travel Edit."

## Since Stage 7

- Every placeholder now uses real, keyword-matched photography from LoremFlickr with a
  brand-colour tint (see the Photography section above), replacing both
  the original gradient blocks and an earlier flat-colour-plus-text
  version that read as bland/empty — particularly in the hero, which also
  had text duplicated inside the placeholder image itself.
- Fixed the hero's vertical alignment: the text column was being centred
  against a much taller image, leaving a large empty gap above the
  headline on desktop. It now top-aligns instead.
- The "style" question in both Create Your Edit and the Gift Edit form is
  now multi-select — customers can choose as many style words as apply
  (e.g. "Feminine" + "Minimal") instead of only one.

## Notes

- Product and content data will live in `src/data/` as plain JS so it's easy
  to swap for a CMS or database later without touching components.
- The Create Your Edit and Gifting forms will initially post to a stub in
  `src/lib/` - easy to wire to email, WhatsApp, or a CRM afterward.
