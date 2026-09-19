# Konni Website × lvy-neko Incremental Roadmap

> Status: active
>
> Reference: https://lvyovo-wiki.tech/
>
> Repository: `konnisan/website`
>
> Primary execution model: AgentDock small-step iterations
>
> Updated: 2026-09-19

## 1. Goal

本项目的目标不是重新设计一个泛化的个人主页，也不是逐像素复制 lvy-neko。当前方向已经明确：**以 lvy-neko 的页面规划、内容组织、卡片式桌面感、柔和玻璃拟态和个人技术博客气质为核心参考，在现有 Konni 首页骨架上逐步补全真实内容、独立素材、子页面、交互和细节。**

最终站点应保留 Konni 自己的视觉身份：原创像素魔法世界、青绿/薄荷绿、奶白、低饱和金色、轻 RPG / 魔法工坊氛围。可以受童话魔法类游戏气质启发，但不复制具体角色、场景、Logo 或受保护素材。

开发策略固定为：

```text
先完成首页
→ 再完成 projects/about/blog/share/bloggers
→ 再做细节强化
→ 最后考虑低优先级实验功能
```

不进行一次性全站重构。

---

## 2. Current State

### 2.1 已有核心实现

当前首页主要实现位于：

- `app/page.tsx`
- `app/globals.css`
- `public/`

当前首页已经具备与 lvy-neko 首页规划高度对应的骨架：

- 左侧品牌与主导航
- Banner / Wall Art
- `Good Afternoon / Evening` + Konni Avatar
- 时钟
- 日历
- 社交链接 Dock
- 最新文章卡片
- 随机推荐卡片
- 音乐播放器
- 喜欢按钮
- 日/夜主题切换
- 设置按钮
- 桌面固定构图 + 移动端 fallback
- 玻璃拟态卡片
- 卡片入场动效

### 2.2 已完成的视觉基线

`design-qa.md` 已经记录了首页桌面端与 lvy-neko 的第一阶段对照结果，包括：

- 1363 × 936 桌面设计基线
- 左中右三列主要卡片坐标
- Banner、Hero、Clock、Calendar、Article、Recommendation、Player 等尺寸
- Theme / Settings 位置
- 无固定超大截图画布溢出
- 主题切换、日历、播放器、Like 等交互

因此后续任务**不能再把“重新做布局骨架”作为默认目标**。

### 2.3 当前明显 placeholder

以下内容目前只是占位或模拟交互，后续必须逐步替换：

| 当前项 | 当前状态 | 后续目标 |
|---|---|---|
| 主导航 | 仅修改 active + toast | 跳转真实页面 |
| `hello@example.com` | 假邮箱 | TODO: 替换真实联系方式或删除 |
| Bilibili | toast | TODO: 真实链接 |
| 洛克王国入口 | toast | TODO: 确认最终用途 |
| 最新文章 | 假数据 | 真实文章数据源 |
| 随机推荐 | 假数据 | 真实 share 数据源 |
| 音乐播放器 | 仅 play/pause 状态 | 真实音频、封面和播放状态 |
| 设置按钮 | toast | 实际设置面板或删除 |
| Hero Avatar | 从大图裁切 | 独立头像素材 |
| Banner | 从大图裁切 | 独立 Wall Art 素材 |
| Article Thumb | 从大图裁切 | 独立文章缩略图 |
| Share Thumb | 从大图裁切 | 独立推荐缩略图 |
| day/night art | 一张大图承担多种用途 | 拆成独立素材体系 |

---

## 3. Reference Breakdown

### 3.1 首页 `/`

参考重点不是复制图片，而是以下页面节奏：

```text
品牌 / 主导航
→ 强个人身份 Hero
→ 视觉记忆点
→ 社交入口
→ 最新内容
→ 推荐内容
→ 小型功能组件
```

当前 Konni 首页已经具有相似模块数量与空间关系，因此下一阶段应该关注：

- 独立素材质量
- 真实内容密度
- 卡片内部排版
- hover / focus / press 反馈
- 组件间视觉统一
- 文案完整度
- 页面跳转

### 3.2 Projects `/projects`

建议保留 lvy-neko 的信息层级：

```text
项目封面
项目名
年份
标签 / 技术
一句话简介
项目入口 / GitHub
```

