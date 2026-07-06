# XplorScent Theme — Progress Log

Live state of the project so any future session can continue seamlessly.
Branch: `claude/xplorscent-shopify-theme-ypkp1h` · Theme folder: `xplorscent-theme/`

## Status: COMPLETE — upload-ready (v1.5.1)

All phases of `IMPLEMENTATION_PLAN.md` that belong to the theme are done. Shopify
Theme Check passes with 0 offenses; all locale keys resolve; all JSON valid.

## Completed work (chronological)

| Version | Scope |
|---|---|
| 1.0.0 | Full OS 2.0 theme: layout, 27 sections, snippets, base.css, ~10 KB vanilla JS, all storefront + customer + gift-card + password templates, drawer cart, filters, structured data, AUDIT.md |
| 1.1.0 | Predictive search, Instagram section, `setup/products.csv` (14 live products, researched notes/SEO), `setup/STORE_SETUP.md` |
| — | Research docs at repo root: SITE_AUDIT, PRODUCT_CATALOG, COLLECTION_STRUCTURE, DESIGN_SYSTEM, IMPLEMENTATION_PLAN |
| 1.2.0 | Phase 3 refinements: charity template, footer charity line + support email, FAQ/About content sync to live claims, award trust chip |
| 1.3.0 | 14 on-brand SVG visuals + brand-visual snippet; zero placeholders / zero empty image slots; verified with rendered screenshots |
| 1.4.0 | Exclusive design pass (letterspaced wordmark, hairline eyebrows, serif hover-reveal cards, breadcrumbs + BreadcrumbList); per-type product templates (mist/set/discovery) and per-collection templates (fragrances/mists/sets/scent-family) |
| 1.5.0 | Cohesion pass: grouped FAQ page, cart-page shipping meter + trust row, policy-page styling, 404/search/about product paths, newsletter fine print, footer wordmark |
| 1.5.1 | Final expert review fixes: `.reveal` no-JS gate, sticky-ATC aria-hidden/tabindex management, stray drawer aria-hidden removed, collection toolbar wrap, facets panel viewport clamp, cart trigger `aria-haspopup` |

## Verification routine (run before any release)

```sh
cd xplorscent-theme
shopify theme check                 # must be 0 offenses
node --check assets/theme.js assets/product.js
python3 - <<'EOF'                   # JSON + locale-key audit
import json,re,glob
for f in glob.glob('**/*.json',recursive=True): json.load(open(f))
loc=json.load(open('locales/en.default.json'))
def has(k):
    n=loc
    for p in k.split('.'):
        if not(isinstance(n,dict)and p in n):return False
        n=n[p]
    return True
ks=set()
for f in glob.glob('**/*.liquid',recursive=True):
    ks.update(re.findall(r"'([a-z0-9_.]+)'\s*\|\s*t",open(f).read()))
print(sorted(k for k in ks if not has(k)) or "locales OK")
EOF
```

Visual verification: `scratchpad/preview/*.html` pattern — copy `assets/base.css` +
`assets/xs-*.svg` beside a mock page, screenshot with Playwright
(`executablePath: '/opt/pw-browsers/chromium'`).

## Remaining work (owner-side only — nothing left in the theme)

1. Prices + product photography (import `setup/products.csv` or use existing store products).
2. Collections/menus/pages/metafields/apps per `setup/STORE_SETUP.md` §3–7.
3. Template assignments per the map in `setup/STORE_SETUP.md`.
4. Pre-launch QA per `IMPLEMENTATION_PLAN.md` Phase 5.

## Backlog (approved-on-request, not started)

Scent quiz · blog launch articles for *Scented Reflections* / *Whispers Of
Inspirations* · Arabic locale + RTL audit · A/B tests (hero CTA, threshold copy).
