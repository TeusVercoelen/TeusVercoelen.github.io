document.addEventListener("DOMContentLoaded", function () {
  const sortButton = document.getElementById("project-sort-button");
  const sortMenu = document.getElementById("project-sort-menu");
  const projectsList = document.getElementById("projects-list");

  if (!sortButton || !sortMenu || !projectsList) return;

  const sortOptions = sortMenu.querySelectorAll("button[data-sort]");

  function closeMenu() {
    sortMenu.hidden = true;
    sortButton.setAttribute("aria-expanded", "false");
  }

  sortButton.addEventListener("click", function () {
    const isOpen = !sortMenu.hidden;

    sortMenu.hidden = isOpen;
    sortButton.setAttribute("aria-expanded", String(!isOpen));
  });

  function compareDates(a, b, direction) {
    const dateA = a.dataset[direction];
    const dateB = b.dataset[direction];

    // Projects without dates always appear last.
    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;

    return direction === "started"
      ? dateA.localeCompare(dateB)
      : dateA.localeCompare(dateB);
  }

  function sortProjects(sortType) {
    const projects = Array.from(
      projectsList.querySelectorAll(".archive__item, .project-list-item")
    );

    projects.sort(function (a, b) {
      let result = 0;

      switch (sortType) {
        case "featured":
          result = Number(a.dataset.order) - Number(b.dataset.order);
          break;

        case "started-asc":
          result = compareDates(a, b, "started");
          break;

        case "started-desc":
          result = -compareDates(a, b, "started");
          break;

        case "updated-asc":
          result = compareDates(a, b, "updated");
          break;

        case "updated-desc":
          result = -compareDates(a, b, "updated");
          break;

        case "title-asc":
          result = a.dataset.title.localeCompare(b.dataset.title);
          break;

        case "title-desc":
          result = b.dataset.title.localeCompare(a.dataset.title);
          break;
      }

      // Use title as a consistent tie-breaker.
      if (result === 0) {
        result = a.dataset.title.localeCompare(b.dataset.title);
      }

      return result;
    });

    projects.forEach(function (project) {
      projectsList.appendChild(project);
    });

    sortOptions.forEach(function (option) {
      const isActive = option.dataset.sort === sortType;
      option.classList.toggle("is-active", isActive);
      option.setAttribute("aria-pressed", String(isActive));
    });
  }

  sortOptions.forEach(function (option) {
    option.addEventListener("click", function () {
      sortProjects(option.dataset.sort);
      closeMenu();
    });
  });

  // Close the dropdown when clicking elsewhere.
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".project-sort")) {
      closeMenu();
    }
  });

  // Close the dropdown with Escape.
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
      sortButton.focus();
    }
  });

  // Initial sorting: Featured.
  sortProjects("featured");
});