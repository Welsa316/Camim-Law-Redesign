# Final Design Review

Written to be argued with. Where the work is unfinished it says so, and where a decision could reasonably have gone the other way it says that too.

---

## What makes this site distinct

**It says who the lawyer is.** The old site never printed his name — not on the About page, which is written in the first person by an unnamed author, not in a byline, not in the footer. His name appeared only inside an email address and an Instagram handle. The new site opens on his face, names him, states where he is admitted, and explains what that means.

**It answers the question the old site was hiding.** He is admitted in Louisiana, not Florida. That is lawful for federal immigration practice and it is why he can represent clients in other states. The old site said nothing; his own Instagram said more. The new site puts it in the footer of every page and gives it a section on the attorney page under a heading that asks the question directly. Handled by omission it looks like concealment. Handled plainly it is a credential.

**It is built for the fear that actually stops people.** Not "which visa do I need" but "is this person real, or is this another notario". The one full-bleed statement on the site is a single sentence answering that, and the footer repeats it on every page.

**The information architecture is organised by situation, not by visa letter.** The market offers flat lists of a dozen items, a 154-link mega-menu, or no services navigation at all. Nobody groups by what the visitor is going through. That is the finder, and it is navigation rather than a quiz, so it never opines on anyone's case.

**Unverified facts cannot render.** Every fact lives in one typed module with a verification flag; every practice area carries a status. This is a compliance mechanism, not a content preference, and it is why the site currently ships one service rather than sixteen.

## What contributes most to perceived quality

1. **Type carrying the identity**, because there is no logo. One text serif at a real display size, one humanist sans, and a monospace apparatus voice for form numbers, ordinals and dates. That last one is what makes the pages read as filed records rather than marketing.
2. **The scale jump.** The opening line runs to 114px against a 13px mono eyebrow. The contrast between the two does more than any decoration.
3. **Rows instead of cards.** Zero rounded bordered containers on the entire site, verified mechanically. Separation comes from rules, placement and measure.
4. **One full-bleed dark moment**, textured, with a single sentence. Two dark bands would make it a theme.
5. **Measured colour.** Ten tokens, each with a named job, every ratio computed. Three design rules came out of the measurements rather than out of taste.
6. **Restraint in motion.** One masked line reveal grammar, four durations, four easings, and a portrait that drifts slightly rather than a page of effects.

## What was deliberately left out

- **Every statistic.** No case count, no years figure, no approval rate. The sister firm advertises "5,000+ cases" and "25+ years"; neither is verifiable and the years figure counts a career that began before the U.S. licence.
- **Award badges.** A wall of unlabelled badges is a Florida Bar problem, not just a taste one.
- **`AggregateRating` schema.** The firm has 5.0 from 59 reviews, and it is stated as a sentence linking to Google. Self-serving review markup on your own domain is a documented manual-action risk.
- **A chatbot.** Buildable within Ethics Opinion 24-1, not worth the risk on a site whose job is to reach a real attorney.
- **Testimonials.** Six conditions apply and none is confirmed yet.
- **A blog.** An abandoned one is worse than none.
- **The Univision still**, because it carries a competitor's sponsor logo in frame.
- **The Statue of Liberty and the stock photograph of a dejected man** found in the shared asset library. The first is the category cliché; the second is synthetic imagery of a distressed person, which the advertising rules treat as manipulative.

## How it supports immigration clients emotionally

- The fear is named and answered rather than exploited. No countdown, no "act now", no threat imagery.
- The detention page is written for the worst hour of someone's week, ordered by what to do first, with no sales language anywhere on it.
- The public form asks for a name, a number and a topic, and says so: case history belongs in a privileged conversation, not a web form.
- Every service page opens with who it is for, so a reader can self-identify before meeting a single form number.
- Timing is described as a realistic range, and the site says plainly that anyone promising an exact date is promising something they do not control.
- Spanish is the site, not a translation layer. The language switch is visible on a phone without opening a menu, because a Spanish speaker landing on an English page should not have to hunt.

## How it outperforms the old site

