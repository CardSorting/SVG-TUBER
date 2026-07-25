import React, { useEffect, useRef, useState } from 'react';
import { SVGPuppetRenderer } from '../../src/components/SVGPuppetRenderer';
import { FaceTracker } from '../../src/engine/FaceTracker';
import { PhysicsEngine } from '../../src/engine/PhysicsEngine';
import { BUILTIN_AVATARS } from '../../src/avatars';
import { EngineConfig } from '../../src/types/tuber';

export const EmbeddedVTuberApp: React.FC = () => {
  const trackerRef = useRef<FaceTracker>(new FaceTracker());
  const physicsRef = useRef<PhysicsEngine>(new PhysicsEngine());
  const trackingDataRef = useRef(trackerRef.current.currentData);

  const [activePuppet] = useState(BUILTIN_AVATARS[0]);
  const [config, setConfig] = useState<EngineConfig>({
    trackingMode: 'hybrid',
    cameraDeviceId: '',
    micDeviceId: '',
    micSensitivity: 5,
    micThreshold: 0.04,
    smoothing: 0.25,
    physics: {
      headFollowStrength: 0.3,
      hairSpringStiffness: 0.2,
      hairDamping: 0.85,
      earBounce: 0.5,
      bodySway: 0.3,
      squishStrength: 0.5,
      windStrength: 0.2,
      enableBreathing: true,
      enableAutoBlink: true,
      ...BUILTIN_AVATARS[0].defaultConfig,
    },
    backgroundMode: 'transparent',
    customBackgroundColor: '#000000',
    ambientLighting: 'none',
    activeProp: 'none',
    postFilter: 'none',
    enableSFX: true,
    showCameraPIP: false,
    activeExpression: 'neutral',
    enableClickThrough: false,
    alwaysOnTop: true,
    scale: 1.0,
    offsetX: 0,
    offsetY: 0,
  });

  useEffect(() => {
    const tracker = trackerRef.current;
    const physics = physicsRef.current;

    async function init() {
      await tracker.initMediaPipe();
      await tracker.startCamera();
      await tracker.startMicrophone();

      tracker.onUpdate((raw) => {
        trackingDataRef.current = physics.update(raw, config.physics, config.smoothing);
      });
    }

    init();

    return () => {
      tracker.stop();
    };
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-slate-950 text-white select-none">
      <header className="absolute top-6 left-6 z-30 flex items-center gap-4 bg-slate-900/80 backdrop-blur p-4 rounded-xl border border-slate-800">
        <h1 className="font-bold text-sm text-indigo-400">Embedded SVG-TUBER Demo</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setConfig((prev) => ({ ...prev, activeExpression: 'happy' }))}
            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 rounded text-xs transition font-medium"
          >
            Happy
          </button>
          <button
            onClick={() => setConfig((prev) => ({ ...prev, activeExpression: 'blush' }))}
            className="px-3 py-1 bg-rose-600 hover:bg-rose-500 rounded text-xs transition font-medium"
          >
            Blush
          </button>
          <button
            onClick={() => setConfig((prev) => ({ ...prev, activeExpression: 'neutral' }))}
            className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs transition font-medium"
          >
            Reset
          </button>
        </div>
      </header>

      <SVGPuppetRenderer
        puppet={activePuppet}
        trackingDataRef={trackingDataRef}
        physics={physicsRef.current}
        config={config}
      />
    </div>
  );
};
