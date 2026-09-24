/** About 页内容 — 结构对齐 hgy.design/about
 *  投放数据口径：Downloads 内 YoHo 创意榜单 xlsx
 *  （2025-01-01~2025-12-31 / 2026-01-01~2026-09-23，上传人 joleen）
 */
export const aboutProfile = {
  name: "赵欣竹",
  nameEn: "Joleen",
  handle: "ZHAOXINZHU-JOLEEN",
  photo: "/resume/profile.png",
  photoAlt: "赵欣竹 · Joleen",
  roleLine: "Overseas Ads Designer · 2024 — Now",
  titleLines: [
    { text: "Joleen", accent: false },
  ],
  intro:
    "最近两年在米可世界创意策略四组，担任海外广告素材设计师，主要负责YOHO团队的广告素材设计工作，业务覆盖中东、土耳其、南亚、台湾的素材设计以及本地化设计;在 Google、Facebook、TikTok 三大核心渠道投放。",
  location: "JiangXi, China",
  email: "331191569@qq.com",
  phone: "18970245777",
  skillsBlurb:
    "既能做平面素材设计，也会三维设计；擅长利用 AI 工具和自动化手段去提升工作效率。",
  marketsBlurb: "拥有对热点的敏锐嗅觉以及对素材超强审美能力",
  footerNote:
    "Ever seeking, ever exploring. © 2026 · All works belong to their respective owners.",
  personal: {
    name: "赵欣竹",
    birthday: "2003/09/22",
  },
  education: {
    school: "温州大学",
    degree: "本科",
    major: "视觉传达设计",
  },
  skillGroups: [
    {
      title: "Design Skills",
      icon: "✦",
      items: [
        { name: "Ad Creative Design", value: 95 },
        { name: "Feed Ad Design", value: 92 },
        { name: "Video Editing", value: 88 },
        { name: "3D Design", value: 78 },
      ],
    },
    {
      title: "Design Tools",
      icon: "✸",
      items: [
        { name: "Adobe Media Encoder", value: 96 },
        { name: "Photoshop", value: 95 },
        { name: "Figma", value: 85 },
        { name: "Rhion", value: 80 },
      ],
    },
    {
      title: "AI & Workflow",
      icon: "✺",
      items: [
        { name: "AI Generation", value: 90 },
        { name: "Skill Engineering", value: 85 },
        { name: "Workflow Building", value: 82 },
      ],
    },
  ],
  experience: [
    {
      period: "2024.11 — 至今",
      company: "米可世界 · 创意策略四组（YoHo）",
      title: "海外广告设计师",
      isNew: true,
      bullets: [
        "负责 YoHo 海外买量创意，覆盖 GCC、土耳其、南亚、东南亚、台湾及北美等市场，主投 Google、Meta（Facebook）、TikTok；交付信息流视频、静态组图、商店页。",
        "累计创作 3000+ 小时、交付 500+ 套买量素材；2025–2026 创意榜单累计 6500+ 条获投记录，统计期投放消耗合计 $175 万+（2025 全年约 $67 万，2026 前三季约 $108 万），单条消耗峰值突破 $3 万。",
        "150+ 条创意 7 日 ROI ≥10%，台湾等重点市场单条消耗达 $1 万+ 级；按周与投放复盘消耗、成本与 ROI，迭代街访、口播、语音房及 AIGC 等方向。",
      ],
    },
    {
      period: "2024.06 — 2024.10",
      company: "BIGO · 直播事业部",
      title: "市场部设计师",
      bullets: [
        "美加直播业务平面与短视频，活动/赛事/节日海报及端内 KV 等，交付完成率 100%。",
      ],
    },
  ],
  markets: [
    { region: "GCC", brand: "" },
    { region: "USA", brand: "" },
    { region: "Canada", brand: "" },
    { region: "Mexico", brand: "" },
    { region: "Indonesia", brand: "" },
    { region: "Türkiye", brand: "" },
    { region: "India&Pakistan", brand: "" },
    { region: "China", brand: "" },
  ],
  studioName: "Joleen",
  contactBlurb: "项目合作 / 全职机会 / 作品交流 — 欢迎联系。",
} as const;
