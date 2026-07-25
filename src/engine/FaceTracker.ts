import { FilesetResolver, FaceLandmarker } from '@mediapipe/tasks-vision';
import { FaceTrackingData, PhonemeType, TrackingInputSource } from '../types/tuber';

export class FaceTracker {
  private landmarker: FaceLandmarker | null = null;
  private videoElement: HTMLVideoElement | null = null;
  private animationFrameId: number | null = null;
  private audioContext: AudioContext | null = null;
  private audioAnalyser: AnalyserNode | null = null;
  private audioDataArray: Uint8Array | null = null;
  private micStream: MediaStream | null = null;
  private micSourceNode: MediaStreamAudioSourceNode | null = null;
  private mouseListenerAttached = false;
  private cameraRequestId = 0;
  private micRequestId = 0;

  public isCameraActive = false;
  public isMicActive = false;
  public cameraError: string | null = null;
  public trackingSource: TrackingInputSource = 'hybrid';

  private mouseX = 0;
  private mouseY = 0;

  private restingMouthRatio = 0.08;
  public mouthSensitivity = 1.2;

  private audioEnvelope = 0;
  private speechHoldFrames = 0;
  private lastActivePhoneme: PhonemeType = 'A';
  private lastMidEnergy = 0;
  private syllablePulseVal = 0;

  private onTrackingUpdateCallback: ((data: FaceTrackingData) => void) | null = null;

