import { SVGPuppetDefinition } from '../types/tuber';

export const CyberSamuraiAvatar: SVGPuppetDefinition = {
  id: 'cyber_samurai',
  name: 'Ronin Cyber-Blade',
  author: 'SVG-TUBER Studio',
  defaultConfig: {
    hairSpringStiffness: 0.22,
    hairDamping: 0.82,
    earBounce: 1.1,
    bodySway: 0.35,
    squishStrength: 0.5,
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
      <linearGradient id="samuraiHairGrad" x1="0%" y1="0%" x2="100%" y2="100%" color-interpolation="sRGB">
        <stop offset="0%" stop-color="#18181b" />
        <stop offset="50%" stop-color="#b91c1c" />
        <stop offset="100%" stop-color="#f59e0b" />
      </linearGradient>

      <linearGradient id="samuraiArmorGrad" x1="0%" y1="0%" x2="100%" y2="100%" color-interpolation="sRGB">
        <stop offset="0%" stop-color="#0f172a" />
        <stop offset="50%" stop-color="#1e293b" />
        <stop offset="100%" stop-color="#791515" />
      </linearGradient>

      <radialGradient id="samuraiEyeGrad" cx="50%" cy="50%" r="50%" color-interpolation="sRGB">
        <stop offset="0%" stop-color="#fef08a" />
        <stop offset="60%" stop-color="#ef4444" />
        <stop offset="100%" stop-color="#450a0a" />
      </radialGradient>

      <filter id="samuraiGlow" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="7" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <!-- BACK SAMURAI KATANA SHEATH & HAIR -->
    <g id="hair_back_group">
      <!-- Katana Blade Handle Sheath -->
      <path d="M 180 320 L 640 780" stroke="#f59e0b" stroke-width="14" stroke-linecap="round" filter="url(#samuraiGlow)" />
      <path d="M 180 320 L 640 780" stroke="#18181b" stroke-width="8" stroke-linecap="round" />
      <!-- Top Knot Hair -->
      <path d="M 360 140 Q 400 80 440 140 Z" fill="url(#samuraiHairGrad)" />
      <circle cx="400" cy="140" r="16" fill="#b91c1c" stroke="#f59e0b" stroke-width="3" />
    </g>

    <!-- BODY & SAMURAI KABUTO ARMOR -->
    <g id="body_group">
      <!-- Neck -->
      <path d="M 360 480 L 440 480 L 450 560 Q 400 580 350 560 Z" fill="#ffedd5" />
      <!-- Armor Collar -->
      <rect x="365" y="525" width="70" height="14" rx="7" fill="#791515" stroke="#ef4444" stroke-width="2" />
      <circle cx="400" cy="532" r="5" fill="#facc15" filter="url(#samuraiGlow)" />

      <!-- Samurai Chestplate Armor -->
      <path d="M 220 600 Q 400 550 580 600 L 640 900 L 160 900 Z" fill="url(#samuraiArmorGrad)" stroke="#ef4444" stroke-width="3" />
      <!-- Gold Dragon Crest Plates -->
      <path d="M 320 620 L 400 660 L 480 620 L 460 720 L 400 750 L 340 720 Z" fill="#b91c1c" stroke="#f59e0b" stroke-width="3" />
      <circle cx="400" cy="680" r="16" fill="#facc15" filter="url(#samuraiGlow)" />
    </g>

    <!-- KABUTO CREST / HORNS / EARS (MOUNTED TO HEAD) -->
    <g id="ears_group">
      <!-- Left Golden Kabuto Horn -->
      <path d="M 260 250 Q 140 90 200 50 Q 250 90 290 190 Z" fill="#b91c1c" stroke="#f59e0b" stroke-width="4" />
      <path d="M 240 200 Q 170 100 200 65" fill="none" stroke="#fef08a" stroke-width="3" filter="url(#samuraiGlow)" />
      <!-- Right Golden Kabuto Horn -->
      <path d="M 540 250 Q 660 90 600 50 Q 550 90 510 190 Z" fill="#b91c1c" stroke="#f59e0b" stroke-width="4" />
      <path d="M 560 200 Q 630 100 600 65" fill="none" stroke="#fef08a" stroke-width="3" filter="url(#samuraiGlow)" />
    </g>

    <!-- HEAD BASE -->
    <g id="head_base_group">
      <path d="M 260 260 Q 400 230 540 260 Q 560 400 490 480 Q 400 540 310 480 Q 240 400 260 260 Z" fill="#ffedd5" stroke="#ef4444" stroke-width="2" />
      <!-- Red Samurai Face Paint Mark -->
      <path d="M 310 400 L 290 440 L 330 430 Z" fill="#b91c1c" opacity="0.8" />
      <path d="M 490 400 L 510 440 L 470 430 Z" fill="#b91c1c" opacity="0.8" />
    </g>

    <!-- EYEBROWS -->
    <g id="eyebrows_group">
      <path id="eyebrow_left" d="M 290 305 Q 330 285 365 305" fill="none" stroke="#b91c1c" stroke-width="7" stroke-linecap="round" />
      <path id="eyebrow_right" d="M 435 305 Q 470 285 510 305" fill="none" stroke="#b91c1c" stroke-width="7" stroke-linecap="round" />
    </g>

    <!-- LEFT EYE -->
    <g id="eye_left_group">
      <ellipse cx="330" cy="365" rx="38" ry="42" fill="#ffffff" />
      <g id="iris_left">
        <ellipse cx="330" cy="365" rx="26" ry="32" fill="url(#samuraiEyeGrad)" />
        <circle cx="330" cy="365" r="10" fill="#18181b" />
        <circle cx="320" cy="350" r="8" fill="#ffffff" />
        <circle cx="342" cy="378" r="4" fill="#fef08a" />
      </g>
      <path d="M 285 360 Q 330 310 375 360" fill="none" stroke="#18181b" stroke-width="8" stroke-linecap="round" />
      <path id="eye_left_closed" d="M 288 368 Q 330 395 372 368" fill="none" stroke="#18181b" stroke-width="8" stroke-linecap="round" style="display: none;" />
    </g>

    <!-- RIGHT EYE -->
    <g id="eye_right_group">
      <ellipse cx="470" cy="365" rx="38" ry="42" fill="#ffffff" />
      <g id="iris_right">
        <ellipse cx="470" cy="365" rx="26" ry="32" fill="url(#samuraiEyeGrad)" />
        <circle cx="470" cy="365" r="10" fill="#18181b" />
        <circle cx="460" cy="350" r="8" fill="#ffffff" />
        <circle cx="482" cy="378" r="4" fill="#fef08a" />
      </g>
      <path d="M 425 360 Q 470 310 515 360" fill="none" stroke="#18181b" stroke-width="8" stroke-linecap="round" />
      <path id="eye_right_closed" d="M 428 368 Q 470 395 512 368" fill="none" stroke="#18181b" stroke-width="8" stroke-linecap="round" style="display: none;" />
    </g>

    <!-- NOSE -->
    <g id="nose_group">
      <ellipse cx="400" cy="415" rx="3" ry="2" fill="#b91c1c" opacity="0.7" />
    </g>

    <!-- MOUTH STATES -->
    <g id="mouth_group">
      <path id="mouth_closed" d="M 370 445 Q 400 458 430 445" fill="none" stroke="#18181b" stroke-width="6" stroke-linecap="round" />
      <path id="mouth_smile" d="M 365 442 Q 400 475 435 442 Z" fill="#b91c1c" stroke="#18181b" stroke-width="4" style="display: none;" />
      <g id="mouth_open_wide" style="display: none;">
        <path d="M 360 440 Q 400 425 440 440 Q 445 490 400 495 Q 355 490 360 440 Z" fill="#791515" stroke="#18181b" stroke-width="5" />
        <path d="M 375 470 Q 400 450 425 470 Q 410 492 390 492 Z" fill="#ef4444" />
      </g>
      <ellipse id="mouth_o" cx="400" cy="452" rx="18" ry="22" fill="#791515" stroke="#18181b" stroke-width="5" style="display: none;" />
    </g>

    <!-- FRONT BANGS / HAIR LAYER -->
    <g id="hair_front_group">
      <path d="M 250 250 Q 220 340 260 440 Q 280 460 280 400 Q 260 310 300 240 Z" fill="url(#samuraiHairGrad)" />
      <path d="M 300 230 Q 340 330 330 350 Q 360 280 390 230 Z" fill="url(#samuraiHairGrad)" />
      <path d="M 370 230 Q 410 340 430 330 Q 420 280 450 230 Z" fill="url(#samuraiHairGrad)" />
      <path d="M 550 250 Q 580 340 540 440 Q 520 460 520 400 Q 540 310 500 240 Z" fill="url(#samuraiHairGrad)" />
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
        <path d="M 330 375 C 330 375 310 355 310 345 C 310 338 318 335 325 340 C 330 345 330 345 330 345 C 330 345 330 345 335 340 C 342 335 350 338 350 345 C 350 355 330 375 330 375 Z" fill="#b91c1c" transform="scale(1.3) translate(-75, -75)" />
        <path d="M 470 375 C 470 375 450 355 450 345 C 450 338 458 335 465 340 C 470 345 470 345 470 345 C 470 345 470 345 475 340 C 482 335 490 338 490 345 C 490 355 470 375 470 375 Z" fill="#b91c1c" transform="scale(1.3) translate(-110, -75)" />
      </g>
    </g>
  </svg>
  `
};
