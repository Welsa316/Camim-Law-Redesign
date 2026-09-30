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
   navigation it is a control covering a control, which verify/widget-overlap.py
   now catches at every scroll position. The switch therefore retracts once the
   footer arrives — the page has ended, and the header's own pill is still the
   way back up. */
const langWidget = document.querySelector<HTMLElement>("[data-lang-widget]");
const pageFooter = document.querySelector("footer");
if (langWidget && "IntersectionObserver" in window) {
  // Two reasons to step aside, tracked together: the footer is on screen, or
  // something marked data-widget-clear (a form, whose every field is a
  // control) is passing through the bottom band the pill floats in.
  const over = new Set<Element>();
  const update = (entries: IntersectionObserverEntry[]) => {
    for (const e of entries) {
      if (e.isIntersecting) over.add(e.target);
      else over.delete(e.target);
    }
    langWidget.toggleAttribute("data-tucked", over.size > 0);
  };
  if (pageFooter) new IntersectionObserver(update, { threshold: 0 }).observe(pageFooter);
  const clear = document.querySelectorAll("[data-widget-clear]");
  if (clear.length) {
    const band = new IntersectionObserver(update, { threshold: 0, rootMargin: "-82% 0px 0px 0px" });
    clear.forEach((el) => band.observe(el));
  }
}

/* -------------------------------------------------------------------- form */
const form = document.querySelector<HTMLFormElement>("[data-contact-form]");
if (form) {
  // The script's messages replace the browser's own. Without the script the
  // browser's validation still runs, because noValidate is only set here.
  form.noValidate = true;
  const status = document.querySelector<HTMLElement>("[data-form-status]");
  const alertBox = form.querySelector<HTMLElement>("[data-form-alert]");
  const submit = form.querySelector<HTMLButtonElement>("button[type=submit]");
  const busyLabel = form.dataset.sendingLabel ?? "…";
  const idleLabel = submit?.textContent ?? "";
  type Field = HTMLInputElement | HTMLSelectElement;

  // A practice page's "book" button carries its topic, so the reader does
  // not have to find their matter again in the list.
  const tema = new URLSearchParams(location.search).get("tema");
  const topic = form.querySelector<HTMLSelectElement>("select[name=topic]");
  if (tema && topic && Array.from(topic.options).some((o) => o.value === tema)) topic.value = tema;

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

  const busy = (on: boolean) => {
    if (!submit) return;
    submit.disabled = on;
    submit.textContent = on ? busyLabel : idleLabel;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let first: Field | null = null;
    let missing = false;

    form.querySelectorAll<Field>("input, select").forEach((f) => {
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
    if (first) {
      (first as Field).focus();
      return;
    }

    if (status) status.hidden = true;
    busy(true);
    try {
      const res = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form) as unknown as Iterable<[string, string]>)),
      });
      if (res.status === 429) {
        if (status) {
          status.textContent = form.dataset.ratelimitMessage ?? "";
          status.dataset.state = "error";
          status.hidden = false;
        }
        busy(false);
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      form.hidden = true;
      if (status) {
        status.textContent = form.dataset.successMessage ?? "";
        status.dataset.state = "ok";
        status.hidden = false;
        status.focus();
      }
    } catch {
      if (status) {
        status.textContent = `${form.dataset.failureMessage ?? ""} `;
        const call = document.createElement("a");
        call.href = `tel:${form.dataset.phone}`;
        call.textContent = form.dataset.phoneDisplay ?? "";
        status.append(call);
        status.dataset.state = "error";
        status.hidden = false;
      }
      busy(false);
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
