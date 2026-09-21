# Konni 分层眼球随鼠标交互设计

日期：2026-09-20
状态：当前实施基线（已批准）

## 1. 当前唯一实施方向

采用 Wallpaper Engine / Puppet Warp 类似的**动画分层思路**，而不是在完成的人像 PNG 上再贴一个矩形眼睛组件。

目标只有一个：人物头部、脸、帽子、头发完全静止；左右虹膜/瞳孔根据鼠标相对位置变化，并在移动到眼眶边界时自然被上层眼皮、睫毛、头发和脸部遮挡，只露出仍位于眼睛开口中的部分。

当前结构：

```text
face-back / eye-white              固定底层
        ↓
iris-left + iris-right             唯一移动层
        ↓
face-front / eyelid / eyelash      固定前景遮挡
```

这份结构是当前 canonical implementation。后续 Agent/开发不得再把旧 CSS 眼睛、矩形 `eye-window` 或整脸九方向切换当作现行方案。

## 2. 已退役方案

以下方案已明确退役：

1. 整张头像 `look-left / look-right / 9方向` 切换。
2. 首页在完整头像上额外覆盖 `.pixel-eye-glint`，再以 `--eye-x / --eye-y` 移动内部像素。
3. `avatar-eye-follow-lab.html` 中矩形 `eye-window + overflow:hidden + 整张 iris PNG translate`。
4. `avatar-lab.html` 中 `-2/0/+2px` 八方向 CSS 眼神系统。
5. 把 9/17 方向 eye-only sprite 当作默认正式路线。

第 5 项只保留为 fallback：只有最终分层人物素材无法在连续移动中达到自然效果时才重新评估，不作为当前路线并行维护。

旧实验页、旧测试和旧 eye-follow 预览应删除，避免未来 Agent 根据历史文件继续错误路线。

## 3. 为什么采用分层 Puppet 路线

动态壁纸/2D rig 的自然感来自素材结构，而不是某个特殊 API。网页无需复制 Wallpaper Engine 本身，只复制它的角色制作原则：

- 眼球从一开始就是独立运动部件；
- 眼球位于脸部前景下方；
- 眼皮/睫毛负责真实遮挡；
- 鼠标只生成 gaze target；
- 角色主体不参与 gaze transform。

因此网页实现可以用普通 DOM 图层 + `requestAnimationFrame`，不必引入 Live2D/Spine，也不必依赖 Canvas 才能实现。

## 4. 当前原型文件

```text
public/avatar-puppet-lab.html
public/avatar-white-sailor/
  reference.png
  layered/
    face-back.png
    face-front.png
    iris-left.png
    iris-right.png

tests/avatar-puppet.playwright.mjs
outputs/avatar-puppet/        # 本地测试产物，Git 忽略
```

棕发宽檐帽技术占位角色已经退役并从当前工作树清除。当前唯一 Puppet 原型直接使用已确认的白发/银发水手帽角色：深色水手帽、精灵耳、深色高领衣服、灰紫色眼睛。非眼睛区域不随 gaze 变化。

四张运行时 PNG 都是同一个 `256×256` 坐标系的透明分层素材，因此无需再手工猜测左右眼绝对坐标。`reference.png` 是四层在中心眼位重新合成后的基准图，用于确认人物身份与图层注册没有漂移。

## 5. 输入算法

鼠标输入连续：

```text
pointermove
  → pointer - avatar center
  → dead zone
  → normalized gaze vector
  → X/Y 最大活动半径
  → ellipse constraint
  → target gaze
```

渲染：

```text
target gaze
  → requestAnimationFrame smoothing
  → Math.round(source-pixel offset)
  → left/right iris transform
```

当前白发水手帽角色使用 `256×256` 分层 PNG。虹膜的运行时偏移最终取整数源像素，避免像素画在浏览器中产生亚像素模糊。

当前实验参数：

```text
MAX_X = 10 source px
MAX_Y = 6 source px
DEAD_ZONE = 28 CSS px
SATURATION_X = 330 CSS px
SATURATION_Y = 260 CSS px
FOLLOW = 0.20
```

这些参数属于独立 Puppet Lab，正式接入首页前仍需根据人工视觉检查调整眼球极限位置。

## 6. 图层与遮挡约束

必须保证：

- `face-back` transform 永远不变；
- `face-front` transform 永远不变；
- 两个 iris 才允许发生 gaze transform；
- 不在 CSS 中额外创建白色矩形眼眶；
- 不使用矩形 `overflow:hidden` 模拟眼皮；
- 眼睛边界由真实人物前景透明图自然遮挡；
- iris 最大运动范围不得超出可被前景可靠覆盖的区域。

## 7. Playwright 验证

自动测试必须验证：

1. center gaze 为 `(0, 0)`；
2. N / NE / E / SE / S / SW / W / NW 方向符号正确；
3. X/Y 不超过设计最大范围；
4. 鼠标按圆周移动时产生多组连续 gaze 状态；
5. `face-back` 的 src、transform、位置尺寸始终不变；
6. `face-front` 的 src、transform、位置尺寸始终不变；
7. 两个 iris 使用同一 gaze vector；
8. 无 console error / page error；
9. 生成方向截图供人工检查眼皮遮挡。

开发原型暴露：

```js
window.__KONNI_PUPPET_DEBUG__
```

用于测试读取 target/current/render offset，而不是只靠截图猜状态。

## 8. 正式首页策略

在用户批准独立 Puppet Lab 之前：

- 正式首页 Hero 暂时保持静态 idle/sleep；
- 旧 `.pixel-eye-glint` 运行时代码删除；
- 白发水手帽 Puppet 仅存在于独立实验页，不提前替换 Hero；
- 不并行维护第二套 gaze 技术。

用户批准白发角色的眼睛轮廓、极限遮挡和鼠标跟随效果后，再把同一套 PNG 分层素材接入 Hero；接入完成后再删除 `public/avatar-head/` 的旧 idle/sleep 资产。

## 9. 美术优化边界

眼球追踪完成后，页面的美术优化继续围绕：魔法、精灵、炼金、像素、古典 RPG / 魔法工坊。

角色交互应作为页面世界的一部分，不添加大量无关动态效果。后续优先考虑：

- 克制的像素边框；
- 炼金药瓶/小型道具；
- 符文、魔法阵的低密度装饰；
- 植物、蘑菇、灯笼等小型场景物；
- 与角色视线/鼠标交互相呼应的少量 hover 反馈。

这些不进入当前眼球原型范围。

## 10. 当前实施顺序

1. 清理旧 eye-follow、棕发 Puppet、历史预览、未使用 starter 组件和构建产物。
2. 保留首页真实依赖与构建配置，不在清理阶段重做首页。
3. 将白发水手帽人物固定为 `256×256` PNG 分层素材：`face-back / iris-left / iris-right / face-front`。
4. `avatar-puppet-lab.html` 只加载这一套白发素材。
5. Playwright 验证 PNG 加载、中心、八方向、圆周轨迹、图层顺序和固定人物层。
6. 人工检查四个极限方向的虹膜轮廓与前景遮挡；必要时只调整运动范围或 iris 美术。
7. 用户批准后再把 Puppet 接入正式首页 Hero。
8. Hero 迁移完成后删除旧 `public/avatar-head/` idle/sleep 资产。
