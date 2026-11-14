# -*- coding: utf-8 -*-
"""
字体子集化：把 scripts/fonts/PuHuiTi-src.woff2（GB2312 一级字库，约 500KB）
按“站点实际用到的字”重新裁剪，输出 src/assets/fonts/PuHuiTi-subset.woff2。

为什么这么做：
  这个字体只在列表卡片的标题上用（List.vue 的 .title），
  但原来把整个一级字库（3755 字）都发给了浏览器，首页白下 500KB。

字符集来源（自动扫描，不用手写）：
  1. src/**/*.vue、src/**/*.ts 里的全部汉字（界面文案）
  2. src/stores/posts.json 里每篇文章的 title
  3. ASCII 可见字符 + 常用中英文标点

用法：
  npm run font          # 手动跑，产物要提交
  （不放进 prebuild：CI 上没有这条工具链，且字体半年才变一次）

新增文章后如果标题里出现了字库外的字，build-posts.mjs 会打印警告，
这时跑一次 npm run font 即可。
"""

import json
import re
import subprocess
import sys
from pathlib import Path

# Windows 控制台默认 GBK，直接 print 中文会炸
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

ROOT = Path(__file__).resolve().parent.parent
SRC_FONT = ROOT / "scripts" / "fonts" / "PuHuiTi-src.woff2"
OUT_FONT = ROOT / "src" / "assets" / "fonts" / "PuHuiTi-subset.woff2"
CHARS_TXT = ROOT / "scripts" / "fonts" / "chars.txt"

CJK = re.compile(r"[\u4e00-\u9fff]")

# ASCII 可见字符 + 常用中英文标点（只用常见的，冷门符号源字体本来也没有）
BASE_CHARS = (
    "".join(chr(c) for c in range(0x20, 0x7F))
    + "　、。〈〉《》「」『』【】〔〕〖〗"
    + "‘’“”…·•→←↑↓"
    + "，．：；？！（）［］｛｝＜＞％＆＊＋－／＝＠＃＄＾＿｀｜～"
)


def collect_chars() -> set[str]:
    chars: set[str] = set(BASE_CHARS)

    # 1. 源码里的汉字（界面文案、店招、提示语……）
    count_src = 0
    for pattern in ("*.vue", "*.ts", "*.html"):
        for path in (ROOT / "src").rglob(pattern):
            chars |= set(CJK.findall(path.read_text(encoding="utf-8")))
            count_src += 1

    # 2. 文章标题（列表卡片标题就是这套字体）
    posts_json = ROOT / "src" / "stores" / "posts.json"
    titles = []
    if posts_json.exists():
        for post in json.loads(posts_json.read_text(encoding="utf-8")):
            titles.append(post.get("title", ""))
            chars |= set(CJK.findall(post.get("title", "")))
            # 分类名也显示在标题旁边，一并收进来
            chars |= set(CJK.findall(post.get("tag", "")))

    print(f"扫描 {count_src} 个源文件 + {len(titles)} 篇文章标题")
    print(f"字符集大小：{len(chars)}")
    return chars


def run_subset(chars: set[str]) -> None:
    CHARS_TXT.parent.mkdir(parents=True, exist_ok=True)
    CHARS_TXT.write_text("".join(sorted(chars)), encoding="utf-8")

    cmd = [
        sys.executable,
        "-m", "fontTools.subset",
        str(SRC_FONT),
        f"--text-file={CHARS_TXT}",
        f"--output-file={OUT_FONT}",
        "--flavor=woff2",
        "--no-hinting",          # 丢掉 hinting 指令，屏幕渲染影响很小，体积省一截
        "--desubroutinize",      # 展开 CFF 子程序，压缩率更高
        "--drop-tables+=DSIG",   # 数字签名对网页字体没用
    ]
    print("运行 pyftsubset …")
    result = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace")
    if result.returncode != 0:
        print(result.stdout)
        print(result.stderr)
        sys.exit(f"子集化失败（退出码 {result.returncode}）")


def verify(chars: set[str]) -> None:
    from fontTools.ttLib import TTFont

    font = TTFont(OUT_FONT)
    cmap = set()
    for table in font["cmap"].tables:
        cmap |= set(table.cmap.keys())
    font.close()

    missing = sorted(ch for ch in chars if ord(ch) not in cmap)
    size = OUT_FONT.stat().st_size

    print(f"输出：{OUT_FONT.relative_to(ROOT)}  {size / 1024:.1f} KB")

    # 只关心汉字：标点缺了会自动回退到系统字体，几乎看不出来
    missing_cjk = [ch for ch in missing if "\u4e00" <= ch <= "\u9fff"]
    if missing_cjk:
        print(f"[警告] {len(missing_cjk)} 个汉字不在源字体里，会回退系统字体：{''.join(missing_cjk)}")
        print("       源字体只到 GB2312 一级字库，换更全的源字体才能补上。")
    else:
        print("校验通过：用到的汉字全部覆盖")


def main() -> None:
    # woff2 输出依赖 brotli。本机 python 3.13 没装、3.12 装了，
    # 这里自动挑一个带 brotli 的解释器重跑，省得手动切。
    try:
        import brotli  # noqa: F401
    except ImportError:
        for exe in (["py", "-3.12"], ["python3.12"], ["python3"], ["python"]):
            try:
                probe = subprocess.run(
                    exe + ["-c", "import brotli, fontTools"],
                    capture_output=True,
                    text=True,
                )
            except (FileNotFoundError, OSError):
                continue
            if probe.returncode == 0:
                print(f"当前解释器没有 brotli，改用 {' '.join(exe)} 重新执行")
                sys.exit(subprocess.run(exe + [str(Path(__file__).resolve())]).returncode)
        sys.exit("找不到带 brotli + fontTools 的 Python，先 pip install fonttools brotli")

    if not SRC_FONT.exists():
        sys.exit(f"缺源字体：{SRC_FONT}")

    chars = collect_chars()
    run_subset(chars)
    verify(chars)


if __name__ == "__main__":
    main()
