/** More Work — 与 public/more-work 一致；来源 Desktop/more work */

export type MoreWorkItem = {
  cardLabel: string;
  title: string;
  intro?: string;
  cover: string;
  videoUrl: string;
  spend: string;
  cost: string;
  roi7: string;
  marketZone: string;
  channelPrimary: string;
  source: string;
  period: string;
};

function item(
  cardLabel: string,
  title: string,
  fileBase: string,
  period: string,
  marketZone: string,
): MoreWorkItem {
  return {
    cardLabel,
    title,
    cover: `/more-work/${fileBase}-cover.png`,
    videoUrl: `/more-work/${fileBase}.mp4`,
    spend: "—",
    cost: "—",
    roi7: "—",
    marketZone,
    channelPrimary: "Facebook",
    source: "—",
    period,
  };
}

export const moreWorkItems: MoreWorkItem[] = [
  item("街访+画面展示-不浪费周末认识美女", "街访+画面展示-不浪费周末认识美女", "more-work-01", "20251219期", "台湾"),
  item("多美女展示结合语音房送礼", "多美女展示结合语音房送礼", "more-work-02", "20260907期", "—"),
  item("洗车口播3", "洗车口播3", "more-work-03", "20260922期", "—"),
  item("周年庆开启新公会", "周年庆开启新公会", "more-work-04", "20251119期", "—"),
  item("睡衣变装结合语音房口播", "睡衣变装结合语音房口播", "more-work-05", "20260910期", "—"),
  item("实拍+土味情话", "实拍+土味情话", "more-work-06", "20260904期", "土耳其"),
  item("头巾美女+语音房礼物+iraq口播", "头巾美女+语音房礼物+iraq口播", "more-work-07", "20250910期", "—"),
  item("拉手动画+口播+pov", "拉手动画+口播+pov", "more-work-08", "20260331期", "—"),
  item("pov+洗脚剧情", "pov+洗脚剧情", "more-work-09", "20260917期", "—"),
  item("双女口播+语音房", "双女口播+语音房", "more-work-10", "20260518期", "—"),
  item("足球拉拉队开头切语音房", "足球拉拉队开头切语音房", "more-work-11", "20260617期", "—"),
  item("当你偶遇前男友", "当你偶遇前男友", "more-work-12", "20260922期", "—"),
  item("交友文案街访-埃及", "交友文案街访-埃及", "more-work-13", "20260807期", "中东"),
  item("916 4", "916 4", "more-work-14", "—", "—"),
  item("916", "916", "more-work-15", "—", "—"),
];
