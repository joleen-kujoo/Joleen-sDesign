import type { Project } from "@/content/data";
import { AIGC_SERIES_COVER, aigcWorks } from "@/content/aigcWorks";
import {
  FEED_IMAGE_SERIES_COVER,
  feedImageWorks,
} from "@/content/feedImageWorks";
import {
  FEED_VIDEO_SERIES_COVER,
  feedVideoWorks,
} from "@/content/feedVideoWorks";
import { STORE_SERIES_COVER, storeWorks } from "@/content/storeWorks";
import { CULTURAL_SERIES_COVER, culturalWorks } from "@/content/culturalWorks";

/** 滚入 Featured 区块时轮播默认居中的系列（与 seriesConfig 顺序无关） */
export const FEATURED_LEADING_SLUG = "feed-video";

export type FeaturedSeries = {
  slug: string;
  title: string;
  cover: string;
  works: Project[];
};

type SeriesConfig = {
  slug: string;
  title: string;
  works: Project[];
  cover?: string;
};

const seriesConfig: SeriesConfig[] = [
  {
    slug: "feed-video",
    title: "信息流 · 视频",
    works: feedVideoWorks,
    cover: FEED_VIDEO_SERIES_COVER,
  },
  {
    slug: "feed-image",
    title: "信息流 · 图片",
    works: feedImageWorks,
    cover: FEED_IMAGE_SERIES_COVER,
  },
  { slug: "aigc", title: "AIGC", works: aigcWorks, cover: AIGC_SERIES_COVER },
  {
    slug: "cultural",
    title: "文创产品设计",
    works: culturalWorks,
    cover: CULTURAL_SERIES_COVER,
  },
  { slug: "store", title: "商店页", works: storeWorks, cover: STORE_SERIES_COVER },
];

export const featuredSeries: FeaturedSeries[] = seriesConfig.map((cfg) => {
  const works = cfg.works;
  const cover =
    ("cover" in cfg && cfg.cover) || works[0]?.cover || "";
  return {
    slug: cfg.slug,
    title: cfg.title,
    cover,
    works,
  };
});
