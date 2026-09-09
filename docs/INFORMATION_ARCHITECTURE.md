# Information Architecture

Campos Immigration Law. Built from user needs, not from the existing Squarespace structure. Every practice category is marked with its evidence status; anything unconfirmed is designed but flagged, never asserted.

---

## 1. What the current architecture is

Five indexed URLs, one of which is real content.

```
/home       hero image, three short blocks, an Instagram grid
/services   three cards: one real (Asilo), one Squarespace demo image, one broken
/about      two paragraphs and a photograph of a man who is not the attorney
/contact    Squarespace placeholder copy plus a working form
/asilo      ~900 words on asylum. The only substantive page on the site.
```

Plus `/cart` (returns 200; Squarespace commerce is enabled and unused) and `/appointments` (returns 404 and is linked twice from the Services page as "Sign up").

There is no navigation to any service other than asylum, no attorney credentials, no language switch, and no page explaining what to do next.

## 2. What the architecture has to do

Derived from the journeys in the research dossier, section 9.

| # | Journey | The architecture must provide |
|---|---|---|
| 1 | "I need help and I don't know what kind" | A situation finder in plain Spanish on the homepage, above the practice list |
| 2 | "I know I need a family petition" | A direct, indexable page per matter, reachable in one click from the header |
| 3 | Spanish-speaking visitor on an English page | A persistent language switch that lands on the equivalent page, not the homepage |
| 4 | Existing client paying an invoice | Payment reachable from the header and the footer on every page |
| 5 | Research-stage visitor from a reel or a search | Resource pages that link to the relevant service and to the attorney |
| 6 | Emergency: a family member was detained | A page reachable from the homepage and the header that says what to do today |
| 7 | Search engines and answer engines | One canonical URL per matter, real HTML, hreflang pairs, and structured data |

## 3. Sitemap

Spanish is the default language at the root. English lives under `/en/` with translated slugs. Rationale in the dossier, section 1.4, and in `SEO_AEO_PLAN.md` section 4.

**Slugs are flat and descriptive, not nested.** The first draft of this document nested every matter under `/servicios/`. The SERP research changed that: the pages that rank for these queries are city-scoped service pages, and the market's technical leader runs a flat, city-scoped Spanish inventory. Hierarchy is still expressed, through visible breadcrumbs and `BreadcrumbList` structured data, neither of which requires a nested path.

```
/                                          Home
/juan-campos/                              The attorney            [was /about]
/servicios/                                All services, grouped, plus an A-Z index
/asilo-orlando/                            Asylum                  [was /asilo]
/abogado-vawa-orlando/                     VAWA
/abogado-visa-u-orlando/                   U visa
/abogado-de-deportacion-orlando/           Removal defence
/abogado-de-ciudadania-orlando/            Citizenship
/abogado-peticiones-familiares-orlando/    Family petitions
/residencia-por-matrimonio-orlando/        Marriage green card
/permiso-de-trabajo-orlando/               Work permit
/<further matters as confirmed>/
/consulta/                                 Consultation: how it works, what to bring, the form
/detenido/                                 A family member was detained: what to do today
/preguntas/                                Frequently asked questions
/recursos/  /recursos/<article>/           Resources and updates
/orlando/                                  Orlando USCIS field office and immigration court
/pagos/                                    Payment
/aviso-legal/  /privacidad/                Legal notices and privacy
/404

/en/                                       mirrors all of the above with English slugs
/en/juan-campos/  /en/services/  /en/asylum-lawyer-orlando/
/en/vawa-lawyer-orlando/  /en/u-visa-lawyer-orlando/
/en/deportation-defense-orlando/  /en/citizenship-lawyer-orlando/
/en/family-petitions-orlando/  /en/marriage-green-card-orlando/
/en/work-permit-orlando/  /en/consultation/  /en/detained/  /en/faq/
/en/resources/  /en/orlando/  /en/payment/  /en/legal/  /en/privacy/
```

The attorney page sits at `/juan-campos/` rather than `/abogado/` because it is the `Person` entity page. Entity resolution is the firm's first problem, and a URL carrying the name helps it.

