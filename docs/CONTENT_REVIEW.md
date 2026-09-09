# Content Review

Everything on the site that needs the attorney's confirmation, in the order it blocks work. Each item says where it lives in the code, so a yes or no is a one-line change.

Nothing marked here is currently asserted on the site as fact. Unverified values do not render at all; the mechanism is the `verified` flag in `site/src/lib/org.ts` and the `status` field in `site/src/lib/services.ts`.

---

## 1. Blocks launch

### 1.1 Bar admission and jurisdiction

The research found no Florida Bar record for the attorney, and a Louisiana admission dating to 2020. The site therefore states, in the footer of every page and on the attorney page, that he is admitted in Louisiana and not in Florida, and explains that immigration is federal practice.

**Confirm:** the exact admission wording, the Louisiana bar roll number if it is to be published, the admission date, and any federal court or agency admissions worth listing.

**Where:** `ATTORNEY.admissions`, `ATTORNEY.notAdmittedIn`, `ATTORNEY.barNumber` in `site/src/lib/org.ts`.

**Why it matters:** Rule 4-7.21(d) and the Rule 4-7.11 comment. His own Instagram and Facebook already say "Licenciado en Louisiana"; the website currently says nothing.

### 1.2 The list of matters the firm handles

Only asylum ships today, because it is the only service the current site publishes. Fifteen more are drafted or designed, and none renders until confirmed.

**Confirm each: yes or no.**

| Matter | Status in code | Evidence |
|---|---|---|
| Asilo | live | Published on camimlaw.com today |
| Peticiones familiares (I-130) | pending, drafted | Sister firm page; his own posts about I-130 approvals |
| Residencia por matrimonio | pending | Instagram biography; the most-named matter in Google reviews |
| Ajuste de estatus (I-485) | pending | Sister firm page; consultation form option |
| Visa de prometido (K-1) | pending | Sister firm page |
| Trámite consular | pending | Sister firm page; biography references the State Department |
| Ciudadanía (N-400) | pending, drafted | Sister firm page; consultation form option |
| Residencia permanente | pending | Sister firm page |
| VAWA (I-360) | pending, drafted | Sister firm page; consultation form option |
| Visa U (I-918) | pending, drafted | Sister firm page; consultation form option |
| Visa T (I-914) | pending | Sister firm page |
| Defensa contra la deportación | pending, drafted | Sister firm page; recurring court-procedure content |
| Permiso de trabajo (I-765) | pending | Sister firm page |
| DACA | pending | Sister firm page |
| Fianza de inmigración | draft, no copy | Designed into the architecture only |
| Perdón I-601A | draft, no copy | Not listed on either site, but he posts about waivers |

**Where:** the `status` field on each matter in `site/src/lib/services.ts`. Change `"pending"` to `"live"` to publish.

**Why it matters:** Rule 4-7.13(b)(4) forbids advertising areas the firm does not practise.

### 1.2b Every legal statement on the asylum page, and where it came from

The asylum page is the only page on this site that states immigration law, and
it is the only practice page that ships. Its substance was taken from what
camimlaw.com already publishes, rewritten for plainer Spanish and shorter
sentences. It was not composed from general knowledge, and nothing on it is
invented. This table is the audit, so the review is a comparison rather than a
re-derivation.

**Already published on camimlaw.com. Same substance, new wording.**

| Statement on the new page | On the current site |
|---|---|
| Asylum protects people already in the United States who cannot return because of persecution or a well-founded fear of it | Yes |
| The grounds are race, religion, nationality, political opinion, membership of a particular social group | Yes |
| Asylum and refugee status protect the same class of person and differ in where you apply | Yes |
| If asylum is granted you may live and work here, and may apply for permanent residence one year later | Yes |
| A spouse and unmarried children under 21 may be included if they are in the United States | Yes |
| Applications filed more than a year after arrival are restricted, with exceptions | Yes ("cambios o circunstancias extraordinarias") |
| The affirmative route runs before a USCIS asylum officer; the defensive route before an immigration judge | Yes |
| If the asylum officer does not grant, the case is referred to an immigration judge and there is another opportunity | Yes |
| Travelling back is inadvisable; a pending applicant may seek a travel document for brief emergency travel, and without prior approval USCIS may treat the application as abandoned | Yes |
| Processing time varies by jurisdiction and by asylum office caseload | Yes |
| After a certain number of days with a properly filed pending application you may request employment authorisation, and the work permit cannot be used to travel or re-enter | Yes, near-verbatim, including the deliberate vagueness of "a certain number of days" |

