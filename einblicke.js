(() => {
  const helpColumn = document.querySelector('[data-einblicke-column="help"]');
  const topicsColumn = document.querySelector('[data-einblicke-column="topics"]');
  const helpChoiceSection = document.querySelector("[data-choice-section]");
  const topicsChoiceSection = document.querySelector("[data-einblicke-choice-section]");

  const hideAllChoiceSections = () => {
    if (helpChoiceSection) {
      helpChoiceSection.hidden = true;
    }
    if (topicsChoiceSection) {
      topicsChoiceSection.hidden = true;
    }
  };

  const showAllChoiceSections = () => {
    if (helpChoiceSection) {
      helpChoiceSection.hidden = false;
    }
    if (topicsChoiceSection) {
      topicsChoiceSection.hidden = false;
    }
  };

  const setLevel2Layout = (activeColumn) => {
    if (!helpColumn || !topicsColumn) {
      return;
    }

    const isActive = Boolean(activeColumn);
    [helpColumn, topicsColumn].forEach((column) => {
      column.classList.toggle("einblicke__choiceColumn--active", isActive && column === activeColumn);
      column.classList.toggle("einblicke__choiceColumn--inactive", isActive && column !== activeColumn);
    });
  };

  const setupHelpChoices = () => {
    const choiceButtons = Array.from(document.querySelectorAll("[data-choice-filter]"));
    const level2Section = document.querySelector("[data-level2-section]");
    const backButton = document.querySelector("[data-choice-back]");
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
        card.href = `./erfahrungsbericht.html?slug=${encodeURIComponent(option.slug)}`;
        card.setAttribute("role", "listitem");

        const media = document.createElement("span");
        media.className = "helfen__choiceMedia helfen__choiceMedia--placeholder";
        media.setAttribute("aria-hidden", "true");
        media.dataset.letter = option.title?.trim()?.charAt(0) || "";

        const content = document.createElement("span");
        content.className = "helfen__choiceContent";

        const title = document.createElement("span");
        title.className = "helfen__choiceTitle";
        title.textContent = option.title;

        const text = document.createElement("span");
        text.className = "helfen__choiceText";
        text.textContent = option.description;

        const more = document.createElement("span");
        more.className = "helfen__choiceMore";
        more.textContent = "Mehr…";

        content.append(title, text, more);
        card.append(media, content);
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

      hideAllChoiceSections();
      level2Section.hidden = false;
      setLevel2Layout(helpColumn);
      renderSubOptions(bucketMap.get(activeFilter));
    };

    const resetChoices = () => {
      showAllChoiceSections();
      level2Section.hidden = true;
      setLevel2Layout(null);
      choiceButtons.forEach((button) => {
        button.classList.remove("helfen__choiceCard--active");
        button.setAttribute("aria-pressed", "false");
      });
    };

    choiceButtons.forEach((button) => {
      button.addEventListener("click", () => setActiveChoice(button.dataset.choiceFilter));
    });

    if (backButton) {
      backButton.addEventListener("click", resetChoices);
    }

    resetChoices();
  };

  const setupEinblickeChoices = () => {
    const choiceButtons = Array.from(document.querySelectorAll("[data-einblicke-filter]"));
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

        const media = document.createElement("span");
        media.className = "helfen__choiceMedia helfen__choiceMedia--placeholder";
        media.setAttribute("aria-hidden", "true");
        media.dataset.letter = option.title?.trim()?.charAt(0) || "";

        const content = document.createElement("span");
        content.className = "helfen__choiceContent";

        const title = document.createElement("span");
        title.className = "helfen__choiceTitle";
        title.textContent = option.title;

        const text = document.createElement("span");
        text.className = "helfen__choiceText";
        text.textContent = option.description;

        const more = document.createElement("span");
        more.className = "helfen__choiceMore";
        more.textContent = "Mehr…";

        content.append(title, text, more);
        card.append(media, content);

        if (option.badge) {
          const badge = document.createElement("span");
          badge.className = "helfen__badge";
          badge.textContent = option.badge;
          content.appendChild(badge);
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

      hideAllChoiceSections();
      level2Section.hidden = false;
      setLevel2Layout(topicsColumn);
      renderSubOptions(bucket);
    };

    const resetChoices = () => {
      showAllChoiceSections();
      level2Section.hidden = true;
      setLevel2Layout(null);
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
  };

  setupHelpChoices();
  setupEinblickeChoices();
})();
