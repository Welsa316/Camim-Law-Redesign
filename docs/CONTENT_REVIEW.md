# Content Review

Everything on the site that needs the attorney's confirmation, in the order it blocks work. Each item says where it lives in the code, so a yes or no is a one-line change.

Nothing marked here is currently asserted on the site as fact. Unverified values do not render at all; the mechanism is the `verified` flag in `site/src/lib/org.ts` and the `status` field in `site/src/lib/services.ts`.

---

## 0. The copy rule, and how it is enforced

**Nothing on this site was written for it.** On the client's instruction of
2026-09-10, every visible string is one of:

1. word-for-word from camimlaw.com (its home, about, services, contact and
   asylum pages, captured in `docs/sources/camimlaw.com.json` and `.blocks.json`);
2. word-for-word from Campos Muños Law's site (camulaw.com), its ES/EN
   dictionaries and service pages (`docs/sources/camulaw.com.*.json`), or the
   firm's own source documents and video transcripts
   (`docs/sources/camulaw-source-documents/`);
3. a value from a checked record in `site/src/lib/org.ts` (a name, number,
   address, date, admission, degree, form number).

`site/verify/copy-provenance.py` renders every route of the build in both
languages, extracts every text node, alt, title, aria-label, page title and
meta description, and fails unless each one is a whole sourced line, a whole
record value, a sourced fragment of twelve or more characters, or a compound
of whole sourced parts (a label beside a phone number; a headline the reveal
has split into lines). It writes the result to `docs/COPY_PROVENANCE.md`.
Run it after any change to copy. A failing gate is a string somebody wrote.

**Fragments promoted to headings.** The gate accepts a sourced fragment of
twelve characters or more, and the home page now uses four of them as display
type: "Nos esforzaremos por tratarlo como familia" / "We will strive to treat
you like family" and "Nos aseguraremos de que comprenda lo que está sucediendo
con su caso" / "We will make sure you understand what is happening with your
case" are both clauses of camimlaw.com's own "¿Por qué elegirnos?" paragraph,
and "Agende su consulta" / "Schedule your consultation" is camulaw.com's
"Agende Su Consulta Ahora" without the last word. The words are the firm's
own and their order is unchanged; what this site added is a capital letter, a
full stop and the decision to set them large. **The firm should read them as
headlines rather than as sentences in a paragraph**, because that is how a
visitor will now meet them — and because Rule 4-7.13 reaches a claim more
readily when it is the first thing on the screen.

**What was removed to get there.** The FAQ, detained-relative and Orlando
pages; the situation finder, the commitments, the consultation steps, the
first-person attorney narrative, every disclaimer, every meta description
and alt text that had no source. Sixteen practice areas written here were
replaced by Campos Muños Law's fourteen, on the instruction that this firm's
services are the same.

**Omitted, not rewritten.** Campos Muños Law's pages name that firm, its city
and its state, and address the reader as that firm. Those blocks are dropped
whole; nothing is edited to say "Campos Immigration Law" instead, because that
would be a new claim about this firm. Every omission:

