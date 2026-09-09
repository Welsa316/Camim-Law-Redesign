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

---

## 4. Firm facts: verified, and what is not

Every fact below was observed on a first-party or government record, with the source noted. Nothing here was taken from a search-result summary.

### 4.1 The identity question, answered

The single most important research question was whether the Orlando "Juan Campos" is the same person as "Juan Campos-Gutierrez" of Campos Muños Law in New Orleans, whose site, biography, press assets and Instagram account the Orlando firm appears to share.

**They are the same person.** Eight independent chains of evidence, no contradicting evidence:

- The Florida corporate filing for Campos Immigration Law Firm LLC names **Campos Gutierrez, Juan M** as registered agent and sole manager, at the Kirkman Road address.
- Both firms' websites link the same single Instagram account.
- The Orlando firm's own Facebook page bylines him as "Juan Campos-Gutierrez" and states his licence.
- The two sites share verbatim-translated body copy.
- A review on the Orlando Google listing names the New Orleans firm.
- Avvo lists him under both name forms.
- A broadcast lower third ties the on-air "Juan Campos" to the same Instagram handle.

### 4.2 The finding that changes the site

**He is admitted in Louisiana, not Florida.**

Direct queries of the Florida Bar's member-search endpoint return no record: not by name, not by the hyphenated surname, not by city, not by firm. The control query works, so the search itself is functioning. The State Bar of Michigan directory likewise has no record; the Michigan badge on the sister firm's site belongs to his partner. Avvo's licence panel states Louisiana, acquired 2020, eligible to practise, no misconduct.

This is lawful and unremarkable. Immigration is federal practice: under 8 C.F.R. § 1001.1(f) an attorney need only be a member in good standing of any state bar to appear before USCIS and the immigration courts, and *Sperry v. Florida*, 373 U.S. 379 (1963), holds that a state cannot bar a federally authorised practitioner from federal immigration practice within its borders.

But it has to be disclosed. Rule 4-7.21(d) requires jurisdictional limitations to be indicated, and the Rule 4-7.11 comment addresses exactly this situation. **The current website says nothing at all**, while his own Instagram and Facebook already say "Licenciado en Louisiana". The website says less than his social media.

Handled well this is an asset, not a liability: it is also the reason he can represent clients in other states. The redesign states it in the footer of every page and explains it on the attorney page under the heading "Por qué una oficina en Orlando con licencia de Louisiana".

### 4.3 Verified facts

| Fact | Source |
|---|---|
| Campos Immigration Law Firm LLC, document L23000343437, filed 20 July 2023, ACTIVE | Florida Division of Corporations |
| Principal address 5401 S. Kirkman Road, Suite 324, Orlando, FL 32819 | Sunbiz; site footer; Google Business Profile |
| Sole manager and registered agent: Campos Gutierrez, Juan M | Sunbiz |
| Admitted Louisiana 2020; Louisiana Supreme Court | Avvo licence panel; his own biography |
| LL.M. in Comparative Law, University of Florida Levin College of Law, 2019 | Avvo education panel |
| Law degree, Universidad Yacambú, Venezuela, 2006 | Avvo education panel |
| Born in Coro, Venezuela | His own biography |
| Staff Attorney, Catholic Charities Archdiocese of New Orleans, 2020-2021 | Avvo work experience |
| Member, American Immigration Lawyers Association | His biography; AILA lawyer search |
| Languages: English and Spanish | Avvo; all public content is in Spanish |
| **Google Business Profile: 5.0 stars, 59 reviews**, category "Immigration attorney", owner replies substantively | Google Business Profile, read 9 September 2026 |
| Instagram @juancamposlaw: 12,000 followers, 1,000 posts | Live profile |
| TikTok @elabogadohispano: 17,100 followers, 768 videos | Live profile |
| YouTube: 1,240 subscribers, 477,317 lifetime views | Live channel |
| Google hours: Monday to Friday, 8am to 5pm | Google Business Profile |

### 4.4 The reputation finding

**Fifty-nine five-star Google reviews with substantive owner replies is the firm's single most valuable asset, and it appears on the website zero times.** The market's best technical competitor has nineteen reviews.

Every other surface is empty, stale or wrong: no BBB, Yelp, Justia, Martindale, Lawyers.com or Super Lawyers profile exists for the Orlando entity; the Avvo profile has zero reviews; a directory scrape page titled "Bankruptcy Lawyer Orlando FL" ranks for the firm's name.

### 4.5 The service gap

The site publishes **one** of at least sixteen services the same attorney demonstrably handles. Green cards, family petitions, citizenship, removal defence, VAWA, U and T visas, DACA, TPS, work permits, consular processing, fiancé visas and SIJS are all evidenced by his other firm's pages, his consultation form options, or his own weekly content. Two more, waivers and cancellation of removal, he creates content about but neither site lists.

### 4.6 Conflicts to resolve

- **Hours are published three different ways:** 9am-7pm on the website, 8am-5pm on Google, "always open" on Facebook. The build uses Google, because that is what prospects see, and flags the conflict.
- **The site says "abogados" (plural)** while Sunbiz lists one manager and no other Orlando attorney is identifiable. The redesign is written in the singular.
- **The sister firm advertises "5,000+ Cases Resolved" and "25+ Years of Experience."** Neither is verifiable, and the years figure counts a Venezuelan career from 2006 against a U.S. licence dating to 2020. Rule 4-7.13's comment treats exactly this kind of combined-experience claim as a material omission. Neither number appears on the new site.
- **5401 S. Kirkman Road is the Regions Bank Building, which hosts Execu-Suites executive and virtual offices.** Whether Suite 324 is a full-time staffed office decides whether the Bar's bona-fide-office test is met and whether the site should invite people to visit. The build states the city and does not invite walk-ins pending confirmation.

---

## 5. Orlando / Central Florida competitors

Twelve firms audited: eight in depth (homepage plus practice, attorney, Spanish and contact pages), four from a homepage or an Orlando landing page. Every claim below was observed in fetched content; visual and mobile judgements are inferred from markup, not from rendering.

### 5.1 The eight primary competitors

