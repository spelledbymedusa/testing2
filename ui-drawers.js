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

    const positionDrawer = (drawer, button) => {
      if (!drawer || !button) {
        return;
      }
      const shellRect = shell.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      const drawerRect = drawer.getBoundingClientRect();
      const gap = 8;
      const maxLeft = shellRect.width - drawerRect.width - gap;
      const minLeft = gap;
      let left = buttonRect.right - shellRect.left - drawerRect.width;
      if (maxLeft < minLeft) {
        left = minLeft;
      } else {
        left = Math.min(Math.max(left, minLeft), maxLeft);
      }
      const top = buttonRect.bottom - shellRect.top + gap;
      drawer.style.left = `${left}px`;
      drawer.style.top = `${top}px`;
    };

    const openDrawer = (drawer, button) => {
      if (!drawer || !button) {
        return;
      }
      const isOpen = !drawer.hidden;
      closeShell(shell);
      if (!isOpen) {
        drawer.hidden = false;
        positionDrawer(drawer, button);
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
