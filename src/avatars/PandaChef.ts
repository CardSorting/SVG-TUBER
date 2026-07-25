import { SVGPuppetDefinition } from '../types/tuber';

export const PandaChefAvatar: SVGPuppetDefinition = {
  id: 'panda_chef',
  name: 'Master Boba Panda Chef',
  author: 'SVG-TUBER Studio',
  category: 'Anime & Cute',
  defaultConfig: { hairSpringStiffness: 0.3, hairDamping: 0.7, earBounce: 1.7, bodySway: 0.5, squishStrength: 0.8 },
  expressionLayers: { neutral: [], happy: ['expr_blush'], angry: ['expr_angry'], shocked: ['expr_shock'], blush: ['expr_blush'], tears: ['expr_tears'], star_eyes: ['expr_stars'], heart_eyes: ['expr_hearts'] },
  svgContent: `
  <svg viewBox="0 0 800 900" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" style="width:100%;height:100%;overflow:visible;">
    <defs>
      <linearGradient id="pandaHatGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ffffff"/><stop offset="100%" stop-color="#e2e8f0"/></linearGradient>
    </defs>
    <g id="hair_back_group"><path d="M210 380 Q120 540 90 760 Q70 860 160 880 Q230 880 260 700 Q280 520 300 420 Z" fill="#0f172a" opacity="0.95"/></g>
    <g id="body_group"><path d="M360 480 L440 480 L450 560 Q400 580 350 560 Z" fill="#ffffff"/><path d="M220 600 Q400 550 580 600 L640 900 L160 900 Z" fill="#16a34a" stroke="#15803d" stroke-width="3"/><rect x="360" y="650" width="80" height="100" rx="12" fill="#ffffff" stroke="#15803d" stroke-width="2"/><circle cx="400" cy="700" r="16" fill="#78350f"/></g>
    <g id="ears_group"><circle cx="210" cy="180" r="50" fill="#0f172a"/><circle cx="590" cy="180" r="50" fill="#0f172a"/><path d="M280 210 Q400 130 520 210 L540 120 Q400 60 260 120 Z" fill="url(#pandaHatGrad)" stroke="#0f172a" stroke-width="3"/></g>
    <g id="head_base_group"><path d="M260 260 Q400 230 540 260 Q560 400 490 480 Q400 540 310 480 Q240 400 260 260 Z" fill="#ffffff" stroke="#0f172a" stroke-width="3"/></g>
    <g id="eyebrows_group"><path id="eyebrow_left" d="M290 305 Q330 285 365 305" fill="none" stroke="#0f172a" stroke-width="7"/><path id="eyebrow_right" d="M435 305 Q470 285 510 305" fill="none" stroke="#0f172a" stroke-width="7"/></g>
    <g id="eye_left_group"><ellipse cx="330" cy="365" rx="46" ry="50" fill="#0f172a"/><g id="iris_left"><ellipse cx="330" cy="365" rx="26" ry="32" fill="#ffffff"/><circle cx="330" cy="365" r="12" fill="#0f172a"/><circle cx="320" cy="350" r="8" fill="#ffffff"/></g><path id="eye_left_closed" d="M288 368 Q330 395 372 368" fill="none" stroke="#ffffff" stroke-width="8" style="display:none;"/></g>
    <g id="eye_right_group"><ellipse cx="470" cy="365" rx="46" ry="50" fill="#0f172a"/><g id="iris_right"><ellipse cx="470" cy="365" rx="26" ry="32" fill="#ffffff"/><circle cx="470" cy="365" r="12" fill="#0f172a"/><circle cx="460" cy="350" r="8" fill="#ffffff"/></g><path id="eye_right_closed" d="M428 368 Q470 395 512 368" fill="none" stroke="#ffffff" stroke-width="8" style="display:none;"/></g>
    <g id="nose_group"><polygon points="400,412 392,422 408,422" fill="#0f172a"/></g>
    <g id="mouth_group"><path id="mouth_closed" d="M370 445 Q400 458 430 445" fill="none" stroke="#0f172a" stroke-width="6"/><path id="mouth_smile" d="M365 442 Q400 475 435 442 Z" fill="#ef4444" style="display:none;"/><g id="mouth_open_wide" style="display:none;"><path d="M360 440 Q400 425 440 440 Q445 490 400 495 Q355 490 360 440 Z" fill="#991b1b"/></g><ellipse id="mouth_o" cx="400" cy="452" rx="18" ry="22" fill="#991b1b" style="display:none;"/></g>
    <g id="hair_front_group"><path d="M250 250 Q220 340 260 440 Q280 460 280 400 Q260 310 300 240 Z" fill="#0f172a"/></g>
    <g id="expressions_group">
      <g id="expr_blush" style="display:none;"><ellipse cx="305" cy="410" rx="22" ry="10" fill="#ef4444" opacity="0.6"/><ellipse cx="495" cy="410" rx="22" ry="10" fill="#ef4444" opacity="0.6"/></g>
      <g id="expr_angry" style="display:none;"><path d="M520 270 L550 270 M535 255 L535 285" stroke="#ef4444" stroke-width="6"/></g>
      <g id="expr_shock" style="display:none;"><path d="M260 220 L240 190 M400 180 L400 150" stroke="#fef08a" stroke-width="5"/></g>
      <g id="expr_tears" style="display:none;"><path d="M315 390 Q300 430 305 460 Z" fill="#38bdf8" opacity="0.85"/></g>
      <g id="expr_stars" style="display:none;"><path d="M330 345 L335 360 L350 365 L335 370 L330 385 Z" fill="#fef08a"/></g>
      <g id="expr_hearts" style="display:none;"><path d="M330 375 C330 375 310 355 310 345 C310 338 318 335 325 340 Z" fill="#f43f5e" transform="scale(1.3) translate(-75,-75)"/></g>
    </g>
  </svg>
  `
};
