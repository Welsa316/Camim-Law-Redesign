export const SITE_URL = "https://www.camimlaw.com";

/**
 * A demo build renders a subset of the site for a preview link: pages outside
 * the subset are not built into demo/ at all, and every link to one renders as
 * inert text so the preview cannot walk into a page nobody has reviewed. The
 * pages are noindex and scripts/build-demo.sh copies only these and their
 * assets. Set PUBLIC_DEMO=1.
 */
export const IS_DEMO = import.meta.env.PUBLIC_DEMO === "1" || import.meta.env.PUBLIC_DEMO === "true";

/** Phase 1: the landing page and the attorney page. "" is the home page. */
export const DEMO_ROUTES = ["", "juan-campos"];

/**
 * Whether `slug` may be linked. Always true outside a demo build, so callers
 * can wrap every internal link in it without a second branch.
 */
export const demoAllows = (slug = "") => !IS_DEMO || DEMO_ROUTES.includes(slug);
