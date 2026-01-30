(() => {
  const card = document.getElementById("authCard");
  if (!card) {
    return;
  }

  const roleBtns = Array.from(card.querySelectorAll(".auth__roleBtn"));
  const modeBtns = Array.from(card.querySelectorAll(".auth__tab"));
  const sections = Array.from(card.querySelectorAll(".auth__section"));
  const switchLinks = Array.from(card.querySelectorAll("[data-switch-to]"));

  let currentRole = "person";
  let currentMode = "login";

  const setActiveButton = (btns, activeBtn, activeClass) => {
    btns.forEach((btn) => {
      const isActive = btn === activeBtn;
      btn.classList.toggle(activeClass, isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  };

  const render = () => {
    sections.forEach((section) => {
      const matches =
        section.getAttribute("data-role") === currentRole &&
        section.getAttribute("data-mode") === currentMode;
      section.hidden = !matches;
    });
  };

  roleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentRole = btn.getAttribute("data-role");
      setActiveButton(roleBtns, btn, "auth__roleBtn--active");
      render();
    });
  });

  modeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentMode = btn.getAttribute("data-mode");
      setActiveButton(modeBtns, btn, "auth__tab--active");
      render();
    });
  });

  switchLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const target = link.getAttribute("data-switch-to");
      const targetBtn = modeBtns.find((btn) => btn.getAttribute("data-mode") === target);
      if (targetBtn) {
        targetBtn.click();
      }
    });
  });

  render();
})();
