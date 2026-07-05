# Changelog

All notable changes and the design decisions behind them.

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