Konni 版本使用自己的真实项目，不复制 lvy 的项目内容。

### 3.3 Blog `/blog`

核心结构：

```text
页面标题
年份 / 日期
文章标题
Tag
摘要（可选）
```

目标是形成轻量技术博客，不优先引入 CMS。

### 3.4 Article `/blog/[slug]`

核心结构：

- 标题
- 日期
- Tag
- 阅读正文
- 图片
- 代码块
- 可选目录
- 上一篇 / 下一篇

### 3.5 About `/about`

About 不做简历网站式大段堆叠，建议继续保持 lvy-neko 的轻个人主页气质：

- Konni 简介
- 技术方向
- 当前在做什么
- 兴趣
- 一组小型像素魔法装饰素材
- 联系入口

### 3.6 Share `/share`

用于承接首页“随机推荐”：

- 网站
- 工具
- 文章
- 游戏 / 视觉灵感
- 技术资源

采用小卡片 + 分类，不做复杂信息流。

### 3.7 Bloggers `/bloggers`

作为后期页面：

- Search
- 分类切换
- Avatar
- Name
- URL
- 一句话描述

当前优先级低于首页、Projects、Blog、About。

---

## 4. Gap Matrix

| 能力 | 当前状态 | 优先级 | 处理方式 |
|---|---|---:|---|
| 首页桌面骨架 | 已完成 | Done | 不重做 |
| 首页主题切换 | 已完成 | Done | 后续仅 polish |
| 首页内容真实性 | 缺失 | P0 | 替换 placeholder |
| 独立 Avatar | 缺失 | P0 | 生成原创素材 |
| 独立 Banner | 缺失 | P0 | 生成原创素材 |
| Article / Share 缩略图 | 缺失 | P0 | 生成素材 |
| 导航真实路由 | 缺失 | P0 | 新建页面并改 Link |
| Projects | 缺失 | P1 | 数据驱动页面 |
| About | 缺失 | P1 | 独立页面 |
| Blog List | 缺失 | P1 | Markdown / MDX |
| Article Page | 缺失 | P1 | Markdown / MDX |
| Share | 缺失 | P2 | 分类数据页 |
| Bloggers | 缺失 | P2 | 搜索 + 卡片 |
| 真实音乐 | 缺失 | P2 | 确认版权后实现 |
| Settings | 缺失 | P3 | 有明确功能再做 |
| Live2D | 不需要当前实现 | P3 | 暂不进入主线 |
| 大面积 AI 背景图 | 已放弃为核心方向 | Locked | 不重新引入 |

---

## 5. Design Tokens

当前设计语言继续沿用，而不是改成另一套模板。

### 5.1 Core Palette

```text
Mint / Teal       主强调
Warm White        主卡片背景
Soft Gray Green   页面环境色
Muted Gold        小范围点缀
Deep Navy         夜间背景
Soft Cyan         夜间强调
```

当前 `app/globals.css` 中已经存在：

- `--ink`
- `--muted`
- `--brand`
- `--card`
- `--card-border`
- `--shadow`

后续优先在现有 token 上迭代，避免组件内大量硬编码新色值。

### 5.2 Shape

继续保留：

- 大卡片高圆角
- 小功能组件较小圆角
- 头像圆形
- 导航 active pill
- 柔和而非锋利的轮廓

### 5.3 Visual Rule

**减少 AI 味的核心不是继续增加细节，而是减少无意义细节。**

素材应满足：

- 轮廓清楚
- 像素块关系明确
- 局部细节有限
- 色阶数量受控
- 不使用复杂电影级体积光
- 不使用过多粒子
- 不使用大量锐利金属结构
- 不使用高度写实纹理

---

## 6. Homepage Iterations

首页必须先从“骨架可用”提升到“完成品”。

### Iteration H1 — 独立 Avatar

Status: waiting_for_approval

Concept decision (2026-09-19):

