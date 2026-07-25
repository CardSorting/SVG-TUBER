import React, { useEffect, useState, useRef } from 'react';
import { SVGPuppetRenderer } from './SVGPuppetRenderer';
import { AvatarPropsOverlay } from './AvatarPropsOverlay';
import { BUILTIN_AVATARS } from '../avatars';
import { FaceTracker } from '../engine/FaceTracker';
import { PhysicsEngine } from '../engine/PhysicsEngine';
import { EngineConfig, FaceTrackingData } from '../types/tuber';

export const OverlayView = React.memo(() => {
  const [puppet] = useState(BUILTIN_AVATARS[0]);

  const trackerRef = useRef<FaceTracker | null>(null);
  if (!trackerRef.current) trackerRef.current = new FaceTracker();

  const physicsRef = useRef<PhysicsEngine | null>(null);
  if (!physicsRef.current) physicsRef.current = new PhysicsEngine();

  const trackingDataRef = useRef<FaceTrackingData>({
    headYaw: 0,
    headPitch: 0,
    headRoll: 0,
    positionX: 0,
    positionY: 0,
    leftEyeOpen: 1,
    rightEyeOpen: 1,
    mouthOpen: 0,
    mouthWide: 0,
    eyebrowRaise: 0,
    isSpeaking: false,
    audioVolume: 0,
    phoneme: 'M',
  });

  const [config] = useState<EngineConfig>({
    trackingMode: 'hybrid',
    cameraDeviceId: '',
    micDeviceId: '',
    micSensitivity: 5,
    micThreshold: 0.04,
    smoothing: 0.3,
    physics: puppet.defaultConfig as any,
    backgroundMode: 'transparent',
    customBackgroundColor: '#000000',
    ambientLighting: 'none',
    activeProp: 'none',
    postFilter: 'none',
    enableSFX: false,
    showCameraPIP: false,
    activeExpression: 'neutral',
    enableClickThrough: true,
    alwaysOnTop: true,
    scale: 1.0,
    offsetX: 0,
    offsetY: 0,
  });

  useEffect(() => {
    const tracker = trackerRef.current!;
    const physics = physicsRef.current!;

    async function init() {
      await tracker.initMediaPipe();
      await tracker.startCamera();
      await tracker.startMicrophone();

      tracker.onUpdate((raw) => {
        const updated = physics.update(raw, config.physics, config.smoothing);
        trackingDataRef.current = updated;
      });
    }

    init();

    return () => {
      tracker.stop();
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-transparent overflow-hidden flex items-center justify-center pointer-events-none relative">
      <SVGPuppetRenderer
        puppet={puppet}
        trackingDataRef={trackingDataRef}
        physics={physicsRef.current!}
        config={config}
      />
      <AvatarPropsOverlay
        prop={config.activeProp}
        trackingDataRef={trackingDataRef}
        physics={physicsRef.current!}
        scale={config.scale}
        offsetX={config.offsetX}
        offsetY={config.offsetY}
      />
    </div>
  );
});
