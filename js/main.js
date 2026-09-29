const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");
const mobileNavigation = window.matchMedia("(max-width: 47.999rem)");

if (menuToggle && primaryNavigation) {
  const closeMenu = ({ returnFocus = false } = {}) => {
    menuToggle.setAttribute("aria-expanded", "false");
    primaryNavigation.hidden = mobileNavigation.matches;

    if (returnFocus && mobileNavigation.matches) {
      menuToggle.focus();
    }
  };

  const syncMenu = () => {
    if (mobileNavigation.matches) {
      closeMenu();
    } else {
      primaryNavigation.hidden = false;
      menuToggle.setAttribute("aria-expanded", "false");
    }
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    primaryNavigation.hidden = isOpen;
  });

  primaryNavigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileNavigation.matches) {
        const targetSection = document.querySelector(link.hash);
        const targetHeading = targetSection?.querySelector("h2");

        closeMenu();

        if (targetHeading) {
          targetHeading.setAttribute("tabindex", "-1");
          requestAnimationFrame(() => targetHeading.focus({ preventScroll: true }));
        }
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      mobileNavigation.matches &&
      menuToggle.getAttribute("aria-expanded") === "true"
    ) {
      closeMenu({ returnFocus: true });
    }
  });

  if (typeof mobileNavigation.addEventListener === "function") {
    mobileNavigation.addEventListener("change", syncMenu);
  } else {
    mobileNavigation.addListener(syncMenu);
  }
  syncMenu();
}

const revealTargets = document.querySelectorAll(".section > .container");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (revealTargets.length && "IntersectionObserver" in window && !reducedMotion.matches) {
  revealTargets.forEach((target) => target.classList.add("reveal"));
  document.documentElement.classList.add("reveal-ready");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
}

const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}
