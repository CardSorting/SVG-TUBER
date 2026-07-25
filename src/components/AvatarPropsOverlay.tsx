import React, { useEffect, useRef } from 'react';
import { PropItem, FaceTrackingData } from '../types/tuber';
import { PhysicsEngine } from '../engine/PhysicsEngine';

interface AvatarPropsOverlayProps {
  prop: PropItem;
  headYaw?: number;
  headPitch?: number;
  headRoll?: number;
  positionX?: number;
  positionY?: number;
  trackingDataRef?: React.RefObject<FaceTrackingData>;
  physics?: PhysicsEngine;
  scale: number;
  offsetX?: number;
  offsetY?: number;
  bouncePos?: number;
  squishX?: number;
  squishY?: number;
}

export const AvatarPropsOverlay = React.memo<AvatarPropsOverlayProps>(({
  prop,
  headYaw = 0,
  headPitch = 0,
  headRoll = 0,
  positionX = 0,
  positionY = 0,
  trackingDataRef,
  physics,
  scale,
  offsetX = 0,
  offsetY = 0,
  bouncePos = 0,
  squishX = 1.0,
  squishY = 1.0,
}) => {
  const gRef = useRef<SVGGElement>(null);
  const lastTransformRef = useRef<string>('');

  const propsRef = useRef({ headYaw, headPitch, headRoll, positionX, positionY, offsetX, offsetY, bouncePos, squishX, squishY });
  const physicsRef = useRef(physics);

  useEffect(() => {
    propsRef.current = { headYaw, headPitch, headRoll, positionX, positionY, offsetX, offsetY, bouncePos, squishX, squishY };
  }, [headYaw, headPitch, headRoll, positionX, positionY, offsetX, offsetY, bouncePos, squishX, squishY]);

  useEffect(() => {
    physicsRef.current = physics;
  }, [physics]);

  useEffect(() => {
    if (prop === 'none') return;
    let animId: number;

    const r2 = (n: number) => Math.round(n * 100) / 100;

    const renderFrame = () => {
      const g = gRef.current;
      const currentProps = propsRef.current;
      const currentPhysics = physicsRef.current;

      if (g) {
        const data = trackingDataRef ? trackingDataRef.current : null;

        const yaw = data ? data.headYaw : currentProps.headYaw;
        const pitch = data ? data.headPitch : currentProps.headPitch;
        const roll = data ? data.headRoll : currentProps.headRoll;
        const posXVal = data ? data.positionX : currentProps.positionX;
        const posYVal = data ? data.positionY : currentProps.positionY;

        const bPos = currentPhysics && currentPhysics.bounceY ? currentPhysics.bounceY.pos : currentProps.bouncePos;
        const sXVal = currentPhysics ? currentPhysics.squishX : currentProps.squishX;
        const sYVal = currentPhysics ? currentPhysics.squishY : currentProps.squishY;

        const posX = r2((Number.isFinite(posXVal) ? posXVal : 0) * 30 + currentProps.offsetX);
        const posY = r2((Number.isFinite(posYVal) ? posYVal : 0) * 20 + currentProps.offsetY + (bPos || 0));
        const rotZ = r2(Number.isFinite(roll) ? roll : 0);
        const rotY = r2(Number.isFinite(yaw) ? yaw : 0);
        const rotX = r2(Number.isFinite(pitch) ? pitch : 0);
        const sX = r2(Number.isFinite(sXVal) && sXVal > 0 ? sXVal : 1.0);
        const sY = r2(Number.isFinite(sYVal) && sYVal > 0 ? sYVal : 1.0);

        const transform = `translate(${posX}px, ${posY}px) rotate(${rotZ}deg) scale(${sX}, ${sY}) skewY(${r2(rotY * 0.15)}deg) skewX(${r2(rotX * 0.1)}deg)`;

        if (lastTransformRef.current !== transform) {
          lastTransformRef.current = transform;
          g.style.transformOrigin = '400px 360px';
          g.style.transform = transform;
        }
      }

      if (trackingDataRef) {
        animId = requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [prop, trackingDataRef]);

  if (prop === 'none') return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none z-15 flex items-center justify-center"
      style={{ transform: `scale(${scale || 1.0})` }}
    >
      <svg
        viewBox="0 0 800 900"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[650px] h-[750px] max-w-full max-h-[85vh] overflow-visible"
      >
        <g ref={gRef}>
          {/* GLASSES PROP */}
          {prop === 'glasses' && (
            <g id="prop_glasses">
              <path d="M 270 340 L 530 340 L 510 380 L 290 380 Z" fill="#06b6d4" opacity="0.75" stroke="#38bdf8" strokeWidth="4" />
              <line x1="260" y1="350" x2="540" y2="350" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />
              <circle cx="310" cy="360" r="4" fill="#ffffff" />
            </g>
          )}

          {/* HEADSET PROP */}
          {prop === 'headset' && (
            <g id="prop_headset">
              <path d="M 230 250 Q 400 150 570 250" fill="none" stroke="#0f172a" strokeWidth="18" strokeLinecap="round" />
              <path d="M 230 250 Q 400 150 570 250" fill="none" stroke="#6366f1" strokeWidth="8" strokeLinecap="round" />
              <rect x="200" y="310" width="35" height="90" rx="14" fill="#1e1b4b" stroke="#818cf8" strokeWidth="4" />
              <rect x="565" y="310" width="35" height="90" rx="14" fill="#1e1b4b" stroke="#818cf8" strokeWidth="4" />
              <path d="M 215 370 Q 200 450 340 450" fill="none" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />
              <circle cx="345" cy="450" r="8" fill="#6366f1" />
            </g>
          )}

          {/* ANGEL HALO PROP */}
          {prop === 'halo' && (
            <g id="prop_halo">
              <ellipse cx="400" cy="140" rx="110" ry="24" fill="none" stroke="#facc15" strokeWidth="10" filter="drop-shadow(0 0 10px #facc15)" />
              <ellipse cx="400" cy="140" rx="110" ry="24" fill="none" stroke="#ffffff" strokeWidth="4" />
            </g>
          )}

          {/* BOBA TEA CUP PROP */}
          {prop === 'boba' && (
            <g id="prop_boba" transform="translate(110, 160)">
              <path d="M 460 380 L 480 480 Q 500 500 520 480 L 540 380 Z" fill="#ffffff" opacity="0.9" stroke="#78350f" strokeWidth="4" />
              <path d="M 465 410 L 480 480 Q 500 495 520 480 L 535 410 Z" fill="#d97706" />
              <line x1="500" y1="320" x2="495" y2="440" stroke="#f43f5e" strokeWidth="10" strokeLinecap="round" />
              <circle cx="485" cy="465" r="6" fill="#1e1b4b" />
              <circle cx="505" cy="470" r="6" fill="#1e1b4b" />
              <circle cx="520" cy="460" r="6" fill="#1e1b4b" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
});
