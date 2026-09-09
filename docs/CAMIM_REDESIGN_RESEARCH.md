# Campos Immigration Law — Redesign Research Dossier

Working document for the complete redesign of https://www.camimlaw.com/ (Campos Immigration Law, Orlando, FL; attorney Juan Campos, Esq.).
Compiled September 2026. Everything factual carries a source; anything not verifiable from a first-party page is marked **[CLIENT VERIFICATION REQUIRED]**.

Sections:

0. Method and source legend
1. Repository, stack and portfolio context
2. UI baseline review (universal / contextual / obsolete)
3. Forensic audit of the existing site
4. Firm facts (verified vs. unverified)
5. Orlando / Central Florida competitors
6. Best-in-class immigration websites (national)
7. Outside-legal references
8. What "premium" means for this firm
9. Understanding the visitor
10. Florida Bar advertising rules — needs-attorney-verification checklist
11. Competitive matrix, table stakes, gaps, differentiation
12. Art directions (three), scoring, decision
13. Anti-cliché commitments
14. Brand palette continuity decision
15. Review of the Webflow template supplied as a reference
16. Open questions for the client

---

## 0. Method and source legend

| Tag | Meaning |
|---|---|
| **[VERIFIED]** | Observed directly on a first-party page (the live site, the Florida Bar, Sunbiz, the firm's own social profiles) and the URL is recorded. |
| **[SIBLING REPO]** | Taken from the sister project `Campos-Munos-Redesign` (Campos Muños Law, LLC, New Orleans) which the same attorney co-founded and whose copy was supplied and reviewed by the client in July 2026. Reliable, but written for the New Orleans firm, so every Orlando use must be re-confirmed. |
| **[INFERRED]** | A reasonable reading of evidence, not a fact. |
| **[CLIENT VERIFICATION REQUIRED]** | Must be confirmed by Juan Campos before it appears on the site. |

Tools used: WebFetch of every page in the Squarespace sitemap, headless Chrome screenshots at 1440 / 1024 / 390 px, the raw HTML and the Squarespace `site.css` for palette and font variables, six parallel research streams (competitors, best-in-class, outside-legal references, Florida Bar rules, firm facts, SEO/AEO SERPs), and a read of the sibling repository including its client corrections plan.

---

## 1. Repository, stack and portfolio context

### 1.1 What the repository contained

Nothing. `Camim-Law-Redesign` has a `.git` directory with zero commits, a GitHub remote (`Welsa316/Camim-Law-Redesign`) and no files. There is no `package.json`, no framework, no baseline document and no assets to inherit. Every architectural decision therefore has to be made here and recorded.

### 1.2 The portfolio convention

The sister project at `~/Downloads/Campos-Munos-Redesign` (Campos Muños Law, camulaw.com) is the closest precedent: Vite 7 + Vue 3.5 + Tailwind CSS 4 + vue-i18n + vue-router, an Express/Postgres lead-intake server, deployed on Railway, with a hand-written post-build prerender script. Its own `DEFERRED.md` records the cost of that choice: "the shipped HTML is an empty `#app` shell… non-Google/social crawlers see nothing… the #1 SEO issue", and a `vite-ssg` attempt was rolled back because of `document is not defined` and dynamic-route expansion problems.

### 1.3 Stack decision for this site

**Astro 5 (static output, one server endpoint for the contact form) + Tailwind CSS 4 + GSAP (ScrollTrigger and SplitText, both free) + vanilla TypeScript for interactive pieces.** No Vue runtime is shipped unless a component genuinely needs it (Astro can host Vue islands later without a migration).

Why, against the "don't migrate stacks" instruction: there is no stack to migrate from, and the portfolio's own retrospective identifies the SPA-plus-prerender pattern as its biggest SEO liability. The brief's hard requirements — every page indexable as real HTML, per-page titles, descriptions, canonical and hreflang, JSON-LD, an EN/ES URL architecture, 301s from Squarespace URLs, Core Web Vitals, zero-JS pages by default — are Astro's defaults rather than something to bolt on. Astro is Vite-based, so the tooling, Tailwind 4 config and skills used elsewhere in the portfolio still apply.

What this rules out on purpose: a CMS, a database, a state-management library, a smooth-scroll library (Lenis) and any client-side router. Content lives in typed content collections (practice areas, FAQs, attorney, organization data) so navigation, footer, sitemap, breadcrumbs, related services and schema are generated from a single model and cannot drift.

Deployment target assumed: Railway with the Node adapter in standalone mode (the portfolio's convention), serving the prerendered pages plus `/api/contact`, which relays the form through Resend. Any static host works for everything except the form endpoint. **[CLIENT VERIFICATION REQUIRED: hosting and the inbox that receives leads.]**

### 1.4 Bilingual architecture (decision)

Spanish at the root, English under `/en/`, both fully translated, `hreflang` pairs on every page, `x-default` pointing at the Spanish page. Rationale: the current site already publishes Spanish at the root (`<html lang="es-VE">`, `/asilo`), the attorney's entire public content output (Instagram reels, TV interviews) is in Spanish, and the SERP research (section 5 and the SEO plan) shows Spanish local queries are where a boutique firm can win outright, while English pages must still exist for the larger but far more contested English queries. The choice can be flipped with one config change and a redirect map if the client prefers English at the root.

---

## 2. UI baseline review

The baseline document maintained across this portfolio is `~/.claude/rules/ui-quality-bar.md` ("UI/Frontend quality bar — raise the default"), with `~/.claude/rules/frontend-design-pipeline.md` as its process companion. No project-local copy existed in this repository. The sister project also carries `.claude/design-guardrails.md`, which is project-specific but records two immigration-law lessons worth keeping: service videos are body content, never header content; and every UI change must hold in both locales.

### A. Universal principles (apply as written)

- Don't ship the AI-slop tells: centered hero + three cards, gradient blobs, fake device chrome, performative copy, emoji icons, two-tone headlines.
- Design every state (hover, focus, sticky, loading, empty, error, disabled); a control must not change shape when the header goes sticky.
- Give the page depth and rhythm with section-level tonal shifts rather than an unbroken white scroll.
- Typography is a system: one family set, a real scale, tight display tracking, tabular numerals where figures align.
- Mobile is its own composition and desktop is not an inflated phone. Verify the interaction model at each breakpoint, not just column counts.
- Real content only: no lorem, no placeholder emails, no dead links, no fabricated testimonials or metrics. Flag placeholders instead of shipping them.
- Photographs of real people: never tint faces, don't cut people out unless the matte is flawless, no reveal that wipes across a face, never cover a name with imagery.
- Writing about real people: don't reduce them to a role label, never invent biography, use the name they use publicly.
- Motion traps: pre-hide before paint, bound every async wait, `fromTo` not `from`, split text after fonts load, reduced-motion bails out before anything is hidden, tear everything down on navigation.
- Prove it, don't claim it: measure contrast, overflow and rects in the DOM; check both ends of every animation; check the console.
- SEO: runtime meta is invisible to crawlers without prerendering; `og:image` must exist and be served as an image; every route needs its own canonical; the sitemap must match the route table.
- Dark-surface craft: elevation through stepped surfaces and hairlines, brand marks go monochrome on dark grounds, semantic tokens must not alias aesthetic tokens.
- Copy must be checked against what can be enforced. Here the "enforcement code" is the Florida Bar advertising rules and the firm's verifiable facts (section 10).

### B. Contextual principles (keep the intent, adapt the rule)

- "The stack sets the ceiling: GSAP + Lenis." GSAP yes, for masked line reveals and a small number of scroll-linked moves. Lenis no: inertia scroll hijacks native scrolling, which the brief forbids and which stressed visitors on old phones will fight. Native scroll with well-tuned reveals is the right ceiling for a legal site.
- "Question the hero-plus-sections reflex; consider full-viewport frames." Right for the About/attorney story; wrong for service pages, where a visitor scanning for their exact matter needs a document, not an experience.
- "Immersive means the content owns the screen; collapse chrome to the logo." Adapted: the hero may be quiet, but the phone number, language switch and consultation entry must never collapse away on mobile.
- "Serif editorial display faces reached for to fake sophistication are a tell." Contextual. A serif is legitimate for a law practice when it is chosen for the identity and used as a system; the tell is defaulting to Playfair/DM Serif with italics. The sister site uses Playfair + Cormorant + Inter, which is exactly the default this rule warns about; this project must not repeat it.
- "Theme parity on every surface." This site ships one light theme with deliberate dark bands, so the rule reduces to: the dark bands must be built from tokens, not hardcoded colours, so a future theme is a token change.
- Disclosure mechanics (fragment ids inside hidden content, hide summary only in `[open]`) apply directly to the FAQ accordions and must be honoured.
- The Vue scoped-CSS gotchas in the pipeline file do not apply to Astro components; the equivalent trap is Astro's scoped styles not reaching slotted children (`:global()` needed deliberately).

### C. Potentially obsolete or needing revision

- The pipeline file is titled "(Vite + Vue)" and assumes a Vue SPA. It should be generalised to "Vite-based front ends (Vue SPA or Astro)" and gain a line about choosing static output when SEO is a requirement. Proposed in the baseline update.
- "Editing a large single-file stylesheet (`SVL_STYLES` template literal)" describes one project's pattern; it should be kept but labelled as project-pattern-specific.
- The rule set has nothing on regulated-industry copy, on flattened hero images, on hosted-builder `robots.txt` defaults, or on transferring client-approved corrections between sibling projects. These are the new universal lessons from this project and are added to the baseline (see `docs/UI_BASELINE_UPDATES.md` for the exact diff applied).

---

## 3. Forensic audit of the existing site

### 3.1 Inventory

| Item | Finding | Source |
|---|---|---|
| Platform | Squarespace 7.1 (template id `5c5a519771c10ba3470d8101`), Typekit-hosted Inter Tight | `home.html` |
| Pages in sitemap | `/home`, `/services`, `/about`, `/contact`, `/asilo` (5 URLs) | `sitemap.xml` |
| Hidden/other routes | `/appointments` (linked twice from Services as "Sign up" / "Book consultation") returns **404**; `/cart` exists (Squarespace commerce enabled; a cart icon with "0" shows in the header) | curl, Contact page extract |
| `<html lang>` | `es-VE` (Venezuelan Spanish) | `home.html` |
| Title | "Campos Immigration Law" on every page; inner pages "Services — Campos Immigration Law" etc. | HTML |
| Meta description | Empty string on the homepage; none on inner pages | HTML |
| Open Graph | `og:title`, `og:site_name`, `og:url`, `og:type` only. **No `og:image`.** `twitter:card` = summary | HTML |
| Canonical | Present (`https://www.camimlaw.com`) | HTML |
| hreflang | None | HTML |
| Structured data | A single `WebSite` object. No LegalService, Attorney, LocalBusiness, FAQPage | HTML |
| robots.txt | Squarespace default: blocks AI2Bot, anthropic-ai, ClaudeBot, GPTBot, CCBot, Google-Extended, PerplexityBot-class crawlers | `robots.txt` |
| Analytics | None detected beyond Squarespace | HTML |
| Fonts | Headings `Inter Tight` 500; body `Georgia, serif` 400; nav uses body font | `site.css` variables |
| Palette | Accent `hsl(204.39 79.49% 38.24%)` ≈ `#1474AE` (buttons, links, band); dark accent `hsl(209 52.7% 71%)` ≈ `#8FB4DA`; light accent `hsl(240 10.5% 92.5%)` ≈ `#E9E9EE` (the grey page ground); black and white | `site.css` |
| Header | Text wordmark "Campos Immigration Law", nav Services / About / Contact, pill button "Hacer un pago" → LawPay | screenshots |
| Hero | One flattened JPEG (`Banner-web2.jpg`, 2000 × 760): flat blue ground, a field of pale US-flag stars, a cut-out of Juan in a light grey linen jacket and plaid bow tie, the words "CAMPOS IMMIGRATION LAW FIRM" in a light geometric sans, and a thin red rule | `img/banner.jpg` |
| Homepage sections | Hero image → two loose pill buttons ("Llamanos" `tel:14074189193`, "Hacer un pago") → "¿Quiénes somos?" → "¿Por qué elegirnos?" → studio portrait of Juan (`LCO07573-Edit.jpg`, 2500 × 3636) → blue band "¿Qué hacemos?" → Instagram logo + "@juancamposlaw" (the handle wraps as "@juancamposla / w" at 1440) → a 10-image grid of Instagram reel stills → "Áreas en las que prestamos servicios" (one paragraph: Orlando office, clients in all 50 states and abroad) → Ubicación / Horario / Contactanos footer | screenshots + extract |
| Services page | ~1,300 px of blank white above the fold, then "Services" and three cards: "Asilo" (stock pen-on-paper photo, links to `/asilo`), "Hire an Experienced Immigration Lawyer" (Squarespace demo image "Sleek Objects 2": spheres on plinths), "Get the Best Immigration Solutions" (broken image, alt "Placeholder"). Two "Sign up" buttons → 404. English template testimonial: "As an experienced immigration lawyer based in Orlando… Trust Campos Immigration Law to provide you with expert guidance…" | screenshots + extract |
| About page | H1 "Soy un abogado de inmigración con sede en Orlando", two paragraphs of generic first-person copy, and a photograph of a **different man** (young, black suit, blue tie, seated in an office chair, `1703027401879…image-asset.jpeg`). It is not Juan Campos and appears to be stock or template imagery. Very large empty bands above and below the content | `img/about.jpeg`, screenshots |
| Contact page | Live Squarespace placeholder copy: "Let people know what to reach out about and what to expect after contacting you. Don't forget to choose a storage option for submissions." plus `email@example.com`, `(555) 555-5555`, `123 Demo Street, New York, NY 12345`, then a real form (Nombre, Apellido, Email, Message; "Send") and the real footer | screenshots + extract |
| Asilo page | The only substantive content page: ~900 words of Spanish on asylum vs. refugee status, affirmative vs. defensive process, four FAQs, a closing CTA paragraph. Three stock photos (pen on paper, a shelf of *Michigan State Bar Journal* volumes, a fountain pen on a notebook). Dark grey FAQ band | screenshots + extract |
| Contact facts | 5401 S. Kirkman Rd. Suite 324, Orlando, FL 32819 · +1 (407) 418-9193 · juan@camimlaw.com · Lunes–Viernes 9:00 am – 7:00 pm · Instagram @juancamposlaw · LawPay operating-account page | every page footer |
| Forms | One Squarespace form on Contact (no confirmation copy, no privacy or no-attorney-client-relationship notice) | Contact page |
| Trust signals | The attorney's portrait and the Instagram grid; nothing else (no bar admissions, no AILA, no media, no reviews) | all pages |
| Language | Mixed: nav and Services page in English, everything else in Spanish; no language switch | all pages |

### 3.2 Visual and responsive observations

- **1440:** The banner reads as a campaign flyer rather than a law practice: flag stars, a cut-out figure with a visible soft matte, display type baked into the JPEG. Sections alternate grey/white/blue without rhythm; headings are centred in one column while body copy sits in another, so nothing aligns. The Instagram handle breaks mid-word.
- **1024:** Same composition, tighter; the flattened banner starts cropping the wordmark.
- **390:** The banner crops to the middle third, so the visible hero is a blue rectangle with the fragments "CA / MMIGR / LA" and half of Juan's face. Two stacked pill buttons follow, then the reel grid. Nothing tells a phone visitor what the firm does before the fold. Services and About collapse to long single columns with several screens of empty space.
- **Type:** Inter Tight headings with Georgia body is an accidental pairing; body measure runs to ~85 characters at 1440 in the Asilo page.
- **Colour:** One saturated blue on grey/white. Competent but anonymous; indistinguishable from a bank template.

### 3.3 Preserve

- The firm name and domain (`camimlaw.com`), the Orlando address, phone, email, hours and the LawPay link (exact URL preserved).
- The Instagram identity `@juancamposlaw` and the fact that the attorney is a prolific Spanish-language educator (the reel stills prove it).
- The studio portrait `LCO07573-Edit.jpg` (2500 × 3636, clean white ground, sharp, well lit) and the banner cut-out source: real, high-quality photography of the actual attorney, with a distinctive personal signature (bow tie, black-rimmed glasses, light linen jacket).
- The Spanish asylum content as a *source* for a rewritten asylum page; its FAQ questions are the right questions.
- The URL `/asilo` and the four other indexed URLs, via 301 redirects.
- Spanish-first language posture.

### 3.4 Improve

- The hero: keep the person, lose the flag, the cut-out and the baked-in type. Live text over an art-directed portrait.
- The "who we are / why choose us / what we do" copy: the sentiments (you will understand your case; treated like family; always reachable) are the firm's real voice and survive into the content strategy, rewritten.
- The Instagram presence: from a logo and a broken handle to a curated, captioned selection that explains *what* he teaches.
- The asylum page: keep the structure (definition → two processes → FAQ → next step), correct the copy the client already trimmed on the sister site (see 3.7), add "who this is for" and "what to bring".
- The contact section: from a bare form to a consultation page that sets expectations (what happens after you write, hours, languages, how to pay).

### 3.5 Replace

- Every stock image (pen, books, spheres, the seated stranger on About).
- Template placeholder copy on Contact and Services.
- The "Sign up → 404" funnel.
- The Squarespace cart.
- The blue-pill button language and the grey page ground.
- The mixed-language navigation.
- `WebSite`-only schema, the empty description, the missing `og:image`.

### 3.6 Missing (what a serious immigration practice site needs and this one lacks)

- Any statement of who the attorney is: admission, education, AILA, languages, background as an immigrant, TV appearances.
- A practice-area architecture: one page for one service is not a service offering.
- A language switch and English parity.
- A consultation flow: how to book, what it costs, what to bring, what happens next. **[CLIENT VERIFICATION REQUIRED: consultation fee and booking method.]**
- FAQs beyond asylum; a resources/updates area for the topics the reels already cover.
- Trust: bar admissions with jurisdiction disclosure, AILA membership, Google reviews (if compliant), media log.
- Local signals: map, directions, parking, service area, LocalBusiness/LegalService schema.
- Accessibility basics: skip link, focus styles, alt text (most images have none), form labels with error messages.
- A 404 page, a privacy page, a disclaimer page.
- Ways to reach the office beyond phone: WhatsApp/SMS **[CLIENT VERIFICATION REQUIRED]**.

### 3.7 Lessons imported from the sister site's client corrections (July 2026)

The client reviewed the New Orleans site line by line. These decisions are recorded in `Campos-Munos-Redesign/CORRECTIONS_PLAN.md` and transfer directly because the asylum copy on camimlaw.com is the same source text:

- Delete "quickly and correctly" ("rápida y correctamente") from the asylum closing paragraph.
- Trim the "may apply for permanent residence one year after" sentence and the "requested at a port of entry" clauses.
- No "Only five-star reviews" style headings; show Google reviews through a real widget, with the Google mark.
- The attorney wants his bio as supplied (see section 4), with the Catholic Charities detail; the EN and ES versions must say the same thing.
- Videos belong in the body, never the header; on mobile videos are click-to-play.
- The client rejected a blue-grey surface as "ugly"; and rejected a DACA photo showing "a grown man" and an all-white group; imagery of young people must look like the community served.
- Payment: keep a payment route even if it just explains how to pay.
- Mobile menu must expose every service; the first build hid 14 services on phones.
- Photos that only work with subjects at both edges need an art-directed mobile crop.

---

## 9. Understanding the visitor

### 9.1 Who arrives, and in what state

| Visitor | State of mind | What they need in the first ten seconds |
|---|---|---|
| A Spanish-speaking person with a pending or feared immigration problem (asylum deadline, a spouse petition, a work permit, a court date) | Anxious, often on a phone, often at night, reading in their first language, wary of notarios and of being sold to | "This is a real attorney. He speaks my language. Here is exactly how to reach him." |
| A family member researching on behalf of someone else | Protective, comparing several firms in tabs | Credentials, the list of matters handled, how consultations work, reviews. |
| An English-speaking spouse or employer | Practical, wants to understand process and cost | Clear service pages in English, the attorney's background, a booking path. |
| An existing client | Task-driven: pay an invoice, find the office, call | Payment link and phone within one tap from any page. |
| A journalist, producer or referral attorney | Verifying credibility | Bio, media appearances, bar admissions, a press contact. |
| Search engines and AI answer engines | Need unambiguous entities | Name, address, phone, services, languages, attorney, jurisdiction, in structured data and plain HTML. |

### 9.2 Emotional design rules derived from this

- Calm before clever: a stable, quiet page beats a spectacular one. No motion that moves content out from under a reader.
- Name the fear without exploiting it: acknowledge deadlines and consequences plainly; never use countdown urgency, "act now", or threat language.
- Show the person: the attorney's face, name, voice and background are the trust engine. He is an immigrant who rebuilt a legal career in the United States, and that is the story.
- Plain words first, legal terms second: every service page opens with who it is for and what it does before any form number.
- Always one tap from a human: phone, WhatsApp/SMS (if confirmed), and a form that says what happens after you send it.
- Spanish is not a translation layer: the Spanish pages are written as Spanish, with Spanish search intent, and the language switch is persistent and visible on phones.
- Respect the reading level: aim for plain Spanish and plain English, short sentences, defined terms.

### 9.3 Journeys the architecture must serve

1. "Necesito ayuda pero no sé de qué tipo." Home → "¿Cuál es su situación?" finder → service page → attorney credibility → consultation.
2. "Ya sé que necesito un abogado de peticiones familiares." Google → Family petitions page → plain explanation → FAQ → consultation.
3. Spanish-speaking visitor landing on any English page: sees the language switch in the header and the mobile bar, one tap to the equivalent Spanish URL.
4. Returning client: header or footer → "Pagar" → LawPay in a new tab.
5. Research-stage visitor: Google or an Instagram reel → a resource article → related service → attorney → contact.
6. Emergency (detention, court notice): mobile call bar visible on every page; the removal-defense page states what to do today.

---

## 13. Anti-cliché commitments

Banned without a written conceptual reason: gavels, courthouse columns, scales of justice, US flag imagery and star fields (the current banner), the Statue of Liberty, handshakes, stock lawyers in suits, skyline shots, dark navy + gold as an identity, a serif headline over a gradient overlay as the whole personality, "Excellence"/"Trusted"/"Navigating the complexities" copy, stat counters, mission/vision/values trios, icon-card grids for services, and the Squarespace pill button.

Allowed and encouraged: the attorney's real face and bow tie, his own explainer videos and reel stills, documents and forms photographed as objects (later, with the client), Orlando as a place (Kirkman Road, the office), typography as the identity, numbered indices, rules and columns instead of cards.

---

## 15. Review of the Webflow template supplied as a reference

`https://brandt-law-firm-business-template.webflow.io/` (Brandt, by Metrik.studio).

**Mechanics observed** (from the rendered page and its markup): a full-viewport dark hero with a blurred photograph and a high-contrast serif display line ("Excellence in Legal Counsel") with a small "Discover ↓" pill; a stats row (30 years / 500 clients / 1,200 cases won); a two-word serif statement with a gold ornament ("Exceptional ✳ Elite ✳ Advocacy"); practice areas as a vertical list of rows, each with a small thumbnail, a label and an arrow, on a dark ground; a full-bleed team photograph; a quote from a "senior partner"; a numbered 01 / 02 / 03 Mission / Vision / Values sequence with images; a serif CTA statement; a dark footer with a peach accent. Sticky header, `reveal` classes for scroll-in, no marquee. Palette: near-black `#1A1829`, peach/tan `#E4B9A7`, white. Type: one high-contrast serif for display, a grotesque for UI.

**Take (as motion and layout DNA only):**
- Practice areas as an editorial list of rows with a small image, a label and an arrow, not a grid of cards.
- Numbered indices (01, 02, 03) as a structural device for sequences (process steps, what to expect).
- Section pacing that alternates a dark band with light content, and a single display statement given a whole band.
- Restrained reveal-on-scroll with no other motion.

**Leave, and why:**
- The stats row. Nothing on it is verifiable for Campos and Florida Rule 4-7.13/4-7.14 make unverifiable quantitative claims a compliance problem, not just a taste one.
- "Excellence in Legal Counsel", "Exceptional Legal Representation, Distinctly Yours", "trusted legal partner": the exact performative copy the brief bans.
- Dark navy/black + peach-gold as the identity: the default legal-luxury look, indistinguishable from hundreds of firm sites.
- The blurred stock hero and stock office interiors: the site must show the real attorney.
- Mission / Vision / Values: corporate filler with no information.
- The 5,600 px scroll before the first practice area at 1440: a stressed visitor must find their matter within one screen.
