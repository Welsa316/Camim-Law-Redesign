"""
Search and existing links, held to the facts rather than to intent.

  - Every address the old Squarespace site published answers with exactly one
    301 to its new home, in both slash forms, and the new home answers 200.
    The list is the old site's live surface, frozen here on purpose: it is a
    fact about the world, not about this codebase, so removing a redirect
    from the config has to fail this check rather than quietly agree with it.
  - Every route of the build answers 200, and an address that never existed
    answers 404, not a soft 200.
  - The sitemap lists exactly the route table, robots.txt points at it, and
    the sitemap index points at the sitemap.
  - Each page declares its own canonical, links both languages, shares its
    own card (a 1200x630 JPEG no other page uses, with alt text, served as
    an image; src/lib/og.ts), carries structured data that parses,
    has a title no other page in its language shares, and a description of
    at least 50 characters.

Runs against the server build (`npm run preview`), because the redirects are
answered by the server, not by files.

    python3 verify/search.py [base-url]
"""
import json, pathlib, re, sys, html, urllib.request, urllib.error

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:4321"
ROOT = pathlib.Path(__file__).resolve().parents[1] / "dist" / "client"
SITE = "https://www.camimlaw.com"

# The old site's live URL surface (docs/SEO_AEO_PLAN.md, "five sitemap URLs
# plus /cart and a linked-but-404 /appointments"), and where each now goes.
LEGACY = {
    "/home": "/", "/services": "/servicios/", "/about": "/juan-campos/",
    "/contact": "/consulta/", "/appointments": "/consulta/",
    "/cart": "/", "/checkout": "/",
}

class NoFollow(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **k): return None
opener = urllib.request.build_opener(NoFollow)

def get(path):
    try:
        r = opener.open(BASE + path, timeout=15)
        return r.status, r.headers, r.read()
    except urllib.error.HTTPError as e:
        return e.code, e.headers, e.read()

def main() -> int:
    bad: list[str] = []

    for old, new in LEGACY.items():
        for path in (old, old + "/"):
            status, headers, _ = get(path)
            loc = (headers.get("Location") or "").replace(BASE, "")
            if status != 301 or loc != new:
                bad.append(f"{path}: {status} -> {loc or '(none)'}, want a single 301 to {new}")
                continue
            s2, _, _ = get(new)
            if s2 != 200: bad.append(f"{path}: lands on {new}, which answers {s2}")

    routes = sorted("/" + str(f.relative_to(ROOT)).replace("index.html", "") for f in ROOT.rglob("index.html")
                    if not str(f.relative_to(ROOT)).startswith("404"))
    for r in routes:
        s, _, _ = get(r)
        if s != 200: bad.append(f"{r}: answers {s}")
    s, _, _ = get("/esta-pagina-nunca-existio/")
    if s != 404: bad.append(f"an address that never existed answers {s}, not 404")

    robots = (ROOT / "robots.txt").read_text()
    if f"Sitemap: {SITE}/sitemap-index.xml" not in robots: bad.append("robots.txt does not point at the sitemap index")
    if "sitemap-0.xml" not in (ROOT / "sitemap-index.xml").read_text(): bad.append("the sitemap index does not list sitemap-0.xml")
    sm = (ROOT / "sitemap-0.xml").read_text()
    locs = sorted(u.replace(SITE, "") for u in re.findall(r"<loc>([^<]+)</loc>", sm))
    for x in sorted(set(locs) - set(routes)): bad.append(f"sitemap lists {x}, which is not a route")
    for x in sorted(set(routes) - set(locs)): bad.append(f"route {x} is missing from the sitemap")

    titles: dict[tuple[str, str], str] = {}
    og_checked = set()
    og_owner: dict[str, str] = {}
    for r in routes:
        t = (ROOT / r.lstrip("/") / "index.html").read_text()
        lang = "en" if r.startswith("/en/") else "es"
        g = lambda pat: (m.group(1) if (m := re.search(pat, t)) else None)
        title = html.unescape(g(r"<title>([^<]*)</title>") or "")
        desc = html.unescape(g(r'<meta name="description" content="([^"]*)"') or "")
        canon = g(r'<link rel="canonical" href="([^"]*)"')
        alts = set(re.findall(r'<link rel="alternate" hreflang="([^"]+)"', t))
        og = g(r'<meta property="og:image" content="([^"]*)"')
        og_alt = g(r'<meta property="og:image:alt" content="([^"]*)"')
        if not title: bad.append(f"{r}: no title")
        elif (lang, title) in titles: bad.append(f"{r}: title '{title}' also used by {titles[(lang, title)]}")
        else: titles[(lang, title)] = r
        if len(desc) < 50: bad.append(f"{r}: description is {len(desc)} characters: '{desc}'")
        if canon != SITE + r: bad.append(f"{r}: canonical is {canon}")
        if not {"es", "en"} <= {a.split("-")[0] for a in alts}: bad.append(f"{r}: hreflang links {sorted(alts)}")
        if not og: bad.append(f"{r}: no og:image")
        else:
            if og in og_owner: bad.append(f"{r}: shares {og} with {og_owner[og]}; each page has its own card")
            og_owner.setdefault(og, r)
            if not og_alt: bad.append(f"{r}: share image has no alt text")
            if og not in og_checked:
                og_checked.add(og)
                s, h, body = get(og.replace(SITE, ""))
                if s != 200 or (h.get("Content-Type") or "") != "image/jpeg": bad.append(f"{og}: {s} {h.get('Content-Type')}")
                else:
                    # JPEG frame size from the SOF marker, without an imaging library
                    i, size = 2, None
                    while i < len(body) - 9:
                        if body[i] == 0xFF and body[i + 1] in (0xC0, 0xC1, 0xC2):
                            size = (int.from_bytes(body[i + 7:i + 9], "big"), int.from_bytes(body[i + 5:i + 7], "big")); break
                        i += 2 + int.from_bytes(body[i + 2:i + 4], "big") if body[i] == 0xFF else 1
                    if size != (1200, 630): bad.append(f"{og}: {size}, want 1200x630")
        for block in re.findall(r'<script type="application/ld\+json">(.*?)</script>', t, re.S):
            try: json.loads(block)
            except Exception as e: bad.append(f"{r}: structured data does not parse ({e})")
        if 'application/ld+json' not in t: bad.append(f"{r}: no structured data")

    for b in bad: print(f"  FAIL {b}")
    print(f"  checked {len(LEGACY) * 2} legacy addresses, {len(routes)} routes, {len(locs)} sitemap URLs")
    print(f"\nSEARCH FAILURES: {len(bad)}")
    return 1 if bad else 0

sys.exit(main())
