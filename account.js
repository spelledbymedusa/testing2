(() => {
  const store = window.EHNStore;
  if (!store) {
    return;
  }

  const message = document.querySelector("[data-account-message]");
  const nameFields = document.querySelectorAll("[data-account-name]");
  const emailField = document.querySelector("[data-account-email]");
  const locationFields = document.querySelectorAll("[data-account-location]");
  const statusField = document.querySelector("[data-account-status]");
  const descriptionField = document.querySelector("[data-account-description]");
  const avatarImage = document.querySelector("[data-account-avatar]");
  const gesucheContainer = document.querySelector("[data-account-gesuche]");
  const postsContainer = document.querySelector("[data-account-posts]");
  const savedContainer = document.querySelector("[data-account-saved]");
  const editButton = document.querySelector("[data-account-edit]");
  const contactForm = document.querySelector("[data-account-contact-form]");
  const settingsPanel = document.querySelector("[data-account-settings-panel]");
  const contactHint = document.querySelector("[data-account-contact-hint]");
  const contactFields = {
    verein: document.querySelector("[data-account-contact='verein']"),
    avatar: document.querySelector("[data-account-contact='avatar']"),
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

  if (nameFields.length && session?.name) {
    nameFields.forEach((field) => {
      field.textContent = session.name;
    });
  }
  if (emailField && session?.email) {
    emailField.textContent = session.email;
  }
  if (locationFields.length) {
    locationFields.forEach((field) => {
      field.textContent = session?.role === "org" ? "Berlin" : "Deutschland";
    });
  }
  if (statusField) {
    statusField.textContent = isLoggedIn ? "Aktiv" : "Unverifiziert";
  }

  const DEFAULT_AVATAR =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'><rect width='96' height='96' rx='48' fill='%23e5e7eb'/><circle cx='48' cy='36' r='16' fill='%2394a3b8'/><path d='M20 78c6-14 18-22 28-22s22 8 28 22' fill='%2394a3b8'/></svg>";
  let avatarData = "";
  if (avatarImage) {
    avatarImage.src = DEFAULT_AVATAR;
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
    avatarData = profile.avatar || "";
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
    if (nameFields.length && profile.vereinName) {
      nameFields.forEach((field) => {
        field.textContent = profile.vereinName;
      });
    }
    if (emailField && profile.email) {
      emailField.textContent = profile.email;
    }
    if (locationFields.length) {
      locationFields.forEach((field) => {
        field.textContent = profile.address || (session?.role === "org" ? "Berlin" : "Deutschland");
      });
    }
    if (statusField) {
      statusField.textContent = isLoggedIn ? "Aktiv" : "Unverifiziert";
    }
    if (descriptionField) {
      descriptionField.textContent = profile.description || "Keine Beschreibung hinterlegt.";
    }
    if (avatarImage) {
      avatarImage.src = profile.avatar || DEFAULT_AVATAR;
    }
  };

  const getProfileFromForm = () => ({
    vereinName: contactFields.verein?.value.trim() || "",
    avatar: avatarData,
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
        avatar: "",
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

      if (contactFields.avatar) {
        contactFields.avatar.addEventListener("change", (event) => {
          const file = event.target.files?.[0];
          if (!file) {
            avatarData = "";
            if (avatarImage) {
              avatarImage.src = DEFAULT_AVATAR;
            }
            return;
          }
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            avatarData = typeof reader.result === "string" ? reader.result : "";
            if (avatarImage) {
              avatarImage.src = avatarData || DEFAULT_AVATAR;
            }
          });
          reader.readAsDataURL(file);
        });
      }

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
