"""
Every visible string on the built site has a source, or the check fails.

A string passes if it is, after normalising case, whitespace and punctuation:
  - verbatim on camimlaw.com (docs/sources/camimlaw.com.json), or
  - verbatim on camulaw.com (rendered English pages, or the site's own ES/EN
    dictionaries and service content, docs/sources/camulaw.com.*.json), or
  - verbatim in one of the sister firm's source documents
    (docs/sources/camulaw-source-documents/*.txt), or
  - a value from a checked record in src/lib/org.ts or src/lib/services.ts
    (names, numbers, addresses, form numbers, dates), or
  - a fragment of one of the above at least 12 characters long, so a sentence
    the source splits across links, or a heading that quotes a source line,
    still passes.

Anything else is text written for this site, and this site is not allowed to
carry text written for it. The check prints every such string with the route
it first appears on and exits 1. It also regenerates docs/COPY_PROVENANCE.md.

Visible text means text nodes, plus alt, title, aria-label, <title> and the
meta description, on every route of the build, in both languages.

    python3 verify/copy-provenance.py [base-url]
"""
import asyncio, json, re, sys, unicodedata, pathlib
from collections import Counter
from playwright.async_api import async_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:4321"
ROOT = pathlib.Path(__file__).resolve().parents[1]
DOCS = ROOT.parent / "docs"

def norm(s: str) -> str:
    s = unicodedata.normalize("NFKC", s).lower()
    s = re.sub(r"[“”\"'‘’«»]", "", s)
    s = re.sub(r"[.,;:!?¡¿()\[\]\-–—·•|/]+", " ", s)
    return re.sub(r"\s+", " ", s).strip()

def walk(o):
    if isinstance(o, str): yield o
    elif isinstance(o, list):
        for x in o: yield from walk(x)
    elif isinstance(o, dict):
        for x in o.values(): yield from walk(x)

def load_corpus():
    lines, blobs = set(), []
    for f in ("camimlaw.com.json", "camulaw.com.rendered-en.json"):
        d = json.load(open(DOCS / "sources" / f))
        for page, ls in d.items():
            for l in ls: lines.add(norm(l))
            blobs.append(norm(" ".join(ls)))
    d = json.load(open(DOCS / "sources" / "camulaw.com.site-data.json"))
    for s in walk(d):
        n = norm(s)
        if n: lines.add(n); blobs.append(n)
    for f in (DOCS / "sources" / "camulaw-source-documents").glob("*.txt"):
        t = f.read_text(errors="ignore")
        for l in re.split(r"[\n\t]+", t):
            n = norm(l)
            if len(n) > 3: lines.add(n)
        blobs.append(norm(t))
    return lines, " | ".join(blobs)

def load_records():
    vals = set()
    for f in ("src/lib/org.ts", "src/lib/services.ts"):
        t = (ROOT / f).read_text(encoding="utf-8")
        # only literal values on the right of a colon or inside arrays, not comments
        t = re.sub(r"/\*.*?\*/", "", t, flags=re.S); t = re.sub(r"//[^\n]*", "", t)
        for m in re.findall(r'"([^"\n]{1,120})"', t): vals.add(norm(m))
    return vals

FORM_RE = re.compile(r"^(I|N|G|DS|K|EOIR)-?\d{1,4}[A-Z]?( / (I|N|DS|K)-?\d{1,4}[A-Z]?)?$")

def whole(n, lines, blob, records):
    """A complete sourced line, a complete record value, or a sourced fragment of 12+ characters."""
    if not n: return False
    if n in lines or n in records: return True
    if FORM_RE.match(n) or re.fullmatch(r"[\d\s]+", n): return True
    return len(n) >= 12 and n in blob

def segmented(n, lines, blob, records, depth=0):
    """A string made of two or three WHOLE sourced parts set side by side, e.g. a
    label next to a phone number, or a city next to a state and a postcode.
    Parts must be whole values, never fragments, so this cannot be gamed by
    stitching words."""
    words = n.split()
    if len(words) < 2 or len(words) > 24: return False
    def ok_part(part): return part in lines or part in records or bool(FORM_RE.match(part)) or bool(re.fullmatch(r"[\d\s]+", part))
    for i in range(1, len(words)):
        a, b = " ".join(words[:i]), " ".join(words[i:])
        if ok_part(a) and (ok_part(b) or (depth < 1 and segmented(b, lines, blob, records, depth + 1))): return True
    return False

