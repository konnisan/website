# Konni 背景原图与桌面裁剪

本页只比较背景图，不包含任何首页组件，也不处理手机端。

## 原图

- 尺寸：1672 × 941
- 比例：约 16:9
- 文件：[konni-workshop-day-preview.png](../public/konni-workshop-day-preview.png)

![背景原图](../public/konni-workshop-day-preview.png)

## 不同桌面比例的 Cover 裁剪

所有结果都直接来自同一张原图，使用同一个画面焦点 `50% 48%`，没有重绘或补图。

![四种桌面比例裁剪对照](./konni-background-crop-comparison.png)

## 当前结论

- 16:9：接近原图比例，画面基本完整。
- 16:10：左右轻度裁切，主体仍完整。
- 5:4：左右大幅裁切，书架和窗户明显丢失。
- 21:9：上下大幅裁切，顶部拱窗与底部桌面无法同时保留。

因此当前问题不是单纯调整 `background-position` 就能彻底解决。若继续使用单张约 16:9 的背景，5:4 与 21:9 必然牺牲不同区域。
