(() => {
  const list = document.querySelector("[data-gesuche-list]");
  const filterMenuItems = Array.from(document.querySelectorAll("[data-news-filter]"));
  const typeSelect = document.querySelector("[data-gesuche-type-filter]");
  const clearButton = document.querySelector("[data-gesuche-clear-filters]");
  const searchInput = document.querySelector("[data-gesuche-search]");
  const filterTags = document.getElementById("gesuche-filters");
  const filterSubtitle = document.getElementById("gesuche-filter-subtitle");

  if (!list) {
    return;
  }

  const validModes = new Set(["vor_ort", "online", "hybrid", "all"]);

  let currentMode = "all";
  let currentType = "all";

  const getItems = () => Array.from(list.querySelectorAll(".gesuche__row"));

  const updateVisibility = (item) => {
    const searchHidden = item.dataset.searchHidden === "true";
    const filterHidden = item.dataset.filterHidden === "true";
    item.hidden = searchHidden || filterHidden;
  };

  const applyCombinedFilter = () => {
    const items = getItems();
    items.forEach((item) => {
      const modeMatch = currentMode === "all" || item.dataset.newsType === currentMode;
      const typeValue = (item.dataset.gesuchType || "").toLowerCase();
      const typeMatch = currentType === "all" || typeValue === currentType;
      item.dataset.filterHidden = modeMatch && typeMatch ? "false" : "true";
      updateVisibility(item);
    });
  };

  const setActiveMode = (modeValue) => {
    const normalized = validModes.has(modeValue) ? modeValue : "all";
    currentMode = normalized;
    filterMenuItems.forEach((item) => {
      item.classList.toggle("is-active", item.dataset.newsFilter === normalized);
    });
  };

  const setTypeValue = (value) => {
    if (!typeSelect) {
      return;
    }
    const hasValue = Array.from(typeSelect.options).some((option) => option.value === value);
    if (!hasValue) {
      return;
    }
    currentType = value;
    typeSelect.value = value;
  };

  const resetFilters = () => {
    setActiveMode("all");
    if (typeSelect) {
      typeSelect.value = "all";
      currentType = "all";
    }
    if (searchInput) {
      searchInput.value = "";
      searchInput.dispatchEvent(new Event("input", { bubbles: true }));
    }
    applyCombinedFilter();
    if (window.location.search) {
      window.history.replaceState(null, "", "gesuche.html");
    }
    renderFilterSummary(new URLSearchParams());
  };

  const initFromUI = () => {
    const activeModeItem = filterMenuItems.find((item) => item.classList.contains("is-active"));
    if (activeModeItem?.dataset.newsFilter) {
      currentMode = activeModeItem.dataset.newsFilter;
    }
    if (typeSelect) {
      currentType = typeSelect.value || "all";
    }
  };

  const formatLabel = (value) =>
    value
      .split(/[-_ ]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

  const renderFilterSummary = (params) => {
    if (!filterTags || !filterSubtitle) {
      return;
    }

    const items = [];
    const path = params.get("path");
    const role = params.get("role");
    const topic = params.get("topic");
    const type = params.get("type");
    const mode = params.get("mode");

    const pathMap = {
      vorort: "Vor Ort",
      online: "Online",
      alltag: "Alltag",
      spenden: "Spenden",
      firmen: "Firmen",
    };

    if (path) items.push(pathMap[path] || formatLabel(path));
    if (mode) items.push(formatLabel(mode.replace("_", " ")));
    if (role) items.push(formatLabel(role));
    if (topic) items.push(formatLabel(topic));
    if (type) items.push(formatLabel(type));

    if (!items.length) {
      filterTags.innerHTML = "";
      filterSubtitle.textContent = "Gefiltert nach: Alle Gesuche";
      return;
    }

    filterTags.innerHTML = "";
    items.forEach((item) => {
      const tag = document.createElement("span");
      tag.className = "gesuche__tag";
      tag.textContent = item;
      filterTags.appendChild(tag);
    });
    filterSubtitle.textContent = `Gefiltert nach: ${items.join(", ")}`;
  };

  filterMenuItems.forEach((item) => {
    item.addEventListener("click", () => {
      const modeValue = item.dataset.newsFilter || "all";
      setActiveMode(modeValue);
      applyCombinedFilter();
    });
  });

  if (typeSelect) {
    typeSelect.addEventListener("change", () => {
      currentType = typeSelect.value || "all";
      applyCombinedFilter();
    });
  }

  if (clearButton) {
    clearButton.addEventListener("click", () => {
      resetFilters();
    });
  }

  initFromUI();

  const params = new URLSearchParams(window.location.search);
  const modeParam = params.get("mode");
  const typeParam = params.get("type");
  const pathParam = params.get("path");
  const roleParam = params.get("role");

  let didPrefill = false;
  const normalizedPath = pathParam === "vorort" ? "vor_ort" : pathParam;
  if (normalizedPath && ["vor_ort", "online", "hybrid"].includes(normalizedPath)) {
    setActiveMode(normalizedPath);
    didPrefill = true;
  } else if (modeParam && ["vor_ort", "online", "hybrid"].includes(modeParam)) {
    setActiveMode(modeParam);
    didPrefill = true;
  }
  if (roleParam || typeParam) {
    const normalizedType = (roleParam || typeParam).toLowerCase();
    if (typeSelect) {
      const hasType = Array.from(typeSelect.options).some((option) => option.value === normalizedType);
      if (hasType) {
        setTypeValue(normalizedType);
        didPrefill = true;
      }
    }
  }

  applyCombinedFilter();
  renderFilterSummary(params);

  if (didPrefill && clearButton) {
    clearButton.classList.add("is-active");
  }
})();
