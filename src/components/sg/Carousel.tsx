import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  FEATURED_LEADING_SLUG,
  type FeaturedSeries,
} from "@/content/featuredSeries";

const GAP = 24;
const DRAG_CLICK = 8;
const COPIES = 3;

type CarouselProps = {
  series: FeaturedSeries[];
  onOpen: (s: FeaturedSeries) => void;
  revealActive?: boolean;
};

type TrackSlide = {
  key: string;
  index: number;
  item: FeaturedSeries;
};

function leadingIndex(series: FeaturedSeries[]) {
  const i = series.findIndex((s) => s.slug === FEATURED_LEADING_SLUG);
  return i >= 0 ? i : 0;
}

function defaultFocusK(series: FeaturedSeries[]) {
  const n = series.length;
  return n ? n + leadingIndex(series) : 0;
}

export function Carousel({ series, onOpen, revealActive = false }: CarouselProps) {
  const n = series.length;
  const defaultStep = 420 + GAP;
  const seriesKey = useMemo(
    () => series.map((s) => s.slug).join("\0"),
    [series],
  );
  const focusKRef = useRef(defaultFocusK(series));
  const [offset, setOffset] = useState(() => defaultFocusK(series) * defaultStep);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [jumping, setJumping] = useState(false);
  const [slideWidth, setSlideWidth] = useState(420);
  const [centerPadding, setCenterPadding] = useState(0);
  const [inView, setInView] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const startOffset = useRef(0);
  const moved = useRef(0);
  const draggingRef = useRef(false);
  const step = slideWidth + GAP;

  const slides = useMemo((): TrackSlide[] => {
    if (!n) return [];
    return Array.from({ length: n * COPIES }, (_, i) => ({
      key: `slide-${i}`,
      index: i,
      item: series[i % n],
    }));
  }, [series, n]);

  useEffect(() => {
    focusKRef.current = defaultFocusK(series);
  }, [seriesKey, series]);

  useEffect(() => {
    if (!n || !step || draggingRef.current) return;
    setJumping(true);
    setOffset(focusKRef.current * step);
    requestAnimationFrame(() => setJumping(false));
  }, [n, step, seriesKey]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const updateLayout = () => {
      const vw = el.clientWidth;
      const w = Math.min(480, Math.max(280, vw * 0.78));
      setSlideWidth(w);
      setCenterPadding(vw / 2 - w / 2);
    };

    const ro = new ResizeObserver(updateLayout);
    ro.observe(el);
    updateLayout();

    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.05, rootMargin: "0px 0px 8% 0px" },
    );
    io.observe(el);

    window.addEventListener("resize", updateLayout);
    return () => {
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("resize", updateLayout);
    };
  }, []);

  const showLive = inView || revealActive;

  const snap = useCallback(
    (raw: number) => Math.round(raw / step) * step,
    [step],
  );

  const normalizeK = useCallback(
    (k: number) => {
      if (k < n) return k + n;
      if (k >= 2 * n) return k - n;
      return k;
    },
    [n],
  );

  const onHitPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    setDragging(true);
    moved.current = 0;
    startX.current = e.clientX;
    startOffset.current = offset;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onHitPointerMove = (e: React.PointerEvent) => {
    const dx = startX.current - e.clientX;
    moved.current = Math.max(moved.current, Math.abs(dx));
    if (!draggingRef.current) return;
    setDragX(dx);
  };

  const endHitDrag = (e: React.PointerEvent, item: FeaturedSeries) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setDragging(false);
    const dx = startX.current - e.clientX;
    if (moved.current <= DRAG_CLICK) {
      onOpen(item);
      setDragX(0);
    } else {
      const snapped = snap(startOffset.current + dx);
      const k = normalizeK(Math.round(snapped / step));
      focusKRef.current = k;
      setJumping(true);
      setOffset(k * step);
      setDragX(0);
      requestAnimationFrame(() => setJumping(false));
    }
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const translateX = centerPadding - offset - dragX;

  if (!n) return null;

  return (
    <div className="sg-carousel-wrap" ref={wrapRef}>
      <div className={`sg-carousel${showLive ? " is-inview" : ""}`}>
        <div
          className={`sg-carousel__track${dragging ? " is-dragging" : ""}${jumping ? " is-jumping" : ""}`}
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {slides.map((slide) => {
            const slidePos = slide.index * step;
            const dist = slidePos - offset - dragX;
            const focus = Math.cos((dist * Math.PI) / 600);
            const opacity = showLive
              ? Math.max(0.45, focus)
              : 0.4;
            const translateY = Math.cos((dist * Math.PI) / 1000) * -3 + 3;
            const imgScale = showLive ? 0.9 + Math.max(0, focus) * 0.1 : 0.88;

            return (
              <div
                key={slide.key}
                className="sg-carousel__slide"
                style={{
                  width: slideWidth,
                  transform: `translateY(${translateY}rem)`,
                  opacity,
                }}
              >
                <button
                  type="button"
                  className="sg-carousel__hit"
                  data-series={slide.item.slug}
                  onPointerDown={onHitPointerDown}
                  onPointerMove={onHitPointerMove}
                  onPointerUp={(e) => endHitDrag(e, slide.item)}
                  onPointerCancel={(e) => endHitDrag(e, slide.item)}
                >
                  <div className="sg-carousel__media">
                    <img
                      src={slide.item.cover}
                      alt=""
                      draggable={false}
                      style={
                        {
                          "--img-scale": imgScale,
                          "--img-lift": showLive ? "0%" : "0%",
                        } as CSSProperties
                      }
                    />
                  </div>
                  <span className="sg-carousel__pill">{slide.item.title}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
