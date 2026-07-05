# XplorScent — Premium Shopify Theme

A bespoke Shopify Online Store 2.0 theme for **XplorScent**, the Dubai-crafted fragrance
house where French artistry meets Arabian oud. Minimal, editorial, photography-first —
built for conversion and speed, with zero dependencies.

- **Architecture:** Online Store 2.0 (JSON templates, section groups, app blocks)
- **Stack:** Liquid, one hand-written CSS file, ~10 KB of vanilla JS. No jQuery, no frameworks.
- **Design language:** warm white / soft beige / stone / charcoal, EB Garamond headings,
  Assistant body, one bronze accent used only for meaning.

---

## 1. Installation

The theme has no build step — the folder *is* the theme.

1. Zip the contents of this folder (the folders `layout/`, `templates/`, `sections/`,
   `snippets/`, `assets/`, `config/`, `locales/` must be at the **root** of the zip):
   ```sh
   cd xplorscent-theme
   zip -r ../xplorscent-theme.zip . -x '*.md' -x '.git*'
   ```
2. In Shopify admin: **Online Store → Themes → Add theme → Upload zip file.**
3. Preview, then **Publish** when ready.

### First 30 minutes after install

1. **Navigation** — create/confirm the `main-menu` and `footer` menus
   (Online Store → Navigation). The header, mobile drawer and footer read them.
2. **Logo & favicon** — Theme editor → Header section / Theme settings → Favicon.
   Text-logo fallback (the shop name in the editorial serif) is intentional and looks
   great until your mark is ready.
3. **Hero image** — Homepage → Image banner. Recommended 2400×1350 px.
4. **Collections** — point "Best sellers" and the four Scent finder cards at real
   collections (e.g. automated collections by tag: `oud`, `floral`, `fresh`, `oriental`).
5. **Discovery Set links** — the hero's second button and the Scent finder callout are
   built to route to your Discovery Set product. Set both links.
6. **Free shipping threshold** — Theme editor → Cart drawer section.
7. **Contact page** — create a page with template `page.contact`; About → `page.about`;
   FAQ → `page.faq`.
8. **Social links** — Theme settings → Social media.

---

## 2. Theme features

### Conversion
- **AJAX cart drawer** with free-shipping progress bar, order notes, quantity steppers —
  no page reloads anywhere in the add-to-cart flow.
- **Sticky add-to-cart bar** on product pages (appears when the buy box scrolls away).
- **Quick add** from product cards (single-variant products add instantly; multi-variant
  route to the product page).
- **Pairs well with** (frequently bought together) via Shopify's complementary-products
  recommendations — configure pairings in the free **Search & Discovery** app.
- **Related products** + **Recently viewed** (browser-local, privacy-friendly).
- **Trust indicators** and shipping/returns accordions beside the buy button.
- Designed empty states: 404, empty cart, zero search results all route back to product.

### Merchandising
- Scent finder section (shop by fragrance family) — the signature discovery journey.
- Scent pyramid block on product pages reading metafields
  `custom.top_notes`, `custom.heart_notes`, `custom.base_notes` (plain-text metafields;
  section-level fallbacks available in the editor).
- Star ratings from the standard `reviews.rating` metafields — compatible with
  Judge.me, Loox, Shopify Product Reviews etc., rendered with **zero** app JavaScript.
  Review apps can also inject their full widget via the product page's app block slot.
- Storefront filtering & sorting on collections and search (Search & Discovery app
  controls which filters appear).

### Performance
- Single CSS file, single small JS file (+1 product-page file, loaded only there).
- Responsive `srcset`/`sizes` on every image, lazy-loading below the fold,
  `fetchpriority=high` on hero/gallery LCP images, explicit dimensions (no CLS).
- Shopify-hosted fonts with `font-display: swap` and preconnect.

### Accessibility
- Focus-trapped drawers/dialogs with `Escape` to close, visible focus rings,
  skip-to-content link, `aria-label`s on all icon buttons, keyboard-usable galleries,
  AA-contrast palette, `prefers-reduced-motion` respected everywhere.

### SEO
- JSON-LD: `Organization`, `WebSite` (+ SearchAction), `Product`/`Offer`/`AggregateRating`,
  `Article`, and optional `FAQPage` on FAQ sections.
- One `h1` per page, semantic landmarks, meta/OG/Twitter tags, canonical URLs.

---

## 3. Recommended image sizes

| Placement | Size (px) | Ratio | Notes |
|---|---|---|---|
| Hero banner | 2400 × 1350 | 16:9 | Focal point in lower two-thirds; keep text zones clean |
| Product photos | 1600 × 2000 | 4:5 | Neutral warm background; consistent bottle scale across products |
| Product hover (2nd image) | 1600 × 2000 | 4:5 | Lifestyle or texture shot |
| Collection banner | 2400 × 800 | 3:1 | Set on the collection in admin |
| Collection cards | 1200 × 800 | 3:2 | |
| Scent finder cards | 800 × 1060 | 3:4 | Moody ingredient/texture photography |
| Image-with-text | 1200 × 1500 | 4:5 | |
| Blog covers | 1600 × 1060 | 3:2 | |
| Logo | ≤ 600 wide | — | SVG or transparent PNG |
| Favicon | 64 × 64 | 1:1 | |

Upload generously sized originals — the theme generates every responsive size itself.
Where you haven't added imagery yet, the theme shows clearly-labeled Shopify placeholder
graphics so nothing ever looks broken.

## 4. Customization map

Everything is editable in the Theme editor — there is no hardcoded storefront text,
image or link in the theme.

- **Theme settings** (gear icon): colors, typography + scale, page width, section
  spacing, corner radii, product-card behavior, currency codes, social links, favicon.
- **Header group:** announcement bar, logo, menus, sticky behavior, search quick links.
- **Footer group:** tagline, menu columns, newsletter, social/payment/policy toggles,
  country & language selectors.
- **Every homepage section** is block-based: reorder, remove, or add more from the
  section picker (Image banner, Featured collection, Collection list, Scent finder,
  Image with text, Rich text, Multicolumn, Testimonials, FAQ, Newsletter, Recently viewed).
- **Product template blocks** can be reordered/removed: vendor, title, rating, price,
  variant picker, buy buttons, trust row, description, scent pyramid, accordions
  (any number), pairs-well-with, plus third-party **app blocks**.

## 5. File structure

```
xplorscent-theme/
├── layout/          theme.liquid, password.liquid
├── templates/       JSON templates (+ customers/, gift_card.liquid)
├── sections/        27 sections incl. header/footer groups & cart drawer
├── snippets/        product-card, price, rating, facets, icons, pagination, …
├── assets/          base.css, theme.js, product.js
├── config/          settings_schema.json, settings_data.json
└── locales/         en.default.json (all storefront strings, fully translatable)
```

## 6. Development notes

- Custom elements (`<cart-drawer>`, `<product-form>`, `<variant-picker>`, …) follow the
  Dawn pattern; all cart mutations use the AJAX Cart API with Section Rendering for
  HTML-accurate re-renders.
- To lint locally: `shopify theme check` (Theme Check ships with the Shopify CLI).
- To iterate live: `shopify theme dev` from this folder (optional — not required to use
  the theme).

See `AUDIT.md` for the Phase-1 site audit this design responds to, and `CHANGELOG.md`
for design decisions.
