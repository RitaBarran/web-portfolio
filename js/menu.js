(() => {
  const toggle = document.querySelector(".menu_toggle");
  const menu = document.getElementById("menu");

  if (!toggle || !menu) return;

  const setOpen = (open) => {
    toggle.classList.toggle("is-open", open);
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  };

  toggle.addEventListener("click", () => {
    setOpen(!menu.classList.contains("is-open"));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("click", (event) => {
    if (!menu.classList.contains("is-open")) return;
    if (menu.contains(event.target) || toggle.contains(event.target)) return;
    setOpen(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) setOpen(false);
  });
})();
