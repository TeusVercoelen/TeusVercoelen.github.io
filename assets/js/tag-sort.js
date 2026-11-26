
document.addEventListener("DOMContentLoaded", function () {
  const sortButton = document.getElementById("project-sort-button");
  const sortMenu = document.getElementById("project-sort-menu");
  const tagsList = document.getElementById("tags-list");

  if (!sortButton || !sortMenu || !tagsList) return;

  const sortOptions = sortMenu.querySelectorAll("button[data-sort]");

  function closeMenu() {
    sortMenu.hidden = true;
    sortButton.setAttribute("aria-expanded", "false");
    sortMenu.style.left = "";
    sortMenu.style.right = "";
  }

  function positionSortMenu() {
    const buttonRect = sortButton.getBoundingClientRect();
    const viewportWidth = document.documentElement.clientWidth;
    const margin = 10;

    const mainColumn = document.querySelector(".page__inner-wrap");
    const columnRect = mainColumn
      ? mainColumn.getBoundingClientRect()
      : buttonRect;

    // The menu must never extend to the left of the main column.
    const minLeft = columnRect.left;

    // Limit menu width to the available space within the viewport.
    sortMenu.style.maxWidth =
      `${Math.max(0, viewportWidth - minLeft - margin)}px`;

    const menuWidth = sortMenu.offsetWidth;

    // Default: align the right edges.
    let left = buttonRect.right - menuWidth;

    // If that would cross the main column's left edge, align left edges.
    left = Math.max(minLeft, left);

    const parent = sortMenu.offsetParent || sortMenu.parentElement;
    const parentRect = parent.getBoundingClientRect();
    const parentLeft = parentRect.left + parent.clientLeft - parent.scrollLeft;

    sortMenu.style.left = `${left - parentLeft}px`;
    sortMenu.style.right = "auto";
  }

  sortButton.addEventListener("click", function () {
    const isOpen = !sortMenu.hidden;

    sortMenu.hidden = isOpen;
    sortButton.setAttribute("aria-expanded", String(!isOpen));

    if (!isOpen) {
      positionSortMenu();
    }
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

  // Close the dropdown when clicking elsewhere.
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".project-sort")) {
      closeMenu();
    }
  });

  // Close the dropdown with Escape.
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !sortMenu.hidden) {
      closeMenu();
      sortButton.focus();
    }
  });

  // Reposition on viewport resize while open.
  window.addEventListener("resize", function () {
    if (!sortMenu.hidden) {
      positionSortMenu();
    }
  });

  // Initial sorting: A-Z.
  sortTags("asc");
});
