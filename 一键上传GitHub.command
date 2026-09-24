#!/bin/bash
cd "$(dirname "$0")"

GH_BIN="$(pwd)/.tools/gh_2.63.2_macOS_arm64/bin/gh"
export PATH="$(dirname "$GH_BIN"):$PATH"

osascript -e 'tell application "Terminal" to activate' 2>/dev/null || true
osascript -e 'display notification "请看终端窗口，完成 GitHub 登录后代码会自动上传" with title "Joleen 部署"' 2>/dev/null || true

clear
echo "=========================================="
echo "  一键上传到 GitHub（Cloudflare 会自动构建）"
echo "=========================================="
echo ""

if [[ ! -x "$GH_BIN" ]]; then
  echo "缺少 gh，请先双击一次「部署网站.command」下载工具。"
  read -r -p "按回车关闭…" _
  exit 1
fi

if ! gh auth status &>/dev/null; then
  echo "【1/2】登录 GitHub"
  open "https://github.com/login/device" 2>/dev/null || true
  echo "浏览器打开 github.com/login/device，终端里复制 8 位验证码。"
  echo ""
  gh auth login -h github.com -p https -w
  if ! gh auth status &>/dev/null; then
    echo "登录失败，请再运行一次本脚本。"
    read -r -p "按回车关闭…" _
    exit 1
  fi
fi

echo ""
echo "【2/2】上传代码到 joleen-kujoo/Joleen-sDesign …"
git push -u origin main

if [[ $? -eq 0 ]]; then
  echo ""
  echo "✓ 上传成功"
  echo "  若 Cloudflare Pages 已连好 Git，约 2～5 分钟会自动部署。"
  open "https://dash.cloudflare.com/?to=/:account/workers-and-pages" 2>/dev/null || true
else
  echo ""
  echo "上传失败。可用 Token："
  echo "  https://github.com/settings/tokens （勾选 repo）"
  echo "  再执行: git push -u origin main"
  echo "  用户名 joleen-kujoo，密码粘贴 token"
fi

echo ""
read -r -p "按回车关闭…" _
