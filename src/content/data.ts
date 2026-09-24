const cdn = (id: string, q = "auto=format") =>
  `https://cdn.sanity.io/images/3vte03iz/production/${id}?${q}`;

export type ThemeSet = {
  id: string;
  primary: string;
  onPrimary: string;
  secondary: string;
  onSecondary: string;
};

export const themes: ThemeSet[] = [
  {
    id: "1",
    primary: "#ffffff",
    onPrimary: "#363636",
    secondary: "#d2d2d2",
    onSecondary: "#363636",
  },
  {
    id: "2",
    primary: "#ede6d3",
    onPrimary: "#2c2c2c",
    secondary: "#ff7906",
    onSecondary: "#2c2c2c",
  },
  {
    id: "3",
    primary: "#0779ff",
    onPrimary: "#b7f9ff",
    secondary: "#002180",
    onSecondary: "#b7f9ff",
  },
  {
    id: "4",
    primary: "#37af5d",
    onPrimary: "#c6ff00",
    secondary: "#005319",
    onSecondary: "#c6ff00",
  },
  {
    id: "5",
    primary: "#3c0350",
    onPrimary: "#fce9ff",
    secondary: "#db30f5",
    onSecondary: "#fce9ff",
  },
];

/** 浏览器标签 / 站点名称 */
export const siteTitle = "Joleen";

export const site = {
  name: "赵欣竹",
  nameParts: ["Joleen"],
  role: "Designer",
  roleZh: "视觉设计 / 广告创意 / AI 创意 / 本地化",
  location: "JiangXi, China",
  email: "331191569@qq.com",
  clientsLabel: "Expertise",
  clients:
    "Visual Design / Advertising Creative / AI Creative / Localization",
  avatar: cdn(
    "4838bb844e8a728e662123fca080b244a3f5f6cf-2048x2048.png",
    "w=96&h=96&auto=format",
  ),
  about: {
    title: "about",
    body:
      "Spencer Gabor is an illustrator, designer and muralist based in Brooklyn, New York. His work is headlined by bold and zaney characters, abstract shapes and bright colors. Clients include Apple, Amazon, Adobe, NPR, Lululemon, The New York Times, Harvard Business Review, Twilio, ShakeShack, Jagermeister, Skullcandy, & others",
    news: [
      { label: "store", title: "Shop Prints", href: "#" },
      { label: "article", title: "New A2 Print", href: "#" },
      { label: "store", title: "The Noun Project", href: "#" },
      { label: "interview", title: "Brompton", href: "#" },
    ],
    projects: ["Brompton", "260 Collins", "ShakeShack", "Caulfield Cup", "Jaffa"],
  },
};

/** 首页 Hero 中间单图（1:1） */
export const heroImage = {
  src: "/hero/hero-square.png",
};

export type WorkMetrics = {
  spend?: string;
  cost?: string;
  roi7?: string;
  marketZone?: string;
  channelPrimary?: string;
  source?: string;
  period?: string;
};

export type Project = {
  slug: string;
  title: string;
  cover: string;
  media: string[];
  /** More Work 网格：点开播放完整视频 */
  videoUrl?: string;
  metrics?: WorkMetrics;
  /** 网格封面下展示名（可与视频标题不同） */
  cardLabel?: string;
  /** Featured 系列点开：右侧介绍文案 */
  intro?: string;
};

