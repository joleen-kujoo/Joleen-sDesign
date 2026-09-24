#!/bin/bash
cd "$(dirname "$0")"
GH="$(pwd)/.tools/gh_2.63.2_macOS_arm64/bin/gh"
export PATH="$(dirname "$GH"):$PATH"

# 全屏提示 + 终端置顶
osascript <<'APPLESCRIPT'
tell application "Terminal"
    activate
    do script "printf '\\n\\n========================================\\n  验证码会出现在下面几行英文里\\n  格式类似: ABCD-1234\\n  复制后贴到浏览器 github.com/login/device\\n========================================\\n\\n'; cd '/Users/mico/Developer/hgy-portfolio'; export PATH=\"$(pwd)/.tools/gh_2.63.2_macOS_arm64/bin:$PATH\"; open 'https://github.com/login/device'; gh auth login -h github.com -p https -w; echo ''; echo '登录成功后自动上传…'; git push -u origin main; echo ''; read -r -p '按回车关闭窗口…'"
end tell
APPLESCRIPT