| Service | Lang | Block | Text | Why |
|---|---|---|---|---|
| greenCard | es | heading | ¿Cómo le ayuda nuestra firma?… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| greenCard | es | paragraph | En Campos Muños Law ayudamos a cada cliente a entender qué opciones reales tiene, a identificar posibles riesg… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| greenCard | es | paragraph | Contáctenos si desea iniciar o revisar su proceso de green card.… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| greenCard | en | heading | How Our Firm Helps… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| greenCard | en | paragraph | At Campos Muños Law, we help each client understand their real options, identify potential risks from the star… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| greenCard | en | paragraph | Contact us if you would like to begin or review your green card process.… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| peticionesFamiliares | es | heading | ¿Cómo le ayuda nuestra firma?… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| peticionesFamiliares | es | paragraph | En Campos Muños Law ayudamos a cada familia a identificar el tipo de petición que corresponde a su situación y… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| peticionesFamiliares | es | paragraph | Contáctenos si desea conocer qué tipo de petición familiar corresponde a su caso y dar el siguiente paso con l… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| peticionesFamiliares | en | heading | How Our Firm Helps… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| peticionesFamiliares | en | paragraph | At Campos Muños Law we help each family identify the type of petition that fits their circumstances and prepar… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| peticionesFamiliares | en | paragraph | Contact us if you would like to find out which family petition applies to your case and take the next step wit… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| ciudadania | es | heading | ¿Cómo le ayuda nuestra firma?… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| ciudadania | es | paragraph | En Campos Muños Law ayudamos a cada cliente a evaluar si realmente está listo para dar este paso, a identifica… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| ciudadania | es | paragraph | Contáctenos si desea evaluar su elegibilidad o iniciar su proceso de ciudadanía.… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| ciudadania | en | heading | How Our Firm Helps… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| ciudadania | en | paragraph | At Campos Muños Law, we help each client assess whether they are truly ready to take this step, identify possi… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| ciudadania | en | paragraph | Contact us if you would like to review your eligibility or begin your citizenship process.… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| defensaDeportacion | es | heading | ¿Cómo le ayuda nuestra firma?… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| defensaDeportacion | es | paragraph | En Campos Muños Law representamos a cada cliente con preparación, análisis estratégico y verdadero compromiso.… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| defensaDeportacion | es | paragraph | Contáctenos si tiene una audiencia en la corte de inmigración y desea evaluar sus opciones de defensa.… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| defensaDeportacion | en | heading | How Our Firm Helps… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| defensaDeportacion | en | paragraph | At Campos Muños Law, we represent each client with preparation, strategic analysis, and genuine commitment. Ou… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| defensaDeportacion | en | paragraph | Contact us if you have a hearing in immigration court and would like to review your defense options.… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| visasJovenes | es | heading | ¿Cómo le ayuda nuestra firma?… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| visasJovenes | es | paragraph | En Campos Muños Law atendemos los casos de Visa Especial para Jóvenes con cuidado y responsabilidad, acompañan… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| visasJovenes | es | paragraph | Contáctenos si desea evaluar si un menor a su cargo podría calificar para la Visa Especial para Jóvenes.… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| visasJovenes | en | heading | How Our Firm Helps… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| visasJovenes | en | paragraph | At Campos Muños Law, we handle Special Immigrant Juvenile cases with care and responsibility, standing beside … | names the sister firm, its city or state, or addresses the reader as the sister firm |
| visasJovenes | en | paragraph | Contact us if you would like to find out whether a minor in your care may qualify for Special Immigrant Juveni… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| asilo | es | h3 | Póngase en contacto con nuestros abogados si está solicitando la ciudadanía estadounidense y la naturalización… | a citizenship line on the asylum page; a paste error on the source site |
| asilo | es | p | Con la ayuda de nuestro exitoso equipo legal, los solicitantes de asilo pueden solicitarlo rápida y correctame… | 'exitoso equipo legal': a quality claim about a team, and a Rule 4-7.13 concern |
| asilo | en | paragraph | Our firm can also help applicants with work authorization issues, permanent residence applications, and family… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| vawa | es | heading | ¿Cómo le ayuda nuestra firma?… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| vawa | es | paragraph | En Campos Muños Law tratamos estos casos con empatía, respeto y experiencia. Le ayudamos a construir una petic… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| vawa | es | paragraph | Si algo de esto le resulta familiar, no está solo. Contáctenos, con total confidencialidad, para evaluar su ca… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| vawa | en | heading | How Our Firm Helps… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| vawa | en | paragraph | At Campos Muños Law we handle these cases with empathy, respect, and experience. We help you build a strong pe… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| vawa | en | paragraph | If any of this sounds familiar, you are not alone. Contact us, in full confidence, to review your case.… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| daca | es | paragraph | Nuestro equipo de abogados de inmigración está formado por profesionales de distintos orígenes y áreas de espe… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| tramiteConsular | es | heading | ¿Cómo le ayuda nuestra firma?… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| tramiteConsular | es | paragraph | En Campos Muños Law le acompañamos en cada etapa del trámite consular para ayudarle a evitar errores. Nuestra … | names the sister firm, its city or state, or addresses the reader as the sister firm |
| tramiteConsular | es | paragraph | Contáctenos o envíenos un mensaje si desea que nuestra firma le guíe en su trámite consular.… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| tramiteConsular | en | heading | How Our Firm Helps… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| tramiteConsular | en | paragraph | At Campos Muños Law, we accompany you at every stage of consular processing to help you avoid errors. Our firm… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| tramiteConsular | en | paragraph | Contact us or send us a message if you would like our firm to guide you through your consular process.… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| ead | es | heading | ¿Cómo le ayuda nuestra firma?… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| ead | es | paragraph | En Campos Muños Law revisamos si usted tiene un caso pendiente que lo haga elegible, le explicamos sus opcione… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| ead | es | paragraph | Contáctenos si desea revisar su elegibilidad para un permiso de trabajo.… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| ead | en | heading | How Our Firm Helps… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| ead | en | paragraph | At Campos Muños Law, we review whether you have a pending case that makes you eligible, explain your real opti… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| ead | en | paragraph | Contact us if you would like to review your eligibility for a work permit.… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| visaU | es | heading | ¿Cómo le ayuda nuestra firma?… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| visaU | es | paragraph | En nuestra firma contamos con experiencia acompañando a las víctimas de delitos desde el inicio, para determin… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| visaU | es | paragraph | Contáctenos si desea evaluar su caso de visa U y conocer las opciones disponibles para usted. En Campos Muños … | names the sister firm, its city or state, or addresses the reader as the sister firm |
| visaU | en | heading | How Our Firm Helps… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| visaU | en | paragraph | Our firm has experience guiding crime victims from the very beginning to determine whether they meet the requi… | names the sister firm, its city or state, or addresses the reader as the sister firm |
| visaU | en | paragraph | Contact us if you would like to review your U visa case and learn about the options available to you. At Campo… | names the sister firm, its city or state, or addresses the reader as the sister firm |

