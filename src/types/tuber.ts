export type ExpressionType = 
  | 'neutral' 
  | 'happy' 
  | 'angry' 
  | 'shocked' 
  | 'blush' 
  | 'tears' 
  | 'star_eyes' 
  | 'heart_eyes';

export type PhonemeType = 'A' | 'E' | 'I' | 'O' | 'U' | 'M';
export type AmbientLighting = 'none' | 'cyber' | 'sunset' | 'midnight' | 'warm';
export type PropItem = 'none' | 'glasses' | 'headset' | 'boba' | 'halo';
export type TrackingInputSource = 'camera' | 'cursor' | 'hybrid';
export type PostFilter = 'none' | 'crt' | 'vhs' | 'bloom' | 'pixel';

export interface FaceTrackingData {
  headYaw: number;      // -45 to 45 deg
  headPitch: number;    // -45 to 45 deg
  headRoll: number;     // -45 to 45 deg
  positionX: number;    // -1 to 1
  positionY: number;    // -1 to 1
  leftEyeOpen: number;  // 0 to 1
  rightEyeOpen: number; // 0 to 1
  mouthOpen: number;    // 0 to 1
  mouthWide: number;    // 0 to 1
  eyebrowRaise: number; // -1 to 1
  isSpeaking: boolean;
  audioVolume: number;  // 0 to 1
  phoneme: PhonemeType; // A, E, I, O, U, M
}

export interface SpringPhysicsConfig {
  headFollowStrength: number;
  hairSpringStiffness: number;
  hairDamping: number;
  earBounce: number;
  bodySway: number;
  squishStrength: number;
  windStrength: number;
  mouthSensitivity?: number;
  enableBreathing: boolean;
  enableAutoBlink: boolean;
}

export type BackgroundMode = 'transparent' | 'green' | 'blue' | 'magenta' | 'custom';

export interface EngineConfig {
  trackingMode: TrackingInputSource;
  cameraDeviceId: string;
  micDeviceId: string;
  micSensitivity: number;
  micThreshold: number;
  smoothing: number;
  physics: SpringPhysicsConfig;
  backgroundMode: BackgroundMode;
  customBackgroundColor: string;
  ambientLighting: AmbientLighting;
  activeProp: PropItem;
  postFilter: PostFilter;
  enableSFX: boolean;
  showCameraPIP: boolean;
  activeExpression: ExpressionType;
  lipSyncMode?: 'phoneme' | 'pngtuber' | 'continuous';
  enableClickThrough: boolean;
  alwaysOnTop: boolean;
  scale: number;
  offsetX: number;
  offsetY: number;
}

export interface MotionFrame {
  timestamp: number;
  data: FaceTrackingData;
}

export interface ChatTriggerRule {
  command: string;
  expression: ExpressionType;
  prop?: PropItem;
  actionText: string;
}

export interface SVGPuppetDefinition {
  id: string;
  name: string;
  author: string;
  category?: string;
  svgContent: string;
  defaultConfig: Partial<SpringPhysicsConfig>;
  expressionLayers: Record<ExpressionType, string[]>;
}
