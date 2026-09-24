#!/bin/bash
cd "$(dirname "$0")"

SITE="（部署成功后 Cloudflare 会给 *.pages.dev 地址，也可绑自己的域名）"
PROJECT="joleen-portfolio"

osascript -e 'tell application "Terminal" to activate' 2>/dev/null || true

clear
echo "=========================================="
echo "  Joleen 作品集 → Cloudflare Pages"
echo "=========================================="
echo ""
echo "  推荐：在 Cloudflare 网页里连 GitHub，以后 push 自动发布。"
echo "  备选：本机用 wrangler 直接上传 dist（不用先 push）。"
echo ""
echo "  选一种方式："
echo "    1) 网页连 GitHub（推荐）"
echo "    2) 本机命令行上传"
echo ""
read -r -p "输入 1 或 2 后回车：" CHOICE

if [[ "$CHOICE" == "1" ]]; then
  echo ""
  echo "【方式 1】Cloudflare 连 GitHub"
  echo ""
  echo "  1. 浏览器打开（需登录 Cloudflare，没有就免费注册）："
  echo "     https://dash.cloudflare.com/?to=/:account/workers-and-pages"
  echo "  2. Create application → Pages → Connect to Git"
  echo "  3. 选 GitHub → 仓库 joleen-kujoo/Joleen-sDesign"
  echo "  4. 构建设置："
  echo "       Framework preset: Vite（或 None）"
  echo "       Build command:    npm run build"
  echo "       Build output:     dist"
  echo "       Node version:     22（环境变量 NODE_VERSION=22）"
  echo "  5. Save and Deploy"
  echo ""
  echo "  若 GitHub 里还没有代码，先在终端执行："
  echo "     cd ~/Developer/hgy-portfolio"
  echo "     git push -u origin main"
  echo ""
  open "https://dash.cloudflare.com/?to=/:account/workers-and-pages" 2>/dev/null || true
  open "https://github.com/joleen-kujoo/Joleen-sDesign" 2>/dev/null || true
elif [[ "$CHOICE" == "2" ]]; then
  echo ""
  echo "【方式 2】本机 wrangler 上传"
  echo ""
  if ! command -v node &>/dev/null; then
    echo "未找到 Node.js，请先安装：https://nodejs.org"
    read -r -p "按回车关闭…" _
    exit 1
  fi
  echo "正在构建…"
  npm run build
  echo ""
  echo "接下来会打开浏览器登录 Cloudflare（只需一次）。"
  read -r -p "按回车继续…" _
  npx --yes wrangler@3 login
  npx --yes wrangler@3 pages deploy dist --project-name="$PROJECT"
  echo ""
  echo "上传完成。终端里会显示 *.pages.dev 访问地址。"
else
  echo "未选择 1 或 2，已退出。"
fi

echo ""
echo "=========================================="
echo "  自动部署（可选）：在 GitHub 仓库 Settings → Secrets"
echo "  添加 CLOUDFLARE_API_TOKEN、CLOUDFLARE_ACCOUNT_ID"
echo "  之后 push 到 main 会走 Actions「Deploy to Cloudflare Pages」"
echo "=========================================="
echo ""
read -r -p "按回车关闭…" _
