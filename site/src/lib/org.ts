/**
 * Single source of truth for every fact about the firm.
 *
 * Nothing factual may be typed into a template. It goes here, once, so
 * navigation, footer, schema, the sitemap and the copy cannot disagree.
 *
 * `verified: true`  = observed on a first-party or government record, source noted.
 * `verified: false` = drafted; MUST NOT render. See docs/CONTENT_REVIEW.md.
 */

export type Fact<T> = { value: T; verified: boolean; source?: string };
const v = <T,>(value: T, source: string): Fact<T> => ({ value, verified: true, source });
const pending = <T,>(value: T): Fact<T> => ({ value, verified: false });

export const ORG = {
  name: v("Campos Immigration Law", "camimlaw.com"),
  legalName: v(
    "Campos Immigration Law Firm LLC",
    "Florida Div. of Corporations, doc L23000343437, filed 2023-07-20, ACTIVE",
  ),
  /** Four name strings are in public circulation. One is canonical; the rest are aliases. */
  alternateNames: v(
    ["Campos Immigration Law Firm LLC", "Campos Immigration Law Firm | Orlando FL"],
    "Sunbiz; facebook.com/juanimmigrationlawyer",
  ),
  address: v(
    {
      street: "5401 S. Kirkman Rd., Suite 324",
      locality: "Orlando",
      region: "FL",
      postalCode: "32819",
      country: "US",
    },
    "camimlaw.com footer; Sunbiz principal address; Google Business Profile",
  ),
  phone: v("+14074189193", "camimlaw.com footer"),
  phoneDisplay: v("(407) 418-9193", "camimlaw.com footer"),
  email: v("juan@camimlaw.com", "camimlaw.com footer"),
  /**
   * Three different published answers exist: 9-7 on the website, 8-5 on Google,
   * "always open" on Facebook. Google is what prospects see, so Google wins
   * until the client resolves it. Flagged in CONTENT_REVIEW.md.
   */
  hours: v(
    { days: ["Mo", "Tu", "We", "Th", "Fr"], opens: "08:00", closes: "17:00" },
    "Google Business Profile (website says 09:00-19:00 — CONFLICT, see CONTENT_REVIEW.md)",
  ),
  paymentUrl: v(
    "https://secure.lawpay.com/pages/camposimmigrationlawfirmllc/operating",
    "camimlaw.com header link, every page",
  ),
  googleRating: v(
    { value: 5.0, count: 59, category: "Immigration attorney" },
    "Google Business Profile, read 2026-09-09. Displayed as plain HTML linking to Google; never as AggregateRating schema on our own domain.",
  ),
  social: v(
    {
      instagram: "https://www.instagram.com/juancamposlaw/",
      facebook: "https://www.facebook.com/juanimmigrationlawyer/",
      tiktok: "https://www.tiktok.com/@elabogadohispano",
      youtube: "https://www.youtube.com/@camposmunoslaw6542",
    },
    "camimlaw.com; live profile reads 2026-09-09",
  ),
  practiceScope: v(
    "United States immigration law only",
    "camimlaw.com: 'practican exclusivamente la ley de inmigración en los Estados Unidos'",
  ),

  /* ---- pending ---- */
  mapsUrl: pending<string | null>(null),
  whatsapp: pending<string | null>(null),
  consultation: pending<{ price: string; minutes: number; creditedBack: boolean } | null>(null),
  /**
   * 5401 S. Kirkman Rd is the Regions Bank Building, which hosts Execu-Suites
   * executive/virtual offices. Whether Suite 324 is a full-time staffed office
   * decides (a) whether the site invites people to visit, and (b) whether the
   * Florida Bar's bona-fide-office test is met for Rule 4-7.12(a)(2).
   * Until confirmed the site states the city and does not invite walk-ins.
   */
  officeIsStaffed: pending<boolean>(false),
} as const;

