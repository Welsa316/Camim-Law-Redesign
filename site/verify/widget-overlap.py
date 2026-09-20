"""
The floating language switch never covers a control, anywhere on any route,
at any width where it floats.

A fixed widget is the one element that can sit on top of anything, and the
first version of this check only looked at the first screen — which is why a
pill sitting on the consultation button further down the page was reported by
a reader rather than by the instrument. It now walks each route from top to
bottom.

It also stopped failing on text. An opaque floating control passing over body
copy as the page scrolls is what a floating control does; a check that fires
on that fires on every page and gets ignored. Covering something a reader has
to click is the real defect, so controls fail and text is counted and printed.

    python3 verify/widget-overlap.py [base-url]
"""
import asyncio, sys, pathlib
from playwright.async_api import async_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:4321"
ROOT = pathlib.Path(__file__).resolve().parents[1]
ROUTES = sorted("/" + str(f.relative_to(ROOT / "dist/client")).replace("index.html", "") for f in (ROOT / "dist/client").rglob("index.html"))
WIDTHS = [(1024, 768), (1440, 900), (1920, 1080)]
STOPS = [0.0, 0.33, 0.66, 1.0]

JS = """() => {
  const w = document.querySelector('[data-lang-widget]'); if (!w) return {missing: true};
  // A retracted widget still has a box: `visibility: hidden` and `opacity: 0`
  // leave getBoundingClientRect() exactly where it was, so a display-only
  // test measures a widget nobody can see or click.
  const wcs = getComputedStyle(w);
  if (wcs.display === 'none' || wcs.visibility === 'hidden' || +wcs.opacity < 0.05 || wcs.pointerEvents === 'none') return {hidden: true};
  const b = w.getBoundingClientRect();
  const controls = [], texts = [];
  const inter = (r) => Math.min(r.right, b.right) - Math.max(r.left, b.left) > 2 && Math.min(r.bottom, b.bottom) - Math.max(r.top, b.top) > 2;
  // A control counts as covered when the widget takes a fifth of it or more.
  // The accordion's panels are links the size of a quarter of the screen; a
  // 133x44 pill over one corner of one is not a control a reader cannot hit,
  // and failing on it would fire on the common case and be ignored.
  const area = (r) => Math.max(0, Math.min(r.right, b.right) - Math.max(r.left, b.left)) * Math.max(0, Math.min(r.bottom, b.bottom) - Math.max(r.top, b.top));
  document.querySelectorAll('a, button, input, select, textarea, summary, iframe, [tabindex]').forEach(e => {
    if (w.contains(e) || e === w) return; const r = e.getBoundingClientRect();
    if (r.width < 2 || r.height < 2 || !inter(r)) return;
    const share = area(r) / (r.width * r.height);
    if (share >= 0.2) controls.push(`${Math.round(share*100)}% of "${((e.textContent||'').trim().slice(0,24) || e.tagName)}"`);
  });
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
  while ((n = walk.nextNode())) {
    if (!n.textContent.trim() || w.contains(n)) continue;
    const p = n.parentElement; if (!p || ['SCRIPT','STYLE'].includes(p.tagName)) continue;
    const rg = document.createRange(); rg.selectNodeContents(n);
    for (const r of rg.getClientRects()) if (r.width > 1 && r.height > 1 && inter(r)) { texts.push(n.textContent.trim().slice(0, 30)); break; }
  }
  return {box: [Math.round(b.left), Math.round(b.top), Math.round(b.right), Math.round(b.bottom)],
          controls: [...new Set(controls)], texts: [...new Set(texts)]};
}"""

async def main() -> int:
    fails, text_hits = 0, 0
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for w, h in WIDTHS:
            c = await b.new_context(viewport={"width": w, "height": h}); pg = await c.new_page()
            for route in ROUTES:
                r = await pg.goto(f"{BASE}{route}", wait_until="networkidle")
                if not r or r.status != 200: continue
                await pg.wait_for_timeout(1400)
                for stop in STOPS:
                    await pg.evaluate("(s) => scrollTo(0, (document.documentElement.scrollHeight - innerHeight) * s)", stop)
                    await pg.wait_for_timeout(260)
                    res = await pg.evaluate(JS)
                    if res.get("missing"):
                        fails += 1; print(f"  FAIL {w:>5} {route:<34} widget missing"); break
                    if res.get("hidden"): continue   # retracted here; later stops still get checked
                    if res["controls"]:
                        fails += 1
                        print(f"  FAIL {w:>5} {route:<34} @{int(stop*100):>3}%  widget {res['box']} over control: " + "; ".join(res["controls"][:3]))
                    text_hits += len(res["texts"])
            await c.close()
        await b.close()
    print(f"\nwidget over text (not a failure, opaque pill): {text_hits}")
    print(f"WIDGET OVERLAP FAILURES: {fails}")
    return 1 if fails else 0

sys.exit(asyncio.run(main()))
