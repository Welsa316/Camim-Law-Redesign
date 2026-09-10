"""
No glyph is clipped by a line mask, on any page, at any width.

The line reveal wraps each line of display type in an overflow-hidden mask.
Display type here sits at a line-height of 1.02, and a serif's descenders
reach below that box, so a mask that is exactly the line box cuts the tail
off every g, p, y and comma on the bottom row of glyphs. It shipped once:
"talking" with no descender on the statement band.

For every mask, after the reveal has settled, the union of the text's own
client rects must sit inside the mask's box. Also asserts that every line is
at its end state, so a mask cannot pass by hiding an unrevealed line.

    python3 verify/split-lines.py [base-url]
"""
import asyncio, sys
from playwright.async_api import async_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:4321"
ROUTES = ["/", "/servicios/", "/asilo-orlando/", "/juan-campos/", "/consulta/", "/detenido/", "/preguntas/", "/orlando/", "/pagos/",
          "/en/", "/en/services/", "/en/juan-campos/", "/en/consultation/", "/en/faq/"]
TOL = 0.75  # px; sub-pixel rounding

JS = """() => {
  const out = [];
  document.querySelectorAll('.line-mask').forEach((mask, i) => {
    const line = mask.querySelector('.line'); if (!line) return;
    const m = mask.getBoundingClientRect();
    if (m.height < 1) return;
    let top = Infinity, bottom = -Infinity, text = '';
    const walk = document.createTreeWalker(line, NodeFilter.SHOW_TEXT); let n;
    while ((n = walk.nextNode())) {
      if (!n.textContent.trim()) continue;
      const r = document.createRange(); r.selectNodeContents(n);
      for (const b of r.getClientRects()) { if (b.height < 1) continue; top = Math.min(top, b.top); bottom = Math.max(bottom, b.bottom); }
      text += n.textContent;
    }
    if (top === Infinity) return;
    const t = getComputedStyle(line).transform;
    out.push({ i, text: text.trim().slice(0, 40), maskTop: m.top, maskBottom: m.bottom, textTop: top, textBottom: bottom,
               settled: t === 'none' || t === 'matrix(1, 0, 0, 1, 0, 0)' });
  });
  return out;
}"""

async def main() -> int:
    fails = 0
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for w, h in [(1440, 900), (390, 844)]:
            c = await b.new_context(viewport={"width": w, "height": h}); pg = await c.new_page()
            for route in ROUTES:
                r = await pg.goto(f"{BASE}{route}", wait_until="networkidle")
                if not r or r.status != 200: continue
                # bring every mask into view so its reveal runs, then let it settle
                await pg.evaluate("""async () => { const els=[...document.querySelectorAll('[data-split-lines]')];
                  for (const e of els) { e.scrollIntoView({block:'center'}); await new Promise(r=>setTimeout(r,250)); }
                  window.scrollTo(0,0); }""")
                # past the 3s safety sweep in motion.ts, so a line still moving is a
                # real defect and not a trigger that has not fired yet
                await pg.wait_for_timeout(3400)
                rows = await pg.evaluate(JS)
                bad = []
                for x in rows:
                    over = max(0.0, x["maskTop"] - x["textTop"]); under = max(0.0, x["textBottom"] - x["maskBottom"])
                    if not x["settled"]: bad.append(f"unsettled line: '{x['text']}'")
                    elif over > TOL or under > TOL: bad.append(f"'{x['text']}' clipped {over:.1f}px above / {under:.1f}px below")
                if bad:
                    fails += len(bad); print(f"  FAIL {w:>5} {route:<26} " + " | ".join(bad[:4]) + (f" (+{len(bad)-4})" if len(bad) > 4 else ""))
                else:
                    print(f"  OK   {w:>5} {route:<26} {len(rows)} lines inside their masks")
            await c.close()
        await b.close()
    print(f"\nLINE-MASK FAILURES: {fails}")
    return 1 if fails else 0

sys.exit(asyncio.run(main()))
