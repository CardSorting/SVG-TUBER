import React, { useState } from 'react';
import { EngineConfig, SVGPuppetDefinition, BackgroundMode, AmbientLighting, PropItem, TrackingInputSource, PostFilter, ExpressionType } from '../types/tuber';
import { ChatTriggerStudio } from './ChatTriggerStudio';
import { MotionRecorder } from '../engine/MotionRecorder';
import {
  Camera,
  Mic,
  Sliders,
  Tv,
  Layers,
  Copy,
  Check,
  Sparkles,
  MousePointer,
  Palette,
  Volume2,
  Activity,
  VolumeX,
  Sun,
  ShieldAlert,
  Glasses,
  Wind,
  Volume2 as SoundIcon,
  MousePointerClick,
  MonitorPlay,
  Bookmark,
  Bot,
  Video,
  Play,
  Square,
  Sparkle,
} from 'lucide-react';

interface ControlDashboardProps {
  config: EngineConfig;
  onChangeConfig: (newConfig: EngineConfig) => void;
  puppets: SVGPuppetDefinition[];
  activePuppet: SVGPuppetDefinition;
  onSelectPuppet: (puppet: SVGPuppetDefinition) => void;
  onOpenRiggingStudio: () => void;
  trackingStats: {
    yaw: number;
    pitch: number;
    roll: number;
    leftEye: number;
    rightEye: number;
    mouth: number;
    volume: number;
    phoneme: string;
  };
  isCameraActive: boolean;
  isMicActive: boolean;
  onToggleCamera: () => void;
  onToggleMic: () => void;
  motionRecorder: MotionRecorder;
  onTriggerExpression: (expr: ExpressionType) => void;
}

const DASHBOARD_TABS = [
  { id: 'puppets', label: 'Avatars', icon: <Layers className="w-3.5 h-3.5" /> },
  { id: 'props', label: 'Props', icon: <Glasses className="w-3.5 h-3.5" /> },
  { id: 'chat', label: 'Chat Bot', icon: <Bot className="w-3.5 h-3.5" /> },
  { id: 'motion', label: 'Recorder', icon: <Video className="w-3.5 h-3.5" /> },
  { id: 'fx', label: 'Shaders', icon: <Sparkles className="w-3.5 h-3.5" /> },
];

const PROP_ITEMS_LIST: { id: PropItem; label: string }[] = [
  { id: 'none', label: '🚫 No Prop' },
  { id: 'glasses', label: '🕶️ Cyber Visor' },
  { id: 'headset', label: '🎧 Pro Headset' },
  { id: 'boba', label: '🧋 Boba Tea' },
  { id: 'halo', label: '😇 Angel Halo' },
];

const SHADER_FILTERS_LIST: { id: PostFilter; label: string }[] = [
  { id: 'none', label: '🚫 No Filter' },
  { id: 'crt', label: '📺 CRT Scanlines' },
  { id: 'vhs', label: '📼 VHS Glitch' },
  { id: 'bloom', label: '🔮 Cyber Bloom' },
  { id: 'pixel', label: '👾 Pixel Art' },
];

