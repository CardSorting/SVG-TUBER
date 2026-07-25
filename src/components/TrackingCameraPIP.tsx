import React from 'react';
import { Camera, X, CheckCircle2 } from 'lucide-react';

interface TrackingCameraPIPProps {
  isCameraActive: boolean;
  onClose: () => void;
  headYaw: number;
  headPitch: number;
}

export const TrackingCameraPIP = React.memo<TrackingCameraPIPProps>(({
  isCameraActive,
  onClose,
  headYaw,
  headPitch,
}) => {
  return (
    <div className="fixed bottom-20 right-6 z-40 w-52 glass-panel rounded-2xl border border-indigo-500/30 overflow-hidden shadow-2xl flex flex-col pointer-events-auto">
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
      <div className="relative w-full h-32 bg-slate-950 flex items-center justify-center overflow-hidden">
        {isCameraActive ? (
          <div className="relative w-full h-full flex items-center justify-center bg-slate-900/60">
            {/* Synthetic Diagnostic Target Grid */}
            <div className="absolute inset-0 border border-indigo-500/20 rounded-lg pointer-events-none" />
            <div
              className="w-8 h-8 rounded-full border-2 border-indigo-400/80 bg-indigo-500/20 flex items-center justify-center transition-transform duration-75 shadow-lg shadow-indigo-500/40"
              style={{
                transform: `translate(${Math.round(headYaw * 1.5)}px, ${Math.round(headPitch * 1.5)}px)`,
              }}
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            <div className="absolute bottom-2 left-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-[9px] font-mono text-emerald-300">
              <CheckCircle2 className="w-2.5 h-2.5" />
              <span>Face Track 60 FPS</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1 text-slate-500 text-xs p-4 text-center">
            <Camera className="w-6 h-6 stroke-1 opacity-50" />
            <span>Camera Standby</span>
          </div>
        )}
      </div>
    </div>
  );
});