| | Before | Now |
|---|---|---|
| Attorney named | Never | Every page |
| Credentials | None | Admission, education, memberships, languages |
| Jurisdiction disclosed | No | Footer and a dedicated section |
| Indexed pages | 5, one with content | 21 live, 31 in review |
| Meta descriptions | Empty on all five | Written per page |
| `og:image` | **None** | Designed, 1200×630 |
| Structured data | `WebSite` only | LegalService, Person, ProfilePage, Service, BreadcrumbList, FAQPage |
| hreflang | None | Bidirectional with `x-default` |
| `<h1>` | Absent on two pages | Exactly one per page |
| Language | `es-VE`, mixed nav | `es` and `en`, full parity |
| Contact | Squarespace demo copy, no working form | Working form, cautionary statement, real endpoint |
| Booking | "Sign up" → 404 | Consultation page |
| Placeholder text | Live on two pages | None |
| Contrast failures | Not measured | Zero, measured |
| Reviews shown | Zero of 59 | Stated and linked |

## How it compares to the market

Against twelve audited competitors it is the only site that: publishes a real jurisdiction disclosure; organises by situation rather than visa letter; has an emergency detention page; ships no unlabelled badges and no unverifiable statistics; and passes its own measured contrast and accessibility checks.

The market's technical leader runs 133 URLs, correct hreflang, deep schema — and still emits the deprecated `Attorney` type, keyword-cannibalises three URLs for one topic, and has nineteen reviews. This site is more correct on all three counts and starts from fifty-nine.

Where the market is ahead: **content depth.** The leader has 24 Spanish service pages. This site has one live and five drafted.

## What still depends on the client

Everything in `CONTENT_REVIEW.md`. The three that block a launch:

1. The confirmed list of matters. Fifteen are drafted or designed and none can ship unconfirmed.
2. The consultation policy and price. No competitor publishes one, so it is the largest differentiator available, and it cannot be invented.
3. Bar admission wording, and whether the Kirkman Road office meets the bona-fide-office test.

## Where professional photography would earn the most

1. **The attorney in the actual office.** The existing portrait is excellent but it is a white-ground studio cut-out; the opening frame wants a person in a place.
2. **The building entrance**, for the Orlando page. A visitor who has never been to a law office needs to know what door to walk through.
3. **Hands and documents**, so service pages have something real instead of nothing.
4. **The office itself**, which also settles the bona-fide-office question visually.

Second only to photography: **the eleven Spanish explainer videos** that already exist. They are the single largest unexploited asset the firm owns, and the site is built to hold them.

## What still needs a lawyer's read

The drafted copy for asylum, VAWA, U visa, deportation defence, citizenship and family petitions. It is written from public sources and general immigration law, and it is careful — process verbs only, no eligibility opinions, a general-information notice on every page — but it has not been read by a lawyer, and it must be.

## What I would change with another pass

**Be honest first: the site is still thinner than the references it was measured against, and the reason is assets.** One portrait, two broadcast stills and a fabric texture is not enough imagery to carry ten pages. The design compensates with typography and rhythm, which is the right response, but compensation is what it is.

Specifically:

1. **Bring in the videos.** Eleven Spanish explainers with a 477,000-view channel behind them. They belong on the service pages, click-to-play, and they would transform the pages that currently have no imagery at all.
2. **The service pages are the weakest template.** They are correct and readable and they have one visual event between the heading and the footer. A real photograph or a diagram per matter would fix it.
3. **The English side is a translation of a Spanish site.** It is good, but the Spanish was drafted first and it shows in the rhythm. The English deserves its own pass.
4. **The situation finder could do more.** It routes to a group anchor. Routing to a short "which of these three is closest" step would help the visitors who genuinely do not know.
5. **The Orlando page should be the local authority page.** It has the court address, which nobody else uses. It could carry the USCIS field office, parking, what to wear, and what happens if you miss a hearing.
6. **The scroll-scrubbed portrait is the only scroll-linked move.** One more — a photograph that expands to full bleed as it enters — would give the middle of the page an event. It needs a photograph worth expanding.
7. **Reviews.** Fifty-nine five-star reviews with substantive owner replies is the strongest proof the firm has, and it is currently one sentence. Done compliantly it deserves a section.

## An honest score

Against the old site: transformed, and not by a small margin.

Against the twelve competitors: better on structure, disclosure, accessibility and technical correctness than any of them; behind the best of them on content depth, and that gap closes with client confirmations rather than design work.

Against the non-legal references the brief pointed at: **not there yet.** Those sites have photography budgets, and several have a single art-directed image doing more work than this entire page. What this site has instead is that every decision on it can be defended, every number on it was measured, and nothing on it is invented. For a firm whose clients are deciding whether to trust a stranger with their family's status, that is the right trade — but it is a trade, and it should not be described as anything else.