- 用户批准“原创像素精灵 + Day/Night + 轻待机动画 + 完整动作设计”的视觉方向。
- 用户否决了首版几何 SVG 实现，因为它与已批准的角色预览不一致。
- 当前实现改为直接使用从已批准概念图中提取的像素精灵 PNG，优先保证角色造型一致；完整动作帧在基础造型获批后继续补齐。
- 当前已增加 H1 动态实现：轻待机、鼠标轻微跟随、hover 问候与星光、click 开心跳跃与爱心，以及 Avatar 上方联动状态块；仍处于 waiting_for_approval。
- 当前动作实现已升级为真实像素帧：128×128 有效 PNG 的 `idle / blink / wave / look-left / look-right / happy`；鼠标进入先挥手，随后按鼠标左右位置切换观察帧，点击切换开心表情，空闲自动眨眼。旧 96×96 截断 PNG 已替换。
- 当前网页已切换到 `public/avatar-final/` 最终动作集：`idle / blink / wave / look-left / look-right / happy / thinking / sleep`。其中 hover 约 1.8s 进入 thinking，Night 模式静置约 8s 进入 sleep；8 张图统一 128×128、统一人物锚点，仍处于 waiting_for_approval。
- YOLO H1 像素头像收敛：网页已切换到 `public/avatar-head/` 头部专用动作集；不再显示全身。角色固定为同一帽子/发型/配色，统一 128×128；鼠标在页面任意位置移动都会驱动左右观察帧，约 12s 全局无操作进入带枕头的 sleep，任意 pointer/keyboard 操作立即唤醒。外部星光/爱心效果已移除，动作反馈回到角色本体。
- YOLO Iteration 2：取消运行时 `look-left/look-right` 整图切换，删除对应两张旧资源；idle 头像保持同一 PNG，仅叠加两只 6×8 像素眼睛，内部 2×4 眼神像素按全局鼠标位置量化移动 `-1/0/+1px`（横向与纵向）。这样鼠标跟随只改变眼睛，不再引起帽子、头发、脸型细节跳变；wave / happy / thinking / pillow sleep 保留独立动作图。
- YOLO Iteration 3：无操作状态改为连续动作链。约 8.5s 无输入先进入 `sleepy`（闭眼并轻微低头），约 12s 进入带枕头 `sleep`；睡眠/困倦时任意 pointer 或 keyboard 输入先播放约 650ms 的 `wake` 抬头帧，再恢复 `idle` 和眼神跟随。`sleepy` / `wake` 均由当前同一头像帧直接做像素位移派生，不重新生成角色外观。
- YOLO Iteration 4：眼睛跟随层改为严格服从头像本身的 2×2 macro-pixel 网格。眼神位移由 `-1/0/+1px` 调整为 `-2/0/+2px`，避免半格落点；眼眶使用从 idle PNG 实际采样的 `#251a27 / #352430` 深棕像素，眼神高光使用 `#f6d39b / #fce9d4` 两级 2px 像素。Night 同步换为冷蓝深色眼眶与高光，仍保持同一 idle `src`，不切整张头像。
- YOLO Iteration 5：自动眨眼从“完整闭眼 PNG 覆盖”改为眼睛局部 CSS 像素眼皮序列，按 `open → half → closed → half → open` 播放，并继续遵守 2px macro-pixel 网格。blink 全程不切换头像 `src`、不修改 `--eye-x / --eye-y`，因此睁眼后直接恢复眨眼前的鼠标视线；旧 `konni-head-blink.png` 已从最终资源集中删除。Day/Night 均完成自然 blink 连续性验证。
- YOLO Iteration 6：共享像素眼睛层从 idle 扩展到 `wave / thinking / wake`。其中 wave/thinking 复用 idle 锚点，wake 因头像整体上移 2px 将眼睛层同步上移到 `top: 76px`；`happy / sleepy / sleep` 保持闭眼，不叠加跟随层。全局 pointermove 不再强制取消 thinking，因此思考状态也可持续追踪鼠标。Day/Night 均完成 wave 与 thinking 的真实眼神跟随验证，wake 也完成唤醒时追踪验证。
- YOLO Iteration 7：`wave` 从整张动作 PNG 切换改为 `idle head + shared eyes + wave-hand overlay`。手势层只保留原 wave 图左侧 `24×36px` 的必要局部并放回统一 128×128 透明画布，运行时仅手势层按 2px 整数网格位移；主头像始终保持 idle，不再让帽子、头发、脸型随挥手发生整图变化。旧 `konni-head-wave.png` 已从最终资源集中删除，Day/Night Playwright 均验证主头像不变、手势层存在且眼神继续跟随。
- 当前网页实现仍需用户基于 Playwright 结果做视觉审批，尚未标记 approved/completed。

