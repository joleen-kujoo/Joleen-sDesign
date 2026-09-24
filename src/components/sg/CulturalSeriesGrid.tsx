import type { Project } from "@/content/data";

type CulturalSeriesGridProps = {
  works: Project[];
  onSelect: (work: Project) => void;
};

/** 文创：16:9 框内完整展示作品集页（用 media 原图，不用轮播 cover） */
export function CulturalSeriesGrid({ works, onSelect }: CulturalSeriesGridProps) {
  return (
    <ul className="sg-cultural-grid" aria-label="文创产品设计作品">
      {works.map((work) => {
        const src = work.media?.[0] ?? work.cover;
        return (
          <li key={work.slug}>
            <button
              type="button"
              className="sg-cultural-grid__hit"
              onClick={() => onSelect(work)}
            >
              <span className="sg-cultural-grid__frame">
                <img src={src} alt={work.title} loading="lazy" decoding="async" />
              </span>
              <span className="sg-series-modal__caption">
                {work.cardLabel ?? work.title}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
