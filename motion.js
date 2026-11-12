/* Sanfte Bewegung: Einblenden beim Scrollen, Foto-Tiefeneffekt,
   Sterne nacheinander, Kundenstimmen blättern von allein.
   Alles bleibt aus, wenn im Gerät "Bewegung reduzieren" eingestellt ist. */
(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduce.matches || !("IntersectionObserver" in window)) return;

  /* 1. Einblenden beim Scrollen */
  const revealSelectors = [
    ".portfolio-intro__row > *",
    ".about__images",
    ".about__copy > *",
    ".testimonials__heading",
    ".section-heading",
    ".package-grid > *",
    ".packages__included",
    ".packages__availability",
    ".packages__cta",
    ".reportage-teasers__heading",
    ".reportage-teaser",
    ".steps__image",
    ".steps__content > .eyebrow",
    ".steps__content > h2",
    ".steps__list li",
    ".faq__intro",
    ".accordion > *",
    ".inquiry__intro",
  ];
  const revealItems = document.querySelectorAll(revealSelectors.join(","));
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  revealItems.forEach((item) => {
    const siblings = [...item.parentElement.children].filter((child) => child.matches(revealSelectors.join(",")));
    const position = Math.min(siblings.indexOf(item), 4);
    item.style.setProperty("--reveal-delay", `${position * 110}ms`);
    item.classList.add("reveal");
    revealObserver.observe(item);
  });

  /* 2. Fotos bewegen sich beim Scrollen etwas langsamer (Tiefeneffekt) */
  const parallaxImages = [...document.querySelectorAll(".about__portrait .site-image, .steps__image .site-image")];
  parallaxImages.forEach((image) => image.parentElement.classList.add("parallax"));
  let ticking = false;
  function updateParallax() {
    const viewHeight = window.innerHeight;
    parallaxImages.forEach((image) => {
      const box = image.parentElement.getBoundingClientRect();
      if (box.bottom < 0 || box.top > viewHeight) return;
      const progress = (box.top + box.height / 2 - viewHeight / 2) / viewHeight;
      const shift = Math.max(-1, Math.min(1, progress)) * 5;
      image.style.setProperty("--parallax", `${shift.toFixed(2)}%`);
    });
    ticking = false;
  }
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateParallax);
      }
    },
    { passive: true },
  );
  updateParallax();

  /* 5. Google-Sterne leuchten nacheinander auf */
  const starGroups = document.querySelectorAll(".testimonials__stars");
  const starObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        starObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.1 },
  );
  starGroups.forEach((group) => {
    group.innerHTML = [...group.textContent.trim()]
      .map((star, index) => `<span class="star" style="--star-delay:${index * 140}ms">${star}</span>`)
      .join("");
    group.classList.add("stars-animate");
    starObserver.observe(group);
  });

  /* 4. Kundenstimmen blättern von allein weiter */
  const stage = document.querySelector(".testimonial-stage");
  const nextButton = document.querySelector("[data-testimonial-next]");
  const prevButton = document.querySelector("[data-testimonial-prev]");
  if (stage && nextButton) {
    let timer;
    let visible = false;
    let paused = false;
    let stoppedByVisitor = false;
    const run = () => {
      window.clearInterval(timer);
      if (visible && !paused && !stoppedByVisitor && !document.hidden) {
        timer = window.setInterval(() => nextButton.click(), 9000);
      }
    };
    new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        run();
      },
      { threshold: 0.4 },
    ).observe(stage);
    stage.addEventListener("mouseenter", () => {
      paused = true;
      run();
    });
    stage.addEventListener("mouseleave", () => {
      paused = false;
      run();
    });
    stage.addEventListener("touchstart", () => {
      stoppedByVisitor = true;
      run();
    }, { passive: true });
    [nextButton, prevButton].forEach((button) =>
      button?.addEventListener("pointerdown", () => {
        stoppedByVisitor = true;
        run();
      }),
    );
    document.addEventListener("visibilitychange", run);
  }
})();
