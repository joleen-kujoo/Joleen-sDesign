import type { Project } from "@/content/data";

type StoreSeriesGridProps = {
  works: Project[];
  onSelect: (work: Project) => void;
};

/** 商店页：原图比例完整展示 */
export function StoreSeriesGrid({ works, onSelect }: StoreSeriesGridProps) {
  return (
    <ul className="sg-store-grid" aria-label="商店页作品">
      {works.map((work) => {
        const src = work.media?.[0] ?? work.cover;
        return (
          <li key={work.slug}>
            <button
              type="button"
              className="sg-store-grid__hit"
              onClick={() => onSelect(work)}
            >
              <span className="sg-store-grid__frame">
                <img src={src} alt={work.title} loading="lazy" decoding="async" />
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
