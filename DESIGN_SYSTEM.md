# Xplor Scent — Design System

The visual language for the XplorScent theme: restraint-based luxury where photography
and typography do the work. Inspired by the discipline of Aesop/Byredo/COS-class design
without copying any of them; tuned to the brand's own story (Dubai craft × French
structure × exploration).

Every token below is implemented as a CSS custom property driven by Theme Settings —
merchants can tune all of it without code.

---

## 1. Color

| Token | Hex | RGB var | Usage |
|---|---|---|---|
| Background / warm white | `#FDFCFA` | `--color-background` | Page ground |
| Surface / soft beige | `#F4F0E9` | `--color-surface` | Alternating sections, cards, media grounds |
| Foreground / charcoal | `#1C1B19` | `--color-foreground` | Text, primary buttons |
| Inverse / near-black | `#191714` | `--color-inverse` | Dark sections (newsletter, footer, announcement) |
| Accent / muted bronze | `#8A6D4A` | `--color-accent` | **Meaning only**: ratings, sale price, progress, eyebrows |
| Button text | `#FDFCFA` | `--color-button-text` | On charcoal buttons |

**Rules.** No gradients. No pure `#FFF`/`#000`. Accent never used decoratively.
Subtle text = foreground at 60–75% alpha, always ≥ 4.5:1 on both grounds (AA).
Error `#A94434`, success `#4A7A4E` (form feedback only).

## 2. Typography

| Role | Face | Weight | Case |
|---|---|---|---|
| Headings | **EB Garamond** (Shopify font library, swappable) | 400 | Sentence case |
| Body / UI | **Assistant** | 400 / 700 | Sentence case |
| Eyebrows / labels / buttons | Assistant | 700 | UPPERCASE, tracked +0.12–0.22 em |

**Fluid scale** (clamp-based, 10 px root):
`h0` 36→64 · `h1` 30→48 · `h2` 24→34 · `h3` 20→26 · `h4` 18→21 · body 16 · caption 13 ·
eyebrow 12. Line-height 1.15 headings / 1.65 body. Merchant-adjustable ±% for both axes.

**Voice pairing:** editorial serif for the poetry ("Fragrance, made to be explored"),
quiet sans for the machinery (prices, forms, nav).

## 3. Spacing & layout

- Base unit **4 px**; component rhythm in 8/12/16/24/32/48.
- Section padding: `--section-spacing` default 96 px (72 px mobile), merchant-tunable 40–160.
- Page width `--page-width` default 1400 px; gutters `clamp(16px, 4vw, 40px)`.
- Narrow measure 760 px (prose), medium 960 px (forms/contact).
- Grid gap default 24 px; product grids 2-col mobile → 3 → 4 desktop.
- Whitespace is the luxury signal: section headers get 28–56 px clearance below.

## 4. Shape & elevation

- Radii: buttons 2 px, inputs 2 px, cards/media 4 px (all tunable). Near-square = quiet confidence.
- Borders: foreground at 8–25% alpha. Shadows only on floating UI (dropdowns
  `0 20px 40px rgba(0,0,0,.08)`); never on cards at rest.

## 5. Iconography

Single stroke-based set, 24 px grid, 1.5 px stroke, round caps — bag, search, menu,
account, chevrons, arrow, plus/minus, trash, star, check, truck, returns, shield,
droplet, leaf, gift, filter, email, phone, pin, socials. Filled star only for ratings.
No decorative illustration anywhere.

## 6. Components

- **Buttons:** primary = charcoal fill; secondary = 1 px outline, fills on hover;
  uppercase 14 px tracked; min-height 48 px (40 px small). Loading spinner state.
- **Product card:** 4:5 media on surface ground, hover = 1.04 scale + second-image
  crossfade, type/family caption, title, rating, price, quick-add. Badges: `Sale`
  (bronze) / `Sold out` (charcoal), 1 per card max.
- **Pills:** variant options + filter chips — 99 px radius, selected = inverted.
- **Forms:** 48 px min inputs, uppercase 13 px labels, focus = border darkens (no glow).
- **Accordions:** native `details/summary`, hairline dividers, plus-icon rotates 45°.
- **Drawers:** right (cart), left (menu), top (search); overlay `rgba(20,18,16,.4)`;
  panel `min(440px, 100vw - 40px)`; focus-trapped, Esc closes.
- **Scent pyramid:** 3-column top/heart/base on beige surface — the PDP's signature block.

## 7. Motion

| Token | Value |
|---|---|
| `--duration-short / default / long` | 150 / 300 / 500 ms |
| Drawer easing | `cubic-bezier(0.32, 0.72, 0.28, 1)` |
| Scroll reveal | opacity + 24 px rise, 700 ms, once |
| Image hover | scale 1.04–1.05 |

**Hard rule:** everything gated behind `prefers-reduced-motion`; no parallax, no
autoplaying carousels, no marquees.

## 8. Imagery art direction

- **Products:** 1600 × 2000 (4:5), consistent bottle scale and shadow across the range,
  warm-neutral seamless grounds matching `--color-surface`.
- **Hover/lifestyle:** texture and ingredient stories (oud wood, citrus peel, florals).
- **Hero:** 2400 × 1350 (16:9), focal point lower two-thirds, quiet zones for type;
  overlay 0–60% controllable.
- **Family cards:** 800 × 1060 (3:4) moody ingredient macros.
- **Collections:** 2400 × 800 (3:1).
- Shopify CDN handles responsive sizes/formats; theme requests `srcset` widths and
  lazy-loads below the fold automatically.

## 9. Accessibility baseline

AA contrast on all text · visible 2 px focus rings · 44 px touch targets · one `h1`
per page · landmarks + skip link · icon buttons always named · drawers trap focus and
restore it on close · reduced-motion respected · form errors announced via `role=alert`.

## 10. Voice & microcopy

Curious, assured, unhurried. "Explore / discover / find yours" over "buy now".
Empty states redirect, never dead-end ("Your next signature scent is waiting to be
discovered."). Numbers stated plainly (up to 12 hours; 5 × 3 mL). Charity line in the
footer, stated once, without fanfare.
