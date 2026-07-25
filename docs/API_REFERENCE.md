# 📚 SVG-TUBER API Reference

This document provides a comprehensive TypeScript API and component prop reference for developers building plugins, custom engines, or extending SVG-TUBER.

---

## 🛠️ Engine APIs

### `FaceTracker` ([src/engine/FaceTracker.ts](file:///c:/Users/media/OneDrive/Desktop/SVG-TUBER/src/engine/FaceTracker.ts))

The core tracking module managing camera input, MediaPipe landmarker execution, audio FFT viseme parsing, and cursor gaze fallbacks.

```typescript
class FaceTracker {
  // Public Properties
  public isCameraActive: boolean;
  public isMicActive: boolean;
  public cameraError: string | null;
  public trackingSource: 'hybrid' | 'camera' | 'cursor';

  // Lifecycle Methods
  public initMediaPipe(): Promise<boolean>;
  public startCamera(deviceId?: string): Promise<boolean>;
  public stopCamera(): void;
  public startMicrophone(): Promise<boolean>;
  public stopMicrophone(): void;
  public stop(): void;

  // Callback Registration
  public onUpdate(callback: (data: FaceTrackingData) => void): void;
}
```

#### Data Model: `FaceTrackingData`
```typescript
interface FaceTrackingData {
  headYaw: number;       // Rotational degrees (-45 to 45)
  headPitch: number;     // Rotational degrees (-40 to 40)
  headRoll: number;      // Rotational degrees (-180 to 180)
  positionX: number;     // Normalized horizontal offset (-1 to 1)
  positionY: number;     // Normalized vertical offset (-1 to 1)
  leftEyeOpen: number;   // Normalized EAR ratio (0 = closed, 1 = open)
  rightEyeOpen: number;  // Normalized EAR ratio (0 = closed, 1 = open)
  mouthOpen: number;     // Mouth opening ratio (0 to 1)
  mouthWide: number;     // Mouth width ratio (0 to 1)
  eyebrowRaise: number;  // Eyebrow vertical raise (-1 to 1)
  isSpeaking: boolean;   // Active speech boolean indicator
  audioVolume: number;   // RMS audio amplitude (0 to 1)
  phoneme: PhonemeType;  // Active formant phoneme ('A' | 'E' | 'I' | 'O' | 'U' | 'M')
}
```

---

### `PhysicsEngine` ([src/engine/PhysicsEngine.ts](file:///c:/Users/media/OneDrive/Desktop/SVG-TUBER/src/engine/PhysicsEngine.ts))

Computes secondary motion spring physics, wind ambient breeze, autonomous breathing, and anime squish & stretch.

```typescript
class PhysicsEngine {
  // Physics State Outputs
  public hairSway: { pos: number; vel: number };
  public earSway: { pos: number; vel: number };
  public bodySway: { pos: number; vel: number };
  public bounceY: { pos: number; vel: number };
  public squishX: number;
  public squishY: number;

  // Update Solver (Called per tracking tick)
  public update(
    raw: FaceTrackingData,
    config: SpringPhysicsConfig,
    lerpFactor?: number
  ): FaceTrackingData;
}
```

---

### `SFXEngine` ([src/engine/SFXEngine.ts](file:///c:/Users/media/OneDrive/Desktop/SVG-TUBER/src/engine/SFXEngine.ts))

Synthesizes procedural Web Audio sound effects without external MP3/WAV assets.

```typescript
class SFXEngine {
  public enabled: boolean;
  public playExpressionSFX(expr: ExpressionType): void;
  public dispose(): void;
}
```

---

### `MotionRecorder` ([src/engine/MotionRecorder.ts](file:///c:/Users/media/OneDrive/Desktop/SVG-TUBER/src/engine/MotionRecorder.ts))

Pre-allocated O(1) buffer keyframe recorder for avatar motion clips.

```typescript
class MotionRecorder {
  public isRecording: boolean;
  public isPlaying: boolean;
  public loop: boolean;

  public startRecording(): void;
  public stopRecording(): number;
  public clear(): void;
  public recordFrame(data: FaceTrackingData): void;
  public startPlayback(): void;
  public stopPlayback(): void;
  public getPlaybackFrame(): FaceTrackingData | null;
}
```

---

## 🎨 Component Props Reference

### `SVGPuppetRenderer`
Renders avatar SVG vector geometry and updates CSS transforms at 60 FPS.

```typescript
interface SVGPuppetRendererProps {
  puppet: SVGPuppetDefinition;
  trackingData?: FaceTrackingData;
  trackingDataRef?: React.RefObject<FaceTrackingData>;
  physics: PhysicsEngine;
  config: EngineConfig;
}
```

### `AvatarPropsOverlay`
Renders tracking equipment overlays (Glasses, Headset, Boba, Halo).

```typescript
interface AvatarPropsOverlayProps {
  prop: PropItem;
  trackingDataRef?: React.RefObject<FaceTrackingData>;
  physics?: PhysicsEngine;
  scale: number;
  offsetX?: number;
  offsetY?: number;
}
```

### `PostProcessingCanvas`
Canvas filter shader overlay (CRT, VHS, Bloom, Pixel).

```typescript
interface PostProcessingCanvasProps {
  filter: PostFilter; // 'none' | 'crt' | 'vhs' | 'bloom' | 'pixel'
}
```
