(() => {
  const updateActiveLinks = () => {
    const navLinks = document.querySelectorAll("header .nav__link[href], header .nav__dropdownLink[href]");

    if (!navLinks.length) {
      return;
    }

    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    navLinks.forEach((link) => {
      link.classList.remove("nav__link--active");
      const linkPath = new URL(link.getAttribute("href"), window.location.href).pathname
        .split("/")
        .pop();

      if (linkPath === currentPath) {
        link.classList.add("nav__link--active");
      }
    });
  };

  document.addEventListener("DOMContentLoaded", updateActiveLinks);
  document.addEventListener("nav:rendered", updateActiveLinks);
})();
