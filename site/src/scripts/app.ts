/**
 * All client behaviour. Small, dependency-free, and additive: every feature
 * here enhances a page that already works without it.
 *
 * The reveal system is CSS-driven. This file only adds `data-revealed` when an
 * element enters the viewport. If it never runs, `js-reveal` was never added to
 * <html> (see the inline head script), so nothing was hidden in the first place.
 */

/* ------------------------------------------------------------------ header */
const header = document.querySelector<HTMLElement>("[data-header]");

/**
 * Set while the header is drawn over a dark opening frame. Kept in a variable
 * rather than read back off the element, because the element's attribute is
 * exactly what gets toggled.
 */
const startsOverHero = header?.hasAttribute("data-over") ?? false;
const hero = document.querySelector<HTMLElement>("[data-hero]");

/** Re-evaluate the header's ground. Safe to call at any time. */
let syncHeader = () => {};
/** Tell the header the drawer's state. Assigned inside the header block. */
let setHeaderMenuOpen = (_open: boolean) => {};

if (header) {
  let ticking = false;
  let menuOpen = false;

  syncHeader = () => {
    header.toggleAttribute("data-scrolled", window.scrollY > 24);
    if (!startsOverHero) return;
    // The drawer's own ground is paper, so the bar has to be paper too while
    // it is open, whatever the frame behind it is doing.
    if (menuOpen) {
      header.removeAttribute("data-over");
      return;
    }
    // Measured from the frame's own box rather than from a scroll offset, so
    // it stays correct through the frame's negative top margin and through
    // any later change to its height.
    const past = hero ? hero.getBoundingClientRect().bottom <= header.offsetHeight + 4 : false;
    header.toggleAttribute("data-over", !past);
  };

  const update = () => {
    syncHeader();
    ticking = false;
  };

  addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    },
    { passive: true },
  );
  addEventListener("resize", update, { passive: true });
  update();

  setHeaderMenuOpen = (open: boolean) => {
    menuOpen = open;
    syncHeader();
  };
}

/* ------------------------------------------------------------------ drawer */
const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
const menu = document.querySelector<HTMLElement>("[data-menu]");
const menuLabel = document.querySelector<HTMLElement>("[data-menu-label]");

if (toggle && menu) {
  const labels = {
    open: menuLabel?.textContent ?? "Menu",
    close: document.documentElement.lang === "es" ? "Cerrar menú" : "Close menu",
  };

  const setOpen = (open: boolean) => {
    menu.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
    // The open drawer covers the page, so everything outside the header is
    // taken out of the tab order and the accessibility tree while it is open;
    // otherwise Tab walks on into links the reader cannot see (WCAG 2.4.11).
    const shell = toggle.closest("header");
    for (const el of Array.from(document.body.children)) {
      if (el !== shell && el instanceof HTMLElement) el.inert = open;
    }
    if (menuLabel) menuLabel.textContent = open ? labels.close : labels.open;
    setHeaderMenuOpen(open);
  };

  toggle.addEventListener("click", () => setOpen(menu.hidden));

  addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !menu.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Close on navigation within the drawer.
  menu.addEventListener("click", (e) => {
    if ((e.target as HTMLElement).closest("a")) setOpen(false);
  });

  // A resize past the desktop breakpoint must not strand an open drawer.
  matchMedia("(min-width: 1160px)").addEventListener("change", (e) => {
    if (e.matches && !menu.hidden) setOpen(false);
  });
}

/* ----------------------------------------------------------------- reveals */
const reduced = matchMedia("(prefers-reduced-motion: reduce)");

