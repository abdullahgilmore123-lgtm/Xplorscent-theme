# Xplor Scent — Collection Structure

Proposed collection architecture for the 14-product catalog. Only `/collections/all`
is currently discoverable in the site's index, so this structure is additive — it
creates the shopping-intent paths the catalog deserves without touching live URLs.

---

## 1. Primary collections (by product type)

| Collection | Handle | Rule (automated) | Role |
|---|---|---|---|
| All Fragrances | `fragrances` | Product type = `Eau de Parfum` | Main shop destination (5 products) |
| Hair & Body Mists | `mists` | Product type = `Hair & Body Mist` | Lighter-wear category (4) |
| Mist & Fragrance Sets | `sets` | Product type = `Fragrance Set` | Gifting/value category (4) |
| All Products | `all` | Built-in | Fallback, search, "shop all" CTAs |

## 2. Scent-family collections (the discovery layer)

Powered by tags already present in the product CSV. These are the four cards in the
homepage scent finder and the "Shop by Scent" dropdown.

| Collection | Handle | Tag rule | Products |
|---|---|---|---|
| Oud & Spicy | `oud-spicy` | tag = `oud & spicy` | The One (+ mist, set) |
| Citrus & Aromatic | `citrus-aromatic` | tag = `citrus & aromatic` | Sensation (+ mist, set) |
| Fruity & Vibrant | `fruity-vibrant` | tag = `fruity & vibrant` | Victorious (+ mist, set) |
| Floral & Woody | `floral-woody` | tag = `floral & woody` | Essence of Elegance, True Imagination (+ mist, set) |

## 3. Merchandising collections

| Collection | Handle | Rule | Role |
|---|---|---|---|
| Best Sellers | `best-sellers` | **Manual** — owner picks | Homepage "Best sellers" section |
| New Arrivals | `new` | Manual or tag `new` | Homepage "New & noteworthy" (optional; use when launches happen) |

## 4. Collection content standards

Each collection gets, in admin:
- **Image** 2400 × 800 px (3:1) — moody ingredient/texture photography per family
  (oud wood & smoke; citrus & herbs; orchard fruit; white florals).
- **Description** — one to two sentences, keyword-bearing, e.g. *Oud & Spicy*:
  "Deep, commanding compositions built on Arabian oud, warm amber and black pepper.
  For evenings and statements."
- **SEO title pattern:** `{Family} Fragrances | Unisex Eau de Parfum | Xplor Scent`

## 5. Navigation mapping

**Main menu (`main-menu`)**
```
Fragrances        → /collections/fragrances
Mists             → /collections/mists
Sets              → /collections/sets
Discovery Set     → /products/xplor-scent-discovery-spray-set-5-piece-perfume-sample-bundle
Shop by Scent ▾   → Oud & Spicy / Citrus & Aromatic / Fruity & Vibrant / Floral & Woody
About             → /pages/about
```

**Footer menu (`footer`)**
```
About · FAQ · Contact · Charity · Returns & Refund Policy · Privacy Policy · Terms
```

**Search quick links** (header setting): Oud · Citrus · Floral · Discovery Set.

## 6. Filters & sorting (Search & Discovery app)

Enable as storefront filters, in this order:
1. **Scent family** (tag-based) — the highest-value filter for fragrance shoppers
2. **Product type**
3. **Price**
4. **Availability**

Default sort: *Best selling*. All standard sort options remain enabled.

## 7. Cross-sell graph (complementary products)

Configure in Search & Discovery per product:

```
Each EDP           →  its mist, its set, Discovery Set
Essence of Elegance→  Discovery Set, True Imagination (closest family neighbor)
Each mist          →  its EDP, its set
Each set           →  Discovery Set, another family's EDP
Discovery Set      →  The One, Victorious (award halo)
```
