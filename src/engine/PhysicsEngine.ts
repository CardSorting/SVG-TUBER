import { FaceTrackingData, SpringPhysicsConfig } from '../types/tuber';

export class PhysicsEngine {
  public smoothed: FaceTrackingData = {
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
  };

  // Secondary motion states
  public hairSway = { pos: 0, vel: 0 };
  public earSway = { pos: 0, vel: 0 };
  public bodySway = { pos: 0, vel: 0 };
  public bounceY = { pos: 0, vel: 0 };

  // Squish & Stretch Physics states
  public squishX = 1.0;
  public squishY = 1.0;
  private squishVelX = 0;
  private squishVelY = 0;

  // Autonomous Idle states & Wind
  public breathingPhase = 0;
  public windPhase = 0;
  private autoBlinkTimer = 0;
  private autoBlinkDuration = 0;

  private prevHeadYaw = 0;
  private prevHeadPitch = 0;
  private lastTime = performance.now();

  public update(raw: FaceTrackingData, config: SpringPhysicsConfig & { lipSyncMode?: string }, lerpFactor: number = 0.3): FaceTrackingData {
    const now = performance.now();
    const dt = Math.min((now - this.lastTime) / 1000, 0.1);
    this.lastTime = now;

    // 1. LERP smoothing & NaN protection
    const factor = Math.max(0.05, Math.min(1, lerpFactor));

    const headYaw = Number.isFinite(raw.headYaw) ? raw.headYaw : 0;
    const headPitch = Number.isFinite(raw.headPitch) ? raw.headPitch : 0;
    const headRoll = Number.isFinite(raw.headRoll) ? raw.headRoll : 0;
    const positionX = Number.isFinite(raw.positionX) ? raw.positionX : 0;
    const positionY = Number.isFinite(raw.positionY) ? raw.positionY : 0;

    this.smoothed.headYaw = this.lerp(Number.isFinite(this.smoothed.headYaw) ? this.smoothed.headYaw : 0, headYaw, factor);
    this.smoothed.headPitch = this.lerp(Number.isFinite(this.smoothed.headPitch) ? this.smoothed.headPitch : 0, headPitch, factor);
    this.smoothed.headRoll = this.lerp(Number.isFinite(this.smoothed.headRoll) ? this.smoothed.headRoll : 0, headRoll, factor);
    this.smoothed.positionX = this.lerp(Number.isFinite(this.smoothed.positionX) ? this.smoothed.positionX : 0, positionX, factor);
    this.smoothed.positionY = this.lerp(Number.isFinite(this.smoothed.positionY) ? this.smoothed.positionY : 0, positionY, factor);

    // Autonomous Breathing Cycle
    this.breathingPhase += dt * 2.2;
    const breathingOffset = config.enableBreathing ? Math.sin(this.breathingPhase) * 4 : 0;

    // Environmental Wind Physics (hair & ear breeze)
    this.windPhase += dt * 3.5;
    const windForce = (config.windStrength || 0) * (Math.sin(this.windPhase) * 8 + Math.cos(this.windPhase * 1.5) * 4);

    // Auto-Blink timer
    let finalLeftEye = Number.isFinite(raw.leftEyeOpen) ? raw.leftEyeOpen : 1;
    let finalRightEye = Number.isFinite(raw.rightEyeOpen) ? raw.rightEyeOpen : 1;

    if (config.enableAutoBlink) {
      this.autoBlinkTimer -= dt;
      if (this.autoBlinkTimer <= 0) {
        this.autoBlinkTimer = 2.5 + Math.random() * 3.5;
        this.autoBlinkDuration = 0.15;
      }
      if (this.autoBlinkDuration > 0) {
        this.autoBlinkDuration -= dt;
        finalLeftEye = 0;
        finalRightEye = 0;
      }
    }

    const eyeFactor = Math.min(1, factor * 1.8);
    this.smoothed.leftEyeOpen = this.lerp(Number.isFinite(this.smoothed.leftEyeOpen) ? this.smoothed.leftEyeOpen : 1, finalLeftEye, eyeFactor);
    this.smoothed.rightEyeOpen = this.lerp(Number.isFinite(this.smoothed.rightEyeOpen) ? this.smoothed.rightEyeOpen : 1, finalRightEye, eyeFactor);

    // 1. Multi-Mode Lip Sync Engine (phoneme, pngtuber, continuous)
    const rawMouthOpen = Number.isFinite(raw.mouthOpen) ? raw.mouthOpen : 0;
    let targetMouthOpen = rawMouthOpen;

    if (config.lipSyncMode === 'pngtuber') {
      if (raw.isSpeaking || rawMouthOpen > 0.06) {
        const primaryWave = (Math.sin(now * 0.014) + 1) * 0.5;
        const secondaryWave = Math.sin(now * 0.028) * 0.18;
        const organicFlap = Math.max(0, Math.min(1, primaryWave + secondaryWave));
        targetMouthOpen = 0.26 + organicFlap * Math.min(0.42, Math.max(0.18, rawMouthOpen * 0.55));
      } else {
        targetMouthOpen = 0;
      }
    } else {
      // Default 'phoneme' & 'continuous' mode (Direct voice volume with syllable hold)
      targetMouthOpen = rawMouthOpen;
    }

    const currentMouthOpen = Number.isFinite(this.smoothed.mouthOpen) ? this.smoothed.mouthOpen : 0;
    const mouthAttackFactor = targetMouthOpen > currentMouthOpen ? Math.min(1, factor * 2.0) : Math.min(1, factor * 1.0);
    this.smoothed.mouthOpen = this.lerp(currentMouthOpen, targetMouthOpen, mouthAttackFactor);

    const rawMouthWide = Number.isFinite(raw.mouthWide) ? raw.mouthWide : 0;
    const currentMouthWide = Number.isFinite(this.smoothed.mouthWide) ? this.smoothed.mouthWide : 0;
    const mouthWideFactor = Math.min(1, factor * 1.8);
    this.smoothed.mouthWide = this.lerp(currentMouthWide, rawMouthWide, mouthWideFactor);

    this.smoothed.eyebrowRaise = this.lerp(Number.isFinite(this.smoothed.eyebrowRaise) ? this.smoothed.eyebrowRaise : 0, Number.isFinite(raw.eyebrowRaise) ? raw.eyebrowRaise : 0, factor);
    this.smoothed.isSpeaking = !!raw.isSpeaking;
    this.smoothed.audioVolume = this.lerp(Number.isFinite(this.smoothed.audioVolume) ? this.smoothed.audioVolume : 0, Number.isFinite(raw.audioVolume) ? raw.audioVolume : 0, 0.4);
    this.smoothed.phoneme = raw.phoneme || 'M';

    // 2. Spring Physics + Wind Force
    const targetHairForce = -this.smoothed.headYaw * 0.8 - this.smoothed.headRoll * 1.2 + windForce;
    this.updateSpring(this.hairSway, targetHairForce, config.hairSpringStiffness * 40, config.hairDamping, dt);

    const targetEarForce = -this.smoothed.headPitch * 0.9 + this.smoothed.headRoll * 0.8 + windForce * 0.5;
    this.updateSpring(this.earSway, targetEarForce, config.hairSpringStiffness * 60, config.hairDamping * 0.9, dt);

    const targetBodyForce = this.smoothed.headYaw * 0.3 + windForce * 0.2;
    this.updateSpring(this.bodySway, targetBodyForce, 15, 0.85, dt);

    // Speak bounce + Breathing
    const speakTarget = (raw.isSpeaking ? Math.sin(now * 0.012) * raw.mouthOpen * 6 : 0) + breathingOffset;
    this.updateSpring(this.bounceY, speakTarget, 25, 0.8, dt);

    // 3. Anime Squish & Stretch Calculations
    const yawAccel = Math.abs(this.smoothed.headYaw - this.prevHeadYaw);
    const pitchAccel = Math.abs(this.smoothed.headPitch - this.prevHeadPitch);
    this.prevHeadYaw = this.smoothed.headYaw;
    this.prevHeadPitch = this.smoothed.headPitch;

    const squishImpulse = (yawAccel * 0.01 + pitchAccel * 0.015) * (config.squishStrength || 0.5);
    const targetSquishY = 1.0 - squishImpulse;
    const targetSquishX = 1.0 + squishImpulse * 0.8;

    const kSquish = 120;
    const dSquish = 0.75;
    
    const forceY = (targetSquishY - this.squishY) * kSquish;
    this.squishVelY = (this.squishVelY + forceY * dt) * Math.pow(dSquish, dt * 60);
    this.squishY += this.squishVelY * dt;

    const forceX = (targetSquishX - this.squishX) * kSquish;
    this.squishVelX = (this.squishVelX + forceX * dt) * Math.pow(dSquish, dt * 60);
    this.squishX += this.squishVelX * dt;

    return this.smoothed;
  }

  private updateSpring(spring: { pos: number; vel: number }, target: number, stiffness: number, damping: number, dt: number) {
    const force = (target - spring.pos) * stiffness;
    spring.vel = (spring.vel + force * dt) * Math.pow(damping, dt * 60);
    spring.pos += spring.vel * dt;
  }

  private lerp(start: number, end: number, t: number): number {
    return start + (end - start) * t;
  }
}
