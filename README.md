# Konni Pixel Alchemy — deployed source snapshot

This package contains the exact tracked source used for the deployed homepage.

- Branch: `main`
- Commit: `33e23fa0ac07d6b5eae81ee327e111660bf7d082`
- Commit subject: `Add alchemy puzzle to homepage`
- Source directory: `source/`

## Important files

- `source/app/page.tsx` — page structure and interactions
- `source/app/globals.css` — layout, day/night theme, animation and alchemy game styles
- `source/public/konni-ai-master.png` — night artwork
- `source/public/konni-ai-day.png` — day artwork
- `source/public/alchemy-sprite-atlas.png` — alchemy materials and portal

## Run locally

```bash
cd source
pnpm install
pnpm dev
```

## Production build

```bash
cd source
pnpm build
```

This is the real React/Vinext source project, not a rewritten standalone HTML file. The final HTML and JavaScript bundles are produced by the build command.
