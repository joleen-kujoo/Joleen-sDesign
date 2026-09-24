import { useLayoutEffect, type RefObject } from "react";

const CARD_DEPTH = [0.5, 0.72, 0.92, 1.12];

type HeroStackMotionOptions = {
  /** 为 false 时仅保留悬停视差，不可拖拽 */
  drag?: boolean;
};

export function useHeroStackMotion(
  containerRef: RefObject<HTMLDivElement | null>,
  cardRefs: RefObject<(HTMLElement | null)[]>,
  options?: HeroStackMotionOptions,
) {
  const dragEnabled = options?.drag !== false;
  useLayoutEffect(() => {
    const container = containerRef.current;
    const cards = cardRefs.current;
    if (!container || !cards?.length) return;

    const target = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };
    const dragOffset = cards.map(() => ({ x: 0, y: 0 }));
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let raf = 0;
    let active = false;

    const apply = () => {
      cards.forEach((card, i) => {
        if (!card) return;
        const depth = CARD_DEPTH[i] ?? 1;
        const px = smooth.x * 38 * depth + dragOffset[i].x;
        const py = smooth.y * 32 * depth + dragOffset[i].y;
        const rot = smooth.x * 14 * depth + dragOffset[i].x * 0.04;
        card.style.setProperty("--px", px.toFixed(2));
        card.style.setProperty("--py", py.toFixed(2));
        card.style.setProperty("--prot", rot.toFixed(2));
      });
    };

    const tick = () => {
      const ease = active ? 0.14 : 0.09;
      smooth.x += (target.x - smooth.x) * ease;
      smooth.y += (target.y - smooth.y) * ease;
      if (!active && !dragging) {
        smooth.x += (0 - smooth.x) * 0.06;
        smooth.y += (0 - smooth.y) * 0.06;
      }
      apply();
      raf = requestAnimationFrame(tick);
    };

    const setTargetFromEvent = (clientX: number, clientY: number) => {
      const r = container.getBoundingClientRect();
      target.x = ((clientX - r.left) / r.width - 0.5) * 2;
      target.y = ((clientY - r.top) / r.height - 0.5) * 2;
    };

    const onPointerEnter = () => {
      active = true;
    };

    const onPointerLeave = () => {
      active = false;
      dragging = false;
      target.x = 0;
      target.y = 0;
    };

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      container.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      setTargetFromEvent(e.clientX, e.clientY);
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      cards.forEach((_, i) => {
        const w = 0.45 + i * 0.22;
        dragOffset[i].x += dx * w;
        dragOffset[i].y += dy * w * 0.85;
        dragOffset[i].x = Math.max(-56, Math.min(56, dragOffset[i].x));
        dragOffset[i].y = Math.max(-48, Math.min(48, dragOffset[i].y));
      });
    };

    const onPointerUp = (e: PointerEvent) => {
      dragging = false;
      try {
        container.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    };

    raf = requestAnimationFrame(tick);
    container.addEventListener("pointerenter", onPointerEnter);
    container.addEventListener("pointerleave", onPointerLeave);
    container.addEventListener("pointermove", onPointerMove);
    if (dragEnabled) {
      container.addEventListener("pointerdown", onPointerDown);
      container.addEventListener("pointerup", onPointerUp);
      container.addEventListener("pointercancel", onPointerUp);
    }

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("pointerenter", onPointerEnter);
      container.removeEventListener("pointerleave", onPointerLeave);
      container.removeEventListener("pointermove", onPointerMove);
      if (dragEnabled) {
        container.removeEventListener("pointerdown", onPointerDown);
        container.removeEventListener("pointerup", onPointerUp);
        container.removeEventListener("pointercancel", onPointerUp);
      }
    };
  }, [containerRef, cardRefs, dragEnabled]);
}
