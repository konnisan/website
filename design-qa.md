# Design QA

## Comparison target

- Source visual truth: `https://lvyovo-wiki.tech/`, captured in the Work Mode cloud browser.
- Implementation: `http://terminal.local:4173/`, rendered from this repository through Sites Preview.
- Viewport: 1363 × 936 CSS pixels.
- Source pixels: 1363 × 936 at device pixel ratio 1.
- Implementation pixels: 1363 × 936 at device pixel ratio 1.
- Density normalization: none required; both captures used the same viewport and density.
- State: homepage, light theme, default navigation item selected.
- Comparison input: the source and implementation full-view captures were emitted together in one browser comparison pass.

## Full-view comparison evidence

- The desktop frame and anchor coordinates match the reference: navigation at 185/154 (280 × 434), banner at 501/64 (360 × 200), hero at 501/300 (360 × 288), clock at 897/220 (232 × 132), calendar at 897/388 (350 × 286), article at 151/612 (266 × 160), recommendation at 441/720 (266 × 160), and player at 777/710 (293 × 66).
- The background fills the entire 1363 × 936 viewport independently from the centered component frame; there is no fixed 1447 × 1087 canvas overflow.
- The source's translucent rounded-card hierarchy, three-column rhythm, bottom stagger, and compact social dock are preserved.
- Konni branding, the page favicon, day/night fantasy imagery, and the explicit theme switch are intentional content substitutions requested for this project.

## Focused region comparison evidence

- Navigation: component width, row height, active pill, label spacing, icon sizing, and brand row were checked against the reference.
- Hero and banner: card dimensions, 64px outer radius, 32px media radius, avatar size, center alignment, and display-copy wrapping were checked.
- Right rail: theme/settings controls, clock, calendar width, grid density, selected-day treatment, and vertical spacing were checked.
- Bottom group: latest article, social dock, recommendation, compact player, and like control were checked for their reference positions and relative scale.

## Findings

- [Resolved P2] The original page used a complete 1447 × 1087 composite screenshot as both background and sprite source, causing browser overflow and locking every control to a 4:3 canvas.
  - Fix: separated the full-viewport ambient background from a 1363 × 936 responsive component frame and anchored independent cards to the measured reference coordinates.
  - Post-fix evidence: the cloud-browser implementation capture has 1363 × 936 document and viewport dimensions with no overflow.
- [Resolved P2] Initial Konni media crops used compressed WebP assets and a small avatar crop, producing visibly soft art next to the reference.
  - Fix: switched visible art crops to the original PNG assets and tightened the avatar crop to the character's face.
  - Post-fix evidence: the second same-viewport comparison shows a sharper banner and identifiable Konni portrait.
- [Resolved P2] The first display-copy pass was heavier than the reference and the calendar header did not reflect month navigation.
  - Fix: reduced hero display weight and letter spacing; the calendar now shows the active month after navigation and returns to the full current-date label for the current month.

## Required fidelity surfaces

- Fonts and typography: Trebuchet/MS YaHei is used locally as the closest available fallback to the reference's rounded display face. Size, wrapping, hierarchy, and optical weight match; the exact Averia font was not hotlinked.
- Spacing and layout rhythm: measured desktop positions and dimensions match the reference. Card radii, paddings, dock gaps, and the staggered bottom layout are consistent.
- Colors and tokens: translucent white/ink/teal tokens map to the source's daylight palette; a project-specific navy/teal dark palette is implemented without changing layout.
- Image quality and asset fidelity: all visible project imagery uses repository-owned Konni day/night PNG assets and the page favicon. No external source image is hotlinked.
- Copy and content: source labels were replaced with coherent Konni, Chinese navigation, and Rock Kingdom-themed project copy while preserving text density.
- Icons: a consistent Lucide outline family is used at the reference scale; the brand mark uses the actual page icon.
- Accessibility: semantic buttons/links, labels, alternative text, keyboard-reachable controls, reduced-motion handling, and visible active states are present.

## Primary interactions tested

