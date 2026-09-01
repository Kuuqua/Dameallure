# Dame Allure — Website

Next.js + Tailwind CSS project. All 7 build stages from the brief are
complete: design system, homepage, shop + products, Create Your Edit,
Travel + Gifting, About/Journal/Contact, and a responsive/accessibility/
performance/SEO pass.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy on Netlify

1. Push this folder to a GitHub repo (or drag-and-drop the folder into Netlify's
   "Deploy manually" UI).
2. In Netlify: **New site from Git** -> select the repo.
3. Build command: `npm run build` - Publish directory: `.next`
   (already set in `netlify.toml`, along with the official
   `@netlify/plugin-nextjs` plugin - Netlify will detect and install it
   automatically).
4. Deploy.

## Before you launch - replace these placeholders

- **`src/data/site.js`**
  - `whatsappNumber` - currently a placeholder. Set it to the real Dame
    Allure business number, international format, digits only (e.g.
    `233241234567`).
  - `email`, `instagram` - currently placeholders.
- **Logo files** are in `public/brand/` (`logo.png`, `icon.png`) - already
  wired into the header and footer from your uploaded artwork.

## Photography — all placeholders now visible, real images

Every image on the site is currently a temporary [placehold.co](https://placehold.co)
image in the brand palette (built by `src/lib/placeholder.js`), rather than
a plain colour block — so the site looks and feels finished today, and
swapping in real photography later is a small, contained change per spot:

- `src/components/shop/ProductImagePlaceholder.jsx` — the shared
  placeholder used by every product card, product detail page, shop
  category tile, and journal card. **Swap this one component and most of
  the site updates.**
- `src/components/editorial/Hero.jsx` — homepage hero panel
- `src/components/brand/CollaborationCard.jsx` — Dame Allure Exclusives
  lookbook images
- `src/components/brand/PackagingShowcase.jsx` — packaging visual on the
  Curation Experience page
- `src/app/travel/page.js` — Travel page hero image

To swap any of these for a real photo: drop the image in `public/`, then
replace the `<Image src={placeholderImage(...)} ... />` with
`<Image src="/your-image.jpg" ... />` (keep the surrounding `fill`,
`sizes`, and `className="object-cover"` props so sizing stays correct).
Once nothing references `src/lib/placeholder.js` anymore, you can also
remove the `images.remotePatterns` entry for `placehold.co` in
`next.config.mjs`.

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

## Beyond this MVP

The architecture is set up so these can be added without a rewrite:
customer accounts, saved profiles/sizes, real payment/checkout, a CRM or
email backend behind the forms, and a real product/content database in
place of `src/data/`.

## Since Stage 7

- Every gradient placeholder was replaced with a real placehold.co image
  (see the Photography section above) so the site has visible imagery
  everywhere until real photography is ready.
- The "style" question in both Create Your Edit and the Gift Edit form is
  now multi-select — customers can choose as many style words as apply
  (e.g. "Feminine" + "Minimal") instead of only one.

## Notes

- Product and content data will live in `src/data/` as plain JS so it's easy
  to swap for a CMS or database later without touching components.
- The Create Your Edit and Gifting forms will initially post to a stub in
  `src/lib/` - easy to wire to email, WhatsApp, or a CRM afterward.
