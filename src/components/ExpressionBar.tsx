import React, { useEffect } from 'react';
import { ExpressionType } from '../types/tuber';
import { Smile, Flame, Zap, Heart, Star, Droplets, Meh } from 'lucide-react';

interface ExpressionBarProps {
  activeExpression: ExpressionType;
  onSelectExpression: (expr: ExpressionType) => void;
}

const EXPRESSIONS: { type: ExpressionType; label: string; key: string; icon: React.ReactNode; color: string }[] = [
  { type: 'neutral', label: 'Neutral', key: '1', icon: <Meh className="w-4 h-4" />, color: 'hover:text-slate-200' },
  { type: 'happy', label: 'Happy', key: '2', icon: <Smile className="w-4 h-4" />, color: 'hover:text-amber-400' },
  { type: 'blush', label: 'Blush', key: '3', icon: <Heart className="w-4 h-4" />, color: 'hover:text-pink-400' },
  { type: 'angry', label: 'Angry', key: '4', icon: <Flame className="w-4 h-4" />, color: 'hover:text-red-400' },
  { type: 'shocked', label: 'Shocked', key: '5', icon: <Zap className="w-4 h-4" />, color: 'hover:text-cyan-400' },
  { type: 'star_eyes', label: 'Stars', key: '6', icon: <Star className="w-4 h-4" />, color: 'hover:text-yellow-300' },
  { type: 'tears', label: 'Tears', key: '7', icon: <Droplets className="w-4 h-4" />, color: 'hover:text-blue-400' },
];

export const ExpressionBar = React.memo<ExpressionBarProps>(({
  activeExpression,
  onSelectExpression,
}) => {
  // Hotkey listener (Keys 1 - 7)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when typing in text inputs
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) return;

      const match = EXPRESSIONS.find((item) => item.key === e.key);
      if (match) {
        onSelectExpression(match.type);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSelectExpression]);

  return (
    <div className="flex items-center gap-1.5 p-1.5 glass-panel rounded-full border border-slate-700/60 shadow-xl">
      {EXPRESSIONS.map((expr) => {
        const isActive = activeExpression === expr.type;
        return (
          <button
            key={expr.type}
            onClick={() => onSelectExpression(expr.type)}
            className={`relative group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition ${
              isActive
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/40'
                : 'text-slate-400 hover:bg-slate-800/80 ' + expr.color
            }`}
          >
            {expr.icon}
            <span className="hidden sm:inline">{expr.label}</span>
            <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded bg-slate-900/60 border border-slate-700/80 font-mono text-slate-300">
              {expr.key}
            </span>
          </button>
        );
      })}
    </div>
  );
});
