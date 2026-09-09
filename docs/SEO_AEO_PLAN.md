# SEO and AEO Plan

Campos Immigration Law. Built from observed result sets, from the raw HTML of ranking competitors, and from current Google documentation. Where a claim could not be observed directly it is marked, because two of the most useful findings here came from refusing to guess.

---

## 1. The baseline, measured

| Property | Today |
|---|---|
| Indexed URLs | 5, last modified between December 2023 and February 2024 |
| `<html lang>` | `es-VE` sitewide |
| Meta description | Empty string on every page |
| Structured data | `WebSite` only |
| hreflang | None |
| `<h1>` | **Absent entirely** on `/asilo` and `/services` |
| Sitemap | Lists `/home`, which is not the canonical; `/` and `/home` both return 200 and both canonicalise to `/` |
| `/appointments` | 404, linked twice from the Services page |

**The firm is invisible.** Across every non-branded query researched, English and Spanish, head and long tail, `camimlaw.com` appeared zero times. On its own branded query, Sunbiz, Facebook, an unrelated Wikipedia entry and two rival "Campos" firms ranked alongside or above the firm's own pages. This is an entity problem before it is a ranking problem.

**Entity fragmentation.** Four different public name strings are in circulation: "Campos Immigration Law" (site), "CAMPOS IMMIGRATION LAW FIRM LLC" (Florida Division of Corporations, filed 20 July 2023, manager Juan M. Campos Gutierrez), "Campos Immigration Law Firm | Orlando FL" (Facebook), and the LawPay page slug. One string becomes `name`; the rest become `alternateName`. This is the cheapest fix available and everything else depends on it.

**A finding worth recording because the obvious reading was wrong.** The inherited Squarespace `robots.txt` opens with 29 stacked `User-agent:` lines naming ClaudeBot, GPTBot, Google-Extended, CCBot and others. It looks like a blanket block on AI crawlers. It is not: there is no `Disallow:` between those lines and the trailing `User-agent: *`, so under the robots grouping rules all 29 named agents simply inherit the permissive wildcard rules. Campos is not blocking AI crawlers. It has nothing worth citing.

## 2. Where the opportunity actually is

**Spanish, decisively.** The Spanish result sets show supply shortage in ways that only appear when an index has holes:

- `abogado visa U Orlando` returns a page about K-1 fiancé visas at position one, plus O-1 and E-2 investor pages. Google is padding a crime-victim query with investor-visa content.
- `abogado de peticiones familiares Orlando` returns divorce and family-law pages in three of six positions, because "familiar" is ambiguous and nothing local resolves it.
- `abogado de inmigración Orlando` returns an English-slug page at position six.
- `cuánto cuesta un abogado de inmigración` returns four Wikipedia articles.
- `cómo saber si califico para visa U` returns an Argentine newspaper at position one.
- `abogado de inmigración Kissimmee` returns the Wikipedia entry for Kissimmee at position five.

**The directory layer is two sites deep in Spanish and nine-plus in English.** `abogado.com` and `usa.elabogado.com` versus Justia, FindLaw, Best Lawyers, Super Lawyers, Expertise, LawInfo, Avvo, Yelp and Cornell. A firm with genuinely good Spanish pages faces far less aggregator crowding.

**Across nine Spanish informational queries, not one Orlando firm ranked in any position.** The local market competes only for commercial terms and has abandoned the informational funnel entirely.

## 3. The benchmark and its holes

`immlawcenter.com` is the market's technical leader: 133 sitemap URLs including 24 Spanish URLs with translated slugs, correct hreflang, a deep schema stack, and a hand-written `llms.txt` carrying the attorney's bar number, board certification, law school and graduation year.

Its exploitable holes:

- **No Spanish page for VAWA, U visa, TPS, parole or waivers.**
- Keyword cannibalisation: `/asylum/`, `/asylum-lawyer/` and `/asylum-lawyer-orlando/` are three live URLs for one topic, and two of its own URLs rank on page one for the same citizenship query.
- It still emits the deprecated `Attorney` schema type.
- Nineteen Google reviews.

And the largest generalist, which ranks first or second for the English head terms, declares hreflang for English, Portuguese and `x-default`, and **no Spanish at all**.

## 4. URL architecture

**Spanish at the root, English under `/en/`, translated slugs on both sides.**

```
https://www.camimlaw.com/                            es, x-default
https://www.camimlaw.com/asilo-orlando/              es
https://www.camimlaw.com/en/                         en
https://www.camimlaw.com/en/asylum-lawyer-orlando/   en
```

Subdirectory rather than subdomain or ccTLD: this is a language split, not a country split, so a ccTLD is wrong on its face, and a single-attorney firm has no reason to run two hosts.

Spanish at the root is the contested call. In favour: the site already publishes Spanish at the root, the attorney's entire public output is Spanish, the Spanish directory layer is two sites deep against nine, and the Spanish result sets show category mismatches that only occur where supply is short. Against: root-English is the convention and English head terms carry more absolute demand. The architecture is symmetric, so flipping it is a config change plus a redirect map, but flipping it after launch costs a second migration. **This is an explicit client decision, not a default.**