if (!reduced.matches && "IntersectionObserver" in window) {
  const items = document.querySelectorAll<HTMLElement>("[data-reveal]");

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.setAttribute("data-revealed", "");
        // Drop will-change once the transition has finished.
        el.addEventListener(
          "transitionend",
          () => el.setAttribute("data-settled", ""),
          { once: true },
        );
        io.unobserve(el);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
  );

  // Stagger is a per-element custom property, so siblings arrive in sequence
  // without any timeline code.
  for (const group of document.querySelectorAll<HTMLElement>("[data-stagger]")) {
    const children = group.querySelectorAll<HTMLElement>("[data-reveal]");
    children.forEach((child, i) => {
      child.style.setProperty("--reveal-delay", `${i * 70}ms`);
    });
  }

  items.forEach((el) => io.observe(el));

  // Failsafe: anything still hidden after 3s is revealed unconditionally.
  // A held page is a broken page.
  setTimeout(() => {
    document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])").forEach((el) => {
      el.setAttribute("data-revealed", "");
    });
  }, 3000);
} else {
  document.documentElement.classList.remove("js-reveal");
}

/* --------------------------------------------------------- hero slideshow */
/* Cross-fades the opening frame's photographs. The dots are the control WCAG
   2.2.2 asks for on anything that moves by itself, and using one stops the
   timer: a reader who has taken hold of it should not have it taken back. */
const slides = [...document.querySelectorAll<HTMLElement>("[data-slide]")];
const dots = [...document.querySelectorAll<HTMLElement>("[data-dot]")];
if (slides.length > 1) {
  const SLIDE_MS = 8000;
  let at = 0;
  let timer = 0;

  const show = (i: number) => {
    at = (i + slides.length) % slides.length;
    slides.forEach((el, n) => el.toggleAttribute("data-on", n === at));
    dots.forEach((el, n) =>
      n === at ? el.setAttribute("aria-current", "true") : el.removeAttribute("aria-current"));
  };
  const stop = () => { if (timer) { clearInterval(timer); timer = 0; } };
  const start = () => {
    if (!timer && !reduced.matches) timer = window.setInterval(() => show(at + 1), SLIDE_MS);
  };

  dots.forEach((el, n) => el.addEventListener("click", () => { stop(); show(n); }));
  // Nothing advances while the tab is in the background; coming back should
  // not dump four transitions at once.
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
  reduced.addEventListener("change", () => (reduced.matches ? stop() : start()));
  start();
}

/* ------------------------------------------------------ language switch */
/* A fixed pill sits on top of whatever scrolls under it. Over body copy that
   is what a floating control does; over the footer's own brand link and its
   navigation it would be a control covering a control. It used to retract
   while the footer was on screen, which on a short page meant it was never
   seen at all. Now it stays, and rides the footer's top edge instead: as the
   footer comes up under it, it is lifted by exactly as much, so it is on
   every page and never on the footer. */
const langWidget = document.querySelector<HTMLElement>("[data-lang-widget]");
const pageFooter = document.querySelector("footer");
if (langWidget && pageFooter) {
  let queued = false;
  const dock = () => {
    queued = false;
    const lift = Math.max(0, innerHeight - pageFooter.getBoundingClientRect().top);
    langWidget.style.setProperty("--lw-lift", `${Math.round(lift)}px`);
  };
  addEventListener("scroll", () => { if (!queued) { queued = true; requestAnimationFrame(dock); } }, { passive: true });
  addEventListener("resize", dock);
  addEventListener("load", dock);
  dock();
}

/* -------------------------------------------------------------------- form */
/* The consultation card: step 1 is the matter, chosen from a list that stays
   tucked away until opened; step 2 is the person's details; step 3 is the
   thanks. Panels slide inside a frame whose height follows the current one. */
