import { SVGPuppetDefinition } from '../types/tuber';

export const NecromancerSkeletonAvatar: SVGPuppetDefinition = {
  id: 'necromancer_skeleton',
  name: 'Lich Lord Grim Mortis',
  author: 'SVG-TUBER Studio',
  category: 'Monsters & Beasts',
  defaultConfig: { hairSpringStiffness: 0.2, hairDamping: 0.85, earBounce: 1.1, bodySway: 0.35, squishStrength: 0.5 },
  expressionLayers: { neutral: [], happy: ['expr_blush'], angry: ['expr_angry'], shocked: ['expr_shock'], blush: ['expr_blush'], tears: ['expr_tears'], star_eyes: ['expr_stars'], heart_eyes: ['expr_hearts'] },
  svgContent: `
  <svg viewBox="0 0 800 900" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" style="width:100%;height:100%;overflow:visible;">
    <defs>
      <linearGradient id="lichRobesGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0284c7"/><stop offset="100%" stop-color="#0f172a"/></linearGradient>
      <filter id="lichGlow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="8" result="blur"/><feComposite in="SourceGraphic" in2="blur" operator="over"/></filter>
    </defs>
    <g id="hair_back_group"><path d="M210 380 Q120 540 90 760 Q70 860 160 880 Q230 880 260 700 Q280 520 300 420 Z" fill="url(#lichRobesGrad)" opacity="0.95"/></g>
    <g id="body_group"><rect x="380" y="480" width="40" height="80" fill="#e2e8f0"/><path d="M220 600 Q400 550 580 600 L640 900 L160 900 Z" fill="url(#lichRobesGrad)" stroke="#38bdf8" stroke-width="3"/><circle cx="400" cy="670" r="22" fill="#38bdf8" filter="url(#lichGlow)"/></g>
    <g id="ears_group"><polygon points="250,180 270,120 320,160" fill="#e2e8f0" stroke="#0f172a" stroke-width="3"/><polygon points="550,180 530,120 480,160" fill="#e2e8f0" stroke="#0f172a" stroke-width="3"/></g>
    <g id="head_base_group"><path d="M260 260 Q400 230 540 260 Q560 400 490 480 Q400 540 310 480 Q240 400 260 260 Z" fill="#f8fafc" stroke="#0f172a" stroke-width="4"/></g>
    <g id="eyebrows_group"><path id="eyebrow_left" d="M290 305 Q330 285 365 305" fill="none" stroke="#0f172a" stroke-width="7"/><path id="eyebrow_right" d="M435 305 Q470 285 510 305" fill="none" stroke="#0f172a" stroke-width="7"/></g>
    <g id="eye_left_group"><ellipse cx="330" cy="365" rx="42" ry="46" fill="#0f172a"/><g id="iris_left"><circle cx="330" cy="365" r="14" fill="#38bdf8" filter="url(#lichGlow)"/><circle cx="330" cy="365" r="5" fill="#ffffff"/></g><path id="eye_left_closed" d="M288 368 Q330 395 372 368" fill="none" stroke="#38bdf8" stroke-width="8" style="display:none;"/></g>
    <g id="eye_right_group"><ellipse cx="470" cy="365" rx="42" ry="46" fill="#0f172a"/><g id="iris_right"><circle cx="470" cy="365" r="14" fill="#38bdf8" filter="url(#lichGlow)"/><circle cx="470" cy="365" r="5" fill="#ffffff"/></g><path id="eye_right_closed" d="M428 368 Q470 395 512 368" fill="none" stroke="#38bdf8" stroke-width="8" style="display:none;"/></g>
    <g id="nose_group"><polygon points="400,410 392,425 408,425" fill="#0f172a"/></g>
    <g id="mouth_group"><path id="mouth_closed" d="M360 445 L440 445 M380 435 L380 455 M400 435 L400 455 M420 435 L420 455" stroke="#0f172a" stroke-width="5"/><path id="mouth_smile" d="M360 440 Q400 470 440 440" fill="none" stroke="#0f172a" stroke-width="5" style="display:none;"/><g id="mouth_open_wide" style="display:none;"><rect x="360" y="440" width="80" height="30" rx="8" fill="#0f172a"/></g><ellipse id="mouth_o" cx="400" cy="452" rx="18" ry="22" fill="#0f172a" style="display:none;"/></g>
    <g id="hair_front_group"><path d="M250 250 Q220 340 260 440 Q280 460 280 400 Q260 310 300 240 Z" fill="url(#lichRobesGrad)"/></g>
    <g id="expressions_group">
      <g id="expr_blush" style="display:none;"><ellipse cx="305" cy="410" rx="22" ry="10" fill="#38bdf8" opacity="0.6"/><ellipse cx="495" cy="410" rx="22" ry="10" fill="#38bdf8" opacity="0.6"/></g>
      <g id="expr_angry" style="display:none;"><path d="M520 270 L550 270 M535 255 L535 285" stroke="#ef4444" stroke-width="6"/></g>
      <g id="expr_shock" style="display:none;"><path d="M260 220 L240 190 M400 180 L400 150" stroke="#fef08a" stroke-width="5"/></g>
      <g id="expr_tears" style="display:none;"><path d="M315 390 Q300 430 305 460 Z" fill="#38bdf8" opacity="0.85"/></g>
      <g id="expr_stars" style="display:none;"><path d="M330 345 L335 360 L350 365 L335 370 L330 385 Z" fill="#38bdf8"/></g>
      <g id="expr_hearts" style="display:none;"><path d="M330 375 C330 375 310 355 310 345 C310 338 318 335 325 340 Z" fill="#f43f5e" transform="scale(1.3) translate(-75,-75)"/></g>
    </g>
  </svg>
  `
};
