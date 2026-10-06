// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";
import { SITE_URL } from "./src/lib/site.js";

export default defineConfig({
  site: SITE_URL,
  output: "static",
  // Every page is prerendered. The single exception is the contact endpoint,
  // which opts out with `export const prerender = false`. The adapter exists
  // only to serve that one route, so this stays a static site.
  adapter: node({ mode: "standalone" }),
  // "ignore", not "always": with "always" the adapter normalises /asilo to
  // /asilo/ before middleware runs, which turns every legacy Squarespace URL
  // into a two-hop redirect chain. Canonical form is still declared explicitly
  // by <link rel="canonical"> and by the sitemap, which is what search engines
  // actually read.
  trailingSlash: "ignore",
  build: { format: "directory" },
  vite: { plugins: [tailwindcss()] },
  integrations: [
    sitemap({
      // The sitemap must match the route table, not intent. Anything that is
      // noindex or a utility route is excluded here rather than being an
      // advertised soft-404; verify/search.py holds it to the route table.
      filter: (page) => !page.includes("/404"),
      i18n: {
        defaultLocale: "es",
        locales: { es: "es-US", en: "en-US" },
      },
    }),
  ],
  // The Squarespace URL surface, verified live: five sitemap URLs plus /cart
  // (returned 200) and /appointments (404, but linked twice from the old
  // Services page, so it may still hold external links).
  //
  // Declared unslashed only: the slashed duplicates collide with these routes
  // and Astro warns the collision becomes a hard error. With trailingSlash
  // "ignore" nothing is normalised first, so each is a single 301, not a chain.
  redirects: {
    "/home": "/",
    "/services": "/servicios/",
    "/about": "/juan-campos/",
    "/contact": "/consulta/",
    "/appointments": "/consulta/",
    "/cart": "/",
    "/checkout": "/",
  },
});