| Firm | Position | The one thing they do well | The thing that undoes them |
|---|---|---|---|
| **The Sekou Clarke Law Group** (Orlando) | "Our firm is built by immigrants, for immigrants"; immigration + personal injury + criminal | Diaspora offices (Kingston, Bogotá, Medellín) and an owned podcast and video centre | No attorney credentials anywhere; a live placeholder SMS number ("Text HELP to 1-123-456-7899"); Spanish is one orphan page |
| **Law Offices of Gail S. Seeram** (Orlando, virtual) | "25+ Years Helping Immigrants"; AILA Central Florida past president; free consultation | WhatsApp-first sticky bar with a real link, and "Case WINS" showing redacted approval notices | Broken H1 ("potlight on Attorney Gail Seeram"), a stray "%" in the title tag, a live theme placeholder page, and no Spanish at all |
| **Michael Mendez P.A.** (Lake Nona) | Solo Hispanic immigration boutique; Telemundo and Univision regular | A tight seven-item practice list and "Make A Payment" in the main nav | No H1 on the homepage; the language switcher is a dead anchor and `/es/` serves injected French casino spam |
| **Vazquez & Poudat** (Orlando) | Two attorneys board certified in Immigration and Nationality Law by the Florida Bar | The best taxonomy in the market (eight intent groups, temporary vs permanent) and a published rationale for charging for consultations | A dated static build, a title-tag typo ("Inmigration"), and criminal-defense boilerplate on the contact page |
| **Abdin Law** (Orlando, **5401 S. Kirkman Rd Suite 105 — the same building as Campos**) | Awards-heavy young attorney; immigration plus personal injury | A live Google rating with its count (269), real FAQ schema, and an explicit "clear, upfront pricing" promise | Three different phone numbers across page and schema; "Se habla Español" with zero Spanish content; a nine-badge wall doing the work of credentials |
| **Martinez Manglardi** (Orlando, Spanish-only) | "Porque somos inmigrantes como usted"; six Central Florida locations | Spanish-first voice, a "(Migra)" vanity number, country-of-origin pages and a plain-Spanish glossary | Title claims "#1 en la Florida"; `lang="en-US"` on a Spanish site; testimonials written in English; a stale "Covid 19" nav item |
| **Complete Immigration Solutions** (Orlando) | Puerto Rico-licensed attorney, 15+ years | The only timely detention resource in the market, naming actual Florida facilities with a five-step family checklist | Duplicate H1; flag-and-gavel stock imagery; machine-translated Spanish nav ("DEFENSA DE DESPEDIDA" for removal defense) |
| **Diaz Shafer Immigration** (Tampa) | Board certified; "25 years in business" | The clearest money language anywhere: "Flat Fee Pricing / Installment Payments Available. Consultations with Attorneys – not sales staff." Plus WhatsApp, a client portal and hours in schema | The reviews page renders no reviews at all; the Spanish page carries a "555-555-5556" placeholder phone |

Four more were sampled: PD Law (Brazilian-community trilingual), Lorenzo Law Group (Spanish-first, "Hispanos protegiendo a Hispanos", a three-minute case-review promise), T8 Immigration (Tampa, athlete visas), NeJame Law (large multi-practice firm with a full Spanish mirror and a 154-link homepage), Brown Immigration (an Orlando location page with a genuinely useful "Orlando USCIS Field Office and Local Processing" section) and Vasquez Law (a North Carolina firm ranking on an Orlando landing page).

### 5.2 The neighbour problem

Abdin Law operates from Suite 105 of the same building as Campos in Suite 324. It runs a live Google reviews widget showing 269 reviews, publishes FAQ schema, and promises upfront pricing. Any visitor comparing "immigration lawyer 5401 Kirkman" sees a firm with visible proof next to a firm with none. This is the single most concrete competitive argument for the trust work in this redesign.

### 5.3 Practice-area taxonomies observed

- **Flat lists of six to fifteen items** (Mendez, Diaz Shafer, T8, Abdin) — easy to build, hard to scan.
- **Grouped by intent or permanence** (Vazquez & Poudat, Brown, Vasquez) — the strongest existing pattern.
- **By visa letter** (NeJame: A-1, B1/B2, E1/E2, EB5, H-1B, K-1, L-1, O-1, TN and more) — good for people holding a receipt notice, meaningless to everyone else.
- **Plain-Spanish nested** (Martinez Manglardi: Petición familiar → Ciudadanía por matrimonio, Petición matrimonio, Residencia 245(i); Lorenzo: 22 Spanish service pages).
- **By audience** (Abdin: individuals / families / employers).
- **Situational and timely** (detention guides, Parole in Place, E-2 for Colombian investors, country pages).

Nobody in this market organises by the visitor's situation in plain language. That gap is the basis for the architecture proposed in `INFORMATION_ARCHITECTURE.md`.

### 5.4 Consultation fee practice

Eight of twelve never say whether a consultation is free or paid. Two say free (Seeram "with exceptions", Vasquez), one says free only for other practice areas (NeJame), one explains at length why theirs is not free without publishing a number (Vazquez & Poudat: "an attorney's time is their trade, and our time has value"). **No competitor publishes an actual consultation price.** Only Diaz Shafer and Abdin say anything about case fees at all.

---

## 6. Best-in-class immigration websites (national)

Eight sites studied in depth, each fetched page by page, with the raw HTML read for fonts, schema and vendor stack. What follows is the transferable lesson from each, not a recommendation to imitate.

| Site | Lesson worth taking |
|---|---|
| **SimVisa** (Chicago) | Case discovery *is* the site. Every service carries the form or visa code the visitor already holds: "Petition for Alien Relative (I-130)", "Adjustment of Status (I-485)", "Removal of conditions (I-751)". And a private first step before any form: an eligibility check promising "No obligation · Takes about 90 seconds", whose consent line reads "This does not create an attorney-client relationship." |
| **Elyon Legal** (Boston) | Bilingual as architecture, not a widget. Translated slugs (`/es/inicio/`, `/es/equipo/`), correct hreflang pairs, and Spanish that was written rather than translated: "Tu caso merece atención experta." Their team page includes paralegals, operations and finance staff, not just lawyers. |
| **Sverdloff Law Group** (Chicago) | Process transparency per case type: ten numbered steps for a green card, ten more for immigration court, starting at "Notice to Appear Received". Also the richest structured data found anywhere: FAQPage, Person, LegalService, AggregateRating, OpeningHoursSpecification. And an "Immigration A to Z" index sitting beside the goal-based buckets, so both kinds of visitor can navigate. |
| **Founder Law** (Palo Alto) | Services organised by who you are, not by visa code, and an owned editorial ecosystem (a named column, a book, a podcast, a downloadable options chart) that builds authority without a single superlative. The only site in the set shipping `prefers-reduced-motion`. |
| **Sound Immigration** (Seattle) | Positioning you can repeat in one breath: "Form I-864 enforcement is all we do." An intake page written as a four-step numbered promise, with reassurance lines that matter more than badges: "We are a private law firm, not affiliated with any government agency", "You are under no obligation to hire us." A bio built from published cases and talks rather than adjectives. |
| **Lee & Garasia** (New Jersey) | Practice areas named for the visitor's problem: "Deportation", "Crimes", "Waivers", "Motions", "Humanitarian Case". Field-office pages for Newark, Mount Laurel and Cranbury. An honest scope statement listing what their clients have actually done (entered illegally, overstayed, been deported) before saying what became possible. EB Garamond with Figtree is the most counsel-grade type pairing observed. |
| **ZafiroLaw** (Seattle) | "Languages We Speak" in the header, as people speak them. Guides named for the moment of fear: "If ICE Is At The Door". A first-person bio that opens "Hi, I'm Katrina Zafiro" and lists affiliations instead of a win rate. |
| **Motivus Law** (Toronto; the only immigration firm found on Awwwards) | The plainest hero in the study: "We help people move to the US or Canada." One button. And a consultation page that publishes the deal in full: thirty minutes, $250 CAD, credited against the final invoice if you retain them. |

