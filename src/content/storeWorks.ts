import type { Project } from "@/content/data";

/** 与 public/store 一致；来源 Desktop/商店页 */
export const STORE_SERIES_COVER = "/store/series-carousel-cover.png";

function storeWork(slug: string, file: string, title: string, cardLabel: string): Project {
  const cover = `/store/${file}`;
  return { slug, title, cover, media: [cover], cardLabel };
}

export const storeWorks: Project[] = [
  storeWork("store-set1-01", "set-01-01.png", "商店页 · 套系 1 · 1", "套系 1 · 01"),
  storeWork("store-set1-02", "set-01-02.png", "商店页 · 套系 1 · 2", "套系 1 · 02"),
  storeWork("store-set1-03", "set-01-03.png", "商店页 · 套系 1 · 3", "套系 1 · 03"),
  storeWork("store-set1-04", "set-01-04.png", "商店页 · 套系 1 · 4", "套系 1 · 04"),
  storeWork("store-set1-05", "set-01-05.png", "商店页 · 套系 1 · 5", "套系 1 · 05"),
  storeWork("store-set1-06", "set-01-06.png", "商店页 · 套系 1 · 6", "套系 1 · 06"),
  storeWork("store-set1-07", "set-01-07.png", "商店页 · 套系 1 · 7", "套系 1 · 07"),
  storeWork("store-set2-01", "set-02-01.png", "商店页 · 套系 2 · 1", "套系 2 · 01"),
  storeWork("store-set2-02", "set-02-02.png", "商店页 · 套系 2 · 2", "套系 2 · 02"),
  storeWork("store-set2-03", "set-02-03.png", "商店页 · 套系 2 · 3", "套系 2 · 03"),
  storeWork("store-set2-04", "set-02-04.png", "商店页 · 套系 2 · 4", "套系 2 · 04"),
  storeWork("store-set2-05", "set-02-05.png", "商店页 · 套系 2 · 5", "套系 2 · 05"),
  storeWork("store-set2-06", "set-02-06.png", "商店页 · 套系 2 · 6", "套系 2 · 06"),
  storeWork("store-set2-07", "set-02-07.png", "商店页 · 套系 2 · 7", "套系 2 · 07"),
  storeWork("store-set3-01", "set-03-01.png", "商店页 · 套系 3 · 1", "套系 3 · 01"),
  storeWork("store-set3-02", "set-03-02.png", "商店页 · 套系 3 · 2", "套系 3 · 02"),
  storeWork("store-set3-03", "set-03-03.png", "商店页 · 套系 3 · 3", "套系 3 · 03"),
  storeWork("store-set3-04", "set-03-04.png", "商店页 · 套系 3 · 4", "套系 3 · 04"),
  storeWork("store-set3-05", "set-03-05.png", "商店页 · 套系 3 · 5", "套系 3 · 05"),
  storeWork("store-set3-06", "set-03-06.png", "商店页 · 套系 3 · 6", "套系 3 · 06"),
  storeWork("store-set3-07", "set-03-07.png", "商店页 · 套系 3 · 7", "套系 3 · 07"),
  storeWork("store-set4-01", "set-04-01.jpg", "商店页 · 套系 4 · 1", "套系 4 · 01"),
  storeWork("store-set4-02", "set-04-02.jpg", "商店页 · 套系 4 · 2", "套系 4 · 02"),
  storeWork("store-set4-03", "set-04-03.jpg", "商店页 · 套系 4 · 3", "套系 4 · 03"),
  storeWork("store-set4-04", "set-04-04.jpg", "商店页 · 套系 4 · 4", "套系 4 · 04"),
  storeWork("store-set4-05", "set-04-05.jpg", "商店页 · 套系 4 · 5", "套系 4 · 05"),
  storeWork("store-set4-06", "set-04-06.jpg", "商店页 · 套系 4 · 6", "套系 4 · 06"),
];
