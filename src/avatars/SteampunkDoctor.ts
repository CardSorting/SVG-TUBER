import { SVGPuppetDefinition } from '../types/tuber';

export const SteampunkDoctorAvatar: SVGPuppetDefinition = {
  id: 'steampunk_doctor',
  name: 'Plague Doctor Corvus',
  author: 'SVG-TUBER Studio',
  category: 'Sci-Fi',
  defaultConfig: { hairSpringStiffness: 0.25, hairDamping: 0.8, earBounce: 1.2, bodySway: 0.4, squishStrength: 0.6 },
  expressionLayers: { neutral: [], happy: ['expr_blush'], angry: ['expr_angry'], shocked: ['expr_shock'], blush: ['expr_blush'], tears: ['expr_tears'], star_eyes: ['expr_stars'], heart_eyes: ['expr_hearts'] },
  svgContent: `
  <svg viewBox="0 0 800 900" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" style="width:100%;height:100%;overflow:visible;">
    <defs>
      <linearGradient id="docCoatGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#18181b"/><stop offset="100%" stop-color="#3f3f46"/></linearGradient>
      <filter id="docGlow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="7" result="blur"/><feComposite in="SourceGraphic" in2="blur" operator="over"/></filter>
    </defs>
    <g id="hair_back_group"><path d="M210 380 Q120 540 90 760 Q70 860 160 880 Q230 880 260 700 Q280 520 300 420 Z" fill="url(#docCoatGrad)" opacity="0.95"/></g>
    <g id="body_group"><path d="M360 480 L440 480 L450 560 Q400 580 350 560 Z" fill="#27272a"/><path d="M220 600 Q400 550 580 600 L640 900 L160 900 Z" fill="url(#docCoatGrad)" stroke="#eab308" stroke-width="3"/></g>
    <g id="ears_group"><path d="M240 220 Q400 120 560 220 L580 150 Q400 80 220 150 Z" fill="#18181b" stroke="#eab308" stroke-width="3"/></g>
    <g id="head_base_group"><path d="M260 260 Q400 230 540 260 Q560 400 490 480 Q400 540 310 480 Q240 400 260 260 Z" fill="#fef3c7" stroke="#18181b" stroke-width="2"/></g>
    <g id="eyebrows_group"><path id="eyebrow_left" d="M290 305 Q330 285 365 305" fill="none" stroke="#18181b" stroke-width="7"/><path id="eyebrow_right" d="M435 305 Q470 285 510 305" fill="none" stroke="#18181b" stroke-width="7"/></g>
    <g id="eye_left_group"><circle cx="330" cy="365" r="42" fill="#18181b" stroke="#eab308" stroke-width="4"/><g id="iris_left"><circle cx="330" cy="365" r="16" fill="#eab308" filter="url(#docGlow)"/><circle cx="330" cy="365" r="6" fill="#18181b"/></g><path id="eye_left_closed" d="M288 368 Q330 395 372 368" fill="none" stroke="#eab308" stroke-width="8" style="display:none;"/></g>
    <g id="eye_right_group"><circle cx="470" cy="365" r="42" fill="#18181b" stroke="#eab308" stroke-width="4"/><g id="iris_right"><circle cx="470" cy="365" r="16" fill="#eab308" filter="url(#docGlow)"/><circle cx="470" cy="365" r="6" fill="#18181b"/></g><path id="eye_right_closed" d="M428 368 Q470 395 512 368" fill="none" stroke="#eab308" stroke-width="8" style="display:none;"/></g>
    <g id="nose_group"><polygon points="400,380 375,480 425,480" fill="#27272a" stroke="#18181b" stroke-width="3"/></g>
    <g id="mouth_group"><path id="mouth_closed" d="M370 475 Q400 488 430 475" fill="none" stroke="#18181b" stroke-width="6"/><path id="mouth_smile" d="M365 472 Q400 505 435 472 Z" fill="#eab308" style="display:none;"/><g id="mouth_open_wide" style="display:none;"><path d="M360 470 Q400 455 440 470 Q445 520 400 525 Z" fill="#18181b"/></g><ellipse id="mouth_o" cx="400" cy="482" rx="18" ry="22" fill="#18181b" style="display:none;"/></g>
    <g id="hair_front_group"><path d="M250 250 Q220 340 260 440 Q280 460 280 400 Q260 310 300 240 Z" fill="url(#docCoatGrad)"/></g>
    <g id="expressions_group">
      <g id="expr_blush" style="display:none;"><ellipse cx="305" cy="410" rx="22" ry="10" fill="#eab308" opacity="0.6"/><ellipse cx="495" cy="410" rx="22" ry="10" fill="#eab308" opacity="0.6"/></g>
      <g id="expr_angry" style="display:none;"><path d="M520 270 L550 270 M535 255 L535 285" stroke="#ef4444" stroke-width="6"/></g>
      <g id="expr_shock" style="display:none;"><path d="M260 220 L240 190 M400 180 L400 150" stroke="#fef08a" stroke-width="5"/></g>
      <g id="expr_tears" style="display:none;"><path d="M315 390 Q300 430 305 460 Z" fill="#38bdf8" opacity="0.85"/></g>
      <g id="expr_stars" style="display:none;"><path d="M330 345 L335 360 L350 365 L335 370 L330 385 Z" fill="#eab308"/></g>
      <g id="expr_hearts" style="display:none;"><path d="M330 375 C330 375 310 355 310 345 C310 338 318 335 325 340 Z" fill="#f43f5e" transform="scale(1.3) translate(-75,-75)"/></g>
    </g>
  </svg>
  `
};
