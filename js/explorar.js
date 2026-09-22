(() => {
  const moreContent = document.getElementById("mas_contenido");
  const exploreBtn = document.getElementById("btn_explorar");
  if (!moreContent) return;

  const revealAndGo = (targetSelector) => {
    moreContent.hidden = false;
    moreContent.classList.add("is-visible");

    const target = document.querySelector(targetSelector);
    if (!target) return;

    window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
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

  // Si se entra desde otra página con #identidad / #contacto2 / #destacados
  const hash = window.location.hash;
  if (hash === "#identidad" || hash === "#contacto2" || hash === "#destacados") {
    revealAndGo(hash);
  }
})();
