(() => {
  const toggles = Array.from(document.querySelectorAll("[data-nav-toggle]"));
  const menus = Array.from(document.querySelectorAll("[data-nav-menu]"));

  if (!toggles.length || !menus.length) {
    return;
  }

  const closeAllMenus = () => {
    menus.forEach((menu) => menu.classList.remove("is-open"));
    toggles.forEach((toggle) => toggle.setAttribute("aria-expanded", "false"));
  };

  toggles.forEach((toggle) => {
    const key = toggle.dataset.navToggle;
    const menu = menus.find((item) => item.dataset.navMenu == key);

    if (!menu) {
      return;
    }

    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = menu.classList.contains("is-open");
      closeAllMenus();
      if (!isOpen) {
        menu.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
      }
    });

    menu.addEventListener("click", (event) => event.stopPropagation());
  });

  document.addEventListener("click", closeAllMenus);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllMenus();
    }
  });
})();
