import React, { useState } from 'react';
import { ExpressionType, PropItem } from '../types/tuber';
import { MessageSquare, Send, Zap, Bot, Sparkles } from 'lucide-react';

interface ChatTriggerStudioProps {
  onTriggerExpression: (expr: ExpressionType) => void;
  onTriggerProp: (prop: PropItem) => void;
}

export const ChatTriggerStudio = React.memo<ChatTriggerStudioProps>(({
  onTriggerExpression,
  onTriggerProp,
}) => {
  const [chatInput, setChatInput] = useState('');
  const [chatLog, setChatLog] = useState<{ sender: string; message: string; badge?: string }[]>([
    { sender: 'StreamBot', message: 'Chat Command Studio Ready! Try !blush, !angry, !shock, !boba, !halo, !star', badge: 'BOT' },
    { sender: 'Viewer_Neko', message: '!blush' },
  ]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const msg = chatInput.trim();
    setChatLog((prev) => [...prev.slice(-49), { sender: 'You (Streamer)', message: msg, badge: 'MOD' }]);
    setChatInput('');

    // Command parser
    const cmd = msg.toLowerCase();
    if (cmd.includes('!blush')) onTriggerExpression('blush');
    else if (cmd.includes('!angry')) onTriggerExpression('angry');
    else if (cmd.includes('!shock')) onTriggerExpression('shocked');
    else if (cmd.includes('!star')) onTriggerExpression('star_eyes');
    else if (cmd.includes('!heart')) onTriggerExpression('heart_eyes');
    else if (cmd.includes('!tears')) onTriggerExpression('tears');
    else if (cmd.includes('!happy')) onTriggerExpression('happy');
    else if (cmd.includes('!boba')) onTriggerProp('boba');
    else if (cmd.includes('!halo')) onTriggerProp('halo');
    else if (cmd.includes('!headset')) onTriggerProp('headset');
    else if (cmd.includes('!visor')) onTriggerProp('glasses');
  };

  return (
    <div className="flex flex-col gap-3 p-3 glass-card rounded-xl border border-slate-800 text-xs">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-slate-200 flex items-center gap-1.5">
          <Bot className="w-3.5 h-3.5 text-indigo-400" />
          <span>Stream Chat Command Simulator</span>
        </span>
        <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
          Connected
        </span>
      </div>

      {/* Chat Log Window */}
      <div className="h-32 overflow-y-auto p-2 bg-slate-950/80 rounded-lg border border-slate-800 flex flex-col gap-1 font-mono text-[10px]">
        {chatLog.map((log, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            {log.badge && (
              <span className="px-1 py-0.2 rounded bg-indigo-600/40 text-indigo-300 text-[8px] font-bold">
                {log.badge}
              </span>
            )}
            <span className="font-bold text-slate-300">{log.sender}:</span>
            <span className="text-slate-400">{log.message}</span>
          </div>
        ))}
      </div>

      {/* Chat Command Input */}
      <form onSubmit={handleSendMessage} className="flex gap-1.5">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Type !blush, !angry, !boba..."
          className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-indigo-500 text-xs"
        />
        <button
          type="submit"
          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition font-medium text-xs flex items-center gap-1"
        >
          <Send className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
});
