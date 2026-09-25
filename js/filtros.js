(() => {
  const filterBar = document.querySelector(".filtros_proyectos");
  const grid = document.querySelector(".project-grid");
  if (!filterBar || !grid) return;

  const escapeHtml = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const renderProjects = (projects) => {
    grid.innerHTML = projects
      .map((project) => {
        const titulo = escapeHtml(project.titulo);
        const etiqueta = escapeHtml(project.etiqueta);
        const categorias = escapeHtml(project.categorias || "");
        const imagen = escapeHtml(project.imagen);
        const enlace = escapeHtml(project.enlace);
        const alt = escapeHtml(project.alt || `Proyecto ${project.titulo}`);

        return `
        <article class="project project-large" data-category="${categorias}">
            <a href="${enlace}">
                <div class="project-image">
                    <img src="${imagen}" alt="${alt}">
                    <div class="project-overlay">
                        <span>VER PROYECTO</span>
                        <span>→</span>
                    </div>
                </div>
                <div class="project-info">
                    <div>
                        <h2>${titulo}</h2>
                        <p>${etiqueta}</p>
                    </div>
                </div>
            </a>
        </article>`;
      })
      .join("");
  };

  const catalog = Array.isArray(window.PROYECTOS) ? window.PROYECTOS : [];
  renderProjects(catalog);

  const buttons = Array.from(filterBar.querySelectorAll(".filtros"));
  const getProjects = () => Array.from(grid.querySelectorAll(".project"));

  const setActive = (activeButton) => {
    buttons.forEach((button) => {
      button.classList.toggle("filtro_activo", button === activeButton);
    });
  };

  const applyFilter = (filter) => {
    const normalized = filter.toLowerCase();
    const projects = getProjects();

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
