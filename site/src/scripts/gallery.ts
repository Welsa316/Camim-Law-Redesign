/**
 * Behaviour for the ported AccordionGallery.
 *
 * Mirrors the original's timeline: one GSAP tween per panel driving flex-grow,
 * a 3D tilt on the collapsed panels, a parallax drift on the inner media, and
 * a staggered caption reveal on the open one.
 *
 * Everything here is an enhancement. Without it the panels sit at equal width
 * with the first one's caption showing, which is a perfectly good static
 * gallery — so a failed import degrades to a plain row of photographs rather
 * than to an empty box.
 */

const roots = document.querySelectorAll<HTMLElement>("[data-accordion-gallery]");
const reduced = matchMedia("(prefers-reduced-motion: reduce)");

if (roots.length) {
  (async () => {
    let gsap: typeof import("gsap").gsap;
    try {
      ({ gsap } = await import("gsap"));
    } catch {
      return; // static fallback already renders
    }

    roots.forEach((root) => {
      const panels = [...root.querySelectorAll<HTMLElement>("[data-ag-panel]")];
      if (panels.length < 2) return;

      const num = (k: string, d: number) => Number(root.dataset[k] ?? d) || d;
      const expandRatio = Math.min(Math.max(num("expandRatio", 0.52), 0.2), 0.9);
      const duration = num("duration", 0.6);
      const parallax = num("parallax", 0.5);
      const tilt = num("tilt", 3);
      const stagger = num("stagger", 0.06);
      const gap = num("gap", 8);
      const ease = root.dataset.ease ?? "power3.out";
      const grayscale = root.dataset.grayscale === "true";
      const hoverTrigger = (root.dataset.trigger ?? "hover") === "hover";

      const count = panels.length;
      let active = Number(root.dataset.defaultIndex ?? 0) || 0;
      let mediaSize = 340;
      let tl: gsap.core.Timeline | null = null;
      let first = true;

      const stacked = () => matchMedia("(max-width: 767px)").matches;

      function layout(animate: boolean) {
        if (stacked()) {
          tl?.kill();
          gsap.set(panels, { clearProps: "all" });
          return;
        }
        const grow = count > 1 ? (expandRatio * (count - 1)) / (1 - expandRatio) : 1;
        const dur = animate && !reduced.matches ? duration : 0;

        tl?.kill();
        tl = gsap.timeline();

        panels.forEach((panel, i) => {
          const isActive = i === active;
          const media = panel.querySelector<HTMLElement>("[data-ag-media]");
          const bar = panel.querySelector<HTMLElement>("[data-ag-bar]");
          const text = panel.querySelector<HTMLElement>("[data-ag-text]");

          panel.toggleAttribute("data-active", isActive);
          // Image panels are single anchors, so "current" describes the open
          // one. A text panel holds several real links, and marking its
          // heading link current would misdescribe it.
          if (!("text" in panel.dataset)) {
            panel.querySelector("a")?.setAttribute("aria-current", isActive ? "true" : "false");
          }

          tl!.to(
            panel,
            {
              flexGrow: isActive ? grow : 1,
              rotateY: isActive ? 0 : i < active ? tilt : -tilt,
              duration: dur,
              ease,
            },
            0,
          );

          if (media) {
            const drift = Math.max(-1.5, Math.min(1.5, active - i));
            tl!.to(
              media,
              {
                xPercent: -50,
                yPercent: -50,
                x: isActive ? 0 : drift * parallax * mediaSize * 0.06,
                "--ag-gray": grayscale ? (isActive ? 0 : 1) : 0,
                "--ag-dim": isActive ? 0 : 0.42,
                duration: dur,
                ease,
              },
              0,
            );
          }

          if (bar && text) {
            tl!.to(
              [bar, text],
              isActive
                ? { opacity: 1, x: 0, duration: dur, ease, stagger: reduced.matches ? 0 : stagger }
                : { opacity: 0, x: -12, duration: dur * 0.6, ease },
              0,
            );
          }
        });
      }

      function measure() {
        const total = root.getBoundingClientRect().width;
        const usable = Math.max(total - gap * (count - 1), 120);
        mediaSize = Math.max(160, usable * expandRatio * 1.22);
        root.style.setProperty("--ag-media-size", `${Math.round(mediaSize)}px`);
        layout(!first);
        first = false;
      }

      const setActive = (i: number) => {
        if (i === active || stacked()) return;
        active = i;
        layout(true);
      };

      panels.forEach((panel, i) => {
        // Bound on the panel, not on its first anchor: a text panel holds a
        // heading link and a list of sub-links, and focus landing on any of
        // them must open the panel. focusin bubbles; focus does not.
        if (hoverTrigger) panel.addEventListener("pointerenter", () => setActive(i));
        panel.addEventListener("focusin", () => setActive(i));

        panel.addEventListener("click", (e) => {
          const a = (e.target as HTMLElement).closest("a");
          if (i !== active && !stacked()) {
            // A collapsed panel's first tap opens it rather than navigating,
            // which is what a touch user expects and what the original does.
            e.preventDefault();
            setActive(i);
            return;
          }
          if (a?.getAttribute("href")?.startsWith("#")) e.preventDefault();
        });

        panel.addEventListener("keydown", (e) => {
          const k = (e as KeyboardEvent).key;
          const go = (n: number) => {
            e.preventDefault();
            setActive(n);
            panels[n].querySelector<HTMLElement>("a")?.focus();
          };
          if (k === "ArrowRight" || k === "ArrowDown") go((i + 1) % count);
          else if (k === "ArrowLeft" || k === "ArrowUp") go((i - 1 + count) % count);
        });
      });

      measure();
      new ResizeObserver(measure).observe(root);
    });
  })();
}