### 6.1 What premium boutique law sites share, concretely

1. **The attorney is a nav item, not a page.** "Meet Diana Bob", "Meet Greg McLawsen", "About Andrea". Template sites have "Our Team", or never show a lawyer at all.
2. **One headline that states the job in plain words.** Against: "THE BEST IMMIGRATION LAWYERS", "MAKE YOUR American Dream A REALITY", "Nationally Recognized Immigration Law Firm".
3. **A chosen type pairing, loaded on purpose.** EB Garamond + Figtree, Gilda Display + Outfit, PT Serif + Alegreya Sans, self-hosted Manrope + Open Sans. The template tell is Roboto, Poppins or Montserrat, or five families requested for a two-family design.
4. **Real people, art-directed, with alt text that describes them.** One site shot all three attorneys against the same brick wall. Another captioned a photo "Affidavit of Support enforcement win with client". The template tell is "Business People Shaking Hands Office", the Statue of Liberty, or badges as the only images.
5. **Both vocabularies when the audience is mixed:** problem names for newcomers, form numbers for people holding a receipt notice, and an A-Z index for everyone else.
6. **A numbered process and a stated price of entry.**
7. **A private first step before the contact form** — a quiz, a checklist, a case assessment.
8. **Bilingual as a second site.** The alternative, a machine-translation overlay, produced "LOS MEJORES INMIGRACION ABOGADOS" on one competitor's Spanish page. Even the good ones leak: one otherwise excellent trilingual site renders "Home" as "Hogar".
9. **Structured data beyond the SEO plugin defaults.** A `Person` node for the attorney is the cheapest credibility upgrade available and most firms skip it.
10. **Owned content with a name** rather than "Blog".
11. **Fewer, calmer calls to action.** One site uses a single verb everywhere ("Book a consult"); a weaker one has ten distinct CTA labels on the homepage.
12. **Compliance and accessibility hygiene visible in the markup**: skip links, accessibility statements, advertising disclaimers naming the responsible attorney, reduced-motion rules.
13. **Weight.** The best-regarded sites in the set ship 69 KB and 88 KB homepages; the heaviest ships 583 KB and roughly a thousand page-builder class references.

### 6.2 What not to copy, even from the good ones

- Three different success numbers on one site ("98% Success Rate" on the homepage, "99%" on an inner page, "18+ Years" beside "19+ years"). Inconsistent statistics read as invented, and under Florida rules they are worse than that (section 10).
- "Achieve your American dream" appears on four of the eight. It is the category cliché.
- Placeholder statistics shipped live: "Clients: 0 +", "Countries: 0 +".
- Alt text padded for search engines: "…much like the resolve of Chicago immigration attorneys."
- Emoji as section icons, script display faces, and smooth-scroll libraries shipped without a reduced-motion escape.
- Logo walls borrowed from a different audience, and a hero used for a rebrand announcement.

---

## 7. Outside the legal industry

Twelve sites studied by pulling their served HTML and every linked stylesheet, then reading the actual values rather than describing an impression: David Chipperfield Architects, 6a architects, Aucoot, Banque Pictet, Aman, Serpentine Galleries, Fondation Beyeler, Works in Progress, The Gentlewoman, Egon Zehnder, Brunswick Group and Linear.

### 7.1 Nine recurring mechanics

1. **One scale used for two things.** Chipperfield's numeric ramp is simultaneously the type scale and the spacing scale. When the gaps between things come from the same ratio as the sizes of things, a page reads as composed even where nothing aligns.
2. **Tracking is a declared function of size, never typed at a call site.** Linear binds a tracking value to each size step. Chipperfield uses four values across the entire site. Aman and Egon Zehnder run two opposed regimes: negative on display, positive on small uppercase labels.
3. **Weight is either almost absent or tuned off the round numbers.** 6a has no bold anywhere; hierarchy comes from size and position. Where variable fonts are used the weights are deliberate and non-round: 510, 590, 680. Round 700 everywhere is a template tell.
4. **Fluidity lives in one place.** None of them sprinkles bespoke `clamp()` per component.
5. **Separation comes from placement, a rule, or measure. Not a box.** Where cards do appear, they are the least distinguished part of those sites.
6. **Measure is a token in `ch`, and the page is narrow.** Nobody lets prose run to the viewport.
7. **The scrolled and hovered states are designed, and hover is capability-gated** behind `@media (hover: hover)` or `any-hover`. Nothing important is discoverable only by hovering.
8. **Motion is a tiny closed vocabulary with heavy deceleration.** The same three or four curves recur across unrelated sites, all of them settling. Linear declares four speeds for an entire product.
9. **Reduced motion is a real branch that bails out before anything is hidden.** One site starts reveals at `opacity: .001` rather than `0`, so the element stays composited and a failed observer leaves it near-invisible rather than blank.

### 7.2 What was taken

