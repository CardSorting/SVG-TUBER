import { FaceTrackingData, MotionFrame } from '../types/tuber';

export class MotionRecorder {
  public isRecording = false;
  public isPlaying = false;
  public loop = true;

  private frames: MotionFrame[] = [];
  private frameCount = 0;
  private startTime = 0;
  private playbackStartTime = 0;
  private lastPlaybackIdx = 0;

  private playbackBuffer: FaceTrackingData = {
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

  public startRecording() {
    this.frameCount = 0;
    this.isRecording = true;
    this.isPlaying = false;
    this.startTime = performance.now();
  }

  public stopRecording(): number {
    this.isRecording = false;
    return this.frameCount;
  }

  public clear() {
    this.frameCount = 0;
    this.isRecording = false;
    this.isPlaying = false;
    this.lastPlaybackIdx = 0;
  }

  public recordFrame(data: FaceTrackingData) {
    if (!this.isRecording) return;
    if (this.frameCount >= 10000) {
      this.stopRecording();
      return;
    }
    const now = performance.now();
    const timestamp = now - this.startTime;

    if (this.frameCount < this.frames.length) {
      const frame = this.frames[this.frameCount];
      frame.timestamp = timestamp;
      Object.assign(frame.data, data);
    } else {
      this.frames.push({
        timestamp,
        data: { ...data },
      });
    }
    this.frameCount++;
  }

  public startPlayback() {
    if (this.frameCount === 0) return;
    this.isPlaying = true;
    this.isRecording = false;
    this.playbackStartTime = performance.now();
    this.lastPlaybackIdx = 0;
  }

  public stopPlayback() {
    this.isPlaying = false;
  }

  public getPlaybackFrame(): FaceTrackingData | null {
    if (!this.isPlaying || this.frameCount === 0) return null;

    const duration = this.frames[this.frameCount - 1].timestamp;
    if (duration <= 0) return this.frames[0].data;

    let elapsed = performance.now() - this.playbackStartTime;
    if (elapsed > duration) {
      if (this.loop) {
        this.playbackStartTime = performance.now();
        elapsed = 0;
        this.lastPlaybackIdx = 0;
      } else {
        this.isPlaying = false;
        return null;
      }
    }

    // Fast linear search starting from lastPlaybackIdx (O(1) average time complexity)
    let idx = this.lastPlaybackIdx;
    while (idx < this.frameCount && this.frames[idx].timestamp < elapsed) {
      idx++;
    }
    if (idx >= this.frameCount) {
      idx = this.frameCount - 1;
    }
    this.lastPlaybackIdx = Math.max(0, idx - 1);

    if (idx <= 0) return this.frames[0].data;
    if (idx >= this.frameCount) return this.frames[this.frameCount - 1].data;

    const f1 = this.frames[idx - 1];
    const f2 = this.frames[idx];

    const alpha = (elapsed - f1.timestamp) / (f2.timestamp - f1.timestamp || 1);

    // Reuse persistent buffer object to eliminate 60-120 object allocations per second
    this.playbackBuffer.headYaw = this.lerp(f1.data.headYaw, f2.data.headYaw, alpha);
    this.playbackBuffer.headPitch = this.lerp(f1.data.headPitch, f2.data.headPitch, alpha);
    this.playbackBuffer.headRoll = this.lerp(f1.data.headRoll, f2.data.headRoll, alpha);
    this.playbackBuffer.positionX = this.lerp(f1.data.positionX, f2.data.positionX, alpha);
    this.playbackBuffer.positionY = this.lerp(f1.data.positionY, f2.data.positionY, alpha);
    this.playbackBuffer.leftEyeOpen = this.lerp(f1.data.leftEyeOpen, f2.data.leftEyeOpen, alpha);
    this.playbackBuffer.rightEyeOpen = this.lerp(f1.data.rightEyeOpen, f2.data.rightEyeOpen, alpha);
    this.playbackBuffer.mouthOpen = this.lerp(f1.data.mouthOpen, f2.data.mouthOpen, alpha);
    this.playbackBuffer.mouthWide = this.lerp(f1.data.mouthWide, f2.data.mouthWide, alpha);
    this.playbackBuffer.eyebrowRaise = this.lerp(f1.data.eyebrowRaise, f2.data.eyebrowRaise, alpha);
    this.playbackBuffer.isSpeaking = f2.data.isSpeaking;
    this.playbackBuffer.audioVolume = f2.data.audioVolume;
    this.playbackBuffer.phoneme = f2.data.phoneme;

    return this.playbackBuffer;
  }

  private lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
  }
}
