# Page Blueprints

Campos Immigration Law. One entry per major template: what the page is for, who lands on it, what it must contain, in what order, and what changes on a phone. Wireframes are structural, not prescriptive layouts.

Conventions: `ES` is the default language at the root, `EN` under `/en/`. Every page carries the firm name, the Orlando location, the language switch, phone, payment and the legal band.

---

## Home — `/`

**Objective.** In five seconds on a phone: this is a real, named immigration attorney in Orlando who speaks Spanish. In thirty seconds: find your situation, or find the way to reach him.

**Audience.** Mostly audience 1, arriving from a search for an Orlando immigration lawyer, from an Instagram reel, or from a referral.

**Search intent.** Navigational and local-commercial.

**Primary CTA.** Agendar consulta. **Secondary.** Llamar, and the situation finder.

```
01 / Header
     wordmark · Servicios · El abogado · Consulta · Preguntas · Recursos · ES|EN · [Agendar consulta]
     second tier on desktop: phone · Pagar

02 / Opener                                                    full viewport height, paper ground
     left  (cols 1–6)   eyebrow: Abogado de inmigración · Orlando, Florida
                        display heading, masked line reveal:
                          "Inmigración es lo único que hacemos."
                        lead: one sentence naming who he is and that he explains
                          your case in your language
                        [Agendar consulta]  [Llamar (407) 418-9193]
     right (cols 7–12)  the attorney portrait, 4:5, fade and settle
     no scroll indicator, no rotating slider, no flag, no stock

03 / Situation finder                                          paper-2 ground
     heading: ¿Cuál es su situación?
     eight plain-language routes, two columns on desktop, one on mobile
     each is a link to a practice group. Nothing is collected, nothing is scored.

04 / Practice groups                                           paper ground
     eyebrow + heading: Lo que hacemos
     six ServiceRow groups. Each group: a clay rule, the group name,
     one plain line, then its matters as rows with form numbers.
     No cards, no icons.
     foot: Ver todos los servicios (A–Z) →

05 / The attorney                                              green band
     eyebrow: El abogado
     a short first-person passage, three or four sentences, not a bio dump
     one portrait
     credentials as a plain list: admission, languages, memberships
     [Conocer al abogado] →

06 / Why this firm                                             paper ground
     three plain statements, set as type, not as cards:
       Inmigración es lo único que hacemos.
       Le explicamos su caso hasta que lo entienda.
       Usted siempre sabrá qué sigue y cuándo.
     Each is a claim the site then has to keep.

07 / In the media                                              paper-2 ground
     eyebrow: En los medios
     the television stills, presented factually: outlet, programme, topic, date
     no "as seen on" styling, no endorsement implication

08 / How a consultation works                                  paper ground
     three numbered steps, editorial numerals in the margin
     what it costs, what you get, what to bring          [CLIENT VERIFICATION]
     [Agendar consulta]

09 / Office and contact                                        green-deep band
     address as a map link · phone · email · hours · languages
     a photograph of the building entrance
     "Somos un bufete de abogados con licencia en Florida. No somos notarios."

10 / Footer
```

**Mobile differences.** The opener becomes portrait-above-heading, sized so the heading, the lead and both buttons are visible without scrolling on a 375 × 667 screen. The situation finder becomes a single column of full-width rows. Practice groups collapse to accordions, open at the first group. The persistent bottom bar carries Llamar and WhatsApp.

**Motion.** The signature masked line reveal on 02. Fade-and-settle on the portrait. Quiet fades elsewhere. Nothing else.

**Internal links.** Every practice group, the attorney, consultation, detention, A-Z index.

**SEO.** Title and description target the primary Spanish local query. `LegalService` plus `Attorney` structured data. This is the only page carrying the organisation node.

---

## Attorney — `/abogado/` · `/en/attorney/`

**Objective.** Convert credibility into contact. This is the page that answers "is he real, and is he for me".

**Audience.** Everyone, but decisively audiences 2 and 5.

**Primary CTA.** Agendar consulta.

```
01 / Header
02 / Opener            name · eyebrow with role · portrait 4:5 · one-line positioning
03 / First person      why immigration law. Origin, route, what he does now.
                       Written as him, in his voice, three to five paragraphs.
                       [CLIENT VERIFICATION — every fact]
04 / Credentials       plain list, not badges:
                       Admisiones · Educación · Membresías · Idiomas
                       each item exact and verifiable                [CLIENT VERIFICATION]
05 / What he handles   links into the six groups
06 / Media             the interview stills, factually captioned
07 / How he works      three short statements, the promises from the home page,
                       expanded by one sentence each
08 / Contact           [Agendar consulta] · phone · office
09 / Footer
```

**Mobile.** Portrait first at 4:5, then name, then the first-person passage. Credentials become a definition list rather than a two-column table.

**SEO.** `Person` structured data, which the best-in-class research found most firms omit and which is the cheapest credibility upgrade available. `sameAs` to the confirmed social profiles.

---

## Services hub — `/servicios/` · `/en/services/`

**Objective.** Let someone find their matter whether they think in problems, in form numbers, or in neither.

```
01 / Header
02 / Opener          heading + one line: what the firm does and does not handle
03 / Situation finder repeated, above the list
04 / The six groups   full ServiceRow lists, anchored so the header panel can deep-link
05 / A–Z index        every matter alphabetically, Spanish name with form number
06 / Not sure         a short block pointing to the consultation
07 / Footer
```

