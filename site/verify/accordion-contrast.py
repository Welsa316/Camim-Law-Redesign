"""
Type on the home accordion's photographic panels clears WCAG 2.2 AA, measured
from the composited pixels behind the glyphs, in the open panel and in the
collapsed tabs, at desktop and at the stacked phone layout.

Same method as hero-contrast.py: glyph rects via Range, the glyphs blanked,
the pixels sampled. The gradient overlay under the caption is the thing under
test, so the overlay is left in place.

    python3 verify/accordion-contrast.py [base-url]
"""
import asyncio, io, sys
from playwright.async_api import async_playwright
from PIL import Image

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:4321"

def srgb(c):
    c /= 255.0
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
def lum(p): return 0.2126 * srgb(p[0]) + 0.7152 * srgb(p[1]) + 0.0722 * srgb(p[2])
def ratio(a, b):
    l1, l2 = lum(a), lum(b); hi, lo = max(l1, l2), min(l1, l2)
    return (hi + 0.05) / (lo + 0.05)

RECTS = """() => {
  const sel = ['.ag-item[data-active] .ag-n', '.ag-item[data-active] .ag-label', '.ag-item[data-active] .ag-meta',
               '.ag-item[data-active] .ag-more', '.ag-item:not([data-active]) .ag-tab-l', '.ag-item:not([data-active]) .ag-tab-n'];
  const out = [];
  for (const s of sel) for (const e of document.querySelectorAll(s)) {
    const cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) continue;
    const rects = []; const w = document.createTreeWalker(e, NodeFilter.SHOW_TEXT); let n;
    while ((n = w.nextNode())) { if (!n.textContent.trim()) continue; const r = document.createRange(); r.selectNodeContents(n);
      for (const b of r.getClientRects()) if (b.width > 1 && b.height > 1) rects.push({x: b.left, y: b.top, w: b.width, h: b.height}); }
    if (rects.length) out.push({sel: s, color: cs.color, size: parseFloat(cs.fontSize), weight: parseInt(cs.fontWeight, 10), rects});
  }
  return out;
}"""
BLANK = """.ag-item, .ag-item * { color: transparent !important; text-shadow: none !important; -webkit-text-fill-color: transparent !important; }
           .ag-bar { opacity: 0 !important; }"""

async def main() -> int:
    fails = 0
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for w, h in [(1440, 900), (1024, 768), (390, 844)]:
            c = await b.new_context(viewport={"width": w, "height": h}, device_scale_factor=1); pg = await c.new_page()
            await pg.goto(f"{BASE}/", wait_until="networkidle"); await pg.wait_for_timeout(1500)
            acc = pg.locator("#servicios-acordeon"); y = await acc.evaluate("e => e.getBoundingClientRect().top + scrollY")
            await pg.evaluate(f"() => scrollTo(0, {y} - 80)"); await pg.wait_for_timeout(1400)
            blocks = await pg.evaluate(RECTS)
            await pg.add_style_tag(content=BLANK); await pg.wait_for_timeout(200)
            im = Image.open(io.BytesIO(await pg.screenshot(clip={"x": 0, "y": 0, "width": w, "height": h}))).convert("RGB")
            print(f"--- {w}x{h} ---")
            for bl in blocks:
                fg = [int(v) for v in bl["color"].replace("rgba(", "").replace("rgb(", "").replace(")", "").split(",")[:3]]
                worst, worstL = None, -1
                for r in bl["rects"]:
                    x0, y0 = max(0, int(r["x"])), max(0, int(r["y"])); x1, y1 = min(w, int(r["x"] + r["w"])), min(h, int(r["y"] + r["h"]))
                    if x1 <= x0 or y1 <= y0: continue
                    for px in im.crop((x0, y0, x1, y1)).getdata():
                        L = lum(px)
                        if L > worstL: worstL, worst = L, px
                if worst is None: continue
                cr = ratio(fg, list(worst)); large = bl["size"] >= 24 or (bl["size"] >= 18.66 and bl["weight"] >= 700); need = 3.0 if large else 4.5
                ok = cr >= need; fails += 0 if ok else 1
                print(f"  {'OK ' if ok else 'FAIL'} {bl['sel']:<44} {bl['size']:>5.1f}px worst-bg={worst} ratio={cr:.2f} need={need}")
            await c.close()
        await b.close()
    print(f"\nACCORDION CONTRAST FAILURES: {fails}")
    return 1 if fails else 0

sys.exit(asyncio.run(main()))
