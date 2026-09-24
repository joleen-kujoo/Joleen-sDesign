import { useEffect } from "react";
import type { Project } from "@/content/data";
import { formatMoney } from "@/lib/format";

type WorkModalProps = {
  project: Project | null;
  variant: "preview" | "detail";
  onClose: () => void;
  /** More Work 竖屏 9:16 */
  mediaAspect?: "9:16";
};

export function WorkModal({
  project,
  variant,
  onClose,
  mediaAspect,
}: WorkModalProps) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  const videoOnly = mediaAspect === "9:16";
  const isDetail =
    !videoOnly && variant === "detail" && Boolean(project.metrics);
  const videoSrc = project.videoUrl ?? project.media[0];
  const showVideo =
    Boolean(project.videoUrl) || /\.mp4(\?|$)/i.test(videoSrc);

  const rows: [string, string][] = isDetail
    ? [
        ["消耗 Spend", formatMoney(project.metrics!.spend)],
        ["成本 Cost", formatMoney(project.metrics!.cost)],
        ["7 日 ROI", project.metrics!.roi7 || "—"],
        ["区域", project.metrics!.marketZone || "—"],
        ["渠道", project.metrics!.channelPrimary || "—"],
        ["来源", project.metrics!.source || "—"],
        ["类型", "视频"],
        ["期次", project.metrics!.period || "—"],
      ]
    : [];

  return (
    <div className="sg-lightbox" role="dialog" onClick={onClose}>
      <div
        className={`sg-lightbox__panel${isDetail ? " sg-lightbox__panel--detail" : ""}${videoOnly ? " sg-lightbox__panel--video-only sg-lightbox__panel--video-916" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="sg-lightbox__close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className="sg-lightbox__scroll">
        {videoOnly ? (
          <div className="sg-lightbox__media sg-lightbox__media--solo">
            {showVideo ? (
              <video
                key={videoSrc}
                src={videoSrc}
                controls
                autoPlay
                playsInline
                className="sg-lightbox__video"
              />
            ) : (
              <img src={videoSrc} alt="" />
            )}
          </div>
        ) : (
          <div className="sg-lightbox__body">
            <div className="sg-lightbox__media sg-lightbox__media--solo">
              {showVideo ? (
                <video
                  key={videoSrc}
                  src={videoSrc}
                  controls
                  autoPlay
                  playsInline
                  poster={project.cover}
                  className="sg-lightbox__video"
                />
              ) : (
                <img src={videoSrc} alt={project.title} />
              )}
            </div>

            <div className="sg-lightbox__aside">
              <h2>{project.title}</h2>
              {isDetail ? (
                <>
                  <p className="sg-lightbox__meta">
                    {[project.metrics!.marketZone, "Video"]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  <dl className="sg-lightbox__fields">
                    {rows.map(([k, v]) => (
                      <div key={k}>
                        <dt>{k}</dt>
                        <dd>{v}</dd>
                      </div>
                    ))}
                  </dl>
                </>
              ) : (
                <div className="sg-lightbox__grid">
                  {project.media.map((src) => (
                    <img key={src} src={src} alt={project.title} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
