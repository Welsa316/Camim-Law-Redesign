"""
No route scrolls sideways at any width, and nothing sticks out of the
viewport that is not deliberately clipped.

Two elements here really are wider than the screen on purpose — the
accordion's stills and its rotated ordinals — and both sit inside an
ancestor that clips them. The check therefore reports the document's own
scrollWidth first, and lists an element only when nothing above it clips.

    python3 verify/overflow.py [base-url]
"""
import asyncio, sys, pathlib
from playwright.async_api import async_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:4321"
ROOT = pathlib.Path(__file__).resolve().parents[1]
ROUTES = sorted("/" + str(f.relative_to(ROOT / "dist/client")).replace("index.html", "") for f in (ROOT / "dist/client").rglob("index.html"))
WIDTHS = [320, 360, 390, 768, 1024, 1440, 1920]

JS = """() => {
  const se = document.scrollingElement;
  const out = { scrollW: se.scrollWidth, vw: innerWidth, loose: [] };
  for (const el of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || cs.position === 'fixed') continue;
    // Only the right edge. An element parked off-screen to the LEFT is the
    // standard visually-hidden technique (the skip link lives at -10000px)
    // and does not extend the document or produce a scrollbar; the first
    // version of this check failed on it across every route.
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.right <= innerWidth + 1) continue;
    let clipped = false;
    for (let a = el.parentElement; a; a = a.parentElement) {
      const o = getComputedStyle(a);
      if (['hidden', 'clip', 'auto', 'scroll'].includes(o.overflowX)) { clipped = true; break; }
    }
    if (!clipped) out.loose.push(`${el.tagName.toLowerCase()}.${(el.className||'').toString().split(' ')[0]} right=${Math.round(r.right)}`);
  }
  out.loose = [...new Set(out.loose)].slice(0, 6);
  return out;
}"""

async def main() -> int:
    fails = 0
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for w in WIDTHS:
            c = await b.new_context(viewport={"width": w, "height": 900}); pg = await c.new_page()
            bad = []
            for route in ROUTES:
                r = await pg.goto(f"{BASE}{route}", wait_until="networkidle")
                if not r or r.status != 200: continue
                await pg.wait_for_timeout(900)
                res = await pg.evaluate(JS)
                # Assert the viewport is what we asked for: an automation pane
                # can silently resize, and "no change" then means nothing.
                assert res["vw"] == w, f"viewport drifted to {res['vw']}, expected {w}"
                if res["scrollW"] > res["vw"] + 1 or res["loose"]:
                    bad.append(f"{route}: scrollW={res['scrollW']} {res['loose']}")
            if bad:
                fails += len(bad)
                print(f"  FAIL {w}px")
                for x in bad: print(f"        {x}")
            else:
                print(f"  ok   {w}px")
            await c.close()
        await b.close()
    print(f"\nOVERFLOW FAILURES: {fails}")
    return 1 if fails else 0

sys.exit(asyncio.run(main()))
