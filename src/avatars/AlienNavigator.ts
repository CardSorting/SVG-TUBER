import { SVGPuppetDefinition } from '../types/tuber';

export const AlienNavigatorAvatar: SVGPuppetDefinition = {
  id: 'alien_navigator',
  name: 'Cosmic Navigator Zog',
  author: 'SVG-TUBER Studio',
  defaultConfig: {
    hairSpringStiffness: 0.3,
    hairDamping: 0.75,
    earBounce: 1.8,
    bodySway: 0.5,
    squishStrength: 0.8,
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
      <linearGradient id="alienSkinGrad" x1="0%" y1="0%" x2="100%" y2="100%" color-interpolation="sRGB">
        <stop offset="0%" stop-color="#4ade80" />
        <stop offset="50%" stop-color="#10b981" />
        <stop offset="100%" stop-color="#047857" />
      </linearGradient>

      <linearGradient id="alienSuitGrad" x1="0%" y1="0%" x2="100%" y2="100%" color-interpolation="sRGB">
        <stop offset="0%" stop-color="#0284c7" />
        <stop offset="50%" stop-color="#0f172a" />
        <stop offset="100%" stop-color="#581c87" />
      </linearGradient>

      <radialGradient id="alienEyeGrad" cx="50%" cy="50%" r="50%" color-interpolation="sRGB">
        <stop offset="0%" stop-color="#fef08a" />
        <stop offset="50%" stop-color="#a855f7" />
        <stop offset="100%" stop-color="#3b0764" />
      </radialGradient>

      <filter id="alienGlow" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <!-- BACK ANTI-GRAVITY HALO RING LAYER -->
    <g id="hair_back_group">
      <ellipse cx="400" cy="200" rx="220" ry="60" fill="none" stroke="#a855f7" stroke-width="8" filter="url(#alienGlow)" />
      <ellipse cx="400" cy="200" rx="220" ry="60" fill="none" stroke="#fef08a" stroke-width="3" />
    </g>

    <!-- BODY & BIO-LUMINESCENT SPACE SUIT -->
    <g id="body_group">
      <!-- Neck -->
      <path d="M 360 480 L 440 480 L 450 560 Q 400 580 350 560 Z" fill="url(#alienSkinGrad)" />
      <!-- Cyber Suit Ring -->
      <rect x="365" y="525" width="70" height="14" rx="7" fill="#0369a1" stroke="#38bdf8" stroke-width="2" />
      <circle cx="400" cy="532" r="6" fill="#a855f7" filter="url(#alienGlow)" />

      <!-- Alien Space Suit -->
      <path d="M 220 600 Q 400 550 580 600 L 640 900 L 160 900 Z" fill="url(#alienSuitGrad)" stroke="#a855f7" stroke-width="3" />
      <!-- Glowing Core Reactor -->
      <circle cx="400" cy="670" r="24" fill="#38bdf8" stroke="#fef08a" stroke-width="3" filter="url(#alienGlow)" />
      <polygon points="400,654 412,678 388,678" fill="#fef08a" />
    </g>

    <!-- ALIEN ANTENNAE / EARS (MOUNTED TO HEAD) -->
    <g id="ears_group">
      <!-- Left Antenna -->
      <path d="M 280 230 Q 180 80 200 30 Q 240 60 300 180 Z" fill="url(#alienSkinGrad)" stroke="#34d399" stroke-width="3" />
      <circle cx="200" cy="30" r="14" fill="#fef08a" filter="url(#alienGlow)" />
      <!-- Right Antenna -->
      <path d="M 520 230 Q 620 80 600 30 Q 560 60 500 180 Z" fill="url(#alienSkinGrad)" stroke="#34d399" stroke-width="3" />
      <circle cx="600" cy="30" r="14" fill="#fef08a" filter="url(#alienGlow)" />
    </g>

    <!-- HEAD BASE (LARGE ALIEN CRANIUM) -->
    <g id="head_base_group">
      <path d="M 220 250 Q 400 180 580 250 Q 600 400 490 480 Q 400 540 310 480 Q 200 400 220 250 Z" fill="url(#alienSkinGrad)" stroke="#34d399" stroke-width="2" />
    </g>

    <!-- EYEBROWS -->
    <g id="eyebrows_group">
      <path id="eyebrow_left" d="M 290 305 Q 330 285 365 305" fill="none" stroke="#047857" stroke-width="6" stroke-linecap="round" />
      <path id="eyebrow_right" d="M 435 305 Q 470 285 510 305" fill="none" stroke="#047857" stroke-width="6" stroke-linecap="round" />
    </g>

    <!-- LEFT EYE -->
    <g id="eye_left_group">
      <ellipse cx="330" cy="365" rx="38" ry="42" fill="#090d16" />
      <g id="iris_left">
        <ellipse cx="330" cy="365" rx="26" ry="32" fill="url(#alienEyeGrad)" />
        <circle cx="330" cy="365" r="8" fill="#ffffff" filter="url(#alienGlow)" />
        <circle cx="320" cy="350" r="8" fill="#ffffff" />
      </g>
      <path d="M 285 360 Q 330 310 375 360" fill="none" stroke="#a855f7" stroke-width="8" stroke-linecap="round" />
      <path id="eye_left_closed" d="M 288 368 Q 330 395 372 368" fill="none" stroke="#a855f7" stroke-width="8" stroke-linecap="round" style="display: none;" />
    </g>

    <!-- RIGHT EYE -->
    <g id="eye_right_group">
      <ellipse cx="470" cy="365" rx="38" ry="42" fill="#090d16" />
      <g id="iris_right">
        <ellipse cx="470" cy="365" rx="26" ry="32" fill="url(#alienEyeGrad)" />
        <circle cx="470" cy="365" r="8" fill="#ffffff" filter="url(#alienGlow)" />
        <circle cx="460" cy="350" r="8" fill="#ffffff" />
      </g>
      <path d="M 425 360 Q 470 310 515 360" fill="none" stroke="#a855f7" stroke-width="8" stroke-linecap="round" />
      <path id="eye_right_closed" d="M 428 368 Q 470 395 512 368" fill="none" stroke="#a855f7" stroke-width="8" stroke-linecap="round" style="display: none;" />
    </g>

    <!-- NOSE -->
    <g id="nose_group">
      <ellipse cx="400" cy="415" rx="3" ry="2" fill="#047857" opacity="0.8" />
    </g>

    <!-- MOUTH STATES -->
    <g id="mouth_group">
      <path id="mouth_closed" d="M 370 445 Q 400 458 430 445" fill="none" stroke="#047857" stroke-width="6" stroke-linecap="round" />
      <path id="mouth_smile" d="M 365 442 Q 400 475 435 442 Z" fill="#10b981" stroke="#047857" stroke-width="4" style="display: none;" />
      <g id="mouth_open_wide" style="display: none;">
        <path d="M 360 440 Q 400 425 440 440 Q 445 490 400 495 Q 355 490 360 440 Z" fill="#047857" stroke="#047857" stroke-width="5" />
        <path d="M 375 470 Q 400 450 425 470 Q 410 492 390 492 Z" fill="#34d399" />
      </g>
      <ellipse id="mouth_o" cx="400" cy="452" rx="18" ry="22" fill="#047857" stroke="#047857" stroke-width="5" style="display: none;" />
    </g>

    <!-- FRONT BANGS / HAIR LAYER -->
    <g id="hair_front_group">
      <path d="M 300 210 Q 340 310 330 330 Q 360 260 390 210 Z" fill="url(#alienSuitGrad)" />
      <path d="M 370 210 Q 410 320 430 310 Q 420 260 450 210 Z" fill="url(#alienSuitGrad)" />
    </g>

    <!-- EXPRESSION OVERLAYS (TOGGLEABLE) -->
    <g id="expressions_group">
      <g id="expr_blush" style="display: none;">
        <ellipse cx="305" cy="410" rx="22" ry="10" fill="#a855f7" opacity="0.6" />
        <ellipse cx="495" cy="410" rx="22" ry="10" fill="#a855f7" opacity="0.6" />
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