目标：不再从 `konni-ai-day.png` / `konni-ai-master.png` 裁头像。

修改范围：

- `public/`
- `app/globals.css`
- 必要时 `app/page.tsx`

新增素材：

```text
public/avatar-konni-day.png
public/avatar-konni-night.png
```

验收：

- 头像在 120 × 120 显示时依然清楚
- day/night 角色身份一致
- 不依赖超大图 background-position
- 与 Hero 卡片色调一致

### Iteration H2 — 独立 Banner / Wall Art

目标：Banner 成为首页主要视觉记忆点，但不重新变成全屏背景。

新增：

```text
public/banner-konni-day.png
public/banner-konni-night.png
```

验收：

- 360 × 200 卡片中无需大比例裁切
- 视觉中心明确
- 像素魔法工坊 / 城堡 / 植物 / 星光元素只保留 1–2 个主体
- 不出现密集 AI 细节

### Iteration H3 — Article / Share 独立缩略图

新增：

```text
public/thumb-article-001.png
public/thumb-share-001.png
```

验收：

- 48 × 48 时依然可识别
- 不从 Banner 或主图硬裁切
- 视觉主题与内容匹配

### Iteration H4 — 真实首页内容

处理：

- 最新文章标题
- 摘要
- 日期
- 随机推荐标题
- 随机推荐摘要
- 社交链接
- Email

所有未知信息使用 `TODO`，禁止 AgentDock 自行虚构个人资料。

### Iteration H5 — Navigation Routes

把：首页 / 日志 / 项目 / 关于 / 链接

从：

```text
button → setActive → toast
```

逐步切换为真实路由。

建议映射：

```text
首页  /
日志  /blog
项目  /projects
关于  /about
链接  /share 或 /bloggers
```

最终“链接”对应 Share 还是 Bloggers，在实现前保留 TODO。

### Iteration H6 — Micro Interaction Polish

仅在内容和素材完成后处理：

- card hover
- nav active transition
- avatar hover
- social dock hover
- thumbnail hover
- theme toggle transition
- page enter

原则：

```text
轻微位移
轻微亮度变化
轻微阴影变化
```

禁止所有卡片同时大幅弹跳。

---

## 7. Subpage Roadmap

### Phase P1 — Projects

建议文件：

```text
app/projects/page.tsx
components/project-card.tsx
content/projects.ts
public/projects/*
```

先完成 3–6 个真实项目。

项目数据：

```ts
{
  name,
  year,
  image,
  tags,
  description,
  links
}
```

### Phase P2 — About

建议文件：

```text
app/about/page.tsx
content/about.ts
public/about/*
```

内容必须来自真实资料，未知部分保持 TODO。

### Phase P3 — Blog

建议：Markdown / MDX 优先。

```text
app/blog/page.tsx
app/blog/[slug]/page.tsx
content/posts/*
```

先支持：

- 标题
- 日期
- Tags
- 摘要
- Cover
- Markdown 正文

### Phase P4 — Share

```text
app/share/page.tsx
content/share.ts
```

用于承接首页随机推荐。

### Phase P5 — Bloggers

后期再实现：

```text
app/bloggers/page.tsx
content/bloggers.ts
```

包括搜索与分类。

---

## 8. Asset Manifest

### 8.1 当前可继续使用

| 文件 | 状态 | 用途 |
|---|---|---|
| `public/favicon.svg` | 保留 | Brand / favicon |
| `public/alchemy-sprite-atlas.png` | 保留 | 炼金玩法 / 像素素材 |
| `public/alchemy-sprite-atlas.webp` | 保留 | 轻量版本 |
| `public/konni-ai-day.png` | 临时保留 | 当前 day 大图来源 |
| `public/konni-ai-master.png` | 临时保留 | 当前 night 大图来源 |
| `public/konni-workshop-day-preview.png` | 参考 | 视觉方向备选 |
| `public/konni-workshop-night-preview.png` | 参考 | 视觉方向备选 |

### 8.2 P0 素材

#### A01 — Day Avatar

```yaml
filename: avatar-konni-day.png
usage: Hero avatar
ratio: 1:1
recommended_source_size: 512x512
transparent_background: preferred
keywords:
  - pixel art
  - soft mint green
  - magical workshop
  - friendly
  - simple silhouette
avoid:
  - realistic face
  - excessive jewelry
  - complex background
  - heavy particle effects
```

