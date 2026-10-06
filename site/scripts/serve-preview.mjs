/**
 * Serves the preview folder, and nothing else, plus the consultation form's
 * one endpoint.
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

/* The preview is static files, so the site's /api/contact (an Astro server
   route) does not exist here. This stands in for it and behaves as the real
   one does today, with no inbox configured: it checks the same fields, keeps
   the same rate limit, writes the request to the log, and answers "accepted,
   not delivered". Nothing is sent anywhere. */
const hits = new Map();
const clean = (v, max) => (typeof v === "string" ? v.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, max) : "");
function contact(req, res) {
  const json = (status, body) => res.writeHead(status, { "Content-Type": "application/json", "X-Robots-Tag": "noindex, nofollow" }).end(JSON.stringify(body));
  const ip = req.socket.remoteAddress ?? "unknown";
  const now = Date.now(), rec = hits.get(ip);
  if (!rec || now - rec.t > 10 * 60 * 1000) hits.set(ip, { n: 1, t: now });
  else if (++rec.n > 5) return json(429, { ok: false, error: "rate_limited" });
  let raw = "";
  req.on("data", (c) => { raw += c; if (raw.length > 8192) req.destroy(); });
  req.on("end", () => {
    let body;
    try { body = JSON.parse(raw); } catch { return json(400, { ok: false, error: "bad_request" }); }
    const lead = {
      firstName: clean(body.firstName, 80), lastName: clean(body.lastName, 80), phone: clean(body.phone, 40),
      topic: clean(body.topic, 60), preferredLanguage: clean(body.preferredLanguage, 8),
    };
    if (!lead.firstName || !lead.phone || !lead.topic) return json(422, { ok: false, error: "missing_fields" });
    console.warn("[contact] preview; sending service not set up; lead not delivered:", { ...lead, at: new Date().toISOString() });
    json(200, { ok: true, delivered: false });
  });
}
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
  const path = decodeURIComponent(url.pathname);
  if (path === "/api/contact") {
    if (req.method === "POST") return contact(req, res);
    res.writeHead(405, { Allow: "POST" }).end();
    return;
  }
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }

  // Both forms of a page address. The site is built with trailingSlash
  // "ignore", and a browser does not add the slash — /progress and /progress/
  // are the same page, and serving only the slashed one 404s the link a
  // person actually types.
  const candidates = extname(path)
    ? [path]
    : [join(path, "index.html"), path.replace(/\/$/, "") + ".html"];

  // resolve() collapses any ../ before the prefix test, so a traversal
  // attempt lands outside ROOT and is refused rather than served.
  const files = candidates.map((c) => resolve(join(ROOT, c)));
  if (files.some((f) => f !== ROOT && !f.startsWith(ROOT + sep))) {
    res.writeHead(403).end("Forbidden");
    return;
  }
  try {
    let body, file;
    for (const f of files) {
      try { body = await readFile(f); file = f; break; } catch { /* try the next form */ }
    }
    if (body === undefined) throw new Error("not found");
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
