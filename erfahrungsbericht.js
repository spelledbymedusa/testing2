(() => {
  const reports = window.HELP_REPORTS || {};
  const buckets = window.HELP_BUCKETS || [];
  const params = new URLSearchParams(window.location.search);
  const topic = params.get("topic");

  const hero = document.getElementById("article-hero");
  const body = document.getElementById("article-body");
  const ctaSection = document.getElementById("article-cta-section");
  const fallback = document.getElementById("article-fallback");

  const report = topic ? reports[topic] : null;

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
  if (intro) intro.textContent = report.intro;

  if (sectionsWrapper) {
    sectionsWrapper.innerHTML = "";
    report.sections.forEach((section) => {
      const block = document.createElement("article");
      block.className = "article__section";

      const heading = document.createElement("h2");
      heading.className = "h3";
      heading.textContent = section.title;

      const text = document.createElement("p");
      text.textContent = section.text;

      block.appendChild(heading);
      block.appendChild(text);
      sectionsWrapper.appendChild(block);
    });
  }

  const allOptions = buckets.flatMap((bucket) =>
    bucket.subOptions.map((option) => ({ ...option, bucketId: bucket.id }))
  );
  const optionMatch = allOptions.find((option) => option.reportId === topic || option.id === topic);

  if (cta && optionMatch?.filters) {
    const query = new URLSearchParams(optionMatch.filters).toString();
    cta.href = `./gesuche.html?${query}`;
  }
})();
