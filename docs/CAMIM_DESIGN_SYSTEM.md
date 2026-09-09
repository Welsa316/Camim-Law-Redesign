# Design System

Campos Immigration Law. The system for art direction 2, "Con nombre y cara", built on editorial discipline. Every colour and size below was computed, not estimated; the contrast table and the type scale are reproducible from the scripts noted at the end.

---

## 1. Principles this system encodes

1. **Type is the identity.** The firm has no logo mark. The wordmark, the scale and the spacing carry recognition, so the type system has to be right before anything else.
2. **Cards are a last resort.** A card is for a repeating object with a boundary that means something. Practice areas are rows. Sections are separated by space and rules.
3. **Every colour has one job.** Ten tokens, no more, each named for its role.
4. **Contrast is measured.** Nothing enters the palette without a computed ratio.
5. **Spanish is the design language.** Line lengths, button widths and headline wraps are tested against Spanish, which runs roughly 15 to 25 percent longer than English, not against English with Spanish as an afterthought.

## 2. Typography

### 2.1 Families

| Role | Family | Why |
|---|---|---|
| Display, headings, pull quotes | **Source Serif 4** (variable, 200–900, with italic) | A text serif drawn for reading rather than for display drama. Carries authority without being one of the four faces the quality bar names as sophistication-faking tells. Verified: variable weight axis 200–900, true italics, and the `latin` subset covers every Spanish character. |
| Body, UI, navigation, forms | **Figtree** (variable, 300–900, with italic) | Humanist geometric sans that holds up at 17px on a low-density Android screen. Verified variable 300–900, `latin` subset sufficient. |

Both are self-hosted as woff2, `latin` subset only. The Spanish repertoire (ñ, á é í ó ú, ü, ¿, ¡) lives entirely in U+0000–00FF, which the `latin` subset covers, so `latin-ext` is not shipped. Two files, two families, no third family unless one earns its place in review.

Loading: `font-display: swap`, both preloaded, with a system fallback stack tuned so the swap does not reflow (`ui-serif, Georgia, serif` and `system-ui, -apple-system, Segoe UI, sans-serif`).

### 2.2 Scale

Fluid between 375px and 1440px. Values computed, not eyeballed.

| Token | 375px | 1440px | `clamp()` | Line height | Tracking |
|---|---|---|---|---|---|
| `--fs-display` | 40 | 76 | `clamp(40px, 27.324px + 3.3803vw, 76px)` | 1.02 | -0.025em |
| `--fs-h1` | 34 | 60 | `clamp(34px, 24.845px + 2.4413vw, 60px)` | 1.06 | -0.022em |
| `--fs-h2` | 27 | 42 | `clamp(27px, 21.718px + 1.4085vw, 42px)` | 1.12 | -0.018em |
| `--fs-h3` | 22 | 28 | `clamp(22px, 19.887px + 0.5634vw, 28px)` | 1.22 | -0.012em |
| `--fs-h4` | 19 | 22 | `clamp(19px, 17.944px + 0.2817vw, 22px)` | 1.30 | -0.006em |
| `--fs-body-lg` | 18 | 20 | `clamp(18px, 17.296px + 0.1878vw, 20px)` | 1.58 | 0 |
| `--fs-body` | 17 | 18 | `clamp(17px, 16.648px + 0.0939vw, 18px)` | 1.65 | 0 |
| `--fs-small` | 15 | 15.5 | `clamp(15px, 14.824px + 0.0469vw, 15.5px)` | 1.55 | 0 |
| `--fs-eyebrow` | 12.5 | 13 | `clamp(12.5px, 12.324px + 0.0469vw, 13px)` | 1.20 | 0.14em |

Body sits at 17px rather than 16. The audience reads dense procedural material in a second language, often on a phone, often at night. One extra pixel of body text is the cheapest accessibility decision available.

### 2.3 Roles

| Style | Family | Weight | Size token | Notes |
|---|---|---|---|---|
| Display | Serif | 400 | display | Home and section openers only. Never bold; at 76px, weight is shouting on top of shouting. |
| H1 | Serif | 400 | h1 | One per page. |
| H2 | Serif | 400 | h2 | |
| H3 | Sans | 600 | h3 | The switch to sans at H3 marks the shift from editorial voice to functional structure. |
| H4 | Sans | 600 | h4 | |
| Lead paragraph | Sans | 400 | body-lg | First paragraph of any page. |
| Body | Sans | 400 | body | Measure capped at 68 characters. |
| Small, captions | Sans | 400 | small | |
| Eyebrow | Sans | 600 | eyebrow | Uppercase, 0.14em tracked. |
| Nav | Sans | 500 | body | |
| Button | Sans | 600 | body | Never uppercase; Spanish labels are long enough already. |
| Quote | Serif | 400 italic | h3 | The only italic in the system. |
| Form number | Sans | 500 | small | `font-variant-numeric: tabular-nums`, tracked 0.02em. "I-130" reads as a code. |
| Figures | Sans | inherit | inherit | `tabular-nums` everywhere a number can change or align. |

