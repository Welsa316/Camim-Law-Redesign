#!/usr/bin/env bash
# Builds the landing page alone into ../demo/ for a preview link. Nothing but
# the two home pages and their assets is copied, so no other route exists at
# the preview URL even if someone types it.
set -euo pipefail
cd "$(dirname "$0")/.."
PUBLIC_DEMO=1 npm run build
OUT="../demo"
rm -rf "$OUT" && mkdir -p "$OUT/en" "$OUT/img"
cp dist/client/index.html "$OUT/index.html"
cp dist/client/en/index.html "$OUT/en/index.html"
cp -R dist/client/_astro "$OUT/_astro"
cp dist/client/img/*.jpg "$OUT/img/"
cp -R dist/client/img/services "$OUT/img/services"
cp -R dist/client/fonts "$OUT/fonts"
printf 'User-agent: *\nDisallow: /\n' > "$OUT/robots.txt"
( cd "$OUT/.." && rm -f demo.zip && zip -qr demo.zip demo )
echo "demo/ ready: $(find "$OUT" -type f | wc -l | tr -d ' ') files, $(du -sh "$OUT" | cut -f1); demo.zip $(du -sh ../demo.zip | cut -f1)"
