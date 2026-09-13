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

## Comparison history

1. Initial source inspection: fixed 1447 × 1087 composite canvas and off-reference component coordinates identified.
2. First rendered pass: responsive frame and exact desktop coordinates implemented; soft cropped imagery and heavy hero text recorded as P2.
3. Second rendered pass: original PNG crops and lighter display typography verified against the reference; no actionable P0/P1/P2 findings remain.

final result: passed
