# Changelog

All notable changes and the design decisions behind them.

## [1.3.0] — 2026-07-06

Visual-fallback release: the theme now previews as a finished boutique with zero grey
placeholders and zero empty image containers, while every image slot remains fully
dynamic — Shopify product media, collection images, and section settings always take
priority the moment they exist.

### Added
- **14 on-brand SVG visuals** (`assets/xs-visual-*.svg`, `assets/xs-family-*.svg`,
  1–2 KB each): five tinted bottle compositions (incl. a discovery-trio), a dusk-atelier
  hero scene, four scent-family ingredient artworks (oud smoke, citrus wheel, orchard
  fruit, blossom), three square lifestyle motifs, and a wide collection composition —
  all generated in the theme palette with grain texture.
- **`snippets/brand-visual.liquid`** — central renderer that cycles variants
  deterministically (e.g. by product id) with correct width/height and lazy/eager control.

### Changed
- Every `placeholder_svg_tag` usage removed (product cards, product gallery, hero,
  image-with-text, collection cards, list-collections, featured-collection onboarding,
  Instagram tiles) in favor of the brand visuals.
- Scent-finder cards and cart line items can no longer render empty image containers.
- Dead placeholder CSS removed; `.brand-visual` cover rule added.

## [1.2.0] — 2026-07-06

Content-sync release from the approved research phase (see repository-root
`SITE_AUDIT.md` and `IMPLEMENTATION_PLAN.md`, Phase 3).

### Added
- **Charity page template** (`page.charity`) — mission statement, four-causes row
  (mental health, autism awareness, homelessness, women's empowerment), JUST ONE TREE
  partner block; mirrors the live Charity page story.
- **Footer charity line + support email** — new footer settings (`charity_text`,
  `charity_link`, `support_email`) rendered under the brand tagline; defaults wired in
  the footer group.
- **Award trust chip** — optional fourth product-page trust item with star icon,
  defaulted to "Best Dubai Fragrance 2024"; homepage why-us column replaced the generic
  shipping column with the award.

### Changed
- Contact template pre-fills the verified support email (support@xplorscent.com).
- FAQ content synced to the live store's claims: longevity now "up to 12 hours",
  new "Do you offer samples or testers?" answer pointing at the Discovery Set
  (fixes the live site's outdated "no testers" answer).
- About template founder copy tightened to the verified live narrative.
- Store setup guide: Charity page, footer menu including Charity, and the two live
  blogs (*Scented Reflections*, *Whispers Of Inspirations*) documented.

## [1.1.0] — 2026-07-06

Catalog integration release: the theme now ships with the live Xplor Scent catalog and
the two remaining feature gaps closed.

### Added
- **Predictive search** — debounced live suggestions (products with thumbnails/prices,
  collections, pages) in the search drawer via the Shopify Predictive Search API +
  Section Rendering; keyboard-accessible, aria-live announced, zero dependencies.
- **Instagram section** — editor-managed 6-tile post grid with hover overlay and
  profile link; no embeds, no API tokens. Added to the homepage before the newsletter.
- **`setup/` folder** — `products.csv` with all 14 products currently sold on
  xplorscent.com (5 eaux de parfum, 4 hair & body mists, 4 mist & fragrance sets, the
  Discovery Spray Set): researched descriptions, scent-pyramid metafields sourced from
  the live product pages and Fragrantica, SEO titles/descriptions, tags, and handles
  matching the live URLs to preserve SEO equity. `STORE_SETUP.md` documents collections,
  navigation, pages, metafield definitions and app wiring. Prices and images are left
  to the store owner by design (not publicly verifiable / rights stay with the owner).

### Changed
- Homepage scent finder now reflects the real catalog's four families:
  Oud & Spicy, Citrus & Aromatic, Fruity & Vibrant, Floral & Woody.
- README install steps cover the setup folder and zip exclusions.

## [1.0.0] — 2026-07-05

Initial release: a complete, dependency-free Shopify Online Store 2.0 theme built
bespoke for XplorScent, responding point-by-point to the Phase-1 audit (`AUDIT.md`).

### Design decisions

- **Restraint as luxury.** Palette limited to warm white `#FDFCFA`, soft beige
  `#F4F0E9`, charcoal `#1C1B19` and near-black `#191714`, with a single muted bronze
  accent `#8A6D4A` reserved for meaning (ratings, sale prices, progress). No gradients,
  no ornament, no decorative illustration — photography and typography carry the brand.
- **Editorial typography.** EB Garamond (serif) for headings at a fluid clamp-based
  scale over Assistant (sans) for body/UI. Uppercase letterspaced labels ("eyebrows")
  give sections a magazine rhythm. Both fonts are merchant-swappable; the whole scale
  can be tuned ±% from theme settings.
- **The Discovery Set is the funnel.** A dedicated Scent finder section routes visitors
  by fragrance family, the hero carries a second CTA for the set, and product pages
  cross-sell it through the complementary-products block.
- **Boutique motion.** Only fades, soft reveals on scroll (IntersectionObserver) and
  gentle image scale on hover, all gated behind `prefers-reduced-motion`.
- **Zero third-party weight.** Every interactive element is hand-written vanilla JS
  (~10 KB total): cart drawer, variant picker, gallery, sticky ATC, drawers, facets,
  recently viewed. Review apps plug in via metafields + app blocks instead of scripts.

### Features

**Global**
- Section groups for header (announcement + header) and footer.
- Sticky header with hide-on-scroll-down option, hover/focus dropdown menus,
  focus-trapped mobile menu drawer and search drawer.
- AJAX cart drawer: free-shipping progress meter, order note, quantity steppers,
  Section-Rendering-API re-renders, live header count bubble.
- Footer: brand tagline, menu columns, newsletter, social icons, payment icons,
  policy links, country/language selectors.

**Homepage** (pre-composed in `templates/index.json`)
- Full-bleed hero → Best sellers → Scent finder → Brand story (image-with-text)
  → Why XplorScent (icon multicolumn) → Testimonials → New & noteworthy → FAQ
  (with `FAQPage` schema) → Newsletter, all reorderable.

**Product page**
- Sticky scroll-snap gallery with thumbnails, variant-aware media switching.
- Block-based buy box: vendor, title, rating, price, pill variant picker, quantity,
  AJAX add-to-cart, optional dynamic checkout, trust row, description, scent pyramid
  (metafield-driven), unlimited accordions, pairs-well-with, app blocks.
- Sticky add-to-cart bar, related products (recommendations API), recently viewed
  (localStorage), full `Product` JSON-LD with offers and aggregate rating.

**Collections & search**
- Banner (image or minimal), storefront filtering with disclosure dropdowns, active
  filter chips, price range, sorting, designed empty state, paginated grid with
  eager-loaded first row.
- Search page handles products, articles and pages; search drawer with popular links.

**Other templates**
- Cart page (fallback for the drawer), contact (info + form + mini-FAQ), about
  (editorial story layout), FAQ, 404, blog/article (with comments + `Article` schema),
  full customer account suite, gift card, password page.

### Accessibility
- Focus traps + `Escape` in all dialogs, skip link, `aria-label`s on icon buttons,
  visually-hidden helper text, AA contrast, semantic landmarks, one `h1` per page,
  reduced-motion support.

### Known integration points (by design, not omissions)
- Star ratings read the standard `reviews.rating` metafields; install any major review
  app to populate them and (optionally) add its widget as a product app block.
- "Pairs well with" and collection filters are configured in the free Shopify
  **Search & Discovery** app.
- Scent pyramid reads `custom.top_notes` / `custom.heart_notes` / `custom.base_notes`
  single-line-text metafields.
