# -*- coding: utf-8 -*-
"""Generate liuhen placeholder assets: favicons, OG logo, screenshot placeholders."""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

STATIC = Path(r"D:\new-daily-asking\daily-asking-website\_static")
INK = (47, 75, 62)        # #2F4B3E
MINERAL = (246, 243, 234) # #F6F3EA
WHITE = (255, 255, 255)

CJK_FONT = r"C:\Windows\Fonts\msyh.ttc"


def font(size):
    return ImageFont.truetype(CJK_FONT, size)


def draw_drop(draw, cx, cy, s, fill):
    """Water drop: circle of radius s at (cx,cy) + tip up to (cx, cy - 2.4s)."""
    draw.ellipse([cx - s, cy - s, cx + s, cy + s], fill=fill)
    tip_y = cy - int(2.3 * s)
    left = (cx - s + 2, cy)
    right = (cx + s - 2, cy)
    # concave sides via two quadratic-ish polygon halves
    mid_l = (cx - int(0.35 * s), cy - int(1.9 * s))
    mid_r = (cx + int(0.35 * s), cy - int(1.9 * s))
    draw.polygon([left, mid_l, (cx, tip_y), mid_r, right], fill=fill)


# ---- 1) favicon PNG set: ink rounded square + mineral drop ----
def make_icon(size):
    img = Image.new("RGBA", (512, 512), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([16, 16, 496, 496], radius=110, fill=INK + (255,))
    draw_drop(d, 256, 300, 105, MINERAL + (255,))
    # ripple arc
    d.arc([136, 396, 376, 500], start=200, end=340, fill=MINERAL + (200,), width=18)
    return img.resize((size, size), Image.LANCZOS)


FAV = STATIC / "favicon"
for s in (16, 32, 180, 192, 512):
    name = {
        180: "apple-touch-icon.png",
        192: "android-chrome-192x192.png",
        512: "android-chrome-512x512.png",
    }.get(s, f"favicon-{s}x{s}.png")
    make_icon(s).save(FAV / name)

ico = make_icon(256)
ico.save(FAV / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
print("favicons done")

# ---- 2) square.svg rewrite ----
(FAV / "square.svg").write_text(
    '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">'
    '<rect width="512" height="512" rx="110" fill="#2F4B3E"/>'
    '<path d="M256 96c-22 34-58 74-58 122 0 42 27 72 58 72s58-30 58-72c0-48-36-88-58-122Z" fill="#F6F3EA"/>'
    '<path d="M148 420c32 14 68 22 108 22s76-8 108-22" stroke="#F6F3EA" stroke-width="18" '
    'stroke-linecap="round" fill="none" opacity=".8"/></svg>',
    encoding="utf-8",
)
print("square.svg done")

# ---- 3) OG logo (transparent, aspect 1.32, ink on clear) ----
og = Image.new("RGBA", (528, 400), (0, 0, 0, 0))
d = ImageDraw.Draw(og)
draw_drop(d, 130, 250, 82, INK + (255,))
d.arc([40, 330, 220, 430], start=200, end=340, fill=INK + (210,), width=14)
f = font(150)
d.text((260, 60), "留痕", font=f, fill=INK + (255,))
og.save(STATIC / "og" / "liuhen-logo.png")
print("og logo done")

# ---- 4) screenshot placeholders 405x878 ----
SCREENS = STATIC / "screens"
SCREENS.mkdir(exist_ok=True)
shots = [
    ("journal", "今日记录", "记录今天的一件真实小事"),
    ("question", "每日一问", "追问补全：结果 · 背景 · 行动 · 难点 · 贡献"),
    ("map", "成长图谱", "按时间与标签检索全部证据"),
    ("studio", "工作室", "一键生成简历要点 / 周报 / 面试卡"),
]
for name, title, sub in shots:
    img = Image.new("RGB", (405, 878), MINERAL)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, 404, 877], outline=INK, width=2)
    d.text((202, 380), title, font=font(44), fill=INK, anchor="mm")
    # wrap subtitle
    d.text((202, 445), "· · ·", font=font(28), fill=INK, anchor="mm")
    for i, line in enumerate([sub[i:i + 12] for i in range(0, len(sub), 12)][:3]):
        d.text((202, 500 + i * 38), line, font=font(22), fill=INK, anchor="mm", opacity=180)
    d.text((202, 830), "留痕 · 截图待替换", font=font(20), fill=INK, anchor="mm")
    img.save(SCREENS / f"{name}.jpg", "JPEG", quality=88)
print("screens done")
