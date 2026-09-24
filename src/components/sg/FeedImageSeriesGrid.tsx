import type { Project } from "@/content/data";
import { feedImageRows } from "@/content/feedImageWorks";

type FeedImageSeriesGridProps = {
  onSelect: (work: Project) => void;
};

/** 信息流图片：分排 3 列，同排同比例 */
export function FeedImageSeriesGrid({ onSelect }: FeedImageSeriesGridProps) {
  return (
    <div className="sg-feed-image-board" aria-label="信息流图片作品">
      {feedImageRows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`sg-feed-image-board__row sg-feed-image-board__row--${row.kind}`}
        >
          {row.works.map((work) => (
            <button
              key={work.slug}
              type="button"
              className="sg-feed-image-board__hit"
              onClick={() => onSelect(work)}
            >
              <img
                src={work.cover}
                alt={work.title}
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
