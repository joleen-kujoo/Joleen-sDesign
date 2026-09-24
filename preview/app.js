(function () {
  const P = () => window.PORTFOLIO || {};
  const fmtMoney = (v) => {
    if (v === "" || v == null) return "—";
    const n = parseFloat(v);
    if (Number.isNaN(n)) return String(v);
    return n >= 1000 ? `$${(n / 1000).toFixed(1)}K` : `$${n.toFixed(0)}`;
  };

  /** MWGS 068 / travel demo — bar colors & label colors */
  const LENS_THEMES = [
    { bar: "#7cb342", fg: "#ffffff", sub: "rgba(255,255,255,0.92)" },
    { bar: "#22c55e", fg: "#ffffff", sub: "rgba(255,255,255,0.88)" },
    { bar: "#ea580c", fg: "#fdba74", sub: "#fdba74" },
    { bar: "#38bdf8", fg: "#ffffff", sub: "rgba(255,255,255,0.9)" },
    { bar: "#eab308", fg: "#ffffff", sub: "rgba(255,255,255,0.9)" },
  ];

  const FAN_LABELS = [
    { cn: "信息流视频", en: "Feed Video", tag: "Video" },
    { cn: "静态组图", en: "Static KV", tag: "Image" },
    { cn: "商店页", en: "Store Page", tag: "Store" },
    { cn: "区域创意", en: "Multi-market", tag: "Region" },
    { cn: "精选素材", en: "Featured", tag: "Pick" },
  ];

  const SIDE_LINKS = [
    { cn: "静态 & KV", en: "Images", filter: "images" },
    { cn: "商店页", en: "Store", filter: "store" },
    { cn: "信息流视频", en: "Video", filter: "video" },
  ];

  const CAT_CARDS = [
    { cn: "静态素材", en: "Images", filter: "images" },
    { cn: "商店页", en: "Store", filter: "store" },
    { cn: "信息流视频", en: "Video", filter: "video" },
  ];

  function mediaEl(item, opts = {}) {
    const { autoplay = false, controls = false } = opts;
    const url = item.mediaUrl || item.preview;
    const wrap = document.createElement("div");
    wrap.style.width = "100%";
    wrap.style.height = "100%";
    if (!url) {
      wrap.className = "media-fallback mono";
      wrap.textContent = item.displayTitle || "Preview";
      return wrap;
    }
    if (item.mediaType === "video" || url.endsWith(".mp4")) {
      const v = document.createElement("video");
      v.src = url;
      v.muted = true;
      v.playsInline = true;
      v.loop = autoplay;
      v.autoplay = autoplay;
      v.controls = controls;
      v.preload = autoplay ? "auto" : "metadata";
      wrap.appendChild(v);
      return wrap;
    }
    const img = document.createElement("img");
    img.src = url;
    img.alt = item.displayTitle || "";
    img.loading = "lazy";
    wrap.appendChild(img);
    return wrap;
  }

  function openModal(item, { minimal = false } = {}) {
    const modal = document.getElementById("work-modal");
    if (!modal) return;
    document.getElementById("modal-media").innerHTML = "";
    document
      .getElementById("modal-media")
      .appendChild(
        mediaEl(item, {
          autoplay: true,
          controls:
            item.mediaType === "video" ||
            (item.mediaUrl || item.preview || "").endsWith(".mp4"),
        }),
      );
    document.getElementById("modal-title").textContent =
      item.displayTitle || item.topic || item.creativeName;
    const meta = document.getElementById("modal-meta");
    const fields = document.getElementById("modal-fields");
    const isMinimal =
      minimal || document.body.classList.contains("page-home");
    if (isMinimal) {
      if (meta)
        meta.textContent = [
          item.marketZone,
          item.mediaType === "video"
            ? "Video"
            : item.isStore
              ? "Store"
              : "Image",
        ]
          .filter(Boolean)
          .join(" · ");
      if (fields) fields.classList.add("is-hidden");
      modal.classList.add("modal-preview");
    } else {
      if (meta) meta.textContent = "";
      if (fields) fields.classList.remove("is-hidden");
      modal.classList.remove("modal-preview");
      const rows = [
        ["消耗 Spend", fmtMoney(item.spend)],
        ["成本 Cost", fmtMoney(item.cost)],
        ["7 日 ROI", item.roi7 || "—"],
        ["区域", item.marketZone || item.region || "—"],
        ["渠道", item.channelPrimary || "—"],
        ["来源", item.source || "—"],
        [
          "类型",
          item.isStore ? "商店页" : item.mediaType === "video" ? "视频" : "图片",
        ],
        ["期次", item.period || "—"],
      ];
      fields.innerHTML = rows
        .map(([k, v]) => `<div>${k}<b>${escapeHtml(String(v))}</b></div>`)
        .join("");
    }
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  }

  function closeModal() {
    const modal = document.getElementById("work-modal");
    if (!modal) return;
    modal.classList.remove("open");
    document.getElementById("modal-media").innerHTML = "";
    document.body.style.overflow = "";
  }

  function bindModal() {
    const modal = document.getElementById("work-modal");
    if (!modal) return;
    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target.closest("[data-close-modal]")) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  function rankedPool() {
    const data = P();
    const pool = [];
    const seen = new Set();
    const add = (item) => {
      const k = item.creativeName || item.displayTitle;
      if (!k || seen.has(k)) return;
      seen.add(k);
      pool.push(item);
    };
    (data.videos || []).forEach(add);
    (data.images || []).forEach(add);
    pool.sort((a, b) => parseFloat(b.spend || 0) - parseFloat(a.spend || 0));
    return pool;
  }

  function workTile(item) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "work-tile";
    const media = document.createElement("div");
    media.className = "tile-media";
    media.appendChild(mediaEl(item, { autoplay: false }));
    const cap = document.createElement("div");
    cap.className = "tile-cap";
    cap.innerHTML = `<span class="display">${escapeHtml(item.displayTitle || "")}</span><span class="mono">${escapeHtml(item.marketZone || "")}</span>`;
    btn.append(media, cap);
    btn.addEventListener("click", () => openModal(item, { minimal: false }));
    return btn;
  }

  function stack056CopyCard(item) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "stack-056-card stack-056-card--copy";
    const title = escapeHtml(item.displayTitle || item.topic || "Work");
    const meta = [item.marketZone, fmtMoney(item.spend)]
      .filter(Boolean)
      .join(" · ");
    btn.innerHTML = `<span class="display">${title}</span><p class="mono">${escapeHtml(meta)}</p>`;
    btn.addEventListener("click", () => openModal(item, { minimal: false }));
    return btn;
  }

  function stack056MediaCard(item) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "stack-056-card stack-056-card--media";
    const media = document.createElement("div");
    media.className = "stack-056-media";
    media.appendChild(mediaEl(item, { autoplay: true }));
    btn.appendChild(media);
    btn.addEventListener("click", () => openModal(item, { minimal: false }));
    return btn;
  }

  function mountStack056Each(container, items) {
    if (!container) return;
    container.innerHTML = "";
    if (!items.length) {
      container.innerHTML =
        '<p class="wrap mono muted stack-056-empty">暂无素材</p>';
      return;
    }
    items.forEach((item) => {
      const scroll = document.createElement("div");
      scroll.className = "stack-056-scroll";
      const pin = document.createElement("div");
      pin.className = "stack-056-pin";
      const stage = document.createElement("div");
      stage.className = "stack-056-stage";
      stage.appendChild(stack056CopyCard(item));
      stage.appendChild(stack056MediaCard(item));
      pin.appendChild(stage);
      scroll.appendChild(pin);
      container.appendChild(scroll);
    });
  }

  function featuredTile(item, labels) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "hgy-featured-card";
    btn.appendChild(mediaEl(item, { autoplay: false }));
    const overlay = document.createElement("div");
    overlay.className = "hgy-featured-cap";
    overlay.innerHTML = `<span class="display">${escapeHtml(labels.cn)}</span><span class="mono">${escapeHtml(labels.en)}</span>`;
    btn.appendChild(overlay);
    btn.addEventListener("click", () => openModal(item, { minimal: true }));
    return btn;
  }

  function lensPick(pool) {
    const order = ["台湾", "中东", "土耳其", "南亚"];
    const picked = [];
    const used = new Set();
    order.forEach((zone) => {
      const item = pool.find((p) => p.marketZone === zone);
      if (item) {
        const k = item.creativeName || item.displayTitle;
        if (k && !used.has(k)) {
          used.add(k);
          picked.push(item);
        }
      }
    });
    pool.forEach((item) => {
      if (picked.length >= 5) return;
      const k = item.creativeName || item.displayTitle;
      if (!k || used.has(k)) return;
      used.add(k);
      picked.push(item);
    });
    return picked.slice(0, 5);
  }

  function initHeader() {
    const header = document.getElementById("site-header");
    if (!header || header.classList.contains("is-solid")) return;
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 16);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initHome() {
    bindModal();
    const pool = rankedPool();
    if (!pool.length) return;

    const deck = document.getElementById("home-spotify-track");
    if (deck) {
      deck.innerHTML = "";
      rankedPool()
        .slice(0, 14)
        .forEach((item, t) => {
          const card = document.createElement("button");
          card.type = "button";
          card.className = "spotify-card";
          card.appendChild(mediaEl(item, { autoplay: false }));
          const cap = document.createElement("div");
          cap.className = "spotify-card-cap";
          const title = (item.displayTitle || "Work")
            .slice(0, 22)
            .toUpperCase();
          cap.innerHTML = `<span class="display spotify-title">${escapeHtml(title)}</span>`;
          card.appendChild(cap);
          card.addEventListener("click", () =>
            openModal(item, { minimal: true }),
          );
          deck.appendChild(card);
        });
    }

    const grid = document.getElementById("home-017-grid");
    if (grid) {
      grid.innerHTML = "";
      (P().videos || []).slice(0, 12).forEach((item) => {
        const cell = document.createElement("button");
        cell.type = "button";
        cell.className = "grid-017-cell";
        cell.appendChild(mediaEl(item, { autoplay: false }));
        cell.addEventListener("click", () => openModal(item, { minimal: true }));
        grid.appendChild(cell);
      });
    }

    const wall = document.getElementById("hgy-video-wall");
    if (wall) {
      wall.innerHTML = "";
    }

    const side = document.getElementById("hgy-side-links");
    if (side) {
      side.innerHTML = "";
      SIDE_LINKS.forEach((link, t) => {
        const item = pool[t + 2] || pool[t] || pool[0];
        const a = document.createElement("a");
        a.className = "hgy-side-card";
        a.href = `works.html?filter=${link.filter}`;
        a.appendChild(mediaEl(item, { autoplay: false }));
        const cap = document.createElement("div");
        cap.className = "hgy-side-cap";
        cap.innerHTML = `<span class="display">${escapeHtml(link.cn)}</span><span class="mono">${escapeHtml(link.en)}</span>`;
        a.appendChild(cap);
        side.appendChild(a);
      });
    }

    const featured = document.getElementById("hgy-featured");
    if (featured) {
      featured.innerHTML = "";
      featuredCategories().forEach(({ item, label }) => {
        featured.appendChild(featuredTile(item, label));
      });
      const more = document.createElement("a");
      more.className = "hgy-featured-more display";
      more.href = "works.html";
      more.textContent = "···";
      featured.appendChild(more);
    }
  }

  function worksItemsForFilter(filter) {
    const data = P();
    const images = data.images || [];
    const videos = data.videos || [];
    if (filter === "images")
      return images.filter((i) => !i.isStore).slice(0, 48);
    if (filter === "store") return images.filter((i) => i.isStore).slice(0, 36);
    if (filter === "video") return videos.slice(0, 48);
    return rankedPool().slice(0, 56);
  }

  function featuredCategories() {
    const data = P();
    const videos = data.videos || [];
    const images = (data.images || []).filter((i) => !i.isStore);
    const store = (data.images || []).filter((i) => i.isStore);
    const pool = rankedPool();
    return [
      {
        item: videos[0] || pool.find((p) => p.mediaType === "video") || pool[0],
        label: { cn: "视频创意", en: "Video" },
        href: "works.html?filter=video",
      },
      {
        item:
          images[0] ||
          pool.find((p) => p.mediaType === "image" && !p.isStore) ||
          pool[1],
        label: { cn: "静态视觉", en: "Static" },
        href: "works.html?filter=images",
      },
      {
        item: store[0] || images[1] || pool[2],
        label: { cn: "产品设计", en: "Product" },
        href: "works.html?filter=store",
      },
    ].filter((row) => row.item);
  }

  function renderListStack(listEl, items) {
    if (!listEl) return;
    listEl.innerHTML = "";
    items.forEach((item, i) => {
      const li = document.createElement("li");
      li.textContent = (item.displayTitle || item.topic || `Work ${i + 1}`).slice(
        0,
        42,
      );
      li.addEventListener("click", () => openModal(item, { minimal: false }));
      listEl.appendChild(li);
    });
  }

  function renderHome040(items) {
    window.HOME_040_ITEMS = items;
    renderListStack(document.getElementById("home-040-list"), items);
  }

  function worksRowTitle(item) {
    return (item.displayTitle || item.topic || item.creativeName || "Work").slice(
      0,
      40,
    );
  }

  function setWorks038Preview(item, activeLi) {
    window.WORKS_038_ACTIVE = item;
    const list = document.getElementById("works-038-list");
    if (list) {
      list.querySelectorAll("li").forEach((li) => {
        li.classList.toggle("is-active", li === activeLi);
      });
    }
    const preview = document.getElementById("works-038-preview");
    if (!preview || !item) return;

    preview.innerHTML = "";
    const hit = document.createElement("button");
    hit.type = "button";
    hit.className = "works-preview-hit";
    hit.appendChild(
      mediaEl(item, {
        autoplay: item.mediaType === "video",
        controls: false,
      }),
    );
    hit.addEventListener("click", () => openModal(item, { minimal: false }));
    preview.appendChild(hit);
  }

  function renderWorks038(items) {
    window.WORKS_038_ITEMS = items;
    const list = document.getElementById("works-038-list");
    const preview = document.getElementById("works-038-preview");
    if (!list) return;
    list.innerHTML = "";
    if (!items.length) {
      if (preview) preview.innerHTML = "";
      window.WORKS_038_ACTIVE = null;
      return;
    }
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = worksRowTitle(item);
      li.addEventListener("mouseenter", () => setWorks038Preview(item, li));
      li.addEventListener("focus", () => setWorks038Preview(item, li));
      li.addEventListener("click", () => openModal(item, { minimal: false }));
      li.tabIndex = 0;
      list.appendChild(li);
    });
    setWorks038Preview(items[0], list.querySelector("li"));
  }

  function initWorks() {
    bindModal();
    const params = new URLSearchParams(window.location.search);
    const initial = params.get("filter") || "all";

    const filters = document.querySelectorAll("#works-filters button");
    if (filters.length) {
      filters.forEach((btn) => {
        btn.addEventListener("click", () => setWorksFilter(btn.dataset.filter));
      });
    }

    setWorksFilter(initial);
  }

  function setWorksFilter(f) {
    const map = {
      all: "all",
      images: "images",
      store: "store",
      video: "video",
    };
    const key = map[f] || "all";
    document.querySelectorAll("#works-filters button").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.filter === key);
    });
    renderWorks038(worksItemsForFilter(key));
  }

  function initResume() {
    const d = window.RESUME;
    if (!d) return;
    const set = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };
    set("resume-name", d.name);
    set("resume-role", d.role);
    set("resume-headline", d.headline);
    set("resume-subhead", d.subhead);
    const photo = document.getElementById("resume-photo");
    if (photo) {
      photo.src = "media/profile.jpg";
      photo.onerror = () => {
        photo.onerror = null;
        photo.src = "media/profile-placeholder.svg";
      };
    }
    const intro = document.getElementById("resume-intro");
    if (intro) intro.innerHTML = d.intro.map((p) => `<p>${p}</p>`).join("");
    const roles = document.getElementById("resume-roles");
    if (roles)
      roles.innerHTML = d.roles
        .map((r) => `<span class="tag mono">${r}</span>`)
        .join("");
    const stats = document.getElementById("resume-stats");
    if (stats)
      stats.innerHTML = d.stats
        .map(
          (s) =>
            `<div class="stat-card"><b class="display">${s.value}</b><span class="mono">${s.label}</span></div>`,
        )
        .join("");
    const services = document.getElementById("resume-services");
    if (services)
      services.innerHTML = d.services
        .map(
          (s, i) =>
            `<article class="service-card"><span class="mono">0${i + 1}</span><h3 class="display">${s.title}</h3><p>${s.desc}</p></article>`,
        )
        .join("");
    const edu = document.getElementById("resume-edu");
    if (edu)
      edu.innerHTML = d.education
        .map(
          (e) =>
            `<div class="timeline-item"><h3 class="display">${e.school}</h3><p class="meta mono">${e.major} · ${e.period}</p></div>`,
        )
        .join("");
    const exp = document.getElementById("resume-exp");
    if (exp)
      exp.innerHTML = d.experience
        .map(
          (e) =>
            `<div class="timeline-item"><h3 class="display">${e.title}</h3><p class="meta mono">${e.company} · ${e.period}</p><ul>${e.bullets.map((b) => `<li>${b}</li>`).join("")}</ul></div>`,
        )
        .join("");
    const skills = document.getElementById("resume-skills");
    if (skills)
      skills.innerHTML = d.skills.map((s) => `<span>${s}</span>`).join("");
    const email = document.getElementById("resume-email");
    if (email) {
      email.href = `mailto:${d.email}`;
      email.textContent = d.email;
    }
    set("resume-contact-blurb", d.contactBlurb);
  }

  window.JoleenSite = {
    initHome,
    initWorks,
    initResume,
    initHeader,
    openModal,
    closeModal,
    mediaEl,
  };
  bindModal();
})();