| Mechanic | Where it went |
|---|---|
| Reveal amplitude as a property of content kind: text rises 18px, media 32px with a slight scale, controls 14px, one shared curve, one stagger token | The reveal system in `global.css` |
| `opacity: .001` rather than `0` as the start state | Same |
| Four speeds and no more | The motion tokens |
| Mono for the apparatus, serif for the substance: form numbers, ordinals, dates, labels in one monospace; headlines and answers in the reading face | The `.apparatus` and `.eyebrow` roles, and form numbers on every service row |
| A ruled index instead of a card grid, each row carrying the same slots | The situation finder and the service rows |
| Numbered process as an indented column with the ordinal in the margin | The `.steps` component |
| Exactly one dark band down the page | The attorney band on the home page |
| Money stated inline in a sentence, not in a pricing card | The consultation page |
| A header that is a declared state machine, collapsing to a fixed height with the phone still reachable | `SiteHeader` |
| The A-Z index as a first-class way to navigate | The services hub |

### 7.3 What was refused

- Full-viewport section gaps. A stressed visitor on a phone should not have to travel that far between answers.
- Metadata hidden by default. Every practice row always shows its plain-language label.
- A root font-size that shrinks on small screens. Body holds at 17px.
- Hairline display weights. Legible on a cracked phone in Florida daylight is the floor.
- Carousels as the way to see options. A hidden option is a lost client.
- Fixed-pixel type, which ignores the reader's own font-size setting.
- `transition: all`. One reference site serves it 451 times.

---

## 8. What premium means for this firm

Not gold, not dark, not animated, not a serif over a gradient. Working definition, written before the design and used to judge it:

> **The site behaves as though a specific, careful person made every decision on it, and as though that person had already thought about what you are afraid of.**

Five commitments that make that testable:

1. **Nothing is decorative.** Every rule, colour and movement does a job that can be named. If a border can be replaced by placement, it is. If a shadow can be replaced by a surface step, it is.
2. **Everything comes from a small declared vocabulary.** Four durations. Four easings. One type ramp. Ten colours. Someone adding a page next year should be unable to introduce a new value without noticing.
3. **The page is legible to someone who is frightened, in a hurry, in daylight, on a five-year-old phone, in their second language.** Body at 17px. Contrast measured rather than eyeballed. Nothing important behind hover. Nothing important inside a carousel. Measure in `ch`, because Spanish runs long.
4. **Facts are stated plainly, in sentences.** Credibility here comes from specifics: where the office is, which bar he is admitted to, what languages he speaks, what a consultation costs, who answers the phone. Set as ordinary text, not as a row of stat tiles.
5. **The design admits what it does not know.** No stock photographs of a courthouse. No invented testimonials. No "trusted by thousands". Where there is no real asset, the answer is words.

Restraint is not the goal. **Specificity** is. Restraint is what specificity looks like once everything unjustifiable has been removed.

### 8.1 How this site is judged against that

| Commitment | Evidence in the build |
|---|---|
| Nothing decorative | Ten colour tokens, each with a named job. One shadow token, used on two elements. No gradient, no glow, no blur, no ambient shape anywhere. |
| Small declared vocabulary | Four durations, four easings, one nine-step type ramp, one spacing ramp. Component classes cannot introduce a size or a duration without adding a token. |
| Legible under stress | Body 17px rising to 18px. Zero contrast failures across eleven pages at two widths, measured with an alpha-compositing parser. Every target at least 44px. Nothing gated on hover. |
| Facts in sentences | Bar admission, languages and memberships are a definition list, not badges. The 59 Google reviews are stated as a sentence, not a star widget. |
| Admits what it does not know | Unverified facts do not render at all. Unconfirmed practice areas do not ship. The Univision still was dropped because it carries a competitor's sponsor logo. |

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

---

## 10. Florida Bar advertising rules — what constrains the copy

Researched against first-party sources: the Rules Regulating The Florida Bar, Chapter 4 (June 30, 2026 compilation), the Handbook on Lawyer Advertising and Solicitation (13th edition, effective December 10, 2025), the Bar's advertising FAQs and networking guidelines, Ethics Opinions 24-1, 07-3, 20-1, 21-1, 21-2 and 93-2, Supreme Court opinion SC2024-0032, and Florida Statutes §§ 117.05, 501.1391 and 501.0117. This is research, not a legal opinion, and every suggested wording is a draft for the attorney to accept or reject.

### 10.1 The ten findings that shape the site

1. **A website is advertising.** Rule 4-7.11(a) covers "banners, pop-ups, websites, social networking, and video sharing media", and the comment says websites "are treated the same as other advertising media". The only concession is that websites need not be pre-filed with the Bar (Rule 4-7.20(g)).
2. **Two things are mandatory on the site:** the name of the lawyer or firm responsible for the content, and the city, town or county of a bona fide office (Rule 4-7.12(a)). "Orlando, Florida" satisfies the second if the Kirkman Road office is genuinely staffed and used to deliver legal services.
3. **"Specialist", "expert" and "specializes in immigration" are gated.** Rule 4-7.14(a)(5)-(6) permits them only with Florida Bar board certification in Immigration and Nationality Law, or where the claim can be objectively verified from education, training, experience or substantial involvement. "Board certified" without the certificate is never permitted. The comment expressly blesses the safe alternatives: a lawyer "may indicate that the lawyer concentrates in, focuses on, or limits the lawyer's practice to particular areas".
4. **No predictions, guarantees or unverifiable success rates.** Rule 4-7.13(b)(1)-(3). The comment lists the permitted hedging words: "try, pursue, may, seek, might, could, and designed to". A "98% approval rate" is a past-results claim that must be objectively verifiable, defined and typical, or it is a prohibited implied prediction.
5. **Testimonials carry six conditions** (Rule 4-7.13(b)(9)), including that nothing of value was given for them and that a results-may-differ disclaimer appears whenever a result is mentioned. Client informed consent is separately required by Rule 4-1.6(a). Once a Google review is republished on the firm's own site, it is the firm's advertisement and all of this applies.
6. **Awards and ratings need the exact award name, the exact organisation, and the year** unless current (Rule 4-7.14(a)(3); Handbook p. 13). A wall of unlabelled badges is a compliance problem, not just a design one.
7. **Every required disclosure must appear in the language of the page** (Rule 4-7.12(c)). A Spanish testimonial needs its disclaimer in Spanish. The one exception: a bare "se habla español" tag does not trigger the requirement.
8. **Intake forms and chatbots.** Rule 4-1.18 makes anyone who submits information a prospective client unless the site carries "clear and reasonably understandable warnings and cautionary statements". Ethics Opinion 24-1 requires that any AI chatbot "inform prospective clients that they are communicating with an AI program and not with a lawyer or law firm employee", give no legal advice, and screen for existing representation.
9. **Nationwide practice is sayable, but not the way the current site says it.** Immigration is federal (8 C.F.R. §§ 1.2, 292.1), so a Florida-licensed lawyer may represent clients located anywhere before USCIS and the immigration courts. But the Rule 4-7.13 comment treats "offices in multiple states" as implying a nonexistent fact. The current homepage line "atendemos a clientes en los 50 estados de Estados Unidos y en el extranjero" needs the licensure basis attached.
10. **Emotionally manipulative imagery is expressly banned.** Rule 4-7.15(a) and its comment: "A depiction of a child being taken from a crying mother is not permissible because it seeks to evoke an emotional response". Permitted illustrations include "a picture of the lawyer, or a map of the office location", and "a person on crutches or in jail" where it illustrates the practice.

