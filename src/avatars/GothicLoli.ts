import { SVGPuppetDefinition } from '../types/tuber';

export const GothicLoliAvatar: SVGPuppetDefinition = {
  id: 'gothic_loli',
  name: 'Gothic Lolita Alice',
  author: 'SVG-TUBER Studio',
  category: 'Anime & Cute',
  defaultConfig: {
    hairSpringStiffness: 0.22,
    hairDamping: 0.84,
    earBounce: 1.2,
    bodySway: 0.38,
    squishStrength: 0.55,
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
      <linearGradient id="loliHairGrad" x1="0%" y1="0%" x2="100%" y2="100%" color-interpolation="sRGB">
        <stop offset="0%" stop-color="#18181b" />
        <stop offset="50%" stop-color="#3f3f46" />
        <stop offset="100%" stop-color="#71717a" />
      </linearGradient>

      <linearGradient id="loliDressGrad" x1="0%" y1="0%" x2="100%" y2="100%" color-interpolation="sRGB">
        <stop offset="0%" stop-color="#090d16" />
        <stop offset="50%" stop-color="#18181b" />
        <stop offset="100%" stop-color="#312e81" />
      </linearGradient>

      <radialGradient id="loliEyeGrad" cx="50%" cy="50%" r="50%" color-interpolation="sRGB">
        <stop offset="0%" stop-color="#e0e7ff" />
        <stop offset="60%" stop-color="#6366f1" />
        <stop offset="100%" stop-color="#1e1b4b" />
      </radialGradient>

      <filter id="loliGlow" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <!-- BACK LONG TWIN DRILLS HAIR LAYER -->
    <g id="hair_back_group">
      <path d="M 210 380 Q 120 540 90 760 Q 70 860 160 880 Q 230 880 260 700 Q 280 520 300 420 Z" fill="url(#loliHairGrad)" opacity="0.95" />
      <path d="M 590 380 Q 680 540 710 760 Q 730 860 640 880 Q 570 880 540 700 Q 520 520 500 420 Z" fill="url(#loliHairGrad)" opacity="0.95" />
    </g>

    <!-- BODY & VICTORIAN GOTHIC DRESS -->
    <g id="body_group">
      <!-- Neck -->
      <path d="M 360 480 L 440 480 L 450 560 Q 400 580 350 560 Z" fill="#ffffff" />
      <!-- Lace Collar -->
      <path d="M 340 520 Q 400 560 460 520 L 480 570 Q 400 610 320 570 Z" fill="#ffffff" stroke="#c7d2fe" stroke-width="2" />

      <!-- Victorian Dress -->
      <path d="M 220 600 Q 400 550 580 600 L 640 900 L 160 900 Z" fill="url(#loliDressGrad)" stroke="#818cf8" stroke-width="3" />
      <!-- Corset Ribbon -->
      <path d="M 370 610 L 430 630 M 430 630 L 370 650 M 370 650 L 430 670" stroke="#818cf8" stroke-width="3" stroke-linecap="round" />
    </g>

    <!-- GOTHIC LACE BONNET HEADPIECE / EARS (MOUNTED TO HEAD) -->
    <g id="ears_group">
      <!-- Left Ribbon Bow -->
      <circle cx="250" cy="200" r="28" fill="#18181b" stroke="#ffffff" stroke-width="3" />
      <path d="M 220 200 L 280 200" stroke="#ffffff" stroke-width="3" />
      <!-- Right Ribbon Bow -->
      <circle cx="550" cy="200" r="28" fill="#18181b" stroke="#ffffff" stroke-width="3" />
      <path d="M 520 200 L 580 200" stroke="#ffffff" stroke-width="3" />
      <!-- Lace Bonnet Crown Arc -->
      <path d="M 240 220 Q 400 130 560 220" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" />
    </g>

    <!-- HEAD BASE -->
    <g id="head_base_group">
      <path d="M 260 260 Q 400 230 540 260 Q 560 400 490 480 Q 400 540 310 480 Q 240 400 260 260 Z" fill="#ffffff" stroke="#c7d2fe" stroke-width="2" />
    </g>

    <!-- EYEBROWS -->
    <g id="eyebrows_group">
      <path id="eyebrow_left" d="M 290 305 Q 330 285 365 305" fill="none" stroke="#312e81" stroke-width="6" stroke-linecap="round" />
      <path id="eyebrow_right" d="M 435 305 Q 470 285 510 305" fill="none" stroke="#312e81" stroke-width="6" stroke-linecap="round" />
    </g>

    <!-- LEFT EYE -->
    <g id="eye_left_group">
      <ellipse cx="330" cy="365" rx="38" ry="42" fill="#ffffff" />
      <g id="iris_left">
        <ellipse cx="330" cy="365" rx="26" ry="32" fill="url(#loliEyeGrad)" />
        <circle cx="330" cy="365" r="8" fill="#1e1b4b" />
        <circle cx="320" cy="350" r="8" fill="#ffffff" />
        <circle cx="342" cy="378" r="4" fill="#e0e7ff" />
      </g>
      <path d="M 285 360 Q 330 310 375 360" fill="none" stroke="#18181b" stroke-width="8" stroke-linecap="round" />
      <path id="eye_left_closed" d="M 288 368 Q 330 395 372 368" fill="none" stroke="#18181b" stroke-width="8" stroke-linecap="round" style="display: none;" />
    </g>

    <!-- RIGHT EYE -->
    <g id="eye_right_group">
      <ellipse cx="470" cy="365" rx="38" ry="42" fill="#ffffff" />
      <g id="iris_right">
        <ellipse cx="470" cy="365" rx="26" ry="32" fill="url(#loliEyeGrad)" />
        <circle cx="470" cy="365" r="8" fill="#1e1b4b" />
        <circle cx="460" cy="350" r="8" fill="#ffffff" />
        <circle cx="482" cy="378" r="4" fill="#e0e7ff" />
      </g>
      <path d="M 425 360 Q 470 310 515 360" fill="none" stroke="#18181b" stroke-width="8" stroke-linecap="round" />
      <path id="eye_right_closed" d="M 428 368 Q 470 395 512 368" fill="none" stroke="#18181b" stroke-width="8" stroke-linecap="round" style="display: none;" />
    </g>

    <!-- NOSE -->
    <g id="nose_group">
      <ellipse cx="400" cy="415" rx="3" ry="2" fill="#818cf8" opacity="0.6" />
    </g>

    <!-- MOUTH STATES -->
    <g id="mouth_group">
      <path id="mouth_closed" d="M 370 445 Q 400 458 430 445" fill="none" stroke="#18181b" stroke-width="6" stroke-linecap="round" />
      <path id="mouth_smile" d="M 365 442 Q 400 475 435 442 Z" fill="#6366f1" stroke="#18181b" stroke-width="4" style="display: none;" />
      <g id="mouth_open_wide" style="display: none;">
        <path d="M 360 440 Q 400 425 440 440 Q 445 490 400 495 Q 355 490 360 440 Z" fill="#312e81" stroke="#18181b" stroke-width="5" />
        <path d="M 375 470 Q 400 450 425 470 Q 410 492 390 492 Z" fill="#818cf8" />
      </g>
      <ellipse id="mouth_o" cx="400" cy="452" rx="18" ry="22" fill="#312e81" stroke="#18181b" stroke-width="5" style="display: none;" />
    </g>

    <!-- FRONT BANGS / HAIR LAYER -->
    <g id="hair_front_group">
      <path d="M 250 250 Q 220 340 260 440 Q 280 460 280 400 Q 260 310 300 240 Z" fill="url(#loliHairGrad)" />
      <path d="M 300 230 Q 340 330 330 350 Q 360 280 390 230 Z" fill="url(#loliHairGrad)" />
      <path d="M 370 230 Q 410 340 430 330 Q 420 280 450 230 Z" fill="url(#loliHairGrad)" />
      <path d="M 550 250 Q 580 340 540 440 Q 520 460 520 400 Q 540 310 500 240 Z" fill="url(#loliHairGrad)" />
    </g>

    <!-- EXPRESSION OVERLAYS (TOGGLEABLE) -->
    <g id="expressions_group">
      <g id="expr_blush" style="display: none;">
        <ellipse cx="305" cy="410" rx="22" ry="10" fill="#818cf8" opacity="0.6" />
        <ellipse cx="495" cy="410" rx="22" ry="10" fill="#818cf8" opacity="0.6" />
      </g>
      <g id="expr_angry" style="display: none;">
        <path d="M 520 270 L 550 270 M 535 255 L 535 285 M 523 258 L 547 282 M 547 258 L 523 282" stroke="#ef4444" stroke-width="6" stroke-linecap="round" />
      </g>
      <g id="expr_shock" style="display: none;">
        <path d="M 260 220 L 240 190 M 400 180 L 400 150 M 540 220 L 560 190" stroke="#a5f3fc" stroke-width="5" stroke-linecap="round" />
      </g>
      <g id="expr_tears" style="display: none;">
        <path d="M 315 390 Q 300 430 305 460 Q 320 460 325 430 Z" fill="#38bdf8" opacity="0.85" />
        <path d="M 485 390 Q 470 430 475 460 Q 490 460 495 430 Z" fill="#38bdf8" opacity="0.85" />
      </g>
      <g id="expr_stars" style="display: none;">
        <path d="M 330 345 L 335 360 L 350 365 L 335 370 L 330 385 L 325 370 L 310 365 L 325 360 Z" fill="#c084fc" />
        <path d="M 470 345 L 475 360 L 490 365 L 475 370 L 470 385 L 465 370 L 450 365 L 465 360 Z" fill="#c084fc" />
      </g>
      <g id="expr_hearts" style="display: none;">
        <path d="M 330 375 C 330 375 310 355 310 345 C 310 338 318 335 325 340 C 330 345 330 345 330 345 C 330 345 330 345 335 340 C 342 335 350 338 350 345 C 350 355 330 375 330 375 Z" fill="#f43f5e" transform="scale(1.3) translate(-75, -75)" />
        <path d="M 470 375 C 470 375 450 355 450 345 C 450 338 458 335 465 340 C 470 345 470 345 470 345 C 470 345 470 345 475 340 C 482 335 490 338 490 345 C 490 355 470 375 470 375 Z" fill="#f43f5e" transform="scale(1.3) translate(-110, -75)" />
      </g>
    </g>
  </svg>
  `
};
