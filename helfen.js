(() => {
  const choiceButtons = Array.from(document.querySelectorAll("[data-choice-filter]"));
  const choicePanels = Array.from(document.querySelectorAll("[data-choice-panel]"));
  const choiceSection = document.querySelector("[data-choice-section]");
  const level2Section = document.querySelector("[data-level2-section]");

  if (!choiceButtons.length || !level2Section) {
    return;
  }

  level2Section.hidden = true;

  const setActiveChoice = (activeFilter) => {
    if (!activeFilter) {
      return;
    }

    choiceButtons.forEach((button) => {
      const isActive = button.dataset.choiceFilter === activeFilter;
      button.classList.toggle("helfen__choiceCard--active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    choicePanels.forEach((panel) => {
      panel.toggleAttribute("hidden", panel.dataset.choicePanel !== activeFilter);
    });

    if (choiceSection) {
      choiceSection.hidden = true;
    }

    level2Section.hidden = false;
  };

  choiceButtons.forEach((button) => {
    button.addEventListener("click", () => setActiveChoice(button.dataset.choiceFilter));
  });

  const defaultButton = choiceButtons.find((button) =>
    button.classList.contains("helfen__choiceCard--active")
  );

  if (defaultButton) {
    setActiveChoice(defaultButton.dataset.choiceFilter);
  }
})();
