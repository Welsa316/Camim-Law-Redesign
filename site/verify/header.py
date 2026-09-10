"""
The header's rendered height must equal the --header-h token, at every width.

Anything positioned against that token is wrong the moment the two disagree.
The opening frame pulls itself up by exactly --header-h so the photograph can
start at the top of the page; when the token was 66px against a 77px bar, an
11px strip of paper sat above the frame on every phone.

Also asserts the boundary where the full bar appears. At 1024 the wordmark, the
four nav items, the phone number, the pay link, the language control and the
booking button did not fit on one line: the flex items shrank past their
content, two link labels broke in two, and the bar rendered 109px tall.

    python3 verify/header.py [base-url]
"""
import asyncio, sys
from playwright.async_api import async_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:4321"
WIDTHS = [320, 360, 390, 430, 768, 900, 1023, 1024, 1100, 1159, 1160, 1280, 1440, 1920]
FULL_BAR_AT = 1160

READ = """() => {
  const h = document.querySelector('[data-header]');
  const nav = document.querySelector('.hdr-nav');
  return {
    real: +h.getBoundingClientRect().height.toFixed(1),
    token: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')),
    navShown: getComputedStyle(nav).display !== 'none',
    overflow: document.documentElement.scrollWidth > innerWidth,
  };
}"""


async def main() -> int:
    fails = 0
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for w in WIDTHS:
            c = await b.new_context(viewport={"width": w, "height": 900})
            pg = await c.new_page()
            # A page with no dark opening frame, so the bar is in its normal state.
            await pg.goto(f"{BASE}/consulta/", wait_until="domcontentloaded")
            await pg.wait_for_timeout(600)
            r = await pg.evaluate(READ)
            bad = []
            if abs(r["real"] - r["token"]) > 1:
                bad.append(f"token {r['token']} != rendered {r['real']}")
            if r["navShown"] != (w >= FULL_BAR_AT):
                bad.append(f"full bar shown={r['navShown']} at {w}")
            if r["overflow"]:
                bad.append("document overflows horizontally")
            if bad:
                fails += 1
                print(f"  FAIL {w:>5}  " + "; ".join(bad))
            else:
                print(f"  OK   {w:>5}  height={r['real']} full-bar={r['navShown']}")
            await c.close()
        await b.close()
    print(f"\nHEADER FAILURES: {fails}")
    return 1 if fails else 0


sys.exit(asyncio.run(main()))
