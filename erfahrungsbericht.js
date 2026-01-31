(() => {
  const articles = window.ARTICLES || [];
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  const hero = document.getElementById("article-hero");
  const body = document.getElementById("article-body");
  const ctaSection = document.getElementById("article-cta-section");
  const fallback = document.getElementById("article-fallback");

  const report = slug ? articles.find((article) => article.slug === slug) : null;

  if (!report) {
    hero?.setAttribute("hidden", "true");
    body?.setAttribute("hidden", "true");
    ctaSection?.setAttribute("hidden", "true");
    fallback?.removeAttribute("hidden");
    return;
  }

  const title = document.getElementById("article-title");
  const intro = document.getElementById("article-intro");
  const sectionsWrapper = document.getElementById("article-sections");
  const cta = document.getElementById("article-cta");

  if (title) title.textContent = report.title;
  if (intro) intro.textContent = report.shortIntro;

  if (sectionsWrapper) {
    sectionsWrapper.innerHTML = "";
    report.sections.forEach((section) => {
      const block = document.createElement("article");
      block.className = "article__section";

      const heading = document.createElement("h2");
      heading.className = "h3";
      heading.textContent = section.heading;

      block.appendChild(heading);
      section.paragraphs.forEach((paragraph) => {
        const text = document.createElement("p");
        text.textContent = paragraph;
        block.appendChild(text);
      });
      sectionsWrapper.appendChild(block);
    });
  }

  if (cta && report.gesucheQuery) {
    cta.href = `./gesuche.html?${report.gesucheQuery}`;
  }
})();