Prompt draft:

```text
Original pixel-art profile avatar for a personal developer website, a gentle fantasy magic-workshop character, mint green and warm cream palette, simple readable face and hair silhouette, subtle low-saturation gold accent, clean dark pixel outline, restrained shading, limited color palette, soft friendly expression, transparent or very simple background, optimized to remain recognizable at 120x120 pixels, no text, no logo, no copyrighted game character, no photorealism, no complex particles.
```

#### A02 — Night Avatar

与 A01 同一角色，只改变夜间光照：

```text
deep navy + cyan rim light + muted gold
```

不能重新设计成另一个角色。

#### A03 — Day Banner

```yaml
filename: banner-konni-day.png
usage: homepage banner
ratio: 9:5 approximately
recommended_source_size: 1080x600
transparent_background: false
keywords:
  - pixel magic workshop
  - mint greenhouse
  - tiny castle silhouette
  - daylight
  - calm
avoid:
  - full-screen wallpaper composition
  - excessive tiny props
  - cinematic realism
  - dense AI texture
```

Prompt draft:

```text
Original pixel-art wall illustration for a personal developer homepage banner, compact magical workshop scene, mint green plants, warm cream stone, a small alchemy desk and one subtle fantasy tower silhouette, soft daylight, low-saturation gold accents, limited palette, clear large pixel clusters, intentionally simplified shapes, calm and cozy, designed for a 360x200 glass card, no characters required, no text, no logo, no copyrighted game scene, avoid cinematic realism and excessive micro-details.
```

#### A04 — Night Banner

同构图夜间版本，保证日夜切换不会造成布局识别跳变。

#### A05 — Article Thumb 001

```yaml
filename: thumb-article-001.png
usage: latest article
ratio: 1:1
recommended_source_size: 256x256
```

要求：48 × 48 下可识别。

#### A06 — Share Thumb 001

```yaml
filename: thumb-share-001.png
usage: random recommendation
ratio: 1:1
recommended_source_size: 256x256
```

### 8.3 P1 素材

```text
projects/project-001.png
projects/project-002.png
projects/project-003.png
about/about-decoration-001.png
about/about-decoration-002.png
blog/covers/post-001.png
blog/covers/post-002.png
```

### 8.4 P2 素材

```text
bloggers/default-avatar.png
music/cover-001.png
share/category-tool.png
share/category-reading.png
share/category-game.png
```

---

## 9. Content Manifest

以下内容必须逐项确认，AgentDock 不得自行编造：

```text
[TODO] GitHub 之外的社交链接
[TODO] Bilibili 地址
[TODO] 联系邮箱
[TODO] Hero 简介
[TODO] About 文案
[TODO] Projects 真实项目列表
[TODO] Blog 第一批文章
[TODO] Share 第一批推荐项
[TODO] 音乐来源与版权
[TODO] “链接”导航最终指向 Share 还是 Bloggers
```

可以自动生成的是：

- 页面结构
- UI 占位 schema
- 图片生成 prompt
- TODO 文件
- 组件样式

不能自动虚构的是：

- 个人经历
- 真实项目成果
- 真实联系方式
- 账号地址
- 文章内容事实

---

## 10. Interaction / Motion Spec

### Entry

现有 `card-enter` 可以继续保留。

建议范围：

```text
duration: 500–750ms
translateY: 8–18px
scale: 0.96–1.00
blur: very small
```

### Hover

```text
card: y -2px ~ -4px
image: scale 1.01 ~ 1.025
button: brightness / background transition
```

### Theme

Theme 切换重点应该是：

- token 平滑变化
- day/night asset 同步切换
- 不发生布局位移

### Reduced Motion

必须保留现有 `prefers-reduced-motion` 处理。

---

## 11. Responsive Spec

当前用户目标仍以桌面端为优先，不要求现在围绕手机重新设计全站。

### Desktop baseline

```text
1363 × 936
```

这个尺寸继续作为视觉对照主基线。

### Additional desktop checks

```text
1440 × 900
1600 × 900
1920 × 1080
```

重点检查：

- 组件整体是否继续保持居中
- 是否因为 scale 导致文字过小
- 页面四周留白是否自然
- 顶部 / 底部是否被裁切

