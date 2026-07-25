import React, { useEffect, useRef } from 'react';
import { Camera, X, CheckCircle2, Play } from 'lucide-react';

interface TrackingCameraPIPProps {
  isCameraActive: boolean;
  onClose: () => void;
  onToggleCamera?: () => void;
  headYaw: number;
  headPitch: number;
  getVideoElement?: () => HTMLVideoElement | null;
  getCameraStream?: () => MediaStream | null;
  cameraError?: string | null;
}

export const TrackingCameraPIP = React.memo<TrackingCameraPIPProps>(({
  isCameraActive,
  onClose,
  onToggleCamera,
  headYaw,
  headPitch,
  getVideoElement,
  getCameraStream,
  cameraError,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isCameraActive) return;

    const stream = getCameraStream ? getCameraStream() : null;
    const vEl = videoRef.current;
    if (vEl && stream && vEl.srcObject !== stream) {
      vEl.srcObject = stream;
      vEl.play().catch(() => {});
    }

    let animId: number;
    const render = () => {
      const canvas = canvasRef.current;
      const v = getVideoElement ? getVideoElement() : null;

      if (canvas && v && v.readyState >= 2 && v.videoWidth > 0 && !stream) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const w = canvas.clientWidth || 224;
          const h = canvas.clientHeight || 144;
          if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
          }
          ctx.save();
          ctx.translate(w, 0);
          ctx.scale(-1, 1);
          ctx.drawImage(v, 0, 0, w, h);
          ctx.restore();
        }
      }
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isCameraActive, getCameraStream, getVideoElement]);

  return (
    <div className="fixed bottom-20 right-6 z-40 w-56 glass-panel rounded-2xl border border-indigo-500/30 overflow-hidden shadow-2xl flex flex-col pointer-events-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-900/80 border-b border-slate-800">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
          <Camera className="w-3.5 h-3.5 text-indigo-400" />
          <span>Camera PIP Feed</span>
        </div>
        <button onClick={onClose} className="p-1 text-slate-400 hover:text-white transition">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Viewport */}
      <div className="relative w-full h-36 bg-slate-950 flex items-center justify-center overflow-hidden">
        {isCameraActive ? (
          <div className="relative w-full h-full flex items-center justify-center bg-slate-900/60 overflow-hidden">
            {/* Native Hardware Video Stream Preview */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover scale-x-[-1] pointer-events-none"
            />
            {/* Canvas Fallback Render Target */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />

            {/* Diagnostic Target Overlay */}
            <div className="absolute inset-0 border border-indigo-500/30 rounded-lg pointer-events-none" />
            <div
              className="absolute w-8 h-8 rounded-full border-2 border-indigo-400/90 bg-indigo-500/30 flex items-center justify-center transition-transform duration-75 shadow-lg shadow-indigo-500/50"
              style={{
                transform: `translate(${Math.round(headYaw * 1.5)}px, ${Math.round(headPitch * 1.5)}px)`,
              }}
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900/80 border border-emerald-500/50 text-[10px] font-mono text-emerald-300 backdrop-blur-sm">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Face Track 60 FPS</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-1.5 text-slate-400 text-xs p-3 text-center">
            <Camera className="w-6 h-6 stroke-1 text-indigo-400/60" />
            <span className="text-[11px] font-medium text-slate-300">
              {cameraError ? 'Camera Notice' : 'Camera Disconnected'}
            </span>
            {cameraError && (
              <p className="text-[9px] text-amber-300/90 leading-tight px-1 max-h-12 overflow-hidden text-ellipsis">
                {cameraError}
              </p>
            )}
            {onToggleCamera && (
              <button
                onClick={onToggleCamera}
                className="mt-1 flex items-center gap-1.5 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-lg transition shadow-md shadow-indigo-600/30"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{cameraError ? 'Retry Access' : 'Start Camera'}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
});
