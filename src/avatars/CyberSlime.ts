import { SVGPuppetDefinition } from '../types/tuber';

export const CyberSlimeAvatar: SVGPuppetDefinition = {
  id: 'cyber_slime',
  name: 'Neon Cyber Slime Mochi',
  author: 'SVG-TUBER Studio',
  category: 'Monsters & Beasts',
  defaultConfig: {
    hairSpringStiffness: 0.35,
    hairDamping: 0.65,
    earBounce: 2.0,
    bodySway: 0.6,
    squishStrength: 0.9,
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
      <linearGradient id="slimeBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%" color-interpolation="sRGB">
        <stop offset="0%" stop-color="#34d399" />
        <stop offset="50%" stop-color="#10b981" />
        <stop offset="100%" stop-color="#065f46" />
      </linearGradient>

      <radialGradient id="slimeEyeGrad" cx="50%" cy="50%" r="50%" color-interpolation="sRGB">
        <stop offset="0%" stop-color="#a7f3d0" />
        <stop offset="60%" stop-color="#34d399" />
        <stop offset="100%" stop-color="#064e3b" />
      </radialGradient>

      <filter id="slimeGlow" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <!-- BACK SLIME BUBBLES LAYER -->
    <g id="hair_back_group">
      <circle cx="200" cy="500" r="40" fill="url(#slimeBodyGrad)" opacity="0.8" filter="url(#slimeGlow)" />
      <circle cx="600" cy="500" r="40" fill="url(#slimeBodyGrad)" opacity="0.8" filter="url(#slimeGlow)" />
    </g>

    <!-- BODY & GELATINOUS SLIME BASE -->
    <g id="body_group">
      <!-- Neck -->
      <path d="M 360 480 L 440 480 L 450 560 Q 400 580 350 560 Z" fill="#a7f3d0" opacity="0.9" />

      <!-- Gelatinous Slime Puddle Body -->
      <path d="M 210 590 Q 400 510 590 590 L 670 900 L 130 900 Z" fill="url(#slimeBodyGrad)" opacity="0.9" stroke="#6ee7b7" stroke-width="4" />
      <!-- Inner Floating Bubbles -->
      <circle cx="340" cy="670" r="14" fill="#ffffff" opacity="0.6" />
      <circle cx="460" cy="720" r="18" fill="#ffffff" opacity="0.6" />
      <circle cx="380" cy="780" r="10" fill="#ffffff" opacity="0.6" />
    </g>

    <!-- BOUNCING SLIME ANTENNAE / EARS (MOUNTED TO HEAD) -->
    <g id="ears_group">
      <!-- Left Slime Antenna -->
      <path d="M 270 230 Q 140 60 190 20 Q 240 50 310 180 Z" fill="url(#slimeBodyGrad)" opacity="0.9" stroke="#6ee7b7" stroke-width="4" filter="url(#slimeGlow)" />
      <circle cx="190" cy="20" r="16" fill="#fef08a" filter="url(#slimeGlow)" />

      <!-- Right Slime Antenna -->
      <path d="M 530 230 Q 660 60 610 20 Q 560 50 490 180 Z" fill="url(#slimeBodyGrad)" opacity="0.9" stroke="#6ee7b7" stroke-width="4" filter="url(#slimeGlow)" />
      <circle cx="610" cy="20" r="16" fill="#fef08a" filter="url(#slimeGlow)" />
    </g>

    <!-- HEAD BASE (SLIME MOCHI) -->
    <g id="head_base_group">
      <path d="M 240 250 Q 400 210 560 250 Q 580 400 490 480 Q 400 540 310 480 Q 220 400 240 250 Z" fill="url(#slimeBodyGrad)" opacity="0.95" stroke="#6ee7b7" stroke-width="3" />
      <!-- Slime Specular Highlight -->
      <ellipse cx="320" cy="270" rx="30" ry="14" fill="#ffffff" opacity="0.6" transform="rotate(-15 320 270)" />
    </g>

    <!-- EYEBROWS -->
    <g id="eyebrows_group">
      <path id="eyebrow_left" d="M 290 305 Q 330 285 365 305" fill="none" stroke="#065f46" stroke-width="6" stroke-linecap="round" />
      <path id="eyebrow_right" d="M 435 305 Q 470 285 510 305" fill="none" stroke="#065f46" stroke-width="6" stroke-linecap="round" />
    </g>

    <!-- LEFT EYE -->
    <g id="eye_left_group">
      <ellipse cx="330" cy="365" rx="38" ry="42" fill="#ffffff" />
      <g id="iris_left">
        <ellipse cx="330" cy="365" rx="26" ry="32" fill="url(#slimeEyeGrad)" />
        <circle cx="330" cy="365" r="10" fill="#064e3b" />
        <circle cx="320" cy="350" r="8" fill="#ffffff" />
        <circle cx="342" cy="378" r="4" fill="#a7f3d0" />
      </g>
      <path d="M 285 360 Q 330 310 375 360" fill="none" stroke="#064e3b" stroke-width="8" stroke-linecap="round" />
      <path id="eye_left_closed" d="M 288 368 Q 330 395 372 368" fill="none" stroke="#064e3b" stroke-width="8" stroke-linecap="round" style="display: none;" />
    </g>

    <!-- RIGHT EYE -->
    <g id="eye_right_group">
      <ellipse cx="470" cy="365" rx="38" ry="42" fill="#ffffff" />
      <g id="iris_right">
        <ellipse cx="470" cy="365" rx="26" ry="32" fill="url(#slimeEyeGrad)" />
        <circle cx="470" cy="365" r="10" fill="#064e3b" />
        <circle cx="460" cy="350" r="8" fill="#ffffff" />
        <circle cx="482" cy="378" r="4" fill="#a7f3d0" />
      </g>
      <path d="M 425 360 Q 470 310 515 360" fill="none" stroke="#064e3b" stroke-width="8" stroke-linecap="round" />
      <path id="eye_right_closed" d="M 428 368 Q 470 395 512 368" fill="none" stroke="#064e3b" stroke-width="8" stroke-linecap="round" style="display: none;" />
    </g>

    <!-- NOSE -->
    <g id="nose_group">
      <ellipse cx="400" cy="415" rx="3" ry="2" fill="#10b981" />
    </g>

    <!-- MOUTH STATES -->
    <g id="mouth_group">
      <path id="mouth_closed" d="M 370 445 Q 400 458 430 445" fill="none" stroke="#064e3b" stroke-width="6" stroke-linecap="round" />
      <path id="mouth_smile" d="M 365 442 Q 400 475 435 442 Z" fill="#10b981" stroke="#064e3b" stroke-width="4" style="display: none;" />
      <g id="mouth_open_wide" style="display: none;">
        <path d="M 360 440 Q 400 425 440 440 Q 445 490 400 495 Q 355 490 360 440 Z" fill="#065f46" stroke="#064e3b" stroke-width="5" />
        <path d="M 375 470 Q 400 450 425 470 Q 410 492 390 492 Z" fill="#6ee7b7" />
      </g>
      <ellipse id="mouth_o" cx="400" cy="452" rx="18" ry="22" fill="#065f46" stroke="#064e3b" stroke-width="5" style="display: none;" />
    </g>

    <!-- FRONT BANGS / HAIR LAYER -->
    <g id="hair_front_group">
      <path d="M 280 230 Q 320 310 310 330 Q 340 260 370 230 Z" fill="#6ee7b7" opacity="0.7" />
      <path d="M 350 230 Q 390 320 410 310 Q 400 260 430 230 Z" fill="#6ee7b7" opacity="0.7" />
    </g>

    <!-- EXPRESSION OVERLAYS (TOGGLEABLE) -->
    <g id="expressions_group">
      <g id="expr_blush" style="display: none;">
        <ellipse cx="305" cy="410" rx="22" ry="10" fill="#34d399" opacity="0.6" />
        <ellipse cx="495" cy="410" rx="22" ry="10" fill="#34d399" opacity="0.6" />
      </g>
      <g id="expr_angry" style="display: none;">
        <path d="M 520 270 L 550 270 M 535 255 L 535 285 M 523 258 L 547 282 M 547 258 L 523 282" stroke="#ef4444" stroke-width="6" stroke-linecap="round" />
      </g>
      <g id="expr_shock" style="display: none;">
        <path d="M 260 220 L 240 190 M 400 180 L 400 150 M 540 220 L 560 190" stroke="#fef08a" stroke-width="5" stroke-linecap="round" />
      </g>
      <g id="expr_tears" style="display: none;">
        <path d="M 315 390 Q 300 430 305 460 Q 320 460 325 430 Z" fill="#38bdf8" opacity="0.85" />
        <path d="M 485 390 Q 470 430 475 460 Q 490 460 495 430 Z" fill="#38bdf8" opacity="0.85" />
      </g>
      <g id="expr_stars" style="display: none;">
        <path d="M 330 345 L 335 360 L 350 365 L 335 370 L 330 385 L 325 370 L 310 365 L 325 360 Z" fill="#fef08a" />
        <path d="M 470 345 L 475 360 L 490 365 L 475 370 L 470 385 L 465 370 L 450 365 L 465 360 Z" fill="#fef08a" />
      </g>
      <g id="expr_hearts" style="display: none;">
        <path d="M 330 375 C 330 375 310 355 310 345 C 310 338 318 335 325 340 C 330 345 330 345 330 345 C 330 345 330 345 335 340 C 342 335 350 338 350 345 C 350 355 330 375 330 375 Z" fill="#f43f5e" transform="scale(1.3) translate(-75, -75)" />
        <path d="M 470 375 C 470 375 450 355 450 345 C 450 338 458 335 465 340 C 470 345 470 345 470 345 C 470 345 470 345 475 340 C 482 335 490 338 490 345 C 490 355 470 375 470 375 Z" fill="#f43f5e" transform="scale(1.3) translate(-110, -75)" />
      </g>
    </g>
  </svg>
  `
};
