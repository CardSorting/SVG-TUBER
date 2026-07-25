import { SVGPuppetDefinition } from '../types/tuber';

export const RetroPixelHeroAvatar: SVGPuppetDefinition = {
  id: 'retro_pixel_hero',
  name: '8-Bit Pixel Knight',
  author: 'SVG-TUBER Studio',
  category: 'Anime & Cute',
  defaultConfig: {
    hairSpringStiffness: 0.3,
    hairDamping: 0.7,
    earBounce: 1.4,
    bodySway: 0.4,
    squishStrength: 0.7,
  },
  expressionLayers: {
    neutral: [],
    happy: ['expr_blush'],
    angry: ['expr_angry'],
    shocked: ['expr_shock'],
    blush: ['expr_blush'],
    tears: ['expr_tears'],
    star_eyes: ['expr_stars'],
    heart_eyes: ['expr_hearts'],
  },
  svgContent: `
  <svg viewBox="0 0 800 900" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" text-rendering="geometricPrecision" style="width: 100%; height: 100%; overflow: visible;">
    <defs>
      <linearGradient id="pixelHairGrad" x1="0%" y1="0%" x2="100%" y2="100%" color-interpolation="sRGB">
        <stop offset="0%" stop-color="#facc15" />
        <stop offset="100%" stop-color="#ca8a04" />
      </linearGradient>

      <linearGradient id="pixelArmorGrad" x1="0%" y1="0%" x2="100%" y2="100%" color-interpolation="sRGB">
        <stop offset="0%" stop-color="#38bdf8" />
        <stop offset="100%" stop-color="#0369a1" />
      </linearGradient>
    </defs>

    <!-- BACK 8-BIT SWORD & SHIELD LAYER -->
    <g id="hair_back_group">
      <rect x="180" y="320" width="400" height="30" fill="#38bdf8" stroke="#0f172a" stroke-width="4" />
      <rect x="200" y="300" width="40" height="70" fill="#facc15" stroke="#0f172a" stroke-width="4" />
    </g>

    <!-- BODY & PIXEL ARMOR -->
    <g id="body_group">
      <!-- Neck -->
      <rect x="360" y="480" width="80" height="70" fill="#fef3c7" />

      <!-- Pixel Knight Chestplate -->
      <path d="M 220 580 L 580 580 L 640 900 L 160 900 Z" fill="url(#pixelArmorGrad)" stroke="#0f172a" stroke-width="6" />
      <!-- Pixel Gold Emblem -->
      <rect x="360" y="640" width="80" height="80" fill="#facc15" stroke="#0f172a" stroke-width="4" />
      <rect x="380" y="660" width="40" height="40" fill="#ef4444" />
    </g>

    <!-- PIXEL HELMET WINGS / EARS (MOUNTED TO HEAD) -->
    <g id="ears_group">
      <!-- Left Pixel Helmet Wing -->
      <path d="M 250 250 L 170 120 L 220 80 L 290 190 Z" fill="#facc15" stroke="#0f172a" stroke-width="6" />
      <!-- Right Pixel Helmet Wing -->
      <path d="M 550 250 L 630 120 L 580 80 L 510 190 Z" fill="#facc15" stroke="#0f172a" stroke-width="6" />
    </g>

    <!-- HEAD BASE (PIXEL CUBE HEAD) -->
    <g id="head_base_group">
      <rect x="250" y="240" width="300" height="250" rx="16" fill="#fef3c7" stroke="#0f172a" stroke-width="8" />
    </g>

    <!-- EYEBROWS -->
    <g id="eyebrows_group">
      <rect id="eyebrow_left" x="290" y="295" width="70" height="14" fill="#0f172a" />
      <rect id="eyebrow_right" x="440" y="295" width="70" height="14" fill="#0f172a" />
    </g>

    <!-- LEFT EYE -->
    <g id="eye_left_group">
      <rect x="300" y="340" width="60" height="60" fill="#ffffff" stroke="#0f172a" stroke-width="4" />
      <g id="iris_left">
        <rect x="315" y="350" width="30" height="40" fill="#0284c7" />
        <rect x="320" y="355" width="10" height="10" fill="#ffffff" />
      </g>
      <rect id="eye_left_closed" x="300" y="365" width="60" height="10" fill="#0f172a" style="display: none;" />
    </g>

    <!-- RIGHT EYE -->
    <g id="eye_right_group">
      <rect x="440" y="340" width="60" height="60" fill="#ffffff" stroke="#0f172a" stroke-width="4" />
      <g id="iris_right">
        <rect x="455" y="350" width="30" height="40" fill="#0284c7" />
        <rect x="460" y="355" width="10" height="10" fill="#ffffff" />
      </g>
      <rect id="eye_right_closed" x="440" y="365" width="60" height="10" fill="#0f172a" style="display: none;" />
    </g>

    <!-- NOSE -->
    <g id="nose_group">
      <rect x="390" y="415" width="20" height="10" fill="#d97706" />
    </g>

    <!-- MOUTH STATES -->
    <g id="mouth_group">
      <rect id="mouth_closed" x="360" y="445" width="80" height="10" fill="#0f172a" />
      <rect id="mouth_smile" x="350" y="440" width="100" height="25" fill="#ef4444" stroke="#0f172a" stroke-width="4" style="display: none;" />
      <g id="mouth_open_wide" style="display: none;">
        <rect x="350" y="435" width="100" height="45" fill="#991b1b" stroke="#0f172a" stroke-width="4" />
        <rect x="370" y="460" width="60" height="20" fill="#ef4444" />
      </g>
      <rect id="mouth_o" x="375" y="440" width="50" height="35" fill="#991b1b" stroke="#0f172a" stroke-width="4" style="display: none;" />
    </g>

    <!-- FRONT BANGS / HAIR LAYER -->
    <g id="hair_front_group">
      <rect x="250" y="220" width="300" height="40" fill="url(#pixelHairGrad)" stroke="#0f172a" stroke-width="4" />
      <rect x="370" y="260" width="60" height="30" fill="url(#pixelHairGrad)" stroke="#0f172a" stroke-width="4" />
    </g>

    <!-- EXPRESSION OVERLAYS (TOGGLEABLE) -->
    <g id="expressions_group">
      <g id="expr_blush" style="display: none;">
        <rect x="280" y="410" width="40" height="14" fill="#ef4444" opacity="0.7" />
        <rect x="480" y="410" width="40" height="14" fill="#ef4444" opacity="0.7" />
      </g>
      <g id="expr_angry" style="display: none;">
        <path d="M 520 270 L 550 270 M 535 255 L 535 285 M 523 258 L 547 282 M 547 258 L 523 282" stroke="#ef4444" stroke-width="6" stroke-linecap="square" />
      </g>
      <g id="expr_shock" style="display: none;">
        <rect x="260" y="200" width="20" height="50" fill="#facc15" />
        <rect x="520" y="200" width="20" height="50" fill="#facc15" />
      </g>
      <g id="expr_tears" style="display: none;">
        <rect x="315" y="390" width="16" height="60" fill="#38bdf8" opacity="0.9" />
        <rect x="455" y="390" width="16" height="60" fill="#38bdf8" opacity="0.9" />
      </g>
      <g id="expr_stars" style="display: none;">
        <rect x="320" y="355" width="20" height="20" fill="#facc15" />
        <rect x="460" y="355" width="20" height="20" fill="#facc15" />
      </g>
      <g id="expr_hearts" style="display: none;">
        <rect x="315" y="350" width="30" height="30" fill="#ef4444" />
        <rect x="455" y="350" width="30" height="30" fill="#ef4444" />
      </g>
    </g>
  </svg>
  `
};