- Light/dark theme switching.
- Navigation active state and toast feedback.
- Previous/next calendar month and selected date.
- Music play/pause state.
- Like/unlike state.
- Browser console checked: no application errors; one unrelated Chrome extension metadata error was observed.

## Open questions

- The user's current request focused on the desktop-component layout. A mobile flex-column fallback is implemented in CSS, but the Work Mode browser session did not expose a mobile viewport for a same-device reference capture.

## Implementation checklist

- [x] Replace fixed screenshot canvas with a viewport-filling scene.
- [x] Match lvy desktop component coordinates and sizes.
- [x] Move theme controls to the upper-right position.
- [x] Use the page icon in the upper-left brand row.
- [x] Add staggered desktop entrance motion.
- [x] Verify light and dark interaction states.
- [x] Build and lint the repository.

## Follow-up polish

- P3: replace the banner's crop from the existing composite art with a dedicated Rock Kingdom-style wall-art asset if a clean source image is supplied.
- P3: run an additional 390 × 844 mobile visual pass when an equivalent mobile reference capture is available.

## H1 Avatar iteration — waiting for approval

- Date: 2026-09-19.
- Viewport: 1363 × 936 CSS pixels in Playwright using Microsoft Edge channel.
- Full-page and Hero-region screenshots were captured from the latest local build after the avatar change.
- The day Hero avatar resolves to `/avatar-konni-day.png`; after clicking the dark-theme control it resolves to `/avatar-konni-night.png`.
- The 120 × 120 avatar remains readable in both themes and no longer depends on `background-size: 650%` / `background-position` against the composite art.
- Document metrics were `scrollWidth=1363`, `clientWidth=1363`, `scrollHeight=936`, `clientHeight=936`; no horizontal overflow was detected.
- Playwright console errors: none. Playwright page errors: none.
- User visual decision: pending. This iteration is not approved/completed yet.

### H1 pixel-sprite implementation pass — waiting for approval

- Date: 2026-09-19.
- Viewport: 1363 × 936 CSS pixels in Playwright using Microsoft Edge channel.
- Hero Avatar is now a standalone SVG pixel sprite instead of a cropped raster portrait.
- Avatar hit target measured 126 × 126 CSS pixels at x=618, y=325.
- Idle motion is applied to the inner sprite so the interactive button remains stable.
- Hover interaction was executed in Playwright; the waving arm transformed to `matrix(0.848048, -0.529919, 0.529919, 0.848048, -1, -5)` and decorative sparkles appeared.
- Click interaction was executed in Playwright; the temporary happy state and heart indicator appeared, then returned to idle.
- Day palette verified: hair `#eeeaf3`, hat `#2d3045`, accent `#f0a05b`.
- Night palette verified after the real theme-toggle click: hair `#d7ddf4`, hat `#1c213a`, accent `#df946e`.
- Document metrics remained `scrollWidth=1363`, `clientWidth=1363`, `scrollHeight=936`, `clientHeight=936`; no horizontal overflow was detected.
- Playwright console errors: none. Playwright page errors: none.
- Visual review finding: interaction and layout are technically correct, but the in-page SVG sprite is visibly more geometric/blocky and less detailed than the user-approved pixel-art concept preview. This is intentionally left for user review rather than auto-polished in the same approval cycle.
- User visual decision: pending. Do not advance to H2 before explicit approval.

### H1 faithful concept-sprite correction — waiting for approval

- Date: 2026-09-19.
- User rejected the hand-built geometric SVG because it did not match the previously approved pixel-art concept.
- The SVG character was removed from the Hero implementation.
- The current Hero uses `/avatar/konni-day-idle.png`, extracted directly from the approved concept preview so the wide hat, chibi proportions, brown hair, travel outfit, backpack and orange accent remain visually consistent with that concept.
- Day/Night currently share this same character silhouette; Night applies a cold violet-blue CSS treatment so identity and proportions do not drift between themes.
- Avatar hit target remains 126 × 126 CSS pixels at x=618, y=325.
- Idle motion remains on the inner image; hover only adds a slight lift/tilt and click keeps the short happy-bounce feedback. Additional action frames are intentionally deferred until this base character is visually approved.
- Playwright viewport: 1363 × 936 CSS pixels in Microsoft Edge.
- Latest document metrics: `scrollWidth=1363`, `clientWidth=1363`; no horizontal overflow detected.
- Latest Playwright console errors: none. Playwright page errors: none.
- Visual review: the character now visibly matches the approved concept rather than the rejected geometric SVG. User approval is still pending; do not advance to H2.

