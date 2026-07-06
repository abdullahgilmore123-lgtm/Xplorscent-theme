# Xplor Scent — Implementation Plan

Status-honest plan: a complete OS 2.0 theme already exists in this repository
(`xplorscent-theme/`, Theme Check clean, 75 files). This plan maps the research in
`SITE_AUDIT.md` / `PRODUCT_CATALOG.md` / `COLLECTION_STRUCTURE.md` / `DESIGN_SYSTEM.md`
onto what's built, what changes are proposed, and what only the store owner can do.

**⛔ Nothing below Phase 3 will be executed until you approve.**

---

## Phase 1 — Research & documentation ✅ (this phase, complete)

- Full-site research (products, pages, blogs, policies, support channel, charity story).
- Five deliverables written: SITE_AUDIT, PRODUCT_CATALOG, COLLECTION_STRUCTURE,
  DESIGN_SYSTEM, IMPLEMENTATION_PLAN.

## Phase 2 — Already built (previous sessions, pushed to this branch)

Theme core: layout, 29 sections, snippets, one CSS file, ~10 KB vanilla JS; drawer cart
with free-shipping meter; predictive search; product page with gallery, sticky ATC,
scent-pyramid metafields, accordions, complementary products, related + recently viewed;
collections with filters/sorting; contact/about/FAQ/404/blog/customer/gift-card/password
templates; Instagram + testimonials + newsletter + scent-finder sections; JSON-LD
throughout; `setup/products.csv` (14 live products) + `setup/STORE_SETUP.md`.

## Phase 3 — Theme refinements from this research (needs your approval)

Ordered, small, verifiable changes:

| # | Change | Source finding | Files touched |
|---|---|---|---|
| 3.1 | Contact section defaults: `support@xplorscent.com` + response-time promise | Audit 2.7 | `templates/page.contact.json` |
| 3.2 | FAQ content sync: replace the outdated "no samples" answer with Discovery Set answer; add returns (per Returns & Refund Policy) and storage questions | Audit P3, 2.8 | `templates/page.faq.json`, `templates/index.json` |
| 3.3 | Charity template `page.charity`: mission statement, causes row (mental health, autism awareness, homelessness, women's empowerment), JUST ONE TREE partner block, "every purchase gives back" line | Audit F1/2.10 | new template JSON reusing existing sections |
| 3.4 | Footer charity microline + support email in footer defaults | Audit F1 | `sections/footer-group.json`, footer schema default |
| 3.5 | About template copy sync to the real founder narrative (Nadim Razaq, IT → perfumery, luxury within reach) — currently paraphrased, tighten to verified copy | Audit 2.6 | `templates/page.about.json` |
| 3.6 | Award trust chip ("Best Dubai Fragrance 2024") added to the homepage why-us defaults and PDP trust row option | Audit H4 | `templates/index.json`, trust block setting |
| 3.7 | Blog seeding docs for the two real blogs (*Scented Reflections*, *Whispers Of Inspirations*) — handles + menu wiring in STORE_SETUP | Audit inventory | `setup/STORE_SETUP.md` |
| 3.8 | Re-run Theme Check + locale audit; commit; push | — | — |

Estimated scope: content/JSON edits only; no new architecture. Low risk.

## Phase 4 — Store configuration (owner actions in Shopify admin)

From `setup/STORE_SETUP.md` + `COLLECTION_STRUCTURE.md`:

1. Import `products.csv` (or keep existing products) → set **prices**, upload **your
   photography** (1600×2000 masters + one lifestyle shot each).
2. Create the 3 metafield definitions; confirm CSV populated notes.
3. Create 8 collections (type ×3, family ×4, best sellers) with images + descriptions.
4. Build `main-menu` / `footer` / search-quick-links menus per the mapping.
5. Create pages: About, FAQ, Contact, Charity with their templates.
6. Install Search & Discovery → filters (family/type/price/availability) + the
   cross-sell graph; install a review app.
7. Theme editor wiring: hero image + Discovery Set CTAs, scent-finder links + imagery,
   Instagram profile + 6 posts, announcement offer, free-shipping threshold.

## Phase 5 — Pre-launch QA (after 4)

- Editor pass on every template with real content; mobile walkthrough (drawer cart,
  sticky ATC, filters, predictive search) on a real device.
- Lighthouse on home/PDP/collection (targets: 90+ across categories with real images).
- Test order end-to-end incl. discount code + shipping rates; a11y spot-check
  (keyboard-only journey, screen-reader labels).
- Rich Results test on PDP (Product), FAQ page (FAQPage), homepage (Organization/WebSite).
- 301 audit: handles preserved, so none expected — verify old collection URLs if any
  existed beyond `/collections/all`.

## Phase 6 — Post-launch options (backlog, not scheduled)

- Interactive scent quiz (question flow → family collection / Discovery Set).
- Subscription or refill program evaluation.
- Blog build-out: 4–6 launch articles across the two existing blogs (note stories,
  layering guides, founder journal) using the shipped article template.
- Localization: second locale file (e.g. Arabic incl. RTL audit) — theme strings are
  fully externalized already.
- A/B: hero CTA (Shop vs. Discovery Set first), free-shipping threshold messaging.

---

## Decision needed from you

1. **Approve Phase 3** (theme refinements 3.1–3.8) as listed — or edit the list.
2. Confirm the **clean product titles** direction (`The One — Eau de Parfum`) vs.
   keeping the current quoted titles.
3. Provide when ready: prices, photography, mist volumes, bundle savings, Instagram
   profile URL, and the exact charity partner list for the Charity page.

Reply with approval (or edits) and Phase 3 begins.
