# -*- coding: utf-8 -*-
"""Generate 留痕 brand assets from the finalized emblem design.

Replicates doc/logo-source/emblem-favicon-variant.jpg:
ink-green rounded square, cream water drop, ripple ring passing behind the drop.
Outputs: favicon PNG set + ICO + og/liuhen-logo.png.
"""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import math

STATIC = Path(__file__).resolve().parent.parent / "_static"
INK = (47, 75, 62)         # #2F4B3E
CREAM = (246, 243, 234)    # #F6F3EA
CJK_FONT = r"C:\Windows\Fonts\msyhbd.ttc"


def font(size):
    try:
        return ImageFont.truetype(CJK_FONT, size)
    except OSError:
        return ImageFont.truetype(r"C:\Windows\Fonts\msyh.ttc", size)


def drop_points(cx, cy, s):
    """Sample the teardrop path (matches the SVG geometry, s = 512-scale/2)."""
    # s: half-width of the belly circle; geometry per 512 canvas is cx=256, cy=256, s=79
    def bez(p0, p1, p2, p3, n=24):
        return [
            (
                (1 - t) ** 3 * p0[0] + 3 * (1 - t) ** 2 * t * p1[0] + 3 * (1 - t) * t ** 2 * p2[0] + t ** 3 * p3[0],
                (1 - t) ** 3 * p0[1] + 3 * (1 - t) ** 2 * t * p1[1] + 3 * (1 - t) * t ** 2 * p2[1] + t ** 3 * p3[1],
            )
            for t in (i / n for i in range(n + 1))
        ]

    left = bez((cx, cy - int(1.75 * s)), (cx - int(0.24 * s), cy - int(1.34 * s)),
               (cx - s, cy - int(0.58 * s)), (cx - s, cy))
    # bottom arc: 180° -> 90°(bottom, y down) -> 0°
    arc = [
        (cx + s * math.cos(math.radians(a)), cy + s * math.sin(math.radians(a)))
        for a in range(180, -1, -6)
    ]
    right = bez((cx + s, cy), (cx + s, cy - int(0.58 * s)),
                (cx + int(0.24 * s), cy - int(1.34 * s)), (cx, cy - int(1.75 * s)))
    return left + arc + right


def draw_ring(d, cx, cy, rx, ry, color, width):
    d.ellipse([cx - rx, cy - ry, cx + rx, cy + ry], outline=color, width=width)


def make_icon(size=512):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    k = size / 512
    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=int(105 * k), fill=INK + (255,))
    draw_ring(d, int(256 * k), int(351 * k), int(133 * k), int(33 * k), CREAM + (255,), max(2, int(20 * k)))
    d.polygon([(x * k, y * k) for x, y in drop_points(256, 256, 79)], fill=CREAM + (255,))
    return img


FAV = STATIC / "favicon"
for s, name in [(16, "favicon-16x16.png"), (32, "favicon-32x32.png"),
                (180, "apple-touch-icon.png"), (192, "android-chrome-192x192.png"),
                (512, "android-chrome-512x512.png")]:
    make_icon(s).save(FAV / name)

make_icon(256).save(FAV / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
print("favicons done")

# ---- OG logo lockup: emblem + 留痕 (aspect 1.32 = 528x400) ----
og = Image.new("RGBA", (528, 400), (0, 0, 0, 0))
d = ImageDraw.Draw(og)
draw_ring(d, 130, 268, 104, 26, INK + (255,), 16)
d.polygon([(x * 0.5, y * 0.5) for x, y in drop_points(256, 256, 79)], fill=INK + (255,))
d.text((255, 60), "留痕", font=font(150), fill=INK + (255,))
og.save(STATIC / "og" / "liuhen-logo.png")
print("og logo done")
