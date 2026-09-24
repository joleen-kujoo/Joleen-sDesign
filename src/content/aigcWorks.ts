import type { Project } from "@/content/data";

/** 与 public/aigc 内文件一致；来源 Desktop/ai，按文件名去重 */
export const AIGC_SERIES_COVER = "/aigc/kivi-1790243874630-cover.png";

function aigcWork(
  slug: string,
  title: string,
  fileBase: string,
  cardLabel?: string,
): Project {
  const cover = `/aigc/${fileBase}-cover.png`;
  const videoUrl = `/aigc/${fileBase}.mp4`;
  return {
    slug,
    title,
    cover,
    media: [cover],
    videoUrl,
    cardLabel: cardLabel ?? title,
  };
}

export const aigcWorks: Project[] = [
  aigcWork("aigc-kivi-main", "KIVI 创意", "kivi-1790243874630", "KIVI · 主片"),
  aigcWork("aigc-kivi-02", "KIVI 创意", "kivi-1780652986519", "KIVI · 02"),
  aigcWork("aigc-dual-street-voice", "双女街采+语音房", "dual-girls-street-voice"),
  aigcWork("aigc-riyadh", "利雅得胜利球服上车对话", "riyadh-jersey-dialogue"),
  aigcWork("aigc-pajamas", "睡衣变装结合语音房口播", "pajamas-voice-room"),
  aigcWork("aigc-bathroom", "浴室口播", "bathroom-koubo-tw"),
  aigcWork("aigc-hand-pull", "拉手动画+口播+pov", "hand-pull-koubo-pov"),
  aigcWork("aigc-mature-koubo", "中年熟女单身口播", "mature-woman-solo-koubo"),
  aigcWork("aigc-dual-voice", "双女口播+语音房", "dual-girls-voice-room"),
  aigcWork("aigc-football", "足球拉拉队开头切语音房", "football-voice-room"),
  aigcWork("aigc-street-egypt", "交友文案街访 · 埃及", "street-interview-egypt"),
  aigcWork("aigc-street-scenes", "不同场景街访", "street-interview-scenes"),
];
