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

**Confirm two imported images.**

1. **The environmental photograph on the attorney page** is a frame lifted from one of the firm's own Spanish explainer videos, cropped to remove the other firm's watermark. It shows the attorney at a desk with framed diplomas behind him. It is captioned as him at work and **never** as the Orlando office, because the room has not been confirmed. Confirm which office it is and whether it may be used.
2. **The texture behind the statement band** is a dark, near-abstract detail of flag fabric from the same asset library. It is a material, not a flag hero: no waving flag, no seal, and a heavy overlay. Confirm the direction.

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
