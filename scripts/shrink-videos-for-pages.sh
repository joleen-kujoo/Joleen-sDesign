#!/bin/bash
# Shrink videos for web deploy (default max ~18 MiB per file).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TARGET_MIB="${TARGET_MIB:-18}"
MAX_BYTES=$((TARGET_MIB * 1024 * 1024))

FFMPEG="${FFMPEG:-ffmpeg}"
FFPROBE="${FFPROBE:-ffprobe}"
if ! command -v "$FFMPEG" &>/dev/null; then
  echo "请先安装 ffmpeg，或设置 FFMPEG=路径"
  exit 1
fi

mib() {
  awk -v b="$1" 'BEGIN { printf "%.1f", b / 1048576 }'
}

shrink_one() {
  local f="$1"
  local size
  size=$(stat -f%z "$f" 2>/dev/null || stat -c%s "$f")
  if (( size <= MAX_BYTES )); then
    return 0
  fi
  echo "压缩: $f ($(mib "$size") MiB → ≤${TARGET_MIB} MiB)"
  local tmp="${f}.pages-tmp.mp4"
  local dur
  if command -v "$FFPROBE" &>/dev/null && "$FFPROBE" -version 2>&1 | grep -q ffprobe; then
    dur=$("$FFPROBE" -nostdin -v error -show_entries format=duration -of csv=p=0 "$f" 2>/dev/null || echo "")
  else
    dur=""
  fi
  if [[ -z "$dur" || "$dur" == "N/A" ]]; then
    dur=$("$FFMPEG" -nostdin -i "$f" 2>&1 | sed -n 's/.*Duration: \([0-9:.]*\),.*/\1/p' | head -1)
    if [[ "$dur" =~ ^([0-9]+):([0-9]+):([0-9.]+)$ ]]; then
      dur=$(awk -v h="${BASH_REMATCH[1]}" -v m="${BASH_REMATCH[2]}" -v s="${BASH_REMATCH[3]}" 'BEGIN { print h*3600+m*60+s }')
    else
      dur=60
    fi
  fi
  local video_k
  video_k=$(awk -v t="$MAX_BYTES" -v d="$dur" 'BEGIN {
    if (d < 1) d = 1;
    k = (t * 8 / 1000 / d) - 96;
    if (k < 400) k = 400;
    printf "%d", k
  }')

  local vf="scale=-2:min(1280\\,ih)"
  for attempt in 1 2 3; do
    "$FFMPEG" -nostdin -y -hide_banner -loglevel error -i "$f" \
      -vf "$vf" \
      -c:v libx264 -profile:v main -preset medium \
      -b:v "${video_k}k" -maxrate "${video_k}k" -bufsize "$((video_k * 2))k" \
      -c:a aac -b:a 96k -movflags +faststart \
      "$tmp"
    size=$(stat -f%z "$tmp" 2>/dev/null || stat -c%s "$tmp")
    if (( size <= MAX_BYTES )); then
      mv "$tmp" "$f"
      echo "  → $(mib "$size") MiB (video ${video_k}k)"
      return 0
    fi
    video_k=$((video_k * 85 / 100))
    vf="scale=-2:min(960\\,ih)"
  done

  for crf in 30 34 38; do
    "$FFMPEG" -nostdin -y -hide_banner -loglevel error -i "$f" \
      -vf "scale=-2:min(960\\,ih)" \
      -c:v libx264 -profile:v main -crf "$crf" -preset medium \
      -c:a aac -b:a 64k -movflags +faststart \
      "$tmp"
    size=$(stat -f%z "$tmp" 2>/dev/null || stat -c%s "$tmp")
    if (( size <= MAX_BYTES )); then
      mv "$tmp" "$f"
      echo "  → $(mib "$size") MiB (crf=$crf)"
      return 0
    fi
  done

  rm -f "$tmp"
  echo "  仍超过 ${TARGET_MIB} MiB: $f"
  return 1
}

failed=0
while IFS= read -r -d '' f; do
  shrink_one "$f" || failed=1
done < <(find "$ROOT/public" -type f \( -name '*.mp4' -o -name '*.mov' \) -print0)

if (( failed != 0 )); then
  exit 1
fi
echo "完成（目标 ≤ ${TARGET_MIB} MiB）。请 git add public && git commit && git push。"
