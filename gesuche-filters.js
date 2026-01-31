(() => {
  const list = document.querySelector("[data-gesuche-list]");
  const filterMenuItems = Array.from(document.querySelectorAll("[data-news-filter]"));
  const typeSelect = document.querySelector("[data-gesuche-type-filter]");
  const clearButton = document.querySelector("[data-gesuche-clear-filters]");
  const searchInput = document.querySelector("[data-gesuche-search]");

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

  let didPrefill = false;
  if (modeParam && ["vor_ort", "online"].includes(modeParam)) {
    setActiveMode(modeParam);
    didPrefill = true;
  }
  if (typeParam) {
    const normalizedType = typeParam.toLowerCase();
    if (typeSelect) {
      const hasType = Array.from(typeSelect.options).some((option) => option.value === normalizedType);
      if (hasType) {
        setTypeValue(normalizedType);
        didPrefill = true;
      }
    }
  }

  applyCombinedFilter();

  if (didPrefill && clearButton) {
    clearButton.classList.add("is-active");
  }
})();
