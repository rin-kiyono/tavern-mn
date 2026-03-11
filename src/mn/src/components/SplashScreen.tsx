import React from 'react';
import { motion } from 'motion/react';
import { Maximize, Settings, Play, RotateCcw, Power } from 'lucide-react';
import { toggleFullscreen } from '../utils/fullscreen';

interface Props {
  onNewGame: () => void;
  onContinue: () => void;
}

export default function SplashScreen({ onNewGame, onContinue }: Props) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-[#0a0a0c] overflow-hidden z-40"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop" 
          alt="Gothic Cathedral" 
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#0a0a0c]/80 to-[#0a0a0c]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-md px-6">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-7xl font-serif font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-red-400 to-red-900 drop-shadow-[0_0_20px_rgba(220,38,38,0.4)] mb-4 ml-[0.2em]">
            暗夜纪元
          </h1>
          <p className="text-gray-400 tracking-[0.5em] text-sm sm:text-base uppercase ml-[0.5em]">Age of Darkness</p>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-4 w-full"
        >
          <MenuButton icon={<Play size={18} />} label="开始新游戏" onClick={onNewGame} primary />
          <MenuButton icon={<RotateCcw size={18} />} label="继续游戏" onClick={onContinue} />
          <MenuButton icon={<Settings size={18} />} label="游戏设置" onClick={() => {}} />
          <MenuButton icon={<Power size={18} />} label="退出" onClick={() => {}} />
        </motion.div>
      </div>

      {/* Footer & Controls */}
      <div className="absolute bottom-6 w-full px-8 flex justify-between items-end z-10">
        <div className="text-gray-600 text-xs tracking-wider">
          <p>v1.0.0 Alpha</p>
          <p>&copy; 2026 Tavern Helper Project</p>
        </div>
        <button 
          onClick={toggleFullscreen}
          className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          title="切换全屏"
        >
          <Maximize size={20} />
        </button>
      </div>
    </motion.div>
  );
}

function MenuButton({ icon, label, onClick, primary = false }: { icon: React.ReactNode, label: string, onClick: () => void, primary?: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center justify-center gap-3 w-full py-4 px-6 rounded-lg border transition-all duration-300 group relative overflow-hidden ${
        primary 
          ? 'bg-red-900/40 border-red-500/50 text-red-100 hover:bg-red-900/60 hover:shadow-[0_0_20px_rgba(220,38,38,0.3)]' 
          : 'bg-black/40 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/30'
      }`}
    >
      <div className="absolute inset-0 w-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 group-hover:w-full transition-all duration-700 ease-out -skew-x-12"></div>
      <span className={`transition-transform duration-300 group-hover:scale-110 ${primary ? 'text-red-400' : 'text-gray-400'}`}>{icon}</span>
      <span className="font-serif tracking-[0.2em] ml-[0.2em]">{label}</span>
    </button>
  );
}
