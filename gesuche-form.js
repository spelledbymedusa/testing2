(() => {
  const store = window.EHNStore;
  const form = document.querySelector("[data-gesuche-form]");
  const list = document.querySelector("[data-gesuche-list]");
  const searchInput = document.querySelector("[data-gesuche-search]");
  const searchButton = document.querySelector("[data-gesuche-search-btn]");
  const detail = document.querySelector("[data-gesuch-detail]");
  const detailMeta = document.querySelector("[data-gesuch-detail-meta]");
  const detailTitle = document.querySelector("[data-gesuch-detail-title]");
  const detailSummary = document.querySelector("[data-gesuch-detail-summary]");
  const detailVerein = document.querySelector("[data-gesuch-detail-verein]");
  const detailAddress = document.querySelector("[data-gesuch-detail-address]");
  const detailContactPerson = document.querySelector("[data-gesuch-detail-contact-person]");
  const detailEmail = document.querySelector("[data-gesuch-detail-email]");
  const detailPhone = document.querySelector("[data-gesuch-detail-phone]");
  const detailNote = document.querySelector("[data-gesuch-detail-note]");

  if (!form) {
    return;
  }

  const MAX_IMAGE_BYTES = 1_500_000;
  let searchTerm = "";

  const getField = (key) => form.querySelector(`[data-gesuche-field="${key}"]`);
  const message = form.querySelector("[data-gesuche-message]");
  const preview = form.querySelector("[data-gesuche-preview]");
  const createWrapper = document.querySelector("[data-gesuche-collapsible]");
  const createToggle = document.querySelector("[data-gesuche-toggle]");

  const setCreateExpanded = (expanded) => {
    form.hidden = !expanded;
    if (createWrapper) {
      createWrapper.classList.toggle("is-collapsed", !expanded);
    }
    if (createToggle) {
      createToggle.setAttribute("aria-expanded", String(expanded));
    }
  };

  if (createToggle) {
    const initialExpanded = createToggle.getAttribute("aria-expanded") === "true";
    setCreateExpanded(initialExpanded);
    createToggle.addEventListener("click", (event) => {
      event.preventDefault();
      if (createToggle.disabled) {
        return;
      }
      const isExpanded = createToggle.getAttribute("aria-expanded") === "true";
      setCreateExpanded(!isExpanded);
    });
  }

  if (!list || !store) {
    return;
  }

  const setMessage = (text, tone) => {
    if (!message) {
      return;
    }
    message.textContent = text;
    message.classList.remove("is-success", "is-error");
    if (tone) {
      message.classList.add(`is-${tone}`);
    }
  };

  const parseTags = (value) =>
    value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

  const applySearch = () => {
    const items = Array.from(list.querySelectorAll(".gesuche__row"));
    items.forEach((item) => {
      const haystack = [
        item.querySelector(".gesuche__title")?.textContent,
        item.querySelector(".gesuche__text")?.textContent,
        item.querySelector(".gesuche__meta")?.textContent,
        item.querySelector(".gesuche__tags")?.textContent,
      ]
        .join(" ")
        .toLowerCase();
      const match = !searchTerm || haystack.includes(searchTerm);
      item.hidden = !match;
    });
  };

  const updateSaveButton = (button, isSaved) => {
    if (!button) {
      return;
    }
    button.classList.toggle("is-saved", isSaved);
    button.textContent = isSaved ? "Gemerkt" : "Merken";
  };

  const applySavedState = () => {
    const saved = new Set(store.getSavedGesuche());
    const buttons = list.querySelectorAll("[data-gesuch-save]");
    buttons.forEach((button) => {
      const id = button.dataset.gesuchId;
      updateSaveButton(button, saved.has(id));
    });
  };

  const createTagElements = (tags) => {
    const wrapper = document.createElement("div");
    wrapper.className = "gesuche__tags";
    tags.forEach((tag) => {
      const span = document.createElement("span");
      span.className = "gesuche__tag";
      span.textContent = tag;
      wrapper.appendChild(span);
    });
    return wrapper;
  };

  const createGesuchElement = (gesuch) => {
    const row = document.createElement("article");
    row.className = "gesuche__row";
    row.dataset.gesuchId = gesuch.id;

    const media = document.createElement("div");
    media.className = "gesuche__media";
    media.setAttribute("aria-hidden", "true");
    if (gesuch.imageData) {
      media.style.backgroundImage = `url(${gesuch.imageData})`;
      media.style.backgroundSize = "cover";
      media.style.backgroundPosition = "center";
    }

    const left = document.createElement("div");
    left.className = "gesuche__left";

    const title = document.createElement("div");
    title.className = "gesuche__title";
    title.textContent = gesuch.title;

    const meta = document.createElement("div");
    meta.className = "gesuche__meta";
    meta.textContent = `${gesuch.location} • ${gesuch.effort} • ${gesuch.mode}`;

    const text = document.createElement("div");
    text.className = "gesuche__text";
    text.textContent = gesuch.summary;

    const tags = createTagElements(gesuch.tags);

    left.append(title, meta, tags, text);

    const right = document.createElement("div");
    right.className = "gesuche__right";

    const openButton = document.createElement("button");
    openButton.className = "nav__link gesuche__open";
    openButton.type = "button";
    openButton.textContent = "Öffnen";

    const saveButton = document.createElement("button");
    saveButton.className = "nav__link gesuche__save";
    saveButton.type = "button";
    saveButton.dataset.gesuchSave = "true";
    saveButton.dataset.gesuchId = gesuch.id;
    saveButton.textContent = "Merken";

    right.append(openButton, saveButton);
    row.append(media, left, right);

    return row;
  };

  const getGesuchById = (id) => store.getGesuche().find((item) => item.id === id);

  const getBooleanDatasetValue = (value) => value === "true";

  const getProfileFromDataset = (row) => ({
    vereinName: row.dataset.vereinName || "Verein",
    address: row.dataset.vereinAddress || "Adresse folgt",
    contactPerson: row.dataset.vereinContact || "",
    email: row.dataset.vereinEmail || "",
    phone: row.dataset.vereinPhone || "",
    visibility: {
      email: getBooleanDatasetValue(row.dataset.vereinEmailVisible),
      phone: getBooleanDatasetValue(row.dataset.vereinPhoneVisible),
    },
  });

  const resolveVereinProfile = (gesuch, row) => {
    if (gesuch?.ownerId) {
      const profile = store.getOrgProfile(gesuch.ownerId);
      if (profile) {
        return profile;
      }
      if (gesuch.ownerName) {
        return {
          vereinName: gesuch.ownerName,
          address: "Adresse folgt",
          contactPerson: "",
          email: "",
          phone: "",
          visibility: { email: false, phone: false },
        };
      }
    }
    return getProfileFromDataset(row);
  };

  const openDetail = (row) => {
    if (!detail || !row) {
      return;
    }
    const id = row.dataset.gesuchId;
    const gesuch = getGesuchById(id);
    const profile = resolveVereinProfile(gesuch, row);

    const title = gesuch?.title || row.querySelector(".gesuche__title")?.textContent || "Gesuch";
    const meta =
      gesuch
        ? `${gesuch.location} • ${gesuch.effort} • ${gesuch.mode}`
        : row.querySelector(".gesuche__meta")?.textContent || "";
    const summary = gesuch?.summary || row.querySelector(".gesuche__text")?.textContent || "";

    if (detailMeta) detailMeta.textContent = meta;
    if (detailTitle) detailTitle.textContent = title;
    if (detailSummary) detailSummary.textContent = summary;
    if (detailVerein) detailVerein.textContent = profile.vereinName || "Verein";
    if (detailAddress) detailAddress.textContent = profile.address || "Adresse folgt";

    const contactPerson = profile.contactPerson?.trim();
    if (detailContactPerson) {
      detailContactPerson.textContent = contactPerson ? `Ansprechpartner: ${contactPerson}` : "";
      detailContactPerson.hidden = !contactPerson;
    }

    let emailVisible = Boolean(profile.visibility?.email && profile.email);
    let phoneVisible = Boolean(profile.visibility?.phone && profile.phone);
    if (!emailVisible && !phoneVisible) {
      if (profile.email) {
        emailVisible = true;
      } else if (profile.phone) {
        phoneVisible = true;
      }
    }

    if (detailEmail) {
      detailEmail.textContent = emailVisible ? `E-Mail: ${profile.email}` : "";
      detailEmail.hidden = !emailVisible;
    }
    if (detailPhone) {
      detailPhone.textContent = phoneVisible ? `Telefon: ${profile.phone}` : "";
      detailPhone.hidden = !phoneVisible;
    }
    if (detailNote) {
      detailNote.textContent = "Adresse ist immer sichtbar. Mindestens eine Kontaktoption bleibt freigegeben.";
    }

    detail.hidden = false;
    document.body.classList.add("is-detail-open");
  };

  const closeDetail = () => {
    if (!detail) {
      return;
    }
    detail.hidden = true;
    document.body.classList.remove("is-detail-open");
  };

  const assignIdsToExisting = () => {
    const rows = Array.from(list.querySelectorAll(".gesuche__row"));
    rows.forEach((row, index) => {
      if (!row.dataset.gesuchId) {
        row.dataset.gesuchId = `gesuch_static_${index + 1}`;
      }
      const saveButton = row.querySelector(".gesuche__save");
      if (saveButton) {
        saveButton.dataset.gesuchSave = "true";
        saveButton.dataset.gesuchId = row.dataset.gesuchId;
      }
    });
  };

  const seedStaticGesuche = () => {
    const existing = Array.from(list.querySelectorAll(".gesuche__row"));
    const current = store.getGesuche();
    const knownIds = new Set(current.map((item) => item.id));
    const seeded = existing
      .filter((row) => !knownIds.has(row.dataset.gesuchId))
      .map((row) => {
        const metaText = row.querySelector(".gesuche__meta")?.textContent || "";
        const metaParts = metaText.split("•").map((part) => part.trim()).filter(Boolean);
        const location = metaParts[0] || "Ort";
        const effort = metaParts[1] || "Flexibel";
        const mode = metaParts[metaParts.length - 1] || "Vor Ort";
        return {
          id: row.dataset.gesuchId,
          title: row.querySelector(".gesuche__title")?.textContent || "Gesuch",
          location,
          effort,
          mode,
          summary: row.querySelector(".gesuche__text")?.textContent || "",
          tags: Array.from(row.querySelectorAll(".gesuche__tag")).map((tag) => tag.textContent),
          imageData: null,
          ownerId: null,
          createdAt: new Date().toISOString(),
        };
      });
    if (seeded.length) {
      store.setGesuche([...current, ...seeded]);
    }
  };

  const renderStoredGesuche = () => {
    const gesuche = store.getGesuche();
    if (!gesuche.length) {
      return;
    }
    const existingIds = new Set(
      Array.from(list.querySelectorAll(".gesuche__row")).map((row) => row.dataset.gesuchId)
    );
    const fragment = document.createDocumentFragment();
    gesuche
      .filter((gesuch) => !existingIds.has(gesuch.id))
      .forEach((gesuch) => fragment.appendChild(createGesuchElement(gesuch)));
    list.prepend(fragment);
  };

  assignIdsToExisting();
  seedStaticGesuche();
  renderStoredGesuche();
  applySavedState();
  applySearch();

  list.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    if (target.matches("[data-gesuch-save]")) {
      const id = target.dataset.gesuchId;
      const updated = store.toggleSavedGesuch(id);
      updateSaveButton(target, updated.includes(id));
      return;
    }
    const row = target.closest(".gesuche__row");
    if (row && !target.closest(".gesuche__save")) {
      openDetail(row);
    }
  });

  if (detail) {
    detail.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }
      if (target.matches("[data-gesuch-detail-close]")) {
        closeDetail();
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !detail.hidden) {
        closeDetail();
      }
    });
  }

  const requireSession = () => {
    const session = store.getSession();
    if (!session?.userId) {
      setMessage("Bitte einloggen, um ein neues Gesuch zu erstellen.", "error");
      return null;
    }
    return session;
  };

  const updateCreateAccess = () => {
    const session = store.getSession();
    const isLoggedIn = Boolean(session?.userId);
    form.querySelectorAll("input, select, textarea, button").forEach((field) => {
      if (field === createToggle) {
        return;
      }
      field.disabled = !isLoggedIn;
    });
    if (createToggle) {
      createToggle.disabled = !isLoggedIn;
      createToggle.setAttribute("aria-disabled", String(!isLoggedIn));
    }
    if (!isLoggedIn) {
      setCreateExpanded(false);
      setMessage("Bitte einloggen, um ein neues Gesuch zu erstellen.", "error");
    }
  };

  updateCreateAccess();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    setMessage("");

    const title = getField("title").value.trim();
    const location = getField("location").value.trim();
    const effort = getField("effort").value.trim();
    const mode = getField("mode").value;
    const summary = getField("summary").value.trim();
    const tags = parseTags(getField("tags").value || "");
    const imageFile = getField("image").files[0];

    if (!title || !location || !effort || !summary) {
      setMessage("Bitte alle Pflichtfelder ausfüllen.", "error");
      return;
    }

    if (imageFile && imageFile.size > MAX_IMAGE_BYTES) {
      setMessage("Bild ist zu groß. Maximal 1,5 MB.", "error");
      return;
    }

    const session = requireSession();
    if (!session) {
      return;
    }

    const saveGesuch = (imageData) => {
      const gesuch = store.saveGesuch({
        id: store.createId("gesuch"),
        title,
        location,
        effort,
        mode,
        summary,
        tags: tags.length ? tags : [mode],
        imageData,
        ownerId: session?.userId || null,
        ownerName: session?.name || session?.email || "Verein",
        createdAt: new Date().toISOString(),
      });

      list.prepend(createGesuchElement(gesuch));
      assignIdsToExisting();
      applySavedState();
      applySearch();
      form.reset();
      if (preview) {
        preview.style.backgroundImage = "";
        preview.classList.remove("is-filled");
        preview.textContent = "Bildvorschau";
      }
      setMessage("Gesuch gespeichert.", "success");
    };

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => saveGesuch(reader.result);
      reader.readAsDataURL(imageFile);
    } else {
      saveGesuch(null);
    }
  });

  const imageInput = getField("image");
  if (imageInput && preview) {
    imageInput.addEventListener("change", () => {
      const file = imageInput.files[0];
      if (!file) {
        preview.style.backgroundImage = "";
        preview.classList.remove("is-filled");
        preview.textContent = "Bildvorschau";
        return;
      }
      if (file.size > MAX_IMAGE_BYTES) {
        setMessage("Bild ist zu groß. Maximal 1,5 MB.", "error");
        imageInput.value = "";
        preview.style.backgroundImage = "";
        preview.classList.remove("is-filled");
        preview.textContent = "Bildvorschau";
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        preview.style.backgroundImage = `url(${reader.result})`;
        preview.classList.add("is-filled");
        preview.textContent = "";
      };
      reader.readAsDataURL(file);
    });
  }

  if (searchInput && searchButton) {
    const applySearchInput = () => {
      searchTerm = searchInput.value.trim().toLowerCase();
      applySearch();
    };
    searchInput.addEventListener("input", applySearchInput);
    searchButton.addEventListener("click", applySearchInput);
  }
})();
