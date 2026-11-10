document.addEventListener("DOMContentLoaded", function () {
  const sortButton = document.getElementById("tag-sort-button");
  const sortMenu = document.getElementById("tag-sort-menu");
  const tagsList = document.getElementById("tags-list");

  if (!sortButton || !sortMenu || !tagsList) return;

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

  function sortTags(direction) {
    const sections = Array.from(
      tagsList.querySelectorAll(".project-tag-section")
    );

    sections.sort(function (a, b) {
      const tagA = a.dataset.tag;
      const tagB = b.dataset.tag;

      return direction === "asc"
        ? tagA.localeCompare(tagB)
        : tagB.localeCompare(tagA);
    });

    sections.forEach(function (section) {
      tagsList.appendChild(section);
    });

    sortOptions.forEach(function (option) {
      const isActive = option.dataset.sort === direction;
      option.classList.toggle("is-active", isActive);
      option.setAttribute("aria-pressed", String(isActive));
    });
  }

  sortOptions.forEach(function (option) {
    option.addEventListener("click", function () {
      sortTags(option.dataset.sort);
      closeMenu();
    });
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".project-sort")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
      sortButton.focus();
    }
  });

  sortTags("asc");
});