### 2.4 Spanish typesetting rules

- Test every headline against its Spanish string, which is the longer one. "Defensa contra la deportación" is 29 characters against "Deportation defense" at 19.
- `hyphens: auto` with `lang="es"` set correctly, or headlines break badly.
- `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs, to kill orphans.
- Never letter-space lowercase Spanish body text; the diacritics need the room.
- `¿` and `¡` must not be orphaned at a line end. Non-breaking space after them where a wrap is possible.

## 3. Spacing

An 8px base with a named scale. Section rhythm is the part that reads as premium, so it gets its own tokens rather than being assembled ad hoc.

| Token | Value | Use |
|---|---|---|
| `--s-1` | 4px | Icon gaps |
| `--s-2` | 8px | Tight pairs |
| `--s-3` | 12px | Label to control |
| `--s-4` | 16px | Paragraph rhythm |
| `--s-5` | 24px | Grouped items |
| `--s-6` | 32px | Between blocks |
| `--s-7` | 48px | Sub-section |
| `--s-8` | 64px | Between content groups |
| `--s-9` | 96px | Section padding, mobile |
| `--s-10` | 128px | Section padding, desktop |
| `--s-11` | 160px | Major section seams, desktop |

Section padding is fluid: `clamp(96px, 6.5vw + 72px, 160px)` on the block axis. The seam above the footer gets `--s-11` minimum; cramped footers are the most common rhythm failure.

## 4. Containers and grid

| Token | Value | Use |
|---|---|---|
| `--w-prose` | 68ch | Reading measure for body copy |
| `--w-content` | 1120px | Default content column |
| `--w-wide` | 1360px | Wide compositions, image rows |
| `--w-full` | 100% | Full bleed |

Gutters: 20px at 375, 32px at 768, 48px at 1024, 64px at 1440.

A twelve-column grid used asymmetrically. The editorial signature is that section numbers and eyebrows sit in columns 1–2 while content runs 4–12, so the page has a visible left margin structure that a centred layout cannot produce. Below 768px the grid collapses to one column and the eyebrow sits above its heading.

## 5. Colour

### 5.1 Tokens

| Token | Value | Job |
|---|---|---|
| `--paper` | `#FAF8F4` | Page ground |
| `--paper-2` | `#F1EDE6` | Alternate sections, input fills |
| `--ink` | `#16211C` | Body and display text |
| `--ink-2` | `#4A5A52` | Secondary text, captions |
| `--green` | `#1F4034` | Institutional band, primary button |
| `--green-deep` | `#132A22` | Deepest band, footer |
| `--clay` | `#B4553A` | The single accent: marks, rules, non-text UI |
| `--clay-ink` | `#8F4029` | Accent text and links |
| `--line` | `#DDD7CC` | Decorative hairlines only |
| `--line-strong` | `#8A8071` | Form control borders |

### 5.2 Measured contrast

| Pair | Ratio | Verdict |
|---|---|---|
| ink on paper | 15.61 | AAA |
| ink-2 on paper | 6.89 | AA all sizes |
| green on paper | 10.75 | AAA |
| white on green | 11.41 | AAA |
| white on green-deep | 15.20 | AAA |
| clay-ink on paper | 6.75 | AA all sizes |
| clay on paper | 4.60 | AA normal, large text and non-text UI only |
| white on clay | 4.88 | Not a fill for small labels |
| line on paper | 1.35 | Decorative only |
| line-strong on paper | 3.66 | Passes WCAG 1.4.11 for controls |

### 5.3 Three rules the measurements forced

1. **Links use `--clay-ink`, never `--clay`.** Clay at 4.60 is too near the floor for body-size text.
2. **Form borders use `--line-strong`.** The decorative hairline is 1.35 and would have shipped as a WCAG 1.4.11 failure on every input.
3. **The focus ring is surface-aware.** No single colour clears 3:1 on both grounds: clay on paper is 4.60, but clay on green is 2.34. A `--focus` variable resolves to `--clay-ink` on paper surfaces and `--paper` on green ones, redefined by the dark band's own scope.

### 5.4 Surfaces

Two surfaces, not a theme system: `paper` (default) and `green` (institutional bands and footer). The green surface redefines `--ink`, `--ink-2`, `--line`, `--line-strong` and `--focus` inside its own scope, so a component dropped into either surface is correct without knowing where it is. This is the mechanism that would make a future dark mode a token change rather than a rewrite.

