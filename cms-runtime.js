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
  const injectTypography = () => {
    if (document.querySelector("[data-silka-typography]")) return;
    const style = document.createElement("style");
    style.setAttribute("data-silka-typography", "true");
    style.textContent = `
      @font-face{font-family:"Silka Local";src:local("Silka ExtraLight"),local("Silka-ExtraLight");font-weight:200;font-style:normal}
      @font-face{font-family:"Silka Local";src:local("Silka Light"),local("Silka-Light");font-weight:300;font-style:normal}
      @font-face{font-family:"Silka Local";src:local("Silka Regular"),local("Silka-Regular");font-weight:400;font-style:normal}
      @font-face{font-family:"Silka Local";src:local("Silka Medium"),local("Silka-Medium");font-weight:500;font-style:normal}
      @font-face{font-family:"Silka Local";src:local("Silka SemiBold"),local("Silka-SemiBold");font-weight:600;font-style:normal}
      @font-face{font-family:"Silka Local";src:local("Silka Bold"),local("Silka-Bold");font-weight:700;font-style:normal}
      :root{--font-en:"Silka Local","Silka","Helvetica Neue",Arial;--font-zh:"PingFang SC","Hiragino Sans GB","Microsoft YaHei";--sans:var(--font-en),var(--font-zh),sans-serif}
      body{font-family:var(--sans);font-weight:300}
      .display{font-family:var(--font-en),var(--font-zh)!important;font-weight:600!important;letter-spacing:-0.06em!important}
      .eyebrow{font-weight:600}
      .zh{font-family:var(--font-zh);font-weight:400}
      nav a,.project-card h3,.hero-project span:first-child{font-family:var(--font-en),var(--font-zh);font-weight:500}
      .hero-project span:first-child{letter-spacing:-0.055em!important}
      .narrative p,.intro,dd,p{font-weight:300}
      strong,b{font-weight:600}
      .language-switch{display:flex;gap:.35rem;align-items:center;margin-left:clamp(.8rem,2vw,1.5rem)}
      .language-switch button{border:1px solid var(--line);border-radius:999px;background:transparent;color:var(--muted);padding:.35rem .6rem;font:600 .68rem/1 var(--sans);letter-spacing:.08em;cursor:pointer}
      .language-switch button[aria-pressed="true"]{background:var(--blue);border-color:var(--blue);color:#fff}
      html[data-lang="en"] [data-lang="zh"],html[data-lang="zh"] [data-lang="en"]{display:none!important}
      html[data-lang="zh"] .hero-title-zh,html[data-lang="zh"] .section-title-zh,html[data-lang="zh"] .project-title-zh{display:block!important;color:var(--blue);font-family:var(--font-zh)!important;font-weight:500!important;letter-spacing:-.04em!important}
      html[data-lang="zh"] .hero-title-zh{max-width:11ch;margin:.6rem 0 2rem;font-size:clamp(3.2rem,8.5vw,8.5rem);line-height:.92}
      html[data-lang="zh"] .section-title-zh,html[data-lang="zh"] .project-title-zh{max-width:14ch;margin:.8rem 0;font-size:clamp(2.4rem,5.4vw,5.8rem);line-height:1.02}
      html[data-lang="en"] .narrative,html[data-lang="zh"] .narrative{grid-template-columns:minmax(0,68rem);justify-content:start}
      html[data-lang="zh"] .narrative{font-family:var(--font-zh);font-size:clamp(1rem,1.18vw,1.18rem)!important;line-height:2.05!important;letter-spacing:.01em}
      html[data-lang="zh"] .narrative p{max-width:52rem;color:var(--ink);font-weight:400}
      html[data-lang="zh"] .project-header dl{max-width:34rem;font-family:var(--font-zh);font-size:.95rem;line-height:1.85}
      html[data-lang="zh"] .project-card h3{font-family:var(--font-zh);font-weight:500}
      html[data-lang="zh"] .hero-project .zh{font-family:var(--font-zh);font-size:clamp(1.25rem,2.5vw,2.4rem);line-height:1.1;letter-spacing:-.03em}
    `;
    document.head.append(style);
  };
  injectTypography();
  const getLanguage = () => {
    const param = new URLSearchParams(window.location.search).get("lang");
    if (param === "zh" || param === "cn") return "zh";
    if (param === "en") return "en";
    try {
      return localStorage.getItem("studio-signo-language") === "zh" ? "zh" : "en";
    } catch {
      return "en";
    }
  };
  let currentLanguage = getLanguage();
  const splitBilingual = (value, lang = currentLanguage) => {
    const parts = text(value).split(/\s*\/\s*/);
    if (parts.length < 2) return text(value);
    return lang === "zh" ? parts.slice(1).join(" / ") : parts[0];
  };
  const setLanguage = (language, persist = true) => {
    currentLanguage = language === "zh" ? "zh" : "en";
    document.documentElement.dataset.lang = currentLanguage;
    document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : "en";
    if (persist) {
      try {
        localStorage.setItem("studio-signo-language", currentLanguage);
      } catch {}
      const url = new URL(window.location.href);
      url.searchParams.set("lang", currentLanguage);
      window.history.replaceState({}, "", url);
    }
    document.querySelectorAll("[data-language-switch] button").forEach((button) => {
      button.setAttribute("aria-pressed", button.dataset.setLanguage === currentLanguage ? "true" : "false");
    });
  };
  const markLanguagePairs = () => {
    document.querySelectorAll(".zh").forEach((element) => {
      element.dataset.lang ||= "zh";
    });
    document.querySelectorAll("nav a").forEach((link) => {
      const spans = link.querySelectorAll("span");
      if (spans[0]) spans[0].dataset.lang = "en";
      if (spans[1]) spans[1].dataset.lang = "zh";
    });
    document.querySelectorAll(".project-card .meta > div").forEach((group) => {
      const title = group.querySelector("h3");
      if (title) title.dataset.lang = "en";
    });
    document.querySelectorAll(".hero-project").forEach((caption) => {
      const first = caption.querySelector("span:first-child");
      if (first) first.dataset.lang = "en";
    });
    const heroTitle = document.querySelector("#hero-title");
    if (heroTitle) heroTitle.dataset.lang = "en";
    const heroTitleZh = document.querySelector(".overlay > div > .zh");
    if (heroTitleZh) heroTitleZh.classList.add("display", "hero-title-zh");
    document.querySelectorAll(".display + .zh").forEach((title) => {
      title.classList.add("display", "section-title-zh");
    });
    document.querySelectorAll(".intro:not(.zh), .narrative p:not(.zh), .approach-copy p:not(.zh)").forEach((element) => {
      element.dataset.lang ||= "en";
    });
    document.querySelectorAll(".cityline").forEach((element) => {
      element.dataset.lang = "en";
    });
  };
  const injectLanguageSwitch = () => {
    const header = document.querySelector(".site-header");
    const nav = header?.querySelector("nav");
    if (!header || !nav || header.querySelector("[data-language-switch]")) return;
    const switcher = document.createElement("div");
    switcher.className = "language-switch";
    switcher.dataset.languageSwitch = "";
    switcher.setAttribute("aria-label", "Language");
    switcher.innerHTML = `
      <button type="button" data-set-language="en">EN</button>
      <button type="button" data-set-language="zh">中</button>
    `;
    switcher.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-set-language]");
      if (button) setLanguage(button.dataset.setLanguage);
    });
    nav.insertAdjacentElement("afterend", switcher);
  };
  const refreshLanguage = () => {
    injectLanguageSwitch();
    markLanguagePairs();
    document.querySelectorAll("[data-bilingual-label]").forEach((element) => {
      element.textContent = splitBilingual(element.dataset.bilingualLabel);
    });
    setLanguage(currentLanguage, false);
  };
  setLanguage(currentLanguage, false);

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
            <div><h3 data-lang="en">${escapeHtml(project.titleEn)}</h3><p class="zh" data-lang="zh">${escapeHtml(project.titleZh)}</p></div>
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
          <p class="eyebrow" data-bilingual-label="Project / 项目">Project</p>
          <h1 class="display" data-lang="en"></h1>
          <h1 class="display zh project-title-zh" data-lang="zh"></h1>
          <dl></dl>
        </header>
        <figure class="lead">
          <img alt="" width="1600" height="900" />
        </figure>
        <section class="narrative shell section">
          <p data-lang="en"></p>
          <p class="zh" data-lang="zh"></p>
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
          font-weight: 600;
          letter-spacing: -0.06em;
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
    header.querySelector("h1")?.setAttribute("data-lang", "en");
    let titleZh = header.querySelector(".project-title-zh");
    const oldTitleZh = header.querySelector("h1 + .zh");
    if (!titleZh && oldTitleZh) {
      titleZh = document.createElement("h1");
      titleZh.className = "display zh project-title-zh";
      titleZh.dataset.lang = "zh";
      oldTitleZh.replaceWith(titleZh);
    }
    if (!titleZh) {
      titleZh = document.createElement("h1");
      titleZh.className = "display zh project-title-zh";
      titleZh.dataset.lang = "zh";
      header.querySelector("h1")?.insertAdjacentElement("afterend", titleZh);
    }
    titleZh.textContent = text(project.titleZh);
    const eyebrow = header.querySelector(".eyebrow");
    if (eyebrow) {
      eyebrow.dataset.bilingualLabel = "Project / 项目";
      eyebrow.textContent = splitBilingual(eyebrow.dataset.bilingualLabel);
    }

    const details = [];
    if (project.year) details.push(["Year / 年份", escapeHtml(project.year), escapeHtml(project.year)]);
    if (project.locationEn || project.locationZh) {
      details.push([
        "Location / 地点",
        escapeHtml(project.locationEn),
        escapeHtml(project.locationZh),
      ]);
    }
    details.push([
      "Scope / 服务",
      escapeHtml(project.scopeEn),
      escapeHtml(project.scopeZh),
    ]);

    const dl = header.querySelector("dl");
    if (dl) {
      dl.innerHTML = details
        .map(
          ([label, valueEn, valueZh]) => `
            <dt data-bilingual-label="${escapeHtml(label)}">${escapeHtml(splitBilingual(label))}</dt>
            <dd><span data-lang="en">${valueEn}</span><span class="zh" data-lang="zh">${valueZh}</span></dd>
          `,
        )
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
      if (paragraphs[0]) {
        paragraphs[0].textContent = text(project.summaryEn);
        paragraphs[0].dataset.lang = "en";
      }
      if (paragraphs[1]) {
        paragraphs[1].textContent = text(project.summaryZh);
        paragraphs[1].dataset.lang = "zh";
      }
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
      selectedSection.querySelector(".eyebrow")?.setAttribute("data-bilingual-label", selectedWork.eyebrow || "");
      setText("#selected-work", selectedWork.titleEn, selectedSection);
      setText("#selected-work + .zh", selectedWork.titleZh, selectedSection);
      setText(".archive-link", selectedWork.archiveLabel, selectedSection);
      selectedSection.querySelector(".archive-link")?.setAttribute("data-bilingual-label", selectedWork.archiveLabel || "");

      updateProjectsGrid(projects, selectedSection, true);
    }

    const archiveGrid = document.querySelector("[data-project-grid]");
    if (archiveGrid) updateProjectsGrid(projects, document, false);
    updateProjectDetail(findProjectFromPath(projects));

    const practiceTitle = document.querySelector("#practice-title");
    const practiceSection = practiceTitle?.closest("section");
    if (practiceSection) {
      setText(".eyebrow", practice.eyebrow, practiceSection);
      practiceSection.querySelector(".eyebrow")?.setAttribute("data-bilingual-label", practice.eyebrow || "");
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
      approachSection.querySelector(".eyebrow")?.setAttribute("data-bilingual-label", approach.eyebrow || "");
      setText("h2", approach.titleEn, approachSection);
      const paragraphs = approachSection.querySelectorAll(".approach-copy p");
      if (paragraphs[0] && approach.bodyEn != null) paragraphs[0].textContent = text(approach.bodyEn);
      if (paragraphs[1] && approach.bodyZh != null) paragraphs[1].textContent = text(approach.bodyZh);
    }
    refreshLanguage();
  } catch {
    // Keep the built-in static content if the editable content file is unavailable.
  }
})();
