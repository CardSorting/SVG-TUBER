import { SVGPuppetDefinition } from '../types/tuber';

export const VampireLordAvatar: SVGPuppetDefinition = {
  id: 'vampire_lord',
  name: 'Vampire Princess Carmilla',
  author: 'SVG-TUBER Studio',
  defaultConfig: {
    hairSpringStiffness: 0.2,
    hairDamping: 0.84,
    earBounce: 1.1,
    bodySway: 0.35,
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
      <!-- Gradients -->
      <linearGradient id="vampHairGrad" x1="0%" y1="0%" x2="100%" y2="100%" color-interpolation="sRGB">
        <stop offset="0%" stop-color="#4c1d95" />
        <stop offset="50%" stop-color="#7c3aed" />
        <stop offset="100%" stop-color="#be123c" />
      </linearGradient>

      <linearGradient id="vampEyeGradLeft" x1="0%" y1="0%" x2="0%" y2="100%" color-interpolation="sRGB">
        <stop offset="0%" stop-color="#f43f5e" />
        <stop offset="60%" stop-color="#be123c" />
        <stop offset="100%" stop-color="#4c0519" />
      </linearGradient>

      <linearGradient id="vampEyeGradRight" x1="0%" y1="0%" x2="0%" y2="100%" color-interpolation="sRGB">
        <stop offset="0%" stop-color="#fb7185" />
        <stop offset="60%" stop-color="#e11d48" />
        <stop offset="100%" stop-color="#881337" />
      </linearGradient>

      <linearGradient id="vampSkinGrad" x1="0%" y1="0%" x2="0%" y2="100%" color-interpolation="sRGB">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="100%" stop-color="#f5f3ff" />
      </linearGradient>

      <linearGradient id="vampCapeGrad" x1="0%" y1="0%" x2="100%" y2="100%" color-interpolation="sRGB">
        <stop offset="0%" stop-color="#0f172a" />
        <stop offset="50%" stop-color="#1e1b4b" />
        <stop offset="100%" stop-color="#4c0519" />
      </linearGradient>

      <filter id="vampGlow" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="7" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <!-- BACK HAIR LAYER & GOTHIC CAPE -->
    <g id="hair_back_group">
      <path d="M 210 370 Q 130 520 100 740 Q 80 840 170 860 Q 240 860 270 680 Q 290 500 310 400 Z" fill="url(#vampHairGrad)" opacity="0.95" />
      <path d="M 590 370 Q 670 520 700 740 Q 720 840 630 860 Q 560 860 530 680 Q 510 500 490 400 Z" fill="url(#vampHairGrad)" opacity="0.95" />
    </g>

    <!-- BODY & GOTHIC DRESS LAYER -->
    <g id="body_group">
      <!-- Pale Neck -->
      <path d="M 360 480 L 440 480 L 450 560 Q 400 580 350 560 Z" fill="url(#vampSkinGrad)" />
      <!-- Velvet Choker -->
      <rect x="365" y="525" width="70" height="14" rx="7" fill="#4c0519" stroke="#be123c" stroke-width="2" />
      <path d="M 400 539 L 400 550" stroke="#f43f5e" stroke-width="3" />
      <circle cx="400" cy="552" r="6" fill="#be123c" filter="url(#vampGlow)" />

      <!-- Gothic Dress & High Collar Cape -->
      <path d="M 230 600 Q 400 540 570 600 L 630 900 L 170 900 Z" fill="url(#vampCapeGrad)" stroke="#7c3aed" stroke-width="2" />
      <!-- High Crimson Collar -->
      <path d="M 260 580 Q 320 480 350 540 L 400 570 L 450 540 Q 480 480 540 580 Z" fill="#881337" stroke="#e11d48" stroke-width="3" />
      <!-- Corset Lacing -->
      <path d="M 380 620 L 420 640 M 420 640 L 380 660 M 380 660 L 420 680" stroke="#f43f5e" stroke-width="3" stroke-linecap="round" />
    </g>

    <!-- BAT WINGS / EARS (MOUNTED TO HEAD) -->
    <g id="ears_group">
      <!-- Left Bat Wing Ear -->
      <path d="M 240 270 Q 140 120 180 60 Q 240 120 220 160 Q 280 140 310 230 Z" fill="#1e1b4b" stroke="#e11d48" stroke-width="3" />
      <path d="M 245 250 Q 170 140 195 90 Q 240 140 290 220 Z" fill="url(#vampHairGrad)" opacity="0.8" />
      <!-- Right Bat Wing Ear -->
      <path d="M 560 270 Q 660 120 620 60 Q 560 120 580 160 Q 520 140 490 230 Z" fill="#1e1b4b" stroke="#e11d48" stroke-width="3" />
      <path d="M 555 250 Q 630 140 605 90 Q 560 140 510 220 Z" fill="url(#vampHairGrad)" opacity="0.8" />
    </g>

    <!-- HEAD BASE -->
    <g id="head_base_group">
      <!-- Pale Face Contour -->
      <path d="M 260 260 Q 400 230 540 260 Q 560 400 490 480 Q 400 540 310 480 Q 240 400 260 260 Z" fill="url(#vampSkinGrad)" stroke="#c4b5fd" stroke-width="1.5" />
    </g>

    <!-- EYEBROWS -->
    <g id="eyebrows_group">
      <path id="eyebrow_left" d="M 290 310 Q 330 290 365 310" fill="none" stroke="#6d28d9" stroke-width="6" stroke-linecap="round" />
      <path id="eyebrow_right" d="M 435 310 Q 470 290 510 310" fill="none" stroke="#6d28d9" stroke-width="6" stroke-linecap="round" />
    </g>

    <!-- LEFT EYE -->
    <g id="eye_left_group">
      <!-- Eye Socket & White -->
      <ellipse cx="330" cy="365" rx="38" ry="42" fill="#ffffff" />
      <!-- Iris -->
      <g id="iris_left">
        <ellipse cx="330" cy="365" rx="26" ry="32" fill="url(#vampEyeGradLeft)" />
        <ellipse cx="330" cy="365" rx="10" ry="18" fill="#090d16" />
        <!-- Ruby Highlights -->
        <circle cx="320" cy="350" r="8" fill="#ffffff" />
        <circle cx="342" cy="378" r="4" fill="#fda4af" />
      </g>
      <!-- Eyelash / Upper Lid -->
      <path d="M 285 360 Q 330 310 375 360" fill="none" stroke="#1e1b4b" stroke-width="8" stroke-linecap="round" />
      <path d="M 280 355 L 270 342" stroke="#1e1b4b" stroke-width="5" stroke-linecap="round" />
      <path d="M 375 355 L 385 342" stroke="#1e1b4b" stroke-width="5" stroke-linecap="round" />
      <!-- Closed Eye Overlay -->
      <path id="eye_left_closed" d="M 288 368 Q 330 395 372 368" fill="none" stroke="#1e1b4b" stroke-width="8" stroke-linecap="round" style="display: none;" />
    </g>

    <!-- RIGHT EYE -->
    <g id="eye_right_group">
      <!-- Eye Socket & White -->
      <ellipse cx="470" cy="365" rx="38" ry="42" fill="#ffffff" />
      <!-- Iris -->
      <g id="iris_right">
        <ellipse cx="470" cy="365" rx="26" ry="32" fill="url(#vampEyeGradRight)" />
        <ellipse cx="470" cy="365" rx="10" ry="18" fill="#090d16" />
        <!-- Ruby Highlights -->
        <circle cx="460" cy="350" r="8" fill="#ffffff" />
        <circle cx="482" cy="378" r="4" fill="#fda4af" />
      </g>
      <!-- Eyelash / Upper Lid -->
      <path d="M 425 360 Q 470 310 515 360" fill="none" stroke="#1e1b4b" stroke-width="8" stroke-linecap="round" />
      <path d="M 425 355 L 415 342" stroke="#1e1b4b" stroke-width="5" stroke-linecap="round" />
      <path d="M 515 355 L 525 342" stroke="#1e1b4b" stroke-width="5" stroke-linecap="round" />
      <!-- Closed Eye Overlay -->
      <path id="eye_right_closed" d="M 428 368 Q 470 395 512 368" fill="none" stroke="#1e1b4b" stroke-width="8" stroke-linecap="round" style="display: none;" />
    </g>

    <!-- NOSE -->
    <g id="nose_group">
      <ellipse cx="400" cy="415" rx="3" ry="2" fill="#be123c" opacity="0.6" />
    </g>

    <!-- MOUTH STATES (WITH VAMPIRE FANGS) -->
    <g id="mouth_group">
      <!-- State 0: Neutral / Closed Line -->
      <path id="mouth_closed" d="M 370 445 Q 400 458 430 445" fill="none" stroke="#1e1b4b" stroke-width="6" stroke-linecap="round" />

      <!-- State 1: Smile / Fangs Visible -->
      <g id="mouth_smile" style="display: none;">
        <path d="M 365 442 Q 400 475 435 442 Z" fill="#9f1239" stroke="#1e1b4b" stroke-width="4" />
        <!-- Vampire Fangs -->
        <polygon points="378,442 384,454 390,442" fill="#ffffff" />
        <polygon points="410,442 416,454 422,442" fill="#ffffff" />
      </g>

      <!-- State 2: Open Wide (Speaking/A/E/I) -->
      <g id="mouth_open_wide" style="display: none;">
        <path d="M 360 440 Q 400 425 440 440 Q 445 490 400 495 Q 355 490 360 440 Z" fill="#881337" stroke="#1e1b4b" stroke-width="5" />
        <!-- Tongue -->
        <path d="M 375 470 Q 400 450 425 470 Q 410 492 390 492 Z" fill="#f43f5e" />
        <!-- Upper Fangs -->
        <polygon points="374,440 382,458 390,440" fill="#ffffff" />
        <polygon points="410,440 418,458 426,440" fill="#ffffff" />
      </g>

      <!-- State 3: O-Shape (O/U phonemes) -->
      <ellipse id="mouth_o" cx="400" cy="452" rx="18" ry="22" fill="#881337" stroke="#1e1b4b" stroke-width="5" style="display: none;" />
    </g>

    <!-- FRONT BANGS / HAIR LAYER -->
    <g id="hair_front_group">
      <!-- Left Gothic Bang Strand -->
      <path d="M 250 250 Q 220 340 260 440 Q 280 460 280 400 Q 260 310 300 240 Z" fill="url(#vampHairGrad)" />
      <!-- Center Gothic Bangs -->
      <path d="M 300 230 Q 340 330 330 350 Q 360 280 390 230 Z" fill="url(#vampHairGrad)" />
      <path d="M 370 230 Q 410 340 430 330 Q 420 280 450 230 Z" fill="url(#vampHairGrad)" />
      <!-- Right Gothic Bang Strand -->
      <path d="M 550 250 Q 580 340 540 440 Q 520 460 520 400 Q 540 310 500 240 Z" fill="url(#vampHairGrad)" />
      <!-- Bat Hair Pin -->
      <path d="M 300 260 Q 280 240 290 230 Q 310 245 320 230 Q 330 240 310 260 Z" fill="#be123c" filter="url(#vampGlow)" />
    </g>

    <!-- EXPRESSION OVERLAYS (TOGGLEABLE) -->
    <g id="expressions_group">
      <!-- Blush Marks -->
      <g id="expr_blush" style="display: none;">
        <ellipse cx="305" cy="410" rx="22" ry="10" fill="#f43f5e" opacity="0.6" />
        <ellipse cx="495" cy="410" rx="22" ry="10" fill="#f43f5e" opacity="0.6" />
      </g>
      <!-- Angry Mark -->
      <g id="expr_angry" style="display: none;">
        <path d="M 520 270 L 550 270 M 535 255 L 535 285 M 523 258 L 547 282 M 547 258 L 523 282" stroke="#ef4444" stroke-width="6" stroke-linecap="round" />
      </g>
      <!-- Shock Lines -->
      <g id="expr_shock" style="display: none;">
        <path d="M 260 220 L 240 190 M 400 180 L 400 150 M 540 220 L 560 190" stroke="#a855f7" stroke-width="5" stroke-linecap="round" />
      </g>
      <!-- Tear Drops -->
      <g id="expr_tears" style="display: none;">
        <path d="M 315 390 Q 300 430 305 460 Q 320 460 325 430 Z" fill="#818cf8" opacity="0.85" />
        <path d="M 485 390 Q 470 430 475 460 Q 490 460 495 430 Z" fill="#818cf8" opacity="0.85" />
      </g>
      <!-- Star Eyes -->
      <g id="expr_stars" style="display: none;">
        <path d="M 330 345 L 335 360 L 350 365 L 335 370 L 330 385 L 325 370 L 310 365 L 325 360 Z" fill="#fb7185" />
        <path d="M 470 345 L 475 360 L 490 365 L 475 370 L 470 385 L 465 370 L 450 365 L 465 360 Z" fill="#fb7185" />
      </g>
      <!-- Heart Eyes -->
      <g id="expr_hearts" style="display: none;">
        <path d="M 330 375 C 330 375 310 355 310 345 C 310 338 318 335 325 340 C 330 345 330 345 330 345 C 330 345 330 345 335 340 C 342 335 350 338 350 345 C 350 355 330 375 330 375 Z" fill="#e11d48" transform="scale(1.3) translate(-75, -75)" />
        <path d="M 470 375 C 470 375 450 355 450 345 C 450 338 458 335 465 340 C 470 345 470 345 470 345 C 470 345 470 345 475 340 C 482 335 490 338 490 345 C 490 355 470 375 470 375 Z" fill="#e11d48" transform="scale(1.3) translate(-110, -75)" />
      </g>
    </g>
  </svg>
  `
};
