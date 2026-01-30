(() => {
  const newsCards = document.querySelectorAll("[data-news-card]");

  if (!newsCards.length) {
    return;
  }

  const allMenus = [];
  const allToggles = [];

  const closeAllMenus = () => {
    allMenus.forEach((menu) => menu.classList.remove("is-open"));
    allToggles.forEach((toggle) => toggle.setAttribute("aria-expanded", "false"));
  };

  const setActive = (menuItems, value, attribute) => {
    menuItems.forEach((item) => {
      item.classList.toggle("is-active", item.getAttribute(attribute) === value);
    });
  };

  const parseDate = (value) => {
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  };

  newsCards.forEach((card) => {
    const list = card.querySelector("[data-news-list]");
    if (!list) {
      return;
    }

    const getItems = () => Array.from(list.querySelectorAll(".newsCard__item"));
    getItems().forEach((item, index) => {
      if (!item.dataset.newsOrder) {
        item.dataset.newsOrder = String(index + 1);
      }
    });

    const sortItems = Array.from(card.querySelectorAll("[data-news-sort]"));
    const filterItems = Array.from(card.querySelectorAll("[data-news-filter]"));
    const toggles = Array.from(card.querySelectorAll("[data-news-toggle]"));
    const menus = Array.from(card.querySelectorAll("[data-news-menu]"));

    allMenus.push(...menus);
    allToggles.push(...toggles);

    const applySort = (sortKey) => {
      const items = getItems();
      items.forEach((item, index) => {
        if (!item.dataset.newsOrder) {
          item.dataset.newsOrder = String(index + 1);
        }
      });
      const sorted = [...items].sort((a, b) => {
        if (sortKey === "curated") {
          return Number(a.dataset.newsOrder) - Number(b.dataset.newsOrder);
        }

        const dateA = parseDate(a.dataset.newsDate || "");
        const dateB = parseDate(b.dataset.newsDate || "");

        if (sortKey === "newest") {
          return dateB - dateA;
        }

        return dateA - dateB;
      });

      sorted.forEach((item) => list.appendChild(item));
    };

    const updateVisibility = (item) => {
      const searchHidden = item.dataset.searchHidden === "true";
      const filterHidden = item.dataset.filterHidden === "true";
      item.hidden = searchHidden || filterHidden;
    };

    const applyFilter = (filterKey) => {
      const items = getItems();
      items.forEach((item) => {
        const matches = filterKey === "all" || item.dataset.newsType === filterKey;
        item.dataset.filterHidden = matches ? "false" : "true";
        updateVisibility(item);
      });
    };

    toggles.forEach((toggle) => {
      toggle.addEventListener("click", (event) => {
        event.stopPropagation();
        const menu = card.querySelector(`[data-news-menu="${toggle.dataset.newsToggle}"]`);
        if (!menu) {
          return;
        }
        const isOpen = menu.classList.contains("is-open");
        closeAllMenus();
        if (!isOpen) {
          menu.classList.add("is-open");
          toggle.setAttribute("aria-expanded", "true");
        }
      });
    });

    menus.forEach((menu) => {
      menu.addEventListener("click", (event) => event.stopPropagation());
    });

    sortItems.forEach((item) => {
      item.addEventListener("click", () => {
        const sortKey = item.dataset.newsSort || "curated";
        setActive(sortItems, sortKey, "data-news-sort");
        applySort(sortKey);
        closeAllMenus();
        card.dispatchEvent(new CustomEvent("news:updated", { bubbles: true }));
      });
    });

    filterItems.forEach((item) => {
      item.addEventListener("click", () => {
        const filterKey = item.dataset.newsFilter || "all";
        setActive(filterItems, filterKey, "data-news-filter");
        applyFilter(filterKey);
        closeAllMenus();
        card.dispatchEvent(new CustomEvent("news:updated", { bubbles: true }));
      });
    });
  });

  document.addEventListener("click", closeAllMenus);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllMenus();
    }
  });
})();