On the green surface, shadows are set to `none`. A shadow on a dark ground is a lie; elevation comes from a step to `--green` from `--green-deep` and a hairline.

## 6. Radius, borders, shadows

- Radius: `--r-sm` 2px for inputs and buttons, `--r-md` 4px for media frames, and nothing else. No pills, no 16px cards. The current site's blue pill button is exactly the language being retired.
- Borders: 1px hairlines in `--line` for decorative rules, `--line-strong` for controls. A 2px top rule in `--clay` marks a section opener.
- Shadows: one token, `--shadow-lift`, used only on the mobile action bar and on an open menu. Nowhere else. Depth comes from surface changes.

## 7. Imagery

| Slot | Ratio | Rules |
|---|---|---|
| Attorney portrait, hero | 4:5 | Face in the upper third. Never masked across the face. Reveal is fade-and-settle only. |
| Attorney portrait, inline | 1:1 or 4:5 | |
| Media still | 16:9 | Presented as what it is, with the programme named. |
| Article lead | 3:2 | |
| Office and place | 3:2 or full bleed | |

- Full colour. No duotone, no brand tint on skin, no grayscale on the primary portrait. The quality bar is explicit: tinting a real person's face reads as a filter applied to them.
- Every image gets `width`, `height`, `loading` and `decoding`, and alt text that describes the person or the scene. Never "immigration lawyer Orlando" padding.
- Formats: AVIF with WebP fallback, `srcset` at 400/800/1200/1600, `sizes` matched to the layout.
- No stock photographs of people anywhere. This is a design rule and a compliance one: Rule 4-7.13(b)(5) requires a "not an employee or member of law firm" disclaimer on any image that could read as the lawyer or staff. Using only real photography removes the problem instead of managing it.

## 8. Components

Built only where reuse or a semantic responsibility justifies it.

**Primitives** — `Page`, `Section` (surface, rhythm, optional number), `Prose` (measure, vertical rhythm), `Grid`, `Eyebrow`, `Heading`, `LinkArrow`, `Button`, `MediaFrame`, `Reveal`.

**Composed** — `SiteHeader`, `MobileBar`, `LanguageSwitch`, `ServiceRow`, `ServicePanel`, `SituationFinder`, `StepList`, `Accordion`, `AttorneyCard`, `MediaMention`, `ContactForm`, `Breadcrumbs`, `SiteFooter`, `Callout`.

**Buttons.** Primary is `--green` fill with `--paper` text. Secondary is a `--line-strong` outline on paper. Both are 48px minimum height, 44px minimum touch target, radius `--r-sm`, weight 600, sentence case. States: hover darkens to `--green-deep`; active insets 1px; focus draws a 2px `--focus` ring at 2px offset; disabled drops to `--ink-2` on `--paper-2` with the cursor unchanged.

**ServiceRow.** The replacement for the service card. A full-width row: form number in tabular figures, matter name in sans 600, a one-line plain-language description, an arrow. Hairline rule between rows, `--clay` rule above the group. Hover lifts the row's ground to `--paper-2` and advances the arrow 4px. That is the entire interaction.

**Accordion.** `<details>` and `<summary>`. The fragment id goes on the *content*, never on the summary, so a link into a question actually opens it. The summary is hidden only in the `[open]` state, never unconditionally at a breakpoint.

## 9. Accessibility, built in rather than audited later

- Every interactive target is at least 44 by 44 CSS pixels, spacing included.
- Focus is always visible and uses the surface-aware ring; `:focus-visible`, never a removed outline.
- One H1 per page; heading levels never skip.
- A skip link to `#main`, visible on focus.
- Form labels are always visible. Placeholders are never labels. Errors are text next to the field, tied by `aria-describedby`, and announced in a live region, in the page's language.
- `lang` is correct on `<html>` and on any inline foreign phrase, which also drives correct hyphenation.
- Icons are decorative and hidden from assistive technology; meaning is always in text.
- `prefers-reduced-motion: reduce` renders the page fully composed. The bail-out runs before anything is hidden, not after.
- Colour never carries meaning alone.
- Target: WCAG 2.2 AA, verified by measurement rather than assertion.

## 10. Reproducibility

The contrast table and the type scale come from two scripts kept with the project so the numbers can be re-derived rather than trusted: a WCAG relative-luminance ratio calculator over the token list, and a fluid-scale generator that converts a min and max size across a 375 to 1440 viewport range into a `clamp()` expression. Any change to a token or a scale step is re-run through them before it lands.