**Flat, descriptive slugs, revised from the first draft of the information architecture.** The first draft nested matters under `/servicios/`. The observed evidence changed that: the pages that rank for these queries are city-scoped service pages, and the benchmark's Spanish inventory is flat and city-scoped. Hierarchy is still expressed, through `BreadcrumbList` structured data and visible breadcrumbs, which do not require nested paths.

**Never `/sp/`.** Three local firms use it. It is not an ISO 639-1 code, and all three also ship zero hreflang tags, which is the real problem the wrong path advertises.

**hreflang, exactly.** Absolute URLs, self-referential, bidirectional, on every page. Google ignores the tags entirely if two pages do not both point at each other. `x-default` points at the Spanish page. Plain `es` and `en`, not `es-US` or `en-US`. And `<html lang="es">`, not `es-VE`: the current value tells crawlers the site is for Venezuelan Spanish speakers, needlessly narrowing an audience that is also Puerto Rican, Colombian, Cuban, Mexican and Dominican.

## 5. Priority pages

P1 builds first.

| # | Priority | Target query | Lang | Page |
|---|---|---|---|---|
| 1 | P1 | abogado de inmigración Orlando | ES | `/` |
| 2 | P1 | abogado de asilo Orlando | ES | `/asilo-orlando/` |
| 3 | P1 | abogado VAWA Orlando | ES | `/abogado-vawa-orlando/` |
| 4 | P1 | abogado visa U Orlando | ES | `/abogado-visa-u-orlando/` |
| 5 | P1 | abogado de deportación Orlando | ES | `/abogado-de-deportacion-orlando/` |
| 6 | P1 | abogado de ciudadanía Orlando | ES | `/abogado-de-ciudadania-orlando/` |
| 7 | P1 | Orlando immigration lawyer | EN | `/en/` |
| 8 | P2 | abogado de peticiones familiares Orlando | ES | `/abogado-peticiones-familiares-orlando/` |
| 9 | P2 | puedo trabajar mientras espero asilo | ES | `/permiso-de-trabajo-asilo/` |
| 10 | P2 | cuánto cuesta un abogado de inmigración | ES | `/precios-abogado-inmigracion/` |
| 11 | P2 | VAWA vs visa U | ES + EN | `/vawa-o-visa-u/`, `/en/vawa-vs-u-visa/` |
| 12 | P2 | English twins of 2, 3, 5, 6 | EN | `/en/asylum-lawyer-orlando/` and siblings |
| 13 | P3 | residencia por matrimonio Orlando | ES | `/residencia-por-matrimonio-orlando/` |
| 14 | P3 | qué hago si recibí una Notice to Appear | ES | `/recibi-notice-to-appear/` |
| 15 | P3 | se venció mi TPS o parole, qué opciones tengo | ES | `/se-vencio-mi-estatus-opciones/` |

Two rules learned from watching the benchmark fail:

- **"Lawyer" and "attorney" are one intent. One page.** Splitting them is the most common self-inflicted wound in this vertical.
- **Do not build a "best immigration lawyer" page.** That result set is five-of-eight directories, and Florida Bar rules constrain the superlative anyway. Be listed in the directories instead.

## 6. Schema

`LegalService` for the firm, `Person` for the attorney. **Not `Attorney`**, which schema.org marks deprecated with the notice that `LegalService` is more inclusive and less ambiguous. The market's technical leader is still emitting the deprecated type, so this is a place to be more correct than the benchmark.

```
Site-wide, once:
  LegalService   @id .../#firm
    name, alternateName[], url, logo, image, address, geo, telephone,
    openingHoursSpecification, areaServed[], availableLanguage[es,en],
    founder → Person, sameAs[]
  Person         @id .../#juan-campos
    name, jobTitle, worksFor → #firm, knowsLanguage, hasCredential, sameAs[]

Per page:
  WebPage + BreadcrumbList
  Service { name, serviceType, provider → #firm, areaServed, availableLanguage }
  FAQPage where the questions genuinely match the page

Attorney page:
  ProfilePage with Person as mainEntity
```

**A hard constraint: no `AggregateRating` or `Review` about the firm, on the firm's own site.** Google's review-snippet guidance makes self-serving reviews ineligible and it is a documented manual-action risk. A local competitor is doing exactly this. Show real reviews as plain HTML linking to the Google profile, and let the stars live on Google.

**FAQ rich results are gone, not merely restricted.** Google's own changelog records that the FAQ rich result is no longer shown, effective May 2026, and FAQ has been removed from the structured-data gallery. `FAQPage` markup stays, because it remains a clean machine-readable question-and-answer statement and that is exactly the shape answer engines extract. It is cheap comprehension infrastructure, not a SERP feature, and nobody should justify the FAQ work with rich-result screenshots.

