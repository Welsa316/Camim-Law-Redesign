import { SITE_URL } from "./site.js";
import { ORG, ATTORNEY, show } from "./org.js";
import type { Lang } from "../i18n/ui.js";

export interface Alternates {
  es: string;
  en: string;
}

/** Absolute URL for a site-relative path. */
export const abs = (path: string): string =>
  new URL(path.startsWith("/") ? path : `/${path}`, SITE_URL).href;

/**
 * hreflang. Google ignores the whole set if two pages do not point at each
 * other, so every page emits the full triple: itself, its twin, and x-default.
 * Plain `es` and `en`, not `es-US`. x-default points at Spanish.
 */
export function hreflang(alt: Alternates) {
  return [
    { hreflang: "es", href: abs(alt.es) },
    { hreflang: "en", href: abs(alt.en) },
    { hreflang: "x-default", href: abs(alt.es) },
  ];
}

const addr = ORG.address.value;

/** The firm node. LegalService, not the deprecated Attorney type. */
export function orgSchema() {
  const rating = show(ORG.googleRating);
  return {
    "@type": "LegalService",
    "@id": `${SITE_URL}/#firm`,
    name: ORG.name.value,
    alternateName: [...ORG.alternateNames.value],
    url: SITE_URL,
    telephone: ORG.phone.value,
    email: ORG.email.value,
    address: {
      "@type": "PostalAddress",
      streetAddress: addr.street,
      addressLocality: addr.locality,
      addressRegion: addr.region,
      postalCode: addr.postalCode,
      addressCountry: addr.country,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ORG.hours.value.days.map(
          (d) =>
            ({ Mo: "Monday", Tu: "Tuesday", We: "Wednesday", Th: "Thursday", Fr: "Friday" })[d],
        ),
        opens: ORG.hours.value.opens,
        closes: ORG.hours.value.closes,
      },
    ],
    areaServed: [
      { "@type": "City", name: "Orlando" },
      { "@type": "City", name: "Kissimmee" },
      { "@type": "State", name: "Florida" },
      { "@type": "Country", name: "United States" },
    ],
    availableLanguage: [
      { "@type": "Language", name: "Spanish", alternateName: "es" },
      { "@type": "Language", name: "English", alternateName: "en" },
    ],
    founder: { "@id": `${SITE_URL}/#juan-campos` },
    sameAs: Object.values(ORG.social.value),
    // Deliberately absent: aggregateRating and review. Google's review-snippet
    // guidance makes self-serving reviews ineligible and it is a documented
    // manual-action risk. The rating is shown as plain HTML linking to Google.
    ...(rating ? {} : {}),
  };
}

/** The attorney node. */
export function attorneySchema(lang: Lang) {
  const admissions = show(ATTORNEY.admissions) ?? [];
  const education = show(ATTORNEY.education) ?? [];
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/#juan-campos`,
    name: ATTORNEY.displayName.value,
    alternateName: ATTORNEY.fullLegalName.value,
    jobTitle: lang === "es" ? "Abogado de inmigración" : "Immigration attorney",
    worksFor: { "@id": `${SITE_URL}/#firm` },
    knowsLanguage: ["es", "en"],
    alumniOf: education.map((e) => ({ "@type": "EducationalOrganization", name: e.school })),
    hasCredential: admissions.map((a) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: a,
    })),
    url: abs(lang === "es" ? "/juan-campos/" : "/en/juan-campos/"),
    sameAs: Object.values(ORG.social.value),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.url),
    })),
  };
}

export function serviceSchema(name: string, url: string, lang: Lang) {
  return {
    "@type": "Service",
    name,
    serviceType: lang === "es" ? "Derecho de inmigración" : "Immigration law",
    provider: { "@id": `${SITE_URL}/#firm` },
    url: abs(url),
    areaServed: [
      { "@type": "City", name: "Orlando" },
      { "@type": "State", name: "Florida" },
      { "@type": "Country", name: "United States" },
    ],
    availableLanguage: ["es", "en"],
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  // FAQ rich results were removed from Google Search in May 2026. This stays
  // because it remains a clean machine-readable Q&A statement, which is the
  // shape answer engines extract. It is comprehension infrastructure, not a
  // SERP feature — see docs/SEO_AEO_PLAN.md section 6.
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function graph(nodes: object[]) {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes });
}
