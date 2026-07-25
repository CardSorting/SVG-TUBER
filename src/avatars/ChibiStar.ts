import { SVGPuppetDefinition } from '../types/tuber';

export const ChibiStarAvatar: SVGPuppetDefinition = {
  id: 'chibi_star',
  name: 'Chibi Star Mascot',
  author: 'SVG-TUBER Studio',
  defaultConfig: {
    hairSpringStiffness: 0.25,
    hairDamping: 0.8,
    earBounce: 1.0,
    bodySway: 0.5,
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
  <svg viewBox="0 0 800 900" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" style="width: 100%; height: 100%; overflow: visible;">
    <defs>
      <linearGradient id="starBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%" color-interpolation="sRGB">
        <stop offset="0%" stop-color="#fef08a" />
        <stop offset="100%" stop-color="#f59e0b" />
      </linearGradient>

      <linearGradient id="starRibbonGrad" x1="0%" y1="0%" x2="100%" y2="0%" color-interpolation="sRGB">
        <stop offset="0%" stop-color="#ec4899" />
        <stop offset="100%" stop-color="#f43f5e" />
      </linearGradient>
    </defs>

    <!-- BACK TAIL / WINGS -->
    <g id="hair_back_group">
      <path d="M 180 500 Q 100 450 80 550 Q 100 650 220 580 Z" fill="#f59e0b" opacity="0.8" />
      <path d="M 620 500 Q 700 450 720 550 Q 700 650 580 580 Z" fill="#f59e0b" opacity="0.8" />
    </g>

    <!-- BODY -->
    <g id="body_group">
      <!-- Round Chibi Body -->
      <ellipse cx="400" cy="620" rx="140" ry="120" fill="url(#starBodyGrad)" stroke="#b45309" stroke-width="6" />
      <!-- Ribbon Collar -->
      <path d="M 320 550 Q 400 580 480 550 L 460 590 Q 400 610 340 590 Z" fill="url(#starRibbonGrad)" />
      <circle cx="400" cy="580" r="14" fill="#fbbf24" stroke="#78350f" stroke-width="3" />
    </g>

    <!-- CAT / STAR EARS -->
    <g id="ears_group">
      <path d="M 270 240 L 220 100 L 330 180 Z" fill="#f59e0b" stroke="#78350f" stroke-width="6" />
      <path d="M 530 240 L 580 100 L 470 180 Z" fill="#f59e0b" stroke="#78350f" stroke-width="6" />
      <path d="M 265 220 L 235 125 L 315 180 Z" fill="#fef08a" />
      <path d="M 535 220 L 565 125 L 485 180 Z" fill="#fef08a" />
    </g>

    <!-- HEAD BASE -->
    <g id="head_base_group">
      <ellipse cx="400" cy="360" rx="200" ry="170" fill="url(#starBodyGrad)" stroke="#78350f" stroke-width="8" />
    </g>

    <!-- EYEBROWS -->
    <g id="eyebrows_group">
      <path id="eyebrow_left" d="M 280 270 Q 320 255 350 275" fill="none" stroke="#78350f" stroke-width="6" stroke-linecap="round" />
      <path id="eyebrow_right" d="M 450 275 Q 480 255 520 270" fill="none" stroke="#78350f" stroke-width="6" stroke-linecap="round" />
    </g>

    <!-- LEFT EYE -->
    <g id="eye_left_group">
      <ellipse cx="320" cy="350" rx="32" ry="40" fill="#1e293b" />
      <circle cx="310" cy="335" r="10" fill="#ffffff" />
      <circle cx="330" cy="365" r="5" fill="#fef08a" />
      <path id="eye_left_closed" d="M 285 355 Q 320 385 355 355" fill="none" stroke="#1e293b" stroke-width="8" stroke-linecap="round" style="display: none;" />
    </g>

    <!-- RIGHT EYE -->
    <g id="eye_right_group">
      <ellipse cx="480" cy="350" rx="32" ry="40" fill="#1e293b" />
      <circle cx="470" cy="335" r="10" fill="#ffffff" />
      <circle cx="490" cy="365" r="5" fill="#fef08a" />
      <path id="eye_right_closed" d="M 445 355 Q 480 385 515 355" fill="none" stroke="#1e293b" stroke-width="8" stroke-linecap="round" style="display: none;" />
    </g>

    <!-- NOSE -->
    <g id="nose_group">
      <ellipse cx="400" cy="390" rx="4" ry="3" fill="#b45309" />
    </g>

    <!-- MOUTH STATES -->
    <g id="mouth_group">
      <path id="mouth_closed" d="M 375 410 Q 400 425 425 410" fill="none" stroke="#78350f" stroke-width="6" stroke-linecap="round" />
      <path id="mouth_smile" d="M 370 410 Q 400 445 430 410 Z" fill="#f43f5e" stroke="#78350f" stroke-width="4" style="display: none;" />
      <g id="mouth_open_wide" style="display: none;">
        <path d="M 365 405 Q 400 395 435 405 Q 440 455 400 460 Q 360 455 365 405 Z" fill="#be123c" stroke="#78350f" stroke-width="5" />
        <path d="M 375 435 Q 400 415 425 435 Q 410 458 390 458 Z" fill="#fb7185" />
      </g>
      <ellipse id="mouth_o" cx="400" cy="420" rx="16" ry="20" fill="#be123c" stroke="#78350f" stroke-width="5" style="display: none;" />
    </g>

    <!-- FRONT HAIR / CHEEK TUFTS -->
    <g id="hair_front_group">
      <path d="M 210 360 Q 170 380 200 410 Z" fill="#f59e0b" stroke="#78350f" stroke-width="4" />
      <path d="M 590 360 Q 630 380 600 410 Z" fill="#f59e0b" stroke="#78350f" stroke-width="4" />
      <!-- Crown Star -->
      <path d="M 400 160 L 408 185 L 435 188 L 413 205 L 420 230 L 400 215 L 380 230 L 387 205 L 365 188 L 392 185 Z" fill="#facc15" stroke="#78350f" stroke-width="3" />
    </g>

    <!-- EXPRESSIONS -->
    <g id="expressions_group">
      <g id="expr_blush" style="display: none;">
        <ellipse cx="280" cy="400" rx="20" ry="10" fill="#f43f5e" opacity="0.6" />
        <ellipse cx="520" cy="400" rx="20" ry="10" fill="#f43f5e" opacity="0.6" />
      </g>
      <g id="expr_angry" style="display: none;">
        <path d="M 530 250 L 560 250 M 545 235 L 545 265" stroke="#ef4444" stroke-width="6" stroke-linecap="round" />
      </g>
      <g id="expr_shock" style="display: none;">
        <path d="M 230 180 L 210 150 M 400 140 L 400 110 M 570 180 L 590 150" stroke="#38bdf8" stroke-width="5" stroke-linecap="round" />
      </g>
      <g id="expr_tears" style="display: none;">
        <path d="M 305 370 Q 290 410 295 440 Q 310 440 315 410 Z" fill="#38bdf8" opacity="0.85" />
        <path d="M 495 370 Q 480 410 485 440 Q 500 440 505 410 Z" fill="#38bdf8" opacity="0.85" />
      </g>
      <g id="expr_stars" style="display: none;">
        <path d="M 320 335 L 325 350 L 340 355 L 325 360 L 320 375 L 315 360 L 300 355 L 315 350 Z" fill="#facc15" />
        <path d="M 480 335 L 485 350 L 500 355 L 485 360 L 480 375 L 475 360 L 460 355 L 475 350 Z" fill="#facc15" />
      </g>
      <g id="expr_hearts" style="display: none;">
        <path d="M 320 360 C 320 360 300 340 300 330 C 300 323 308 320 315 325 C 320 330 320 330 320 330 C 320 330 320 330 325 325 C 332 320 340 323 340 330 C 340 340 320 360 320 360 Z" fill="#f43f5e" transform="scale(1.3) translate(-75, -75)" />
        <path d="M 480 360 C 480 360 460 340 460 330 C 460 323 468 320 475 325 C 480 330 480 330 480 330 C 480 330 480 330 485 325 C 492 320 500 323 500 330 C 500 340 480 360 480 360 Z" fill="#f43f5e" transform="scale(1.3) translate(-112, -75)" />
      </g>
    </g>
  </svg>
  `
};
