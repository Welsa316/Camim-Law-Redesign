# Implementation Plan

Campos Immigration Law. Phases are ordered so that each one leaves the site in a shippable state and so the riskiest decisions are proven early.

---

## Stack

| Choice | Version | Why |
|---|---|---|
| Astro | 7.3.2 | Static HTML by default, typed content collections, built-in i18n routing, zero client JavaScript unless asked for. The sibling project's own retrospective names its SPA-plus-prerender approach as its biggest SEO liability; this avoids repeating that. |
| Tailwind CSS | 4.3.3, via `@tailwindcss/vite` | Same major version as the rest of the portfolio. Design tokens live in `@theme`, so the system in `CAMIM_DESIGN_SYSTEM.md` is the source of truth rather than a document that drifts. |
| GSAP | 3.15.0 | ScrollTrigger and SplitText for the one signature move. Loaded lazily, on the pages that use it. |
| TypeScript | bundled | Content schemas are typed, so a matter page cannot ship without its required fields. |

Deliberately not used: any client-side router, any state library, a CMS, a database, and a smooth-scroll library. The only server surface is one endpoint for the contact form.

The repository is empty, so nothing is being migrated. This is a stack choice, not a stack change.

## Phase 1 — Foundation

Scaffold, tokens, fonts, layout primitives, header, footer, i18n routing, base SEO.

- Astro project, TypeScript strict, Tailwind 4 via the Vite plugin.
- `@theme` block carrying every token from the design system: colours, the fluid type scale, spacing, containers, radii, motion durations and curves.
- Self-hosted Source Serif 4 and Figtree, `latin` subset only, woff2, preloaded.
- `Page`, `Section`, `Prose`, `Eyebrow`, `Heading`, `Button`, `LinkArrow`, `MediaFrame` primitives.
- `SiteHeader` with the services panel, `MobileBar`, `LanguageSwitch`, `SiteFooter`.
- i18n: Spanish at the root, English under `/en/`, translated slugs, hreflang pairs with `x-default`.
- A `<Seo>` component emitting title, description, canonical, hreflang, Open Graph and Twitter tags per page.

**Files:** `astro.config.mjs`, `src/styles/tokens.css`, `src/styles/global.css`, `src/components/*`, `src/layouts/*`, `src/i18n/*`.
**Risks:** hreflang correctness across translated slugs; the header panel's keyboard behaviour.
**Acceptance:** both locales build to static HTML; every page has one H1, a canonical and a correct hreflang pair; keyboard-only navigation reaches every header control; contrast measured against the token table.

## Phase 2 — Content model

The typed collections that everything else reads from.

- `organization`, `attorney`, `group`, `matter`, `faq`, `article` schemas.
- `status` on every matter: only `live` renders in navigation and the sitemap.
- Navigation, footer, breadcrumbs, related matters, the A-Z index and JSON-LD all generated from these.

**Risks:** none technical; the risk is publishing an unverified practice area, which the `status` field exists to prevent.
**Acceptance:** changing one field in one file updates the nav, the footer, the sitemap and the schema together.

## Phase 3 — Home

The opener, the situation finder, the practice groups, the attorney band, the media band, the consultation steps, the office band.

**Risks:** the opener has to hold one screen at 375 × 667 with the heading, the lead and both buttons visible. That is measured, not eyeballed.
**Acceptance:** no horizontal overflow at 320px; the opener fits without scrolling on a 667px-tall viewport; the page is fully readable with JavaScript disabled.

## Phase 4 — Services

The hub, the six group sections, the A-Z index, and the matter template with every section from the blueprint.

**Acceptance:** every `live` matter renders in both languages with a correct hreflang pair; accordion fragment links open the target answer.

## Phase 5 — Attorney, consultation, detained, payment

- Attorney page with `Person` structured data.
- Consultation page and the short form.
- The detention page.
- Payment with two labelled destinations, preserving the existing LawPay URL exactly.

**Risks:** the form is the only server surface. It must degrade to a `mailto:` fallback if the endpoint is unavailable.
**Acceptance:** form validates, announces errors in the page's language, and cannot be submitted empty; the cautionary statement is present in both languages.

## Phase 6 — FAQ, Orlando, resources, legal, 404

**Acceptance:** a real 404 status, not a soft 200.

## Phase 7 — Motion

The signature masked line reveal, quiet reveals, hover and state transitions, the reduced-motion path.

**Risks:** every trap in `MOTION_SYSTEM.md` section 5. Pre-hide before paint; bound the font wait; `fromTo` not `from`; register ScrollTrigger lazily.
**Acceptance:** both ends of the signature move proven in the DOM; reduced motion renders the page composed; no JavaScript renders the page composed.

## Phase 8 — Responsive

Each breakpoint treated as its own composition, not a scaled one. 375, 390, 768, 1024, 1440, 1920.

**Acceptance:** at each width, an affirmative check that the layout justifies the viewport, not just that nothing overflows.

## Phase 9 — SEO, structured data, redirects, performance

Sitemap, robots, JSON-LD, the Squarespace redirect map, image pipeline, Core Web Vitals.

**Acceptance:** the sitemap matches the route table exactly; the Open Graph image exists and is served as an image; every legacy URL 301s to its new home.

## Phase 10 — Accessibility and visual QA

Keyboard walkthrough, measured contrast, screenshots at every breakpoint in both languages, console clean, production build.

## Phase 11 — Compliance pass

Every item in `LEGAL_REVIEW_CHECKLIST.md` checked against the built site. Anything unverified is removed or marked, not shipped.

## What blocks a real launch

Not engineering. The attorney's credentials, the confirmed list of matters, and the consultation policy. The site is built so that each of those is one content file away from being correct.