### 10.2 Ten phrases this site will not use

| Phrase | Rule |
|---|---|
| "Best immigration lawyer in Orlando", "#1", "top-rated" | 4-7.13(b)(3) — unverifiable comparison |
| "We guarantee approval", "we will get your green card" | 4-7.13(b)(1) — prediction or guaranty |
| Any win-rate or approval-rate percentage | 4-7.13(b)(1)-(2), 4-7.14(a)(2) |
| "Immigration specialists", "we specialize in immigration" | 4-7.14(a)(5)-(6) without board certification or documented verification |
| "Board certified" | 4-7.14(a)(4) without the actual certificate |
| "Licensed in all 50 states", "offices nationwide" | 4-7.13(a)(3) — implied nonexistent fact |
| "Notario", "notaría", "consultor de inmigración", "especialista en inmigración" | §§ 117.05(11), 501.1391 and 4-7.14(a)(2) |
| "Over 20 years of experience" combining lawyers or counting non-lawyer years | 4-7.13(a)(2) — material omission |
| Unlabelled award badges, or "prestigious" | 4-7.14(a)(3) |
| "Florida Bar approved", or any Bar or government-style seal | 4-7.13(b)(10), 4-7.21(b) |

### 10.3 The Spanish-market trap worth naming

Florida amended its notary statutes in 2025 (chapter 2025-82). Section 117.05(11)(a) prohibits literal translation of "Notary Public" into another language in advertising for notarial services, and § 501.1391 now requires non-lawyers offering immigration services to post, in every language they advertise in, "I AM NOT AN ATTORNEY LICENSED TO PRACTICE LAW AND MAY NOT GIVE LEGAL ADVICE". Licensed attorneys are exempt from both. But the vocabulary those statutes police is exactly the vocabulary the firm's Spanish-speaking audience has been harmed by. The Bar's own consumer pamphlet warns that "notario público" refers to a lawyer in Spanish-speaking countries, and that bad advice from a notario "can even begin or accelerate a deportation process".

The opportunity: a truthful clarifier no competitor uses. Draft, for the attorney's review: **"Somos un bufete de abogados con licencia en Florida. No somos notarios ni consultores de inmigración."**

### 10.4 The pre-launch verification checklist

The full 27-item checklist lives in `docs/LEGAL_REVIEW_CHECKLIST.md`, each item stating the plain-language check, the rule citation, and suggested compliant wording. The items that block launch:

- Confirm the attorney's official Florida Bar name and bar number, and use that name in the footer.
- Confirm the Orlando office meets the Bar's bona-fide-office criteria (firm name on the building directory, staff answering calls there, a lawyer present on a regular and continuing basis).
- Confirm bar admissions and federal court admissions before any are listed.
- Confirm AILA or other memberships before any are shown.
- Decide the consultation policy and price, and whether filing fees are stated as additional. Any advertised fee must be honoured for 90 days (Rule 4-7.14(a)(7)).
- Approve the form's cautionary statement and the review-display disclaimer, in both languages.
- Confirm every practice area listed is one the firm actually handles (Rule 4-7.13(b)(4)).
- Approve the nationwide-practice sentence.

---

## 11. Competitive matrix, table stakes, gaps, differentiation

### 11.1 Matrix

Scores are 1-5 and reflect what the fetched markup and copy support. Visual and mobile columns are inferred from structure, not from rendering, and are marked accordingly.

| Site | Positioning | Visual* | Trust | IA | Content | Mobile* | Conversion | Multilingual | SEO | Distinctive idea |
|---|---|---|---|---|---|---|---|---|---|---|
| Sekou Clarke | Built by immigrants, for immigrants | 3 | 2 | 3 | 3 | — | 3 | 2 | 3 | Diaspora offices + podcast |
| Gail Seeram | 25+ years, AILA past president, free consult | 2 | 4 | 1 | 4 | 3 | 3 | 1 | 2 | WhatsApp sticky bar + approval notices |
| Michael Mendez | Solo Hispanic boutique, TV regular | 3 | 3 | 3 | 2 | 3 | 2 | 1 | 2 | "Make A Payment" in the nav |
| Vazquez & Poudat | Two board-certified attorneys | 2 | 5 | 5 | 3 | 3 | 2 | 3 | 3 | "Why our consultation is not free" |
| Abdin Law | Awards-heavy; same building as Campos | 3 | 4 | 2 | 3 | 3 | 3 | 1 | 4 | Live Google widget + FAQ schema |
| Martinez Manglardi | "Somos inmigrantes como usted" | 3 | 3 | 3 | 4 | 3 | 2 | 2 | 3 | "(Migra)" vanity number, country pages |
| Complete Immigration Solutions | PR-licensed, 15+ years | 2 | 2 | 3 | 3 | 3 | 2 | 4 | 3 | ICE detention facility guide |
| Diaz Shafer (Tampa) | Board certified, flat fees | 3 | 4 | 3 | 3 | 3 | 4 | 4 | 4 | "Consultations with attorneys, not sales staff" |
| PD Law | Brazilian-focused trilingual | 2 | 2 | 2 | 2 | 3 | 3 | 4 | 2 | Portuguese-first niche |
| Lorenzo Law Group | "Hispanos protegiendo a Hispanos" | 3 | 3 | 4 | 3 | 3 | 4 | 5 | 3 | Three-minute case-review promise |
| NeJame Law | Large multi-practice, full Spanish mirror | 4 | 5 | 2 | 4 | 3 | 3 | 5 | 4 | "Near the USCIS office and immigration court" |
| Brown Immigration | Multi-state, Orlando location page | 3 | 4 | 4 | 4 | 3 | 3 | 4 | 4 | "Orlando USCIS Field Office and Local Processing" |
| **camimlaw.com today** | Not stated | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | None |