**Photographs on the home accordion.** On the client's instruction of
2026-09-10 the four featured panels carry stock photographs, Unsplash first
and the sister site's images as the fallback. All four came from Unsplash;
each was free to use under the Unsplash License on its photo page that day
(none is Unsplash+), and each is recorded in `docs/sources/images.json`. The
choices avoid the things the brief bans and the things the rules frown on:
no gavel, no scales, no flag, no Statue of Liberty, no posed "client" faces.
They are decorative on the page: the panel's own text is the link, so each
image carries an empty alt and no written description.

| Panel | Photographer | Unsplash page | Size |
|---|---|---|---|
| green-card | Jakub Żerdzicki (@jakubzerdzicki) | [hand-holding-keys-with-house-keychain-V7Q94jc04wQ](https://unsplash.com/photos/hand-holding-keys-with-house-keychain-V7Q94jc04wQ) | 2000×1334 |
| peticiones-familiares | rfp80 (@rfp80) | [a-group-of-people-looking-out-a-window-at-an-airplane-cKN6mJqP43U](https://unsplash.com/photos/a-group-of-people-looking-out-a-window-at-an-airplane-cKN6mJqP43U) | 2000×1333 |
| ciudadania | Kelly Sikkema (@kellysikkema) | [passport-book-RiUZQOfQ8XE](https://unsplash.com/photos/passport-book-RiUZQOfQ8XE) | 2000×1174 |
| defensa-contra-la-deportacion | fotomagi (@fotomagi) | [an-empty-courtroom-with-wooden-paneling-and-columns-Bh6u25Qv9qA](https://unsplash.com/photos/an-empty-courtroom-with-wooden-paneling-and-columns-Bh6u25Qv9qA) | 2000×1500 |

**Florida, not Louisiana.** Immigration law is federal and the imported
descriptions describe federal processes. The one place state law enters is
Special Immigrant Juvenile Status, which depends on a state-court order; the
imported text says "corte estatal" generically and names no Louisiana court.
The client should still read that page against Florida dependency-court
practice before launch.

**Statements on camimlaw.com itself that the firm should look at.** They are
reproduced verbatim because that is the rule, and each is the firm's own
published claim, but a Florida Bar reviewer would ask about them:

- "abogados atentos y dedicados" and "Nuestros abogados tienen diferentes
  antecedentes" (home): the records show one attorney.
- "Mi equipo y yo" (about): same question.
- "me comprometo a lograr el mejor resultado posible para nuestros clientes"
  (about): a statement about outcomes. Rule 4-7.13 and 4-7.14 reach promises
  and predictions of results.

**English.** camimlaw.com is Spanish with a few English fragments, so the
English site is built from Campos Muños Law's English: the fourteen service
pages, the biography, the consultation and payment pages, the labels. The
English home page carries only "Why Us?" and its paragraph, because the other
home sections exist only in camimlaw.com's Spanish. That asymmetry is the
source material, not an oversight.

**WhatsApp.** The phone bar's second button opens WhatsApp to the office
number, on the client's instruction. Whether that number is registered on
WhatsApp has not been checked here; if it is not, the button opens to nothing.
`ORG.whatsapp` in `org.ts`.

**The language switch.** Besides the header link, every page carries a
floating language button: bottom-left on screens from 1024px, and the third
button of the phone bar below that. Each shows the *other* language's name
with a flag beside it, the United States flag for English and the Mexican
flag for Spanish, on the client's instruction of 2026-09-10. One caution for
the firm: a flag stands for a country, not a language, and the firm's Spanish-
speaking clients in Orlando come from Puerto Rico, Venezuela, Colombia, Cuba
and elsewhere as much as from Mexico. If that reads wrong to the firm, the
flags switch off in one place (`FLAGS` at the top of
`site/src/components/LangWidget.astro` and the `<img>` in `MobileBar.astro`)
and the button keeps the language name alone. The flag artwork is the
`flag-icons` package (MIT), not a photograph; the ban on flags elsewhere on
the site is about hero imagery, and this is a 20px control.

**The preview build.** `site/scripts/build-demo.sh` produces `demo/` and
`demo.zip` at the repository root. Phase 1 is the landing page and the
attorney page, in both languages — four files and their assets, and nothing
else. The routes are named once, in `DEMO_ROUTES` in `site/src/lib/site.js`;
that list decides both which links render as live anchors and which pages the
script copies, and the script fails if the two ever disagree. Every link to a
page outside the list renders as plain text rather than an anchor, the pages
carry `noindex`, a `robots.txt` disallows crawling, and the script refuses to
finish if any internal link in the output points at a file the preview does
not contain. So the preview can go on a throwaway URL without exposing a page
nobody has reviewed, and without a dead link in front of the client.

To add a page to the preview, add its slug to `DEMO_ROUTES`. It is a build
output and is not committed; regenerate it with the script, then run the
normal build again, because the demo build overwrites `site/dist/`.

---

## 1. Blocks launch

### 1.1 Bar admission and jurisdiction

The research found no Florida Bar record for the attorney, and a Louisiana admission dating to 2020.

**This is the one place where the copy rule and the advertising rules pull
against each other, and it is currently unresolved.** The footer and the
attorney page carry Campos Muños Law's own sentence — "Juan está admitido para
ejercer la abogacía ante la Corte Suprema del Estado de Luisiana y es miembro
de la American Immigration Lawyers Association (AILA)" — because that sentence
is published by the firm and can be quoted. What the site no longer says,
because no published source says it anywhere, is the part a Florida reader
most needs: **that he is not admitted in Florida, and that immigration is a
federal practice.** Earlier drafts said both; the sentences were written here,
so the copy rule removed them along with everything else that had no source
(commit `4b13c67`).

Stating a Louisiana admission without the Florida limitation is a weaker
position than saying nothing at all, because the site is advertising to
Florida readers. Rule 4-7.21(d) is the rule, and only the firm or its counsel
can close this: **supply the sentence and it goes in.** Nothing will be
drafted here.

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

### 1.1b Removed: the legal-notice page, the privacy page, and the copyright line

camimlaw.com publishes no legal notice, no privacy policy and no copyright
line. Its footer is the address, the hours, the email and the phone number.
Earlier drafts of this site carried all three, written here, which is
information the firm never published. They are gone: the four pages, their
footer links, and the "© 2026 Campos Immigration Law Firm LLC" line.

**Four more statements went with them, and this paragraph used to claim they
had stayed.** The same copy rule removed, from the footer: the Florida
limitation and the federal-practice explanation (Rule 4-7.21(d)), "no somos
notarios ni consultores de inmigración", and the attorney-advertising and
no-legal-advice line. Every one was written here rather than quoted, so the
gate took them. What the footer carries now is the firm's name, the
registered entity, the responsible attorney (Rule 4-7.12(a)), the office
address and hours, and the sister firm's published admission sentence.

Each of the four is a statement the rules expect and a statement this site
cannot invent. They are listed here so the firm can supply the wording it
wants to use; the moment it does, they go back in the footer. See §1.1.

**Decide:** whether the firm wants a privacy policy at all. The consultation
form collects a name, a phone number, an email address and a topic. No
statute obliges a firm of this size in Florida to publish one, but Google Ads
and Meta require a privacy-policy URL to run lead campaigns, and a policy is
the usual place to say what the form does with what it collects. If yes, the
text has to come from the firm or its counsel. Nothing will be drafted here.

**Where:** `site/src/components/SiteFooter.astro`. A supplied policy becomes
one page and one footer link.

### 1.2a The two figures in the opening frame

The frame carries two numbers, both taken from existing sources rather than
supplied by us:

| Figure | Label | Source |
|---|---|---|
| 5.0 | 59 reseñas en Google | Google Business Profile, read 2026-09-09 |
| 50 | estados que atendemos | camimlaw.com: "atendemos a clientes en los 50 estados de Estados Unidos y en el extranjero" |

There is no success rate and no case count, and there will not be one. A past
results claim has to be objectively verifiable before it can be advertised
here, and neither of those numbers exists in any record we can check.

**Two things to decide.**

The rating is now the most prominent thing on the home page after the firm's
own name. It was previously one sentence near the bottom of the page, and it is
rendered in exactly one place now rather than two. Prominence is the whole
question: it is a real figure and it names its source, but it is a
client-satisfaction claim sitting in the first screen. Confirm he wants it
there.

It also cannot be linked yet, which is the mitigation that makes a rating
plainly checkable. `ORG.mapsUrl` is still unverified, so there is nothing to
link to. Supplying the Google Business Profile URL turns the figure into a
one-click verification and is worth doing before launch.

**Where:** `ORG.googleRating` and `ORG.statesServed` in `site/src/lib/org.ts`.
Removing either fact from the frame is deleting one list item.

### 1.2d The opening frame: what is photograph and what is generated

The landscape hero (`/img/juan-campos-hero-wide.jpg`) is a composite. From 22%
to 75% of its width it is the Google Business Profile photograph at full
resolution, including the real ceiling and pendant above his head. Beyond a
feathered band on each side, the room is a generated extension the client
produced from this photograph with ChatGPT's image model and supplied on
2026-09-09. That file had also re-drawn him, with different hair strands and a
smoother, slightly wider face, so nothing of its figure is used: the
photograph is laid over it, and the generated pixels are only ever floor,
wall, chairs and a sofa. The band above the generated frame in the margins is
a colour falloff taken from the file's own top rows, with no texture. Portrait
viewports get the untouched photograph.

**Why it is acceptable and what to check.** No person, text, mark, flag or
symbol appears in the generated region, and it depicts nothing that could be
taken as a fact about the firm. It is not a dramatization of an event and
uses no actor, so Rule 4-7.13(b)(6) and (b)(7) do not reach it, and the
Bar has issued nothing on generated backgrounds. Confirm the firm is content
to use it; the untouched photograph works at every width if not.

**Where:** `ATTORNEY.hero` in `site/src/lib/org.ts`, whose source string
records the provenance.

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

1. **The seated portrait** carries the opening frame of the home page and nothing else. It comes from the firm's own Google Business Profile for the Orlando entity, fetched at full resolution rather than as the 228px thumbnail the listing shows. It is a professional environmental portrait: seated in a wooden chair, a real room, symmetric composition. The margins of the wide version were generated by the client and are disclosed in §1.2d. **Confirm permission and whether the photographer needs a credit.**
2. **The café photograph** carries the attorney page, on the client's instruction of 2026-09-10 ("one of the newer ones from the Campos Muños site"). It is the right half of `Slideshow2-desktop.jpg` from camulaw.com's home slideshow, cropped so that he is alone at the table; the other person in the original frame is entirely outside the crop, and nothing in the crop names a place. It is shown whole, at its own proportions, captioned only with his name, his credential and the firm. **Confirm which city it was taken in and whether the photographer needs a credit**, since the sister firm's page does not say.

3. **The headshot on the home page's introduction** is the sister firm's current one (`camulaw.com/JuanHeadshot.jpg`, from its team page, alt text "Juan Campos-Gutierrez, Esq."), fetched 2026-09-20 and byte-checked against the copy in `public/img/`: the same photograph, re-encoded. It is on the client's instruction of 2026-09-20 — the same seated frame was running on both pages of the preview, and the opening frame is already a chair. **It is 534×800 and that is the only size the sister site has**; several paths for a larger original return 404. The column is therefore capped at 380px so the photograph is not upscaled into softness. **If the firm has the photographer's file, it should replace this**, and the column can grow with it.

The flag-fabric texture that used to sit behind the closing band has been
removed, so there is nothing left to confirm there: at the opacity the type
needed it was invisible, and a solid navy carries the words better. The file
is still in `public/img/` and no page references it. Five earlier photographs
of him (`juan-campos-at-work.jpg`, `-seated.jpg`, `-portrait.jpg`,
`-headshot.jpg`, and `flag-texture.jpg`) are on disk with their provenance
recorded in `org.ts`, and no page uses them. The studio portrait from
camimlaw.com (`LCO07573-Edit.jpg`) is among them: it is a good photograph, but
it is the older one and the client asked for the newer headshot.

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
