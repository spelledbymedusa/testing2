(() => {
  const DESKTOP_BREAKPOINT = 900;

  const NAV = [
    { href: "./index.html", label: "Home", group: "primary" },
    { href: "./helfen.html", label: "Helfen", group: "primary" },
    { href: "./blog.html", label: "Einblicke", group: "primary" },
    { href: "./gesuche.html", label: "Gesuche", group: "primary" },
    { href: "./vereine.html", label: "Vereine", group: "primary" },
    { href: "./login.html", label: "Account", group: "account", authSwitch: true },
    { href: "./index.html#impressum", label: "Impressum", group: "secondary" },
    { href: "./index.html#datenschutz", label: "Datenschutz", group: "secondary" },
  ];

  const desktopNav = document.querySelector("[data-desktop-nav]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const toggleButton = document.querySelector("[data-nav-toggle]");
  const menuContainer = document.getElementById("mobileMenu");

  if (!desktopNav || !mobileMenu || !toggleButton || !menuContainer) {
    return;
  }

  const createLink = (item, className) => {
    const link = document.createElement("a");
    link.className = className;
    link.href = item.href;
    link.textContent = item.label;
    if (item.authSwitch) {
      link.setAttribute("data-auth-switch", "");
    }
    return link;
  };

  const renderDesktopLinks = () => {
    desktopNav.innerHTML = "";
    NAV.filter((item) => item.group === "primary").forEach((item) => {
      desktopNav.appendChild(createLink(item, "nav__link"));
    });
  };

  const renderMobileLinks = (items, includeDivider) => {
    mobileMenu.innerHTML = "";
    const primaryItems = NAV.filter((item) => item.group === "primary");
    const secondaryItems = NAV.filter((item) => item.group !== "primary");

    if (includeDivider) {
      primaryItems.forEach((item) => {
        mobileMenu.appendChild(createLink(item, "nav__dropdownLink"));
      });
      if (secondaryItems.length) {
        const divider = document.createElement("div");
        divider.className = "nav__dropdownDivider";
        divider.setAttribute("aria-hidden", "true");
        mobileMenu.appendChild(divider);
      }
      secondaryItems.forEach((item) => {
        mobileMenu.appendChild(createLink(item, "nav__dropdownLink"));
      });
      return;
    }

    items.forEach((item) => {
      mobileMenu.appendChild(createLink(item, "nav__dropdownLink"));
    });
  };

  const closeMenu = () => {
    menuContainer.hidden = true;
    toggleButton.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    menuContainer.hidden = false;
    toggleButton.setAttribute("aria-expanded", "true");
  };

  const renderNav = () => {
    renderDesktopLinks();
    const isDesktop = window.innerWidth >= DESKTOP_BREAKPOINT;
    const items = isDesktop ? NAV.filter((item) => item.group !== "primary") : NAV;
    renderMobileLinks(items, !isDesktop);
    closeMenu();
    document.dispatchEvent(new CustomEvent("nav:rendered"));
  };

  toggleButton.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = toggleButton.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
      return;
    }
    openMenu();
  });

  menuContainer.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (link) {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (!menuContainer.hidden && !event.target.closest(".nav__menu")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  let resizeTimer;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(renderNav, 150);
  });

  renderNav();
})();
