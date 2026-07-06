# Xplor Scent — Live Site Audit

**Property:** https://www.xplorscent.com (Shopify Online Store)
**Date:** July 2026 · **Prepared for:** brand owner (content permission granted)

> **Methodology.** The storefront's bot protection returns HTTP 403 to all non-browser
> agents, including from this build environment, so page-by-page pixel inspection was not
> possible. This audit synthesizes: the store's search-indexed content (homepage, all
> product pages, About, FAQ, Charity, policies, both HTML sitemaps), Fragrantica's brand
> and product listings, and structural analysis of the store's current Shopify setup
> (Avada SEO Suite sitemap pages indicate the app stack). Items that couldn't be visually
> verified are marked ⚠︎ and framed so the recommendation is safe either way.

---

## 1. Site inventory (verified)

**Products (14):** 5 eaux de parfum (The One, Sensation, Victorious, Essence of Elegance,
True Imagination — all unisex 100 mL), 4 Hair & Body Mists (The One, Sensation,
Victorious, True Imagination), 4 Mist & Fragrance Sets (same four scents), and the
Discovery Spray Set (5 × 3 mL). Full details in `PRODUCT_CATALOG.md`.

**Pages:** About, FAQs, Contact, Charity, Returns & Refund Policy, Privacy Policy,
HTML sitemap ×2 (app-generated).

**Blogs (2):** *Scented Reflections* and *Whispers Of Inspirations*.

**Support channel:** support@xplorscent.com (cited on FAQ and Returns pages).

**Brand assets:** tagline "Arabian Oud & Perfumes — Find Yours"; founder story (Nadim
Razaq, IT career → perfumery, "luxury within reach"); Dubai provenance; Best Dubai
Fragrance 2024 award; charity commitment (JUST ONE TREE reforestation partner; causes
include mental health, autism awareness, homelessness, women's empowerment).

## 2. Area-by-area findings

### 2.1 Homepage
| # | Finding | Recommendation |
|---|---|---|
| H1 | Title tag "Arabian Oud & Perfumes \| Find Yours" is strong, but the indexed description leans generic ("luxury within reach"). | Keep the tagline; tighten homepage meta description around oud + Dubai + unisex + discovery set. |
| H2 | ⚠︎ Template-driven layout doesn't sequence a conversion journey (hero → proof → discovery → story). | Editorial homepage flow: hero → best sellers → scent-family finder → founder story → why-us → reviews → FAQ → newsletter. |
| H3 | The Discovery Set — the ideal first purchase for an unknown house — is not the homepage's spine. | Give it a persistent CTA in the hero and a dedicated callout in the scent finder. |
| H4 | The award and charity story are invisible at the top of the funnel. | "Why Xplor Scent" row: award, Dubai craft, longevity (up to 12 h), giving back. |

### 2.2 Products
| # | Finding | Recommendation |
|---|---|---|
| P1 | Titles carry decoration into data: `"The One" Fragrance` (quotation marks in the title). Leaks into carts, emails, and SERPs; reads informal. | Clean titles (`The One — Eau de Parfum`); keep live URL handles to preserve SEO equity. |
| P2 | Scent pyramids are buried in description prose. Notes/longevity are *the* purchase criteria. | Structured top/heart/base metafields rendered as a visual pyramid block. |
| P3 | FAQ says "no sample sizes or testers" while the Discovery Set exists — contradictory trust signals. | Update the FAQ answer to point at the Discovery Set. |
| P4 | Mist ↔ EDP ↔ Set relationships aren't cross-sold on product pages. | "Pairs well with" (complementary recommendations): each EDP ↔ its mist, its set, and the Discovery Set. |
| P5 | ⚠︎ No visible review capture per product despite strong review quotes existing. | Metafield-based star ratings + review app; testimonial section for the existing quotes. |

### 2.3 Collections
| # | Finding | Recommendation |
|---|---|---|
| C1 | Only `/collections/all` surfaces in the index — no scent-family or product-type collections are discoverable. | Build the structure in `COLLECTION_STRUCTURE.md`: type collections (Fragrances / Mists / Sets) + four scent-family collections + Best Sellers. |
| C2 | No filtering/sorting narrative for a growing catalog. | Storefront filters: type, price, scent family (via tags), availability. |

### 2.4 Navigation
| # | Finding | Recommendation |
|---|---|---|
| N1 | ⚠︎ Nav likely mirrors the default page list rather than shopping intent. | Main menu: Fragrances · Mists · Sets · Discovery Set · Shop by Scent (dropdown) · About. Support/legal to footer. |
| N2 | Search is a high-intent path with no suggestions. | Predictive search with product thumbnails + popular-search quick links. |

### 2.5 Footer
| # | Finding | Recommendation |
|---|---|---|
| F1 | The charity story (a genuine differentiator) and the support email deserve permanent placement. | Footer: brand tagline, menus, newsletter, social, policies, payment icons; charity line linking to the Charity page. |
| F2 | ⚠︎ App-generated sitemap pages ("HTML sitemap") can leak into menus/index. | Keep them for SEO but out of navigation; noindex if the app allows. |

### 2.6 About
Strong raw material (founder narrative, Dubai + French craft, accessibility-of-luxury
mission) — the indexed copy is good. It needs editorial *presentation*: founder section,
craft section, values row (award, craftsmanship, charity), imagery. Copy itself can be
reused nearly as-is.

### 2.7 Contact
support@xplorscent.com is cited on policy pages but a designed contact experience
(form + response-time promise + quick-answer FAQ) reduces email anxiety and support load.

### 2.8 FAQ
Real topics verified: fragrance range, longevity (up to 12 h), international shipping
with tracked delivery + email confirmation, authenticity/craft, samples (outdated — see
P3). Recommendation: keep these as the canonical six-to-eight questions, add returns
(30-day window per Returns & Refund Policy page) and storage advice; ship with
`FAQPage` structured data.

### 2.9 Mobile experience
⚠︎ Could not be viewed directly. Standard risks for this template class: small tap
targets, dense header, full-page cart. Recommendations (verifiable wins regardless):
44 px+ touch targets, drawer cart, sticky add-to-cart, thumb-zone CTAs, horizontal
product scrollers with scroll-snap.

### 2.10 Branding
The brand's verbal identity (exploration, "Find Yours", two perfume traditions) is
distinctive; the visual identity is template-constrained. Direction: restraint-based
luxury — warm neutrals, editorial serif, photography-first, one bronze accent —
specified fully in `DESIGN_SYSTEM.md`.

## 3. SEO & performance notes

- Preserve all live product handles (done in the catalog file) — renaming URLs would
  burn existing equity from Fragrantica links and indexed pages.
- Structured data opportunities: `Product`+`Offer`+`AggregateRating`, `Organization`,
  `WebSite`+SearchAction, `FAQPage`, `Article`, `BreadcrumbList`.
- App stack (Avada SEO Suite detected) + typical review/feed embeds are the main
  performance risk; the theme strategy is zero third-party JS in the critical path.

## 4. Priority matrix

| Impact / Effort | Low effort | High effort |
|---|---|---|
| **High impact** | Clean titles, FAQ fixes, cross-sell wiring, announcement bar offer | Homepage journey, collection structure, drawer cart |
| **Lower impact** | Sitemap noindex, footer charity line | Blog build-out for the two existing blogs |