\* inferred from markup only.

Campos scores at the bottom of every column. That is the honest baseline: the current site has no positioning statement, one real content page, no credentials, no reviews, no schema beyond `WebSite`, a 404 in its own conversion funnel, and template placeholder text on two pages.

### 11.2 Table stakes

Present on nearly every competitor and therefore not differentiating, only disqualifying if absent:

1. A phone number in the header and a consultation call to action (12 of 12), with click-to-call links (9 of 11 raw pages).
2. A contact form with a practice-area selector.
3. A practice-area list with a page per item.
4. An attorney bio carrying an immigrant or first-generation story. Every single firm in the set has one.
5. Some "se habla español" statement (9 of 12), usually with no Spanish pages behind it.
6. Award or rating badges.
7. A Google review reference, numeric on 6 of 12.
8. A blog or news section (9 of 12) and social links.
9. Footer NAP, privacy policy and an attorney-advertising disclaimer.
10. `LocalBusiness`, `LegalService` or `Attorney` structured data (8 of 11 verified).
11. A sticky header plus a floating call or chat widget.
12. Univision and Telemundo logos on every Hispanic-facing firm.
13. A "Make a Payment" or client-portal link.

Campos currently has: a phone number, a form, one service page, a payment link, an Instagram link. It is missing nine of the thirteen.

### 11.3 Competitive gaps — where the whole market is weak

1. **Consultation cost is a black box.** Nobody publishes a number.
2. **Fees are never explained.** Two firms gesture at "flat fee" or "upfront pricing"; none shows a range for any case type.
3. **Spanish parity is rare and flawed.** Four real mirrors with hreflang out of twelve. One firm's Spanish path is serving injected casino spam. Machine-translation artefacts ship live.
4. **WhatsApp is under-used** for a Spanish-speaking market: four of twelve.
5. **Structured-data and NAP hygiene is poor:** three phone numbers on one site, two street addresses on another, seven-day default hours, review counts that disagree between the page and the schema.
6. **Basic QA failures are live**: broken headings, missing headings, duplicate headings, theme placeholder text, placeholder phone numbers, stale COVID navigation, an empty reviews page.
7. **FAQs are thin or fake.** Four of twelve have real ones.
8. **No process transparency.** Almost nobody explains what happens after you call, what to bring, or how the Orlando USCIS field office and immigration court fit in.
9. **Proof is badges, not evidence.** Static initial-only testimonials predominate.
10. **Cliché imagery is the default:** verified flag backdrops, gavels, scales of justice, badge walls.
11. **IA runs to extremes:** either a flat list of a dozen-plus items, a 154-link mega-nav, or no services navigation at all.
12. **Emergency and detention paths are absent** except at one firm.
13. **Accessibility debt** is visible in the markup: empty alt attributes, meaningless alt text, wrong language attributes.

### 11.4 Differentiation for Campos

Ranked by the gap between how much it matters and how hard it is:

1. **Publish the consultation policy and price in both languages.** No competitor does. Requires a client decision, not engineering.
2. **True Spanish parity, Spanish-first**, with human-written copy, translated slugs and correct hreflang. This alone beats nine of twelve.
3. **Situation-based information architecture** in plain language, with form numbers as secondary labels and an A-Z index for people who already know their form.
4. **Process transparency as the trust device**: what happens after you write, what to bring, realistic timelines, and an Orlando USCIS field office and immigration court page that nobody owns.
5. **Evidence over badges**: the attorney's actual credentials stated plainly, media appearances shown as what they are, and reviews handled compliantly.
6. **An emergency and detention path** for the visitor whose family member was just detained.
7. **Technical hygiene as a moat**: one consistent NAP, real hours, correct schema, one H1 per page, no placeholders. Every competitor fails at least two of these.
8. **A non-cliché visual language.** No flags, gavels, scales or Statue of Liberty. The current banner is the exact cliché being abandoned.
9. **Community-specific content** for Central Florida's Venezuelan, Colombian, Cuban, Haitian and Puerto Rican communities, in Spanish first.
10. **WhatsApp as a first-class channel** with a response-time promise the firm can actually keep.

---

## 12. Art directions

Three genuinely different territories, developed from the research rather than from a palette swap. Each is described as a whole system, then scored, then one is chosen with reasons.

### Direction 1 — "El expediente" (The Record)

**Philosophy.** An immigration case is a record: a file assembled carefully, page by page, over years. The site is set like a serious publication or a well-kept legal record — text-first, generously margined, numbered, ruled.

**Emotional effect.** Sober, careful, permanent. The feeling of a place where documents are handled properly.

**Typography.** A text serif carries display and pull quotes; a humanist sans carries UI and body. Large first paragraphs, a real scale, tight display tracking, hanging section numerals in the margin.

**Palette.** Warm paper, deep ink, hairline rules, one restrained accent. No large colour fields.

**Layout.** A twelve-column grid used asymmetrically: content in columns five to twelve, section numbers and eyebrows in one to three. Rules and columns instead of cards. Full-bleed reserved for two moments per page at most.

**Imagery.** The attorney's portrait, the office, documents as objects. Photography is occasional and deliberate rather than decorative.

**Motion.** Masked line reveals on headings, a quiet fade-and-settle on images. Nothing scroll-scrubbed.

**Strengths.** Furthest from every competitor. Ages extremely well. Cheap to build and very fast. Type does the identity work, so it survives having few photographs.

**Weaknesses.** Can read cool and academic to a frightened reader. Serif at small sizes with heavy Spanish diacritics needs care. Underuses the firm's best asset, which is the attorney on camera.

**Suitability for immigration law.** High for credibility, medium for warmth.
**Risk of becoming generic.** Low.
**Accessibility.** Strong: high contrast, large text, little colour dependence.
**Implementation difficulty.** Low.

### Direction 2 — "Con nombre y cara" (A Name and a Face)

**Philosophy.** The trust engine is the person. Juan Campos already explains immigration law in Spanish on camera every week and has appeared on Telemundo, Univision and TVV. The site is built around his face, his voice and his own explanations, framed institutionally so it reads as a law practice and not a personal brand.

**Emotional effect.** "There is a real, named attorney here who speaks my language and will explain this to me."

**Typography.** The same editorial discipline as Direction 1, but the serif appears at fewer, larger moments and the humanist sans does more of the work, so long Spanish body copy stays comfortable.

