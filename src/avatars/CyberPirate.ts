import { SVGPuppetDefinition } from '../types/tuber';

export const CyberPirateAvatar: SVGPuppetDefinition = {
  id: 'cyber_pirate',
  name: 'Cyber Pirate Captain Drake',
  author: 'SVG-TUBER Studio',
  category: 'Sci-Fi',
  defaultConfig: {
    hairSpringStiffness: 0.26,
    hairDamping: 0.78,
    earBounce: 1.5,
    bodySway: 0.45,
    squishStrength: 0.65,
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
      <linearGradient id="pirateCoatGrad" x1="0%" y1="0%" x2="100%" y2="100%" color-interpolation="sRGB">
        <stop offset="0%" stop-color="#090d16" />
        <stop offset="50%" stop-color="#450a0a" />
        <stop offset="100%" stop-color="#991b1b" />
      </linearGradient>

      <radialGradient id="pirateEyeGrad" cx="50%" cy="50%" r="50%" color-interpolation="sRGB">
        <stop offset="0%" stop-color="#fef08a" />
        <stop offset="60%" stop-color="#eab308" />
        <stop offset="100%" stop-color="#78350f" />
      </radialGradient>

      <filter id="pirateGlow" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="7" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <!-- BACK LONG DREADLOCKS & TRICORN COAT TAILS LAYER -->
    <g id="hair_back_group">
      <path d="M 210 380 Q 120 540 90 760 Q 70 860 160 880 Q 230 880 260 700 Q 280 520 300 420 Z" fill="url(#pirateCoatGrad)" opacity="0.95" />
      <path d="M 590 380 Q 680 540 710 760 Q 730 860 640 880 Q 570 880 540 700 Q 520 520 500 420 Z" fill="url(#pirateCoatGrad)" opacity="0.95" />
    </g>

    <!-- BODY & PIRATE CAPTAIN JACKET -->
    <g id="body_group">
      <!-- Neck -->
      <path d="M 360 480 L 440 480 L 450 560 Q 400 580 350 560 Z" fill="#ffedd5" />
      <!-- Gold Chain -->
      <path d="M 350 530 Q 400 580 450 530" fill="none" stroke="#facc15" stroke-width="4" filter="url(#pirateGlow)" />

      <!-- Captain Coat -->
      <path d="M 220 600 Q 400 550 580 600 L 640 900 L 160 900 Z" fill="url(#pirateCoatGrad)" stroke="#facc15" stroke-width="3" />
      <!-- Gold Buttons -->
      <circle cx="360" cy="650" r="6" fill="#facc15" />
      <circle cx="440" cy="650" r="6" fill="#facc15" />
      <circle cx="360" cy="710" r="6" fill="#facc15" />
      <circle cx="440" cy="710" r="6" fill="#facc15" />
    </g>

    <!-- PIRATE TRICORN HAT / EARS (MOUNTED TO HEAD) -->
    <g id="ears_group">
      <!-- Tricorn Hat Wing Left -->
      <path d="M 220 220 L 120 160 L 260 100 Z" fill="#090d16" stroke="#facc15" stroke-width="3" />
      <!-- Tricorn Hat Wing Right -->
      <path d="M 580 220 L 680 160 L 540 100 Z" fill="#090d16" stroke="#facc15" stroke-width="3" />
      <!-- Crown Tricorn Fold -->
      <path d="M 200 180 Q 400 60 600 180 Q 400 240 200 180 Z" fill="#090d16" stroke="#facc15" stroke-width="4" />
      <!-- Neon Skull & Crossbones Emblem -->
      <circle cx="400" cy="150" r="16" fill="#ef4444" filter="url(#pirateGlow)" />
      <circle cx="394" cy="146" r="3" fill="#090d16" />
      <circle cx="406" cy="146" r="3" fill="#090d16" />
    </g>

    <!-- HEAD BASE -->
    <g id="head_base_group">
      <path d="M 260 260 Q 400 230 540 260 Q 560 400 490 480 Q 400 540 310 480 Q 240 400 260 260 Z" fill="#ffedd5" stroke="#facc15" stroke-width="2" />
    </g>

    <!-- EYEBROWS -->
    <g id="eyebrows_group">
      <path id="eyebrow_left" d="M 290 305 Q 330 285 365 305" fill="none" stroke="#78350f" stroke-width="7" stroke-linecap="round" />
      <path id="eyebrow_right" d="M 435 305 Q 470 285 510 305" fill="none" stroke="#78350f" stroke-width="7" stroke-linecap="round" />
    </g>

    <!-- LEFT EYE (CYBER EYE PATCH WITH TARGET RETICLE) -->
    <g id="eye_left_group">
      <ellipse cx="330" cy="365" rx="40" ry="40" fill="#090d16" stroke="#ef4444" stroke-width="4" />
      <!-- Cyber Reticle -->
      <circle cx="330" cy="365" r="16" fill="none" stroke="#ef4444" stroke-width="3" filter="url(#pirateGlow)" />
      <circle cx="330" cy="365" r="5" fill="#facc15" />
      <line x1="330" y1="340" x2="330" y2="390" stroke="#ef4444" stroke-width="2" />
      <line x1="305" y1="365" x2="355" y2="365" stroke="#ef4444" stroke-width="2" />
      <!-- Eye Strap -->
      <line x1="250" y1="330" x2="370" y2="380" stroke="#090d16" stroke-width="6" />
      <path id="eye_left_closed" d="M 288 368 Q 330 395 372 368" fill="none" stroke="#ef4444" stroke-width="8" stroke-linecap="round" style="display: none;" />
    </g>

    <!-- RIGHT EYE -->
    <g id="eye_right_group">
      <ellipse cx="470" cy="365" rx="38" ry="42" fill="#ffffff" />
      <g id="iris_right">
        <ellipse cx="470" cy="365" rx="26" ry="32" fill="url(#pirateEyeGrad)" />
        <circle cx="470" cy="365" r="10" fill="#090d16" />
        <circle cx="460" cy="350" r="8" fill="#ffffff" />
        <circle cx="482" cy="378" r="4" fill="#fef08a" />
      </g>
      <path d="M 425 360 Q 470 310 515 360" fill="none" stroke="#090d16" stroke-width="8" stroke-linecap="round" />
      <path id="eye_right_closed" d="M 428 368 Q 470 395 512 368" fill="none" stroke="#090d16" stroke-width="8" stroke-linecap="round" style="display: none;" />
    </g>

    <!-- NOSE -->
    <g id="nose_group">
      <polygon points="400,410 394,418 406,418" fill="#78350f" />
    </g>

    <!-- MOUTH STATES -->
    <g id="mouth_group">
      <path id="mouth_closed" d="M 370 445 Q 400 458 430 445" fill="none" stroke="#090d16" stroke-width="6" stroke-linecap="round" />
      <g id="mouth_smile" style="display: none;">
        <path d="M 365 442 Q 400 475 435 442 Z" fill="#ef4444" stroke="#090d16" stroke-width="4" />
        <rect x="385" y="442" width="10" height="12" fill="#facc15" />
      </g>
      <g id="mouth_open_wide" style="display: none;">
        <path d="M 360 440 Q 400 425 440 440 Q 445 490 400 495 Q 355 490 360 440 Z" fill="#78350f" stroke="#090d16" stroke-width="5" />
        <path d="M 375 470 Q 400 450 425 470 Q 410 492 390 492 Z" fill="#ef4444" />
        <rect x="380" y="440" width="12" height="14" fill="#facc15" />
      </g>
      <ellipse id="mouth_o" cx="400" cy="452" rx="18" ry="22" fill="#78350f" stroke="#090d16" stroke-width="5" style="display: none;" />
    </g>

    <!-- FRONT BANGS / HAIR LAYER -->
    <g id="hair_front_group">
      <path d="M 250 250 Q 220 340 260 440 Q 280 460 280 400 Q 260 310 300 240 Z" fill="url(#pirateCoatGrad)" />
      <path d="M 300 230 Q 340 330 330 350 Q 360 280 390 230 Z" fill="url(#pirateCoatGrad)" />
      <path d="M 370 230 Q 410 340 430 330 Q 420 280 450 230 Z" fill="url(#pirateCoatGrad)" />
      <path d="M 550 250 Q 580 340 540 440 Q 520 460 520 400 Q 540 310 500 240 Z" fill="url(#pirateCoatGrad)" />
    </g>

    <!-- EXPRESSION OVERLAYS (TOGGLEABLE) -->
    <g id="expressions_group">
      <g id="expr_blush" style="display: none;">
        <ellipse cx="305" cy="410" rx="22" ry="10" fill="#ef4444" opacity="0.6" />
        <ellipse cx="495" cy="410" rx="22" ry="10" fill="#ef4444" opacity="0.6" />
      </g>
      <g id="expr_angry" style="display: none;">
        <path d="M 520 270 L 550 270 M 535 255 L 535 285 M 523 258 L 547 282 M 547 258 L 523 282" stroke="#dc2626" stroke-width="6" stroke-linecap="round" />
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
        <path d="M 330 375 C 330 375 310 355 310 345 C 310 338 318 335 325 340 C 330 345 330 345 330 345 C 330 345 330 345 335 340 C 342 335 350 338 350 345 C 350 355 330 375 330 375 Z" fill="#ef4444" transform="scale(1.3) translate(-75, -75)" />
        <path d="M 470 375 C 470 375 450 355 450 345 C 450 338 458 335 465 340 C 470 345 470 345 470 345 C 470 345 470 345 475 340 C 482 335 490 338 490 345 C 490 355 470 375 470 375 Z" fill="#ef4444" transform="scale(1.3) translate(-110, -75)" />
      </g>
    </g>
  </svg>
  `
};
