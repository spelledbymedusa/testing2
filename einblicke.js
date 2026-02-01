(() => {
  const choiceButtons = Array.from(document.querySelectorAll("[data-einblicke-filter]"));
  const choiceSection = document.querySelector("[data-einblicke-choice-section]");
  const level2Section = document.querySelector("[data-einblicke-level2-section]");
  const backButton = document.querySelector("[data-einblicke-back]");
  const suboptionsTitle = document.querySelector("[data-einblicke-title]");
  const suboptionsText = document.querySelector("[data-einblicke-text]");
  const suboptionsGrid = document.querySelector("[data-einblicke-grid]");
  const buckets = window.EINBLICKE_TOPICS || [];

  if (!choiceButtons.length || !level2Section || !suboptionsGrid || !buckets.length) {
    return;
  }

  level2Section.hidden = true;

  const bucketMap = new Map(buckets.map((bucket) => [bucket.id, bucket]));

  const renderSubOptions = (bucket) => {
    if (!bucket || !bucket.subOptions?.length) {
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
      card.href = option.href;
      card.setAttribute("role", "listitem");
      if (option.external) {
        card.target = "_blank";
        card.rel = "noreferrer";
      }

      const title = document.createElement("span");
      title.className = "helfen__choiceTitle";
      title.textContent = option.title;

      const text = document.createElement("span");
      text.className = "helfen__choiceText";
      text.textContent = option.description;

      card.appendChild(title);
      card.appendChild(text);

      if (option.badge) {
        const badge = document.createElement("span");
        badge.className = "helfen__badge";
        badge.textContent = option.badge;
        card.appendChild(badge);
      }

      suboptionsGrid.appendChild(card);
    });
  };

  const setActiveChoice = (activeFilter) => {
    if (!activeFilter) {
      return;
    }

    const bucket = bucketMap.get(activeFilter);
    if (bucket?.directLink) {
      window.location.href = bucket.directLink;
      return;
    }

    choiceButtons.forEach((button) => {
      const isActive = button.dataset.einblickeFilter === activeFilter;
      button.classList.toggle("helfen__choiceCard--active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    if (choiceSection) {
      choiceSection.hidden = false;
    }
    level2Section.hidden = false;
    renderSubOptions(bucket);
  };

  const resetChoices = () => {
    if (choiceSection) {
      choiceSection.hidden = false;
    }
    level2Section.hidden = true;
    choiceButtons.forEach((button) => {
      button.classList.remove("helfen__choiceCard--active");
      button.setAttribute("aria-pressed", "false");
    });
  };

  choiceButtons.forEach((button) => {
    button.addEventListener("click", () => setActiveChoice(button.dataset.einblickeFilter));
  });

  if (backButton) {
    backButton.addEventListener("click", resetChoices);
  }

  resetChoices();
})();
