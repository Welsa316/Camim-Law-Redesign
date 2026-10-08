# Launch runbook: camimlaw.com

How the new site replaces the Squarespace one, in order, with a way back at
every step. Written 2026-10-07 against the live DNS of that day. Every step
that needs an account, a login or a payment is done by Walid; nothing here
asks for a password to be shared.

---

## 0. Go / no-go

The production build is ready (section 1). The switch waits on these:

| # | Blocks the switch | Owner | Where |
|---|---|---|---|
| 1 | **The admission sentence.** The site states a Louisiana admission to Florida readers without saying he is not admitted in Florida and that immigration is a federal practice. Rule 4-7.21(d). | Juan or his counsel | `CONTENT_REVIEW.md` 1.1 |
| 2 | **Consultation requests must arrive.** The form accepts requests and, until the sending service exists, delivers none. Launching like this loses leads silently. | Walid (Resend), Juan (domain records) | step 2 below; `CONTENT_REVIEW.md` 1.7 |
| 3 | **The hours.** The site says Monday to Friday 08:00 to 17:00 (Google Business Profile); the old site said 09:00 to 19:00. A public fact has to be the right one. | Juan | `CONTENT_REVIEW.md` 1.4 |

Strongly recommended before the switch, the client's call:

| # | Item | Where |
|---|---|---|
| 4 | The fifteen points in the practice pages' source text that the attorney should confirm (the TPS conviction bar, the asylum one-year rules, stale figures). They are legal statements on a public page. | `CONTENT_REVIEW.md` 1.2e |

Not blocking, because nothing unconfirmed renders: the consultation price
(1.3), whether the office is staffed (1.5, 1.6), reviews (1.8), the television
stills (1.9).

---

## 1. What is ready (verified 2026-10-07)

- `npm run build` in `site/` is the production build. It is the same build the
  checks run against; the review flag no longer changes anything.
- Started the way Railway will start it (`HOST=0.0.0.0 node
  site/dist/server/entry.mjs`): every page answers 200, `/progress/` answers
  404, the share cards are served as images, the form endpoint answers, and no
  page carries a noindex.
- Nothing from `progress.json` is in the production bundle (searched `dist/`).
- The check suite passes against that server, `verify/search.py` included:
  every old Squarespace address is a single 301, the sitemap is the route
  table, and every page has its own title, description and share card.

---

## 2. The DNS today, and what must not change

camimlaw.com is registered at **Squarespace Domains** (renews 2027-08-05) and
its DNS is hosted there too (NS1 and squarespacedns name servers).

| Record | Value today | At launch |
|---|---|---|
| `camimlaw.com` A | 198.49.23.144, .145, 198.185.159.144, .145 (Squarespace) | forwarded to `https://www.camimlaw.com` (step 4) |
| `www` CNAME | `ext-sq.squarespace.com` | the Railway target (step 4) |
| `camimlaw.com` MX | `aspmx.l.google.com` (1), `alt1`/`alt2` (5), `alt3`/`alt4` (10) | **unchanged** |
| `camimlaw.com` TXT | `v=spf1 include:_spf.google.com ~all` | **unchanged** |
| `_dmarc` | none | add one (step 2) |

**juan@camimlaw.com is Google Workspace mail.** The MX and SPF records above
are what deliver it. Keep the name servers at Squarespace and change only the
two website records; never move the name servers without copying every record
above first, or his email stops.

---

## 3. Step 1: the production service on Railway

A second service in the same Railway project, next to the private preview.

- Source: this repository, branch `main`.
- Build command: `cd site && npm ci && npm run build`
- Start command: `node site/dist/server/entry.mjs`
- Variables:
  - `HOST=0.0.0.0` — required. Without it the server listens on localhost
    only and Railway cannot reach it (`@astrojs/node` reads `HOST`).
  - `RESEND_API_KEY` and `LEAD_FROM` — from step 2.
  - Railway supplies `PORT`. Do **not** set `PUBLIC_DEMO` here.
