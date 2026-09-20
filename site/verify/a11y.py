"""
The structural accessibility facts that a contrast or overflow pass cannot
see: landmarks, one h1, heading order, accessible names on every control,
alt on every image, labels on every field, unique ids, and touch targets on
the widths where the site is used with a thumb.

    python3 verify/a11y.py [base-url]
"""
import asyncio, sys, pathlib
from playwright.async_api import async_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:4321"
ROOT = pathlib.Path(__file__).resolve().parents[1]
ROUTES = sorted("/" + str(f.relative_to(ROOT / "dist/client")).replace("index.html", "") for f in (ROOT / "dist/client").rglob("index.html"))

JS = """(narrow) => {
  const bad = [];
  const vis = (el) => { const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
    return cs.display !== 'none' && cs.visibility !== 'hidden' && r.width > 0 && r.height > 0; };
  const name = (el) => (el.getAttribute('aria-label') || el.getAttribute('title') ||
    (el.getAttribute('aria-labelledby') ? (document.getElementById(el.getAttribute('aria-labelledby'))?.textContent || '') : '') ||
    el.textContent || (el.querySelector('img')?.alt ?? '')).trim();

  if (!document.querySelector('main')) bad.push('no <main>');
  if (!document.querySelector('header')) bad.push('no <header>');
  if (!document.querySelector('footer')) bad.push('no <footer>');
  if (document.documentElement.lang !== 'es' && document.documentElement.lang !== 'en') bad.push('html lang missing');

  const h1 = [...document.querySelectorAll('h1')].filter(vis);
  if (h1.length !== 1) bad.push(`h1 count ${h1.length}`);

  let prev = 0;
  for (const h of document.querySelectorAll('h1,h2,h3,h4,h5,h6')) {
    if (!vis(h)) continue;
    const lvl = +h.tagName[1];
    if (prev && lvl > prev + 1) bad.push(`heading jump h${prev}->h${lvl} "${h.textContent.trim().slice(0,24)}"`);
    prev = lvl;
  }

  for (const img of document.querySelectorAll('img')) if (!img.hasAttribute('alt')) bad.push(`img without alt: ${img.getAttribute('src')}`);
  for (const f of document.querySelectorAll('iframe')) if (!f.getAttribute('title')) bad.push('iframe without title');

  for (const a of document.querySelectorAll('a')) {
    if (!vis(a)) continue;
    if (!a.getAttribute('href')) bad.push(`link without href "${a.textContent.trim().slice(0,20)}"`);
    if (!name(a)) bad.push('link without accessible name');
  }
  for (const b of document.querySelectorAll('button')) if (vis(b) && !name(b)) bad.push('button without accessible name');

  for (const f of document.querySelectorAll('input, select, textarea')) {
    if (!vis(f) || f.type === 'hidden') continue;
    const lab = f.id ? document.querySelector(`label[for="${CSS.escape(f.id)}"]`) : f.closest('label');
    if (!lab && !f.getAttribute('aria-label') && !f.getAttribute('aria-labelledby')) bad.push(`field without label: ${f.name || f.type}`);
  }

  const seen = new Set();
  for (const el of document.querySelectorAll('[id]')) {
    if (seen.has(el.id)) bad.push(`duplicate id #${el.id}`);
    seen.add(el.id);
  }

  if (narrow) {
    for (const el of document.querySelectorAll('a, button, input[type=submit], summary')) {
      if (!vis(el)) continue;
      const r = el.getBoundingClientRect();
      // inline links inside a paragraph are exempt (WCAG 2.5.8 inline exception)
      const inline = getComputedStyle(el).display === 'inline' && el.closest('p, li, address');
      if (!inline && (r.height < 24 || r.width < 24)) bad.push(`target ${Math.round(r.width)}x${Math.round(r.height)} "${name(el).slice(0,20)}"`);
    }
  }
  return [...new Set(bad)];
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
                await pg.wait_for_timeout(1500)
                for x in await pg.evaluate(JS, w < 1024):
                    fails += 1; print(f"  FAIL {w:>4} {route:<32} {x}")
            await c.close()
        await b.close()
    print(f"\nA11Y FAILURES: {fails}")
    return 1 if fails else 0

sys.exit(asyncio.run(main()))
