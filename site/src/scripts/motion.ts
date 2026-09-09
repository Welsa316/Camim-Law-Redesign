/**
 * Motion.
 *
 * Three moves, and nothing else:
 *   1. Masked line reveals on the opening heading and on every section heading.
 *   2. A scroll-scrubbed portrait: the opening image drifts and settles as the
 *      frame leaves, so the hero has weight rather than sitting still.
 *   3. Sticky editorial labels, handled in CSS.
 *
 * Every guard here exists because the matching failure has shipped before:
 *  - the font wait is BOUNDED, so a stalled request can never leave a headline
 *    invisible;
 *  - `fromTo`, never `from`, because `from` reads the live value as the
 *    destination and a pre-hidden element then animates 0 to 0;
 *  - ScrollTrigger is registered lazily inside the effect, because register()
 *    calls enable() which reaches for matchMedia and throws at module scope
 *    where matchMedia is absent;
 *  - reduced motion bails out BEFORE anything is hidden;
 *  - a failsafe reveals everything unconditionally after 2.5s. A held page is
 *    a broken page.
 */

const heads = document.querySelectorAll<HTMLElement>("[data-split-lines]");
const reduced = matchMedia("(prefers-reduced-motion: reduce)");

function revealPlainly() {
  heads.forEach((el) => el.setAttribute("data-split-ready", ""));
}

const capable =
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  document.documentElement.classList.contains("js-reveal");

if (!heads.length || reduced.matches || !capable) {
  revealPlainly();
} else {
  const failsafe = setTimeout(revealPlainly, 2500);

  const fontsReady = Promise.race([
    document.fonts?.ready ?? Promise.resolve(),
    new Promise((r) => setTimeout(r, 1200)),
  ]);

  (async () => {
    try {
      const [{ gsap }, { SplitText }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/SplitText"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(SplitText, ScrollTrigger);
      await fontsReady;

      heads.forEach((el) => {
        // The opening heading lands on load; every other heading lands when it
        // arrives. Section headings are furniture and run faster, so the page
        // does not feel sluggish by the third one.
        const isHero = el.dataset.splitLines === "hero";
        const duration = isHero ? 0.9 : 0.66;
        const stagger = isHero ? 0.08 : 0.06;

        // eslint-disable-next-line no-new
        new SplitText(el, {
          type: "lines",
          linesClass: "line",
          mask: "lines",
          autoSplit: true,
          onSplit(self: { lines: Element[] }) {
            el.setAttribute("data-split-ready", "");
            const tween = gsap.fromTo(
              self.lines,
              { yPercent: 108 },
              {
                yPercent: 0,
                duration,
                stagger,
                ease: "expo.out",
                ...(isHero
                  ? { delay: 0.05 }
                  : {
                      scrollTrigger: {
                        trigger: el,
                        start: "top 88%",
                        once: true,
                        // Anything already above the fold when the trigger is
                        // created plays straight away rather than waiting for
                        // a scroll that may never come.
                        onRefresh: (self) => {
                          if (self.progress > 0 || self.isActive) tween.play();
                        },
                      },
                    }),
              },
            );
            // Per-element safety net. A fromTo with a scroll trigger applies
            // its start state immediately, so a trigger that never fires — a
            // late layout shift, a failed refresh — would leave these lines
            // parked outside their masks and permanently invisible. This is
            // exactly the "content hidden forever" failure worth guarding.
            if (!isHero) {
              setTimeout(() => {
                const r = el.getBoundingClientRect();
                const seen = r.top < innerHeight && r.bottom > 0;
                if (seen && tween.progress() === 0) tween.play();
              }, 1200);
            }
            return tween;
          },
        });
      });

      // A slow scrub on the opening portrait. Small on purpose: it gives the
      // frame weight without moving anything a reader is trying to read, and
      // it always has a defined end state.
      const portrait = document.querySelector<HTMLElement>("[data-scrub-portrait-img]");
      const frame = portrait?.closest("section") ?? null;
      if (portrait && frame && innerWidth >= 900) {
        gsap.fromTo(
          portrait,
          { yPercent: -2.5, scale: 1.10 },
          {
            yPercent: 2.5,
            scale: 1.02,
            ease: "none",
            scrollTrigger: { trigger: frame, start: "top top", end: "bottom top", scrub: 0.6 },
          },
        );
      }

      // Images settle after the split, so recompute trigger positions once
      // everything has loaded, then once more on the next frame.
      const settle = () => ScrollTrigger.refresh();
      if (document.readyState === "complete") requestAnimationFrame(settle);
      else addEventListener("load", () => requestAnimationFrame(settle), { once: true });

      // Last resort: anything still parked outside its mask after 3s is put
      // where it belongs, unconditionally. A held page is a broken page.
      setTimeout(() => {
        document.querySelectorAll<HTMLElement>("[data-split-lines] .line").forEach((line) => {
          const t = getComputedStyle(line).transform;
          if (t && t !== "none" && !/matrix\(1, 0, 0, 1, 0, 0\)/.test(t)) {
            gsap.set(line, { yPercent: 0, clearProps: "transform" });
          }
        });
        revealPlainly();
      }, 3000);

      clearTimeout(failsafe);
    } catch {
      clearTimeout(failsafe);
      revealPlainly();
    }
  })();
}
