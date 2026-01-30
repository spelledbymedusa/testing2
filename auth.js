(() => {
  const card = document.getElementById("authCard");
  if (!card) {
    return;
  }

  const roleBtns = Array.from(card.querySelectorAll(".auth__roleBtn"));
  const modeBtns = Array.from(card.querySelectorAll(".auth__tab"));
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

  let currentRole = "person";
  let currentMode = "login";

  const setActiveButton = (btns, activeBtn, activeClass) => {
    btns.forEach((btn) => {
      const isActive = btn === activeBtn;
      btn.classList.toggle(activeClass, isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  };

  const render = () => {
    sections.forEach((section) => {
      const matches =
        section.getAttribute("data-role") === currentRole &&
        section.getAttribute("data-mode") === currentMode;
      section.hidden = !matches;
    });
  };

  roleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentRole = btn.getAttribute("data-role");
      setActiveButton(roleBtns, btn, "auth__roleBtn--active");
      render();
    });
  });

  modeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentMode = btn.getAttribute("data-mode");
      setActiveButton(modeBtns, btn, "auth__tab--active");
      render();
    });
  });

  switchLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const target = link.getAttribute("data-switch-to");
      const targetBtn = modeBtns.find((btn) => btn.getAttribute("data-mode") === target);
      if (targetBtn) {
        targetBtn.click();
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
    if (!user || user.password !== password || user.role !== role) {
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
      const role = section.dataset.role || currentRole;
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