def classify(s, lines, blob, records, parent=None):
    n = norm(s)
    if not n: return "empty", ""
    if n in lines: return "verbatim", ""
    if n in records or FORM_RE.match(s.strip()) or re.fullmatch(r"[\d.,:%\s()+\-–—·/]+", s.strip()): return "record", ""
    if len(n) >= 12 and n in blob: return "verbatim-fragment", ""
    # compound nodes: parts joined by a separator, each a whole sourced thing
    for sep in (r"\s[·|]\s", r"\s[—–]\s", r"(?<=[.!?])\s+"):
        parts = [p for p in re.split(sep, s) if p.strip()]
        if len(parts) > 1 and all(whole(norm(p), lines, blob, records) or segmented(norm(p), lines, blob, records) for p in parts):
            return "verbatim-parts", ""
    if segmented(n, lines, blob, records): return "verbatim-parts", ""
    # a text node that is one piece of an element whose whole text is sourced:
    # a wordmark split across two spans, a headline split into lines by the reveal
    if parent:
        pn = norm(parent)
        if pn != n and (pn in lines or pn in records or (len(pn) >= 12 and pn in blob) or segmented(pn, lines, blob, records)
                        or any(len(parts := [p for p in re.split(sep, parent) if p.strip()]) > 1 and all(whole(norm(p), lines, blob, records) or segmented(norm(p), lines, blob, records) for p in parts) for sep in (r"\s[·|]\s", r"\s[—–]\s", r"(?<=[.!?])\s+"))):
            return "verbatim-part-of-element", ""
    return "unsourced", n

JS = """() => {
  const out = [];
  const INLINE = ['SPAN','B','I','EM','STRONG','TIME','SMALL','SUP','SUB'];
  // the reveal wraps each line of a heading in .line-mask > .line; those are
  // presentation, and the heading is the unit
  const isPart = (el) => INLINE.includes(el.tagName) || el.classList.contains('line') || el.classList.contains('line-mask');
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = w.nextNode())) {
    const p = n.parentElement; if (!p) continue;
    if (['SCRIPT','STYLE','NOSCRIPT','TEMPLATE'].includes(p.tagName)) continue;
    const t = n.textContent.replace(/\s+/g, ' ').trim();
    if (t.length > 1) {
      // the nearest block-level ancestor: its full text is the unit the reader sees,
      // so a wordmark split across spans or a headline split into lines by the
      // reveal is judged as a whole as well as piece by piece
      let el = p; while (el && el !== document.body && isPart(el)) el = el.parentElement;
      out.push([t, (el || p).textContent.replace(/\s+/g, ' ').trim()]);
    }
  }
  document.querySelectorAll('[alt],[aria-label],[title]').forEach(e => {
    for (const a of ['alt','aria-label','title']) { const v = e.getAttribute(a); if (v && v.trim().length > 1) out.push([v.trim(), null]); }
  });
  out.push([document.title, null]);
  const d = document.querySelector('meta[name=description]'); if (d && d.content) out.push([d.content, null]);
  return out;
}"""

async def main() -> int:
    lines, blob, records = *load_corpus(), load_records()
    routes = sorted("/" + str(p.relative_to(ROOT / "dist/client")).replace("index.html", "") for p in (ROOT / "dist/client").rglob("index.html"))
    seen, rows = {}, []
    async with async_playwright() as p:
        b = await p.chromium.launch(); c = await b.new_context(viewport={"width": 1440, "height": 900}); pg = await c.new_page()
        for route in routes:
            r = await pg.goto(f"{BASE}{route}", wait_until="domcontentloaded")
            if not r or r.status != 200: continue
            for s, parent in await pg.evaluate(JS):
                if s in seen: continue
                seen[s] = route
                cat, _ = classify(s, lines, blob, records, parent)
                rows.append((cat, route, len(s.split()), s))
        await b.close()
    cnt = Counter(r[0] for r in rows); words = Counter()
    for r in rows: words[r[0]] += r[2]
    md = ["# Copy provenance", "", "Every visible string on the built site, checked by `verify/copy-provenance.py` against the sources under `docs/sources/`.", "",
          "| Category | Strings | Words |", "|---|---:|---:|"]
    for k in ("verbatim", "verbatim-fragment", "verbatim-parts", "verbatim-part-of-element", "record", "unsourced"): md.append(f"| {k} | {cnt[k]} | {words[k]} |")
    md += ["", "## Unsourced", "", "| First route | Words | String |", "|---|---:|---|"]
    for cat, route, wc, s in sorted(rows, key=lambda r: (r[1], -r[2])):
        if cat == "unsourced": md.append(f"| `{route}` | {wc} | {s.replace('|', chr(92)+'|')[:200]} |")
    (DOCS / "COPY_PROVENANCE.md").write_text("\n".join(md) + "\n", encoding="utf-8")
    for cat, route, wc, s in sorted(rows, key=lambda r: (r[1], -r[2])):
        if cat == "unsourced": print(f"  UNSOURCED {route:<40} {s[:110]}")
    print(f"\nstrings: {len(rows)}  unsourced: {cnt['unsourced']} ({words['unsourced']} words)  sourced: {len(rows)-cnt['unsourced']}")
    return 1 if cnt["unsourced"] else 0

sys.exit(asyncio.run(main()))
