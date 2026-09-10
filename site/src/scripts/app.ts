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

/* -------------------------------------------------------------------- form */
const form = document.querySelector<HTMLFormElement>("[data-contact-form]");
if (form) {
  const status = form.querySelector<HTMLElement>("[data-form-status]");
  const submit = form.querySelector<HTMLButtonElement>("button[type=submit]");
  const busyLabel = form.dataset.sendingLabel ?? "…";
  const idleLabel = submit?.textContent ?? "";

  const showError = (field: HTMLInputElement | HTMLSelectElement, message: string) => {
    const holder = field.closest(".field")?.querySelector<HTMLElement>("[data-field-error]");
    if (!holder) return;
    holder.textContent = message;
    field.setAttribute("aria-invalid", "true");
  };

  const clearError = (field: HTMLInputElement | HTMLSelectElement) => {
    const holder = field.closest(".field")?.querySelector<HTMLElement>("[data-field-error]");
    if (holder) holder.textContent = "";
    field.removeAttribute("aria-invalid");
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let firstInvalid: HTMLElement | null = null;

    const fields = form.querySelectorAll<HTMLInputElement | HTMLSelectElement>("[data-validate]");
    fields.forEach((field) => {
      clearError(field);
      const required = field.hasAttribute("required") && !field.value.trim();
      const badEmail =
        field.type === "email" && field.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(field.value);
      const badPhone =
        field.type === "tel" && field.value.trim() && field.value.replace(/\D/g, "").length < 7;

      if (required) showError(field, field.dataset.errRequired ?? "");
      else if (badEmail) showError(field, field.dataset.errEmail ?? "");
      else if (badPhone) showError(field, field.dataset.errPhone ?? "");
      else return;

      firstInvalid ??= field;
    });

    if (firstInvalid) {
      (firstInvalid as HTMLElement).focus();
      return;
    }

    if (submit) {
      submit.disabled = true;
      submit.textContent = busyLabel;
    }

    try {
      const res = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form) as unknown as Iterable<[string, string]>)),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.hidden = true;
      if (status) {
        status.textContent = form.dataset.successMessage ?? "";
        status.dataset.state = "ok";
        status.focus();
      }
    } catch {
      if (status) {
        status.innerHTML = `${form.dataset.failureMessage ?? ""} <a href="tel:${form.dataset.phone}">${form.dataset.phoneDisplay}</a>`;
        status.dataset.state = "error";
      }
      if (submit) {
        submit.disabled = false;
        submit.textContent = idleLabel;
      }
    }
  });
}
