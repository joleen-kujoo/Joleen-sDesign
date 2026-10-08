import { useEffect, useState } from "react";
import type { FeaturedSeries } from "@/content/featuredSeries";
import type { Project } from "@/content/data";
import { FeedImageSeriesGrid } from "@/components/sg/FeedImageSeriesGrid";
import { CulturalSeriesGrid } from "@/components/sg/CulturalSeriesGrid";
import { StoreSeriesGrid } from "@/components/sg/StoreSeriesGrid";
import { mediaSrc } from "@/lib/mediaSrc";

type FeaturedSeriesModalProps = {
  series: FeaturedSeries | null;
  onClose: () => void;
};

/** 详情与列表仅展示媒体，不显示标题/介绍文案 */
const MEDIA_ONLY_SERIES = new Set([
  "aigc",
  "feed-image",
  "feed-video",
  "store",
]);

function SeriesThumb({ work }: { work: Project }) {
  const [failed, setFailed] = useState(false);

  if (failed && work.videoUrl) {
    return (
      <video
        src={mediaSrc(work.videoUrl!)}
        muted
        playsInline
        preload="metadata"
        className="sg-series-modal__thumb-video"
      />
    );
  }

  return (
    <img
      src={work.cover}
      alt={work.title}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function FeaturedWorkDetail({
  work,
  onBack,
  mediaOnly,
}: {
  work: Project;
  onBack: () => void;
  mediaOnly: boolean;
}) {
  const hasVideo = Boolean(work.videoUrl);
  const poster = mediaSrc(work.media?.[0] ?? work.cover);

  return (
    <div
      className={`sg-featured-work${mediaOnly ? " sg-featured-work--media-only" : ""}`}
    >
      <div className="sg-featured-work__media">
        {hasVideo ? (
          <video
            key={work.videoUrl}
            src={mediaSrc(work.videoUrl!)}
            controls
            playsInline
            preload="auto"
            poster={poster}
            className="sg-featured-work__video"
          />
        ) : (
          <img
            src={poster}
            alt={work.title}
            className="sg-featured-work__poster"
          />
        )}
      </div>
      {mediaOnly ? (
        <button
          type="button"
          className="sg-featured-work__back sg-featured-work__back--floating"
          onClick={onBack}
        >
          ← 系列作品
        </button>
      ) : (
        <div className="sg-text-block sg-featured-work__copy">
          <button type="button" className="sg-featured-work__back" onClick={onBack}>
            ← 系列作品
          </button>
          <h3>{work.title}</h3>
          {work.cardLabel ? (
            <p className="sg-featured-work__label">{work.cardLabel}</p>
          ) : null}
          {work.intro ? (
            <p className="sg-featured-work__intro">{work.intro}</p>
          ) : null}
        </div>
      )}
    </div>
  );
}

export function FeaturedSeriesModal({ series, onClose }: FeaturedSeriesModalProps) {
  const [activeWork, setActiveWork] = useState<Project | null>(null);

  useEffect(() => {
    setActiveWork(null);
  }, [series]);

  useEffect(() => {
    if (!series) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (activeWork) setActiveWork(null);
      else onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [series, onClose, activeWork]);

  if (!series) return null;

  const mediaOnly = MEDIA_ONLY_SERIES.has(series.slug);

  const seriesSkin =
    series.slug === "feed-image"
      ? " sg-series-modal--feed-image"
      : series.slug === "feed-video"
        ? " sg-series-modal--feed-video"
        : series.slug === "cultural"
          ? " sg-series-modal--cultural"
          : "";
  const panelClass = activeWork
    ? `sg-lightbox__panel sg-series-modal sg-series-modal--detail${seriesSkin}`
    : `sg-lightbox__panel sg-series-modal${seriesSkin}`;

  const dismiss = () => {
    if (activeWork) setActiveWork(null);
    else onClose();
  };

  return (
    <div className="sg-lightbox" role="dialog" onClick={dismiss}>
      <div className={panelClass} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="sg-lightbox__close"
          onClick={dismiss}
          aria-label={activeWork ? "返回系列列表" : "Close"}
        >
          ×
        </button>

        <div className="sg-lightbox__scroll">
        {activeWork ? (
          <FeaturedWorkDetail
            work={activeWork}
            mediaOnly={mediaOnly}
            onBack={() => setActiveWork(null)}
          />
        ) : (
          <>
            <header className="sg-text-block sg-series-modal__head">
              <h2>{series.title}</h2>
            </header>
            {series.slug === "feed-image" ? (
              <FeedImageSeriesGrid onSelect={setActiveWork} />
            ) : series.slug === "cultural" ? (
              <CulturalSeriesGrid works={series.works} onSelect={setActiveWork} />
            ) : series.slug === "store" ? (
              <StoreSeriesGrid works={series.works} onSelect={setActiveWork} />
            ) : (
              <ul className="sg-series-modal__grid">
                {series.works.map((work) => (
                  <li key={work.slug}>
                    <button
                      type="button"
                      className="sg-series-modal__item"
                      onClick={() => setActiveWork(work)}
                    >
                      <span className="sg-series-modal__thumb">
                        <SeriesThumb work={work} />
                      </span>
                      {!mediaOnly ? (
                        <span className="sg-series-modal__caption">
                          {work.cardLabel ?? work.title}
                        </span>
                      ) : null}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
        </div>
      </div>
    </div>
  );
}
