import { SVGPuppetDefinition } from '../types/tuber';

export const SpaceIdolAvatar: SVGPuppetDefinition = {
  id: 'space_idol',
  name: 'Starlight Idol Astra',
  author: 'SVG-TUBER Studio',
  defaultConfig: {
    hairSpringStiffness: 0.22,
    hairDamping: 0.82,
    earBounce: 1.2,
    bodySway: 0.4,
    squishStrength: 0.6,
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
      <linearGradient id="idolHairGrad" x1="0%" y1="0%" x2="100%" y2="100%" color-interpolation="sRGB">
        <stop offset="0%" stop-color="#ec4899" />
        <stop offset="50%" stop-color="#f43f5e" />
        <stop offset="100%" stop-color="#facc15" />
      </linearGradient>

      <linearGradient id="idolDressGrad" x1="0%" y1="0%" x2="100%" y2="100%" color-interpolation="sRGB">
        <stop offset="0%" stop-color="#be123c" />
        <stop offset="50%" stop-color="#881337" />
        <stop offset="100%" stop-color="#4c0519" />
      </linearGradient>

      <radialGradient id="idolEyeGrad" cx="50%" cy="50%" r="50%" color-interpolation="sRGB">
        <stop offset="0%" stop-color="#fef08a" />
        <stop offset="60%" stop-color="#f43f5e" />
        <stop offset="100%" stop-color="#881337" />
      </radialGradient>

      <filter id="idolGlow" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <!-- BACK COSMIC RIBBONS LAYER -->
    <g id="hair_back_group">
      <path d="M 200 480 Q 80 340 60 620 Q 80 780 250 700 Z" fill="url(#idolHairGrad)" opacity="0.9" />
      <path d="M 600 480 Q 720 340 740 620 Q 720 780 550 700 Z" fill="url(#idolHairGrad)" opacity="0.9" />
    </g>

    <!-- BODY & IDOL STAGE OUTFIT -->
    <g id="body_group">
      <!-- Neck -->
      <path d="M 360 480 L 440 480 L 450 560 Q 400 580 350 560 Z" fill="#fff1f2" />
      <!-- Star Mic Headset Choker -->
      <rect x="365" y="525" width="70" height="14" rx="7" fill="#be123c" stroke="#f43f5e" stroke-width="2" />
      <path d="M 370 532 Q 330 550 330 580" fill="none" stroke="#facc15" stroke-width="3" stroke-linecap="round" />
      <circle cx="330" cy="580" r="7" fill="#facc15" filter="url(#idolGlow)" />

      <!-- Idol Dress & Frills -->
      <path d="M 220 600 Q 400 550 580 600 L 640 900 L 160 900 Z" fill="url(#idolDressGrad)" stroke="#f43f5e" stroke-width="3" />
      <!-- Gold Ribbon Bow -->
      <path d="M 330 600 Q 400 640 470 600 L 450 630 Q 400 660 350 630 Z" fill="#facc15" stroke="#78350f" stroke-width="2" />
      <polygon points="400,605 408,620 425,620 412,630 417,645 400,635 383,645 388,630 375,620 392,620" fill="#fef08a" filter="url(#idolGlow)" />
    </g>

    <!-- STAR HAIR BUNS / EARS (MOUNTED TO HEAD) -->
    <g id="ears_group">
      <!-- Left Star Bun -->
      <circle cx="240" cy="200" r="45" fill="url(#idolHairGrad)" stroke="#f43f5e" stroke-width="4" />
      <polygon points="240,165 248,185 270,185 253,197 259,218 240,205 221,218 227,197 210,185 232,185" fill="#fef08a" filter="url(#idolGlow)" />
      <!-- Right Star Bun -->
      <circle cx="560" cy="200" r="45" fill="url(#idolHairGrad)" stroke="#f43f5e" stroke-width="4" />
      <polygon points="560,165 568,185 590,185 573,197 579,218 560,205 541,218 547,197 530,185 552,185" fill="#fef08a" filter="url(#idolGlow)" />
    </g>

    <!-- HEAD BASE -->
    <g id="head_base_group">
      <path d="M 260 260 Q 400 230 540 260 Q 560 400 490 480 Q 400 540 310 480 Q 240 400 260 260 Z" fill="#fff1f2" stroke="#fda4af" stroke-width="2" />
    </g>

    <!-- EYEBROWS -->
    <g id="eyebrows_group">
      <path id="eyebrow_left" d="M 290 305 Q 330 285 365 305" fill="none" stroke="#be123c" stroke-width="6" stroke-linecap="round" />
      <path id="eyebrow_right" d="M 435 305 Q 470 285 510 305" fill="none" stroke="#be123c" stroke-width="6" stroke-linecap="round" />
    </g>

    <!-- LEFT EYE -->
    <g id="eye_left_group">
      <ellipse cx="330" cy="365" rx="38" ry="42" fill="#ffffff" />
      <g id="iris_left">
        <ellipse cx="330" cy="365" rx="26" ry="32" fill="url(#idolEyeGrad)" />
        <polygon points="330,345 334,357 347,357 337,365 341,377 330,370 319,377 323,365 313,357 326,357" fill="#fef08a" />
        <circle cx="320" cy="350" r="8" fill="#ffffff" />
        <circle cx="342" cy="378" r="4" fill="#fda4af" />
      </g>
      <path d="M 285 360 Q 330 310 375 360" fill="none" stroke="#0f172a" stroke-width="8" stroke-linecap="round" />
      <path id="eye_left_closed" d="M 288 368 Q 330 395 372 368" fill="none" stroke="#0f172a" stroke-width="8" stroke-linecap="round" style="display: none;" />
    </g>

    <!-- RIGHT EYE -->
    <g id="eye_right_group">
      <ellipse cx="470" cy="365" rx="38" ry="42" fill="#ffffff" />
      <g id="iris_right">
        <ellipse cx="470" cy="365" rx="26" ry="32" fill="url(#idolEyeGrad)" />
        <polygon points="470,345 474,357 487,357 477,365 481,377 470,370 459,377 463,365 453,357 466,357" fill="#fef08a" />
        <circle cx="460" cy="350" r="8" fill="#ffffff" />
        <circle cx="482" cy="378" r="4" fill="#fda4af" />
      </g>
      <path d="M 425 360 Q 470 310 515 360" fill="none" stroke="#0f172a" stroke-width="8" stroke-linecap="round" />
      <path id="eye_right_closed" d="M 428 368 Q 470 395 512 368" fill="none" stroke="#0f172a" stroke-width="8" stroke-linecap="round" style="display: none;" />
    </g>

    <!-- NOSE -->
    <g id="nose_group">
      <ellipse cx="400" cy="415" rx="3" ry="2" fill="#f43f5e" opacity="0.7" />
    </g>

    <!-- MOUTH STATES -->
    <g id="mouth_group">
      <path id="mouth_closed" d="M 370 445 Q 400 458 430 445" fill="none" stroke="#0f172a" stroke-width="6" stroke-linecap="round" />
      <path id="mouth_smile" d="M 365 442 Q 400 475 435 442 Z" fill="#f43f5e" stroke="#0f172a" stroke-width="4" style="display: none;" />
      <g id="mouth_open_wide" style="display: none;">
        <path d="M 360 440 Q 400 425 440 440 Q 445 490 400 495 Q 355 490 360 440 Z" fill="#be123c" stroke="#0f172a" stroke-width="5" />
        <path d="M 375 470 Q 400 450 425 470 Q 410 492 390 492 Z" fill="#fb7185" />
      </g>
      <ellipse id="mouth_o" cx="400" cy="452" rx="18" ry="22" fill="#be123c" stroke="#0f172a" stroke-width="5" style="display: none;" />
    </g>

    <!-- FRONT BANGS / HAIR LAYER -->
    <g id="hair_front_group">
      <path d="M 250 250 Q 220 340 260 440 Q 280 460 280 400 Q 260 310 300 240 Z" fill="url(#idolHairGrad)" />
      <path d="M 300 230 Q 340 330 330 350 Q 360 280 390 230 Z" fill="url(#idolHairGrad)" />
      <path d="M 370 230 Q 410 340 430 330 Q 420 280 450 230 Z" fill="url(#idolHairGrad)" />
      <path d="M 550 250 Q 580 340 540 440 Q 520 460 520 400 Q 540 310 500 240 Z" fill="url(#idolHairGrad)" />
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
        <path d="M 260 220 L 240 190 M 400 180 L 400 150 M 540 220 L 560 190" stroke="#facc15" stroke-width="5" stroke-linecap="round" />
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
        <path d="M 330 375 C 330 375 310 355 310 345 C 310 338 318 335 325 340 C 330 345 330 345 330 345 C 330 345 330 345 335 340 C 342 335 350 338 350 345 C 350 355 330 375 330 375 Z" fill="#f43f5e" transform="scale(1.3) translate(-75, -75)" />
        <path d="M 470 375 C 470 375 450 355 450 345 C 450 338 458 335 465 340 C 470 345 470 345 470 345 C 470 345 470 345 475 340 C 482 335 490 338 490 345 C 490 355 470 375 470 375 Z" fill="#f43f5e" transform="scale(1.3) translate(-110, -75)" />
      </g>
    </g>
  </svg>
  `
};
