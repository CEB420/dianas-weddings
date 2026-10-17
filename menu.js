const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  mobileMenu.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  menuToggle.querySelector(".menu-toggle__label").textContent = "Menü";
}

menuToggle.addEventListener("click", () => {
  const willOpen = menuToggle.getAttribute("aria-expanded") === "false";
  menuToggle.setAttribute("aria-expanded", String(willOpen));
  mobileMenu.classList.toggle("is-open", willOpen);
  document.body.classList.toggle("menu-open", willOpen);
  menuToggle.querySelector(".menu-toggle__label").textContent = willOpen ? "Schließen" : "Menü";
});

mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
window.addEventListener("resize", () => {
  if (window.innerWidth > 1050) closeMenu();
});
window.addEventListener(
  "scroll",
  () => header.classList.toggle("is-scrolled", window.scrollY > 20),
  { passive: true },
);
