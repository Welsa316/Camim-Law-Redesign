"""
Writes the reworded service text from docs/sources/paraphrases.json into
src/lib/services.ts, replacing each service's one-line description and page
blocks in both languages. Everything else in the file (ids, order, slugs,
names, related services, sources, images) is left as it is.

verify/copy-provenance.py fails if services.ts and paraphrases.json disagree,
so edit the JSON and rerun this rather than editing services.ts by hand.

    python3 scripts/build-services.py
"""
import json, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
TS = ROOT / "src/lib/services.ts"
PARA = ROOT.parent / "docs/sources/paraphrases.json"

HEADER = """/**
 * The firm's services.
 *
 * Names come from Campos Muños Law's site (camulaw.com) and its ES/EN
 * dictionaries, on the client's instruction of 2026-09-10 that this firm's
 * services mirror that firm's. One-line descriptions and page text are
 * reworded from that site, and for the Spanish asylum page from camimlaw.com's
 * own asylum page, on the client's instruction of 2026-09-26 that the pages
 * not match the sister firm's word for word, with the legal meaning kept.
 * Every reworded string sits next to the source text it restates in
 * docs/sources/paraphrases.json. Blocks that named the sister firm, its city
 * or state stay omitted (docs/sources/omissions.json).
 * verify/copy-provenance.py checks every rendered string against the sources
 * under docs/sources/.
 *
 * Written by scripts/build-services.py from docs/sources/paraphrases.json;
 * edit that file and rerun the script rather than editing this one.
 */
"""
START = "export const SERVICES: Service[] = "
REWORDED = "; text reworded 2026-09-26 (docs/sources/paraphrases.json)"


def main() -> int:
    src = TS.read_text(encoding="utf-8")
    head, _, rest = src.partition(START)
    body, sep, tail = rest.partition("\n];\n")
    if not sep:
        print("could not find the end of SERVICES in services.ts"); return 1
    services = json.loads(body + "\n]")
    para = json.loads(PARA.read_text(encoding="utf-8"))["services"]

    for s in services:
        p = para.get(s["id"])
        if not p:
            print(f"{s['id']}: no record in paraphrases.json"); return 1
        for lang in ("es", "en"):
            s["line"][lang] = p[lang]["line"]["to"]
            s["blocks"][lang] = [
                {"type": "list", "items": [it["to"] for it in b["items"]]} if b["type"] == "list"
                else {"type": b["type"], "text": b["to"]}
                for b in p[lang]["blocks"]
            ]
        if REWORDED not in s["source"]:
            s["source"] += REWORDED

    # the type declarations between the header comment and the array stay
    types = head[head.index("*/") + 2:].lstrip("\n")
    out = HEADER + "\n" + types + START + json.dumps(services, ensure_ascii=False, indent=2)[:-2] + sep + tail
    TS.write_text(out, encoding="utf-8")
    print(f"services.ts: {len(services)} services written from paraphrases.json")
    return 0


sys.exit(main())
