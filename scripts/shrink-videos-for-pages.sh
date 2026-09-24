#!/bin/bash
# Cloudflare Pages: each file must be < 25 MiB
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MAX_BYTES=$((24 * 1024 * 1024))

FFMPEG="${FFMPEG:-ffmpeg}"
if ! command -v "$FFMPEG" &>/dev/null; then
  echo "请先安装 ffmpeg，例如: brew install ffmpeg"
  exit 1
fi

shrink_one() {
  local f="$1"
  local size
  size=$(stat -f%z "$f" 2>/dev/null || stat -c%s "$f")
  if (( size <= MAX_BYTES )); then
    return 0
  fi
  echo "压缩: $f ($(awk "BEGIN {printf \"%.1f\", $size/1048576}") MiB)"
  local tmp="${f}.pages-tmp.mp4"
  # 两遍：先中等 CRF，仍超限则更强压缩
  for crf in 28 32 36; do
    "$FFMPEG" -nostdin -y -hide_banner -loglevel error -i "$f" \
      -c:v libx264 -crf "$crf" -preset medium \
      -c:a aac -b:a 96k -movflags +faststart \
      "$tmp"
    size=$(stat -f%z "$tmp" 2>/dev/null || stat -c%s "$tmp")
    if (( size <= MAX_BYTES )); then
      mv "$tmp" "$f"
      echo "  → $(awk "BEGIN {printf \"%.1f\", $size/1048576}") MiB (crf=$crf)"
      return 0
    fi
  done
  rm -f "$tmp"
  echo "  仍超过 24 MiB，请手动缩短视频或改用外链: $f"
  return 1
}

failed=0
while IFS= read -r -d '' f; do
  shrink_one "$f" || failed=1
done < <(find "$ROOT/public" -type f \( -name '*.mp4' -o -name '*.mov' \) -print0)

if (( failed != 0 )); then
  exit 1
fi
echo "完成。请 git add -A && git commit && git push，再在 Cloudflare Retry deployment。"