- Deploy, then check it on the address Railway generates, from `site/`:

  ```
  python3 verify/search.py https://<generated>.up.railway.app
  python3 verify/consult-form.py https://<generated>.up.railway.app
  ```

  Canonical links already point at `https://www.camimlaw.com`; that is
  correct and expected before the switch.

Way back: delete the service. Nothing public has changed.

---

## 4. Step 2: sending consultation requests (Resend)

1. In a Resend account, add the domain `camimlaw.com`. Resend lists the
   records it needs: a DKIM `TXT` at `resend._domainkey`, and an `MX` and `TXT`
   on its sending subdomain (`send.camimlaw.com`). These sit beside the Google
   records and do not replace them.
2. Add those records in Squarespace's DNS settings. Add a DMARC record too,
   reporting only to start:
   `_dmarc` TXT `v=DMARC1; p=none; rua=mailto:juan@camimlaw.com`
3. Once Resend shows the domain verified, create an API key.
4. On the production service set `RESEND_API_KEY` to the key and `LEAD_FROM`
   to a sender on the domain, such as `Campos Immigration Law
   <consultas@camimlaw.com>`. Requests go to juan@camimlaw.com (`ORG.email`);
   set `LEAD_INBOX` only to send them somewhere else.
5. Send one request through the form on the Railway address and confirm it
   arrives, with the reply-to set to the visitor.

Way back: remove the variables; the form goes back to logging requests.

---

## 5. Step 3: the switch

Do it on a weekday morning, when the office can answer the phone if anything
looks wrong.

1. In Railway, add the custom domain `www.camimlaw.com` to the production
   service. Railway shows a CNAME target.
2. In Squarespace's DNS, replace the `www` CNAME (`ext-sq.squarespace.com`)
   with that target. Leave MX and TXT alone.
3. The bare domain `camimlaw.com`: Squarespace's DNS cannot point an apex at
   a hostname. Two ways:
   - **Preferred:** use Squarespace's domain forwarding to send
     `camimlaw.com` to `https://www.camimlaw.com` with a permanent (301)
     redirect, if it allows it once the domain is no longer attached to the
     Squarespace site.
   - **Otherwise:** move DNS to Cloudflare (free), which can point the apex at
     Railway. Copy **every** record in section 2 first, check the copies, and
     only then change the name servers at Squarespace.
4. Railway issues the certificate itself once the CNAME resolves, usually
   within the hour. Nothing to buy or upload.

Way back: put the `www` CNAME back to `ext-sq.squarespace.com` (and remove the
apex forwarding). The Squarespace site is untouched until its subscription is
cancelled, so it is still there to come back to.

---

## 6. Step 4: check it live

From `site/`, with the launched commit built locally:

```
python3 verify/search.py https://www.camimlaw.com
python3 verify/consult-form.py https://www.camimlaw.com
curl -sI http://camimlaw.com      # one 301 to https://www.camimlaw.com/
curl -sI http://www.camimlaw.com  # one 301 to https://
```

`consult-form.py` fakes every server answer but one: its last step sends a
real request named "Verify", which, once step 2 is done, lands in
juan@camimlaw.com. Tell him to expect it, or skip that script on the live
domain.

Then by hand:

- Send a real consultation request; confirm it reaches juan@camimlaw.com.
- Send an ordinary email to juan@camimlaw.com from outside; confirm it
  arrives (the Google records survived).
- Open `https://www.camimlaw.com/robots.txt`: no `Disallow`.
- Paste a page link into WhatsApp; its own share card should show.

---

## 7. After the switch

- Keep the Squarespace site subscription for two weeks as the way back, then
  cancel it. **Keep the domain registration** and its auto-renewal; that is a
  separate Squarespace Domains product.
- Update the website link on the Google Business Profile if it points
  anywhere but `https://www.camimlaw.com/`.
- Search Console is set aside for now (decided 2026-10-07); it belongs to the
  phase four "Search, after launch" item.
- The private preview service keeps running for review work; it stays
  noindex and unlinked.
