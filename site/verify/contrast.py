"""
Every piece of visible text clears WCAG 1.4.3 against the ground it is
actually drawn on, on every route, in both languages.

Two things this does that a naive scanner gets wrong, both of which have
produced confident, false failures here before:

  * It composites alpha. A translucent ground is blended over the first
    opaque ancestor rather than being read as if it were opaque.
  * It parses `color(srgb r g b / a)`. Chromium resolves `color-mix()` to that
    form with channels in 0-1, and a parser that scrapes the numbers reads
    0.98 as 0.98/255 and reports impossible ratios.

It reads computed styles rather than sampling pixels, because sampling inside
a text block measures the antialiased edges of the glyphs.

    python3 verify/contrast.py [base-url]
"""
import asyncio, sys, pathlib
from playwright.async_api import async_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:4321"
ROOT = pathlib.Path(__file__).resolve().parents[1]
ROUTES = sorted("/" + str(f.relative_to(ROOT / "dist/client")).replace("index.html", "") for f in (ROOT / "dist/client").rglob("index.html"))

JS = r"""() => {
  const parse = (s) => {
    if (!s || s === 'transparent') return [0, 0, 0, 0];
    // color(srgb r g b / a) — channels are 0-1, not 0-255.
    let m = s.match(/color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)/);
    if (m) return [+m[1] * 255, +m[2] * 255, +m[3] * 255, m[4] === undefined ? 1 : +m[4]];
    m = s.match(/rgba?\(([^)]+)\)/);
    if (!m) return [0, 0, 0, 0];
    const p = m[1].split(/[\s,\/]+/).filter(Boolean).map(Number);
    return [p[0], p[1], p[2], p[3] === undefined ? 1 : p[3]];
  };
  const over = (fg, bg) => fg[3] >= 1 ? fg : [0,1,2].map(i => fg[i] * fg[3] + bg[i] * (1 - fg[3])).concat([1]);
  const lum = (c) => { const f = c.slice(0,3).map(v => { v /= 255; return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4); }); return 0.2126*f[0] + 0.7152*f[1] + 0.0722*f[2]; };
  const ratio = (a, b) => { const L1 = lum(a), L2 = lum(b); return (Math.max(L1,L2) + 0.05) / (Math.min(L1,L2) + 0.05); };

  // Walk up compositing every translucent layer onto the first opaque one.
  const groundOf = (el) => {
    const stack = [];
    for (let n = el; n; n = n.parentElement) {
      const c = parse(getComputedStyle(n).backgroundColor);
      if (c[3] > 0) { stack.push(c); if (c[3] >= 1) break; }
    }
    let out = [255, 255, 255, 1];
    for (let i = stack.length - 1; i >= 0; i--) out = over(stack[i], out);
    return out;
  };

  const fails = []; let deferred = 0;
  for (const el of document.querySelectorAll('body *')) {
    if (['SCRIPT','STYLE','NOSCRIPT','IFRAME'].includes(el.tagName)) continue;
    // only elements with their own text, so a wrapper is not measured twice
    const own = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
    if (!own) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity < 0.1) continue;
    const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) continue;
    // Visually hidden text has no contrast to measure: `.sr-only` clips its
    // box to a pixel, and reporting it produced a failure on every route.
    if (el.closest('.sr-only') || cs.clipPath !== 'none' || r.width <= 2 || r.height <= 2) continue;
    // Text drawn over the photograph — inside the frame, or the overlay header
    // above it — is a pixel question, and verify/hero-contrast.py answers it by
    // sampling the real pixels under each glyph. A computed-style ground here
    // reads the page's paper and reports 1.00 on white-on-photograph type.
    if (el.closest('[data-hero]')) continue;
    const hero = document.querySelector('[data-hero]');
    if (hero) {
      const hr = hero.getBoundingClientRect();
      if (r.top < hr.bottom && r.bottom > hr.top && r.left < hr.right && r.right > hr.left
          && getComputedStyle(el.closest('header') || el).position !== 'static') { deferred++; continue; }
    }
    const fg = over(parse(cs.color), groundOf(el));
    const bg = groundOf(el);
    const size = parseFloat(cs.fontSize);
    const bold = +cs.fontWeight >= 700;
    const need = (size >= 24 || (size >= 18.66 && bold)) ? 3 : 4.5;
    const cr = ratio(fg, bg);
    if (cr < need) fails.push(`${el.tagName.toLowerCase()}.${(el.className||'').toString().split(' ')[0]} ${size.toFixed(1)}px ${cr.toFixed(2)}<${need} "${el.textContent.trim().slice(0,28)}"`);
  }
  return {fails: [...new Set(fails)], deferred};
}"""

async def main() -> int:
    fails = deferred = 0
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for w, h in [(1440, 900), (390, 844)]:
            c = await b.new_context(viewport={"width": w, "height": h}); pg = await c.new_page()
            for route in ROUTES:
                r = await pg.goto(f"{BASE}{route}", wait_until="networkidle")
                if not r or r.status != 200: continue
                await pg.wait_for_timeout(3400)   # past the reveal failsafe
                try:
                    found = await pg.evaluate(JS)
                except Exception:
                    # An execution context can go away under us; retry once on
                    # a fresh load rather than losing the whole run.
                    await pg.goto(f"{BASE}{route}", wait_until="load")
                    await pg.wait_for_timeout(3400)
                    found = await pg.evaluate(JS)
                deferred += found["deferred"]
                for f in found["fails"]:
                    fails += 1; print(f"  FAIL {w:>4} {route:<32} {f}")
            await c.close()
        await b.close()
    print(f"\ntext over the photograph, measured by verify/hero-contrast.py instead: {deferred}")
    print(f"CONTRAST FAILURES: {fails}")
    return 1 if fails else 0

sys.exit(asyncio.run(main()))