### H1 avatar motion + status chip — waiting for approval

- Date: 2026-09-19.
- Playwright viewport: 1363 × 936 CSS pixels in Microsoft Edge.
- Idle state verified with `Konni online` status chip and continuous low-amplitude sprite motion.
- Hover state verified with status text `Hi there!`, transient sparkle effects, and pointer-position reaction; Playwright observed `--look-x: 1.57px` and `--look-y: -0.62px` after moving the pointer within the avatar hit target.
- Click state verified with status text `Yay!`, active `is-happy` class, jump animation, and visible heart feedback (`opacity: 0.977811` during capture).
- Night mode verified through the real theme toggle; status text changed to `Night mode` and the existing cold violet-blue sprite treatment remained active.
- Document metrics remained `scrollWidth=1363`, `clientWidth=1363`, `scrollHeight=936`, `clientHeight=936`; no horizontal overflow was detected.
- Playwright console errors: none. Playwright page errors: none.
- Full-page, idle, hover, click, and night screenshots were captured from the latest local build.
- User visual decision: pending. Do not advance to H2 before explicit approval.

### H1 real action-frame upgrade — waiting for approval

- Date: 2026-09-19.
- The previous 96 × 96 `konni-day-idle.png` was a truncated PNG stream. It was re-exported as valid 128 × 128 pixel-art PNG resources with restrained palette cleanup so the approved character silhouette remains unchanged.
- Real action resources now exist for `idle`, `blink`, `wave`, `look-left`, `look-right`, and `happy` under `public/avatar/`.
- Playwright viewport: 1363 × 936 CSS pixels in Microsoft Edge.
- Initial frame verified: `/avatar/konni-day-idle.png`, natural size 128 × 128.
- Mouse enter verified: frame switched to `/avatar/konni-day-wave.png` and status text became `Hi there!`.
- After the greeting, pointer movement to the left/right sides of the hit target verified real frame switches to `/avatar/konni-day-look-left.png` and `/avatar/konni-day-look-right.png`.
- Click verified: frame switched to `/avatar/konni-day-happy.png`, status text became `Yay!`, and the heart feedback was visible during capture.
- Idle blink was independently polled in Playwright; `.konni-blink-frame` reached opacity 1 and a blink-state screenshot was captured.
- After interaction the sprite restored to `/avatar/konni-day-idle.png`.
- Night mode retained the same action resources and applied the existing cold violet-blue treatment; computed filter was `hue-rotate(235deg) saturate(0.72) brightness(0.9) contrast(1.06)`.
- Document metrics remained `scrollWidth=1363`, `clientWidth=1363`, `scrollHeight=936`, `clientHeight=936`; no horizontal overflow was detected.
- Playwright console errors: none. Playwright page errors: none.
- User visual decision: pending. Do not advance to H2 before explicit approval.

### H1 final avatar action set — waiting for approval

- Date: 2026-09-19.
- The page now uses `public/avatar-final/` with eight 128 × 128 PNG states: `idle`, `blink`, `wave`, `look-left`, `look-right`, `happy`, `thinking`, and `sleep`.
- Host-side consistency check confirmed all eight files share the same canvas size and the same character identity/anchor; visible changes are limited to pose, expression, arm position, and small head direction changes.
- Playwright viewport: 1363 × 936 CSS pixels in Microsoft Edge.
- Verified real frame sequence: `idle → wave → look-left → look-right → thinking → happy → sleep`.
- Verified status chip sequence: `Konni online → Hi there! → I see you → Hmm... → Yay! → Zzz...` according to interaction state.
- Automatic blink was observed with `.konni-blink-frame` reaching opacity 1.
- Thinking state appears after sustained hover (~1.8 s); sleep state appears after ~8 s of inactivity in Night mode.
- Document metrics remained `scrollWidth=1363`, `clientWidth=1363`, `scrollHeight=936`, `clientHeight=936`; no horizontal overflow was detected.
- Playwright console errors: none. Playwright page errors: none.
- User visual decision: pending. Do not advance to H2 before explicit approval.

