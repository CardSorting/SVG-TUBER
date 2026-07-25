import React, { useEffect, useState, useRef } from 'react';
import { BUILTIN_AVATARS } from './avatars';
import { FaceTracker } from './engine/FaceTracker';
import { PhysicsEngine } from './engine/PhysicsEngine';
import { SFXEngine } from './engine/SFXEngine';
import { MotionRecorder } from './engine/MotionRecorder';
import { SVGPuppetRenderer } from './components/SVGPuppetRenderer';
import { ControlDashboard } from './components/ControlDashboard';
import { ExpressionBar } from './components/ExpressionBar';
import { RiggingStudio } from './components/RiggingStudio';
import { OverlayView } from './components/OverlayView';
import { ParticleFXCanvas } from './components/ParticleFXCanvas';
import { AvatarPropsOverlay } from './components/AvatarPropsOverlay';
import { TrackingCameraPIP } from './components/TrackingCameraPIP';
import { PostProcessingCanvas } from './components/PostProcessingCanvas';
import { SVGPuppetDefinition, EngineConfig, FaceTrackingData, ExpressionType } from './types/tuber';
import { Settings, EyeOff, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const isObsMode = window.location.hash === '#obs';
  if (isObsMode) {
    return <OverlayView />;
  }

  const [puppets, setPuppets] = useState<SVGPuppetDefinition[]>(BUILTIN_AVATARS);
  const [activePuppet, setActivePuppet] = useState<SVGPuppetDefinition>(BUILTIN_AVATARS[0]);
  const [showDashboard, setShowDashboard] = useState<boolean>(true);
  const [showRiggingStudio, setShowRiggingStudio] = useState<boolean>(false);

  const [config, setConfig] = useState<EngineConfig>({
    trackingMode: 'hybrid',
    cameraDeviceId: '',
    micDeviceId: '',
    micSensitivity: 5,
    micThreshold: 0.04,
    smoothing: 0.25,
    physics: {
      ...BUILTIN_AVATARS[0].defaultConfig,
      squishStrength: 0.5,
      windStrength: 0.2,
      enableBreathing: true,
      enableAutoBlink: true,
    } as any,
    backgroundMode: 'transparent',
    customBackgroundColor: '#000000',
    ambientLighting: 'none',
    activeProp: 'none',
    postFilter: 'none',
    enableSFX: true,
    showCameraPIP: true,
    activeExpression: 'neutral',
    enableClickThrough: false,
    alwaysOnTop: true,
    scale: 1.0,
    offsetX: 0,
    offsetY: 0,
  });

  const trackerRef = useRef<FaceTracker | null>(null);
  if (!trackerRef.current) trackerRef.current = new FaceTracker();

  const physicsRef = useRef<PhysicsEngine | null>(null);
  if (!physicsRef.current) physicsRef.current = new PhysicsEngine();

  const sfxRef = useRef<SFXEngine | null>(null);
  if (!sfxRef.current) sfxRef.current = new SFXEngine();

  const motionRecorderRef = useRef<MotionRecorder | null>(null);
  if (!motionRecorderRef.current) motionRecorderRef.current = new MotionRecorder();

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

  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [isMicActive, setIsMicActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const [throttledStats, setThrottledStats] = useState({
    yaw: 0,
    pitch: 0,
    roll: 0,
    leftEye: 1,
    rightEye: 1,
    mouth: 0,
    volume: 0,
    phoneme: 'M',
  });

  useEffect(() => {
    const tracker = trackerRef.current!;
    const physics = physicsRef.current!;
    const recorder = motionRecorderRef.current!;
    let lastStatsTime = 0;

    async function init() {
      // Start camera and microphone immediately so webcam opens without waiting for CDN downloads
      const camPromise = tracker.startCamera();
      const micPromise = tracker.startMicrophone();

      // Proactively initialize MediaPipe in parallel
      tracker.initMediaPipe().catch((err) => console.warn('MediaPipe init background warning:', err));

      const [camOk, micOk] = await Promise.all([camPromise, micPromise]);
      setIsCameraActive(camOk);
      setCameraError(tracker.cameraError);
      setIsMicActive(micOk);

      tracker.onUpdate((raw) => {
        let inputData = raw;

        if (recorder.isPlaying) {
          const playbackFrame = recorder.getPlaybackFrame();
          if (playbackFrame) inputData = playbackFrame;
        } else if (recorder.isRecording) {
          recorder.recordFrame(raw);
        }

        const updated = physics.update(inputData, { ...config.physics, lipSyncMode: config.lipSyncMode }, config.smoothing);
        trackingDataRef.current = updated;

        const now = performance.now();
        if (now - lastStatsTime > 100) {
          lastStatsTime = now;
          setThrottledStats({
            yaw: Math.round(updated.headYaw),
            pitch: Math.round(updated.headPitch),
            roll: Math.round(updated.headRoll),
            leftEye: Math.round(updated.leftEyeOpen * 100) / 100,
            rightEye: Math.round(updated.rightEyeOpen * 100) / 100,
            mouth: Math.round(updated.mouthOpen * 100) / 100,
            volume: Math.round(updated.audioVolume * 100) / 100,
            phoneme: updated.phoneme || 'M',
          });
        }
      });
    }

    init();

    return () => {
      tracker.stop();
      sfxRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (sfxRef.current) sfxRef.current.enabled = config.enableSFX;
    if (trackerRef.current) trackerRef.current.trackingSource = config.trackingMode;
  }, [config.enableSFX, config.trackingMode]);

  const handleSelectExpression = React.useCallback((expr: ExpressionType) => {
    setConfig((prev) => ({ ...prev, activeExpression: expr }));
    sfxRef.current?.playExpressionSFX(expr);
  }, []);

  const handleToggleCamera = React.useCallback(async () => {
    const tracker = trackerRef.current;
    if (!tracker) return;
    if (isCameraActive) {
      tracker.stopCamera();
      setIsCameraActive(false);
      setCameraError(null);
    } else {
      const ok = await tracker.startCamera(config.cameraDeviceId);
      setIsCameraActive(ok);
      setCameraError(tracker.cameraError);
    }
  }, [isCameraActive, config.cameraDeviceId]);

  const handleToggleMic = React.useCallback(async () => {
    const tracker = trackerRef.current;
    if (!tracker) return;
    if (isMicActive) {
      tracker.stopMicrophone();
      setIsMicActive(false);
    } else {
      const ok = await tracker.startMicrophone();
      setIsMicActive(ok);
    }
  }, [isMicActive]);

  const handleAddCustomPuppet = React.useCallback((newPuppet: SVGPuppetDefinition) => {
    setPuppets((prev) => [newPuppet, ...prev]);
    setActivePuppet(newPuppet);
  }, []);

  const handleOpenRiggingStudio = React.useCallback(() => setShowRiggingStudio(true), []);
  const handleCloseRiggingStudio = React.useCallback(() => setShowRiggingStudio(false), []);
  const handleCloseCameraPIP = React.useCallback(() => setConfig((prev) => ({ ...prev, showCameraPIP: false })), []);
  const handleGetVideoElement = React.useCallback(() => trackerRef.current?.getVideoElement() ?? null, []);
  const handleGetCameraStream = React.useCallback(() => trackerRef.current?.getCameraStream() ?? null, []);

  const getCanvasBackground = () => {
    switch (config.backgroundMode) {
      case 'green':
        return 'bg-[#00FF00]';
      case 'blue':
        return 'bg-[#0000FF]';
      case 'magenta':
        return 'bg-[#FF00FF]';
      default:
        return 'bg-transparent';
    }
  };

  return (
    <div className={`relative w-screen h-screen overflow-hidden flex flex-col ${getCanvasBackground()}`}>
      {/* Titlebar / Drag Region */}
      <div className="titlebar-drag absolute top-0 left-0 right-0 h-10 z-40 flex items-center justify-between px-4 pointer-events-auto">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="font-outfit font-bold text-xs text-slate-300 tracking-wider">SVG-TUBER ULTIMATE</span>
        </div>

        <div className="titlebar-nodrag flex items-center gap-2">
          <button
            onClick={() => setShowDashboard(!showDashboard)}
            className="p-1.5 rounded-lg glass-panel hover:bg-slate-800 text-slate-300 transition"
            title="Toggle Studio Dashboard"
          >
            {showDashboard ? <EyeOff className="w-3.5 h-3.5" /> : <Settings className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Post-Processing Visual Shader Canvas */}
      <PostProcessingCanvas filter={config.postFilter} />

      {/* Expression Particle Effects Overlay */}
      <ParticleFXCanvas activeExpression={config.activeExpression} />

      {/* Main Avatar & Props Display Canvas */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden z-10">
        <SVGPuppetRenderer
          puppet={activePuppet}
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

      {/* Camera Diagnostic PIP Preview */}
      {config.showCameraPIP && (
        <TrackingCameraPIP
          isCameraActive={isCameraActive}
          onClose={handleCloseCameraPIP}
          onToggleCamera={handleToggleCamera}
          headYaw={throttledStats.yaw}
          headPitch={throttledStats.pitch}
          getVideoElement={handleGetVideoElement}
          getCameraStream={handleGetCameraStream}
          cameraError={cameraError}
        />
      )}

      {/* Bottom Expression Hotkey Bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
        <ExpressionBar
          activeExpression={config.activeExpression}
          onSelectExpression={handleSelectExpression}
        />
      </div>

      {/* Studio Control Dashboard */}
      {showDashboard && (
        <div className="absolute top-14 left-6 z-30 pointer-events-auto">
          <ControlDashboard
            config={config}
            onChangeConfig={(newConfig) => {
              setConfig(newConfig);
              if (trackerRef.current && newConfig.physics?.mouthSensitivity) {
                trackerRef.current.setMouthSensitivity(newConfig.physics.mouthSensitivity);
              }
            }}
            puppets={puppets}
            activePuppet={activePuppet}
            onSelectPuppet={setActivePuppet}
            onOpenRiggingStudio={handleOpenRiggingStudio}
            onRecalibrateMouth={() => trackerRef.current?.recalibrateRestingMouth()}
            trackingStats={throttledStats}
            isCameraActive={isCameraActive}
            isMicActive={isMicActive}
            onToggleCamera={handleToggleCamera}
            onToggleMic={handleToggleMic}
            motionRecorder={motionRecorderRef.current!}
            onTriggerExpression={handleSelectExpression}
          />
        </div>
      )}

      {/* Rigging Studio Modal */}
      {showRiggingStudio && (
        <RiggingStudio
          onAddCustomPuppet={handleAddCustomPuppet}
          onClose={handleCloseRiggingStudio}
        />
      )}
    </div>
  );
};
