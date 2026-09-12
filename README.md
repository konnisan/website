# Konni Pixel Alchemy

Konni 的像素 / 炼金 / 魔法 / 精灵主题个人主页，基于 Next.js App Router。

## 本地运行

```bash
pnpm install
pnpm dev
```

然后访问 `http://localhost:3000`。

环境建议：

- Node.js >= 22.13.0
- pnpm 11.x

## 构建

```bash
pnpm build
pnpm start
```

## 部署到 Vercel

1. 在 Vercel 中选择 **Add New → Project**。
2. 导入 GitHub 仓库 `konnisan/website`。
3. Framework Preset 选择/自动识别为 **Next.js**。
4. 不需要额外环境变量，直接 Deploy。
5. 后续每次 push 到 `main` 会自动触发生产部署；其他分支和 Pull Request 会生成 Preview Deployment。

## 项目入口

- `app/page.tsx`：页面结构与交互
- `app/globals.css`：布局、主题和炼金互动样式
- `app/assets.css`：生产图片资源映射
- `public/`：像素背景、昼夜素材、炼金素材和 favicon