**Mobile.** Groups are accordions; the A-Z index stays a plain list, which is faster to scan than any control.

---

## Matter page — `/servicios/<matter>/`

The most numerous template and the one that carries the search traffic.

**Objective.** Explain one matter clearly enough that a stressed reader knows whether it applies to them, then give one next step.

**Search intent.** Informational shading into commercial: "abogado de asilo Orlando", "cuánto tarda el asilo".

```
01 / Header
02 / Breadcrumb        Inicio › Servicios › Protección humanitaria › Asilo
03 / Opener            eyebrow: group name · H1: matter name
                       form number in tabular figures
                       lead paragraph: who this is for, in one sentence
04 / Para quién es     three to five plain bullets. The reader self-identifies here.
05 / Qué es            the plain explanation. Prose, not bullets.
                       Terms glossed on first use.
06 / Cómo funciona     numbered steps with editorial numerals.
                       Realistic language about timing, with a dated note that
                       government processing times change.
07 / En qué ayudamos   what the firm actually does on this matter.
                       Process statements only: revisamos, preparamos, presentamos,
                       lo acompañamos. No outcome language.
08 / Preguntas         three to five real questions as <details>. Fragment ids on the
                       content, never on the summary, so a deep link opens the answer.
09 / Relacionados      two or three sibling matters
10 / Siguiente paso    [Agendar consulta] + phone + the general-information notice
11 / Footer
```

**Visual direction.** Type-led. At most one photograph, and only if a real one exists. A service page with no image and good typography beats one with a stock pen.

**Mobile.** Identical order. The steps become a vertical list with the numeral above rather than beside.

**SEO.** One canonical per matter, hreflang pair to its translated slug, `FAQPage` markup only where the questions genuinely match the page and only in line with current rich-result eligibility.

---

## Consultation — `/consulta/` · `/en/consultation/`

**Objective.** Remove every reason not to make contact.

```
01 / Header
02 / Opener        heading: Agendar una consulta
                   one line on what a consultation is and is not
03 / What it costs what you get, how long, in what language        [CLIENT VERIFICATION]
                   If there is a fee and it is credited against fees, say so.
                   If costs are extra, say so — Rule 4-7.14(a)(7).
04 / What to bring a short list: documents, notices, dates, previous filings
05 / What happens  three numbered steps, including how soon someone replies
06 / The form      name · phone · email · preferred language · general topic
                   Deliberately no case narrative field.
                   Above the button, in the page's language:
                     "Enviar este formulario no crea una relación abogado-cliente..."
07 / Other ways    phone · WhatsApp · email · office hours · address and map
08 / Footer
```

**Why the form is short.** Rule 4-1.18 makes anyone who submits information a prospective client where the site invited the submission without cautionary statements, and immigration intake is exactly the sensitive material a public form should not collect. Contact details plus a topic keeps the public form on the safe side; the detailed questionnaire happens after a conflict check.

**Mobile.** The form is the second thing on the page, after the cost block. Inputs are 48px, labels always visible, the keyboard type set per field, and errors appear as text beside the field in the page's language.

---

## Detained — `/detenido/` · `/en/detained/`

**Objective.** Be useful in the worst hour of someone's week. This page is not marketing.

```
01 / Header
02 / Opener       heading: Detuvieron a un familiar. Qué hacer ahora.
                  no imagery, no eyebrow flourish, immediate
03 / Right now    a short numbered list of practical actions
04 / What to have full name, date of birth, country of birth, A-number if known,
                  where and when they were detained
05 / How to find  the government locator, explained plainly, with the caution
                  that it can take time to appear
06 / How we help  process statements only. No promises about release or outcome.
07 / Reach us     phone first, large. WhatsApp. Hours, and what to do outside them.
08 / Footer
```

**Tone rule.** No sales language anywhere on this page. No "let us fight for you". Rule 4-7.15(a) also rules out any imagery that dramatises detention or family separation.

**Discoverability.** Linked from the home page, the header, and the removal-defence matter page. This is the page the market does not have.

---

## FAQ — `/preguntas/` · `/en/faq/`

Answers the eight anxieties from the content strategy directly, grouped, as `<details>`. Each answer is two to four sentences and links to the relevant matter page. Carries the general-information notice.

---

## Orlando — `/orlando/` · `/en/orlando/`

**Objective.** Own the practical local knowledge nobody publishes: where the USCIS field office is, where the immigration court is, how to get there, what to expect, what to bring. Useful first, ranking second.

---

## Resources — `/recursos/` and `/recursos/<article>/`

Launches only with real articles derived from explainers the attorney has already produced. Each article: author, date, last reviewed, the general-information notice, and a link to the matter it relates to. An abandoned blog is worse than none, so this section ships only if the client commits to it.

---

## Payment — `/pagos/` · `/en/payment/`

Two clearly labelled paths, invoice versus new-matter deposit, each going to the correct LawPay destination, plus what happens after paying and who to contact about a bill. The existing LawPay URL is preserved exactly.

---

## Legal — `/aviso-legal/` and `/privacidad/` (removed 2026-09-10: camimlaw.com publishes neither, and nothing is drafted for the client; see CONTENT_REVIEW.md §1.1b)

The advertising disclosures, the general-information notice, the no-attorney-client-relationship statement, and the privacy policy. Both languages, both linked from the footer of every page.

---

## 404

Says what happened in plain language, offers the search-free routes people actually want: services, the attorney, consultation, phone. Returns a real 404 status, not a soft 200 — the sibling project shipped soft-404s and had to fix them later.
