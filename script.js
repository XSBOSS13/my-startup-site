const body = document.body;
const siteHeader = document.getElementById("siteHeader");
const siteLoader = document.getElementById("siteLoader");
const revealItems = document.querySelectorAll(".reveal");
const parallaxItems = document.querySelectorAll(".parallax");
const magneticItems = document.querySelectorAll(".magnetic");
const cursorGlow = document.getElementById("cursorGlow");

body.classList.add("loading");

/* Loader */
window.addEventListener("load", () => {
  setTimeout(() => {
    siteLoader.classList.add("hidden");
    body.classList.remove("loading");
  }, 1300);
});

/* Header state */
function handleHeader() {
  if (window.scrollY > 30) {
    body.classList.add("nav-scrolled");
  } else {
    body.classList.remove("nav-scrolled");
  }
}

handleHeader();
window.addEventListener("scroll", handleHeader, { passive: true });

/* Reveal on scroll */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px"
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

/* Parallax */
function handleParallax() {
  const scrollY = window.scrollY;

  parallaxItems.forEach((item) => {
    const speed = parseFloat(item.dataset.speed || "0.1");
    const rect = item.getBoundingClientRect();
    const elementTop = rect.top + scrollY;
    const offset = (scrollY - elementTop) * speed;

    item.style.transform = `translate3d(0, ${offset}px, 0)`;
  });
}

handleParallax();
window.addEventListener("scroll", handleParallax, { passive: true });
window.addEventListener("resize", handleParallax);

/* Magnetic hover */
magneticItems.forEach((item) => {
  item.addEventListener("mousemove", (e) => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    item.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "translate(0, 0)";
  });
});

/* Cursor glow */
window.addEventListener("mousemove", (e) => {
  if (!cursorGlow) return;
  cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});