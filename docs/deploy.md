# Deploying

Two things get deployed from this repository, and they must not be the same
build.

| | What it serves | Build | Start |
|---|---|---|---|
| **Production** | camimlaw.com, every route | `npm run build` in `site/` | `node site/dist/server/entry.mjs` |
| **Preview** | the reviewed pages only, plus `/progress` | `bash site/scripts/build-demo.sh` | `node site/scripts/serve-preview.mjs` |

## Why the preview serves a folder and not the app

`PUBLIC_DEMO=1` does **not** stop pages from being built. It makes internal
links render as inert text and adds `noindex`; every route is still generated.
The only thing that keeps the preview URL to the pages Juan should see is that
`build-demo.sh` copies just those files into `demo/`, and
`serve-preview.mjs` serves that folder and 404s everything else.

So: never point the preview service at the Astro server build. It would serve
all nineteen routes with inert links, which is not the same promise.

The one exception is `/progress`, which is generated **only** when
`PUBLIC_DEMO` is set — `getStaticPaths` returns nothing otherwise — so it
cannot appear in production even by accident, and `progress.json` never
reaches a production bundle.

## Which pages the preview publishes

`DEMO_ROUTES` and `DEMO_SINGLE_ROUTES` in `site/src/lib/site.js`. That list
decides both which links render as real anchors and which pages the script
copies; the build fails if the two disagree, and again if any internal link in
the output points at a file the preview does not contain.

To add a page to the preview, add its slug to that list. Nothing else.

## Railway

Both services come from this repository.

**Preview service**
- Branch: `main` (or `preview`, if you want the preview to lag production).
- Build command: `cd site && npm ci && bash scripts/build-demo.sh`
- Start command: `node site/scripts/serve-preview.mjs`
- Variables: `PREVIEW_DIR=demo`. Railway supplies `PORT`.
- Give it a domain. Anything Railway generates is fine; it is not meant to be
  guessable or public.

`serve-preview.mjs` sends `X-Robots-Tag: noindex, nofollow` on everything it
serves, on top of the `noindex` in each page's head and the `robots.txt` in
the folder.

**Production service** — not live yet. When it is:
- Build command: `cd site && npm ci && npm run build`
- Start command: `node site/dist/server/entry.mjs`
- Do **not** set `PUBLIC_DEMO`. Confirm `/progress` returns 404 there.
- The contact endpoint needs `LEAD_INBOX`, `LEAD_FROM` and `RESEND_API_KEY`;
  without them the form accepts the lead and logs it instead of sending.

## Before any deploy

```
cd site
python3 verify/progress.py
python3 verify/copy-provenance.py
```

and the rest of `verify/` — see `site/verify/README.md`. `build-demo.sh`
restores the review build when it finishes, because every check reads `dist/`
and a demo build left there makes them pass against pages nobody visits.
