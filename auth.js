(() => {
  const card = document.getElementById("authCard");
  if (!card) {
    return;
  }

  const choiceCards = Array.from(card.querySelectorAll("[data-choice-role]"));
  const roleButtons = Array.from(card.querySelectorAll("[data-role-button]"));
  const header = card.querySelector("[data-auth-header]");
  const sections = Array.from(card.querySelectorAll(".auth__section"));
  const switchLinks = Array.from(card.querySelectorAll("[data-switch-to]"));
  const message = card.querySelector("[data-auth-message]");

  const store = window.EHNStore;

  const showMessage = (text, tone = "info") => {
    if (!message) {
      return;
    }
    message.textContent = text;
    message.className = `auth__notice auth__notice--${tone}`;
  };

  const defaultMode = card.dataset.authDefaultMode || "login";
  let currentRole = "person";
  let currentMode = defaultMode;

  const updateChoiceUI = () => {
    choiceCards.forEach((cardEl) => {
      const isActive = cardEl.getAttribute("data-choice-role") === currentRole;
      cardEl.classList.toggle("auth__choiceCard--active", isActive);
      cardEl.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    roleButtons.forEach((btn) => {
      const isActive = btn.getAttribute("data-role-button") === currentRole;
      btn.classList.toggle("auth__roleBtn--active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    if (header) {
      const roleLabel = currentRole === "person" ? "Privatperson" : "Verein/Organisation";
      const modeLabel = currentMode === "login" ? "Anmelden" : "Registrieren";
      if (currentMode === "login") {
        header.textContent = modeLabel;
      } else {
        header.textContent = `${roleLabel} – ${modeLabel}`;
      }
    }
  };

  const render = () => {
    sections.forEach((section) => {
      const matches =
        section.getAttribute("data-role") === currentRole &&
        section.getAttribute("data-mode") === currentMode;
      section.hidden = !matches;
    });
    updateChoiceUI();
  };

  choiceCards.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentRole = btn.getAttribute("data-choice-role");
      const nextMode = btn.getAttribute("data-choice-mode");
      if (nextMode) {
        currentMode = nextMode;
      }
      render();
    });
  });

  roleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentRole = btn.getAttribute("data-role-button");
      render();
    });
  });

  switchLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const target = link.getAttribute("data-switch-to");
      if (target) {
        currentMode = target;
        render();
      }
    });
  });

  const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);

  const readField = (section, key) => {
    const field = section.querySelector(`[data-auth-field="${key}"]`);
    if (!field) {
      return "";
    }
    if (field.type === "checkbox") {
      return field.checked;
    }
    return field.value.trim();
  };

  const handleLogin = (section, role) => {
    if (!store) {
      showMessage("Speicher ist nicht verfügbar.", "error");
      return;
    }
    const email = readField(section, "email");
    const password = readField(section, "password");

    if (!email || !password) {
      showMessage("Bitte E-Mail und Passwort ausfüllen.", "error");
      return;
    }
    if (!isValidEmail(email)) {
      showMessage("Bitte eine gültige E-Mail-Adresse eingeben.", "error");
      return;
    }

    const user = store.findUserByEmail(email);
    if (!user || user.password !== password || (role && user.role !== role)) {
      showMessage("Zugangsdaten stimmen nicht.", "error");
      return;
    }

    store.setSession({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
    showMessage("Willkommen zurück! Weiterleitung…", "success");
    setTimeout(() => {
      window.location.href = "./account.html";
    }, 600);
  };

  const handleSignup = (section, role) => {
    if (!store) {
      showMessage("Speicher ist nicht verfügbar.", "error");
      return;
    }
    const email = readField(section, "email");
    const password = readField(section, "password");
    const confirm = readField(section, "confirm");
    const acceptedTerms = readField(section, "terms");

    if (!email || !password || !confirm) {
      showMessage("Bitte alle Pflichtfelder ausfüllen.", "error");
      return;
    }
    if (!isValidEmail(email)) {
      showMessage("Bitte eine gültige E-Mail-Adresse eingeben.", "error");
      return;
    }
    if (password.length < 8) {
      showMessage("Das Passwort muss mindestens 8 Zeichen haben.", "error");
      return;
    }
    if (password !== confirm) {
      showMessage("Die Passwörter stimmen nicht überein.", "error");
      return;
    }
    if (!acceptedTerms) {
      showMessage("Bitte Datenschutz & Nutzungsbedingungen akzeptieren.", "error");
      return;
    }
    if (store.findUserByEmail(email)) {
      showMessage("Diese E-Mail ist bereits registriert.", "error");
      return;
    }

    const name =
      role === "person"
        ? `${readField(section, "firstName")} ${readField(section, "lastName")}`.trim()
        : readField(section, "orgName");

    if (!name) {
      showMessage("Bitte einen Namen angeben.", "error");
      return;
    }

    const user = {
      id: store.createId("user"),
      email,
      password,
      role,
      name,
    };
    store.saveUser(user);
    store.setSession({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
    showMessage("Registriert! Weiterleitung…", "success");
    setTimeout(() => {
      window.location.href = "./account.html";
    }, 700);
  };

  const submitButtons = Array.from(card.querySelectorAll("[data-auth-action]"));
  submitButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const section = button.closest(".auth__section");
      if (!section) {
        return;
      }
      const action = button.dataset.authAction;
      const role = section.dataset.role === "any" ? null : section.dataset.role || currentRole;
      showMessage("");
      if (action === "login") {
        handleLogin(section, role);
      } else {
        handleSignup(section, role);
      }
    });
  });

  render();
})();
