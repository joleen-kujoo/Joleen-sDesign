(function () {
  function bindPointerScrub(stage, onProgress) {
    let progress = 0;
    let target = 0;
    let hovering = false;

    const setTargetFromX = (clientX) => {
      const rect = stage.getBoundingClientRect();
      target = gsap.utils.clamp(0, 1, (clientX - rect.left) / rect.width);
    };

    stage.addEventListener("mouseenter", () => {
      hovering = true;
    });
    stage.addEventListener("mouseleave", () => {
      hovering = false;
    });
    stage.addEventListener("mousemove", (e) => {
      if (!hovering) return;
      setTargetFromX(e.clientX);
    });
    stage.addEventListener(
      "touchmove",
      (e) => {
        if (e.touches[0]) setTargetFromX(e.touches[0].clientX);
      },
      { passive: true },
    );
    stage.addEventListener(
      "wheel",
      (e) => {
        if (stage.matches(":hover")) e.preventDefault();
      },
      { passive: false },
    );

    gsap.ticker.add(() => {
      progress += (target - progress) * (hovering ? 0.14 : 0.07);
      if (Math.abs(target - progress) < 0.0005) progress = target;
      onProgress(progress);
    });

    onProgress(0);
  }

  /** Home · MWGS 001 — overlapping cards; hover + horizontal mouse move scrubs */
  function bindMouseMoveScrub(stage, onProgress) {
    let progress = 0;
    let hovering = false;
    const step = 0.0032;

    stage.addEventListener("mouseenter", () => {
      hovering = true;
    });
    stage.addEventListener("mouseleave", () => {
      hovering = false;
    });
    stage.addEventListener("mousemove", (e) => {
      if (!hovering || !e.movementX) return;
      progress = gsap.utils.clamp(0, 1, progress + e.movementX * step);
      onProgress(progress);
    });
    stage.addEventListener(
      "wheel",
      (e) => {
        if (hovering) e.preventDefault();
      },
      { passive: false },
    );

    onProgress(0);
  }

  function initHomeSpotify001() {
    if (!window.gsap) return;
    const stage = document.getElementById("home-spotify-stage");
    const track = document.getElementById("home-spotify-track");
    if (!stage || !track) return;

    const cards = gsap.utils.toArray(".spotify-card", track);
    if (!cards.length) return;

    const maxShift = () =>
      Math.max(track.scrollWidth - stage.clientWidth + 120, 0);

    const apply = (progress) => {
      gsap.set(track, { x: -maxShift() * progress });
      cards.forEach((card, i) => {
        const t = i / Math.max(cards.length - 1, 1) - progress;
        const c = gsap.utils.clamp(-1, 1, t * 2.2);
        gsap.set(card, {
          rotate: -8 + c * 6,
          y: Math.abs(c) * 12,
          scale: 1 - Math.abs(c) * 0.06,
        });
      });
    };

    bindMouseMoveScrub(stage, apply);
  }

  /** MWGS 040 — list + cascade stack, loop */
  function initListStackLoop(listId, stackId, items) {
    if (!window.gsap) return;
    if (listStackTween) listStackTween.kill();

    const list = document.getElementById(listId);
    const stack = document.getElementById(stackId);
    if (!list || !stack || !items.length) return;

    const lis = gsap.utils.toArray("li", list);
    let index = 0;

    const renderStack = (start) => {
      stack.innerHTML = "";
      const slice = [];
      for (let k = 0; k < 6; k++) {
        slice.push(items[(start + k) % items.length]);
      }
      slice.forEach((item, i) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "works-040-thumb";
        btn.style.setProperty("--i", String(i));
        btn.appendChild(
          window.JoleenSite.mediaEl(item, { autoplay: i === 0 }),
        );
        btn.addEventListener("click", () =>
          window.JoleenSite.openModal(item, { minimal: false }),
        );
        stack.appendChild(btn);
      });
      const top = stack.querySelector(".works-040-thumb");
      if (top) {
        gsap.fromTo(
          top,
          { scale: 1 },
          {
            scale: 1.06,
            duration: 0.35,
            yoyo: true,
            repeat: 1,
            ease: "sine.out",
          },
        );
      }
    };

    const setActive = (i) => {
      lis.forEach((li, idx) => {
        li.classList.toggle("is-active", idx === i);
      });
      renderStack(i);
      const active = lis[i];
      if (active && list) {
        const lh = active.offsetHeight + 6;
        const center = list.clientHeight / 2 - lh / 2;
        gsap.to(list, {
          y: center - i * lh,
          duration: 0.65,
          ease: "power2.out",
        });
      }
    };

    setActive(0);

    listStackTween = gsap.timeline({ repeat: -1, repeatDelay: 0.45 });
    for (let n = 0; n < items.length; n++) {
      listStackTween.to({}, {
        duration: 2.6,
        onComplete: () => {
          index = (index + 1) % items.length;
          setActive(index);
        },
      });
    }
  }

  function initHome017() {
    if (!window.gsap) return;
    const frame = document.getElementById("home-017-frame");
    const glow = document.getElementById("home-017-glow");
    if (!frame) return;
    if (glow) {
      frame.addEventListener("mousemove", (e) => {
        const r = frame.getBoundingClientRect();
        glow.style.left = `${e.clientX - r.left}px`;
        glow.style.top = `${e.clientY - r.top}px`;
        glow.style.opacity = "1";
      });
      frame.addEventListener("mouseleave", () => {
        glow.style.opacity = "0.4";
      });
    }
  }

  function initWorks038() {
    const wrap = document.getElementById("works-038-list-wrap");
    if (!wrap) return;
    wrap.addEventListener(
      "wheel",
      (e) => {
        if (!wrap.matches(":hover")) return;
        wrap.scrollTop += e.deltaY;
        e.preventDefault();
      },
      { passive: false },
    );
  }

  window.initHomeSpotify001 = initHomeSpotify001;
  window.initHome017 = initHome017;
  window.initWorks038 = initWorks038;
})();
