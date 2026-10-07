/**
 * The share card each page shows when its link is pasted into WhatsApp,
 * Facebook, a text message or a search result. One per page and language,
 * built with the site by src/pages/og/[lang]/[card].jpg.ts, so a page that is
 * renamed can never keep a card with its old name.
 *
 * Every word on a card is the page's own sourced title and a dictionary label;
 * the phone and the domain are records. A photograph appears only where the
 * page already has one of its own: the city for the home page, the attorney's
 * headshot for his page, and the four practice areas that carry a photograph.
 */
import { t, type Lang } from "../i18n/ui";
import { ORG, ATTORNEY } from "./org";
import { SERVICES } from "./services";

export interface Card {
  /** "index" for a language's home page, otherwise the page slug. */
  key: string;
  lang: Lang;
  /** The small label over the title; empty where it would only repeat the wordmark. */
  eyebrow: string;
  title: string;
  /** A path under public/, and the CSS object-position to frame it by. */
  photo?: { src: string; focus: string };
}

export function ogCards(): Card[] {
  const cards: Card[] = [];
  for (const lang of ["es", "en"] as Lang[]) {
    const _ = t(lang);
    cards.push({
      key: "index", lang, eyebrow: `${ORG.address.value.locality}, ${ORG.address.value.region}`,
      // The home page's own title, a fragment of the firm's about and services pages.
      title: lang === "es" ? "Abogado de inmigración con sede en Orlando" : "Immigration lawyer based in Orlando",
      photo: { src: "/img/hero/orlando-night.jpg", focus: "50% 58%" },
    });
    cards.push({
      key: "juan-campos", lang, eyebrow: _("nav.attorney"),
      title: `${ATTORNEY.displayName.value}, ${ATTORNEY.credentialSuffix.value}`,
      // The headshot is a portrait: framed from the top so the head is never cut.
      photo: { src: ATTORNEY.headshot.value.src, focus: "50% 18%" },
    });
    cards.push({ key: "servicios", lang, eyebrow: "", title: _("nav.services") });
    cards.push({ key: "consulta", lang, eyebrow: _("nav.consultation"), title: _("contact.title") });
    cards.push({ key: "pagos", lang, eyebrow: _("nav.payment"), title: _("payment.title") });
    for (const s of SERVICES) {
      cards.push({
        key: s.slug, lang, eyebrow: _("nav.services"), title: s.name[lang],
        photo: s.image ? { src: s.image.src, focus: s.image.focus } : undefined,
      });
    }
  }
  return cards;
}

/** The card a page path maps to, or undefined for pages without one. */
export function cardFor(path: string): Card | undefined {
  const lang: Lang = path.startsWith("/en/") || path === "/en" ? "en" : "es";
  const slug = path.replace(/^\/en(?=\/|$)/, "").replace(/^\/|\/$/g, "") || "index";
  return ogCards().find((c) => c.lang === lang && c.key === slug);
}

export const cardUrl = (c: Card) => `/og/${c.lang}/${c.key}.jpg`;
