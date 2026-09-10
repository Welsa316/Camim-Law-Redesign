export const SITE_URL = "https://www.camimlaw.com";

/**
 * A demo build renders the landing page for a preview link and nothing else:
 * every internal link is inert, the page is noindex, and scripts/build-demo.sh
 * copies only the home pages and their assets into demo/. Set PUBLIC_DEMO=1.
 */
export const IS_DEMO = import.meta.env.PUBLIC_DEMO === "1" || import.meta.env.PUBLIC_DEMO === "true";
