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
    document.documentElement.classList.add("notranslate");
    document.documentElement.setAttribute("translate", "no");
    if (!document.querySelector('meta[name="google"][content="notranslate"]')) {
      const meta = document.createElement("meta");
      meta.name = "google";
      meta.content = "notranslate";
      document.head.append(meta);
    }
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
      :root{--font-en:"Silka Local","Silka","DIN Pro","DINPro","FF DIN","DIN 2014","Clan Pro","Clan","Zurich","Helvetica Neue",Arial,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI";--font-zh:"Source Han Sans SC","Source Han Sans CN","Noto Sans CJK SC","Noto Sans SC","PingFang SC","Hiragino Sans GB","Microsoft YaHei","Microsoft JhengHei","Heiti SC","Adobe Heiti Std","Adobe 黑体 Std";--sans:var(--font-en),var(--font-zh),sans-serif}
      body{font-family:var(--sans);font-weight:300}
      .display{font-family:var(--font-en),var(--font-zh)!important;font-weight:600!important;letter-spacing:-0.06em!important}
      .eyebrow{font-weight:600}
      .zh{font-family:var(--font-zh);font-weight:400}
      nav a,.project-card h3,.hero-project span:first-child{font-family:var(--font-en),var(--font-zh);font-weight:500}
      .hero-project span:first-child{letter-spacing:-0.055em!important}
      .footer-social{display:flex;flex-direction:column;gap:.35rem}
      footer a{color:inherit;text-decoration:none}
      footer a:hover,footer a:focus-visible{color:var(--blue)}
      .narrative p,.intro,dd,p{font-weight:300}
      strong,b{font-weight:600}
      .site-header .language-switch{display:flex;gap:.35rem;align-items:center;margin-left:auto;margin-right:clamp(.9rem,2.4vw,1.8rem)}
      .language-switch button{border:1px solid var(--line);border-radius:999px;background:transparent;color:var(--muted);padding:.35rem .6rem;font:600 .68rem/1 var(--sans);letter-spacing:.08em;cursor:pointer}
      .language-switch button[aria-pressed="true"]{background:var(--blue);border-color:var(--blue);color:#fff}
      html:not([data-lang]) [data-lang]:not([data-lang="en"]),html[data-lang="en"] [data-lang]:not([data-lang="en"]),html[data-lang="zh"] [data-lang]:not([data-lang="zh"]),html[data-lang="fi"] [data-lang]:not([data-lang="fi"]){display:none!important}
      html[data-lang="zh"] .hero-title-zh,html[data-lang="zh"] .section-title-zh,html[data-lang="zh"] .project-title-zh{display:block!important;color:var(--blue);font-family:var(--font-zh)!important;font-weight:500!important;letter-spacing:-.04em!important}
      html[data-lang="fi"] .hero-title-fi,html[data-lang="fi"] .section-title-fi,html[data-lang="fi"] .project-title-fi{display:block!important;color:var(--blue);font-family:var(--font-en)!important;font-weight:600!important;letter-spacing:-.055em!important}
      html[data-lang="zh"] .hero-title-zh,html[data-lang="fi"] .hero-title-fi{max-width:11ch;margin:.6rem 0 2rem;font-size:clamp(3.2rem,8.5vw,8.5rem);line-height:.92}
      html[data-lang="zh"] .section-title-zh,html[data-lang="zh"] .project-title-zh,html[data-lang="fi"] .section-title-fi,html[data-lang="fi"] .project-title-fi{max-width:14ch;margin:.8rem 0;font-size:clamp(2.4rem,5.4vw,5.8rem);line-height:1.02}
      html[data-lang="en"] .narrative,html[data-lang="zh"] .narrative,html[data-lang="fi"] .narrative{grid-template-columns:minmax(0,68rem);justify-content:start}
      html[data-lang="zh"] .narrative{font-family:var(--font-zh);font-size:clamp(1rem,1.18vw,1.18rem)!important;line-height:2.05!important;letter-spacing:.01em}
      html[data-lang="zh"] .narrative p{max-width:52rem;color:var(--ink);font-size:clamp(1rem,1.18vw,1.18rem)!important;line-height:2.05!important;font-weight:400}
      html[data-lang="fi"] .narrative p{max-width:52rem;color:var(--ink);font-size:clamp(1rem,1.18vw,1.18rem)!important;line-height:2.05!important;font-weight:300}
      html[data-lang="zh"] .project-header dl{max-width:34rem;font-family:var(--font-zh);font-size:.95rem;line-height:1.85}
      html[data-lang="zh"] .project-card h3{font-family:var(--font-zh);font-weight:500}
      html[data-lang="zh"] .hero-project .zh{font-family:var(--font-zh);font-size:clamp(1.25rem,2.5vw,2.4rem);line-height:1.1;letter-spacing:-.03em}
      .hero-slides{overflow:hidden}
      .hero-slide{opacity:0;animation:studio-signo-hero-slide var(--duration) cubic-bezier(.76,0,.24,1) infinite!important;animation-delay:calc(var(--index) * var(--step, 6s))!important;transform:translateX(100%);will-change:transform,opacity;pointer-events:auto}
      .hero-slide.active{pointer-events:auto}
      .hero-slide img{animation:studio-signo-hero-image var(--duration) ease-in-out infinite!important;animation-delay:inherit!important;transform:scale(1.035);will-change:transform}
      .hero-projects{position:relative;min-height:7.4rem;overflow:hidden}
      .hero-project{position:absolute;inset:auto 0 0 auto;display:block;max-width:min(34rem,100%);color:var(--blue);text-align:right;text-decoration:none;opacity:0;pointer-events:auto;animation:studio-signo-hero-caption var(--duration) ease-in-out infinite!important;animation-delay:calc(var(--index) * var(--step, 6s))!important}
      .hero-project span{display:block}
      .hero-project span:first-child,.hero-project span[data-lang="fi"]{color:var(--blue);font-size:clamp(1.6rem,3vw,3rem);line-height:.95;letter-spacing:-.055em}
      .hero-project .zh{display:block;margin-top:.35rem;color:var(--blue)}
      .hero-project-cta{display:inline-flex!important;align-items:center;gap:.45rem;margin-top:.85rem;border:1px solid color-mix(in srgb,var(--blue) 55%,transparent);border-radius:999px;padding:.42rem .7rem;color:var(--blue);font-size:.68rem;font-style:normal;font-weight:600;letter-spacing:.1em;text-transform:uppercase;background:color-mix(in srgb,var(--paper-light) 65%,transparent);transition:background .25s ease,color .25s ease,transform .25s ease}
      .hero-project:hover .hero-project-cta,.hero-project:focus-visible .hero-project-cta{background:var(--blue);color:#fff;transform:translateX(.2rem)}
      .hero-slide{cursor:pointer}
      .hero-project{cursor:pointer}
      .floating-contact{position:fixed;right:clamp(1rem,2.6vw,2rem);bottom:clamp(1rem,2.6vw,2rem);z-index:90;font-family:var(--sans);color:var(--ink)}
      .floating-contact *{box-sizing:border-box}
      .floating-contact-toggle{border:1px solid color-mix(in srgb,var(--blue) 88%,#fff);border-radius:999px;background:var(--blue);color:#fff;box-shadow:0 1rem 2.5rem color-mix(in srgb,var(--blue) 22%,transparent);padding:.8rem 1rem;font:600 .82rem/1 var(--sans);letter-spacing:.08em;text-transform:uppercase;cursor:pointer}
      .floating-contact-toggle:hover,.floating-contact-toggle:focus-visible{transform:translateY(-1px);box-shadow:0 1.2rem 3rem color-mix(in srgb,var(--blue) 28%,transparent)}
      .floating-contact-panel{position:absolute;right:0;bottom:calc(100% + .75rem);width:min(24rem,calc(100vw - 2rem));border:1px solid var(--line);background:color-mix(in srgb,var(--paper-light) 96%,#fff);box-shadow:0 1.6rem 4rem color-mix(in srgb,#000 18%,transparent);padding:1rem;display:none}
      .floating-contact.is-open .floating-contact-panel{display:block}
      .floating-contact-head{display:flex;justify-content:space-between;gap:1rem;align-items:flex-start;margin-bottom:.85rem}
      .floating-contact-title{margin:0;color:var(--blue);font:600 1.25rem/1.05 var(--sans);letter-spacing:-.04em}
      .floating-contact-note{margin:.35rem 0 0;color:var(--muted);font-size:.78rem;line-height:1.45}
      .floating-contact-close{border:0;background:transparent;color:var(--muted);font-size:1.35rem;line-height:1;cursor:pointer;padding:.1rem}
      .floating-contact form{display:grid;gap:.7rem}
      .floating-contact label{display:grid;gap:.25rem;color:var(--muted);font-size:.7rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase}
      .floating-contact input,.floating-contact textarea{width:100%;border:1px solid color-mix(in srgb,var(--ink) 18%,transparent);border-radius:0;background:#fff;color:var(--ink);padding:.72rem .75rem;font:400 .9rem/1.4 var(--sans)}
      .floating-contact textarea{min-height:7.5rem;resize:vertical}
      .floating-contact-actions{display:flex;flex-wrap:wrap;gap:.55rem;align-items:center;margin-top:.2rem}
      .floating-contact-submit,.floating-contact-copy{border:1px solid var(--blue);border-radius:999px;padding:.66rem .82rem;font:600 .72rem/1 var(--sans);letter-spacing:.08em;text-transform:uppercase;cursor:pointer}
      .floating-contact-submit{background:var(--blue);color:#fff}
      .floating-contact-copy{background:transparent;color:var(--blue)}
      .floating-contact-status{min-height:1rem;margin:0;color:var(--muted);font-size:.72rem;line-height:1.4}
      @media (max-width:700px){.floating-contact{right:1rem;bottom:1rem}.floating-contact-panel{width:calc(100vw - 2rem);max-height:calc(100vh - 7rem);overflow:auto}.floating-contact-toggle{padding:.72rem .86rem;font-size:.72rem}}
      img{user-select:none;-webkit-user-select:none;-webkit-user-drag:none;-webkit-touch-callout:none}
      .hero-slide img,.project-card img,.lead img,.project-gallery img{pointer-events:none}
      @keyframes studio-signo-hero-slide{0%{opacity:0;transform:translateX(100%)}2.8%,11.5%{opacity:1;transform:translateX(0)}14.25%,100%{opacity:0;transform:translateX(-100%)}}
      @keyframes studio-signo-hero-image{0%{transform:scale(1.035)}50%{transform:scale(1.075)}100%{transform:scale(1.035)}}
      @keyframes studio-signo-hero-caption{0%{opacity:0;transform:translateX(1rem)}3%,11.5%{opacity:1;transform:translateX(0)}14.25%,100%{opacity:0;transform:translateX(-1rem)}}
      @media (prefers-reduced-motion:reduce){.hero-slide,.hero-project,.hero-slide img{animation:none!important}.hero-slide:not(.active),.hero-project:not(.active){display:none!important}}
    `;
    document.head.append(style);
  };
  injectTypography();
  const protectImages = () => {
    document.querySelectorAll("img").forEach((image) => {
      image.setAttribute("draggable", "false");
      image.setAttribute("oncontextmenu", "return false");
    });
  };
  const isProtectedImageArea = (target) =>
    target?.closest?.("img, .hero-slide, .project-card, .lead, .project-gallery figure");
  protectImages();
  document.addEventListener(
    "contextmenu",
    (event) => {
      if (isProtectedImageArea(event.target)) event.preventDefault();
    },
    true,
  );
  document.addEventListener(
    "dragstart",
    (event) => {
      if (isProtectedImageArea(event.target)) event.preventDefault();
    },
    true,
  );
  new MutationObserver(protectImages).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
  const NAV_LABELS = {
    "/": { en: "Home", zh: "首页", fi: "Etusivu" },
    "/projects/": { en: "Projects", zh: "项目", fi: "Projektit" },
    "/studio/": { en: "About", zh: "关于", fi: "Tietoa" },
    "/contact/": { en: "Contact", zh: "联系", fi: "Yhteys" },
  };
  const CONTACT_RECIPIENT = "longguo2009@gmail.com";
  const LABEL_FI = {
    Project: "Projekti",
    Projects: "Projektit",
    "Selected Work": "Valitut projektit",
    Practice: "Osaaminen",
    Approach: "Lähestymistapa",
    Team: "Tiimi",
    Recognition: "Tunnustukset",
    "Selected Clients": "Asiakkaita",
    Year: "Vuosi",
    Location: "Sijainti",
    Scope: "Palvelut",
    "View all projects": "Katso kaikki projektit →",
    "Return home": "Takaisin etusivulle →",
  };
  const HOME_FI = {
    heroTitle: "Studio Signo muotoilee identiteettiä ja paikkoja.",
    heroIntro:
      "Studio Signo luo identiteettejä, tilajärjestelmiä ja kulttuurisia kokemuksia selkeästi, harkitusti ja inhimillisesti.",
    selectedTitle: "Identiteetin, paikan ja kulttuurienvälisen vuoropuhelun muotoilemaa työtä.",
    practiceTitle: "Kolme osa-aluetta. Yksi kulttuurienvälinen näkökulma.",
    practiceAreas: ["Brändi-identiteetti", "Paikka ja opastus", "Kulttuurienvälinen strategia"],
    approachTitle: "Käännämme kontekstia, emme vain sanoja.",
    approachBody:
      "Studio Signo yhdistää tutkimuksen, visuaaliset järjestelmät ja tilallisen kokemuksen, jotta monimutkaiset ympäristöt tuntuvat selkeiltä, muistettavilta ja inhimillisiltä.",
  };
  const getLanguage = () => {
    const param = new URLSearchParams(window.location.search).get("lang");
    if (param === "zh" || param === "cn") return "zh";
    if (param === "fi" || param === "fin" || param === "suomi") return "fi";
    if (param === "en") return "en";
    try {
      const stored = localStorage.getItem("studio-signo-language");
      return stored === "zh" || stored === "fi" ? stored : "en";
    } catch {
      return "en";
    }
  };
  let currentLanguage = getLanguage();
  const normalizeLanguage = (language) => (language === "zh" || language === "fi" ? language : "en");
  const langValue = (en, zh, fi, lang = currentLanguage) => {
    if (lang === "zh") return text(zh || en || fi);
    if (lang === "fi") return text(fi || en || zh);
    return text(en || fi || zh);
  };
  const splitBilingual = (value, lang = currentLanguage) => {
    const parts = text(value).split(/\s*\/\s*/);
    if (parts.length < 2) return text(value);
    if (lang === "fi") return LABEL_FI[parts[0]] || parts[0];
    return lang === "zh" ? parts.slice(1).join(" / ") : parts[0];
  };
  const ensureLangElement = (afterElement, lang, value, className = "") => {
    if (!afterElement) return null;
    const parent = afterElement.parentElement;
    if (!parent) return null;
    let element = parent.querySelector(`[data-lang="${lang}"]`);
    if (!element) {
      element = document.createElement(afterElement.tagName.toLowerCase());
      element.dataset.lang = lang;
      if (className) element.className = className;
      afterElement.insertAdjacentElement("afterend", element);
    }
    element.textContent = text(value);
    return element;
  };
  const setLanguage = (language, persist = true) => {
    currentLanguage = normalizeLanguage(language);
    document.documentElement.dataset.lang = currentLanguage;
    document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : currentLanguage === "fi" ? "fi" : "en";
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
    const primaryNav = document.querySelector(".site-header nav");
    if (primaryNav && !primaryNav.querySelector('a[href="/"]')) {
      const homeLink = document.createElement("a");
      homeLink.href = "/";
      homeLink.innerHTML = `
        <span lang="en" data-lang="en">Home</span>
        <span lang="zh-CN" data-lang="zh">首页</span>
        <span lang="fi" data-lang="fi">Etusivu</span>
      `;
      primaryNav.prepend(homeLink);
    }
    const footer = document.querySelector("footer");
    if (footer && !footer.querySelector(".footer-social")) {
      const social = document.createElement("nav");
      social.className = "footer-social";
      social.setAttribute("aria-label", "Social links");
      social.innerHTML = `
        <a href="https://www.pinterest.com/search/pins/?q=Studio%20Signo" target="_blank" rel="noopener noreferrer">
          <span data-lang="en">Pinterest</span>
          <span data-lang="zh">Pinterest</span>
          <span data-lang="fi">Pinterest</span>
        </a>
        <a href="/contact/">
          <span data-lang="en">WeChat Official Account</span>
          <span data-lang="zh">微信公众号</span>
          <span data-lang="fi">WeChat</span>
        </a>
      `;
      const copyright = Array.from(footer.children).find((child) => child.textContent?.includes("©"));
      footer.insertBefore(social, copyright || null);
    }
    document.querySelectorAll(".zh").forEach((element) => {
      element.dataset.lang ||= "zh";
    });
    document.querySelectorAll(".site-header nav a").forEach((link) => {
      const labels = NAV_LABELS[link.getAttribute("href")] || {};
      const spans = link.querySelectorAll("span");
      if (spans[0]) {
        spans[0].dataset.lang = "en";
        if (labels.en) spans[0].textContent = labels.en;
      }
      if (spans[1]) {
        spans[1].dataset.lang = "zh";
        if (labels.zh) spans[1].textContent = labels.zh;
      }
      if (labels.fi && !link.querySelector('[data-lang="fi"]')) {
        const span = document.createElement("span");
        span.dataset.lang = "fi";
        span.lang = "fi";
        span.textContent = labels.fi;
        link.append(span);
      }
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
    document.querySelectorAll("#selected-work, #practice-title, .approach h2").forEach((element) => {
      element.dataset.lang ||= "en";
    });
    const heroTitleZh = document.querySelector(".overlay > div > .zh");
    if (heroTitleZh) heroTitleZh.classList.add("display", "hero-title-zh");
    const heroTitleFi = ensureLangElement(heroTitleZh, "fi", HOME_FI.heroTitle, "display hero-title-fi");
    if (heroTitleFi) heroTitleFi.lang = "fi";
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
      <button type="button" data-set-language="zh">中</button>
      <button type="button" data-set-language="en">EN</button>
      <button type="button" data-set-language="fi">FI</button>
    `;
    switcher.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-set-language]");
      if (button) setLanguage(button.dataset.setLanguage);
    });
    header.insertBefore(switcher, nav);
  };
  const buildContactMessage = (form) => {
    const data = new FormData(form);
    const name = text(data.get("name")).trim();
    const email = text(data.get("email")).trim();
    const organization = text(data.get("organization")).trim();
    const need = text(data.get("need")).trim();
    return [
      "New design inquiry from Studio Signo website",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Organization / Project: ${organization || "-"}`,
      "",
      "Design need:",
      need,
      "",
      `Page: ${window.location.href}`,
    ].join("\n");
  };
  const injectContactWidget = () => {
    if (document.querySelector("[data-floating-contact]")) return;
    const widget = document.createElement("aside");
    widget.className = "floating-contact";
    widget.dataset.floatingContact = "";
    widget.innerHTML = `
      <button class="floating-contact-toggle" type="button" aria-expanded="false" aria-controls="floating-contact-panel">
        <span data-lang="en">Contact</span>
        <span data-lang="zh">联系</span>
        <span data-lang="fi">Yhteys</span>
      </button>
      <div class="floating-contact-panel" id="floating-contact-panel" role="dialog" aria-modal="false" aria-labelledby="floating-contact-title">
        <div class="floating-contact-head">
          <div>
            <p class="floating-contact-title" id="floating-contact-title">
              <span data-lang="en">Start a conversation</span>
              <span data-lang="zh">开始咨询</span>
              <span data-lang="fi">Aloita keskustelu</span>
            </p>
            <p class="floating-contact-note">
              <span data-lang="en">Tell us your email and design need. A ready-to-send email will open.</span>
              <span data-lang="zh">留下邮箱和设计需求，系统会自动生成一封待发送邮件。</span>
              <span data-lang="fi">Jätä sähköpostisi ja tarpeesi. Valmis sähköpostiluonnos avautuu.</span>
            </p>
          </div>
          <button class="floating-contact-close" type="button" aria-label="Close">×</button>
        </div>
        <form>
          <label>
            <span data-lang="en">Name</span>
            <span data-lang="zh">姓名</span>
            <span data-lang="fi">Nimi</span>
            <input name="name" autocomplete="name" required>
          </label>
          <label>
            <span data-lang="en">Email</span>
            <span data-lang="zh">邮箱</span>
            <span data-lang="fi">Sähköposti</span>
            <input name="email" type="email" autocomplete="email" required>
          </label>
          <label>
            <span data-lang="en">Project / Organization</span>
            <span data-lang="zh">项目 / 公司</span>
            <span data-lang="fi">Projekti / Organisaatio</span>
            <input name="organization" autocomplete="organization">
          </label>
          <label>
            <span data-lang="en">Design need</span>
            <span data-lang="zh">设计需求</span>
            <span data-lang="fi">Suunnittelutarve</span>
            <textarea name="need" required></textarea>
          </label>
          <div class="floating-contact-actions">
            <button class="floating-contact-submit" type="submit">
              <span data-lang="en">Send email</span>
              <span data-lang="zh">发送邮件</span>
              <span data-lang="fi">Lähetä</span>
            </button>
            <button class="floating-contact-copy" type="button">
              <span data-lang="en">Copy text</span>
              <span data-lang="zh">复制内容</span>
              <span data-lang="fi">Kopioi</span>
            </button>
          </div>
          <p class="floating-contact-status" aria-live="polite"></p>
        </form>
      </div>
    `;
    const toggle = widget.querySelector(".floating-contact-toggle");
    const close = widget.querySelector(".floating-contact-close");
    const form = widget.querySelector("form");
    const copy = widget.querySelector(".floating-contact-copy");
    const status = widget.querySelector(".floating-contact-status");
    const setOpen = (open) => {
      widget.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) widget.querySelector("input")?.focus();
    };
    toggle.addEventListener("click", () => setOpen(!widget.classList.contains("is-open")));
    close.addEventListener("click", () => setOpen(false));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const message = buildContactMessage(form);
      const subject = encodeURIComponent("Studio Signo design inquiry");
      const body = encodeURIComponent(message);
      window.location.href = `mailto:${CONTACT_RECIPIENT}?subject=${subject}&body=${body}`;
      status.textContent = langValue("Opening your email app…", "正在打开邮件应用…", "Avataan sähköpostia…");
    });
    copy.addEventListener("click", async () => {
      const message = buildContactMessage(form);
      try {
        await navigator.clipboard.writeText(message);
        status.textContent = langValue("Copied. You can paste it into email or WeChat.", "已复制，可粘贴到邮件或微信。", "Kopioitu. Voit liittää sen sähköpostiin tai WeChatiin.");
      } catch {
        status.textContent = langValue("Please select and copy the text manually.", "请手动选择并复制内容。", "Valitse ja kopioi teksti käsin.");
      }
    });
    document.body.append(widget);
  };
  const refreshLanguage = () => {
    injectLanguageSwitch();
    injectContactWidget();
    markLanguagePairs();
    document.querySelectorAll("[data-bilingual-label]").forEach((element) => {
      element.textContent = splitBilingual(element.dataset.bilingualLabel);
    });
    setLanguage(currentLanguage, false);
  };
  refreshLanguage();

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
            <div>
              <h3 data-lang="en">${escapeHtml(project.titleEn)}</h3>
              <h3 data-lang="fi">${escapeHtml(project.titleFi || project.titleEn)}</h3>
              <p class="zh" data-lang="zh">${escapeHtml(project.titleZh)}</p>
            </div>
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
          <h1 class="display project-title-fi" data-lang="fi"></h1>
          <dl></dl>
        </header>
        <figure class="lead">
          <img alt="" width="1600" height="900" />
        </figure>
        <section class="narrative shell section">
          <p data-lang="en"></p>
          <p class="zh" data-lang="zh"></p>
          <p data-lang="fi"></p>
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

    const step = 6;
    const duration = Math.max(selectedProjects.length * step, 28);
    slides.setAttribute("style", `--slide-count: ${selectedProjects.length}; --step: ${step}s; --duration: ${duration}s;`);
    slides.innerHTML = selectedProjects
      .map(
        (project, index) => `
          <a
            class="hero-slide${index === 0 ? " active" : ""}"
            href="/projects/${escapeHtml(project.id)}/"
            style="--index: ${index}; --step: ${step}s; --duration: ${duration}s;"
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
            style="--index: ${index}; --step: ${step}s; --duration: ${duration}s;"
          >
            <span>${escapeHtml(project.titleEn)}</span>
            <span data-lang="fi">${escapeHtml(project.titleFi || project.titleEn)}</span>
            <span class="zh">${escapeHtml(project.titleZh)}</span>
            <em class="hero-project-cta" data-lang="en">View project →</em>
            <em class="hero-project-cta" data-lang="zh">进入项目 →</em>
            <em class="hero-project-cta" data-lang="fi">Katso projekti →</em>
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
    let titleFi = header.querySelector(".project-title-fi");
    if (!titleFi) {
      titleFi = document.createElement("h1");
      titleFi.className = "display project-title-fi";
      titleFi.dataset.lang = "fi";
      titleZh.insertAdjacentElement("afterend", titleFi);
    }
    titleFi.textContent = text(project.titleFi || project.titleEn);
    const eyebrow = header.querySelector(".eyebrow");
    if (eyebrow) {
      eyebrow.dataset.bilingualLabel = "Project / 项目";
      eyebrow.textContent = splitBilingual(eyebrow.dataset.bilingualLabel);
    }

    const details = [];
    if (project.year) details.push(["Year / 年份", escapeHtml(project.year), escapeHtml(project.year), escapeHtml(project.year)]);
    if (project.locationEn || project.locationZh) {
      details.push([
        "Location / 地点",
        escapeHtml(project.locationEn),
        escapeHtml(project.locationZh),
        escapeHtml(project.locationFi || project.locationEn),
      ]);
    }
    details.push([
      "Scope / 服务",
      escapeHtml(project.scopeEn),
      escapeHtml(project.scopeZh),
      escapeHtml(project.scopeFi || project.scopeEn),
    ]);

    const dl = header.querySelector("dl");
    if (dl) {
      dl.innerHTML = details
        .map(
          ([label, valueEn, valueZh, valueFi]) => `
            <dt data-bilingual-label="${escapeHtml(label)}">${escapeHtml(splitBilingual(label))}</dt>
            <dd><span data-lang="en">${valueEn}</span><span class="zh" data-lang="zh">${valueZh}</span><span data-lang="fi">${valueFi || valueEn}</span></dd>
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
      if (!narrative.querySelector('[data-lang="fi"]')) {
        const fiParagraph = document.createElement("p");
        fiParagraph.dataset.lang = "fi";
        narrative.append(fiParagraph);
      }
      const paragraphs = narrative.querySelectorAll("p");
      if (paragraphs[0]) {
        paragraphs[0].textContent = text(project.summaryEn);
        paragraphs[0].dataset.lang = "en";
      }
      if (paragraphs[1]) {
        paragraphs[1].textContent = text(project.summaryZh);
        paragraphs[1].dataset.lang = "zh";
      }
      if (paragraphs[2]) {
        paragraphs[2].textContent = text(project.summaryFi || project.summaryEn);
        paragraphs[2].dataset.lang = "fi";
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
      ensureLangElement(heroSection.querySelector(".intro.zh"), "fi", hero.introFi || HOME_FI.heroIntro, "intro");
      setText(".cityline", hero.cityline, heroSection);
      renderHeroSlides(projects);
    }

    const selectedSection = document.querySelector("section[aria-labelledby='selected-work']");
    if (selectedSection) {
      setText(".eyebrow", selectedWork.eyebrow, selectedSection);
      selectedSection.querySelector(".eyebrow")?.setAttribute("data-bilingual-label", selectedWork.eyebrow || "");
      setText("#selected-work", selectedWork.titleEn, selectedSection);
      selectedSection.querySelector("#selected-work")?.setAttribute("data-lang", "en");
      setText("#selected-work + .zh", selectedWork.titleZh, selectedSection);
      ensureLangElement(selectedSection.querySelector("#selected-work + .zh"), "fi", selectedWork.titleFi || HOME_FI.selectedTitle, "display section-title-fi");
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
      practiceSection.querySelector("#practice-title")?.setAttribute("data-lang", "en");
      setText("#practice-title + .zh", practice.titleZh, practiceSection);
      ensureLangElement(practiceSection.querySelector("#practice-title + .zh"), "fi", practice.titleFi || HOME_FI.practiceTitle, "display section-title-fi");
      const list = practiceSection.querySelector("ol");
      if (list && Array.isArray(practice.areas) && practice.areas.length) {
        list.innerHTML = practice.areas
          .map(
            (area) =>
              `<li><span>${escapeHtml(area.number)}</span><h3 data-lang="en">${escapeHtml(area.titleEn)}</h3><h3 data-lang="fi">${escapeHtml(area.titleFi || HOME_FI.practiceAreas[Number(area.number) - 1] || area.titleEn)}</h3><p class="zh" data-lang="zh">${escapeHtml(area.titleZh)}</p></li>`,
          )
          .join("");
      }
    }

    const approachSection = document.querySelector(".approach");
    if (approachSection) {
      setText(".eyebrow", approach.eyebrow, approachSection);
      approachSection.querySelector(".eyebrow")?.setAttribute("data-bilingual-label", approach.eyebrow || "");
      setText("h2", approach.titleEn, approachSection);
      approachSection.querySelector("h2")?.setAttribute("data-lang", "en");
      ensureLangElement(approachSection.querySelector("h2"), "fi", approach.titleFi || HOME_FI.approachTitle, "display section-title-fi");
      const paragraphs = approachSection.querySelectorAll(".approach-copy p");
      if (paragraphs[0] && approach.bodyEn != null) paragraphs[0].textContent = text(approach.bodyEn);
      if (paragraphs[1] && approach.bodyZh != null) paragraphs[1].textContent = text(approach.bodyZh);
      ensureLangElement(paragraphs[1] || paragraphs[0], "fi", approach.bodyFi || HOME_FI.approachBody, "");
    }
    refreshLanguage();
  } catch {
    // Keep the built-in static content if the editable content file is unavailable.
  }
})();
