(() => {
  const track = document.getElementById("proyectos_mostrados");
  if (!track) return;

  const items = Array.from(track.querySelectorAll(".destacado_item"));
  if (items.length < 2) return;

  let activeIndex = items.findIndex((item) => item.classList.contains("is-active"));
  if (activeIndex < 0) activeIndex = 0;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobileMq = window.matchMedia("(max-width: 700px)");
  let timerId = null;

  const isMobile = () => mobileMq.matches;

  const positionClass = (offset) => {
    if (offset === 0) return "is-active";
    if (offset === -1) return "is-prev";
    if (offset === 1) return "is-next";
    if (offset <= -2) return "is-far-prev";
    return "is-far-next";
  };

  const signedOffset = (index, active, total) => {
    let offset = index - active;
    const half = total / 2;

    if (offset > half) offset -= total;
    if (offset < -half) offset += total;
    if (offset === -half) offset = half;

    return offset;
  };

  const clearCoverflowClasses = () => {
    items.forEach((item) => {
      item.classList.remove(
        "is-active",
        "is-prev",
        "is-next",
        "is-far-prev",
        "is-far-next"
      );
    });
  };

  const updateClasses = () => {
    const total = items.length;

    items.forEach((item, index) => {
      item.classList.remove(
        "is-active",
        "is-prev",
        "is-next",
        "is-far-prev",
        "is-far-next"
      );

      const offset = signedOffset(index, activeIndex, total);
      item.classList.add(positionClass(offset));
    });
  };

  const goTo = (index) => {
    activeIndex = (index + items.length) % items.length;
    updateClasses();
  };

  const next = () => goTo(activeIndex + 1);

  const stopAutoplay = () => {
    if (timerId) {
      window.clearInterval(timerId);
      timerId = null;
    }
  };

  const startAutoplay = () => {
    if (reduceMotion || isMobile()) return;
    stopAutoplay();
    timerId = window.setInterval(next, 2000);
  };

  const onItemClick = (event) => {
    if (isMobile()) return;
    const index = items.indexOf(event.currentTarget);
    if (index < 0) return;
    goTo(index);
    startAutoplay();
  };

  items.forEach((item) => {
    item.addEventListener("click", onItemClick);
  });

  track.addEventListener("mouseenter", () => {
    if (!isMobile()) stopAutoplay();
  });

  track.addEventListener("mouseleave", () => {
    if (!isMobile()) startAutoplay();
  });

  const applyMode = () => {
    if (isMobile()) {
      stopAutoplay();
      clearCoverflowClasses();
      track.classList.add("destacados_carrusel--flat");
      return;
    }

    track.classList.remove("destacados_carrusel--flat");
    updateClasses();
    startAutoplay();
  };

  if (typeof mobileMq.addEventListener === "function") {
    mobileMq.addEventListener("change", applyMode);
  } else if (typeof mobileMq.addListener === "function") {
    mobileMq.addListener(applyMode);
  }

  applyMode();
})();
