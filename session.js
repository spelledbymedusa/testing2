(() => {
  const store = window.EHNStore;
  if (!store) {
    return;
  }

  const authLinks = Array.from(document.querySelectorAll("[data-auth-link]"));
  if (!authLinks.length) {
    return;
  }

  const updateAuthLink = () => {
    const session = store.getSession();
    const isLoggedIn = Boolean(session && session.userId);
    authLinks.forEach((link) => {
      link.textContent = isLoggedIn ? "Logout" : "Login";
      link.setAttribute("aria-label", isLoggedIn ? "Logout" : "Login");
      link.setAttribute("href", "./login.html");
      link.dataset.authState = isLoggedIn ? "logout" : "login";
    });
  };

  updateAuthLink();

  authLinks.forEach((authLink) => {
    if (!authLink.dataset.authBound) {
      authLink.dataset.authBound = "true";
      authLink.addEventListener("click", (event) => {
        if (authLink.dataset.authState === "logout") {
          event.preventDefault();
          store.clearSession();
          updateAuthLink();
          window.location.href = "./login.html";
        }
      });
    }
  });
})();