**Palette.** Warm paper ground, a deep institutional green drawn from the attorney's own wardrobe in the existing photography, a single warm accent for actions.

**Layout.** Editorial grid, but the page opens on a person rather than a statement. Video is body content in a considered frame, never a background. Practice areas are an editorial list of rows, not a grid of cards.

**Imagery.** The existing studio portrait, art-directed crops of the reel stills, the three television stills, and the office. All photography is of real people connected to the firm.

**Motion.** Masked line reveals on headings, a settle on portraits, and click-to-play video with no autoplay on mobile.

**Strengths.** Uses the only asset no competitor can copy. Directly answers the notario fear with a visible, named, licensed attorney. Strong for both trust and warmth. Every competitor's attorney page is a bio; this makes the attorney the spine of the site.

**Weaknesses.** Can tip into influencer territory if the framing is careless. Depends on photography quality, and one good portrait is not a full library. Video costs bytes and needs careful mobile handling.

**Suitability for immigration law.** Highest.
**Risk of becoming generic.** Low to medium; the mitigation is institutional framing.
**Accessibility.** Needs captions and transcripts for video, which the firm partly has already.
**Implementation difficulty.** Medium.

### Direction 3 — "Ruta" (The Route)

**Philosophy.** Immigration is a sequence: forms, receipts, biometrics, interviews, decisions. The design language is wayfinding — a precise grid, numbered steps, monospaced form numbers and dates, signal colour for status.

**Emotional effect.** Orderly, contemporary, in control.

**Typography.** A neo-grotesque with a monospace for metadata.

**Palette.** Cool structured neutrals with one signal colour.

**Layout.** Step sequences, progress structures, tabular data, diagrammatic explanations of each process.

**Imagery.** Minimal photography; diagrams carry the explanation.

**Motion.** Step-linked reveals, structural transitions.

**Strengths.** Genuinely useful for the "what happens next" gap that the entire market leaves open. Modern and distinctive against a field of templates.

**Weaknesses.** Two serious ones. It makes bureaucracy the aesthetic, and bureaucracy is precisely what the visitor is afraid of. And it is one step from looking like a software product, which is the "AI website" look the brief bans. Diagram-led explanation also raises the risk of the site appearing to give legal advice.

**Suitability for immigration law.** Medium.
**Risk of becoming generic.** High, in the specific direction of SaaS.
**Accessibility.** Diagrams need text equivalents; monospace at small sizes is poor for Spanish diacritics.
**Implementation difficulty.** High.

### Scoring

Ten criteria, scored 1-5 against the evidence in sections 3, 5, 6 and 9.

| Criterion | 1. El expediente | 2. Nombre y cara | 3. Ruta |
|---|---|---|---|
| Premium perception | 5 | 4 | 3 |
| Trust | 4 | 5 | 3 |
| Humanity | 2 | 5 | 2 |
| Differentiation in this market | 5 | 5 | 4 |
| Clarity for a stressed visitor | 4 | 5 | 3 |
| Mobile performance | 5 | 3 | 3 |
| Accessibility | 5 | 4 | 3 |
| Maintainability | 5 | 4 | 2 |
| Conversion potential | 3 | 5 | 3 |
| Fit for this specific firm | 3 | 5 | 2 |
| **Total** | **41** | **45** | **28** |

### Decision

**Direction 2, "Con nombre y cara", built on Direction 1's discipline.**

The reasoning, stated plainly so it can be argued with:

1. **The decisive asset is the attorney.** He is a licensed Spanish-speaking immigration lawyer who teaches on camera and has been interviewed by three Spanish-language networks. Nothing else about this firm is unavailable to a competitor. The current site wastes it on a logo, a broken handle and a grid of unlabelled thumbnails.
2. **It answers the market's actual fear.** The audience is the one Florida legislated to protect from notarios in 2025. A visible, named, licensed attorney who speaks to them in their language is the strongest possible answer, and it is an answer no template can fake.
3. **Direction 1 alone scores well but underuses the firm.** So its mechanics are adopted wholesale — editorial grid, rules instead of cards, numbered sections, type as the identity — while the composition opens on a person. This is not a merge of two ideas; it is one idea (the person) given a rigorous structure (the record).
4. **Direction 3 is rejected on its core metaphor.** The visitor's dread is bureaucracy. Making bureaucracy the aesthetic is wrong even though the underlying insight — that nobody explains what happens next — is correct. That insight is kept and delivered as plain prose and numbered steps inside Direction 2, not as the site's visual language.
5. **One device is taken from Direction 3:** form numbers, dates and case metadata get tabular numerals and a distinct small treatment, so "I-130" and "N-400" read as the reference codes they are.

### What this commits us to

- The homepage opens on the attorney, not on a statement over a stock photograph.
- Practice areas are an editorial list of rows with a label, a plain-language line and an arrow. Not a grid of icon cards.
- Video is body content in a considered frame. Never a hero background, never autoplaying with sound.
- Photography is only of real people connected to the firm. No stock people anywhere, which also removes the Rule 4-7.13(b)(5) disclaimer problem entirely.
- The identity is carried by type, spacing and one dark band, not by a logo mark the firm does not have.

---

## 13. Anti-cliché commitments

Banned without a written conceptual reason: gavels, courthouse columns, scales of justice, US flag imagery and star fields (the current banner), the Statue of Liberty, handshakes, stock lawyers in suits, skyline shots, dark navy + gold as an identity, a serif headline over a gradient overlay as the whole personality, "Excellence"/"Trusted"/"Navigating the complexities" copy, stat counters, mission/vision/values trios, icon-card grids for services, and the Squarespace pill button.

Allowed and encouraged: the attorney's real face and bow tie, his own explainer videos and reel stills, documents and forms photographed as objects (later, with the client), Orlando as a place (Kirkman Road, the office), typography as the identity, numbered indices, rules and columns instead of cards.

---

---

## 14. Brand palette: extract, then decide

### 14.1 What exists today

Pulled from the live Squarespace theme variables and the compiled `site.css`:

| Role | Value | Where it appears |
|---|---|---|
| Accent | `hsl(204.4 79.5% 38.2%)` ≈ **#1474AE** | Buttons, links, the "¿Qué hacemos?" band, the banner ground |
| Dark accent | `hsl(209 52.7% 71%)` ≈ **#8FB4DA** | The flag stars in the banner |
| Light accent | `hsl(240 10.5% 92.5%)` ≈ **#E9E9EE** | The page ground on most sections |
| Ink / paper | Black and white | Text and alternating bands |
| Secondary mark | A thin red rule | Under the banner wordmark |