### Mobile

移动端保持“可用”，但暂不以高仿 lvy 为主线：

```text
390 × 844
```

后续单独开移动端阶段。

---

## 12. AgentDock Loop

AgentDock 后续不得使用：

```text
“整体优化一下网站”
“把网页变得更像 lvy”
“把细节都补齐”
```

这种不可控任务。

固定采用：

```text
读取当前 roadmap + design-qa
→ 查看当前代码
→ 选择 1–3 个最高优先级小改动
→ 修改
→ lint / build
→ 启动页面
→ 浏览器截图
→ 与 lvy reference / 当前 baseline 对比
→ 记录差异
→ ACCEPT 或 FIX
→ 更新 roadmap 状态
→ 下一轮
```

### 单轮限制

```yaml
max_primary_goals: 3
max_unrelated_routes: 0
must_build: true
must_visual_check: true
must_update_roadmap: true
```

### 推荐单轮输出

```md
## Iteration YYYY-MM-DD-NN

Status: ACCEPTED / FIX REQUIRED / BLOCKED

Goal:
- ...

Files changed:
- ...

Visual difference:
- ...

Verification:
- lint:
- build:
- browser:

Remaining gap:
- ...

Next target:
- ...
```

---

## 13. Acceptance Checklist

### Homepage Completion

- [ ] Avatar 使用独立素材
- [ ] Banner 使用独立素材
- [ ] Article Thumb 使用独立素材
- [ ] Share Thumb 使用独立素材
- [ ] 不依赖一张大图裁出所有内容
- [ ] 首页真实社交链接完成
- [ ] 首页真实内容完成
- [ ] 主导航进入真实页面
- [ ] 音乐播放器明确保留真实功能或降级为静态组件
- [ ] Settings 明确实现或删除
- [ ] light theme 视觉检查通过
- [ ] dark theme 视觉检查通过
- [ ] 1363 × 936 视觉检查通过
- [ ] 1440 × 900 视觉检查通过
- [ ] 1920 × 1080 视觉检查通过
- [ ] lint pass
- [ ] production build pass

### Subpages

- [ ] `/projects`
- [ ] `/about`
- [ ] `/blog`
- [ ] `/blog/[slug]`
- [ ] `/share`
- [ ] `/bloggers`（可后置）

---

## 14. Decision Log

### D001 — lvy-neko 是明确参考对象

状态：Locked

不再将 “lvy” 理解为泛化设计风格。

### D002 — 不重新规划首页骨架

状态：Locked

当前首页已有可用骨架，后续以细节、内容、素材和真实页面为主。

### D003 — 放弃全屏复杂背景图路线

状态：Locked

此前尝试过复杂背景图，但在不同分辨率裁切、视觉负担和 AI 痕迹方面效果不理想。

后续：

- 不把大背景图作为核心视觉
- 页面环境背景保持克制
- 将视觉预算集中到独立 Banner、Avatar、缩略图和项目封面

### D004 — 素材必须独立化

状态：Active

当前一张 day/night 大图承担 Avatar、Banner、Article Thumb、Share Thumb 等多个用途，只作为阶段性实现。

后续逐项拆分。

### D005 — 首页优先于全站扩张

状态：Locked

在首页达到“完成品”之前，不同时大规模开发所有子页面。

---

## 15. Immediate Next Queue

当前下一步固定为：

```text
1. 生成并接入独立 day/night Avatar
2. 生成并接入独立 day/night Banner
3. 生成 Article / Share 两张 1:1 缩略图
4. 重新做一次首页 desktop visual QA
5. 再开始真实导航路由
```

这五项完成前，不进入 Projects / Blog 的大规模开发。

---

## 16. Progress Log

### 2026-09-19

- [x] 明确 lvy-neko 为唯一核心网页参考对象
- [x] 确认当前首页已经具备主要结构骨架
- [x] 确认后续策略改为“慢慢填充细节”
- [x] 确认素材生成是下一阶段核心工作
- [x] 确认不再以复杂全屏背景图为主要方向
- [x] 建立本长期 Roadmap
- [ ] H1 独立 Avatar
- [ ] H2 独立 Banner
- [ ] H3 独立缩略图
- [ ] H4 首页真实内容
- [ ] H5 Navigation Routes
