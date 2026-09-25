(() => {
  const moreContent = document.getElementById("mas_contenido");
  const exploreBtn = document.getElementById("btn_explorar");
  if (!moreContent) return;

  let revealed = !moreContent.hidden;
  let touchStartY = 0;

  const revealAndGo = (targetSelector) => {
    moreContent.hidden = false;
    moreContent.classList.add("is-visible");
    revealed = true;

    const target = document.querySelector(targetSelector);
    if (!target) return;

    window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const tryRevealFromScroll = () => {
    if (revealed) return;
    revealAndGo("#destacados");
  };

  if (exploreBtn) {
    exploreBtn.addEventListener("click", (event) => {
      event.preventDefault();
      revealAndGo("#destacados");
    });
  }

  document.querySelectorAll('a[href="#identidad"], a[href="#contacto2"], a[href="#destacados"]').forEach((link) => {
    if (link === exploreBtn) return;

    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href) return;
      event.preventDefault();
      revealAndGo(href);
    });
  });

  // Scroll con rueda / trackpad en la portada
  window.addEventListener(
    "wheel",
    (event) => {
      if (revealed) return;
      if (event.deltaY > 12) {
        event.preventDefault();
        tryRevealFromScroll();
      }
    },
    { passive: false }
  );

  // Scroll táctil (mobile / tablet)
  window.addEventListener(
    "touchstart",
    (event) => {
      if (revealed || !event.touches.length) return;
      touchStartY = event.touches[0].clientY;
    },
    { passive: true }
  );

  window.addEventListener(
    "touchmove",
    (event) => {
      if (revealed || !event.touches.length) return;
      const delta = touchStartY - event.touches[0].clientY;
      if (delta > 36) {
        tryRevealFromScroll();
      }
    },
    { passive: true }
  );

  // Teclado
  window.addEventListener("keydown", (event) => {
    if (revealed) return;
    if (event.key === "ArrowDown" || event.key === "PageDown" || event.key === " ") {
      event.preventDefault();
      tryRevealFromScroll();
    }
  });

  // Si se entra desde otra página con #identidad / #contacto2 / #destacados
  const hash = window.location.hash;
  if (hash === "#identidad" || hash === "#contacto2" || hash === "#destacados") {
    revealAndGo(hash);
  }
})();
