import { SVGPuppetDefinition } from '../types/tuber';

export const FoxSpiritAvatar: SVGPuppetDefinition = {
  id: 'fox_spirit',
  name: 'Fox Spirit Kitsune',
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
  <svg viewBox="0 0 800 900" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%; overflow: visible;">
    <defs>
      <linearGradient id="foxHairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f97316" />
        <stop offset="50%" stop-color="#fb923c" />
        <stop offset="100%" stop-color="#facc15" />
      </linearGradient>

      <linearGradient id="spiritTailGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ea580c" />
        <stop offset="70%" stop-color="#fdba74" />
        <stop offset="100%" stop-color="#ffffff" />
      </linearGradient>

      <radialGradient id="flameEyeGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#fef08a" />
        <stop offset="60%" stop-color="#f97316" />
        <stop offset="100%" stop-color="#c2410c" />
      </radialGradient>
    </defs>

    <!-- SPIRIT TAILS (NINE TAILS BACK LAYER) -->
    <g id="hair_back_group">
      <path d="M 220 500 Q 80 400 60 600 Q 80 750 250 680 Z" fill="url(#spiritTailGrad)" opacity="0.9" />
      <path d="M 180 480 Q 40 320 20 520 Q 40 680 200 620 Z" fill="url(#spiritTailGrad)" opacity="0.85" />
      <path d="M 580 500 Q 720 400 740 600 Q 720 750 550 680 Z" fill="url(#spiritTailGrad)" opacity="0.9" />
      <path d="M 620 480 Q 760 320 780 520 Q 760 680 600 620 Z" fill="url(#spiritTailGrad)" opacity="0.85" />
    </g>

    <!-- BODY & KIMONO -->
    <g id="body_group">
      <!-- Neck -->
      <path d="M 360 480 L 440 480 L 450 560 Q 400 580 350 560 Z" fill="#ffedd5" />
      <!-- Kimono Robe -->
      <path d="M 220 600 Q 400 550 580 600 L 640 900 L 160 900 Z" fill="#7c2d12" stroke="#ea580c" stroke-width="3" />
      <!-- Red Obi Sash -->
      <path d="M 280 620 Q 400 660 520 620 L 510 720 Q 400 750 290 720 Z" fill="#dc2626" />
      <circle cx="400" cy="670" r="16" fill="#facc15" stroke="#78350f" stroke-width="3" />
    </g>

    <!-- FOX KITSUNE EARS -->
    <g id="ears_group">
      <!-- Left Fox Ear -->
      <path d="M 240 260 Q 140 100 190 50 Q 280 100 310 210 Z" fill="#ea580c" stroke="#78350f" stroke-width="4" />
      <path d="M 245 240 Q 170 120 200 80 Q 260 120 290 210 Z" fill="#ffedd5" />
      <!-- Right Fox Ear -->
      <path d="M 560 260 Q 660 100 610 50 Q 520 100 490 210 Z" fill="#ea580c" stroke="#78350f" stroke-width="4" />
      <path d="M 555 240 Q 630 120 600 80 Q 540 120 510 210 Z" fill="#ffedd5" />
    </g>

    <!-- HEAD BASE -->
    <g id="head_base_group">
      <path d="M 260 260 Q 400 230 540 260 Q 560 400 490 480 Q 400 540 310 480 Q 240 400 260 260 Z" fill="#fff7ed" stroke="#fdba74" stroke-width="3" />
    </g>

    <!-- EYEBROWS -->
    <g id="eyebrows_group">
      <path id="eyebrow_left" d="M 290 310 Q 330 290 365 310" fill="none" stroke="#ea580c" stroke-width="6" stroke-linecap="round" />
      <path id="eyebrow_right" d="M 435 310 Q 470 290 510 310" fill="none" stroke="#ea580c" stroke-width="6" stroke-linecap="round" />
    </g>

    <!-- LEFT EYE -->
    <g id="eye_left_group">
      <ellipse cx="330" cy="365" rx="38" ry="42" fill="#ffffff" />
      <g id="iris_left">
        <ellipse cx="330" cy="365" rx="26" ry="32" fill="url(#flameEyeGrad)" />
        <circle cx="330" cy="365" r="10" fill="#451a03" />
        <circle cx="320" cy="350" r="8" fill="#ffffff" />
      </g>
      <path d="M 285 360 Q 330 315 375 360" fill="none" stroke="#451a03" stroke-width="8" stroke-linecap="round" />
      <path id="eye_left_closed" d="M 288 368 Q 330 395 372 368" fill="none" stroke="#451a03" stroke-width="8" stroke-linecap="round" style="display: none;" />
    </g>

    <!-- RIGHT EYE -->
    <g id="eye_right_group">
      <ellipse cx="470" cy="365" rx="38" ry="42" fill="#ffffff" />
      <g id="iris_right">
        <ellipse cx="470" cy="365" rx="26" ry="32" fill="url(#flameEyeGrad)" />
        <circle cx="470" cy="365" r="10" fill="#451a03" />
        <circle cx="460" cy="350" r="8" fill="#ffffff" />
      </g>
      <path d="M 425 360 Q 470 315 515 360" fill="none" stroke="#451a03" stroke-width="8" stroke-linecap="round" />
      <path id="eye_right_closed" d="M 428 368 Q 470 395 512 368" fill="none" stroke="#451a03" stroke-width="8" stroke-linecap="round" style="display: none;" />
    </g>

    <!-- NOSE -->
    <g id="nose_group">
      <ellipse cx="400" cy="415" rx="3" ry="2" fill="#ea580c" />
    </g>

    <!-- MOUTH STATES -->
    <g id="mouth_group">
      <path id="mouth_closed" d="M 370 445 Q 400 458 430 445" fill="none" stroke="#451a03" stroke-width="6" stroke-linecap="round" />
      <path id="mouth_smile" d="M 365 442 Q 400 475 435 442 Z" fill="#dc2626" stroke="#451a03" stroke-width="4" style="display: none;" />
      <g id="mouth_open_wide" style="display: none;">
        <path d="M 360 440 Q 400 425 440 440 Q 445 490 400 495 Q 355 490 360 440 Z" fill="#991b1b" stroke="#451a03" stroke-width="5" />
        <path d="M 375 470 Q 400 450 425 470 Q 410 492 390 492 Z" fill="#f87171" />
      </g>
      <ellipse id="mouth_o" cx="400" cy="452" rx="18" ry="22" fill="#991b1b" stroke="#451a03" stroke-width="5" style="display: none;" />
    </g>

    <!-- FRONT HAIR & FOX MASK ACCENT -->
    <g id="hair_front_group">
      <path d="M 250 250 Q 220 340 260 440 Q 280 460 280 400 Z" fill="url(#foxHairGrad)" />
      <path d="M 300 230 Q 340 330 330 350 Q 360 280 390 230 Z" fill="url(#foxHairGrad)" />
      <path d="M 370 230 Q 410 340 430 330 Q 420 280 450 230 Z" fill="url(#foxHairGrad)" />
      <path d="M 550 250 Q 580 340 540 440 Q 520 460 520 400 Z" fill="url(#foxHairGrad)" />

      <!-- Side Fox Mask -->
      <g transform="translate(460, 200) rotate(15) scale(0.6)">
        <path d="M 0 0 Q 50 -40 100 0 Q 110 50 80 80 Q 50 100 20 80 Z" fill="#ffffff" stroke="#dc2626" stroke-width="4" />
        <path d="M 20 30 Q 35 15 50 30" stroke="#dc2626" stroke-width="4" fill="none" />
        <path d="M 60 30 Q 75 15 90 30" stroke="#dc2626" stroke-width="4" fill="none" />
      </g>
    </g>

    <!-- EXPRESSIONS -->
    <g id="expressions_group">
      <g id="expr_blush" style="display: none;">
        <ellipse cx="305" cy="410" rx="22" ry="10" fill="#ef4444" opacity="0.6" />
        <ellipse cx="495" cy="410" rx="22" ry="10" fill="#ef4444" opacity="0.6" />
      </g>
      <g id="expr_angry" style="display: none;">
        <path d="M 520 270 L 550 270 M 535 255 L 535 285" stroke="#ef4444" stroke-width="6" stroke-linecap="round" />
      </g>
      <g id="expr_shock" style="display: none;">
        <path d="M 260 220 L 240 190 M 400 180 L 400 150 M 540 220 L 560 190" stroke="#38bdf8" stroke-width="5" stroke-linecap="round" />
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
        <path d="M 330 375 C 330 375 310 355 310 345 C 310 338 318 335 325 340 C 330 345 330 345 330 345 C 330 345 330 345 335 340 C 342 335 350 338 350 345 C 350 355 330 375 330 375 Z" fill="#ef4444" transform="scale(1.3) translate(-75, -75)" />
        <path d="M 470 375 C 470 375 450 355 450 345 C 450 338 458 335 465 340 C 470 345 470 345 470 345 C 470 345 470 345 475 340 C 482 335 490 338 490 345 C 490 355 470 375 470 375 Z" fill="#ef4444" transform="scale(1.3) translate(-110, -75)" />
      </g>
    </g>
  </svg>
  `
};
