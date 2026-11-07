from PIL import Image, ImageOps, ImageSequence
from pathlib import Path

A = Path('src/assets')
OUT = A / 'new'                    # 所有产物都落在这里，子目录按源路径镜像

RULE = [
    ('home_bg*', 1920, False),
    ('me_bg*', 1920, False),
    ('post_bg*', 1920, False),
    ('class_bg*', 1920, False),
    ('log_bg*', 1920, False),
    ('logo*', 360, False),
    ('name*', 200, False),
    ('QR*', 320, True),
    ('weixin*', 240, False),
    ('selfhood*', 600, False),
    ('blog_meme*', 360, False),
    ('cover/*', 480, False),
]

SKIP_SUFFIX = {'.svg', '.webp'}   # 矢量图 / 自己生成的产物，跳过
# GIF 策略：'webp' = 转成动图 webp；'keep' = 原样保留不动
GIF_MODE = 'webp'
MIN_FRAME_MS = 20                  # webp 单帧时长下限，太低了浏览器会自行抽帧


def resize_to(im, max_w):
    if im.width <= max_w:
        return im
    return im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)


def to_plain(im):
    """统一成 RGB / RGBA，保留真正的透明通道"""
    alpha = im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info)
    im = im.convert('RGBA' if alpha else 'RGB')
    if im.mode == 'RGBA' and im.getchannel('A').getextrema() == (255, 255):
        im = im.convert('RGB')          # 其实全不透明，丢掉 alpha 能省 1/4 体积
    return im


def save_static(f, out, max_w, lossless):
    with Image.open(f) as im:
        im = ImageOps.exif_transpose(im)      # 修正手机照片 EXIF 方向
        im = to_plain(im)
        im = resize_to(im, max_w)
        kw = {'format': 'WEBP', 'method': 6}
        if lossless:
            kw['lossless'] = True
        else:
            kw['quality'] = 80
        im.save(out, **kw)


def save_animated(f, out, max_w, quality=80):
    """GIF -> 动图 WebP，逐帧缩放，保留帧时长与循环次数"""
    frames, durations = [], []
    with Image.open(f) as im:
        loop = int(im.info.get('loop', 0) or 0)
        default_ms = int(im.info.get('duration', 80) or 80)
        n_src = getattr(im, 'n_frames', 1)

        for fr in ImageSequence.Iterator(im):
            ms = int(fr.info.get('duration', default_ms) or default_ms)
            frames.append(resize_to(to_plain(fr), max_w))
            durations.append(max(ms, MIN_FRAME_MS))

        if len(frames) < 2:                    # 其实只有一帧，按静图存
            frames[0].save(out, format='WEBP', quality=quality, method=6)
            return n_src, 1

        frames[0].save(
            out,
            format='WEBP',
            save_all=True,
            append_images=frames[1:],
            duration=durations,
            loop=loop,
            quality=quality,
            method=6,
        )
        return n_src, len(frames)


total_in = total_out = 0.0
seen = set()

for pat, max_w, lossless in RULE:
    for f in sorted(A.glob(pat)):
        if not f.is_file() or f.suffix.lower() in SKIP_SUFFIX:
            continue

        # 输出统一到 A/new 下，并按源文件的相对路径分目录：
        #   home_bg.png     -> new/home_bg.webp
        #   cover/blog.png  -> new/cover/blog.webp
        out = OUT / f.relative_to(A).with_suffix('.webp')
        out.parent.mkdir(parents=True, exist_ok=True)

        if out in seen:                     # 同名不同后缀，别互相覆盖
            out = out.with_name(f'{out.stem}__{f.suffix.lstrip(".").lower()}.webp')
            print(f'  ! 目标重名，{f.name} 改存为 {out.name}')
        seen.add(out)

        is_gif = f.suffix.lower() == '.gif'
        if is_gif and GIF_MODE == 'keep':
            print(f'{str(f.relative_to(A)):26s}   GIF，按策略保留原样')
            continue

        note = ''
        try:
            if is_gif:
                n_src, n_out = save_animated(f, out, max_w, 80 if not lossless else 80)
                note = f'  [{n_src}帧->{n_out}帧]'
            else:
                save_static(f, out, max_w, lossless)
        except Exception as e:
            print(f'{str(f.relative_to(A)):26s}   失败：{type(e).__name__}: {e}')
            continue

        in_kb = f.stat().st_size / 1024
        out_kb = max(out.stat().st_size / 1024, 1e-6)
        total_in += in_kb
        total_out += out_kb
        flag = '  ← 变大了，考虑保留原图' if out_kb > in_kb else ''
        print(
            f'{str(f.relative_to(A)):26s} {in_kb / 1024:6.2f}MB'
            f' -> {str(out.relative_to(A)):26s} {out_kb:7.1f}KB'
            f'  ({in_kb / out_kb:4.1f}x){note}{flag}'
        )

if total_in:
    print(
        f'\n合计 {total_in / 1024:.2f}MB -> {total_out / 1024:.2f}MB'
        f'  节省 {(1 - total_out / total_in) * 100:.1f}%'
    )