## 7. Answer engines

The uncomfortable finding: for branded queries, roughly 23 percent of AI citations come from the brand's own content and about 77 percent from directories, reviews and forums. In the legal vertical specifically, a handful of directories dominate the citation layer.

**So the sequence is: name and NAP consistency first, directory profiles second, schema third, content fourth.** Perfect markup on this domain will not, by itself, get the firm named in an answer to "who is the best immigration lawyer in Orlando". The site's job is to be the consistent corroborating source that resolves the entity.

Page-level moves that follow:

- Open every page with a self-contained 40-to-60-word direct answer naming the firm, the city and the phone number in the same block, so the extracted chunk carries the brand.
- Write in extractable question-and-answer units.
- Show a visible last-updated date.
- State concrete local facts national competitors structurally cannot match. The Orlando Immigration Court at 3535 Lawton Road, Suite 200 is the clearest example, and nobody local uses it.

**`llms.txt`: ship one, and be honest about it.** Adoption is around ten percent of domains, one of the fifty most-cited domains has the file, and of over 500 million monitored AI bot visits, 408 targeted it. Google has said it does not support it. But two of the strongest local competitors ship one, it costs about an hour, and writing it forces the firm-facts inventory the schema needs anyway. **Expected direct traffic benefit is approximately zero and the client should be told that.**

## 8. Title and description templates

The pattern that ranks: `{Service} en {City} | {Differentiator}`. Winners run 42 to 79 characters; the two longest are also the two sloppiest, one containing the typo "Inmigration" and one ending in a stray percent sign from a broken template. Target 50 to 60 characters. Descriptions at 155 to 160, front-loaded for the roughly 120 that survive on mobile.

**Spanish runs 15 to 20 percent longer for the same meaning, so the Spanish title is written first and fitted to budget, then the English.** Writing English first guarantees the Spanish overflows.

| Page | Title | Chars |
|---|---|---|
| `/` | Abogado de Inmigración en Orlando, FL \| Campos Immigration Law | 61 |
| `/asilo-orlando/` | Abogado de Asilo en Orlando \| Afirmativo y Defensivo | 52 |
| `/abogado-vawa-orlando/` | Abogado VAWA en Orlando \| Autopetición Confidencial | 51 |
| `/abogado-visa-u-orlando/` | Abogado de Visa U en Orlando \| Víctimas de Delitos | 50 |
| `/abogado-de-deportacion-orlando/` | Abogado de Deportación en Orlando \| Defensa en Corte | 52 |
| `/abogado-de-ciudadania-orlando/` | Abogado de Ciudadanía en Orlando \| Naturalización N-400 | 55 |
| `/en/` | Orlando Immigration Lawyer \| Campos Immigration Law | 50 |
| `/en/asylum-lawyer-orlando/` | Orlando Asylum Lawyer \| Affirmative & Defensive | 46 |

No superlatives, per section 10 of the research dossier. The firms currently ranking on award language are making verifiable, attributable claims rather than superlatives, and that distinction is the whole game.

## 9. Local

The office at 5401 S. Kirkman Road is an advantage, not a liability: west Orlando near Metrowest, closer to the Hispanic residential population than the downtown cluster where most competitors sit.

- Primary Google Business Profile category: **Immigration Attorney**, not Lawyer or Legal Services.
- Service area names Metrowest, Pine Hills, Ocoee, Winter Garden, Kissimmee and Osceola County.
- **Keep the profile a storefront listing at the Kirkman Road address.** A broad service area on a profile with a physical office can suppress local proximity ranking. Carry the nationwide capability on the website, in `Service.areaServed`, not in the profile's service-area field.
- **Review count, not score, is the differentiator here.** The market spread runs from 19 reviews to a claimed 500-plus at similar star ratings. The technical leader has 19.
- **Spanish-language reviews are unexploited.** Every firm advertises "se habla español"; reviews written in Spanish say it in the client's own words, which is the text that gets read when someone searches in Spanish.

## 10. Migration

The live URL surface is five sitemap URLs plus `/cart` and a linked-but-404 `/appointments`. The Wayback archive holds a single capture, so there is no deep index history to preserve. The redirect map is in `INFORMATION_ARCHITECTURE.md` section 9. Everything else returns a real 404, not a soft 200.

After launch, verify that a plain `curl` returns real HTML. Two local competitors sit behind bot-mitigation that returns a challenge page to a normal browser user-agent, which makes them invisible to answer engines regardless of their content.

## 11. What needs verification before any of this ships

- The consultation policy. "Consulta gratis" appears in the title tag of nearly every ranking Spanish page. Only make the claim if it is the firm's actual policy; if consultations are paid, saying the price plainly converts better than an unmet promise.
- Any published fee range, checked against what the firm actually charges.
- TPS and parole pages ship only with a visible update date, a named attorney reviewer, and someone committed to maintaining them. A stale page on a volatile status harms people, which is a professional-responsibility exposure and not only an SEO one.
