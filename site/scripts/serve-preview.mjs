/**
 * Serves the preview folder, and nothing else.
 *
 * Railway runs this. It matters that it is the folder and not the Astro
 * server: a server build serves all nineteen routes whatever PUBLIC_DEMO is
 * set to — that flag only makes links inert — so the guarantee that the
 * preview URL exposes exactly the reviewed pages comes from these being the
 * only files on disk. Anything else is a 404.
 */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join, extname, resolve, sep } from "node:path";

const ROOT = resolve(process.env.PREVIEW_DIR ?? "demo");
const PORT = Number(process.env.PORT ?? 3000);

const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".json": "application/json",
  ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8", ".ico": "image/x-icon",
};

createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");
  let path = decodeURIComponent(url.pathname);
  if (path.endsWith("/")) path += "index.html";
  // resolve() collapses any ../ before the prefix test, so a traversal
  // attempt lands outside ROOT and is refused rather than served.
  const file = resolve(join(ROOT, path));
  if (file !== ROOT && !file.startsWith(ROOT + sep)) {
    res.writeHead(403).end("Forbidden");
    return;
  }
  try {
    const body = await readFile(file);
    res.writeHead(200, {
      "Content-Type": TYPES[extname(file)] ?? "application/octet-stream",
      "Cache-Control": extname(file) === ".html" ? "no-cache" : "public, max-age=3600",
      "X-Robots-Tag": "noindex, nofollow",
    }).end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" })
       .end("Not found. This preview publishes only the reviewed pages.\n");
  }
}).listen(PORT, () => console.log(`preview: ${ROOT} on :${PORT}`));
