(() => {
  const store = window.EHNStore;
  if (!store) {
    return;
  }

  const authSwitchLinks = Array.from(document.querySelectorAll("[data-auth-switch]"));
  const logoutLinks = Array.from(document.querySelectorAll("[data-auth-logout]"));
  if (!authSwitchLinks.length && !logoutLinks.length) {
    return;
  }

  const updateAuthLink = () => {
    const session = store.getSession();
    const isLoggedIn = Boolean(session && session.userId);
    authSwitchLinks.forEach((link) => {
      link.textContent = isLoggedIn ? "Account" : "Login";
      link.setAttribute("aria-label", isLoggedIn ? "Account" : "Login");
      link.setAttribute("href", isLoggedIn ? "./account.html" : "./login.html");
      link.dataset.authState = isLoggedIn ? "account" : "login";
    });
    logoutLinks.forEach((link) => {
      link.hidden = !isLoggedIn;
      link.dataset.authState = isLoggedIn ? "logout" : "login";
    });
  };

  updateAuthLink();

  logoutLinks.forEach((logoutLink) => {
    if (!logoutLink.dataset.authBound) {
      logoutLink.dataset.authBound = "true";
      logoutLink.addEventListener("click", (event) => {
        event.preventDefault();
        store.clearSession();
        updateAuthLink();
        window.location.href = "./login.html";
      });
    }
  });
})();
