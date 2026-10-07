import type { APIRoute } from "astro";
import satori from "satori";
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ogCards, type Card } from "../../../lib/og";
import { ORG } from "../../../lib/org";
import { SITE_URL } from "../../../lib/site.js";

/* Each page's share card, rendered at build time: 1200x630, the footer's
   navy, the wordmark, the page's own label and title in the site's own faces,
   and the phone and the domain. Where the page has a photograph of its own,
   it sits in a panel on the right, cropped around its recorded focal point
   (a portrait from the top, so a head is never cut). Satori lays the card out
   with the real fonts, sharp turns it into a JPEG. Satori reads WOFF, not
   WOFF2, so the faces come from @fontsource rather than public/fonts. */
export const prerender = true;

export function getStaticPaths() {
  return ogCards().map((card) => ({ params: { lang: card.lang, card: card.key }, props: { card } }));
}

const W = 1200, H = 630, PAD = 64, PANEL_W = 400, GAP = 56;
const NAVY_DEEP = "#0b1f33", PAPER = "#fcfcfa", BRASS = "#c9a063", MUTED = "#b6c3d1", SOFT = "#c9d3de";

const font = (pkg: string, file: string) => readFile(join(process.cwd(), "node_modules/@fontsource", pkg, "files", file));
let fonts: Promise<{ name: string; data: Buffer; weight: 400 | 500 | 600; style: "normal" }[]> | null = null;
const loadFonts = () => (fonts ??= Promise.all([
  font("source-serif-4", "source-serif-4-latin-400-normal.woff").then((data) => ({ name: "Serif", data, weight: 400 as const, style: "normal" as const })),
  font("figtree", "figtree-latin-500-normal.woff").then((data) => ({ name: "Sans", data, weight: 500 as const, style: "normal" as const })),
  font("figtree", "figtree-latin-600-normal.woff").then((data) => ({ name: "Sans", data, weight: 600 as const, style: "normal" as const })),
]));

/** Crop the photograph to the panel around its focal point ("50% 18%"). */
async function panel(src: string, focus: string): Promise<string> {
  const img = sharp(await readFile(join(process.cwd(), "public", src)));
  const { width = 0, height = 0 } = await img.metadata();
  const ph = H - PAD * 2, aspect = PANEL_W / ph;
  const [fx, fy] = focus.split(/\s+/).map((v) => parseFloat(v) / 100);
  let cw = width, chh = height;
  if (width / height > aspect) cw = Math.round(height * aspect); else chh = Math.round(width / aspect);
  const left = Math.round((width - cw) * (Number.isFinite(fx) ? fx : 0.5));
  const top = Math.round((height - chh) * (Number.isFinite(fy) ? fy : 0.5));
  const out = await img.extract({ left, top, width: cw, height: chh }).resize(PANEL_W * 2, ph * 2).jpeg({ quality: 82 }).toBuffer();
  return `data:image/jpeg;base64,${out.toString("base64")}`;
}

const el = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}) =>
  ({ type, props: { style, children, ...extra } });

async function render(card: Card): Promise<Buffer> {
  const photo = card.photo ? await panel(card.photo.src, card.photo.focus) : null;
  const textW = photo ? W - PAD * 2 - PANEL_W - GAP : W - PAD * 2;
  const n = card.title.length;
  const size = photo ? (n <= 16 ? 84 : n <= 28 ? 68 : 56) : (n <= 16 ? 104 : n <= 28 ? 84 : 68);
  const domain = SITE_URL.replace(/^https?:\/\/(www\.)?/, "");

  const text = el("div", { display: "flex", flexDirection: "column", justifyContent: "space-between", width: textW, height: H - PAD * 2 }, [
    el("div", { display: "flex", flexDirection: "column" }, [
      el("div", { fontFamily: "Serif", fontSize: 40, color: PAPER, lineHeight: 1 }, "Campos"),
      el("div", { fontFamily: "Sans", fontWeight: 600, fontSize: 13, letterSpacing: 4, color: MUTED, marginTop: 8 }, "IMMIGRATION LAW"),
    ]),
    el("div", { display: "flex", flexDirection: "column" }, [
      ...(card.eyebrow
        ? [el("div", { fontFamily: "Sans", fontWeight: 600, fontSize: 18, letterSpacing: 3, color: BRASS, marginBottom: 18 }, card.eyebrow.toLocaleUpperCase(card.lang))]
        : []),
      el("div", { fontFamily: "Serif", fontSize: size, lineHeight: 1.05, letterSpacing: -size * 0.02, color: PAPER }, card.title),
    ]),
    el("div", { display: "flex", flexDirection: "column" }, [
      el("div", { height: 1, width: "100%", backgroundColor: "rgba(252,252,250,0.22)", marginBottom: 20 }),
      el("div", { fontFamily: "Sans", fontWeight: 500, fontSize: 22, color: SOFT }, `${ORG.phoneDisplay.value}  ·  ${domain}`),
    ]),
  ]);

  const root = el("div", { display: "flex", width: W, height: H, padding: PAD, backgroundColor: NAVY_DEEP }, [
    text,
    ...(photo
      ? [el("img", { width: PANEL_W, height: H - PAD * 2, marginLeft: GAP, borderRadius: 24, objectFit: "cover" }, undefined, { src: photo, width: PANEL_W, height: H - PAD * 2 })]
      : []),
  ]);

  const svg = await satori(root as never, { width: W, height: H, fonts: await loadFonts() });
  return sharp(Buffer.from(svg)).jpeg({ quality: 86, mozjpeg: true }).toBuffer();
}

export const GET: APIRoute = async ({ props }) => {
  const body = await render((props as { card: Card }).card);
  return new Response(new Uint8Array(body), { headers: { "Content-Type": "image/jpeg" } });
};
