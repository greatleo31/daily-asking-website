# 「留痕」官网前端 UI/UX 规范

> 版本 v1.0 · 2026-09-01
> 适用范围：`greatleo31/daily-asking-website`（基于 earendil-works/website Apache-2.0 改建）
> 配套文档：`doc/assets-checklist.md`（素材追踪表）

---

## 1. 设计原则

1. **官网是 app 的延伸**：色彩、语气、克制程度与 Flutter 端 `lib/app/theme.dart` 保持同源（矿物白、墨绿、"克制、清晰、安静"）。
2. **纸质文人气质**：沿用 earendil 的 paper.png 纹理背景、衬线标题（Plantin Now）+ 等宽标注（Commit/Departure Mono）体系；中文字形回退系统字体栈，不引入中文 webfont。
3. **唯一动效例外**：理念段打字机效果（见 §6.1）。除此之外无玻璃拟态、无光球、无呼吸动画——与 app 设计基调一致。
4. **内容即结构**：文案一律走 `locales/{zh,en}` 语言文件（`data-i18n` 机制），页面 md 内联中文兜底。

---

## 2. 信息架构（5 页）

| 路由 | 源文件 | 模板 | 内容 |
|---|---|---|---|
| `/` | `_index.md` | `index` | 首页九区块（§4.1） |
| `/privacy/` | `privacy.md` | `page` | 隐私与数据（本地优先声明、BYOK 出站披露、日志三不记录） |
| `/feedback/` | `feedback.md` | `page` | 反馈与共建（GitHub Issues / 讨论 / 邮件） |
| `/roadmap/` | `roadmap.md` | `page` | 路线图（已完成 / 进行中 / 设想 / 明确不做） |
| `/posts/` | `posts/*.md` | `posts-index` / `updates` | 更新手记（从 CHANGELOG 改写） |

导航顺序：`留痕(logo) · 特性(锚点) · 路线图 · 更新 · GitHub ↗`；页脚：`留痕 · GitHub · Issues · MIT © 2026`。

---

## 3. 设计令牌

### 3.1 色彩（与 app `Palette` 同源）

| 令牌 | 值 | 用途 |
|---|---|---|
| `--lh-mineral-white` | `#F6F3EA` | 亮色主题底色基调（与 paper.png 叠加） |
| `--lh-ink-green` | `#2F4B3E` | **品牌主色**：标题重音、链接、按钮、图标 |
| `--lh-vermilion` | `#B8452F` | 点缀：印章元素、强调角标（慎用，每屏 ≤1 处） |
| `--lh-amber` | `#C98A2D` | 点缀：周报产物相关图形 |
| `--lh-lake-blue` | `#2E6E7E` | 点缀：面试卡产物相关图形 |
| `--lh-near-black` | `#141715` | 暗色主题底色 |
| `--lh-green-soft` | `#8FB8A4` | 暗色主题主色（链接/强调） |
| `--lh-blue-soft` | `#7FB0BF` | 暗色主题次级强调 |

对接方式：映射到 earendil `styles.css` 既有 CSS 变量（`--color-text-day/--color-text-night` 等），不改其变量名，只改值——保留原版式系统。

### 3.2 字体

| 角色 | 字体栈 |
|---|---|
| 标题/正文（拉丁） | Plantin Now Variable（自带） |
| 标注/标签/代码（等宽） | Commit Mono → Departure Mono（自带） |
| 中文字形回退 | `"PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif`（系统栈，零下载） |

中文不引入 webfont；`lang="zh"` 时标题字重 600，正文 400。

### 3.3 字号阶梯（rem）

`12 / 14 / 16 / 20 / 26 / 34 / 44`；H1 用 `clamp(2rem, 4.5vw, 2.75rem)`。

### 3.4 间距与断点

- 间距：4 的倍数（`4/8/12/16/24/32/48/64/96`）
- 断点：**375**（基准单列）/ **768**（平板，双栏）/ **1080**（桌面，内容最宽 960px 居中）
- 圆角：卡片 `12px`、手机框 `36px`、按钮 `999px`（胶囊）

---

## 4. 页面规格

### 4.1 首页（九区块，自上而下）

| # | 区块 | 内容 | 布局 |
|---|---|---|---|
| 1 | Hero | H1「每天 5 分钟留痕，构建个人技术成长图谱」+ 副标 + CTA×2（下载 APK / GitHub） | 居中单列，H1 下副标 ≤2 行 |
| 2 | 信任条 | `无账号 · 无登录 · 无云同步 · MIT 开源` | 等宽字体单行，点号分隔，桌面居中 |
| 3 | 手机主视觉 | 4 张真机截图轮显（默认静态并排，桌面 4 列→平板 2×2） | CSS 手机框（36px 圆角、1px 描边、投影） |
| 4 | 特性六卡 | 见 §6.3 图标映射 | 375 单列 / 768 两列 / 1080 三列 |
| 5 | 三步 | 01 记录 → 02 追问 → 03 产出（每步配截图 1 张） | 横向三列，移动端纵排，序号等宽字体 |
| 6 | 成长伙伴 | 四阶段横排时间线（小芽→花苞→白花→蜜蜂），一句话介绍 | 4 图等宽并排，768 以下 2×2 |
| 7 | 理念段 | 「水滴石穿，来自古人的智慧。」**打字机效果**（§6.1） | 大字居中，留白上下 ≥96px |
| 8 | FAQ | 6 条手风琴 | 单列最宽 720px |
| 9 | 更新手记 | 最新 2 篇（标题+日期+一句话） | 列表，尾部「全部更新 →」 |

