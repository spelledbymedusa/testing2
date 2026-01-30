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
  const gesucheContainer = document.querySelector("[data-account-gesuche]");
  const postsContainer = document.querySelector("[data-account-posts]");
  const savedContainer = document.querySelector("[data-account-saved]");

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
