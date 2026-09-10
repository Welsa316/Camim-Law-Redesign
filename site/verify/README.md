# Verification scripts

Run against a built site being served locally:

```
npm run build && node ./dist/server/entry.mjs
```

| Script | What it asserts |
|---|---|
| `header.py` | The rendered header height equals the `--header-h` token at every width, the full bar appears only where it fits, and no page overflows sideways. |
| `hero-contrast.py` | Every block of type on the opening frame clears its WCAG threshold, measured from the composited pixels actually behind the glyphs. |
| `hero-face.py` | No type crosses his face, at any width, in either crop. |

Each exits non-zero on failure.

Two traps these scripts exist to avoid, both of which produced confident wrong
answers before they were written:

- **Do not hide the frame to photograph its background.** The scrim behind the
  type is a pseudo-element inside the frame, so hiding the frame hides the
  layer under test and the scan reports the unscrimmed photograph. Blank the
  glyph colours instead and leave every box in place.
- **Measure the glyph rects, not the block box.** A short line inside a
  full-width paragraph otherwise samples background it never covers, and
  reports a failure where no text is at risk.