**Not on the current site. Added in this draft, and needs his yes or no.**

| Addition | What it is | Why it was added |
|---|---|---|
| **Form I-589** | The asylum application form number, named three times plus the page description | People search by form number, and naming it is how the page answers that search. The current site never mentions it. |
| **Form I-765** | The employment authorisation form number, in the work-permit answer | Same reason. Also never mentioned on the current site. |
| **"If you hold a valid status you may remain under it"** | The other half of the answer about a non-grant by the asylum office | The current site describes only the referral to a judge. This sentence is correct but it is an addition. |
| **Orlando Immigration Court, 3535 Lawton Road, Suite 200, Orlando, FL 32803** | A government address, in `COURT` in `org.ts`, sourced to EOIR | Local specificity for the defensive-asylum section. Not client-supplied. Confirm it is the court he actually appears in. |

**Deliberately dropped from the current site's version.** Each was on camimlaw.com
and is not carried over: the Convention Against Torture paragraph, the claim
that USCIS has *eleven* asylum offices, and the statement that a work permit
*may be approved for two years*. The first needs its own page rather than a
footnote; the second and third are numbers that go stale.

**Where:** the `asilo` matter in `site/src/lib/services.ts`, and `COURT` in
`site/src/lib/org.ts`.

**Why it matters:** Rule 4-7.13(a)(1) — a material statement that is factually
or legally inaccurate makes the whole advertisement deceptive. Form numbers and
eligibility statements are exactly that kind of material statement.

### 1.2c The byline does not claim he wrote or reviewed the page

The practice-page byline reads "Juan Campos, Esq. · Admitido en Louisiana
Supreme Court (2020) · Última actualización 2026-09-09". It names the
responsible attorney, which Rule 4-7.12 requires, and claims nothing more.

An earlier draft read "Escrito y revisado por Juan Campos, Esq." That was
removed: it asserts an attorney review that has not happened, which is itself a
factually inaccurate statement under Rule 4-7.13(a)(1).

**To turn it back on, once he has actually read the page:** set
`ORG.copyReviewedByAttorney` to verified in `site/src/lib/org.ts`. The byline
then reads "Escrito y revisado por" again. Nothing else changes.

### 1.3 The consultation

Not published anywhere today. Not on either firm's site, not on any directory. Avvo says it has found no cost information.

**Confirm:** free, paid, or a free screening plus a paid strategy session. If paid, the amount, whether it is credited against fees, and how long it lasts. Whether government filing fees are stated as separate.

**Where:** `ORG.consultation` in `site/src/lib/org.ts`. Until set, the consultation page says the cost will be confirmed before booking.

**Why it matters:** no competitor publishes a number, so this is the single largest differentiator available. Rule 4-7.14(a)(7) requires any advertised fee to disclose whether costs are extra and to be honoured for 90 days.

### 1.4 Hours

Three published answers exist: 9am-7pm on the website, 8am-5pm on Google, "always open" on Facebook. The build uses Google, because that is what prospects see.

**Confirm the real hours, then correct all three surfaces.**

**Where:** `ORG.hours`.

### 1.5 The office

5401 S. Kirkman Road is the Regions Bank Building, which hosts Execu-Suites executive and virtual offices.

**Confirm:** is Suite 324 a full-time private office with staff answering calls there, a day-office arrangement, or a mail address?

**Where:** `ORG.officeIsStaffed`.

**Why it matters:** it decides whether the Bar's bona-fide-office criteria are met for Rule 4-7.12(a)(2), whether the site should invite people to visit, and whether office photography makes sense.

### 1.6 Is the Orlando practice staffed?

The current site says "abogados" and "nuestros abogados" in the plural. Sunbiz lists one manager and no other Orlando attorney could be identified. **The redesign is written in the singular.** Confirm whether that is right, and whether there is staff to include.

### 1.7 Where leads go

The contact endpoint accepts submissions and logs them, but delivers nothing until an inbox is configured. **Confirm the address**, and whether WhatsApp or SMS should be offered.

**Where:** `LEAD_INBOX`, `LEAD_FROM`, `RESEND_API_KEY` in the environment; `ORG.whatsapp` for the channel.

### 1.8 Reviews

The firm has 5.0 stars from 59 Google reviews with substantive owner replies, and this appears on the current website zero times. The redesign states it as a sentence.

