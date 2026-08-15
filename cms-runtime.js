(async () => {
  const text = (value) => (value == null ? "" : String(value));
  const setText = (selector, value, root = document) => {
    const element = root.querySelector(selector);
    if (element && value != null) element.textContent = text(value);
  };
  const escapeHtml = (value) =>
    text(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  const assetPath = (value) => {
    const path = text(value);
    return path.startsWith("images/") ? `/${path}` : path;
  };

  const renderProjectCard = (project) => {
    const categories = Array.isArray(project.categories) ? project.categories.join(" ") : "";
    const year = project.year ? `<p>${escapeHtml(project.year)}</p>` : "";
    return `
      <article class="project-card" data-categories="${escapeHtml(categories)}">
        <a href="/projects/${escapeHtml(project.id)}/">
          <img
            src="${escapeHtml(assetPath(project.leadImage))}"
            alt="${escapeHtml(project.titleEn)} — ${escapeHtml(project.titleZh)}"
            width="1600"
            height="900"
            loading="lazy"
          />
          <div class="meta">
            <div><h3>${escapeHtml(project.titleEn)}</h3><p class="zh">${escapeHtml(project.titleZh)}</p></div>
            ${year}
          </div>
        </a>
      </article>
    `;
  };

  const findProjectFromPath = (projects) => {
    const match = window.location.pathname.match(/^\/projects\/([^/]+)\/?$/);
    if (!match) return null;
    return projects.find((project) => project.id === match[1]) || null;
  };

  const ensureProjectDetailScaffold = (project) => {
    if (document.querySelector(".project-header") || !project) return;
    const main = document.querySelector("main");
    if (!main) return;

    document.title = `${project.titleEn} — Studio Signo`;
    main.innerHTML = `
      <article>
        <header class="project-header shell section">
          <p class="eyebrow">Project / 项目</p>
          <h1 class="display"></h1>
          <p class="zh"></p>
          <dl></dl>
        </header>
        <figure class="lead">
          <img alt="" width="1600" height="900" />
        </figure>
        <section class="narrative shell section">
          <p></p>
          <p class="zh"></p>
        </section>
        <section class="project-gallery shell section" aria-label="Project detail gallery / 项目详情图片" data-project-gallery></section>
      </article>
    `;

    if (!document.querySelector("[data-runtime-project-style]")) {
      const style = document.createElement("style");
      style.setAttribute("data-runtime-project-style", "true");
      style.textContent = `
        .project-header h1 {
          max-width: 14ch;
          margin: 0.8rem 0;
          font-size: clamp(3rem, 8vw, 8rem);
          line-height: 0.88;
        }
        .project-header dl {
          margin: 4rem 0 0 auto;
          max-width: 42rem;
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 0.75rem 1rem;
        }
        .project-header dt {
          color: var(--muted);
        }
        .project-header dd,
        .lead,
        .project-gallery figure {
          margin: 0;
        }
        .lead img {
          width: 100%;
          max-height: 90svh;
          object-fit: cover;
        }
        .narrative {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          font-size: clamp(1.25rem, 2.5vw, 2.25rem);
          line-height: 1.45;
        }
        .narrative p {
          margin: 0;
        }
        .project-gallery {
          display: grid;
          gap: clamp(1rem, 2vw, 2rem);
        }
        .project-gallery img {
          width: 100%;
          height: auto;
          display: block;
          background: #d8d8d4;
        }
        @media (max-width: 700px) {
          .project-header dl,
          .narrative {
            grid-template-columns: 1fr;
          }
        }
      `;
      document.head.appendChild(style);
    }
  };

  const updateProjectsGrid = (projects, root = document, onlyFeatured = false) => {
    const grid = root.querySelector(".project-grid");
    const selectedProjects = projects
      .filter((project) => !onlyFeatured || project.featured)
      .sort((a, b) => Number(a.order || 0) - Number(b.order || 0));
    if (grid && selectedProjects.length) {
      grid.innerHTML = selectedProjects.map(renderProjectCard).join("");
    }
  };

  const renderHeroSlides = (projects) => {
    const selectedProjects = projects
      .filter((project) => project.featured && project.leadImage)
      .sort((a, b) => Number(a.order || 0) - Number(b.order || 0));
    const slides = document.querySelector("[data-hero-slides]");
    const captions = document.querySelector("[data-hero-projects]");
    if (!slides || !captions || !selectedProjects.length) return;

    const duration = Math.max(selectedProjects.length * 7, 28);
    slides.setAttribute("style", `--slide-count: ${selectedProjects.length}; --duration: ${duration}s;`);
    slides.innerHTML = selectedProjects
      .map(
        (project, index) => `
          <a
            class="hero-slide${index === 0 ? " active" : ""}"
            href="/projects/${escapeHtml(project.id)}/"
            style="--index: ${index}; --duration: ${duration}s;"
            aria-label="${escapeHtml(project.titleEn)} — ${escapeHtml(project.titleZh)}"
          >
            <img
              src="${escapeHtml(assetPath(project.leadImage))}"
              alt="${index === 0 ? "Featured Studio Signo project" : ""}"
              width="1600"
              height="900"
              ${index === 0 ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"'}
            />
          </a>
        `,
      )
      .join("");
    captions.innerHTML = selectedProjects
      .map(
        (project, index) => `
          <a
            class="hero-project${index === 0 ? " active" : ""}"
            href="/projects/${escapeHtml(project.id)}/"
            style="--index: ${index}; --duration: ${duration}s;"
          >
            <span>${escapeHtml(project.titleEn)}</span>
            <span class="zh">${escapeHtml(project.titleZh)}</span>
          </a>
        `,
      )
      .join("");
  };

  const updateProjectDetail = (project) => {
    ensureProjectDetailScaffold(project);
    const header = document.querySelector(".project-header");
    if (!header || !project) return;

    setText("h1", project.titleEn, header);
    setText("h1 + .zh", project.titleZh, header);

    const details = [];
    if (project.year) details.push(["Year / 年份", escapeHtml(project.year)]);
    if (project.locationEn || project.locationZh) {
      details.push([
        "Location / 地点",
        `${escapeHtml(project.locationEn)}<br /><span class="zh">${escapeHtml(project.locationZh)}</span>`,
      ]);
    }
    details.push([
      "Scope / 服务",
      `${escapeHtml(project.scopeEn)}<br /><span class="zh">${escapeHtml(project.scopeZh)}</span>`,
    ]);

    const dl = header.querySelector("dl");
    if (dl) {
      dl.innerHTML = details
        .map(([label, value]) => `<dt>${label}</dt><dd>${value}</dd>`)
        .join("");
    }

    const leadImage = document.querySelector(".lead img");
    if (leadImage && project.leadImage) {
      leadImage.src = assetPath(project.leadImage);
      leadImage.alt = `${project.titleEn} project overview`;
    }

    const narrative = document.querySelector(".narrative");
    if (narrative) {
      const paragraphs = narrative.querySelectorAll("p");
      if (paragraphs[0]) paragraphs[0].textContent = text(project.summaryEn);
      if (paragraphs[1]) paragraphs[1].textContent = text(project.summaryZh);
    }

    let gallery = document.querySelector("[data-project-gallery]");
    if (!gallery && narrative) {
      gallery = document.createElement("section");
      gallery.className = "project-gallery shell section";
      gallery.setAttribute("aria-label", "Project detail gallery / 项目详情图片");
      gallery.setAttribute("data-project-gallery", "");
      narrative.insertAdjacentElement("afterend", gallery);
    }
    const images = Array.isArray(project.images) ? project.images : [];
    if (gallery && images.length) {
      gallery.innerHTML = images
        .map(
          (image, index) => `
            <figure>
              <img
                src="${escapeHtml(assetPath(image))}"
                alt="${escapeHtml(project.titleEn)} detail image ${index + 1}"
                width="1600"
                height="900"
                loading="${index === 0 ? "eager" : "lazy"}"
              />
            </figure>
          `,
        )
        .join("");
    }
  };

  try {
    const response = await fetch(`/site-content.json?v=${Date.now()}`, {
      cache: "no-store",
    });
    if (!response.ok) return;

    const content = await response.json();
    const projects = Array.isArray(content.projects) ? content.projects : [];
    const home = content.home || {};
    const hero = home.hero || {};
    const selectedWork = home.selectedWork || {};
    const practice = home.practice || {};
    const approach = home.approach || {};

    const heroSection = document.querySelector(".hero");
    if (heroSection) {
      const heroImage = heroSection.querySelector("img");
      if (heroImage && hero.image) {
        heroImage.src = assetPath(hero.image);
        heroImage.alt = hero.imageAlt || heroImage.alt;
      }
      setText(".eyebrow", hero.eyebrow, heroSection);
      setText("#hero-title", hero.titleEn, heroSection);
      setText(".overlay > div > .zh", hero.titleZh, heroSection);
      setText(".intro[lang='en']", hero.introEn, heroSection);
      setText(".intro.zh", hero.introZh, heroSection);
      setText(".cityline", hero.cityline, heroSection);
      renderHeroSlides(projects);
    }

    const selectedSection = document.querySelector("section[aria-labelledby='selected-work']");
    if (selectedSection) {
      setText(".eyebrow", selectedWork.eyebrow, selectedSection);
      setText("#selected-work", selectedWork.titleEn, selectedSection);
      setText("#selected-work + .zh", selectedWork.titleZh, selectedSection);
      setText(".archive-link", selectedWork.archiveLabel, selectedSection);

      updateProjectsGrid(projects, selectedSection, true);
    }

    const archiveGrid = document.querySelector("[data-project-grid]");
    if (archiveGrid) updateProjectsGrid(projects, document, false);
    updateProjectDetail(findProjectFromPath(projects));

    const practiceTitle = document.querySelector("#practice-title");
    const practiceSection = practiceTitle?.closest("section");
    if (practiceSection) {
      setText(".eyebrow", practice.eyebrow, practiceSection);
      setText("#practice-title", practice.titleEn, practiceSection);
      setText("#practice-title + .zh", practice.titleZh, practiceSection);
      const list = practiceSection.querySelector("ol");
      if (list && Array.isArray(practice.areas) && practice.areas.length) {
        list.innerHTML = practice.areas
          .map(
            (area) =>
              `<li><span>${escapeHtml(area.number)}</span><h3>${escapeHtml(area.titleEn)}</h3><p class="zh">${escapeHtml(area.titleZh)}</p></li>`,
          )
          .join("");
      }
    }

    const approachSection = document.querySelector(".approach");
    if (approachSection) {
      setText(".eyebrow", approach.eyebrow, approachSection);
      setText("h2", approach.titleEn, approachSection);
      const paragraphs = approachSection.querySelectorAll(".approach-copy p");
      if (paragraphs[0] && approach.bodyEn != null) paragraphs[0].textContent = text(approach.bodyEn);
      if (paragraphs[1] && approach.bodyZh != null) paragraphs[1].textContent = text(approach.bodyZh);
    }
  } catch {
    // Keep the built-in static content if the editable content file is unavailable.
  }
})();
