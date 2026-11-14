
const menuButton = document.querySelector(".menu-toggle");
const navigationMenu = document.querySelector("#primary-menu");
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeToggleIcon = themeToggle?.querySelector(".theme-toggle-icon");
const themeToggleLabel = themeToggle?.querySelector(".theme-toggle-label");
const THEME_STORAGE_KEY = "adeniranPortfolioTheme";

function setTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  if (themeToggle) {
    themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
    themeToggle.setAttribute("aria-pressed", String(isDark));
  }
  if (themeToggleIcon) themeToggleIcon.textContent = isDark ? "☀" : "☾";
  if (themeToggleLabel) themeToggleLabel.textContent = isDark ? "Light mode" : "Dark mode";
}

let savedTheme = "light";
try {
  const themePreference = localStorage.getItem(THEME_STORAGE_KEY);
  if (themePreference === "dark" || themePreference === "light") savedTheme = themePreference;
} catch (error) {
  console.error("Could not read the saved color theme:", error);
}
setTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch (error) {
      console.error("Could not save the selected color theme:", error);
    }
  });
}

if (menuButton && navigationMenu) {
  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isExpanded));
    menuButton.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
    navigationMenu.classList.toggle("is-open", !isExpanded);
  });

  navigationMenu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
      navigationMenu.classList.remove("is-open");
    }
  });
}

document.querySelectorAll("[data-current-year]").forEach((yearElement) => {
  yearElement.textContent = String(new Date().getFullYear());
});
