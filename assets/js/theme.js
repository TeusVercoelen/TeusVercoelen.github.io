// Determine the user's preferred theme
function determineTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// Apply the selected theme
function setTheme(theme) {
  const icon = document.getElementById("theme-icon");

  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  } else {
    document.documentElement.removeAttribute("data-theme");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  }
}

// Toggle between light and dark
function toggleTheme() {
  const currentTheme =
    document.documentElement.getAttribute("data-theme") === "dark"
      ? "dark"
      : "light";

  const newTheme = currentTheme === "dark" ? "light" : "dark";

  localStorage.setItem("theme", newTheme);
  setTheme(newTheme);
}

document.addEventListener("DOMContentLoaded", function () {
  setTheme(determineTheme());

  document.getElementById("theme-toggle")
    ?.addEventListener("click", toggleTheme);
});