// Homepage behaviour, ~2 KB, no libraries (R-207): mobile menu, category tabs, route progress, sticky call bar.
// Everything works without this file: anchors, all category panels in order, the call bar always shown.

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Mobile menu */
const menuBtn = document.querySelector<HTMLButtonElement>("[data-menu-btn]");
const nav = document.getElementById("site-nav");
if (menuBtn && nav) {
  menuBtn.hidden = false;
  const setOpen = (open: boolean) => {
    menuBtn.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  };
  menuBtn.addEventListener("click", () => setOpen(menuBtn.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", (e) => {
    if ((e.target as HTMLElement).closest("a[href^='#']")) setOpen(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") { setOpen(false); menuBtn.focus(); }
  });
}

/* FutureLink: a tap (or Enter/Space) toggles the «Розділ у розробці» note; Esc or a tap outside hides it */
const futures = [...document.querySelectorAll<HTMLElement>(".future-link")];
const closeFutures = (except?: Element) => futures.forEach((f) => { if (f !== except) f.classList.remove("is-open"); });
futures.forEach((f) => {
  f.addEventListener("click", (e) => { e.stopPropagation(); closeFutures(f); f.classList.toggle("is-open"); });
  f.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); closeFutures(f); f.classList.toggle("is-open"); }
  });
  f.addEventListener("blur", () => f.classList.remove("is-open"));
});
document.addEventListener("click", () => closeFutures());
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  closeFutures();
  const a = document.activeElement;
  if (a instanceof HTMLElement && a.classList.contains("future-link")) a.blur();
});

/* «Документи для вступу» link from categories opens the list in #theory */
document.querySelectorAll<HTMLAnchorElement>("a[href='#docs']").forEach((a) =>
  a.addEventListener("click", () => { const d = document.getElementById("docs") as HTMLDetailsElement | null; if (d) d.open = true; }));

/* Category switcher: tabs with arrow keys (effect 3: the new panel settles in 240 ms) */
document.querySelectorAll<HTMLElement>("[data-tabs]").forEach((root) => {
  const tabs = [...root.querySelectorAll<HTMLButtonElement>("[role=tab]")];
  const panels = tabs.map((t) => document.getElementById(t.getAttribute("aria-controls") || "")!);
  panels.forEach((p, i) => { p.hidden = i !== 0; });
  const select = (i: number, focus = false) => {
    tabs.forEach((t, j) => {
      const on = i === j;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      const p = panels[j];
      p.hidden = !on;
      p.classList.toggle("is-active", on);
      p.classList.remove("is-entering");
      if (on && !reduce) { void p.offsetWidth; p.classList.add("is-entering"); }
    });
    if (focus) tabs[i].focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => select(i));
    t.addEventListener("keydown", (e) => {
      const last = tabs.length - 1;
      let n = -1;
      if (e.key === "ArrowRight") n = i === last ? 0 : i + 1;
      else if (e.key === "ArrowLeft") n = i === 0 ? last : i - 1;
      else if (e.key === "Home") n = 0;
      else if (e.key === "End") n = last;
      if (n >= 0) { e.preventDefault(); select(n, true); }
    });
  });
});

/* Route progress (effect 2): segments up to the current section fill with yellow */
const order = ["categories", "branches", "theory", "practice", "finish"];
const stepOf: Record<string, number> = { hero: -1, categories: 0, branches: 1, theory: 2, practice: 3, services: 3, finish: 4 };
const marks = [...document.querySelectorAll<HTMLElement>("[data-progress]")];
const navLinks = [...document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]")];
const paint = (step: number) => {
  marks.forEach((m) => {
    const idx = order.indexOf(m.dataset.progress || "");
    m.classList.toggle("is-done", idx <= step);
    if (m.tagName === "A") {
      if (idx === step) m.setAttribute("aria-current", "step"); else m.removeAttribute("aria-current");
    }
  });
  navLinks.forEach((a) => {
    const idx = order.indexOf((a.getAttribute("href") || "").slice(1));
    if (idx === step) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
  });
};
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) paint(stepOf[e.target.id] ?? -1);
  }, { rootMargin: "-45% 0px -54% 0px" });
  Object.keys(stepOf).forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
}

/* Sticky call bar on phones (R-203): shown once the hero call button is off screen */
const bar = document.querySelector<HTMLElement>("[data-callbar]");
const heroCall = document.querySelector<HTMLElement>("[data-hero-call]");
if (bar && heroCall && "IntersectionObserver" in window) {
  new IntersectionObserver(([e]) => {
    bar.classList.toggle("is-shown", !e.isIntersecting && e.boundingClientRect.top < 0);
  }).observe(heroCall);
} else if (bar) {
  bar.classList.add("is-shown");
}
