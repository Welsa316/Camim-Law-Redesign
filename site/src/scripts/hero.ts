/**
 * The signature move: a masked line reveal on the opening heading.
 *
 * Deliberately the only GSAP on the site, loaded only where the attribute is
 * present, and only after the reduced-motion and capability checks pass.
 *
 * Every guard here exists because the corresponding failure has shipped before:
 *  - fonts are awaited but the wait is BOUNDED, so a stalled font request can
 *    never leave the headline invisible;
 *  - `fromTo`, never `from`, because `from` reads the element's live value as
 *    the destination and a pre-hidden element then animates 0 to 0;
 *  - ScrollTrigger is never registered here at all, because this runs once on
 *    load and registering it reaches for matchMedia at module scope;
 *  - the split is redone on resize, since lines split against a stale width
 *    leave masks misaligned mid-sentence;
 *  - a failsafe reveals everything unconditionally after 2.5s.
 */

const targets = document.querySelectorAll<HTMLElement>("[data-split-lines]");
const reduced = matchMedia("(prefers-reduced-motion: reduce)");

function revealPlainly() {
  targets.forEach((el) => el.setAttribute("data-split-ready", ""));
}

if (!targets.length || reduced.matches || !document.documentElement.classList.contains("js-reveal")) {
  revealPlainly();
} else {
  // A held page is a broken page: release unconditionally whatever happens.
  const failsafe = setTimeout(revealPlainly, 2500);

  const fontsReady = Promise.race([
    document.fonts?.ready ?? Promise.resolve(),
    new Promise((r) => setTimeout(r, 1200)),
  ]);

  (async () => {
    try {
      const [{ gsap }, { SplitText }] = await Promise.all([
        import("gsap"),
        import("gsap/SplitText"),
      ]);
      gsap.registerPlugin(SplitText);
      await fontsReady;

      targets.forEach((el) => {
        const split = new SplitText(el, {
          type: "lines",
          linesClass: "line",
          mask: "lines",
          // GSAP's own mask option wraps each line; the class keeps our CSS
          // in charge of the clipping box.
          autoSplit: true,
          onSplit(self: { lines: Element[] }) {
            el.setAttribute("data-split-ready", "");
            return gsap.fromTo(
              self.lines,
              { yPercent: 108 },
              {
                yPercent: 0,
                duration: 0.9,
                stagger: 0.08,
                ease: "expo.out",
                delay: 0.05,
              },
            );
          },
        });
        // Keep a handle so a future route change can revert it.
        (el as HTMLElement & { _split?: unknown })._split = split;
      });

      clearTimeout(failsafe);
    } catch {
      clearTimeout(failsafe);
      revealPlainly();
    }
  })();
}
