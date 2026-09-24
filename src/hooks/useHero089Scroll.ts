import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type WarpLine = {
  chars: HTMLElement[];
  n: number;
};

function collectWarpLines(root: HTMLElement): WarpLine[] {
  return [...root.querySelectorAll<HTMLElement>(".sg-hero__warp-line")]
    .map((line) => {
      const chars = [...line.querySelectorAll<HTMLElement>("[data-char]")];
      return { chars, n: chars.length };
    })
    .filter((line) => line.n > 0);
}

/** 中间字母下垂最多，两端不动；略带动相邻字旋转，像链子被从中间拽一下 */
function applyLineWarp(line: WarpLine, amount: number) {
  const { chars, n } = line;
  const maxY = 38 * amount;

  chars.forEach((char, i) => {
    const t = n <= 1 ? 0.5 : i / (n - 1);
    const bow = Math.sin(t * Math.PI);
    const y = bow * maxY;

    gsap.set(char, { y, rotation: 0, force3D: true });
  });
}

/**
 * Hero 滚动弯曲：不 pin，随首屏滚出视口时两行大字被「从中间」轻微拽弯。
 * （之前整屏 pin + scaleX/Y + 图片一起动，容易显得卡、怪。）
 */
export function useHero089Scroll(heroRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const lines = collectWarpLines(hero);
    const chars = hero.querySelectorAll<HTMLElement>("[data-char]");
    const visual = hero.querySelector<HTMLElement>(".sg-hero__visual");
    if (!lines.length) return;

    const ctx = gsap.context(() => {
      gsap.set(chars, { y: 0, rotation: 0 });

      gsap.from(chars, {
        autoAlpha: 0,
        y: 10,
        duration: 0.7,
        stagger: { each: 0.025, from: "center" },
        ease: "power2.out",
        delay: 0.05,
      });

      if (visual) {
        gsap.from(visual, {
          autoAlpha: 0,
          scale: 0.96,
          duration: 0.85,
          ease: "power2.out",
          delay: 0.12,
        });
      }

      ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 0.35,
        invalidateOnRefresh: true,
        onUpdate(self) {
          const amount = gsap.utils.clamp(0, 1, self.progress);
          lines.forEach((line) => applyLineWarp(line, amount));
        },
      });

      lines.forEach((line) => applyLineWarp(line, 0));
    }, hero);

    const refresh = () => ScrollTrigger.refresh();
    refresh();
    const img = hero.querySelector<HTMLImageElement>(".sg-hero__visual img");
    img?.addEventListener("load", refresh);
    window.addEventListener("load", refresh);

    return () => {
      img?.removeEventListener("load", refresh);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);
}
