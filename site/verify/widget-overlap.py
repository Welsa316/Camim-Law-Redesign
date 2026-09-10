"""
The floating language switch never covers text or a control in the first
screen of any route, at every width where it floats.

A fixed widget is the one element that can sit on top of anything. This
projects its box against every text glyph rect and every link or button in
the viewport at load, and fails on any intersection.

    python3 verify/widget-overlap.py [base-url]
"""
import asyncio, sys, pathlib
from playwright.async_api import async_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:4321"
ROOT = pathlib.Path(__file__).resolve().parents[1]
ROUTES = sorted("/" + str(f.relative_to(ROOT / "dist/client")).replace("index.html", "") for f in (ROOT / "dist/client").rglob("index.html"))

JS = """() => {
  const w = document.querySelector('[data-lang-widget]'); if (!w) return {missing: true};
  const b = w.getBoundingClientRect();
  const hits = [];
  const inter = (r) => Math.min(r.right, b.right) - Math.max(r.left, b.left) > 2 && Math.min(r.bottom, b.bottom) - Math.max(r.top, b.top) > 2;
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
  while ((n = walk.nextNode())) {
    if (!n.textContent.trim() || w.contains(n)) continue;
    const p = n.parentElement; if (!p || ['SCRIPT','STYLE'].includes(p.tagName)) continue;
    const rg = document.createRange(); rg.selectNodeContents(n);
    for (const r of rg.getClientRects()) if (r.width > 1 && r.height > 1 && inter(r)) { hits.push('text: ' + n.textContent.trim().slice(0, 30)); break; }
  }
  document.querySelectorAll('a, button, input, select, iframe').forEach(e => {
    if (w.contains(e) || e === w) return; const r = e.getBoundingClientRect();
    if (r.width > 1 && r.height > 1 && inter(r)) hits.push('control: ' + (e.textContent.trim().slice(0, 24) || e.tagName));
  });
  return {box: [Math.round(b.left), Math.round(b.top), Math.round(b.right), Math.round(b.bottom)], hits: [...new Set(hits)]};
}"""

async def main() -> int:
    fails = 0
    async with async_playwright() as p:
        b = await p.chromium.launch()
        # the widget floats only from 1024 up; below that it is a button in the phone bar
        for w, h in [(1024, 768), (1280, 800), (1440, 900), (1920, 1080)]:
            c = await b.new_context(viewport={"width": w, "height": h}); pg = await c.new_page()
            for route in ROUTES:
                r = await pg.goto(f"{BASE}{route}", wait_until="networkidle")
                if not r or r.status != 200: continue
                await pg.wait_for_timeout(1200)
                res = await pg.evaluate(JS)
                if res.get("missing"): fails += 1; print(f"  FAIL {w:>5} {route:<40} widget missing"); continue
                if res["hits"]: fails += 1; print(f"  FAIL {w:>5} {route:<40} widget {res['box']} over: " + "; ".join(res["hits"][:4]))
            await c.close()
        await b.close()
    print(f"\nWIDGET OVERLAP FAILURES: {fails}")
    return 1 if fails else 0

sys.exit(asyncio.run(main()))
