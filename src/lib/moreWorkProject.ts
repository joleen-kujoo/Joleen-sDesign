import type { Project } from "@/content/data";
import { moreWorkItems, type MoreWorkItem } from "@/content/moreWork";

/** 首页 More Work 方格 — 与 moreWork.ts 一一对应 */
export const moreWorkProjects: Project[] = moreWorkItems.map((item, index) =>
  moreWorkToProject(item, index),
);

export function moreWorkToProject(item: MoreWorkItem, index: number): Project {
  return {
    slug: `more-work-${index}`,
    title: item.title,
    cover: item.cover,
    media: [item.cover],
    videoUrl: item.videoUrl,
    cardLabel: item.cardLabel,
    intro: item.intro,
    metrics: {
      spend: item.spend,
      cost: item.cost,
      roi7: item.roi7,
      marketZone: item.marketZone,
      channelPrimary: item.channelPrimary,
      source: item.source,
      period: item.period,
    },
  };
}
