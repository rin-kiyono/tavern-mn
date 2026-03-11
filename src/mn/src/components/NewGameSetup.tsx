import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GameConfig } from '../types/types';

interface Props {
  onCancel: () => void;
  onConfirm: (config: GameConfig) => void;
}

export default function NewGameSetup({ onCancel, onConfirm }: Props) {
  const [config, setConfig] = useState<GameConfig>({
    playerName: '',
    difficulty: 'normal',
    background: 'mercenary'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(config);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#0a0a0c] p-4 sm:p-8 z-30"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop')] bg-cover opacity-20 mix-blend-luminosity pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-2xl bg-black/60 backdrop-blur-xl border border-red-900/30 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-full">
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-red-900/20 to-transparent shrink-0">
          <h2 className="text-2xl font-serif text-red-200 tracking-widest">缔结契约</h2>
          <p className="text-gray-400 text-sm mt-1">在进入遗忘之城前，请确认你的身份。</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 flex-1 overflow-y-auto custom-scrollbar space-y-8">
          {/* Name */}
          <div className="space-y-3">
            <label className="block text-sm text-red-300 tracking-widest">真名</label>
            <input 
              type="text" 
              required
              value={config.playerName}
              onChange={e => setConfig({...config, playerName: e.target.value})}
              placeholder="输入你的名字..."
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:border-red-500/50 transition-colors"
            />
          </div>

          {/* Background */}
          <div className="space-y-3">
            <label className="block text-sm text-red-300 tracking-widest">出身</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(['noble', 'mercenary', 'scholar'] as const).map(bg => (
                <button
                  key={bg}
                  type="button"
                  onClick={() => setConfig({...config, background: bg})}
                  className={`p-4 rounded-lg border transition-all text-center ${
                    config.background === bg 
                      ? 'bg-red-900/40 border-red-500/50 text-red-200 shadow-[0_0_15px_rgba(220,38,38,0.2)]' 
                      : 'bg-black/40 border-white/10 text-gray-400 hover:bg-white/5'
                  }`}
                >
                  {bg === 'noble' ? '没落贵族' : bg === 'mercenary' ? '流浪佣兵' : '异端学者'}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div className="space-y-3">
            <label className="block text-sm text-red-300 tracking-widest">命运</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(['story', 'normal', 'hardcore'] as const).map(diff => (
                <button
                  key={diff}
                  type="button"
                  onClick={() => setConfig({...config, difficulty: diff})}
                  className={`p-4 rounded-lg border transition-all text-center ${
                    config.difficulty === diff 
                      ? 'bg-red-900/40 border-red-500/50 text-red-200 shadow-[0_0_15px_rgba(220,38,38,0.2)]' 
                      : 'bg-black/40 border-white/10 text-gray-400 hover:bg-white/5'
                  }`}
                >
                  {diff === 'story' ? '故事模式' : diff === 'normal' ? '标准难度' : '残酷挑战'}
                </button>
              ))}
            </div>
          </div>
        </form>

        <div className="p-6 border-t border-white/10 bg-black/40 flex justify-between gap-4 shrink-0">
          <button 
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-lg border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2"
          >
            <ChevronLeft size={18} /> 返回
          </button>
          <button 
            onClick={handleSubmit}
            disabled={!config.playerName.trim()}
            className="px-8 py-3 rounded-lg bg-red-900/80 border border-red-700/50 text-red-100 hover:bg-red-800 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(153,27,27,0.4)]"
          >
            确认契约 <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
