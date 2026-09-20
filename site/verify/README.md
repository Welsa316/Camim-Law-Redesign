# Verification scripts

Run against a built site being served locally:

```
npm run build && node ./dist/server/entry.mjs
```

| Script | What it asserts |
|---|---|
| `copy-provenance.py` | Every visible string on every route, in both languages, traces to camimlaw.com, camulaw.com or a checked record. Writes `docs/COPY_PROVENANCE.md`. |
| `header.py` | The rendered header height equals the `--header-h` token at every width, the full bar appears only where it fits, and no page overflows sideways. |
| `hero-contrast.py` | Every block of type drawn on the opening frame — the figures, the statement, and the overlay header above it — clears its WCAG threshold, measured from the composited pixels actually behind the glyphs. |
| `hero-face.py` | No type crosses his face, at any width, in either crop, and the veil leaves his face lit. |
| `split-lines.py` | No masked line reveal clips an ascender or a descender, on any route. |
| `accordion-contrast.py` | The service panels' captions clear their threshold over their photographs, open and collapsed. |
| `contrast.py` | Every other piece of text on the site clears WCAG 1.4.3 against its real composited ground, at desktop and phone widths. |
| `overflow.py` | No route scrolls sideways at 320–1920, and nothing sticks out that is not deliberately clipped. |
| `a11y.py` | Landmarks, one `h1`, heading order, accessible names, labelled fields, unique ids, and touch targets below 1024. |
| `widget-overlap.py` | The floating language switch never covers a control, on any route, at any scroll position, at any width where it floats. |

Each exits non-zero on failure.

## Traps these scripts exist to avoid

Every one of these produced a confident wrong answer before it was written down.

- **Do not hide the frame to photograph its background.** The scrim behind the
  type is a pseudo-element inside the frame, so hiding the frame hides the
  layer under test and the scan reports the unscrimmed photograph. Blank the
  glyph colours instead and leave every box in place.
- **Measure the glyph rects, not the block box.** A short line inside a
  full-width paragraph otherwise samples background it never covers, and
  reports a failure where no text is at risk.
- **`querySelector` measures one element and passes the rest.** The second of
  the two figures in the opening frame ran onto the light grey of his suit at
  1.03:1 for as long as the hero check read only the first `.stat-label`.
- **A computed-style contrast scan cannot see a photograph.** Anything drawn
  over the opening frame — including the overlay header, which is not inside
  it — is handed to `hero-contrast.py`; measured against computed styles it
  reads the page's paper and reports 1.00 on white-on-photograph type.
- **Composite alpha, and parse `color(srgb …)`.** Chromium resolves
  `color-mix()` to that form with channels in 0–1; scraping the numbers reads
  0.98 as 0.98/255 and invents impossible ratios.
- **Off-screen to the left is not overflow.** The skip link lives at −10000px
  and does not extend the document; failing on it fails on every route.
- **A retracted element still has a box.** `visibility: hidden` and
  `opacity: 0` leave `getBoundingClientRect()` exactly where it was, so a
  display-only test measures a widget nobody can see.
- **A signal that fires on the common case gets ignored.** A floating control
  passes over body copy on every page; only covering a fifth or more of
  something clickable is a defect, and that is what fails the build.
