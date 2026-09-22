(() => {
  const filterBar = document.querySelector(".filtros_proyectos");
  const grid = document.querySelector(".project-grid");
  if (!filterBar || !grid) return;

  const buttons = Array.from(filterBar.querySelectorAll(".filtros"));
  const projects = Array.from(grid.querySelectorAll(".project"));

  const setActive = (activeButton) => {
    buttons.forEach((button) => {
      button.classList.toggle("filtro_activo", button === activeButton);
    });
  };

  const applyFilter = (filter) => {
    const normalized = filter.toLowerCase();

    projects.forEach((project) => {
      const categories = (project.dataset.category || "").toLowerCase().split(/\s+/);
      const matches = normalized === "todos" || categories.includes(normalized);
      project.classList.toggle("is-hidden", !matches);
    });

    grid.classList.toggle("is-filtered", normalized !== "todos");
  };

  filterBar.addEventListener("click", (event) => {
    const button = event.target.closest(".filtros");
    if (!button || !filterBar.contains(button)) return;

    const filter = button.dataset.filter || "todos";
    setActive(button);
    applyFilter(filter);
  });

  const defaultButton =
    filterBar.querySelector(".filtro_activo") ||
    filterBar.querySelector('[data-filter="todos"]') ||
    buttons[0];

  if (defaultButton) {
    setActive(defaultButton);
    applyFilter(defaultButton.dataset.filter || "todos");
  }
})();
