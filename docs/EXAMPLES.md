# 💡 SVG-TUBER Examples & Use Cases

This document provides real-world code examples, custom avatar recipes, and automation scripts for SVG-TUBER ULTIMATE.

---

## 📜 Table of Contents
- [Example 1: Minimal Custom Vector Avatar Recipe](#example-1-minimal-custom-vector-avatar-recipe)
- [Example 2: Custom Web Audio Synthesizer SFX](#example-2-custom-web-audio-synthesizer-sfx)
- [Example 3: Head Squish & Physical Impact Handler](#example-3-head-squish--physical-impact-handler)
- [Example 4: Standalone HTML Page Player](#example-4-standalone-html-page-player)

---

## Example 1: Minimal Custom Vector Avatar Recipe

Below is a complete TypeScript definition for custom vector avatars ready to be passed to `<SVGPuppetRenderer puppet={customPuppet} />`:

```typescript
import { SVGPuppetDefinition } from './types/tuber';

export const MY_CUSTOM_AVATAR: SVGPuppetDefinition = {
  id: 'custom_star_girl',
  name: 'Star Girl Chibi',
  author: 'Community Creator',
  defaultConfig: {
    hairSpringStiffness: 0.25,
    hairDamping: 0.88,
    earBounce: 0.7,
    bodySway: 0.35,
  },
  expressionLayers: {
    neutral: [],
    happy: ['expr_blush', 'expr_stars'],
    angry: ['expr_angry'],
    shocked: ['expr_shock'],
    blush: ['expr_blush'],
    tears: ['expr_tears'],
    star_eyes: ['expr_stars'],
    heart_eyes: ['expr_hearts'],
  },
  svgContent: `
    <svg viewBox="0 0 800 900" xmlns="http://www.w3.org/2000/svg">
      <!-- Body Group -->
      <g id="body_group">
        <path d="M 320 600 L 480 600 L 520 850 L 280 850 Z" fill="#6366f1" />
      </g>

      <!-- Head Base Group -->
      <g id="head_base_group">
        <circle cx="400" cy="360" r="160" fill="#fde047" />

        <!-- Eyebrows Group -->
        <g id="eyebrows_group">
          <path d="M 310 280 Q 340 260 370 280" fill="none" stroke="#1e1b4b" stroke-width="8" stroke-linecap="round" />
          <path d="M 430 280 Q 460 260 490 280" fill="none" stroke="#1e1b4b" stroke-width="8" stroke-linecap="round" />
        </g>

        <!-- Left Eye Group -->
        <g id="eye_left_group">
          <circle id="iris_left" cx="330" cy="350" r="24" fill="#1e1b4b" />
          <path id="eye_left_closed" d="M 305 350 Q 330 370 355 350" fill="none" stroke="#1e1b4b" stroke-width="6" style="display:none" />
        </g>

        <!-- Right Eye Group -->
        <g id="eye_right_group">
          <circle id="iris_right" cx="470" cy="350" r="24" fill="#1e1b4b" />
          <path id="eye_right_closed" d="M 445 350 Q 470 370 495 350" fill="none" stroke="#1e1b4b" stroke-width="6" style="display:none" />
        </g>

        <!-- Mouth Group -->
        <g id="mouth_group">
          <path id="mouth_closed" d="M 370 430 Q 400 450 430 430" fill="none" stroke="#1e1b4b" stroke-width="6" stroke-linecap="round" />
          <path id="mouth_smile" d="M 360 420 Q 400 470 440 420 Z" fill="#f43f5e" style="display:none" />
          <ellipse id="mouth_open_wide" cx="400" cy="430" rx="30" ry="40" fill="#f43f5e" style="display:none" />
          <circle id="mouth_o" cx="400" cy="430" r="20" fill="#f43f5e" style="display:none" />
        </g>
      </g>

      <!-- Hair Front Group -->
      <g id="hair_front_group">
        <path d="M 280 260 Q 400 180 520 260 Q 400 220 280 260 Z" fill="#a855f7" />
      </g>
    </svg>
  `,
};
```

---

## Example 2: Custom Web Audio Synthesizer SFX

Add custom procedural sound effects to `SFXEngine.ts`:

```typescript
// Custom Level Up Victory Fanfare SFX
public playVictorySFX() {
  if (!this.enabled || !this.ctx) return;
  const now = this.ctx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6

  notes.forEach((freq, idx) => {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + idx * 0.08);

    gain.gain.setValueAtTime(0.2, now + idx * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now + idx * 0.08);
    osc.stop(now + idx * 0.08 + 0.35);
  });
}
```

---

## Example 3: Head Squish & Physical Impact Handler

Trigger head compression squish & stretch dynamically on collision events:

```typescript
import { PhysicsEngine } from './engine/PhysicsEngine';

function triggerCustomImpact(physics: PhysicsEngine, force: number = 0.8) {
  // Compress vertical scale Y and expand horizontal scale X while maintaining mass volume
  physics.squishY = 1.0 - force * 0.3; // e.g. 0.76
  physics.squishX = 1.0 + force * 0.4; // e.g. 1.32
}
```

---

## Example 4: Standalone HTML Page Player

Single HTML file embedding MediaPipe & SVG-TUBER:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SVG-TUBER Player</title>
  <style>
    body { margin: 0; background: transparent; overflow: hidden; }
    #vtube-container { width: 100vw; height: 100vh; }
  </style>
</head>
<body>
  <div id="vtube-container"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```
