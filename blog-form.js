(() => {
  const store = window.EHNStore;
  const form = document.querySelector("[data-blog-form]");
  const list = document.querySelector("[data-news-list]");
  const searchInput = document.querySelector("[data-blog-search]");
  const searchButton = document.querySelector("[data-blog-search-btn]");
  const createWrapper = document.querySelector("[data-blog-collapsible]");
  const createToggle = document.querySelector("[data-blog-toggle]");
  const hasForm = Boolean(form);
  const hasList = Boolean(list);

  if (!store) {
    return;
  }

  const MAX_IMAGE_BYTES = 1_500_000;
  let searchTerm = "";

  const getField = (key) => form?.querySelector(`[data-blog-field="${key}"]`);
  const message = form?.querySelector("[data-blog-message]");
  const preview = form?.querySelector("[data-blog-preview]");

  const setCreateExpanded = (expanded) => {
    if (!form) {
      return;
    }
    form.hidden = !expanded;
    if (createWrapper) {
      createWrapper.classList.toggle("is-collapsed", !expanded);
    }
    if (createToggle) {
      createToggle.setAttribute("aria-expanded", String(expanded));
    }
  };

  if (createToggle && form) {
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

  const formatDate = (value) => {
    if (!value) {
      return "Neu";
    }
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return "Neu";
    }
    return parsed.toLocaleDateString("de-DE");
  };

  const parseTags = (value) =>
    value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

  const updateVisibility = (item) => {
    const searchHidden = item.dataset.searchHidden === "true";
    const filterHidden = item.dataset.filterHidden === "true";
    item.hidden = searchHidden || filterHidden;
  };

  const applySearch = () => {
    if (!list) {
      return;
    }
    const items = Array.from(list.querySelectorAll(".newsCard__item"));
    items.forEach((item) => {
      const haystack = [
        item.querySelector(".blog__title")?.textContent,
        item.querySelector(".blog__text")?.textContent,
        item.querySelector(".blog__meta")?.textContent,
        item.querySelector(".blog__tags")?.textContent,
      ]
        .join(" ")
        .toLowerCase();
      const match = !searchTerm || haystack.includes(searchTerm);
      item.dataset.searchHidden = match ? "false" : "true";
      updateVisibility(item);
    });
  };

  const createTagElements = (tags) => {
    const tagWrapper = document.createElement("div");
    tagWrapper.className = "blog__tags";
    tags.forEach((tag) => {
      const span = document.createElement("span");
      span.className = "blog__tag";
      span.textContent = tag;
      tagWrapper.appendChild(span);
    });
    return tagWrapper;
  };

  const createPostElement = (post) => {
    const article = document.createElement("article");
    article.className = "blog__post newsCard__item";
    article.dataset.newsType = post.type;
    article.dataset.newsDate = post.date || new Date().toISOString().slice(0, 10);
    article.dataset.newsOrder = String(-Date.now());
    const activeFilter =
      document.querySelector("[data-news-filter].is-active")?.dataset.newsFilter || "all";
    const shouldHide = activeFilter !== "all" && activeFilter !== post.type;
    article.dataset.searchHidden = "false";
    article.dataset.filterHidden = shouldHide ? "true" : "false";
    article.dataset.postId = post.id;

    const img = document.createElement("div");
    img.className = "blog__img";
    img.setAttribute("aria-hidden", "true");
    if (post.imageData) {
      img.classList.add("has-image");
      img.style.backgroundImage = `url(${post.imageData})`;
      img.style.backgroundSize = "cover";
      img.style.backgroundPosition = "center";
    }

    const body = document.createElement("div");
    body.className = "blog__body";

    const metaRow = document.createElement("div");
    metaRow.className = "blog__metaRow";

    const meta = document.createElement("div");
    meta.className = "blog__meta";
    meta.textContent = post.meta || "Online";

    const date = document.createElement("div");
    date.className = "blog__date";
    date.textContent = formatDate(post.date);

    metaRow.append(meta, date);

    const title = document.createElement("div");
    title.className = "blog__title";
    title.textContent = post.title;

    const text = document.createElement("div");
    text.className = "blog__text";
    text.textContent = post.summary;

    const footer = document.createElement("div");
    footer.className = "blog__footer";

    const read = document.createElement("a");
    read.className = "nav__link blog__read";
    read.href = "./blog.html";
    read.textContent = "Lesen";

    const tags = createTagElements(post.tags);

    footer.append(read, tags);
    body.append(metaRow, title, text, footer);

    article.append(img, body);
    updateVisibility(article);
    return article;
  };

  const renderStoredPosts = () => {
    if (!list) {
      return;
    }
    const posts = store.getPosts();
    if (!posts.length) {
      return;
    }
    const fragment = document.createDocumentFragment();
    posts.forEach((post) => fragment.appendChild(createPostElement(post)));
    list.prepend(fragment);
    applySearch();
  };

  const requireSession = () => {
    const session = store.getSession();
    if (!session?.userId) {
      setMessage("Bitte einloggen, um einen Beitrag zu erstellen.", "error");
      return null;
    }
    return session;
  };

  const updateCreateAccess = () => {
    if (!form) {
      return;
    }
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
      setMessage("Bitte einloggen, um einen Beitrag zu erstellen.", "error");
    }
  };

  if (hasForm) {
    updateCreateAccess();

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      setMessage("");

      const title = getField("title").value.trim();
      const type = getField("type").value;
      const date = getField("date").value;
      const meta = getField("meta").value.trim();
      const summary = getField("summary").value.trim();
      const tags = parseTags(getField("tags").value || "");
      const imageFile = getField("image").files[0];

      if (!title || !summary) {
        setMessage("Bitte Titel und Kurzbeschreibung ausfüllen.", "error");
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

      const savePost = (imageData) => {
        const post = store.savePost({
          id: store.createId("post"),
          title,
          type,
          date,
          meta,
          summary,
          tags: tags.length ? tags : [type],
          imageData,
          ownerId: session?.userId || null,
          ownerName: session?.name || session?.email || "Verein",
          createdAt: new Date().toISOString(),
        });

        if (hasList) {
          list.prepend(createPostElement(post));
          applySearch();
        }
        form.reset();
        if (preview) {
          preview.style.backgroundImage = "";
          preview.classList.remove("is-filled");
          preview.textContent = "Bildvorschau";
        }
        setMessage("Beitrag gespeichert.", "success");
      };

      if (imageFile) {
        const reader = new FileReader();
        reader.onload = () => savePost(reader.result);
        reader.readAsDataURL(imageFile);
      } else {
        savePost(null);
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
  }

  renderStoredPosts();

  if (searchInput && searchButton) {
    const applySearchInput = () => {
      searchTerm = searchInput.value.trim().toLowerCase();
      applySearch();
    };
    searchInput.addEventListener("input", applySearchInput);
    searchButton.addEventListener("click", applySearchInput);
  }

  document.addEventListener("news:updated", applySearch);
})();