export const ControlDashboard = React.memo<ControlDashboardProps>(({
  config,
  onChangeConfig,
  puppets,
  activePuppet,
  onSelectPuppet,
  onOpenRiggingStudio,
  trackingStats,
  isCameraActive,
  isMicActive,
  onToggleCamera,
  onToggleMic,
  motionRecorder,
  onTriggerExpression,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'puppets' | 'props' | 'chat' | 'motion' | 'fx'>('puppets');
  const [recordedFramesCount, setRecordedFramesCount] = useState<number>(0);

  const obsUrl = `${window.location.origin}/#obs`;

  const timerRef = React.useRef<any>(null);

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const copyObsUrl = () => {
    navigator.clipboard.writeText(obsUrl);
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2000);
  };

  const toggleClickThrough = () => {
    const nextState = !config.enableClickThrough;
    onChangeConfig({ ...config, enableClickThrough: nextState });

    if ((window as any).electronAPI?.setIgnoreMouseEvents) {
      (window as any).electronAPI.setIgnoreMouseEvents(nextState);
    }
  };

  const handleRecordToggle = () => {
    if (motionRecorder.isRecording) {
      const count = motionRecorder.stopRecording();
      setRecordedFramesCount(count);
    } else {
      motionRecorder.startRecording();
    }
  };

  const handlePlaybackToggle = () => {
    if (motionRecorder.isPlaying) {
      motionRecorder.stopPlayback();
    } else {
      motionRecorder.startPlayback();
    }
  };

  return (
    <div className="w-88 glass-panel rounded-2xl border border-slate-700/60 p-4 flex flex-col gap-4 text-xs select-none max-h-[85vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-outfit font-bold text-sm text-slate-100 tracking-wide">SVG-TUBER</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">v4.0 ULTIMATE</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onChangeConfig({ ...config, showCameraPIP: !config.showCameraPIP })}
            title="Toggle PIP Camera Preview"
            className={`p-1.5 rounded-lg border transition ${
              config.showCameraPIP
                ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <MonitorPlay className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={toggleClickThrough}
            title={config.enableClickThrough ? 'Click-Through Active (Clicks pass to games)' : 'Enable Mouse Click-Through'}
            className={`p-1.5 rounded-lg border transition ${
              config.enableClickThrough
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <MousePointer className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="grid grid-cols-5 gap-1 p-1 bg-slate-900/60 rounded-xl border border-slate-800">
        {DASHBOARD_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex flex-col items-center gap-1 py-1.5 rounded-lg transition font-medium ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.icon}
            <span className="text-[10px]">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: PUPPETS */}
      {activeTab === 'puppets' && (
        <div className="flex flex-col gap-3">
          <label className="font-semibold text-slate-300">Select Avatar</label>
          <div className="flex flex-col gap-2">
            {puppets.map((p) => {
              const isSelected = p.id === activePuppet.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelectPuppet(p)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500 text-white'
                      : 'bg-slate-900/40 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <p className="font-semibold text-xs text-white">{p.name}</p>
                    <p className="text-[10px] text-slate-400">{p.author}</p>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-indigo-400" />}
                </button>
              );
            })}
          </div>

          <button
            onClick={onOpenRiggingStudio}
            className="mt-1 flex items-center justify-center gap-2 p-2.5 rounded-xl border border-dashed border-indigo-500/50 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 font-medium transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>Import & Rig Custom SVG</span>
          </button>
        </div>
      )}

      {/* TAB 2: PROPS */}
      {activeTab === 'props' && (
        <div className="flex flex-col gap-3">
          <label className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Glasses className="w-3.5 h-3.5 text-indigo-400" />
            <span>Avatar Props Overlay</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {PROP_ITEMS_LIST.map((propItem) => (
              <button
                key={propItem.id}
                onClick={() => onChangeConfig({ ...config, activeProp: propItem.id })}
                className={`p-2.5 rounded-xl border text-left font-semibold text-xs transition ${
                  config.activeProp === propItem.id
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {propItem.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: STREAM CHAT BOT */}
      {activeTab === 'chat' && (
        <div className="flex flex-col gap-3">
          <ChatTriggerStudio
            onTriggerExpression={onTriggerExpression}
            onTriggerProp={(p) => onChangeConfig({ ...config, activeProp: p })}
          />
        </div>
      )}

      {/* TAB 4: MOTION RECORDER */}
      {activeTab === 'motion' && (
        <div className="flex flex-col gap-3">
          <label className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5 text-indigo-400" />
            <span>Motion Pose Keyframe Recorder</span>
          </label>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleRecordToggle}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border font-semibold transition ${
                motionRecorder.isRecording
                  ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-indigo-500'
              }`}
            >
              <Square className="w-3.5 h-3.5" />
              <span>{motionRecorder.isRecording ? 'Stop Recording' : 'Record Motion'}</span>
            </button>

            <button
              onClick={handlePlaybackToggle}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border font-semibold transition ${
                motionRecorder.isPlaying
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-indigo-500'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>{motionRecorder.isPlaying ? 'Pause Replay' : 'Play Motion'}</span>
            </button>
          </div>

          <div className="p-3 glass-card rounded-xl border border-slate-800 text-[10px] text-slate-400 flex flex-col gap-1">
            <span className="font-semibold text-slate-200">Recording Status:</span>
            <span>• Frames Captured: {recordedFramesCount}</span>
            <span>• Loop Mode: {motionRecorder.loop ? 'Enabled' : 'Disabled'}</span>
          </div>
        </div>
      )}

      {/* TAB 5: POST-PROCESSING SHADERS */}
      {activeTab === 'fx' && (
        <div className="flex flex-col gap-3">
          <label className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Post-Processing Shaders</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {SHADER_FILTERS_LIST.map((f) => (
              <button
                key={f.id}
                onClick={() => onChangeConfig({ ...config, postFilter: f.id })}
                className={`p-2.5 rounded-xl border text-left font-semibold text-xs transition ${
                  config.postFilter === f.id
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