There is **no logo**. The header is the text string "Campos Immigration Law" set in the theme font, and the favicon is `assets.squarespace.com/universal/default-favicon.ico`, the Squarespace default. So there is no logo palette to be faithful to, only a theme accent.

### 14.2 The decision: evolve, and say why

The blue is retired. The reasons are specific rather than aesthetic:

1. **It is not brand equity, it is a theme default.** No logo carries it, no printed material was found using it, and the site it appears on has an empty meta description, a default favicon, and five indexed pages. There is almost nothing to protect.
2. **It is the category colour.** Every competitor audited uses blue or navy. Keeping it guarantees the site looks like the market it needs to stand apart from.
3. **It is welded to the thing being removed.** The blue only reads as "the brand" because of the flag-star banner, which is a Bar-sensitive cliché and the first asset being replaced.
4. **It fails the direction.** Direction 2 needs a ground that feels like paper and a dark band that feels institutional and warm. A saturated mid-blue on cold grey delivers neither.

What is carried forward: a single dominant colour used with discipline, and the red rule's function, which was to give the identity one sharp mark. That function survives as the accent.

### 14.3 The proposed palette, with measured contrast

Deep green as the institutional colour, warm paper as the ground, clay as the single accent. Green is drawn from the attorney's own linen jacket in the two best existing photographs, which makes it a real brand fact rather than a mood board choice, and it is used by none of the twelve competitors audited.

| Token | Value | Job |
|---|---|---|
| `--paper` | `#FAF8F4` | Page ground |
| `--paper-2` | `#F1EDE6` | Alternate section ground, input fills |
| `--ink` | `#16211C` | Body and display text |
| `--ink-2` | `#4A5A52` | Secondary text, captions |
| `--green` | `#1F4034` | Institutional band, primary buttons |
| `--green-deep` | `#132A22` | Deepest band, footer |
| `--clay` | `#B4553A` | The single accent: marks, rules, non-text UI |
| `--clay-ink` | `#8F4029` | Accent text and links |
| `--line` | `#DDD7CC` | Decorative hairlines only |
| `--line-strong` | `#8A8071` | Form control borders |

Contrast ratios, computed rather than assumed:

| Pair | Ratio | Verdict |
|---|---|---|
| ink on paper | 15.61 | AAA |
| ink-2 on paper | 6.89 | AA at all sizes |
| green on paper | 10.75 | AAA |
| white on green | 11.41 | AAA |
| white on green-deep | 15.20 | AAA |
| clay-ink on paper | 6.75 | AA at all sizes |
| clay on paper | 4.60 | AA normal, but reserved for large text and non-text UI |
| white on clay | 4.88 | AA normal only, so clay is not a button fill for small labels |
| line on paper | 1.35 | Decorative only, never a control border |
| line-strong on paper | 3.66 | Passes WCAG 1.4.11 for control borders |

Three rules fall out of those numbers and are written into the design system:

- **Links and small accent text use `--clay-ink`, not `--clay`.** Clay at 4.60 is too close to the floor for body-size text.
- **Form borders use `--line-strong`.** The hairline at 1.35 is invisible to WCAG 1.4.11 and would have shipped as a failure.
- **The focus ring is surface-aware.** No single colour clears 3:1 on both grounds: clay on paper is 4.60 but clay on green is 2.34. So the ring is `--clay-ink` on paper surfaces and `--paper` on green surfaces, set by a variable that the dark band redefines.

### 14.4 What still needs the client

The green is a proposal, not a fact about the firm. If Juan has printed material, a business card, or a mark he considers his brand, that governs and the palette is rebuilt around it. **[CLIENT VERIFICATION REQUIRED]**

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

---

## 16. Open questions for the client

Grouped by whether they block the build, block the launch, or improve the result. Nothing here is invented on the site; every item is either omitted or drafted and marked pending.

### Blocks the build

1. **Is the Orlando Campos Immigration Law the same attorney as the New Orleans Campos Muños Law?** The two firms share a surname, an Instagram handle and a phone-adjacent identity, and the sibling repository contains a full biography for "Juan Campos-Gutierrez, Esq." If they are the same person, that biography is the starting draft. If not, the Orlando attorney's biography must come from him. Everything on the About page depends on this answer.
2. **The exact list of matters the firm handles.** The site will present a practice architecture; Rule 4-7.13(b)(4) forbids listing areas the firm does not practise. A checklist is provided in `CONTENT_REVIEW.md`.
3. **Consultation policy and price.** Free, paid, or a free screening plus a paid strategy session. If paid, the amount and whether it is credited against fees. No competitor publishes this, which makes it the single biggest differentiator available.

### Blocks the launch

4. Official Florida Bar name and bar number, admission year, and law school, for the footer and the attorney page.
5. Federal court and agency admissions, if any are to be listed.
6. Memberships to be listed: AILA, county or Hispanic bar associations, and in what exact form.
7. Languages: who at the firm speaks Spanish, and whether the attorney conducts consultations in Spanish personally. Rule 4-7.14(a)(2) makes a literally-true "hablamos español" risky if the client would need an interpreter to speak to the lawyer.
8. Does the Kirkman Road office meet the Bar's bona-fide-office test: firm name on the building directory, staff answering calls there, a lawyer present on a regular and continuing basis?
9. Confirmation of hours, and whether there is any after-hours or emergency contact.
10. Whether the firm wants Google reviews displayed. If yes, the six conditions in Rule 4-7.13(b)(9) apply, including a Spanish disclaimer on Spanish reviews.
11. Approval of the contact form's cautionary statement and of what the form is allowed to ask.
12. Where lead notifications should go, and whether WhatsApp or SMS should be offered as a channel.
13. Sign-off on the nationwide-practice sentence and the "no somos notarios" clarifier.

### Improves the result

14. Photography: a session covering the attorney in the office, hands and documents, the building, and the team if there is one. See `ASSET_PLAN.md`.
15. Any existing brand material: a logo, a business card, letterhead, printed colours.
16. Permission to use the three television interview stills and clips, and the dates and programme names for each.
17. Access to the video library used on Instagram, with the Spanish captions, so the resources area can launch with real content.
18. Whether the firm wants an updates or resources section it will actually maintain. An abandoned blog is worse than none.
19. Whether to keep a Squarespace-era cart route or drop commerce entirely.
20. Analytics preference, and consent handling for it.

---
