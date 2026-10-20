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

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuToggle.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1050) closeMenu();
});

window.addEventListener(
  "scroll",
  () => header.classList.toggle("is-scrolled", window.scrollY > 20),
  { passive: true },
);

const slider = document.querySelector("[data-slider]");
const sliderTrack = slider.querySelector("[data-slider-track]");
const slides = [...slider.querySelectorAll("[data-slide]")];
const sliderCount = slider.querySelector("[data-slider-count]");
const sliderProgress = slider.querySelector("[data-slider-progress]");
const sliderPrev = slider.querySelector("[data-slider-prev]");
const sliderNext = slider.querySelector("[data-slider-next]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const loopMedia = window.matchMedia("(max-width: 820px)");
let activeSlide = 0;
let autoplayTimer;
let sliderVisible = true;
let scrollFrame;
let settleTimer;
let touching = false;

// Mobil läuft die Galerie endlos: Kopien der letzten Bilder stehen vorn, Kopien der ersten hinten.
// So sind auch beim ersten und letzten Bild links und rechts die Nachbarn angeschnitten zu sehen.
// Die Kopien sind per CSS nur mobil sichtbar.
const CLONE_COUNT = 2;

function cloneSlide(slide) {
  const clone = slide.cloneNode(true);
  clone.classList.add("portfolio-slide--clone");
  clone.removeAttribute("data-slide");
  clone.removeAttribute("aria-label");
  clone.setAttribute("aria-hidden", "true");
  return clone;
}

const headClones = slides.slice(-CLONE_COUNT).map(cloneSlide);
const tailClones = slides.slice(0, CLONE_COUNT).map(cloneSlide);
sliderTrack.prepend(...headClones);
sliderTrack.append(...tailClones);
const loopItems = [...headClones, ...slides, ...tailClones];

function isLooping() {
  return loopMedia.matches;
}

function sliderItems() {
  return isLooping() ? loopItems : slides;
}

function realIndex(itemIndex) {
  return isLooping() ? (itemIndex - CLONE_COUNT + slides.length) % slides.length : itemIndex;
}

function updateSliderStatus(index) {
  activeSlide = (index + slides.length) % slides.length;
  sliderCount.textContent = `${String(activeSlide + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
  sliderProgress.style.width = `${((activeSlide + 1) / slides.length) * 100}%`;
}

// Mobil sind die Bilder mittig eingerastet (scroll-snap-align: center), sonst linksbündig.
function slidePosition(slide) {
  const start = slide.offsetLeft - sliderTrack.offsetLeft;
  if (getComputedStyle(slide).scrollSnapAlign.includes("center")) {
    return start - (sliderTrack.clientWidth - slide.getBoundingClientRect().width) / 2;
  }
  return start;
}

function nearestItemIndex() {
  const items = sliderItems();
  return items.reduce((nearest, item, index) => {
    const distance = Math.abs(slidePosition(item) - sliderTrack.scrollLeft);
    const nearestDistance = Math.abs(slidePosition(items[nearest]) - sliderTrack.scrollLeft);
    return distance < nearestDistance ? index : nearest;
  }, 0);
}

// Springt ohne Animation zum echten Bild (z. B. von der Kopie des ersten Bildes zum ersten Bild).
function jumpToSlide(index) {
  sliderTrack.scrollTo({ left: slidePosition(slides[index]), behavior: "instant" });
}

function showSlide(index) {
  const behavior = reducedMotion.matches ? "auto" : "smooth";

  if (isLooping()) {
    // -1 und slides.length zeigen auf die Kopien am Rand, danach wird unsichtbar zurückgesprungen.
    const loopIndex = Math.max(-1, Math.min(slides.length, index));
    updateSliderStatus(loopIndex);
    sliderTrack.scrollTo({ left: slidePosition(loopItems[loopIndex + CLONE_COUNT]), behavior });
    return;
  }

  const slideWidth = slides[0].getBoundingClientRect().width;
  const trackGap = parseFloat(getComputedStyle(sliderTrack).columnGap) || 0;
  const visibleSlides = Math.max(1, Math.floor((sliderTrack.clientWidth + trackGap) / (slideWidth + trackGap)));
  const lastStartIndex = Math.max(0, slides.length - visibleSlides);
  const nextIndex = index < 0 ? lastStartIndex : index > lastStartIndex ? 0 : index;

  updateSliderStatus(nextIndex);
  sliderTrack.scrollTo({ left: slidePosition(slides[nextIndex]), behavior });
}

function settleLoop() {
  window.clearTimeout(settleTimer);
  if (!isLooping()) return;
  settleTimer = window.setTimeout(() => {
    if (touching) return;
    const nearest = nearestItemIndex();
    if (loopItems[nearest].classList.contains("portfolio-slide--clone")) jumpToSlide(realIndex(nearest));
  }, 150);
}

function alignSlider() {
  if (isLooping()) jumpToSlide(activeSlide);
  else showSlide(activeSlide);
}

updateSliderStatus(0);
requestAnimationFrame(() => {
  if (isLooping()) jumpToSlide(0);
});
loopMedia.addEventListener("change", alignSlider);
// Nur bei echter Breitenänderung neu ausrichten (die Adressleiste am Handy ändert nur die Höhe).
let trackWidth = sliderTrack.clientWidth;
window.addEventListener("resize", () => {
  if (sliderTrack.clientWidth === trackWidth) return;
  trackWidth = sliderTrack.clientWidth;
  if (isLooping()) jumpToSlide(activeSlide);
});

function stopAutoplay() {
  window.clearInterval(autoplayTimer);
}

function startAutoplay() {
  stopAutoplay();
  if (!sliderVisible || reducedMotion.matches || document.hidden) return;
  autoplayTimer = window.setInterval(() => showSlide(activeSlide + 1), 5500);
}

startAutoplay();

sliderTrack.addEventListener(
  "scroll",
  () => {
    window.cancelAnimationFrame(scrollFrame);
    scrollFrame = window.requestAnimationFrame(() => updateSliderStatus(realIndex(nearestItemIndex())));
    settleLoop();
  },
  { passive: true },
);

sliderTrack.addEventListener("touchstart", () => (touching = true), { passive: true });
["touchend", "touchcancel"].forEach((type) =>
  sliderTrack.addEventListener(
    type,
    () => {
      touching = false;
      settleLoop();
    },
    { passive: true },
  ),
);

sliderTrack.addEventListener("pointerdown", stopAutoplay);
sliderTrack.addEventListener("pointerup", startAutoplay);
sliderTrack.addEventListener("mouseenter", stopAutoplay);
sliderTrack.addEventListener("mouseleave", startAutoplay);
sliderTrack.addEventListener("focusin", stopAutoplay);
sliderTrack.addEventListener("focusout", startAutoplay);

sliderPrev.addEventListener("click", () => {
  showSlide(activeSlide - 1);
  startAutoplay();
});

sliderNext.addEventListener("click", () => {
  showSlide(activeSlide + 1);
  startAutoplay();
});

reducedMotion.addEventListener("change", startAutoplay);
document.addEventListener("visibilitychange", startAutoplay);

new IntersectionObserver(
  ([entry]) => {
    sliderVisible = entry.isIntersecting;
    sliderVisible ? startAutoplay() : stopAutoplay();
  },
  { threshold: 0.35 },
).observe(slider);

document.querySelectorAll(".accordion__item button").forEach((button) => {
  button.addEventListener("click", () => {
    const panel = button.closest(".accordion__item").querySelector(".accordion__panel");
    const willOpen = button.getAttribute("aria-expanded") === "false";

    button.setAttribute("aria-expanded", String(willOpen));
    panel.hidden = !willOpen;
  });
});

const testimonials = [...document.querySelectorAll("[data-testimonial]")];
const testimonialCount = document.querySelector("[data-testimonial-count]");
let activeTestimonial = 0;

function showTestimonial(index) {
  activeTestimonial = (index + testimonials.length) % testimonials.length;

  testimonials.forEach((testimonial, testimonialIndex) => {
    const isActive = testimonialIndex === activeTestimonial;
    testimonial.hidden = !isActive;
    testimonial.classList.toggle("is-active", isActive);
  });

  testimonialCount.textContent = `${String(activeTestimonial + 1).padStart(2, "0")} / ${String(testimonials.length).padStart(2, "0")}`;
}

document
  .querySelector("[data-testimonial-prev]")
  .addEventListener("click", () => showTestimonial(activeTestimonial - 1));
document
  .querySelector("[data-testimonial-next]")
  .addEventListener("click", () => showTestimonial(activeTestimonial + 1));

const form = document.querySelector("[data-preview-form]");
const formStatus = document.querySelector("[data-form-status]");
const dateInput = form.elements.weddingDate;
const dateUnknownInput = form.elements.dateUnknown;
const localToday = new Date();

localToday.setMinutes(localToday.getMinutes() - localToday.getTimezoneOffset());
dateInput.min = localToday.toISOString().split("T")[0];

dateUnknownInput.addEventListener("change", () => {
  dateInput.disabled = dateUnknownInput.checked;
  dateInput.required = !dateUnknownInput.checked;
  dateInput.value = dateUnknownInput.checked ? "" : dateInput.value;
  dateInput.setAttribute("aria-invalid", "false");
});

form.addEventListener("input", (event) => {
  if (!(event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement)) return;
  event.target.setAttribute("aria-invalid", "false");
  formStatus.classList.remove("is-error");
  formStatus.textContent = "";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let isValid = true;

  form.querySelectorAll("[required]").forEach((field) => {
    const fieldIsValid = field.checkValidity();
    field.setAttribute("aria-invalid", String(!fieldIsValid));
    isValid = isValid && fieldIsValid;
  });

  if (!isValid) {
    formStatus.textContent = "Bitte füllt alle Pflichtfelder korrekt aus.";
    formStatus.classList.add("is-error");
    form.querySelector("[aria-invalid='true']")?.focus();
    return;
  }

  const fields = form.elements;
  const submitButton = form.querySelector("button[type='submit']");
  const jotformId = "262892332273056";
  const data = new FormData();

  data.append("formID", jotformId);
  data.append("simple_spc", `${jotformId}-${jotformId}`);
  data.append("website", "");
  data.append("q2_q2_fullname0[first]", fields.names.value);
  data.append("q2_q2_fullname0[last]", "");
  data.append("q3_q3_email1", fields.email.value);
  data.append(
    "q12_euerHochzeitsdatum",
    fields.dateUnknown.checked ? "" : new Date(`${fields.weddingDate.value}T12:00`).toLocaleDateString("de-DE"),
  );
  data.append("q13_unserDatum", fields.dateUnknown.checked ? "Ja" : "");
  data.append("q6_q6_textbox4", fields.location.value);
  data.append("q7_q7_dropdown5", fields.package.value);
  data.append("q8_q8_textarea6", fields.message.value);

  submitButton.disabled = true;
  formStatus.classList.remove("is-error");
  formStatus.textContent = "Eure Anfrage wird gesendet …";

  fetch(`https://submit.jotform.com/submit/${jotformId}`, { method: "POST", mode: "no-cors", body: data })
    .then(() => {
      window.location.href = "danke.html";
    })
    .catch(() => {
      formStatus.classList.add("is-error");
      formStatus.textContent =
        "Die Anfrage konnte nicht gesendet werden. Bitte versucht es noch einmal oder schreibt direkt an dianafedotov@gmail.com.";
    })
    .finally(() => {
      submitButton.disabled = false;
    });
});

const initialAnchor = location.hash ? document.querySelector(location.hash) : null;
if (initialAnchor) {
  document.fonts.ready.then(() => {
    document.documentElement.style.scrollBehavior = "auto";
    initialAnchor.scrollIntoView();
    requestAnimationFrame(() => document.documentElement.style.removeProperty("scroll-behavior"));
  });
}
