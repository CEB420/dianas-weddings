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
let activeSlide = 0;
let autoplayTimer;
let sliderVisible = true;
let scrollFrame;

function updateSliderStatus(index) {
  activeSlide = (index + slides.length) % slides.length;
  sliderCount.textContent = `${String(activeSlide + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
  sliderProgress.style.width = `${((activeSlide + 1) / slides.length) * 100}%`;
}

function showSlide(index) {
  const slideWidth = slides[0].getBoundingClientRect().width;
  const trackGap = parseFloat(getComputedStyle(sliderTrack).columnGap) || 0;
  const visibleSlides = Math.max(1, Math.floor((sliderTrack.clientWidth + trackGap) / (slideWidth + trackGap)));
  const lastStartIndex = Math.max(0, slides.length - visibleSlides);
  const nextIndex = index < 0 ? lastStartIndex : index > lastStartIndex ? 0 : index;
  const target = slides[nextIndex].offsetLeft - sliderTrack.offsetLeft;

  updateSliderStatus(nextIndex);
  sliderTrack.scrollTo({ left: target, behavior: reducedMotion.matches ? "auto" : "smooth" });
}

updateSliderStatus(0);

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
    scrollFrame = window.requestAnimationFrame(() => {
      const nearestIndex = slides.reduce((nearest, slide, index) => {
        const slidePosition = slide.offsetLeft - sliderTrack.offsetLeft;
        const nearestPosition = slides[nearest].offsetLeft - sliderTrack.offsetLeft;
        return Math.abs(slidePosition - sliderTrack.scrollLeft) < Math.abs(nearestPosition - sliderTrack.scrollLeft)
          ? index
          : nearest;
      }, 0);
      updateSliderStatus(nearestIndex);
    });
  },
  { passive: true },
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
      form.reset();
      dateInput.disabled = false;
      dateInput.required = true;
      formStatus.textContent = "Danke für eure Anfrage! Ich melde mich innerhalb von 48 Stunden persönlich bei euch.";
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
