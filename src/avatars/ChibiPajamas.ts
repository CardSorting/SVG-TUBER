import { SVGPuppetDefinition } from '../types/tuber';

export const ChibiPajamasAvatar: SVGPuppetDefinition = {
  id: 'chibi_pajamas',
  name: 'Mochi Cat Pajamas',
  author: 'SVG-TUBER Studio',
  category: 'Cute',
  defaultConfig: {
    hairSpringStiffness: 0.32,
    hairDamping: 0.72,
    earBounce: 1.9,
    bodySway: 0.52,
    squishStrength: 0.85,
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
      <linearGradient id="mochiHoodGrad" x1="0%" y1="0%" x2="100%" y2="100%" color-interpolation="sRGB">
        <stop offset="0%" stop-color="#fbcfe8" />
        <stop offset="50%" stop-color="#f472b6" />
        <stop offset="100%" stop-color="#e11d48" />
      </linearGradient>

      <radialGradient id="mochiEyeGrad" cx="50%" cy="50%" r="50%" color-interpolation="sRGB">
        <stop offset="0%" stop-color="#38bdf8" />
        <stop offset="60%" stop-color="#0284c7" />
        <stop offset="100%" stop-color="#0f172a" />
      </radialGradient>

      <filter id="mochiGlow" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <!-- BACK HOODIE & TAIL LAYER -->
    <g id="hair_back_group">
      <path d="M 210 380 Q 120 540 90 760 Q 70 860 160 880 Q 230 880 260 700 Q 280 520 300 420 Z" fill="url(#mochiHoodGrad)" opacity="0.95" />
      <path d="M 590 380 Q 680 540 710 760 Q 730 860 640 880 Q 570 880 540 700 Q 520 520 500 420 Z" fill="url(#mochiHoodGrad)" opacity="0.95" />
    </g>

    <!-- BODY & OVERSIZED CAT PAJAMAS HOODIE -->
    <g id="body_group">
      <!-- Neck -->
      <path d="M 360 480 L 440 480 L 450 560 Q 400 580 350 560 Z" fill="#fff1f2" />
      <!-- Hoodie Strings -->
      <path d="M 360 520 Q 350 620 370 650" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" />
      <path d="M 440 520 Q 450 620 430 650" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" />
      <circle cx="370" cy="655" r="7" fill="#f472b6" />
      <circle cx="430" cy="655" r="7" fill="#f472b6" />

      <!-- Pastel Cat Onesie Body -->
      <path d="M 210 590 Q 400 530 590 590 L 650 900 L 150 900 Z" fill="url(#mochiHoodGrad)" stroke="#f472b6" stroke-width="3" />
      <!-- Front Boba Tea Pocket Graphic -->
      <rect x="350" y="660" width="100" height="120" rx="16" fill="#ffffff" opacity="0.9" />
      <ellipse cx="400" cy="720" rx="20" ry="25" fill="#a7f3d0" />
      <circle cx="390" cy="735" r="4" fill="#065f46" />
      <circle cx="410" cy="735" r="4" fill="#065f46" />
      <circle cx="400" cy="725" r="4" fill="#065f46" />
    </g>

    <!-- CAT PAJAMA HOOD EARS (MOUNTED TO HEAD) -->
    <g id="ears_group">
      <!-- Left Fleece Cat Ear -->
      <path d="M 270 230 Q 140 60 190 20 Q 240 50 310 180 Z" fill="url(#mochiHoodGrad)" stroke="#e11d48" stroke-width="4" />
      <path d="M 265 210 Q 170 70 195 45 Q 220 60 290 180 Z" fill="#ffe4e6" />
      <!-- Right Fleece Cat Ear -->
      <path d="M 530 230 Q 660 60 610 20 Q 560 50 490 180 Z" fill="url(#mochiHoodGrad)" stroke="#e11d48" stroke-width="4" />
      <path d="M 535 210 Q 630 70 605 45 Q 580 60 510 180 Z" fill="#ffe4e6" />
    </g>

    <!-- HEAD BASE -->
    <g id="head_base_group">
      <path d="M 260 260 Q 400 230 540 260 Q 560 400 490 480 Q 400 540 310 480 Q 240 400 260 260 Z" fill="#fff1f2" stroke="#f472b6" stroke-width="2" />
      <!-- Cute Cat Whiskers -->
      <path d="M 250 390 L 290 395 M 245 405 L 290 405" stroke="#f43f5e" stroke-width="3" stroke-linecap="round" />
      <path d="M 550 390 L 510 395 M 555 405 L 510 405" stroke="#f43f5e" stroke-width="3" stroke-linecap="round" />
    </g>

    <!-- EYEBROWS -->
    <g id="eyebrows_group">
      <path id="eyebrow_left" d="M 290 305 Q 330 285 365 305" fill="none" stroke="#f43f5e" stroke-width="6" stroke-linecap="round" />
      <path id="eyebrow_right" d="M 435 305 Q 470 285 510 305" fill="none" stroke="#f43f5e" stroke-width="6" stroke-linecap="round" />
    </g>

    <!-- LEFT EYE -->
    <g id="eye_left_group">
      <ellipse cx="330" cy="365" rx="38" ry="42" fill="#ffffff" />
      <g id="iris_left">
        <ellipse cx="330" cy="365" rx="26" ry="32" fill="url(#mochiEyeGrad)" />
        <circle cx="330" cy="365" r="10" fill="#0f172a" />
        <circle cx="320" cy="350" r="8" fill="#ffffff" />
        <circle cx="342" cy="378" r="4" fill="#a5f3fc" />
      </g>
      <path d="M 285 360 Q 330 310 375 360" fill="none" stroke="#0f172a" stroke-width="8" stroke-linecap="round" />
      <path id="eye_left_closed" d="M 288 368 Q 330 395 372 368" fill="none" stroke="#0f172a" stroke-width="8" stroke-linecap="round" style="display: none;" />
    </g>

    <!-- RIGHT EYE -->
    <g id="eye_right_group">
      <ellipse cx="470" cy="365" rx="38" ry="42" fill="#ffffff" />
      <g id="iris_right">
        <ellipse cx="470" cy="365" rx="26" ry="32" fill="url(#mochiEyeGrad)" />
        <circle cx="470" cy="365" r="10" fill="#0f172a" />
        <circle cx="460" cy="350" r="8" fill="#ffffff" />
        <circle cx="482" cy="378" r="4" fill="#a5f3fc" />
      </g>
      <path d="M 425 360 Q 470 310 515 360" fill="none" stroke="#0f172a" stroke-width="8" stroke-linecap="round" />
      <path id="eye_right_closed" d="M 428 368 Q 470 395 512 368" fill="none" stroke="#0f172a" stroke-width="8" stroke-linecap="round" style="display: none;" />
    </g>

    <!-- NOSE -->
    <g id="nose_group">
      <polygon points="400,412 396,418 404,418" fill="#f43f5e" />
    </g>

    <!-- MOUTH STATES -->
    <g id="mouth_group">
      <!-- State 0: Cute Cat :3 Mouth -->
      <path id="mouth_closed" d="M 375 440 Q 388 452 400 442 Q 412 452 425 440" fill="none" stroke="#0f172a" stroke-width="6" stroke-linecap="round" />
      <path id="mouth_smile" d="M 365 442 Q 400 475 435 442 Z" fill="#fb7185" stroke="#0f172a" stroke-width="4" style="display: none;" />
      <g id="mouth_open_wide" style="display: none;">
        <path d="M 360 440 Q 400 425 440 440 Q 445 490 400 495 Q 355 490 360 440 Z" fill="#be123c" stroke="#0f172a" stroke-width="5" />
        <path d="M 375 470 Q 400 450 425 470 Q 410 492 390 492 Z" fill="#fda4af" />
      </g>
      <ellipse id="mouth_o" cx="400" cy="452" rx="18" ry="22" fill="#be123c" stroke="#0f172a" stroke-width="5" style="display: none;" />
    </g>

    <!-- FRONT BANGS / HAIR LAYER -->
    <g id="hair_front_group">
      <path d="M 250 250 Q 220 340 260 440 Q 280 460 280 400 Q 260 310 300 240 Z" fill="url(#mochiHoodGrad)" />
      <path d="M 300 230 Q 340 330 330 350 Q 360 280 390 230 Z" fill="url(#mochiHoodGrad)" />
      <path d="M 370 230 Q 410 340 430 330 Q 420 280 450 230 Z" fill="url(#mochiHoodGrad)" />
      <path d="M 550 250 Q 580 340 540 440 Q 520 460 520 400 Q 540 310 500 240 Z" fill="url(#mochiHoodGrad)" />
    </g>

    <!-- EXPRESSION OVERLAYS (TOGGLEABLE) -->
    <g id="expressions_group">
      <g id="expr_blush" style="display: none;">
        <ellipse cx="305" cy="410" rx="22" ry="10" fill="#f43f5e" opacity="0.6" />
        <ellipse cx="495" cy="410" rx="22" ry="10" fill="#f43f5e" opacity="0.6" />
      </g>
      <g id="expr_angry" style="display: none;">
        <path d="M 520 270 L 550 270 M 535 255 L 535 285 M 523 258 L 547 282 M 547 258 L 523 282" stroke="#ef4444" stroke-width="6" stroke-linecap="round" />
      </g>
      <g id="expr_shock" style="display: none;">
        <path d="M 260 220 L 240 190 M 400 180 L 400 150 M 540 220 L 560 190" stroke="#f472b6" stroke-width="5" stroke-linecap="round" />
      </g>
      <g id="expr_tears" style="display: none;">
        <path d="M 315 390 Q 300 430 305 460 Q 320 460 325 430 Z" fill="#38bdf8" opacity="0.85" />
        <path d="M 485 390 Q 470 430 475 460 Q 490 460 495 430 Z" fill="#38bdf8" opacity="0.85" />
      </g>
      <g id="expr_stars" style="display: none;">
        <path d="M 330 345 L 335 360 L 350 365 L 335 370 L 330 385 L 325 370 L 310 365 L 325 360 Z" fill="#facc15" />
        <path d="M 470 345 L 475 360 L 490 365 L 475 370 L 470 385 L 465 370 L 450 365 L 465 360 Z" fill="#facc15" />
      </g>
      <g id="expr_hearts" style="display: none;">
        <path d="M 330 375 C 330 375 310 355 310 345 C 310 338 318 335 325 340 C 330 345 330 345 330 345 C 330 345 330 345 335 340 C 342 335 350 338 350 345 C 350 355 330 375 330 375 Z" fill="#e11d48" transform="scale(1.3) translate(-75, -75)" />
        <path d="M 470 375 C 470 375 450 355 450 345 C 450 338 458 335 465 340 C 470 345 470 345 470 345 C 470 345 470 345 475 340 C 482 335 490 338 490 345 C 490 355 470 375 470 375 Z" fill="#e11d48" transform="scale(1.3) translate(-110, -75)" />
      </g>
    </g>
  </svg>
  `
};
