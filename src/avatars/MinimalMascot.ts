import { SVGPuppetDefinition } from '../types/tuber';

export const MinimalMascotAvatar: SVGPuppetDefinition = {
  id: 'minimal_mascot',
  name: 'Minimal Bot',
  author: 'SVG-TUBER Studio',
  defaultConfig: {
    hairSpringStiffness: 0.15,
    hairDamping: 0.9,
    earBounce: 0.5,
    bodySway: 0.2,
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
  <svg viewBox="0 0 800 900" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%; overflow: visible;">
    <defs>
      <linearGradient id="botGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38bdf8" />
        <stop offset="100%" stop-color="#818cf8" />
      </linearGradient>
    </defs>

    <!-- BACK ANTENNA -->
    <g id="hair_back_group">
      <path d="M 400 200 L 400 100" stroke="#0284c7" stroke-width="8" stroke-linecap="round" />
      <circle cx="400" cy="90" r="18" fill="#38bdf8" stroke="#0284c7" stroke-width="4" />
    </g>

    <!-- BODY -->
    <g id="body_group">
      <rect x="280" y="520" width="240" height="220" rx="40" fill="#0f172a" stroke="#38bdf8" stroke-width="6" />
      <circle cx="400" cy="630" r="35" fill="#38bdf8" opacity="0.3" />
      <path d="M 390 630 L 410 630 M 400 620 L 400 640" stroke="#38bdf8" stroke-width="4" stroke-linecap="round" />
    </g>

    <!-- EARS / SIDE SPEAKERS -->
    <g id="ears_group">
      <rect x="200" y="320" width="30" height="80" rx="10" fill="#0f172a" stroke="#38bdf8" stroke-width="4" />
      <rect x="570" y="320" width="30" height="80" rx="10" fill="#0f172a" stroke="#38bdf8" stroke-width="4" />
    </g>

    <!-- HEAD BASE -->
    <g id="head_base_group">
      <rect x="220" y="220" width="360" height="280" rx="60" fill="#0f172a" stroke="url(#botGrad)" stroke-width="8" />
      <!-- Visor Glass -->
      <rect x="245" y="250" width="310" height="220" rx="40" fill="#020617" stroke="#1e293b" stroke-width="4" />
    </g>

    <!-- EYEBROWS -->
    <g id="eyebrows_group">
      <path id="eyebrow_left" d="M 280 280 L 340 280" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" />
      <path id="eyebrow_right" d="M 460 280 L 520 280" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" />
    </g>

    <!-- LEFT EYE -->
    <g id="eye_left_group">
      <circle cx="315" cy="340" r="35" fill="#38bdf8" />
      <circle cx="305" cy="330" r="10" fill="#ffffff" />
      <path id="eye_left_closed" d="M 285 340 L 345 340" stroke="#38bdf8" stroke-width="8" stroke-linecap="round" style="display: none;" />
    </g>

    <!-- RIGHT EYE -->
    <g id="eye_right_group">
      <circle cx="485" cy="340" r="35" fill="#38bdf8" />
      <circle cx="475" cy="330" r="10" fill="#ffffff" />
      <path id="eye_right_closed" d="M 455 340 L 515 340" stroke="#38bdf8" stroke-width="8" stroke-linecap="round" style="display: none;" />
    </g>

    <!-- MOUTH -->
    <g id="mouth_group">
      <path id="mouth_closed" d="M 370 420 L 430 420" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" />
      <path id="mouth_smile" d="M 360 410 Q 400 445 440 410" fill="none" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" style="display: none;" />
      <rect id="mouth_open_wide" x="370" y="405" width="60" height="35" rx="10" fill="#38bdf8" style="display: none;" />
      <circle id="mouth_o" cx="400" cy="420" r="18" fill="#38bdf8" style="display: none;" />
    </g>

    <!-- FRONT HAIR / HEAD ACCENT -->
    <g id="hair_front_group">
      <rect x="360" y="225" width="80" height="12" rx="6" fill="#38bdf8" />
    </g>

    <!-- EXPRESSIONS -->
    <g id="expressions_group">
      <g id="expr_blush" style="display: none;">
        <ellipse cx="280" cy="390" rx="20" ry="8" fill="#f43f5e" />
        <ellipse cx="520" cy="390" rx="20" ry="8" fill="#f43f5e" />
      </g>
      <g id="expr_angry" style="display: none;">
        <path d="M 520 250 L 550 250 M 535 235 L 535 265" stroke="#ef4444" stroke-width="6" stroke-linecap="round" />
      </g>
      <g id="expr_shock" style="display: none;">
        <path d="M 230 180 L 210 150 M 400 140 L 400 110 M 570 180 L 590 150" stroke="#38bdf8" stroke-width="5" stroke-linecap="round" />
      </g>
      <g id="expr_tears" style="display: none;">
        <path d="M 305 370 Q 290 410 295 440 Q 310 440 315 410 Z" fill="#38bdf8" opacity="0.85" />
        <path d="M 495 370 Q 480 410 485 440 Q 500 440 505 410 Z" fill="#38bdf8" opacity="0.85" />
      </g>
      <g id="expr_stars" style="display: none;">
        <path d="M 315 325 L 320 340 L 335 345 L 320 350 L 315 365 L 310 350 L 295 345 L 310 340 Z" fill="#facc15" />
        <path d="M 485 325 L 490 340 L 505 345 L 490 350 L 485 365 L 480 350 L 465 345 L 480 340 Z" fill="#facc15" />
      </g>
      <g id="expr_hearts" style="display: none;">
        <path d="M 315 350 C 315 350 295 330 295 320 C 295 313 303 310 310 315 C 315 320 315 320 315 320 C 315 320 315 320 320 315 C 327 310 335 313 335 320 C 335 330 315 350 315 350 Z" fill="#f43f5e" transform="scale(1.3) translate(-75, -75)" />
        <path d="M 485 350 C 485 350 465 330 465 320 C 465 313 473 310 480 315 C 485 320 485 320 485 320 C 485 320 485 320 490 315 C 497 310 505 313 505 320 C 505 330 485 350 485 350 Z" fill="#f43f5e" transform="scale(1.3) translate(-114, -75)" />
      </g>
    </g>
  </svg>
  `
};
