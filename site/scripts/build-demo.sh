#!/usr/bin/env bash
# Builds the phase 1 preview into ../demo/: the landing page and the attorney
# page, in both languages, and nothing else. The routes are listed once, in
# DEMO_ROUTES in src/lib/site.js, which is what makes every link to anything
# else render as inert text; this script copies the matching files, so no other
# route exists at the preview URL even if someone types it.
set -euo pipefail
cd "$(dirname "$0")/.."

# Kept in step with DEMO_ROUTES by the check below, not by memory.
ROUTES=("" "juan-campos")
# English-only pages, outside the bilingual pairs above.
SINGLE=("progress")

PUBLIC_DEMO=1 npm run build

# The allow-list in the build and the list here have to agree, or the preview
# ships a page whose links are inert, or links to a page it did not copy.
node -e '
  const fs = require("fs");
  const src = fs.readFileSync("src/lib/site.js", "utf8");
  const m = src.match(/DEMO_ROUTES\s*=\s*\[([^\]]*)\]/);
  if (!m) { console.error("DEMO_ROUTES not found in src/lib/site.js"); process.exit(1); }
  const single = src.match(/DEMO_SINGLE_ROUTES\s*=\s*\[([^\]]*)\]/);
  const parse = t => t.split(",").map(s => s.trim().replace(/^["'"'"']|["'"'"']$/g, "")).filter(s => s.length || s === "");
  const inCode = parse(m[1]).concat(single ? parse(single[1]) : []);
  const inShell = process.argv.slice(1);
  const a = JSON.stringify(inCode.sort()), b = JSON.stringify(inShell.sort());
  if (a !== b) { console.error(`DEMO_ROUTES ${a} does not match build-demo.sh ${b}`); process.exit(1); }
' "${ROUTES[@]}" "${SINGLE[@]}"

OUT="../demo"
rm -rf "$OUT" && mkdir -p "$OUT/img"
for route in "${ROUTES[@]}"; do
  for lang in "" "en/"; do
    dir="$OUT/${lang}${route:+$route/}"
    mkdir -p "$dir"
    cp "dist/client/${lang}${route:+$route/}index.html" "$dir/index.html"
  done
done
for route in "${SINGLE[@]}"; do
  mkdir -p "$OUT/$route"
  cp "dist/client/$route/index.html" "$OUT/$route/index.html"
done
cp -R dist/client/_astro "$OUT/_astro"
cp -R dist/client/fonts "$OUT/fonts"

# Only the images these two pages actually reference. Copying img/ wholesale
# put five unused photographs of the client into a package addressed to him.
node -e '
  const fs = require("fs"), path = require("path");
  const out = process.argv[1], src = process.argv[2];
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap(e =>
    e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
  const text = walk(out).filter(f => /\.(html|css|js)$/.test(f))
    .map(f => fs.readFileSync(f, "utf8")).join("\n");
  const wanted = new Set([...text.matchAll(/\/img\/[A-Za-z0-9_\/.-]+\.(?:jpg|png|svg|webp)/g)].map(m => m[0]));
  for (const rel of wanted) {
    const from = path.join(src, rel), to = path.join(out, rel);
    if (!fs.existsSync(from)) { console.error(`missing asset ${rel}`); process.exit(1); }
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.copyFileSync(from, to);
  }
  console.log(`${wanted.size} images copied`);
' "$OUT" "dist/client"
# The tab icons. They were missing from every earlier preview: the link check
# below is what noticed, after a person had already looked at one.
cp dist/client/favicon.svg dist/client/favicon-32.png dist/client/apple-touch-icon.png "$OUT/"
printf 'User-agent: *\nDisallow: /\n' > "$OUT/robots.txt"

# Every internal link in the preview must point at a file the preview has.
node -e '
  const fs = require("fs"), path = require("path");
  const out = process.argv[1];
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap(e =>
    e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
  let dead = 0;
  for (const f of walk(out).filter(f => f.endsWith(".html"))) {
    const html = fs.readFileSync(f, "utf8");
    for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
      const target = m[1].endsWith("/") ? path.join(out, m[1], "index.html") : path.join(out, m[1]);
      if (!fs.existsSync(target)) { console.error(`dead link in ${f}: ${m[1]}`); dead++; }
    }
  }
  if (dead) process.exit(1);
  console.log("internal links all resolve");
' "$OUT"

( cd "$OUT/.." && rm -f demo.zip && zip -qr demo.zip demo )
echo "demo/ ready: $(find "$OUT" -type f | wc -l | tr -d ' ') files, $(du -sh "$OUT" | cut -f1); demo.zip $(du -sh ../demo.zip | cut -f1)"

# Put the real build back. dist/ is what every script in verify/ reads and what
# the local server serves, and a demo build leaves it full of inert spans where
# the links should be — so a check run after this script passes against a page
# nobody will ever visit. That happened; this is the fix.
PUBLIC_REVIEW_BUILD=1 npm run build >/dev/null
echo "dist/ restored to the review build"
