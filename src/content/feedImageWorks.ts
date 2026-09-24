import type { Project } from "@/content/data";

/** Featured 轮播封面 */
export const FEED_IMAGE_SERIES_COVER =
  "/feed-image/series-carousel-cover.png";

function feedImage(
  slug: string,
  file: string,
  title: string,
  cardLabel: string,
): Project {
  const cover = `/feed-image/${file}`;
  return {
    slug,
    title,
    cover,
    media: [cover],
    cardLabel,
  };
}

/** 每行 3 张、同排同比例，避免高低错落 */
export type FeedImageRowKind = "portrait" | "landscape" | "square";

export type FeedImageRow = {
  kind: FeedImageRowKind;
  works: Project[];
};

export const feedImageRows: FeedImageRow[] = [
  {
    kind: "portrait",
    works: [
      feedImage(
        "feed-img-anniversary-host",
        "anniversary-host-recruit-ar.png",
        "周年庆主播招募",
        "AR · 周年庆",
      ),
      feedImage("feed-img-kv-1", "kv-untitle-1.png", "活动 KV", "KV · 01"),
      feedImage(
        "feed-img-voice-gifts",
        "voice-room-gifts-tr.png",
        "语音房 + 礼物",
        "TR · 礼物",
      ),
    ],
  },
  {
    kind: "landscape",
    works: [
      feedImage(
        "feed-img-anniversary-guild",
        "anniversary-guild-ar.png",
        "周年庆 · 新公会",
        "AR · 公会",
      ),
      feedImage(
        "feed-img-coin-bigwin",
        "coin-game-bigwin-ar.png",
        "金币游戏 + Big Win",
        "AR · 金币",
      ),
      feedImage(
        "feed-img-coin-superwin",
        "coin-game-superwin-ar.png",
        "金币游戏 + Super Win",
        "AR · Super Win",
      ),
    ],
  },
  {
    kind: "landscape",
    works: [
      feedImage(
        "feed-img-voice-coins",
        "voice-room-coins-tr.png",
        "语音房 · 金币展示",
        "TR · 语音房",
      ),
      feedImage(
        "feed-img-midyear",
        "midyear-rewards-tr.png",
        "年中盛典 · 登陆奖励",
        "TR · 活动",
      ),
      feedImage(
        "feed-img-online-chat",
        "online-chat-tr.jpg",
        "Online Chat Now",
        "TR · 人物",
      ),
    ],
  },
  {
    kind: "square",
    works: [
      feedImage("feed-img-static-11", "static-11.png", "静态组图", "组图 · 01"),
      feedImage(
        "feed-img-static-11b",
        "static-11-2.png",
        "静态组图",
        "组图 · 02",
      ),
      feedImage(
        "feed-img-static-11c",
        "static-11-3.png",
        "静态组图",
        "组图 · 03",
      ),
    ],
  },
];

export const feedImageWorks: Project[] = feedImageRows.flatMap((r) => r.works);