## 4. Practice architecture

Six situation groups in plain language, each with matter pages carrying the form number as a secondary label. This is the market gap identified in the dossier, section 5.3: competitors organise by flat list, by visa letter, or not at all. Nobody organises by what the visitor is going through.

Evidence key: **[SIBLING]** the matter has a produced Spanish explainer video and page on the sister firm's site, so the practice almost certainly covers it, pending confirmation. **[LIVE]** already on camimlaw.com. **[PROPOSED]** designed into the architecture, needs confirmation before it ships.

### Familia — Family
| Matter | Form | Evidence |
|---|---|---|
| Peticiones familiares | I-130 | [SIBLING] |
| Residencia por matrimonio | I-130 / I-485 | [SIBLING] |
| Visa de prometido(a) | K-1 | [PROPOSED] |
| Ajuste de estatus | I-485 | [SIBLING] |
| Proceso consular | DS-260 | [SIBLING] |
| Remoción de condiciones | I-751 | [PROPOSED] |

### Residencia y ciudadanía — Green card and citizenship
| Matter | Form | Evidence |
|---|---|---|
| Residencia permanente | — | [SIBLING] |
| Ciudadanía y naturalización | N-400 | [SIBLING] |
| Renovación o reemplazo de residencia | I-90 | [PROPOSED] |

### Protección humanitaria — Humanitarian protection
| Matter | Form | Evidence |
|---|---|---|
| Asilo | I-589 | **[LIVE]** |
| VAWA | I-360 | [SIBLING] |
| Visa U, víctimas de delito | I-918 | [SIBLING] |
| Visa T, trata de personas | I-914 | [SIBLING] |
| Jóvenes inmigrantes (SIJS) | I-360 | [SIBLING] |
| TPS | I-821 | [PROPOSED] |

### Corte y detención — Court and detention
| Matter | Evidence |
|---|---|
| Defensa contra la deportación | [SIBLING] |
| Fianza de inmigración | [PROPOSED] |
| Apelaciones | [PROPOSED] |

### Perdones — Waivers
| Matter | Form | Evidence |
|---|---|---|
| Perdón provisional | I-601A | [PROPOSED] |
| Perdón de inadmisibilidad | I-601 | [PROPOSED] |
| Permiso para reingresar | I-212 | [PROPOSED] |

### Trabajo — Work
| Matter | Form | Evidence |
|---|---|---|
| Permiso de trabajo | I-765 | [SIBLING] |
| DACA | I-821D | [SIBLING] |
| Visas de trabajo | — | [PROPOSED] |

**Launch rule.** Only matters the attorney confirms are published. Everything else stays out of the navigation and out of the sitemap until confirmed. Rule 4-7.13(b)(4) forbids listing areas the firm does not practise, so this is a compliance gate, not a content preference.

## 5. Navigation

### Header, desktop

A single row: the wordmark, five items, the language switch, and one action.

```
Campos Immigration Law    Servicios   El abogado   Consulta   Preguntas   Recursos    ES|EN   [Agendar consulta]
```

`Servicios` opens a panel showing the six groups as columns with their matters listed, plus two links at the bottom: "Ver todos los servicios (A-Z)" and "¿No sabe por dónde empezar?". This is one click to any matter, against the market's choice of either a flat list or a 154-link mega-menu.

Phone and payment live in the header's second tier on desktop and in the mobile bar. They are never more than one tap away, per the functional requirements in the brief.

### Header, mobile

The desktop nav does not shrink; the mobile composition is different.

- Top bar: wordmark, language switch, menu button. The language switch stays visible at all times, because a Spanish speaker landing on an English page must not have to open a menu to escape it.
- A drawer, labelled not icon-only, with the six groups as accordions, then the standalone pages, then phone and payment as full-width actions.
- A persistent bottom bar with two large targets: **Llamar** and **WhatsApp** (or **Escribir** if WhatsApp is not confirmed). This is the single most valuable mobile pattern found in the competitor set and only four of twelve firms have it.

### Footer

Four columns plus a legal band.

