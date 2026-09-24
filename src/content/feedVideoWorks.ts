import type { Project } from "@/content/data";

/** 与 public/feed-video 一致；来源 Desktop/视频 */
export const FEED_VIDEO_SERIES_COVER = "/feed-video/video-916-9163-cover.png";

function feedVideo(slug: string, fileBase: string, title: string, cardLabel?: string): Project {
  const cover = `/feed-video/${fileBase}-cover.png`;
  const videoUrl = `/feed-video/${fileBase}.mp4`;
  return { slug, title, cover, media: [cover], videoUrl, cardLabel: cardLabel ?? title };
}

export const feedVideoWorks: Project[] = [
  feedVideo("feed-vid-iraq语音房长录屏测试", "iraq语音房长录屏测试", "Iraq语音房长录屏测试", "Iraq语音房长录屏测试"),
  feedVideo("feed-vid-点击展示不同kol", "点击展示不同kol", "点击展示不同kol", "点击展示不同kol"),
  feedVideo("feed-vid-低语口播切入语音房", "低语口播切入语音房", "低语口播切入语音房", "低语口播切入语音房"),
  feedVideo("feed-vid-video-916-291620250407", "video-916-291620250407", "2-916-20250407-YOHO-TR-选不同类型美女+暧昧氛围-迭代", "2-916-20250407-YOHO-"),
  feedVideo("feed-vid-语音房结合游戏+礼物迭代", "语音房结合游戏+礼物迭代", "语音房结合游戏+礼物迭代", "语音房结合游戏+礼物迭代"),
  feedVideo("feed-vid-周年庆开启新公会", "周年庆开启新公会", "周年庆开启新公会", "周年庆开启新公会"),
  feedVideo("feed-vid-1v1语音通话+土味情话", "1v1语音通话+土味情话", "1v1语音通话+土味情话", "1v1语音通话+土味情话"),
  feedVideo("feed-vid-头巾美女+语音房礼物+iraq口播", "头巾美女+语音房礼物+iraq口播", "头巾美女+语音房礼物+iraq口播", "头巾美女+语音房礼物+iraq口播"),
  feedVideo("feed-vid-video-916-9162", "video-916-9162", "916 2", "916 2"),
  feedVideo("feed-vid-video-916-9163", "video-916-9163", "916 3", "916 3"),
  feedVideo("feed-vid-video-916-9164", "video-916-9164", "916 4", "916 4"),
  feedVideo("feed-vid-video-916", "video-916", "916", "916"),
];
