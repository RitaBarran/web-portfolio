(() => {
  const lista = document.querySelector(".proceso-lista");
  if (!lista) return;

  const items = Array.from(lista.querySelectorAll(".proceso-item"));

  const setOpen = (item, open) => {
    const header = item.querySelector(".proceso-item__header");
    item.classList.toggle("is-open", open);
    if (header) header.setAttribute("aria-expanded", open ? "true" : "false");
  };

  items.forEach((item) => {
    const header = item.querySelector(".proceso-item__header");
    if (!header) return;

    header.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      items.forEach((other) => setOpen(other, false));

      if (!isOpen) {
        // Pequeño delay para que el cierre y la apertura se sientan suaves
        window.requestAnimationFrame(() => setOpen(item, true));
      }
    });

    header.addEventListener("pointerenter", () => {
      if (!item.classList.contains("is-open")) {
        item.classList.add("is-hover");
      }
    });

    header.addEventListener("pointerleave", () => {
      item.classList.remove("is-hover");
    });
  });
})();
