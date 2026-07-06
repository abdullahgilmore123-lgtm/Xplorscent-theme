# XplorScent — Store Setup Guide

This folder is **not part of the theme upload** — exclude it (and the `.md` files) when
zipping the theme. It contains everything needed to configure the *store* so the theme
lights up with your real catalog.

> **Provenance.** Every product below exists on the live store today (verified July 2026
> via the store's public product pages, HTML sitemap, and Fragrantica's brand listing).
> Nothing is invented. Titles are cleaned per the audit (quotation marks removed from
> `"The One" Fragrance` → `The One — Eau de Parfum`); handles match the live URLs so
> existing links and SEO equity are preserved.

---

## 1. Products (`products.csv`)

Import via **Products → Import** in the Shopify admin. 14 products:

| Product | Type | Handle (matches live site) |
|---|---|---|
| The One — Eau de Parfum | Eau de Parfum | `the-one-fragrance` |
| Sensation — Eau de Parfum | Eau de Parfum | `sensation-fragrance` |
| Victorious — Eau de Parfum | Eau de Parfum | `victorious-fragrance` |
| Essence of Elegance — Eau de Parfum | Eau de Parfum | `essence-of-elegance-fragrance` |
| True Imagination — Eau de Parfum | Eau de Parfum | `true-imagination-fragrance` |
| The One — Hair & Body Mist | Hair & Body Mist | `the-one-hair-body-mist` |
| Sensation — Hair & Body Mist | Hair & Body Mist | `sensation-hair-body-mist` |
| Victorious — Hair & Body Mist | Hair & Body Mist | `victorious-hair-body-mist` |
| True Imagination — Hair & Body Mist | Hair & Body Mist | `true-imagination-hair-body-mist` |
| The One — Mist & Fragrance Set | Fragrance Set | `the-one-fragrance-mist-set` |
| Sensation — Mist & Fragrance Set | Fragrance Set | `sensation-mist-fragrance-set` |
| Victorious — Mist & Fragrance Set | Fragrance Set | `victorious-mist-fragrance-set` |
| True Imagination — Mist & Fragrance Set | Fragrance Set | `true-imagination-mist-fragrance-set` |
| Discovery Spray Set — 5 × 3 mL | Discovery Set | `xplor-scent-discovery-spray-set-5-piece-perfume-sample-bundle` |

**You must fill in after import** (values intentionally not guessed):

- **Prices** — not exposed in public search indexes, so the CSV leaves them blank
  (Shopify imports them as 0.00). Set your live prices before publishing. If you import
  into your *existing* store, skip the CSV entirely — the theme works with your current
  products as-is.
- **Images** — you own the photography on xplorscent.com. Re-upload your existing
  product photos (or export from your current store: Products → Export → include images,
  then the CSV round-trip carries the CDN URLs). The theme generates every responsive
  size, lazy-loads below the fold, and serves modern formats automatically via Shopify's
  CDN — no manual compression needed. Recommended master size: 1600 × 2000 px (4:5).
  Add a second lifestyle/texture image per product for the card hover effect.
- **Inventory & weights** — weights in the CSV are shipping estimates (EDP 500 g,
  mist 300 g, set 800 g, discovery 150 g); adjust to your actuals.

The CSV includes per-product **scent-pyramid metafields** (top/heart/base notes from the
live product pages and Fragrantica) that the product template renders automatically, plus
**SEO titles and meta descriptions** for every product.

## 2. Metafield definitions

Create these once in **Settings → Custom data → Products** (all *Single line text*):

| Name | Namespace and key |
|---|---|
| Top notes | `custom.top_notes` |
| Heart notes | `custom.heart_notes` |
| Base notes | `custom.base_notes` |

The CSV columns then populate them on import. Review-app ratings use the standard
`reviews.rating` / `reviews.rating_count` definitions that review apps create themselves.

## 3. Collections (automated, by tag or type)

| Collection | Handle | Condition |
|---|---|---|
| All Fragrances | `fragrances` | Product type = `Eau de Parfum` |
| Hair & Body Mists | `mists` | Product type = `Hair & Body Mist` |
| Mist & Fragrance Sets | `sets` | Product type = `Fragrance Set` |
| Oud & Spicy | `oud-spicy` | Tag = `oud & spicy` |
| Citrus & Aromatic | `citrus-aromatic` | Tag = `citrus & aromatic` |
| Fruity & Vibrant | `fruity-vibrant` | Tag = `fruity & vibrant` |
| Floral & Woody | `floral-woody` | Tag = `floral & woody` |
| Best Sellers | `best-sellers` | Manual — pick your top products |

Give each collection an image (2400 × 800 px) and a one-line description — the theme's
collection banner uses both.

## 4. Navigation

**Main menu** (`main-menu`):
- Fragrances → `/collections/fragrances`
- Mists → `/collections/mists`
- Sets → `/collections/sets`
- Discovery Set → `/products/xplor-scent-discovery-spray-set-5-piece-perfume-sample-bundle`
- Shop by Scent (nested) → the four family collections
- About → `/pages/about`

**Footer menu** (`footer`): About, FAQ, Contact, Charity, Returns & Refund policy,
Privacy policy, Terms of service.

**Search quick links** (assign in Header section → "Popular search links"): create a menu
with Oud, Citrus, Floral, Discovery Set.

## 5. Pages

| Page | Template | Notes |
|---|---|---|
| About | `page.about` | Founder story (Nadim Razaq) pre-composed from the live About copy |
| FAQ | `page.faq` | The store's real FAQ topics (incl. Discovery Set samples answer) + FAQPage schema |
| Contact | `page.contact` | Form + support@xplorscent.com pre-filled; add phone/address if wanted |
| Charity | `page.charity` | Mission, four causes, JUST ONE TREE partner block — matches the live Charity page story |

## 5b. Blogs

The live store runs two blogs — recreate them so existing content has a home:

| Blog | Suggested handle |
|---|---|
| Scented Reflections | `scented-reflections` |
| Whispers Of Inspirations | `whispers-of-inspirations` |

Both use the theme's blog/article templates automatically. Add one to the main menu
(e.g. "Journal") when it has 3+ posts; until then leave blogs out of the nav.

## 6. Theme editor wiring (10 minutes)

1. **Homepage → Best sellers**: point at `best-sellers` (falls back to All Products until then).
2. **Homepage → Scent finder**: link the four cards to the family collections; set the
   callout button to the Discovery Set product; add ingredient photography (800 × 1060).
3. **Hero**: your campaign image (2400 × 1350) + second button → Discovery Set.
4. **Instagram section**: profile URL + six recent post images you own.
5. **Announcement bar**: your live shipping offer.
6. **Cart drawer**: set the real free-shipping threshold.
7. **Product pages → "Pairs well with"**: in the free **Search & Discovery** app, set
   each EDP's complementary products to its matching mist and the Discovery Set.
8. **Filters**: in Search & Discovery, enable Product type, Price and the scent-family
   tag as storefront filters.

## 7. Apps that complete the experience (all free)

- **Shopify Search & Discovery** — powers filters + complementary products.
- **Any major review app** (Judge.me, Loox, …) — populates the theme's star ratings via
  standard metafields; add its widget as an app block on the product template if wanted.
