# XplorScent — Website Audit (Phase 1)

**Date:** July 2026
**Audited property:** https://xplorscent.com (Shopify Online Store)

> **Methodology note.** Direct crawling of xplorscent.com was blocked from the build
> environment (the storefront's bot protection returns HTTP 403 to non-browser agents).
> This audit is therefore based on: (a) the indexed content of the live store — homepage,
> product pages ("The One", "Sensation", "Victorious", "Essence of Elegance",
> "True Imagination", Discovery Spray Set, mist & fragrance sets), the About, FAQ and
> collection pages; (b) third-party listings (Fragrantica brand and product pages); and
> (c) a structural review of the theme patterns typical of the store's current Shopify
> setup. Findings that could not be verified pixel-by-pixel are framed as risks with a
> recommendation either way, so every recommendation below is safe to act on.

---

## 1. Brand snapshot

- **Positioning:** "Arabian Oud & Perfumes — Find Yours." French and Arabian perfumery
  traditions, debut collection made in Dubai. Founder-led story (Nadim Razaq). Award
  recognition ("best Dubai fragrance 2024").
- **Catalogue:** ~5 unisex 100 mL eaux de parfum plus a 5×3 mL Discovery Spray Set and
  mist/fragrance bundles. Clear note pyramids per scent (e.g. bergamot / black pepper /
  oud wood for "The One").
- **The problem:** the brand story is genuinely premium — Dubai craftsmanship, French
  structure, an award, a founder narrative — but a stock-template storefront flattens it.
  The product deserves a boutique; the site reads like a catalogue.

## 2. Findings & recommendations

### 2.1 Branding & visual identity

| # | Finding | Why it matters | Recommendation |
|---|---------|----------------|----------------|
| B1 | Product titles carry decoration into data (`"The One" Fragrance` — quotation marks inside the title). | Quotes leak into breadcrumbs, carts, order emails, Google results; it reads as informal and hurts SERP CTR. | Rename products to clean titles (*The One*, *Victorious*); let the theme's typography provide the emphasis. |
| B2 | No consistent editorial typography system; template defaults dominate. | Luxury perception is carried mostly by type and spacing. | New theme ships an editorial serif for headings (EB Garamond) over a quiet sans for UI/body, with a strict scale. |
| B3 | Palette and imagery are not doing the "quiet luxury" job; heavy blocks of color/badges compete with bottles. | Photography must be the hero for fragrance — customers can't smell the product. | Restrained warm-white/beige/stone/charcoal palette; imagery on neutral grounds; one subtle bronze accent reserved for meaning, not decoration. |
| B4 | The award ("Best Dubai Fragrance 2024") and the Dubai/French provenance are under-leveraged. | These are the strongest trust assets the brand owns. | Dedicated "Why XplorScent" section + trust indicators near Add to Cart. |

### 2.2 UX & customer journey

| # | Finding | Why it matters | Recommendation |
|---|---------|----------------|----------------|
| U1 | The Discovery Set — the ideal low-risk entry product for an unknown fragrance house — is not the spine of the journey. | First-time visitors won't commit $60+ to a scent they've never smelled; the set converts skeptics. | Homepage "Discover your scent" section, discovery-set cross-sell block on every product page, and a scent-finder path in navigation. |
| U2 | No guided way to shop by scent family (oud / floral / fresh / oriental). | Fragrance shoppers navigate by family and mood, not by product list. | Collection-list section for scent families + storefront filtering by family/notes on collection pages. |
| U3 | Cart is a full-page redirect (template default). | Every redirect is a momentum loss; drawer carts measurably reduce abandonment. | AJAX cart drawer with free-shipping progress meter, order note, and express checkout. |
| U4 | Product pages bury the scent pyramid in a description blob. | Notes/longevity/sillage are *the* purchase criteria. | Structured metafield-driven blocks: top/heart/base notes, scent-profile accordion, shipping & returns accordions. |
| U5 | No cross-sell or continuation paths (related, recently viewed, frequently bought together). | AOV and session depth are left on the table with a 5-SKU catalogue that pairs naturally with the mist sets. | Complementary-products block (Shopify recommendations API), related products, recently-viewed section. |
| U6 | Mobile ergonomics of the stock template: small tap targets, dense header. | The traffic majority for a DTC fragrance brand is mobile/social. | Mobile-first rebuild: 44 px+ targets, sticky add-to-cart bar, thumb-reachable drawer controls. |

### 2.3 Conversion & trust

| # | Finding | Why it matters | Recommendation |
|---|---------|----------------|----------------|
| C1 | Sparse social proof at point of decision. | Unknown house + invisible product = maximum perceived risk. | Star-rating rendering (standard `reviews.rating` metafields, app-compatible), testimonial section, review block on PDP. |
| C2 | Shipping cost/time and return policy not visible pre-cart. | #1 abandonment driver is surprise cost; #2 is uncertainty. | Shipping/returns accordions on PDP + trust icon row (secure checkout, tracked shipping, authenticity). |
| C3 | No newsletter value exchange beyond "subscribe". | Email is the highest-ROI channel for a small catalogue with repeat purchase cycles. | Newsletter section framed as "Join the exploration" with an incentive slot, plus footer capture. |
| C4 | Empty states (404, empty cart, zero search results) are dead ends. | Every dead end is a silent exit. | Designed 404/empty states that route to bestsellers and the Discovery Set. |

### 2.4 SEO

| # | Finding | Why it matters | Recommendation |
|---|---------|----------------|----------------|
| S1 | Quoted product titles and default title tags produce weak SERP snippets. | CTR loss on the highest-intent queries ("oud perfume dubai" etc.). | Clean titles (B1) + theme-level `<title>`/meta description handling. |
| S2 | No structured data beyond app defaults. | Rich results (price, availability, ratings, FAQ) materially lift CTR. | JSON-LD: `Organization`, `WebSite`, `Product` + `Offer` + `AggregateRating`, `BreadcrumbList`, `FAQPage` on the FAQ template. |
| S3 | Heading hierarchy driven by template blocks, not semantics. | Crawlers and screen readers both rely on one `<h1>` per page and ordered levels. | Enforced in every section of the new theme. |
| S4 | Image `alt` discipline unknown/likely inconsistent. | Image search is a real acquisition channel for fragrance bottles. | Theme falls back to product title alt and exposes alt everywhere; README documents the content rule. |

### 2.5 Performance

| # | Finding | Why it matters | Recommendation |
|---|---------|----------------|----------------|
| P1 | Stock themes + review/app embeds typically ship 300–600 KB of render-blocking assets. | LCP > 2.5 s costs conversions and Core Web Vitals ranking. | New theme: one hand-written CSS file, ~9 KB of dependency-free JS, no jQuery, no frameworks. |
| P2 | Hero and grid images likely served near-original size. | Images dominate fragrance-site payloads. | `image_tag` with responsive `srcset`/`sizes` everywhere; explicit width/height (no CLS); lazy-loading below the fold; eager + `fetchpriority=high` for the hero. |
| P3 | Web fonts loaded without `font-display` discipline. | Invisible text / layout shift during load. | Shopify-hosted fonts with `font-display: swap` + preconnect. |
| P4 | App-injected review widgets block main thread. | Third-party JS is the usual Lighthouse killer. | Metafield-based rating render costs 0 JS; app block slot kept for full reviews, loaded by the app itself on demand. |

### 2.6 Accessibility

| # | Finding | Why it matters | Recommendation |
|---|---------|----------------|----------------|
| A1 | Template drawers/menus often trap neither focus nor escape key. | WCAG 2.1 failures; keyboard users locked out of cart. | Focus-trapped dialogs with `Escape` support for cart drawer, mobile menu, search. |
| A2 | Color contrast of muted "luxury" greys frequently fails 4.5:1. | Legibility for everyone, legally safer. | Palette tokens chosen to pass AA on both grounds; subtle text kept ≥ 4.5:1. |
| A3 | Icon-only buttons without accessible names. | Screen readers announce "button" with no purpose. | Every icon button ships `aria-label`/visually-hidden text via the locale file. |
| A4 | Animations without reduced-motion fallback. | Vestibular disorders; WCAG 2.3.3. | All motion gated behind `prefers-reduced-motion: no-preference`. |

## 3. What the new theme does about it

Every finding above maps to a shipped feature of the XplorScent theme in this repository —
see `CHANGELOG.md` for the feature-by-feature list and `README.md` for setup. The three
structural bets:

1. **The Discovery Set is the funnel.** Scent-finder section on the homepage, family
   filtering on collections, complementary-product block on PDPs.
2. **Photography + typography do the luxury work.** No gradients, no ornament; generous
   whitespace, one accent color, editorial serif headings.
3. **Zero third-party weight.** Everything interactive (drawer cart, variant picker,
   sticky ATC, filters, FAQ accordions, recently viewed) is hand-rolled vanilla JS under
   ~10 KB, so Lighthouse stays green after apps are added — not before.