  public currentData: FaceTrackingData = {
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

  private handleMouseMove = (e: MouseEvent) => {
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    const mx = (e.clientX / w - 0.5) * 2;
    const my = (e.clientY / h - 0.5) * 2;
    this.mouseX = Number.isFinite(mx) ? mx : 0;
    this.mouseY = Number.isFinite(my) ? my : 0;
  };

  constructor() {
    this.attachMouseListener();
  }

  public attachMouseListener() {
    if (!this.mouseListenerAttached) {
      window.addEventListener('mousemove', this.handleMouseMove);
      this.mouseListenerAttached = true;
    }
  }

  public recalibrateRestingMouth() {
    this.restingMouthRatio = 0.08;
  }

  public setMouthSensitivity(sensitivity: number) {
    if (Number.isFinite(sensitivity) && sensitivity > 0) {
      this.mouthSensitivity = sensitivity;
    }
  }

  public detachMouseListener() {
    if (this.mouseListenerAttached) {
      window.removeEventListener('mousemove', this.handleMouseMove);
      this.mouseListenerAttached = false;
    }
  }

  public async initMediaPipe(): Promise<boolean> {
    try {
      if (this.landmarker) {
        try { this.landmarker.close(); } catch (_) {}
        this.landmarker = null;
      }

      // Use 100% local native assets for WASM and model files
      const filesetResolver = await FilesetResolver.forVisionTasks('/wasm');

      this.landmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
        baseOptions: {
          modelAssetPath: '/models/face_landmarker.task',
          delegate: 'GPU',
        },
        outputFaceBlendshapes: true,
        runningMode: 'VIDEO',
        numFaces: 1,
      });

      return true;
    } catch (err: any) {
      console.warn('GPU local face landmarker fallback to CPU:', err);
      try {
        const filesetResolver = await FilesetResolver.forVisionTasks('/wasm');
        this.landmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
          baseOptions: {
            modelAssetPath: '/models/face_landmarker.task',
            delegate: 'CPU',
          },
          outputFaceBlendshapes: true,
          runningMode: 'VIDEO',
          numFaces: 1,
        });
        return true;
      } catch (e: any) {
        console.error('Could not load local face landmarker:', e);
        this.cameraError = 'Could not load local face landmarker: ' + e?.message;
        return false;
      }
    }
  }

  private cameraStream: MediaStream | null = null;

  public stopCamera(incrementRequestId = true) {
    if (incrementRequestId) {
      this.cameraRequestId++;
    }
    if (this.cameraStream) {
      try {
        this.cameraStream.getTracks().forEach((track) => track.stop());
      } catch (_) {}
      this.cameraStream = null;
    }
    if (this.videoElement && this.videoElement.srcObject) {
      this.videoElement.srcObject = null;
    }
    this.isCameraActive = false;
  }

  public getVideoElement(): HTMLVideoElement | null {
    return this.videoElement;
  }

  public getCameraStream(): MediaStream | null {
    return this.cameraStream;
  }

  public async startCamera(deviceId?: string): Promise<boolean> {
    this.stopCamera(false);
    const currentReqId = ++this.cameraRequestId;
    this.attachMouseListener();
    try {
      this.cameraError = null;
      if (!navigator.mediaDevices?.getUserMedia) {
        this.cameraError = 'Camera API is not supported in this browser context.';
        this.isCameraActive = false;
        this.startTrackingLoop();
        return false;
      }

      if (!this.videoElement) {
        this.videoElement = document.createElement('video');
        this.videoElement.setAttribute('playsinline', '');
        this.videoElement.setAttribute('autoplay', '');
        this.videoElement.muted = true;
        this.videoElement.style.position = 'fixed';
        this.videoElement.style.top = '-9999px';
        this.videoElement.style.left = '-9999px';
        this.videoElement.style.width = '1px';
        this.videoElement.style.height = '1px';
        this.videoElement.style.opacity = '0';
        this.videoElement.style.pointerEvents = 'none';
        document.body.appendChild(this.videoElement);
      }

      let stream: MediaStream;
      try {
        const videoConstraints = (deviceId && deviceId !== 'default' && deviceId !== '')
          ? { deviceId: { exact: deviceId }, width: { ideal: 640 }, height: { ideal: 480 } }
          : { width: { ideal: 640 }, height: { ideal: 480 } };
        stream = await navigator.mediaDevices.getUserMedia({ video: videoConstraints });
      } catch (firstErr) {
        console.warn('Exact camera constraint failed, falling back to default camera stream:', firstErr);
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
      }

      if (this.cameraRequestId !== currentReqId) {
        stream.getTracks().forEach((track) => track.stop());
        return false;
      }

      this.cameraStream = stream;
      this.videoElement.srcObject = stream;
      try {
        await this.videoElement.play();
      } catch (playErr: any) {
        if (playErr.name !== 'AbortError') {
          console.warn('Video play error:', playErr);
        }
      }

      if (!this.landmarker) {
        this.initMediaPipe().catch((err) => console.warn('Async MediaPipe landmarker init warning:', err));
      }

      this.isCameraActive = true;
      this.startTrackingLoop();
      return true;
    } catch (err: any) {
      if (this.cameraRequestId === currentReqId) {
        console.warn('Camera access error:', err);
        if (err?.name === 'NotAllowedError' || err?.name === 'PermissionDeniedError') {
          this.cameraError = 'Camera permission was denied. Please allow camera access in your browser settings (click the lock icon in the address bar) and retry.';
        } else if (err?.name === 'NotFoundError' || err?.name === 'DevicesNotFoundError') {
          this.cameraError = 'No camera device found. Please connect a webcam and retry.';
        } else if (err?.name === 'NotReadableError' || err?.name === 'TrackStartError') {
          this.cameraError = 'Camera is in use by another app (Zoom, OBS, Teams). Please close other camera apps and retry.';
        } else {
          this.cameraError = 'Camera error: ' + (err?.message || 'Access denied or device unavailable.');
        }
        this.isCameraActive = false;
      }
      this.startTrackingLoop();
      return false;
    }
  }

  public async startMicrophone(): Promise<boolean> {
    const currentReqId = ++this.micRequestId;
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        this.isMicActive = false;
        return false;
      }

      this.stopMicrophone();

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (this.micRequestId !== currentReqId) {
        stream.getTracks().forEach((track) => track.stop());
        return false;
      }

      this.micStream = stream;
      if (!this.audioContext || this.audioContext.state === 'closed') {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
      this.micSourceNode = this.audioContext.createMediaStreamSource(this.micStream);
      this.audioAnalyser = this.audioContext.createAnalyser();
      this.audioAnalyser.fftSize = 512;
      this.micSourceNode.connect(this.audioAnalyser);

      if (!this.audioDataArray) {
        this.audioDataArray = new Uint8Array(this.audioAnalyser.frequencyBinCount);
      }

      this.isMicActive = true;
      return true;
    } catch (err: any) {
      if (this.micRequestId === currentReqId) {
        console.warn('Microphone access unavailable:', err);
        this.stopMicrophone();
      }
      return false;
    }
  }

  public stopMicrophone() {
    this.micRequestId++;
    if (this.micSourceNode) {
      try { this.micSourceNode.disconnect(); } catch (_) {}
      this.micSourceNode = null;
    }
    if (this.audioAnalyser) {
      try { this.audioAnalyser.disconnect(); } catch (_) {}
      this.audioAnalyser = null;
    }
    if (this.audioContext) {
      try { this.audioContext.close(); } catch (_) {}
      this.audioContext = null;
    }
    if (this.micStream) {
      try {
        this.micStream.getTracks().forEach((track) => track.stop());
      } catch (_) {}
      this.micStream = null;
    }
    this.isMicActive = false;
  }

  public onUpdate(callback: (data: FaceTrackingData) => void) {
    this.onTrackingUpdateCallback = callback;
  }

  private startTrackingLoop() {
    this.attachMouseListener();
    if (this.animationFrameId !== null) return;
    const loop = () => {
      this.processFrame();
      this.animationFrameId = requestAnimationFrame(loop);
    };
    loop();
  }

  private processFrame() {
    // 1. Audio Formant Frequency & Volume Analysis
    let micVolume = 0;
    let detectedPhoneme: PhonemeType = 'M';

    if (this.isMicActive && this.audioAnalyser && this.audioDataArray) {
      this.audioAnalyser.getByteFrequencyData(this.audioDataArray as any);
      let sum = 0;
      const len = this.audioDataArray.length;
      let lowEnergy = 0;
      let midEnergy = 0;
      let highEnergy = 0;

      for (let i = 0; i < len; i++) {
        const val = this.audioDataArray[i];
        sum += val;

        if (i < 20) lowEnergy += val;
        else if (i < 60) midEnergy += val;
        else if (i < 150) highEnergy += val;
      }

      micVolume = sum / (len * 255);

      const energyFlux = Math.max(0, midEnergy - this.lastMidEnergy);
      this.lastMidEnergy = midEnergy;

      if (energyFlux > 12 && micVolume > 0.025) {
        this.syllablePulseVal = 1.0;
      } else {
        this.syllablePulseVal = Math.max(0, this.syllablePulseVal - 0.12);
      }

      if (micVolume > 0.03) {
        if (highEnergy > midEnergy * 1.3 && highEnergy > lowEnergy) {
          detectedPhoneme = highEnergy > midEnergy * 1.8 ? 'I' : 'E';
        } else if (midEnergy > lowEnergy * 1.1) {
          detectedPhoneme = midEnergy > lowEnergy * 1.6 ? 'A' : 'O';
        } else {
          detectedPhoneme = 'U';
        }
      } else {
        detectedPhoneme = 'M';
      }
    }

    // Syllable Speech Envelope Smoothing (Fast attack 30ms, natural decay release 150ms)
    if (micVolume > this.audioEnvelope) {
      this.audioEnvelope = this.audioEnvelope * 0.65 + micVolume * 0.35;
    } else {
      this.audioEnvelope = this.audioEnvelope * 0.88 + micVolume * 0.12;
    }

    // Syllable Hold Filter (Holds talking state across consonant pauses during continuous human speech)
    if (this.audioEnvelope > 0.025) {
      this.speechHoldFrames = 8; // ~130ms hold window at 60 FPS
      if (detectedPhoneme !== 'M') {
        this.lastActivePhoneme = detectedPhoneme;
      }
    } else if (this.speechHoldFrames > 0) {
      this.speechHoldFrames--;
      if (detectedPhoneme === 'M' && this.lastActivePhoneme) {
        detectedPhoneme = this.lastActivePhoneme;
      }
    }

    this.currentData.audioVolume = micVolume;
    this.currentData.phoneme = detectedPhoneme;

    // 2. Camera or Cursor Gaze Tracking
    if (
      this.trackingSource === 'cursor' ||
      (!this.isCameraActive && this.trackingSource !== 'camera')
    ) {
      // Mouse Cursor Gaze Tracking
      this.currentData.headYaw = this.mouseX * 35;
      this.currentData.headPitch = this.mouseY * 25;
      this.currentData.headRoll = this.mouseX * 10;
      this.currentData.positionX = this.mouseX * 0.4;
      this.currentData.positionY = this.mouseY * 0.3;

      let audioMouthOpen = 0;
      if (this.speechHoldFrames > 0 || this.audioEnvelope > 0.025) {
        audioMouthOpen = Math.min(1, Math.max(0.3, (this.audioEnvelope - 0.02) * 5.0 * this.mouthSensitivity));
      }
      this.currentData.mouthOpen = audioMouthOpen;
      this.currentData.isSpeaking = audioMouthOpen > 0.1;
    } else if (this.isCameraActive && this.videoElement && this.landmarker && this.videoElement.readyState >= 2) {
      const startTimeMs = performance.now();
      const results = this.landmarker.detectForVideo(this.videoElement, startTimeMs);

      if (results && results.faceLandmarks && results.faceLandmarks.length > 0 && results.faceLandmarks[0].length >= 400) {
        const landmarks = results.faceLandmarks[0];

        const nose = landmarks[1];
        const leftEyeOuter = landmarks[33];
        const rightEyeOuter = landmarks[263];
        const chin = landmarks[152];
        const forehead = landmarks[10];

        const dY = rightEyeOuter.y - leftEyeOuter.y;
        const dX = rightEyeOuter.x - leftEyeOuter.x;
        const rollRad = Math.atan2(dY, dX);
        this.currentData.headRoll = (rollRad * 180) / Math.PI;

        const eyeCenter = (leftEyeOuter.x + rightEyeOuter.x) / 2;
        const yawRatio = (nose.x - eyeCenter) / (rightEyeOuter.x - leftEyeOuter.x);
        this.currentData.headYaw = Math.max(-45, Math.min(45, yawRatio * 120));

        const faceHeight = chin.y - forehead.y;
        const noseVertRatio = (nose.y - forehead.y) / (faceHeight || 1);
        this.currentData.headPitch = Math.max(-40, Math.min(40, (0.5 - noseVertRatio) * 100));

        this.currentData.positionX = (nose.x - 0.5) * 2;
        this.currentData.positionY = (nose.y - 0.5) * 2;

        const leftTop = landmarks[159];
        const leftBottom = landmarks[145];
        const leftH1 = landmarks[33];
        const leftH2 = landmarks[133];
        const leftEAR = Math.hypot(leftTop.x - leftBottom.x, leftTop.y - leftBottom.y) / (Math.hypot(leftH1.x - leftH2.x, leftH1.y - leftH2.y) || 1);
        this.currentData.leftEyeOpen = Math.max(0, Math.min(1, (leftEAR - 0.12) / 0.18));

        const rightTop = landmarks[386];
        const rightBottom = landmarks[374];
        const rightH1 = landmarks[362];
        const rightH2 = landmarks[263];
        const rightEAR = Math.hypot(rightTop.x - rightBottom.x, rightTop.y - rightBottom.y) / (Math.hypot(rightH1.x - rightH2.x, rightH1.y - rightH2.y) || 1);
        this.currentData.rightEyeOpen = Math.max(0, Math.min(1, (rightEAR - 0.12) / 0.18));

        // Multi-point inner lip height calculation (13-14, 82-87, 312-317)
        const mouthTop = landmarks[13];
        const mouthBottom = landmarks[14];
        const mouthTop2 = landmarks[82] || mouthTop;
        const mouthBottom2 = landmarks[87] || mouthBottom;
        const mouthTop3 = landmarks[312] || mouthTop;
        const mouthBottom3 = landmarks[317] || mouthBottom;

        const h1 = Math.hypot(mouthTop.x - mouthBottom.x, mouthTop.y - mouthBottom.y);
        const h2 = Math.hypot(mouthTop2.x - mouthBottom2.x, mouthTop2.y - mouthBottom2.y);
        const h3 = Math.hypot(mouthTop3.x - mouthBottom3.x, mouthTop3.y - mouthBottom3.y);
        const avgMouthHeight = (h1 * 2 + h2 + h3) / 4;

        const mouthLeft = landmarks[61];
        const mouthRight = landmarks[291];
        const mouthWidth = Math.hypot(mouthLeft.x - mouthRight.x, mouthLeft.y - mouthRight.y);

        const mouthRatio = avgMouthHeight / (mouthWidth || 1);

        // Adaptive Resting Baseline Calibration (adapts to user's resting mouth ratio when silent)
        if (micVolume < 0.02) {
          this.restingMouthRatio = this.restingMouthRatio * 0.992 + mouthRatio * 0.008;
        }

        const deltaMouthRatio = Math.max(0, mouthRatio - Math.min(0.12, this.restingMouthRatio));
        let cameraMouthOpen = Math.max(0, Math.min(1, deltaMouthRatio * 3.2 * this.mouthSensitivity));
        let cameraMouthWide = Math.max(0, Math.min(1, (mouthWidth - 0.08) * 3.5 * this.mouthSensitivity));

        // MediaPipe ML Face Blendshape Extraction (jawOpen, mouthPucker, mouthFunnel, mouthSmile)
        if (results.faceBlendshapes && results.faceBlendshapes.length > 0 && results.faceBlendshapes[0].categories) {
          const cats = results.faceBlendshapes[0].categories;
          const getScore = (name: string) => cats.find((c: any) => c.categoryName === name)?.score || 0;

          const jawOpen = getScore('jawOpen');
          const mouthFunnel = getScore('mouthFunnel');
          const mouthPucker = getScore('mouthPucker');
          const mouthSmileL = getScore('mouthSmileLeft');
          const mouthSmileR = getScore('mouthSmileRight');

          const blendOpen = Math.max(jawOpen * 1.0, (mouthFunnel + mouthPucker) * 0.9) * this.mouthSensitivity;
          if (blendOpen > 0.04) {
            cameraMouthOpen = Math.max(cameraMouthOpen, Math.min(1, blendOpen));
          }

          const blendWide = Math.max((mouthSmileL + mouthSmileR) * 0.8, getScore('mouthStretchLeft')) * this.mouthSensitivity;
          if (blendWide > 0.04) {
            cameraMouthWide = Math.max(cameraMouthWide, Math.min(1, blendWide));
          }
        }

        let audioMouthOpen = 0;
        if (this.speechHoldFrames > 0 || this.audioEnvelope > 0.025) {
          const baseOpen = Math.min(1, Math.max(0.22, (this.audioEnvelope - 0.02) * 4.0 * this.mouthSensitivity));
          const pulseModulation = 0.7 + this.syllablePulseVal * 0.5;
          audioMouthOpen = Math.min(1, baseOpen * pulseModulation);
        }

        this.currentData.mouthOpen = Math.max(cameraMouthOpen, audioMouthOpen);
        this.currentData.mouthWide = cameraMouthWide;
        this.currentData.isSpeaking = this.currentData.mouthOpen > 0.08 || micVolume > 0.02;

        const leftEyebrow = landmarks[70];
        const eyebrowDist = Math.hypot(leftEyebrow.x - leftTop.x, leftEyebrow.y - leftTop.y);
        this.currentData.eyebrowRaise = Math.max(-1, Math.min(1, (eyebrowDist - 0.08) * 15));
      }
    }

    if (this.onTrackingUpdateCallback) {
      this.onTrackingUpdateCallback(this.currentData);
    }
  }

  public stop() {
    this.detachMouseListener();
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.stopCamera();
    this.videoElement = null;
    this.stopMicrophone();
    if (this.landmarker) {
      try { this.landmarker.close(); } catch (_) {}
      this.landmarker = null;
    }
  }
}