1. **Servicios** — the six group names, each linking to its section of the hub.
2. **El bufete** — attorney, consultation, payment, resources, FAQ, Orlando.
3. **Contacto** — address as a link to the map, phone as a call link, email, hours, Instagram.
4. **Idioma** — ES / EN, and the "no somos notarios" clarifier.

Legal band: firm name and responsible attorney, "Orlando, Florida", the advertising disclaimer, privacy and legal links. Rule 4-7.12(a) requires the first two on every page and the footer is where they live.

## 6. The situation finder

On the homepage, above the practice list, and on `/servicios/`. Plain Spanish questions, no form, no data collection, no eligibility opinion.

```
¿Cuál es su situación?

Quiero traer a un familiar          → Familia
Quiero mi residencia                → Residencia y ciudadanía
Quiero hacerme ciudadano            → Residencia y ciudadanía
Tengo corte o me detuvieron         → Corte y detención
Fui víctima de un delito o abuso    → Protección humanitaria
Tengo una entrada o salida previa   → Perdones
Necesito permiso de trabajo         → Trabajo
No estoy seguro                     → Consulta
```

Each answer routes to a group page, not to a result. It is navigation, not a quiz, which keeps it clear of Rule 4-1.18 and of anything that could read as legal advice. The private-first-step pattern from the best-in-class research is honoured without collecting a single field.

## 7. Page templates

| Template | Used by |
|---|---|
| Home | `/` |
| Service group | the six group anchors on `/servicios/` |
| Matter | every matter page |
| Attorney | `/juan-campos/` |
| Consultation | `/consulta/` |
| Urgent | `/detenido/` |
| Index | `/servicios/` A-Z, `/recursos/` |
| Article | `/recursos/<article>/` |
| Simple | `/preguntas/`, `/orlando/`, `/pagos/`, `/aviso-legal/`, `/privacidad/` |
| 404 | `/404` |

## 8. Content model

A single typed source per entity, so navigation, footer, sitemap, breadcrumbs, related matters, the A-Z index and JSON-LD all read from the same place and cannot drift.

```
organization   name, legal name, address, phone, email, hours, maps URL,
               payment URL, social profiles, languages, responsible attorney
attorney       name, bar name, bar number, admissions, education, memberships,
               languages, bio (es/en), portrait, media appearances
group          slug (es/en), name, plain-language line, order, matters[]
matter         slug (es/en), name, form number, group, who it is for,
               what it does, what we do, steps, FAQs, related matters, status
faq            question, answer, group, page placements
article        slug, title, body, related matters, date, reviewed-by
```

`status` on a matter is one of `live`, `pending-verification` or `draft`. Only `live` renders in navigation and the sitemap. That single field is what keeps an unverified practice area from shipping.

## 9. Redirects from Squarespace

The live URL surface is small: the five sitemap URLs, plus `/cart` and a linked-but-404 `/appointments`. The Wayback archive holds a single capture, so there is no deep history of indexed URLs to preserve.

| Old | New | Code |
|---|---|---|
| `/home` | `/` | 301 |
| `/services` | `/servicios/` | 301 |
| `/about` | `/juan-campos/` | 301 |
| `/contact` | `/consulta/` | 301 |
| `/asilo` | `/asilo-orlando/` | 301 |
| `/appointments` | `/consulta/` | 301 |
| `/cart` | `/` | 301 |
| anything else | `/404` | 404, not a soft 200 |

## 10. What this architecture deliberately does not include

- **A cart or any commerce.** Squarespace enabled it; nothing uses it.
- **A chatbot.** Ethics Opinion 24-1 requires an AI assistant to identify itself as AI, refuse legal advice, and screen for existing representation. That is buildable, but it is not worth the risk on a site whose main job is to get a stressed person to a real attorney.
- **An eligibility quiz that returns a result.** The finder routes; it never opines.
- **A blog the firm will not maintain.** `/recursos/` launches only with real articles derived from content the attorney has already produced.
- **Testimonials at launch**, unless the client confirms consent and the six Rule 4-7.13(b)(9) conditions are met.