**Confirm** whether to display reviews at all. If individual reviews are quoted, Rule 4-7.13(b)(9) imposes six conditions including client consent and a results-may-differ disclaimer in the same language as the review. **No `AggregateRating` schema is emitted on our own domain**, deliberately: Google's review-snippet guidance makes self-serving reviews ineligible and it is a documented manual-action risk.

### 1.9 Media

Two television stills ship, both currently hidden pending confirmation.

**Confirm** the broadcaster, programme name and date for each, and permission to republish.

**Where:** `MEDIA` in `site/src/lib/org.ts`, `verified: false` on both.

The Univision still was **dropped**: it is a photograph of a studio monitor at 960px and carries another law firm's sponsor logo in frame.

---

## 2. Blocks a complete site

### 2.1 Draft copy to approve

Full drafts exist for asylum, VAWA, U visa, deportation defence, citizenship and family petitions. Each has a summary, who it is for, a plain explanation, numbered steps, what the firm does, and three to five FAQs, in both languages.

**These are drafts written from public sources and general immigration law. They need a lawyer's read for accuracy before anything publishes.** Review them at `PUBLIC_REVIEW_BUILD=1 npm run build`, where they render behind a banner.

### 2.2 Brand

There is no logo. The header is a text wordmark and the favicon is the Squarespace default. The redesign draws a wordmark from the type system and a monogram favicon.

**Confirm** whether any existing mark, business card, letterhead or printed colour exists that should govern instead.

### 2.3 The palette

Deep green, warm paper, clay accent. The green is drawn from the attorney's own jacket in the existing photography. The retired blue was a Squarespace theme default carried by no logo.

**Confirm** the direction.

### 2.4 Photography

**Confirm three imported images.**

1. **The seated portrait** now carries the home page, the attorney page and the gallery. It comes from the firm's own Google Business Profile for the Orlando entity, fetched at full resolution rather than as the 228px thumbnail the listing shows. It is a professional environmental portrait: seated in a wooden chair, a real room, symmetric composition. **Confirm permission and whether the photographer needs a credit.**
2. **The environmental photograph in the biography** is a frame lifted from one of the firm's own Spanish explainer videos, cropped to remove the other firm's watermark. It is captioned as him at work and **never** as the Orlando office, because the room has not been confirmed. Confirm which office it is and whether it may be used.
3. **The texture behind the statement band** is a dark, near-abstract detail of flag fabric. It is a material, not a flag hero: no waving flag, no seal, and a heavy overlay. Confirm the direction.

Deliberately **not** used from that library, and why:

| Asset | Why not |
|---|---|
| Statue of Liberty | The category cliché the brief bans |
| A man sitting dejected in a corner | Synthetic stock imagery of a distressed person; the advertising rules treat emotionally manipulative imagery as unduly manipulative |
| A couple at a wedding | Stock, not clients; presenting it as a client story would be fabrication |
| Photograph with a founding partner of the other firm | She does not work at the Orlando firm; including her would imply she does |
| Team photograph, other headshots | New Orleans staff |
| Louisiana and Michigan bar badges | The Michigan badge belongs to his partner, not to him |
| Gavel and courthouse stock frames | Banned clichés |

**The eleven Spanish explainer videos are the largest unexploited asset the firm owns** and the site is built to hold them. They are 17 to 64 MB each, so they need hosting decided before they ship. Confirm.

One excellent studio portrait exists. See `ASSET_PLAN.md` for what is still missing.

### 2.5 Resources

`/recursos/` is designed but not built, because an abandoned blog is worse than none. He publishes weekly in Spanish and has a 477,000-view YouTube channel; that content is a ready-made editorial calendar.

**Confirm** whether the firm will maintain it.

---

## 3. Copy that must not appear

Drawn from the Florida rules research. None of it is on the site; this is the list to hold future copy against.

- Any superlative: best, top, number one, leading, premier, most experienced.
- Any guarantee or prediction of outcome.
- Any success or approval rate.
- "Specialist", "expert", "specializes in immigration" without board certification or documented objective verification.
- "Board certified" without the certificate.
- "Licensed in all 50 states" or "offices nationwide".
- "Notario", "notaría", "consultor de inmigración", "especialista en inmigración".
- Combined or non-lawyer years presented as one lawyer's experience.
- Award badges without the exact award name, organisation and year.
- The Florida Bar seal, or any government-style seal.