const card = document.querySelector<HTMLElement>("[data-stepper]");
const form = card?.querySelector<HTMLFormElement>("[data-contact-form]");
if (card && form) {
  // The script's messages replace the browser's own. Without the script the
  // browser's validation still runs, because noValidate is only set here.
  form.noValidate = true;
  type Field = HTMLInputElement;
  const vp = card.querySelector<HTMLElement>("[data-viewport]")!;
  const panels = Array.from(card.querySelectorAll<HTMLElement>("[data-panel]"));
  const dots = Array.from(card.querySelectorAll<HTMLElement>("[data-dot]"));
  const chosen = card.querySelector<HTMLElement>("[data-chosen]")!;
  const btn = card.querySelector<HTMLButtonElement>("[data-picker-btn]")!;
  const list = card.querySelector<HTMLElement>("[data-picker-list]")!;
  const value = card.querySelector<HTMLElement>("[data-picker-value]")!;
  const alertBox = form.querySelector<HTMLElement>("[data-form-alert]");
  const errorBox = form.querySelector<HTMLElement>("[data-form-error]");
  const done = card.querySelector<HTMLElement>("[data-form-status]");
  const send = form.querySelector<HTMLButtonElement>("[data-send]");
  const sendLabel = form.querySelector<HTMLElement>("[data-send-label]");
  const idleLabel = sendLabel?.textContent ?? "";
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const go = (n: number) => {
    card.dataset.step = String(n);
    panels.forEach((p) => {
      const k = Number(p.dataset.panel);
      p.dataset.pos = k === n ? "here" : k < n ? "left" : "right";
    });
    dots.forEach((d) => {
      if (Number(d.dataset.dot) <= n) d.dataset.state = "";
      else delete d.dataset.state;
    });
    const here = panels.find((p) => Number(p.dataset.panel) === n);
    if (here) vp.style.height = `${here.offsetHeight}px`;
  };
  // The frame follows whatever the current panel needs: opening the list,
  // or a message appearing, grows the card rather than clipping it.
  const resize = () => go(Number(card.dataset.step));
  addEventListener("resize", resize);
  if ("ResizeObserver" in window) {
    const ro = new ResizeObserver(resize);
    panels.forEach((p) => ro.observe(p));
  }
  // Focus moving inside the clipped frame must not scroll it.
  vp.addEventListener("scroll", () => { if (vp.scrollTop) vp.scrollTop = 0; });

  const setOpen = (open: boolean, focusList = false) => {
    list.hidden = !open;
    btn.setAttribute("aria-expanded", String(open));
    if (open && focusList) {
      const target = list.querySelector<HTMLInputElement>("input:checked") ?? list.querySelector<HTMLInputElement>("input");
      target?.focus({ preventScroll: true });
      const row = target?.closest("label");
      if (row) list.scrollTop = Math.max(0, row.offsetTop - list.clientHeight / 2 + row.offsetHeight / 2);
    }
    vp.scrollTop = 0;
  };
  btn.addEventListener("click", () => setOpen(list.hidden, true));
  list.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { setOpen(false); btn.focus(); }
  });
  document.addEventListener("click", (e) => {
    if (!list.hidden && !btn.parentElement!.contains(e.target as Node)) setOpen(false);
  });

  const choose = (input: HTMLInputElement, advance: boolean) => {
    input.checked = true;
    const name = input.closest("label")?.querySelector(".topic-name")?.textContent ?? "";
    chosen.textContent = name;
    value.textContent = name;
    btn.dataset.chosen = "";
    setOpen(false);
    if (advance) {
      go(2);
      setTimeout(() => form.querySelector<HTMLInputElement>("#firstName")?.focus({ preventScroll: true }), reduced ? 0 : 460);
    }
  };
  list.querySelectorAll<HTMLInputElement>("input[name=topic]").forEach((r) => {
    // A pointer picks. The click a row forwards to its radio, like an arrow
    // key's, carries no click count and only moves the selection; Enter picks.
    r.closest("label")?.addEventListener("click", (e) => { if (e.detail > 0) choose(r, true); });
    r.addEventListener("keydown", (e) => {
      if (e.key === "Enter") { e.preventDefault(); choose(r, true); }
    });
  });
  card.querySelector("[data-back]")?.addEventListener("click", () => {
    go(1);
    setTimeout(() => btn.focus({ preventScroll: true }), reduced ? 0 : 460);
  });

  // A practice page's "book" button carries its matter: start at step 2.
  const tema = new URLSearchParams(location.search).get("tema");
  const preset = tema ? list.querySelector<HTMLInputElement>(`input[name=topic][value="${CSS.escape(tema)}"]`) : null;
  if (preset) choose(preset, false);
  go(preset ? 2 : 1);

  const phoneBad = (f: Field) => f.type === "tel" && !!f.value.trim() && f.value.replace(/\D/g, "").length < 7;
  const errorHolder = (f: Field) => f.closest(".field")?.querySelector<HTMLElement>("[data-field-error]");

  // A field stops being marked the moment it is corrected, not on the next send.
  form.addEventListener("input", (e) => {
    const f = e.target as Field;
    if (f.getAttribute("aria-invalid") !== "true") return;
    if ((f.required && !f.value.trim()) || phoneBad(f)) return;
    f.removeAttribute("aria-invalid");
    const holder = errorHolder(f);
    if (holder) holder.textContent = "";
    if (!form.querySelector('[aria-invalid="true"]') && alertBox) alertBox.hidden = true;
  });

  const busy = (state: "busy" | "ok" | null) => {
    if (!send) return;
    if (state) send.dataset.state = state;
    else delete send.dataset.state;
    send.disabled = state !== null;
    // The visible label fades for the ring; a screen reader hears this.
    if (sendLabel) sendLabel.textContent = state === "busy" ? (form.dataset.sendingLabel ?? "") : idleLabel;
  };
  const showError = (text: string, withCall: boolean) => {
    if (!errorBox) return;
    errorBox.textContent = `${text} `;
    if (withCall) {
      const call = document.createElement("a");
      call.href = `tel:${form.dataset.phone}`;
      call.textContent = form.dataset.phoneDisplay ?? "";
      errorBox.append(call);
    }
    errorBox.hidden = false;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.querySelector("input[name=topic]:checked")) { go(1); btn.focus(); return; }
    let first: Field | null = null;
    let missing = false;
    panels[1].querySelectorAll<Field>("input[type=text], input[type=tel]").forEach((f) => {
      const empty = f.required && !f.value.trim();
      const bad = phoneBad(f);
      const holder = errorHolder(f);
      if (holder) holder.textContent = bad ? (form.dataset.phoneMessage ?? "") : "";
      if (empty || bad) {
        f.setAttribute("aria-invalid", "true");
        first ??= f;
        missing ||= empty;
      } else {
        f.removeAttribute("aria-invalid");
      }
    });
    if (alertBox) {
      alertBox.textContent = missing ? (form.dataset.requiredMessage ?? "") : "";
      alertBox.hidden = !missing;
    }
    if (first) { (first as Field).focus(); return; }

    if (errorBox) errorBox.hidden = true;
    busy("busy");
    try {
      const res = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form) as unknown as Iterable<[string, string]>)),
      });
      if (res.status === 429) {
        busy(null);
        showError(form.dataset.ratelimitMessage ?? "", false);
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      busy("ok");
      setTimeout(() => {
        go(3);
        done?.focus({ preventScroll: true });
      }, reduced ? 0 : 700);
    } catch {
      busy(null);
      showError(form.dataset.failureMessage ?? "", true);
    }
  });
}

// In-page index on the long practice pages: mark the section being read, so
// the pinned rail says where the reader is on a page eleven screens long.
const pageIndex = document.querySelector<HTMLElement>("[data-index]");
if (pageIndex) {
  const links = Array.from(pageIndex.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
  const targets = links.map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1))));
  let queued = false;
  const mark = () => {
    queued = false;
    const line = (parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 100) + 48;
    let current = -1;
    targets.forEach((el, i) => { if (el && el.getBoundingClientRect().top <= line) current = i; });
    links.forEach((a, i) => {
      if (i === current) a.setAttribute("aria-current", "location");
      else a.removeAttribute("aria-current");
    });
  };
  addEventListener("scroll", () => { if (!queued) { queued = true; requestAnimationFrame(mark); } }, { passive: true });
  mark();
}