### 4.2 子页通用（page 模板）

沿用 earendil `content-page > content-surface > letter-body` 书信式版式：最宽 720px、行高 1.8、段间距 1.25em、`prose-subheading` 小节头（衬线斜体）。四页均此版式，仅内容不同。

---

## 5. 组件规格

- **导航**：保留 MENU 下拉交互；外链组只留 GitHub；语言切换在页脚（zh 默认，EN 备选）
- **按钮层级**：主按钮=墨绿底白字胶囊；次按钮=1px 描边胶囊（文字色随主题）；文字链=下划线偏移 3px
- **特性卡**：纸面卡片（白底 92% 不透明、1px 边框、12px 圆角、hover 无位移仅边框加深）；图标 28px 线性 + 标题 + 2 行描述
- **手机框**：`aspect-ratio 9/19.5`、`border: 1px solid`、内部 `overflow:hidden`、截图 `object-fit: cover`
- **FAQ 手风琴**：`<details>/<summary>` 原生实现（无 JS），展开符号 `+`→`−`
- **时间线**：顶部横线 + 四节点圆点，节点下图片 + 阶段名 + 天数（等宽字体）

---

## 6. 动效规范

### 6.1 打字机（唯一新增动效）

- 触发：理念段进入视口 ≥40%（`IntersectionObserver`，`threshold: 0.4`），**只播一次**
- 行为：逐字显示「水滴石穿，来自古人的智慧。」，每字 90~120ms 随机抖动；光标 `▍` 闪烁（600ms 方波），播完光标 800ms 后淡出
- 降级：`prefers-reduced-motion: reduce` → 直接显示全文，无光标；无 JS → 文案直接可见（`.typewriter` 默认可见，JS 加类后隐藏再逐字，保证渐进增强）
- 实现：原生 JS ≤40 行，独立 `typewriter.js`，不进 `script.js`

### 6.2 全局约束

htmx 页面切换过渡（220ms/150ms 淡入淡出）原样继承；`skip-intro` 首屏 intro 动画保留；禁止新增 scroll-jacking、视差、自动轮播。

---

## 7. 素材规格

### 7.1 水滴 emblem Logo

- **意象**：水滴落下留痕——水滴轮廓 + 底部一圈涟漪弧
- **构造**：`viewBox="0 0 48 48"`，`stroke-width 3`（48 网格，约当 24 网格 1.5px）、`stroke-linejoin/cap: round`、单色 `currentColor`
  - 水滴路径：`M24 6 C24 6 13 19.5 13 28.5 a11 11 0 0 0 22 0 C35 19.5 24 6 24 6 Z`
  - 涟漪：水滴底部下方两条同心弧（`M12 40 a12 4 0 0 0 24 0` 变体， opacity 0.55 / 0.3）
- **字标**：`留痕` 宋体系（`"Noto Serif SC", "SimSun", serif`）600 字重，与 emblem 水平间距 10px
- **使用尺寸**：导航 emblem 28px、页脚 20px、暗色主题自动随 `currentColor`
- 交付：`liuhen-emblem.svg`（emblem 单体）+ `liuhen-logo.svg`（emblem+字标横排锁定版）

### 7.2 Favicon（由 emblem 派生，我来生成）

墨绿 `#2F4B3E` 圆角方底 + 矿物白水滴单路径。集合：`square.svg`、`favicon.ico`、16/32、`apple-touch-icon 180`、`android-chrome 192/512`、`site.webmanifest` 更新。

### 7.3 OG 分享图

复用 `build.py generate_og_image()` 管线：paper.png 铺底 + 顶部 logo（替换 `_static/og/earendil-logo.png` → `liuhen-logo.png`）+ 文章标题居中；`OG_TEXT_COLOR` 改 `#2F4B3E`。首页静态 OG：logo + H1 + 副标 1200×630（PIL 合成）。

### 7.4 特性图标（Lucide，ISC 许可）

内联 SVG、`width=28 height=28 stroke-width=1.5 fill=none stroke=currentColor`：

| 特性卡 | Lucide 图标 |
|---|---|
| 本地优先，隐私默认 | `lock` |
| 每日一问 | `message-circle-question` |
| 成长图谱 | `git-fork` |
| 工作室 | `file-text` |
| BYOK，AI 是选修 | `key-round` |
| 克制的工程 | `feather` |

---

## 8. i18n 规范

- `locales/config.json`：`languages` 仅 `zh`（默认，`fallbackLanguage: "zh"`）+ `en`；`namespaces` 移除 `subscribe`
- key 结构沿用：`common.*`（导航/页脚/主题/aria）、`content.*`（页面正文，`content.{page}.{block}` 三级）、`posts.*`、`errors.*`
- 页面 md 内联**中文**兜底 + `data-i18n` 指向 en 值（与 earendil 相反——earendil 内联英文；因我们中文默认）
- 新增首页区块文案全部放 `common.home.*`（`data-i18n-html` 支持内联标记）

## 9. 可访问性

对比度 ≥4.5:1（墨绿 #2F4B3E on 矿物白 #F6F3EA = 8.6:1 ✓；暗色 #8FB8A4 on #141715 = 7.9:1 ✓）；`aria-label` 全部走 i18n；FAQ 原生 `details` 键盘可用；图片 `alt` 齐备；`lang` 属性随语言切换。

## 10. 性能预算

首屏（HTML+CSS+JS，不含字体/图片）< 100KB；图片全部显式 `width/height` + `loading="lazy"`（Hero 首图除外）；字体沿用 preload 三件套；无新框架、无构建新依赖。