export const featuredProjects: Project[] = [
  {
    slug: "nike",
    title: "Nike",
    cover: cdn("e026db3b36aeb570c7c256fc4905bf84d167d449-2160x2160.png", "w=900&auto=format"),
    media: [
      cdn("e026db3b36aeb570c7c256fc4905bf84d167d449-2160x2160.png", "w=1200&auto=format"),
      cdn("1e0a1204bdb2e8c1d22752a76705b92c8c0a2aee-2160x2160.png", "w=1200&auto=format"),
    ],
  },
  {
    slug: "shakeshack",
    title: "ShakeShack",
    cover: cdn("4e95751e90d0c6a9d9027120a92e95022348ed3f-2160x2160.png", "w=900&auto=format"),
    media: [cdn("4e95751e90d0c6a9d9027120a92e95022348ed3f-2160x2160.png", "w=1200&auto=format")],
  },
  {
    slug: "jaffa",
    title: "Jaffa",
    cover: cdn("c486c7b168edd71a7d95b7ef6b87fe4107584689-2160x2160.png", "w=900&auto=format"),
    media: [cdn("c486c7b168edd71a7d95b7ef6b87fe4107584689-2160x2160.png", "w=1200&auto=format")],
  },
  {
    slug: "caulfield-cup",
    title: "Caulfield Cup",
    cover: cdn("6bcc343dca040f2a86fe84a1bd112a9fadd16078-3238x3238.png", "w=900&auto=format"),
    media: [cdn("6bcc343dca040f2a86fe84a1bd112a9fadd16078-3238x3238.png", "w=1200&auto=format")],
  },
  {
    slug: "frugo",
    title: "Frugo",
    cover: cdn("3370a74894861bc352ae02dd28b3263950638065-2500x2500.png", "w=900&auto=format"),
    media: [cdn("3370a74894861bc352ae02dd28b3263950638065-2500x2500.png", "w=1200&auto=format")],
  },
  {
    slug: "whop",
    title: "Whop",
    cover: cdn("aa69aa97aa6557bc6ff5c595c69a2ec022987a67-3600x3600.png", "w=900&auto=format"),
    media: [cdn("aa69aa97aa6557bc6ff5c595c69a2ec022987a67-3600x3600.png", "w=1200&auto=format")],
  },
];

const gridCovers = [
  "0817f128395483277291c832105c1b0a35bbf6a0-2048x2048.jpg",
  "3934c5000d7d4a36a249cd915464ead82672804b-2381x2381.jpg",
  "45fec9d86b00058bf62df84d930cd23f4f8152e4-1500x1500.png",
  "5a33c36ecd57ffce522bcc38ff2a7f8aecacffbf-2035x2035.jpg",
  "8d1e3c1b5194bf632e65f726a28990e6fd401e41-2048x2048.png",
  "91c4fe5c869724fc66d504f5226756b34aaf42a1-1625x1625.png",
  "96fdc45bff981adf38b2fb9fc29d514a3f7ef3d2-1684x1684.jpg",
  "aceebaf058d348ee7848c1d7ee5d733d5c78c1d2-1769x1768.png",
  "adf2a09ed47739d63f9afd1d6de31d4bcbdb96d2-1080x1080.jpg",
  "bca8010169041916a227ecb3a654f720b92dca4c-2048x2048.jpg",
  "bf9ab68d6df6c1e5a2b2ec2e1a0bc4875766914b-2400x2400.png",
  "c197662346db94863a6c11f06bb50bea1b31fad0-2426x2426.png",
  "c9e0c0332346ea0e8031e53baa38cc69d44cb21f-2711x2711.png",
  "d892db419d67230de888ca8d8b3f2764efeaa944-2500x2500.png",
  "dace692dfff49c22d776f83500c24eaf8c8523f2-2426x2426.png",
  "ddb1ff83a6896af9f812222294df8dd3eac419cc-2266x2264.png",
  "f5b9a92b0ebf98dcb80137b669c55d3e376a916b-3110x3110.jpg",
  "f8d11b3e929d7bbb26ffd0ce6956f32eaa261b79-2048x2048.png",
];

const gridTitles = [
  "Brompton",
  "260 Collins",
  "Do Good",
  "ShakeShack",
  "Shred",
  "DreamVault",
  "Whop",
  "Frugo",
  "Nike",
  "Jaffa",
  "Caulfield Cup",
  "Project",
  "Project",
  "Project",
  "Project",
  "Project",
  "Project",
  "Project",
];

export const gridProjects: Project[] = gridCovers.map((id, i) => ({
  slug: `work-${i}`,
  title: gridTitles[i] ?? "Work",
  cover: cdn(id, "w=800&auto=format"),
  media: [cdn(id, "w=1400&auto=format")],
}));
