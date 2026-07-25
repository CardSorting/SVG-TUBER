import { SVGPuppetDefinition } from '../types/tuber';

export const CyberNekoAvatar: SVGPuppetDefinition = {
  id: 'cyber_neko',
  name: 'Cyber Neko V2',
  author: 'SVG-TUBER Studio',
  defaultConfig: {
    hairSpringStiffness: 0.18,
    hairDamping: 0.85,
    earBounce: 0.8,
    bodySway: 0.3,
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
      <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%" color-interpolation="sRGB">
        <stop offset="0%" stop-color="#ec4899" />
        <stop offset="50%" stop-color="#a855f7" />
        <stop offset="100%" stop-color="#3b82f6" />
      </linearGradient>
      
      <linearGradient id="cyberEarGrad" x1="0%" y1="0%" x2="0%" y2="100%" color-interpolation="sRGB">
        <stop offset="0%" stop-color="#06b6d4" />
        <stop offset="100%" stop-color="#3b82f6" />
      </linearGradient>

      <linearGradient id="eyeGradLeft" x1="0%" y1="0%" x2="0%" y2="100%" color-interpolation="sRGB">
        <stop offset="0%" stop-color="#06b6d4" />
        <stop offset="60%" stop-color="#3b82f6" />
        <stop offset="100%" stop-color="#1d4ed8" />
      </linearGradient>

      <linearGradient id="eyeGradRight" x1="0%" y1="0%" x2="0%" y2="100%" color-interpolation="sRGB">
        <stop offset="0%" stop-color="#f43f5e" />
        <stop offset="60%" stop-color="#d946ef" />
        <stop offset="100%" stop-color="#8b5cf6" />
      </linearGradient>

      <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%" color-interpolation="sRGB">
        <stop offset="0%" stop-color="#fff5eb" />
        <stop offset="100%" stop-color="#ffedd5" />
      </linearGradient>

      <linearGradient id="jacketGrad" x1="0%" y1="0%" x2="100%" y2="100%" color-interpolation="sRGB">
        <stop offset="0%" stop-color="#0f172a" />
        <stop offset="100%" stop-color="#1e1b4b" />
      </linearGradient>

      <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <!-- BACK HAIR LAYER -->
    <g id="hair_back_group">
      <path d="M 220 380 Q 150 520 120 700 Q 100 800 180 820 Q 250 820 280 650 Q 300 500 320 400 Z" fill="url(#hairGrad)" opacity="0.9" />
      <path d="M 580 380 Q 650 520 680 700 Q 700 800 620 820 Q 550 820 520 650 Q 500 500 480 400 Z" fill="url(#hairGrad)" opacity="0.9" />
    </g>

    <!-- BODY & CLOTHING LAYER -->
    <g id="body_group">
      <!-- Neck -->
      <path d="M 360 480 L 440 480 L 450 560 Q 400 580 350 560 Z" fill="#ffedd5" />
      <path d="M 370 520 Q 400 540 430 520 Q 400 535 370 520 Z" fill="#fbcfe8" opacity="0.6" />

      <!-- Hoodie / Cyber Jacket -->
      <path d="M 240 600 Q 400 560 560 600 L 620 900 L 180 900 Z" fill="url(#jacketGrad)" stroke="#38bdf8" stroke-width="2" />
      <!-- Collar Neon Trims -->
      <path d="M 280 600 Q 340 720 400 730 Q 460 720 520 600 L 480 590 Q 400 690 320 590 Z" fill="#06b6d4" filter="url(#neonGlow)" />
      <!-- Inner Shirt & Choker -->
      <path d="M 340 550 L 460 550 L 450 630 L 350 630 Z" fill="#090d16" />
      <rect x="365" y="530" width="70" height="14" rx="7" fill="#06b6d4" />
      <circle cx="400" cy="537" r="5" fill="#f43f5e" />
    </g>

    <!-- CAT EARS (MOUNTED TO HEAD) -->
    <g id="ears_group">
      <!-- Left Ear -->
      <path d="M 240 280 Q 180 120 220 80 Q 280 120 320 230 Z" fill="#1e1b4b" stroke="#06b6d4" stroke-width="3" />
      <path d="M 245 260 Q 200 140 225 110 Q 270 140 300 230 Z" fill="url(#hairGrad)" />
      <path d="M 220 80 L 210 50" stroke="#06b6d4" stroke-width="4" stroke-linecap="round" filter="url(#neonGlow)" />

      <!-- Right Ear -->
      <path d="M 560 280 Q 620 120 580 80 Q 520 120 480 230 Z" fill="#1e1b4b" stroke="#f43f5e" stroke-width="3" />
      <path d="M 555 260 Q 600 140 575 110 Q 530 140 500 230 Z" fill="url(#hairGrad)" />
      <path d="M 580 80 L 590 50" stroke="#f43f5e" stroke-width="4" stroke-linecap="round" filter="url(#neonGlow)" />
    </g>

    <!-- HEAD BASE -->
    <g id="head_base_group">
      <!-- Face Contour -->
      <path d="M 260 260 Q 400 230 540 260 Q 560 400 490 480 Q 400 540 310 480 Q 240 400 260 260 Z" fill="url(#skinGrad)" />

      <!-- Cyber Headset Clips -->
      <rect x="230" y="320" width="25" height="50" rx="8" fill="#0f172a" stroke="#06b6d4" stroke-width="2" />
      <circle cx="242" cy="345" r="6" fill="#06b6d4" filter="url(#neonGlow)" />

      <rect x="545" y="320" width="25" height="50" rx="8" fill="#0f172a" stroke="#f43f5e" stroke-width="2" />
      <circle cx="557" cy="345" r="6" fill="#f43f5e" filter="url(#neonGlow)" />
    </g>

    <!-- EYEBROWS -->
    <g id="eyebrows_group">
      <path id="eyebrow_left" d="M 290 310 Q 330 295 365 315" fill="none" stroke="#8b5cf6" stroke-width="6" stroke-linecap="round" />
      <path id="eyebrow_right" d="M 435 315 Q 470 295 510 310" fill="none" stroke="#8b5cf6" stroke-width="6" stroke-linecap="round" />
    </g>

    <!-- LEFT EYE -->
    <g id="eye_left_group">
      <!-- Eye Socket & White -->
      <ellipse cx="330" cy="365" rx="38" ry="42" fill="#ffffff" />
      <!-- Iris -->
      <g id="iris_left">
        <ellipse cx="330" cy="365" rx="26" ry="32" fill="url(#eyeGradLeft)" />
        <circle cx="330" cy="365" r="12" fill="#090d16" />
        <!-- Highlights -->
        <circle cx="320" cy="350" r="8" fill="#ffffff" />
        <circle cx="342" cy="378" r="4" fill="#67e8f9" />
      </g>

      <!-- Eyelash / Upper Lid -->
      <path d="M 285 360 Q 330 315 375 360" fill="none" stroke="#0f172a" stroke-width="8" stroke-linecap="round" />
      <path d="M 280 355 L 270 345" stroke="#0f172a" stroke-width="5" stroke-linecap="round" />
      <path d="M 375 355 L 385 345" stroke="#0f172a" stroke-width="5" stroke-linecap="round" />

      <!-- Closed Eye Overlay (Hidden by default, shown when blink) -->
      <path id="eye_left_closed" d="M 288 368 Q 330 395 372 368" fill="none" stroke="#0f172a" stroke-width="8" stroke-linecap="round" style="display: none;" />
    </g>

    <!-- RIGHT EYE -->
    <g id="eye_right_group">
      <!-- Eye Socket & White -->
      <ellipse cx="470" cy="365" rx="38" ry="42" fill="#ffffff" />
      <!-- Iris -->
      <g id="iris_right">
        <ellipse cx="470" cy="365" rx="26" ry="32" fill="url(#eyeGradRight)" />
        <circle cx="470" cy="365" r="12" fill="#090d16" />
        <!-- Highlights -->
        <circle cx="460" cy="350" r="8" fill="#ffffff" />
        <circle cx="482" cy="378" r="4" fill="#f472b6" />
      </g>

      <!-- Eyelash / Upper Lid -->
      <path d="M 425 360 Q 470 315 515 360" fill="none" stroke="#0f172a" stroke-width="8" stroke-linecap="round" />
      <path d="M 425 355 L 415 345" stroke="#0f172a" stroke-width="5" stroke-linecap="round" />
      <path d="M 515 355 L 525 345" stroke="#0f172a" stroke-width="5" stroke-linecap="round" />

      <!-- Closed Eye Overlay -->
      <path id="eye_right_closed" d="M 428 368 Q 470 395 512 368" fill="none" stroke="#0f172a" stroke-width="8" stroke-linecap="round" style="display: none;" />
    </g>

    <!-- NOSE -->
    <g id="nose_group">
      <ellipse cx="400" cy="415" rx="3" ry="2" fill="#f43f5e" opacity="0.7" />
    </g>

    <!-- MOUTH STATES -->
    <g id="mouth_group">
      <!-- State 0: Neutral / Closed Line -->
      <path id="mouth_closed" d="M 370 445 Q 400 458 430 445" fill="none" stroke="#0f172a" stroke-width="6" stroke-linecap="round" />
      
      <!-- State 1: Smile / Talk Small -->
      <path id="mouth_smile" d="M 365 442 Q 400 475 435 442 Z" fill="#f43f5e" stroke="#0f172a" stroke-width="4" style="display: none;" />
      
      <!-- State 2: Open Wide (Speaking/A/E/I) -->
      <g id="mouth_open_wide" style="display: none;">
        <path d="M 360 440 Q 400 425 440 440 Q 445 490 400 495 Q 355 490 360 440 Z" fill="#be123c" stroke="#0f172a" stroke-width="5" />
        <!-- Tongue -->
        <path d="M 375 470 Q 400 450 425 470 Q 410 492 390 492 Z" fill="#fb7185" />
        <!-- Upper Teeth -->
        <path d="M 370 443 Q 400 452 430 443 L 425 450 Q 400 458 375 450 Z" fill="#ffffff" />
      </g>

      <!-- State 3: O-Shape (O/U phonemes) -->
      <ellipse id="mouth_o" cx="400" cy="452" rx="18" ry="22" fill="#be123c" stroke="#0f172a" stroke-width="5" style="display: none;" />
    </g>

    <!-- FRONT BANGS / HAIR LAYER -->
    <g id="hair_front_group">
      <!-- Left Bang Strand -->
      <path d="M 250 250 Q 220 340 260 440 Q 280 460 280 400 Q 260 310 300 240 Z" fill="url(#hairGrad)" />
      <!-- Center Bangs -->
      <path d="M 300 230 Q 340 330 330 350 Q 360 280 390 230 Z" fill="url(#hairGrad)" />
      <path d="M 370 230 Q 410 340 430 330 Q 420 280 450 230 Z" fill="url(#hairGrad)" />
      <!-- Right Bang Strand -->
      <path d="M 550 250 Q 580 340 540 440 Q 520 460 520 400 Q 540 310 500 240 Z" fill="url(#hairGrad)" />
      
      <!-- Top Ahoge (Silly hair strand) -->
      <path d="M 400 220 Q 370 140 430 110 Q 410 160 400 220 Z" fill="#ec4899" />
    </g>

    <!-- EXPRESSION OVERLAYS (TOGGLEABLE) -->
    <g id="expressions_group">
      <!-- Blush Marks -->
      <g id="expr_blush" style="display: none;">
        <ellipse cx="305" cy="410" rx="22" ry="10" fill="#f43f5e" opacity="0.5" />
        <ellipse cx="495" cy="410" rx="22" ry="10" fill="#f43f5e" opacity="0.5" />
        <path d="M 290 405 L 300 415 M 305 405 L 315 415 M 480 405 L 490 415 M 495 405 L 505 415" stroke="#e11d48" stroke-width="2" />
      </g>

      <!-- Angry Mark -->
      <g id="expr_angry" style="display: none;">
        <path d="M 520 270 L 550 270 M 535 255 L 535 285 M 523 258 L 547 282 M 547 258 L 523 282" stroke="#ef4444" stroke-width="6" stroke-linecap="round" />
      </g>

      <!-- Shock Lines -->
      <g id="expr_shock" style="display: none;">
        <path d="M 260 220 L 240 190 M 400 180 L 400 150 M 540 220 L 560 190" stroke="#38bdf8" stroke-width="5" stroke-linecap="round" />
        <ellipse cx="400" cy="380" rx="350" ry="250" fill="#0284c7" opacity="0.15" />
      </g>

      <!-- Tear Drops -->
      <g id="expr_tears" style="display: none;">
        <path d="M 315 390 Q 300 430 305 460 Q 320 460 325 430 Z" fill="#38bdf8" opacity="0.85" />
        <path d="M 485 390 Q 470 430 475 460 Q 490 460 495 430 Z" fill="#38bdf8" opacity="0.85" />
      </g>

      <!-- Star Eyes -->
      <g id="expr_stars" style="display: none;">
        <path d="M 330 345 L 335 360 L 350 365 L 335 370 L 330 385 L 325 370 L 310 365 L 325 360 Z" fill="#facc15" />
        <path d="M 470 345 L 475 360 L 490 365 L 475 370 L 470 385 L 465 370 L 450 365 L 465 360 Z" fill="#facc15" />
      </g>

      <!-- Heart Eyes -->
      <g id="expr_hearts" style="display: none;">
        <path d="M 330 375 C 330 375 310 355 310 345 C 310 338 318 335 325 340 C 330 345 330 345 330 345 C 330 345 330 345 335 340 C 342 335 350 338 350 345 C 350 355 330 375 330 375 Z" fill="#f43f5e" transform="scale(1.3) translate(-75, -75)" />
        <path d="M 470 375 C 470 375 450 355 450 345 C 450 338 458 335 465 340 C 470 345 470 345 470 345 C 470 345 470 345 475 340 C 482 335 490 338 490 345 C 490 355 470 375 470 375 Z" fill="#f43f5e" transform="scale(1.3) translate(-110, -75)" />
      </g>
    </g>
  </svg>
  `
};
