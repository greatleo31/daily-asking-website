# 留痕 Logo · AI 生成提示词包

> 配套：`doc/ui-ux.md` §7.1（设计规格）。生成后把 PNG（≥1024px）发给开发者，
> 由开发者矢量化、组装字标锁定版、重出 favicon/OG 全套。

## 0. 策略（先读）

- **AI 只画图形，不画字**。Midjourney/Flux 等工具画「留痕」二字几乎必坏；
  即使支持中文的国产模型，Logo 字形的笔画精度也不可靠。
- 生成目标 = **水滴 + 涟漪的单色线性 emblem**，1:1 正方形构图。
- 唯一颜色：墨绿 `#2F4B3E` 线条；背景：纯白或米白 `#F6F3EA`。
- 验收标准见 §5。

---

## 1. GPT-4o / DALL·E（对话式，推荐首选）

```
设计一个极简线条 Logo 图形，不要包含任何文字。

图形内容：一滴水正落向下方的水面，水滴下方有一圈浅浅的弧形涟漪，
寓意「水滴石穿、落水留痕」。水滴形状圆润饱满：下部接近正圆，
上部收成一个柔和的尖角；涟漪只用一条弧线，断口式（不是完整圆圈）。

风格：单色细线描边图标（monoline line-art），线条粗细均匀一致，
约占画布宽度的 2%，圆头端点、圆角转折。严格扁平：无渐变、无阴影、
无 3D、无纹理、无背景装饰。

颜色：只有墨绿色 #2F4B3E 的线条，背景纯白。

构图：图形整体居中，四周留白充足（图形占画布约 55%），
水滴与涟漪的间距清晰。

气质：克制、安静、东方文人文具感；参考 Lucide / Feather 图标的
线条语言，但造型是原创的水滴。

用途：App 与网站 Logo，缩小到 16×16 像素仍可辨认。
输出：1:1 正方形。
```

生成 4~8 张挑一张；对不满意的用「保持构图，把线条加粗/变细 10%」微调。

## 2. Midjourney

```
minimalist monoline logo icon, a single water droplet falling toward a calm
surface, one shallow broken ripple arc below it, thin uniform stroke weight,
rounded line caps and joins, flat vector iconography in the language of
lucide and feather icons, solid deep ink green #2F4B3E on plain cream white
background, generous negative space, centered composition, quiet east-asian
literati stationery mood --v 6.1 --style raw --no text, letters, words,
watermark, gradient, shadow, 3d, bevel, photorealism, texture, border
```

- 比例参数默认 1:1；v7 也可用同提示词。
- 出图后**不要**用 MJ 自带的 upscale 改变线条；挑图即可。

## 3. Recraft（可直接出 SVG 矢量，强烈推荐）

操作：新建 → Image style 选 **Vector / Flat icon** → 输出格式选 **SVG**。

```
A minimalist flat vector logo icon: one water droplet with a softly pointed
top and a round belly, falling toward a single shallow broken ripple arc
below. Uniform thin monoline stroke, rounded caps, flat solid ink-green
#2F4B3E on transparent background. No text, no gradients, no shadows.
Centered with wide margins. Quiet, restrained, literati-stationery mood.
```

SVG 直出可跳过矢量化步骤，质量最高。

## 4. 即梦 / Seedream（国产，可用中文直出）

```
极简单色线性 Logo 图标：一滴圆润的水滴（上部柔和尖角、下部近正圆）
正在落向水面，下方一条浅浅的断开式涟漪弧线。细且均匀的描边线条，
圆头圆角，严格扁平无渐变无阴影无立体感。纯墨绿色 #2F4B3E 线条，
纯白背景。构图居中，大量留白。克制安静的东方文具气质。
不要出现任何文字、字母、水印。
```

## 5. Stable Diffusion / Flux（本地或liblib等）

Positive:
```
logo icon, minimalist monoline water droplet, single broken ripple arc below,
flat vector, uniform thin stroke, rounded caps, solid ink green on white
background, centered, large negative space, clean product branding
```

Negative:
```
text, letters, characters, words, watermark, signature, gradient, shadow,
3d render, photo, realistic, complex, busy, multicolor, frame, border
```

---

## 6. Favicon 变体（可选，也可由开发者从 emblem 程序化生成）

```
App icon design: a solid deep ink-green #2F4B3E rounded square,
with a single cream-white #F6F3EA water droplet centered on it,
flat minimal vector, no text, no gradient, no shadow --no text letters
```

## 7. 完整锁定版尝试（高风险，可玩票）

若想尝试带「留痕」二字的完整 Logo，只用支持中文文字的模型
（即梦 / Ideogram 3 / GPT-4o），并把文字要求写得极其具体：

```
…（同 §1 图形描述）… 在水滴图形右侧竖排两个汉字「留」「痕」，
使用思源宋体 / 华文中宋风格的衬线字形，笔画横细竖粗、起收笔干净，
文字与图形同色同宽。文字必须笔画完全正确无变形。
```

- 约定：生成失败属正常，字形有任何一笔错误即弃用。
- 保底方案永远是「AI 图形 + 开发者程序化加字」。

## 8. 验收清单（挑图时逐条过）

- [ ] 线条粗细全程一致，无渐变、无阴影、无杂色（取色确认是 #2F4B3E 系）
- [ ] 水滴轮廓一笔可辨：上部尖角柔和、下部饱满近圆
- [ ] 涟漪 ≤2 条弧，断开式，与水滴间距清晰
- [ ] 缩到 48×48 和 16×16 仍可辨认（缩小预览一遍）
- [ ] 背景纯净（纯白/米白/透明），图形周围无意外噪点
- [ ] 无任何文字笔画残留

## 9. 交付与后处理

把选中的 PNG（≥1024px，原图勿裁剪）交给开发者，后处理管线：
矢量化 → 组装 132:100 字标锁定版（程序化加「留痕」宋体字）→
重出 favicon 全套（16/32/180/192/512/ico）→ 重生成 OG 图 →
替换 `_static/liuhen-logo.svg` 并重建站点。
