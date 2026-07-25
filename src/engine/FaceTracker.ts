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

      const filesetResolver = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
      );

      this.landmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
          delegate: 'GPU',
        },
        outputFaceBlendshapes: true,
        runningMode: 'VIDEO',
        numFaces: 1,
      });

      return true;
    } catch (err: any) {
      console.warn('GPU face landmarker fallback to CPU:', err);
      try {
        const filesetResolver = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
        );
        this.landmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
            delegate: 'CPU',
          },
          outputFaceBlendshapes: true,
          runningMode: 'VIDEO',
          numFaces: 1,
        });
        return true;
      } catch (e: any) {
        this.cameraError = 'Could not load face landmarker: ' + e?.message;
        return false;
      }
    }
  }

  public stopCamera() {
    this.cameraRequestId++;
    if (this.videoElement && this.videoElement.srcObject) {
      try {
        (this.videoElement.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
      } catch (_) {}
      this.videoElement.srcObject = null;
    }
    this.isCameraActive = false;
  }

  public async startCamera(deviceId?: string): Promise<boolean> {
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

      this.stopCamera();

      if (!this.videoElement) {
        this.videoElement = document.createElement('video');
        this.videoElement.setAttribute('playsinline', '');
        this.videoElement.setAttribute('autoplay', '');
        this.videoElement.muted = true;
      }

      const constraints: MediaStreamConstraints = {
        video: deviceId ? { deviceId: { exact: deviceId } } : { width: { ideal: 640 }, height: { ideal: 480 } }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (this.cameraRequestId !== currentReqId) {
        // Obsolete request, stop tracks immediately to prevent leak
        stream.getTracks().forEach((track) => track.stop());
        return false;
      }

      this.videoElement.srcObject = stream;
      try {
        await this.videoElement.play();
      } catch (playErr: any) {
        if (playErr.name !== 'AbortError') {
          console.warn('Video play error:', playErr);
        }
      }

      this.isCameraActive = true;
      this.startTrackingLoop();
      return true;
    } catch (err: any) {
      if (this.cameraRequestId === currentReqId) {
        console.warn('Camera access error:', err);
        this.cameraError = 'Camera access denied or unavailable: ' + err?.message;
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

      if (micVolume > 0.04) {
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

      const audioMouthOpen = Math.min(1, micVolume * 7);
      this.currentData.mouthOpen = audioMouthOpen;
      this.currentData.isSpeaking = micVolume > 0.04;
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

        const mouthTop = landmarks[13];
        const mouthBottom = landmarks[14];
        const mouthLeft = landmarks[61];
        const mouthRight = landmarks[291];
        const mouthHeight = Math.hypot(mouthTop.x - mouthBottom.x, mouthTop.y - mouthBottom.y);
        const mouthWidth = Math.hypot(mouthLeft.x - mouthRight.x, mouthLeft.y - mouthRight.y);

        const cameraMouthOpen = Math.max(0, Math.min(1, (mouthHeight / (mouthWidth || 1) - 0.05) * 3));
        const audioMouthOpen = Math.min(1, micVolume * 6.5);
        this.currentData.mouthOpen = Math.max(cameraMouthOpen, audioMouthOpen);
        this.currentData.mouthWide = Math.max(0, Math.min(1, (mouthWidth - 0.1) * 4));
        this.currentData.isSpeaking = this.currentData.mouthOpen > 0.12 || micVolume > 0.05;

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

