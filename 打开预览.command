#!/bin/bash
cd "$(dirname "$0")"
if ! curl -sf -o /dev/null http://localhost:5173/; then
  echo "正在启动网站…"
  npm run dev &
  sleep 2
fi
open "http://localhost:5173/"
