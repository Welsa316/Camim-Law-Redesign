# Motion System

Campos Immigration Law. The brief asks for excellent motion, not a lot of motion. For this audience that distinction is not stylistic: a person reading about a court date on a phone at midnight is harmed by movement that delays or displaces the thing they came to read.

---

## 1. What motion is for here

| Purpose | Where |
|---|---|
| Hierarchy — say what to read first | Page and section openers |
| Cause and effect — confirm an action landed | Buttons, links, form states, accordions |
| Continuity — keep orientation across a change | Menu, language switch, header state |
| Focus — bring attention to one thing | The situation finder, the urgent callout |
| Craft — one moment that feels made | The homepage opener, once |

What motion is not for: decoration, filling empty space, proving the site is modern, or hiding the fact that a section has nothing to say.

## 2. The one signature move

**Masked line reveal on the opening heading of a page.** The heading is split into lines, each line clipped by its own `overflow: hidden` box, and each line rises into place with a stagger and a heavy-deceleration ease. It appears *into* the layout and settles.

It runs once per page, on the opener only. Every other reveal on the page is the quiet variant in section 4. One signature moment, not a page of effects, is what reads as considered.

Two rules that make it work rather than break:
- The clipping box carries the type scale. Setting `height: 1.06em` on a clip box resolves the `em` against the box's own inherited font size, not the large child, which renders the headline as a thin sliced band.
- Lines are split after fonts load and re-split on resize. Lines split against a fallback face, or against a stale width, leave masks misaligned mid-sentence. Spanish makes this worse because the strings are longer and wrap differently.

## 3. Tokens

Durations and curves are named for their job, not their shape, and live as CSS custom properties so nothing is hand-typed into a component.

| Token | Value | Job |
|---|---|---|
| `--d-micro` | 120ms | Colour and opacity on hover |
| `--d-quick` | 200ms | Button press, small state change |
| `--d-base` | 320ms | Accordion, form state, header condense |
| `--d-reveal` | 600ms | Scroll reveals, the furniture of the page |
| `--d-menu` | 420ms | Mobile drawer open and close |
| `--d-signature` | 900ms | The opening heading, once per page |

| Token | Curve | Job |
|---|---|---|
| `--e-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | General UI, symmetric changes |
| `--e-reveal` | `cubic-bezier(0.16, 1, 0.3, 1)` | Heavy deceleration. Things arriving and settling. |
| `--e-settle` | `cubic-bezier(0.22, 1, 0.36, 1)` | Images and media landing |
| `--e-menu` | `cubic-bezier(0.32, 0.72, 0, 1)` | Drawer, with weight on the way in |
| `--e-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Anything leaving. Accelerate out. |

Different jobs, different curves. Nothing uses `ease-in-out`. Nothing overshoots or bounces: elastic motion on a law firm's site reads as unserious, and this is the one place where a small taste decision is also a credibility decision.

Stagger for grouped reveals is 60 to 90ms. Scroll reveals that repeat down a page sit at `--d-reveal`; they are furniture, and anything slower feels sluggish by the third one.

## 4. The inventory

| Element | Motion | Duration / curve |
|---|---|---|
| Page opener heading | Masked line reveal, staggered | `--d-signature` / `--e-reveal`, 80ms stagger |
| Section heading | Fade and rise 12px | `--d-reveal` / `--e-reveal` |
| Body block | Fade only | `--d-reveal` / `--e-reveal` |
| Portrait | Fade and settle, scale 1.02 → 1 | `--d-signature` / `--e-settle` |
| Media still | Fade | `--d-reveal` / `--e-settle` |
| Service row hover | Ground lifts to `--paper-2`, arrow advances 4px | `--d-micro` / `--e-standard` |
| Button hover | Fill darkens | `--d-micro` / `--e-standard` |
| Button press | 1px inset | `--d-quick` / `--e-standard` |
| Focus ring | Appears with no transition | 0ms |
| Accordion | Height and opacity | `--d-base` / `--e-standard` |
| Header condense on scroll | Padding and rule opacity | `--d-base` / `--e-standard` |
| Mobile drawer | Slide from the right with the page held | `--d-menu` / `--e-menu` in, `--d-base` / `--e-exit` out |
| Language switch | No transition. Navigate. | 0ms |
| Form submit | Button label to a spinner, in place | `--d-quick` |
| Urgent callout | None. It is already the loudest thing on the page. | — |

Deliberately absent: page transitions, parallax on anything containing text, scroll-scrubbed layout, marquees, counters, cursor effects, floating elements, reveal-on-scroll for anything above the fold, and autoplaying video with sound.

**Portraits never get a wipe.** A bottom-up mask uncovers a face last, which reads as the person being hidden. Fade and settle only.

## 5. Implementation contract

**Stack.** GSAP with ScrollTrigger and SplitText. Both are free. No smooth-scroll library: inertia scroll takes ownership of the scroll position, fights assistive technology and cheap Android hardware, and would make the site's own verification harder. Native scroll with well-tuned reveals is the correct ceiling for a legal site.

**Progressive enhancement is the contract.** The page ships fully composed and readable. Start states are applied by JavaScript, in the same frame as mount, before paint. If the bundle never loads, never parses, or is blocked, the visitor sees a finished page with no motion. This inverts the usual arrangement, where a failed script leaves the copy invisible.

The specific traps this is written against, each of which has shipped as a visible bug before:

- **The pre-animation flash.** Tweens built asynchronously let the page paint composed and then blink out. Pre-hide before paint, build tweens after.
- **Bound every async wait.** `Promise.race([document.fonts.ready, timeout(1200)])`. A stalled font request must never leave the copy invisible.
- **Use `fromTo`, never `from`, when a start state was pre-set.** `from` reads the element's live value as the destination, so a pre-hidden element animates 0 to 0 and silently never appears.
- **Register ScrollTrigger lazily, inside the effect.** `register()` calls `enable()`, which reaches for `window.matchMedia`; at module scope that throws during module evaluation anywhere matchMedia is absent and takes the page down before any guard runs.
- **Reduced motion bails out before anything is hidden.** The check runs first; that path renders the page composed rather than blank.
- **Tear everything down.** Kill triggers, revert the context and the splits, on any navigation.
- **Re-split on resize**, and only after fonts are ready.

**Reduced motion.** `prefers-reduced-motion: reduce` disables reveals, the signature move, and the portrait settle. Retained: focus rings, accordion height (which is a state change, not decoration), and instant hover feedback. The setting is respected in CSS and in JavaScript, and the JavaScript path is checked first.

**Budget.** The motion bundle is deferred, loaded only on pages that use it, and is not on the critical path for first paint. If it cannot be kept under roughly 40KB gzipped after tree-shaking, the signature move is cut before the page weight is.

## 6. How motion gets verified

Assertions about animation are not evidence. For each moment:

- Prove **both ends**: the start state, in the DOM, before the reveal, and the settled end state after. "It renders" says nothing about a reveal.
- Confirm through computed styles and measured rectangles, not screenshots. Automation panes suspend `requestAnimationFrame` when idle and mis-capture scroll-linked elements, so a broken-looking capture may be the harness rather than the page.
- Verify the reduced-motion path renders the page fully composed.
- Verify the no-JavaScript path renders the page fully composed.
- Say plainly which parts were observed and which were inferred, and hand the feel of it to the client to judge.
