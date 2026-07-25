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
  RotateCcw,
} from 'lucide-react';

interface ControlDashboardProps {
  config: EngineConfig;
  onChangeConfig: (newConfig: EngineConfig) => void;
  puppets: SVGPuppetDefinition[];
  activePuppet: SVGPuppetDefinition;
  onSelectPuppet: (puppet: SVGPuppetDefinition) => void;
  onOpenRiggingStudio: () => void;
  onRecalibrateMouth?: () => void;
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
  onRecalibrateMouth,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'puppets' | 'props' | 'chat' | 'motion' | 'fx'>('puppets');
  const [avatarSearch, setAvatarSearch] = useState('');
  const [avatarCategory, setAvatarCategory] = useState<string>('All');
  const [avatarPage, setAvatarPage] = useState(1);
  const [avatarLayoutMode, setAvatarLayoutMode] = useState<'grid' | 'list'>('grid');
  const [avatarsPerPage, setAvatarsPerPage] = useState<number>(4);
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
      {activeTab === 'puppets' && (() => {
        const categories = ['All', 'Sci-Fi', 'Fantasy', 'Anime & Cute', 'Monsters'];
        const filtered = puppets.filter((p) => {
          const matchesCat =
            avatarCategory === 'All' ||
            (p.category && p.category.toLowerCase().includes(avatarCategory.toLowerCase())) ||
            (!p.category && avatarCategory === 'All');
          const matchesSearch =
            p.name.toLowerCase().includes(avatarSearch.toLowerCase()) ||
            p.author.toLowerCase().includes(avatarSearch.toLowerCase());
          return matchesCat && matchesSearch;
        });
        const totalPages = Math.max(1, Math.ceil(filtered.length / avatarsPerPage));
        const currentPage = Math.min(avatarPage, totalPages);
        const paginated = filtered.slice((currentPage - 1) * avatarsPerPage, currentPage * avatarsPerPage);

        return (
          <div className="flex flex-col gap-3">
            {/* Header Toolbar */}
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-300">Avatar Suite ({puppets.length})</label>
              <div className="flex items-center gap-1.5">
                {/* Layout Mode Toggle */}
                <button
                  onClick={() => setAvatarLayoutMode(avatarLayoutMode === 'grid' ? 'list' : 'grid')}
                  className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-[10px] transition"
                  title="Toggle Grid / List view"
                >
                  {avatarLayoutMode === 'grid' ? '☰ List' : '⊞ Grid'}
                </button>
                {/* Per Page Size */}
                <select
                  value={avatarsPerPage}
                  onChange={(e) => {
                    setAvatarsPerPage(Number(e.target.value));
                    setAvatarPage(1);
                  }}
                  className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[10px] font-mono focus:outline-none"
                >
                  <option value={4}>4/pg</option>
                  <option value={6}>6/pg</option>
                </select>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-thin">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setAvatarCategory(cat);
                    setAvatarPage(1);
                  }}
                  className={`px-2 py-1 rounded-lg text-[10px] font-medium whitespace-nowrap transition ${
                    avatarCategory === cat
                      ? 'bg-indigo-600 text-white shadow'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Filter Input */}
            <input
              type="text"
              placeholder="Search 18+ avatars..."
              value={avatarSearch}
              onChange={(e) => {
                setAvatarSearch(e.target.value);
                setAvatarPage(1);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 transition"
            />

            {/* Featured Horizontal SVG Preview Carousel Strip */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              {puppets.map((p) => {
                const isSelected = p.id === activePuppet.id;
                return (
                  <button
                    key={'strip_' + p.id}
                    onClick={() => onSelectPuppet(p)}
                    title={p.name}
                    className={`w-10 h-10 rounded-lg border p-0.5 shrink-0 transition ${
                      isSelected
                        ? 'border-indigo-500 ring-2 ring-indigo-500/40 bg-indigo-600/30'
                        : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                    }`}
                  >
                    <div
                      className="w-full h-full overflow-hidden flex items-center justify-center pointer-events-none"
                      dangerouslySetInnerHTML={{ __html: p.svgContent }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Paginated Avatar Cards Grid / List with SVG Thumbnail Previews */}
            <div className={avatarLayoutMode === 'grid' ? 'grid grid-cols-2 gap-2' : 'flex flex-col gap-2'}>
              {paginated.map((p) => {
                const isSelected = p.id === activePuppet.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => onSelectPuppet(p)}
                    className={`flex ${
                      avatarLayoutMode === 'grid' ? 'flex-col items-center p-2 text-center' : 'items-center gap-3 p-2 text-left'
                    } rounded-xl border transition ${
                      isSelected
                        ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-600/10 ring-1 ring-indigo-500/50'
                        : 'bg-slate-900/40 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {/* SVG Vector Thumbnail Preview */}
                    <div
                      className={`${
                        avatarLayoutMode === 'grid' ? 'w-16 h-16 mb-1' : 'w-12 h-12'
                      } rounded-lg bg-slate-950 border border-slate-700/60 overflow-hidden flex items-center justify-center p-0.5 shrink-0 shadow-inner pointer-events-none`}
                      dangerouslySetInnerHTML={{ __html: p.svgContent }}
                    />

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-xs text-white truncate">{p.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{p.author}</p>
                    </div>

                    {isSelected && <Check className="w-4 h-4 text-indigo-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (() => {
              const getVisiblePages = (current: number, total: number) => {
                if (total <= 5) {
                  return Array.from({ length: total }, (_, i) => i + 1);
                }
                if (current <= 3) {
                  return [1, 2, 3, '...', total];
                }
                if (current >= total - 2) {
                  return [1, '...', total - 2, total - 1, total];
                }
                return [1, '...', current, '...', total];
              };

              const visiblePages = getVisiblePages(currentPage, totalPages);

              return (
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => setAvatarPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage <= 1}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed text-[11px] font-medium transition"
                  >
                    ← Prev
                  </button>

                  <div className="flex items-center gap-1">
                    {visiblePages.map((pg, idx) => {
                      if (pg === '...') {
                        return (
                          <span key={`dots_${idx}`} className="px-1 text-slate-500 text-[10px] font-mono">
                            ...
                          </span>
                        );
                      }
                      return (
                        <button
                          key={`page_${pg}`}
                          onClick={() => setAvatarPage(Number(pg))}
                          className={`w-6 h-6 rounded-md text-[10px] font-mono font-semibold transition ${
                            pg === currentPage
                              ? 'bg-indigo-600 text-white shadow ring-1 ring-indigo-400'
                              : 'bg-slate-900/80 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {pg}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setAvatarPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage >= totalPages}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed text-[11px] font-medium transition"
                  >
                    Next →
                  </button>
                </div>
              );
            })()}

            <button
              onClick={onOpenRiggingStudio}
              className="mt-1 flex items-center justify-center gap-2 p-2.5 rounded-xl border border-dashed border-indigo-500/50 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 font-medium transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>Import & Rig Custom SVG</span>
            </button>
          </div>
        );
      })()}

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

          {/* Dedicated Mouth Tracking Sensitivity & Calibration Controls */}
          <div className="p-3 glass-card rounded-xl border border-slate-800/80 flex flex-col gap-2 mt-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Mouth Tracking Calibration</span>
              </span>
              <span className="text-[10px] font-mono text-indigo-300">
                {(config.physics?.mouthSensitivity ?? 1.2).toFixed(1)}x
              </span>
            </div>

            {/* Lip Sync Engine Mode Selector */}
            <div className="flex flex-col gap-1 my-1">
              <label className="text-[10px] text-slate-400">Lip Sync Engine Mode</label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'phoneme', label: 'Phoneme' },
                  { id: 'pngtuber', label: 'PNGTuber' },
                  { id: 'continuous', label: 'Continuous' },
                ].map((m) => {
                  const currentMode = config.lipSyncMode || 'phoneme';
                  const isSelected = currentMode === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => onChangeConfig({ ...config, lipSyncMode: m.id as any })}
                      className={`py-1 text-[10px] font-semibold rounded-md border transition ${
                        isSelected
                          ? 'bg-indigo-600 border-indigo-400 text-white shadow'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {m.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-slate-400">Mouth Open Sensitivity</label>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.1"
                value={config.physics?.mouthSensitivity ?? 1.2}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  onChangeConfig({
                    ...config,
                    physics: { ...config.physics, mouthSensitivity: val },
                  });
                }}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            <button
              onClick={() => {
                if (onRecalibrateMouth) {
                  onRecalibrateMouth();
                }
              }}
              className="mt-1 w-full py-1.5 px-3 rounded-lg bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-600/30 text-xs font-semibold transition flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Recalibrate Resting Lips Baseline</span>
            </button>
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
