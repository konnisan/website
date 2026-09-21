# Konni Website

当前仓库只保留首页开发所需源码、运行/构建配置，以及正在验证的白发水手帽角色素材。

## 关键目录

```text
app/
  page.tsx                # 当前首页
  globals.css             # 首页样式

public/
  avatar-head/            # 首页暂用 idle / sleep；白发角色接入后再移除
  avatar-white-sailor/
    reference.png         # 白发水手帽角色中心参考图
    layered/
      face-back.png       # 固定底层
      iris-left.png       # 左虹膜/瞳孔，唯一运动层之一
      iris-right.png      # 右虹膜/瞳孔，唯一运动层之一
      face-front.png      # 固定眼皮/睫毛前景遮挡
  avatar-puppet-lab.html  # 独立眼球跟随实验页

tests/
  avatar-puppet.playwright.mjs

docs/superpowers/specs/
  2026-09-20-konni-eye-tracking-design.md
```

`outputs/` 仅用于本地 Playwright 截图和调试产物，已被 Git 忽略，不进入仓库。

## 当前眼球方案

人物本体不移动。运行时只有左右虹膜根据鼠标位置移动，图层顺序固定为：

```text
face-back
→ iris-left / iris-right
→ face-front
```

眼球移动到眼眶边缘时由 `face-front` 自然遮挡，不使用矩形眼眶裁剪，也不切换整张人脸方向图。

## 本地运行

```bash
pnpm install
pnpm dev
```

## 白发角色 Playwright 验证

```bash
node tests/avatar-puppet.playwright.mjs
```

测试会检查中心/八方向/圆周轨迹、固定人物图层、PNG 尺寸、图层顺序以及浏览器错误，并把截图写入 `outputs/avatar-puppet/`。

## 常用检查

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```
