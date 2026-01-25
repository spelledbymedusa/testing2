(() => {
  const STORAGE_KEY = "theme";
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const root = document.documentElement;

  if (!themeToggle) {
    return;
  }

  const getPreferredTheme = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      return stored;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    const isDark = theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Hellmodus aktivieren" : "Dunkelmodus aktivieren"
    );
  };

  const applyTheme = (theme) => {
    setTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  };

  applyTheme(getPreferredTheme());

  themeToggle.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });
})();
