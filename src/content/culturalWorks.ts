import type { Project } from "@/content/data";

/** 文创产品设计 · Featured 轮播封面 */
export const CULTURAL_SERIES_COVER = "/cultural/cultural-xichou-cover.png";

function culturalWork(
  slug: string,
  src: string,
  title: string,
  cardLabel: string,
  intro?: string,
  cover?: string,
): Project {
  const media = `/cultural/${src}`;
  return {
    slug,
    title,
    cover: cover ?? media,
    media: [media],
    cardLabel,
    intro,
  };
}

export const culturalWorks: Project[] = [
  culturalWork(
    "cultural-xichou",
    "cultural-01-zhuchou.png",
    "熄愁",
    "工业设计大赛",
    "浙江省工业设计大赛作品。\n\n宋韵文化加湿器「熄愁」：产品、结构分解与包装体系。",
    CULTURAL_SERIES_COVER,
  ),
  culturalWork(
    "cultural-movable-type",
    "cultural-02-movable-type.png",
    "温州木活字文创",
    "非遗木活字",
    "大学生创新创业大赛。\n\n口罩、品鉴杯、虎元素印章与金属笔画耳饰及周边售卖展示。",
  ),
  culturalWork(
    "cultural-packaging",
    "cultural-03-packaging.png",
    "宋韵文化包装 / 草木密语",
    "包装 · 香薰",
    "宴飲点茶 · 宋韵文化包装体系。\n\n汉芳源生「草木密语」香薰与礼盒包装。",
    "/cultural/cultural-cover-song-packaging.png",
  ),
  culturalWork(
    "cultural-ip-merch",
    "cultural-04-ip-merch.png",
    "IP 衍生品设计",
    "周边",
    "BIGO LIVE IP 飞盘衍生品设计与落地展示。",
  ),
];
