import { useEffect, useState, type RefObject } from "react";

export function useFooterProgress(phantomRef: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const phantom = phantomRef.current;
      if (!phantom) return;

      const vh = window.innerHeight;
      const top = phantom.getBoundingClientRect().top;
      // 0 = 还没滚到 Contact 区；1 = Contact 全屏展开
      const p = 1 - Math.min(Math.max(top / vh, 0), 1);
      setProgress(p);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [phantomRef]);

  const scale = 0.06 + progress * 0.94;
  const linksOpacity = progress > 0.62 ? 1 : 0;

  return { progress, scale, linksOpacity };
}