### H1 YOLO head-only pixel avatar — waiting for approval

- Date: 2026-09-19.
- The Hero now uses `public/avatar-head/` instead of the full-body `avatar-final` sprites. All states remain 128 × 128, but the visible content is constrained to the head/hat and minimal gesture area; no full body is visible.
- The head sprites were deliberately re-rasterized through nearest-neighbour down/up scaling to make the pixel blocks more explicit and stable at the 128 × 128 display size.
- Sleep includes a pixel pillow inside the sprite itself; external sparkle/heart feedback was removed so interaction feedback comes from the avatar image rather than decorations around it.
- Playwright viewport: 1363 × 936 CSS pixels in Microsoft Edge.
- Global pointer gaze was verified without hovering the avatar: moving the pointer to the far left switched to `/avatar-head/konni-head-look-left.png`; moving it to the far right switched to `/avatar-head/konni-head-look-right.png`.
- Mouse enter switched to `/avatar-head/konni-head-wave.png` with `Hi there!`; click switched to `/avatar-head/konni-head-happy.png` with `Yay!`.
- Global inactivity was verified in day mode: after ~12 s with no pointer/keyboard activity, the frame switched to `/avatar-head/konni-head-sleep.png` and status became `Zzz...`; pointer movement woke the avatar immediately.
- Document metrics remained `scrollWidth=1363`, `clientWidth=1363`, `scrollHeight=936`, `clientHeight=936`; no horizontal overflow was detected.
- Playwright console errors: none. Playwright page errors: none.
- Visual review: head-only composition is visibly more pixel-forward and removes the previous full-body silhouette. Wave still reads from the small hand near the face; the pillow is clearly visible in sleep without changing the card geometry.
- User visual decision: pending. Do not advance to H2 before explicit approval.

### H1 YOLO eye-layer tracking — waiting for approval

- Date: 2026-09-19.
- Runtime `look-left` / `look-right` full-image switching was removed. The idle sprite now remains `/avatar-head/konni-head-idle.png` while gaze changes.
- Two 6 × 8 CSS pixel-eye layers are anchored over the existing eyes. Each contains a 2 × 4 warm highlight/pupil pixel that moves by quantized `-1 / 0 / +1px` in both X and Y based on the pointer position relative to the avatar.
- Playwright viewport: 1363 × 936 CSS pixels in Microsoft Edge.
- Far upper-left pointer position verified the same idle `src` plus `--eye-x: -1px`, `--eye-y: -1px`.
- Far lower-right pointer position verified the same idle `src` plus `--eye-x: 1px`, `--eye-y: 1px`.
- Center-above pointer position verified `--eye-x: 0px`, `--eye-y: -1px` without replacing the avatar image.
- Existing actions still passed in the same run: hover → wave / `Hi there!`; click → happy / `Yay!`; ~12 s inactivity → pillow sleep / `Zzz...`; pointer movement → immediate wake to idle.
- The obsolete `konni-head-look-left.png` and `konni-head-look-right.png` resources were removed from the final action set.
- Document metrics remained `scrollWidth=1363`, `clientWidth=1363`, `scrollHeight=936`, `clientHeight=936`; no horizontal overflow was detected.
- Playwright console errors: none. Playwright page errors: none.
- Magnified screenshot comparison verified that hat, hair, face outline, and sprite position stay identical between gaze directions; only the internal eye pixels move.
- User visual decision: pending. Do not advance to H2 before explicit approval.

## Comparison history

1. Initial source inspection: fixed 1447 × 1087 composite canvas and off-reference component coordinates identified.
2. First rendered pass: responsive frame and exact desktop coordinates implemented; soft cropped imagery and heavy hero text recorded as P2.
3. Second rendered pass: original PNG crops and lighter display typography verified against the reference; no actionable P0/P1/P2 findings remain.

final result: passed
