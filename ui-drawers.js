(() => {
  const shells = Array.from(document.querySelectorAll(".listcardShell"));

  if (!shells.length) {
    return;
  }

  const closeShell = (shell) => {
    const drawers = shell.querySelectorAll("[data-drawer]");
    drawers.forEach((drawer) => {
      drawer.hidden = true;
    });
    shell.querySelectorAll("[data-open-sort], [data-open-filter]").forEach((button) => {
      button.setAttribute("aria-expanded", "false");
    });
  };

  const closeAll = () => {
    shells.forEach((shell) => closeShell(shell));
  };

  shells.forEach((shell) => {
    const sortButton = shell.querySelector("[data-open-sort]");
    const filterButton = shell.querySelector("[data-open-filter]");
    const sortDrawer = shell.querySelector('[data-drawer="sort"]');
    const filterDrawer = shell.querySelector('[data-drawer="filter"]');

    const openDrawer = (drawer, button) => {
      if (!drawer || !button) {
        return;
      }
      const isOpen = !drawer.hidden;
      closeShell(shell);
      if (!isOpen) {
        drawer.hidden = false;
        button.setAttribute("aria-expanded", "true");
      }
    };

    if (sortButton) {
      sortButton.addEventListener("click", (event) => {
        event.stopPropagation();
        openDrawer(sortDrawer, sortButton);
      });
    }

    if (filterButton) {
      filterButton.addEventListener("click", (event) => {
        event.stopPropagation();
        openDrawer(filterDrawer, filterButton);
      });
    }

    shell.querySelectorAll("[data-drawer]").forEach((drawer) => {
      drawer.addEventListener("click", (event) => event.stopPropagation());
    });
  });

  document.addEventListener("click", closeAll);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAll();
    }
  });
})();
