(() => {
  const store = window.EHNStore;
  if (!store) {
    return;
  }

  const message = document.querySelector("[data-account-message]");
  const nameField = document.querySelector("[data-account-name]");
  const emailField = document.querySelector("[data-account-email]");
  const locationField = document.querySelector("[data-account-location]");
  const statusField = document.querySelector("[data-account-status]");
  const descriptionField = document.querySelector("[data-account-description]");
  const gesucheContainer = document.querySelector("[data-account-gesuche]");
  const postsContainer = document.querySelector("[data-account-posts]");
  const savedContainer = document.querySelector("[data-account-saved]");
  const editButton = document.querySelector("[data-account-edit]");
  const contactForm = document.querySelector("[data-account-contact-form]");
  const settingsPanel = document.querySelector("[data-account-settings-panel]");
  const contactHint = document.querySelector("[data-account-contact-hint]");
  const contactFields = {
    verein: document.querySelector("[data-account-contact='verein']"),
    description: document.querySelector("[data-account-contact='description']"),
    address: document.querySelector("[data-account-contact='address']"),
    contactPerson: document.querySelector("[data-account-contact='contactPerson']"),
    email: document.querySelector("[data-account-contact='email']"),
    phone: document.querySelector("[data-account-contact='phone']"),
  };
  const visibilityToggles = {
    email: document.querySelector("[data-account-visibility='email']"),
    phone: document.querySelector("[data-account-visibility='phone']"),
  };

  const session = store.getSession();
  const isLoggedIn = Boolean(session && session.userId);

  const setMessage = (text, tone = "info") => {
    if (!message) {
      return;
    }
    message.textContent = text;
    message.className = `auth__notice auth__notice--${tone}`;
  };

  if (!isLoggedIn) {
    setMessage("Du bist aktuell nicht eingeloggt. Logge dich ein, um deine Daten zu sehen.", "error");
  } else {
    setMessage(`Angemeldet als ${session.name || session.email}.`, "success");
  }

  if (nameField && session?.name) {
    nameField.textContent = session.name;
  }
  if (emailField && session?.email) {
    emailField.textContent = session.email;
  }
  if (locationField) {
    locationField.textContent = session?.role === "org" ? "Berlin" : "Deutschland";
  }
  if (statusField) {
    statusField.textContent = isLoggedIn ? "Aktiv" : "Unverifiziert";
  }

  const setContactHint = (text, tone = "info") => {
    if (!contactHint) {
      return;
    }
    contactHint.textContent = text;
    contactHint.className = `account__hint account__hint--${tone}`;
  };

  const applyProfileToForm = (profile) => {
    if (!contactForm || !profile) {
      return;
    }
    if (contactFields.verein) contactFields.verein.value = profile.vereinName || "";
    if (contactFields.description) contactFields.description.value = profile.description || "";
    if (contactFields.address) contactFields.address.value = profile.address || "";
    if (contactFields.contactPerson) contactFields.contactPerson.value = profile.contactPerson || "";
    if (contactFields.email) contactFields.email.value = profile.email || "";
    if (contactFields.phone) contactFields.phone.value = profile.phone || "";
    if (visibilityToggles.email) visibilityToggles.email.checked = Boolean(profile.visibility?.email);
    if (visibilityToggles.phone) visibilityToggles.phone.checked = Boolean(profile.visibility?.phone);
  };

  const applyProfileToSummary = (profile) => {
    if (!profile) {
      return;
    }
    if (nameField && profile.vereinName) {
      nameField.textContent = profile.vereinName;
    }
    if (emailField && profile.email) {
      emailField.textContent = profile.email;
    }
    if (locationField) {
      locationField.textContent = profile.address || (session?.role === "org" ? "Berlin" : "Deutschland");
    }
    if (statusField) {
      statusField.textContent = isLoggedIn ? "Aktiv" : "Unverifiziert";
    }
    if (descriptionField) {
      descriptionField.textContent = profile.description || "Keine Beschreibung hinterlegt.";
    }
  };

  const getProfileFromForm = () => ({
    vereinName: contactFields.verein?.value.trim() || "",
    description: contactFields.description?.value.trim() || "",
    address: contactFields.address?.value.trim() || "",
    contactPerson: contactFields.contactPerson?.value.trim() || "",
    email: contactFields.email?.value.trim() || "",
    phone: contactFields.phone?.value.trim() || "",
    visibility: {
      email: Boolean(visibilityToggles.email?.checked),
      phone: Boolean(visibilityToggles.phone?.checked),
    },
  });

  if (contactForm) {
    if (!isLoggedIn) {
      setContactHint("Bitte einloggen, um Kontaktdaten zu pflegen.", "warning");
      contactForm.querySelectorAll("input, textarea").forEach((input) => {
        input.disabled = true;
      });
      if (editButton) {
        editButton.disabled = true;
      }
    } else {
      const userId = session.userId;
      const existingProfile = store.getOrgProfile(userId);
      const defaultProfile = existingProfile || {
        vereinName: session?.name || "Verein",
        description: "",
        address: "Musterstraße 12, 10115 Berlin",
        contactPerson: "",
        email: session?.email || "kontakt@verein.de",
        phone: "+49 30 1234567",
        visibility: { email: true, phone: false },
      };
      if (!existingProfile) {
        store.setOrgProfile(userId, defaultProfile);
      }
      applyProfileToForm(defaultProfile);
      applyProfileToSummary(defaultProfile);
      setContactHint("Mindestens E-Mail oder Telefon muss sichtbar sein.", "info");

      contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const profile = getProfileFromForm();

        if (!profile.vereinName || !profile.address || !profile.email) {
          setContactHint("Bitte Verein, Adresse und E-Mail ausfüllen.", "error");
          return;
        }

        const emailVisible = profile.visibility.email && profile.email;
        const phoneVisible = profile.visibility.phone && profile.phone;
        if (!emailVisible && !phoneVisible) {
          setContactHint("Mindestens eine Kontaktmöglichkeit (E-Mail oder Telefon) muss sichtbar sein.", "error");
          return;
        }

        store.setOrgProfile(userId, profile);
        applyProfileToSummary(profile);
        setContactHint("Kontakt gespeichert und sichtbar für Gesuche.", "success");
      });
    }
  }

  if (editButton && contactForm) {
    editButton.addEventListener("click", () => {
      if (settingsPanel && settingsPanel instanceof HTMLDetailsElement) {
        settingsPanel.open = true;
      }
      contactForm.scrollIntoView({ behavior: "smooth", block: "start" });
      contactFields.verein?.focus();
    });
  }

  const renderCards = (container, items, emptyText, mapFn) => {
    if (!container) {
      return;
    }
    container.innerHTML = "";
    if (!items.length) {
      const empty = document.createElement("div");
      empty.className = "account__empty";
      empty.textContent = emptyText;
      container.appendChild(empty);
      return;
    }
    items.forEach((item) => container.appendChild(mapFn(item)));
  };

  const createCard = (title, meta) => {
    const card = document.createElement("div");
    card.className = "account__card";
    const titleEl = document.createElement("div");
    titleEl.className = "account__cardTitle";
    titleEl.textContent = title;
    const metaEl = document.createElement("div");
    metaEl.className = "account__cardMeta";
    metaEl.textContent = meta;
    card.append(titleEl, metaEl);
    return card;
  };

  const userId = session?.userId || null;

  const gesuche = store.getGesuche().filter((item) => item.ownerId && item.ownerId === userId);
  renderCards(
    gesucheContainer,
    gesuche,
    "Noch keine eigenen Gesuche.",
    (item) => createCard(item.title, `${item.location} • ${item.mode}`)
  );

  const posts = store.getPosts().filter((item) => item.ownerId && item.ownerId === userId);
  renderCards(
    postsContainer,
    posts,
    "Noch keine eigenen Beiträge.",
    (item) => createCard(item.title, `${item.type} • ${item.meta || "Online"}`)
  );

  const saved = new Set(store.getSavedGesuche());
  const savedItems = store
    .getGesuche()
    .filter((item) => saved.has(item.id))
    .slice(0, 5);
  renderCards(
    savedContainer,
    savedItems,
    "Noch keine gemerkten Gesuche.",
    (item) => createCard(item.title, `${item.location} • ${item.mode}`)
  );
})();
