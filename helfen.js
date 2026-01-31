(() => {
  const choiceButtons = Array.from(document.querySelectorAll("[data-choice-filter]"));
  const choiceSection = document.querySelector("[data-choice-section]");
  const level2Section = document.querySelector("[data-level2-section]");
  const suboptionsTitle = document.querySelector("[data-suboptions-title]");
  const suboptionsText = document.querySelector("[data-suboptions-text]");
  const suboptionsGrid = document.querySelector("[data-suboptions-grid]");
  const buckets = window.HELP_BUCKETS || [];

  if (!choiceButtons.length || !level2Section || !suboptionsGrid || !buckets.length) {
    return;
  }

  level2Section.hidden = true;

  const bucketMap = new Map(buckets.map((bucket) => [bucket.id, bucket]));

  const renderSubOptions = (bucket) => {
    if (!bucket) {
      return;
    }

    if (suboptionsTitle) {
      suboptionsTitle.textContent = bucket.title;
    }

    if (suboptionsText) {
      suboptionsText.textContent = bucket.description;
    }

    suboptionsGrid.innerHTML = "";
    bucket.subOptions.forEach((option) => {
      const card = document.createElement("a");
      card.className = "helfen__choiceCard helfen__choiceCard--sub";
      card.href = `./erfahrungsbericht.html?topic=${encodeURIComponent(option.reportId)}`;
      card.setAttribute("role", "listitem");

      const title = document.createElement("span");
      title.className = "helfen__choiceTitle";
      title.textContent = option.title;

      const text = document.createElement("span");
      text.className = "helfen__choiceText";
      text.textContent = option.description;

      card.appendChild(title);
      card.appendChild(text);
      suboptionsGrid.appendChild(card);
    });
  };

  const setActiveChoice = (activeFilter) => {
    if (!activeFilter) {
      return;
    }

    choiceButtons.forEach((button) => {
      const isActive = button.dataset.choiceFilter === activeFilter;
      button.classList.toggle("helfen__choiceCard--active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    if (choiceSection) {
      choiceSection.hidden = true;
    }

    level2Section.hidden = false;
    renderSubOptions(bucketMap.get(activeFilter));
  };

  choiceButtons.forEach((button) => {
    button.addEventListener("click", () => setActiveChoice(button.dataset.choiceFilter));
  });

  const defaultButton =
    choiceButtons.find((button) => button.classList.contains("helfen__choiceCard--active")) ||
    choiceButtons[0];

  if (defaultButton) {
    setActiveChoice(defaultButton.dataset.choiceFilter);
  }
})();
