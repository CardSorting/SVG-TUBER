import { SVGPuppetDefinition } from '../types/tuber';

export const FairyButterflyAvatar: SVGPuppetDefinition = {
  id: 'fairy_butterfly',
  name: 'Prismatic Butterfly Fairy Flora',
  author: 'SVG-TUBER Studio',
  category: 'Fantasy',
  defaultConfig: { hairSpringStiffness: 0.36, hairDamping: 0.64, earBounce: 2.2, bodySway: 0.6, squishStrength: 0.88 },
  expressionLayers: { neutral: [], happy: ['expr_blush'], angry: ['expr_angry'], shocked: ['expr_shock'], blush: ['expr_blush'], tears: ['expr_tears'], star_eyes: ['expr_stars'], heart_eyes: ['expr_hearts'] },
  svgContent: `
  <svg viewBox="0 0 800 900" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" style="width:100%;height:100%;overflow:visible;">
    <defs>
      <linearGradient id="fairyWingsGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#34d399"/><stop offset="50%" stop-color="#38bdf8"/><stop offset="100%" stop-color="#c084fc"/></linearGradient>
      <filter id="fairyGlow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="9" result="blur"/><feComposite in="SourceGraphic" in2="blur" operator="over"/></filter>
    </defs>
    <g id="hair_back_group"><path d="M180 400 Q20 220 10 460 Q30 640 220 560 Z" fill="url(#fairyWingsGrad)" opacity="0.85" filter="url(#fairyGlow)"/><path d="M620 400 Q780 220 790 460 Q770 640 580 560 Z" fill="url(#fairyWingsGrad)" opacity="0.85" filter="url(#fairyGlow)"/></g>
    <g id="body_group"><path d="M360 480 L440 480 L450 560 Q400 580 350 560 Z" fill="#fff7ed"/><path d="M220 600 Q400 550 580 600 L640 900 L160 900 Z" fill="url(#fairyWingsGrad)" opacity="0.9" stroke="#34d399" stroke-width="3"/></g>
    <g id="ears_group"><path d="M280 220 Q180 80 210 20 Q250 50 290 180 Z" fill="url(#fairyWingsGrad)" stroke="#34d399" stroke-width="3"/><circle cx="210" cy="20" r="12" fill="#fef08a" filter="url(#fairyGlow)"/><path d="M520 220 Q620 80 590 20 Q550 50 510 180 Z" fill="url(#fairyWingsGrad)" stroke="#34d399" stroke-width="3"/><circle cx="590" cy="20" r="12" fill="#fef08a" filter="url(#fairyGlow)"/></g>
    <g id="head_base_group"><path d="M260 260 Q400 230 540 260 Q560 400 490 480 Q400 540 310 480 Q240 400 260 260 Z" fill="#fff7ed" stroke="#34d399" stroke-width="2"/></g>
    <g id="eyebrows_group"><path id="eyebrow_left" d="M290 305 Q330 285 365 305" fill="none" stroke="#059669" stroke-width="6"/><path id="eyebrow_right" d="M435 305 Q470 285 510 305" fill="none" stroke="#059669" stroke-width="6"/></g>
    <g id="eye_left_group"><ellipse cx="330" cy="365" rx="38" ry="42" fill="#ffffff"/><g id="iris_left"><ellipse cx="330" cy="365" rx="26" ry="32" fill="#34d399"/><circle cx="330" cy="365" r="8" fill="#064e3b"/><circle cx="320" cy="350" r="8" fill="#ffffff"/></g><path d="M285 360 Q330 310 375 360" fill="none" stroke="#064e3b" stroke-width="8"/><path id="eye_left_closed" d="M288 368 Q330 395 372 368" fill="none" stroke="#064e3b" stroke-width="8" style="display:none;"/></g>
    <g id="eye_right_group"><ellipse cx="470" cy="365" rx="38" ry="42" fill="#ffffff"/><g id="iris_right"><ellipse cx="470" cy="365" rx="26" ry="32" fill="#34d399"/><circle cx="470" cy="365" r="8" fill="#064e3b"/><circle cx="460" cy="350" r="8" fill="#ffffff"/></g><path d="M425 360 Q470 310 515 360" fill="none" stroke="#064e3b" stroke-width="8"/><path id="eye_right_closed" d="M428 368 Q470 395 512 368" fill="none" stroke="#064e3b" stroke-width="8" style="display:none;"/></g>
    <g id="nose_group"><ellipse cx="400" cy="415" rx="3" ry="2" fill="#10b981"/></g>
    <g id="mouth_group"><path id="mouth_closed" d="M370 445 Q400 458 430 445" fill="none" stroke="#064e3b" stroke-width="6"/><path id="mouth_smile" d="M365 442 Q400 475 435 442 Z" fill="#34d399" style="display:none;"/><g id="mouth_open_wide" style="display:none;"><path d="M360 440 Q400 425 440 440 Q445 490 400 495 Q355 490 360 440 Z" fill="#059669"/></g><ellipse id="mouth_o" cx="400" cy="452" rx="18" ry="22" fill="#059669" style="display:none;"/></g>
    <g id="hair_front_group"><path d="M250 250 Q220 340 260 440 Q280 460 280 400 Q260 310 300 240 Z" fill="url(#fairyWingsGrad)" opacity="0.9"/></g>
    <g id="expressions_group">
      <g id="expr_blush" style="display:none;"><ellipse cx="305" cy="410" rx="22" ry="10" fill="#34d399" opacity="0.6"/><ellipse cx="495" cy="410" rx="22" ry="10" fill="#34d399" opacity="0.6"/></g>
      <g id="expr_angry" style="display:none;"><path d="M520 270 L550 270 M535 255 L535 285" stroke="#ef4444" stroke-width="6"/></g>
      <g id="expr_shock" style="display:none;"><path d="M260 220 L240 190 M400 180 L400 150" stroke="#fef08a" stroke-width="5"/></g>
      <g id="expr_tears" style="display:none;"><path d="M315 390 Q300 430 305 460 Z" fill="#38bdf8" opacity="0.85"/></g>
      <g id="expr_stars" style="display:none;"><path d="M330 345 L335 360 L350 365 L335 370 L330 385 Z" fill="#fef08a"/></g>
      <g id="expr_hearts" style="display:none;"><path d="M330 375 C330 375 310 355 310 345 C310 338 318 335 325 340 Z" fill="#f43f5e" transform="scale(1.3) translate(-75,-75)"/></g>
    </g>
  </svg>
  `
};