export const ATTORNEY = {
  displayName: v("Juan Campos", "camimlaw.com email; Telemundo lower third 'Juan Campos Esq.'"),
  fullLegalName: v(
    "Juan Manuel Campos Gutierrez",
    "Avvo: 'Juan Manuel Campos Gutierrez / also known as Juan Campos-Gutierrez'; Sunbiz manager record",
  ),
  credentialSuffix: v("Esq.", "Telemundo lower third"),

  /**
   * THE decisive compliance fact of this project.
   *
   * He is admitted in LOUISIANA, not Florida. Confirmed by direct query of The
   * Florida Bar's member-search endpoint (no record) and the State Bar of
   * Michigan directory (no record), and positively by Avvo and his own bio.
   *
   * This is lawful: immigration is federal practice (8 C.F.R. 1001.1(f);
   * Sperry v. Florida, 373 U.S. 379 (1963)), so a Louisiana-admitted attorney
   * may run an Orlando immigration practice. But the Florida rules require the
   * jurisdictional limitation to be stated (Rule 4-7.21(d); Rule 4-7.11 cmt),
   * and the current website says nothing at all — while his own Instagram and
   * Facebook already say "Licenciado en Louisiana".
   *
   * Handled well this is a trust asset, because it is also the reason he can
   * serve clients in all 50 states.
   */
  admissions: v(
    ["Louisiana Supreme Court (2020)"],
    "Avvo Licenses panel: 'State: Louisiana / Acquired: 2020 / Eligible to Practice Law'; camulaw.com bio; facebook.com/juanimmigrationlawyer: 'Licenciado en Louisiana'",
  ),
  notAdmittedIn: v(
    ["Florida", "Michigan"],
    "The Florida Bar member-search endpoint returned no record; State Bar of Michigan directory returned no record",
  ),
  education: v(
    [
      {
        degree: { es: "Maestría en Derecho Comparado (LL.M.)", en: "LL.M., Comparative Law" },
        school: "University of Florida Levin College of Law",
        year: 2019,
      },
      {
        degree: { es: "Abogado", en: "Law degree" },
        school: "Universidad Yacambú, Venezuela",
        year: 2006,
      },
    ],
    "Avvo Education panel",
  ),
  memberships: v(
    ["American Immigration Lawyers Association (AILA)"],
    "camulaw.com bio; AILA Lawyer Search listing",
  ),
  languages: v(["Spanish", "English"], "Avvo Languages panel; all public content is in Spanish"),
  birthplace: v("Coro, Venezuela", "camulaw.com bio: 'Nacido en Coro, Venezuela'"),
  /** Bilingual: an English-only string here leaks straight onto the Spanish page. */
  priorRoles: v(
    [
      {
        role: {
          es: "Abogado de planta, Caridades Católicas de la Arquidiócesis de Nueva Orleans",
          en: "Staff Attorney, Catholic Charities Archdiocese of New Orleans",
        },
        years: { es: "2020-2021", en: "2020-2021" },
      },
      {
        role: {
          es: "Profesor de derecho y abogado penalista, Venezuela",
          en: "Law professor and criminal defence attorney, Venezuela",
        },
        years: { es: "antes de 2019", en: "before 2019" },
      },
    ],
    "Avvo Work Experience; camulaw.com bio",
  ),
  /**
   * The seated environmental portrait, from the firm's own Google Business
   * Profile for the Orlando entity, fetched at full resolution. Professional,
   * symmetric, and in a real room — it replaces the white-ground studio
   * cut-out as the site's primary image.
   * [CLIENT VERIFICATION REQUIRED: permission and the photographer's credit.]
   */
  hero: v(
    { src: "/img/juan-campos-hero.jpg", width: 1627, height: 2000 },
    "Google Business Profile, Campos Immigration Law Firm LLC",
  ),
  seated: v(
    { src: "/img/juan-campos-seated.jpg", width: 1200, height: 1500 },
    "Google Business Profile, Campos Immigration Law Firm LLC",
  ),
  portrait: v(
    { src: "/img/juan-campos-portrait.jpg", width: 1100, height: 1600 },
    "camimlaw.com (LCO07573-Edit.jpg)",
  ),
  /**
   * A frame from one of his own Spanish explainer videos, cropped to remove
   * the other firm's watermark. Real, and the only environmental image of him
   * available.
   *
   * It is captioned as him at work, never as the Orlando office, because the
   * room shown has not been confirmed as the Kirkman Road office.
   * [CLIENT VERIFICATION REQUIRED: which office this is, and permission.]
   */
  atWork: v(
    { src: "/img/juan-campos-at-work.jpg", width: 1200, height: 882 },
    "Frame from the firm's own explainer video; watermark cropped out.",
  ),

  /* ---- pending ---- */
  barNumber: pending<string | null>(null),      // LSBA roll no. — badge filename suggests 113502, not a record
  yearsPractising: pending<number | null>(null), // count only years as a licensed lawyer (Rule 4-7.13 cmt)
  federalAdmissions: pending<string[]>([]),
} as const;

/**
 * Television appearances.
 *
 * The outlet, programme and on-screen topic were read directly off the frames,
 * so they render. The DATE of each appearance is not confirmed, so no date is
 * shown. Presented factually and never as an endorsement (Rule 4-7.14(a)(3)).
 *
 * [CLIENT VERIFICATION REQUIRED: dates, and permission to republish.]
 */
export const MEDIA = [
  {
    id: "telemundo",
    outlet: "Telemundo",
    station: "Noticias Jacksonville",
    programme: "Hoy en Inmigración",
    chyron: {
      es: "El futuro de los trámites tras nuevas leyes",
      en: "How new laws affect pending applications",
    },
    still: "/img/media-telemundo.jpg",
    width: 1280,
    height: 720,
    verified: true,
  },
  {
    id: "tvv",
    outlet: "TVV",
    station: null,
    programme: "La Última",
    chyron: {
      es: "Entrevista con Carla Angola",
      en: "Interview with Carla Angola",
    },
    still: "/img/media-tvv.jpg",
    width: 638,
    height: 360,
    verified: true,
  },
  // Univision omitted on purpose: the still is a photograph of a studio monitor
  // at 960px and carries another law firm's sponsor bug in frame.
  // See docs/ASSET_PLAN.md section 1.
] as const;

export const COURT = {
  name: "Orlando Immigration Court",
  address: "3535 Lawton Road, Suite 200, Orlando, FL 32803",
  source: "EOIR, U.S. Department of Justice",
} as const;

export const show = <T,>(f: Fact<T>): T | null => (f.verified ? f.value : null);
