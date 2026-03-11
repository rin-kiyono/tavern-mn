import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { requestFullscreen } from '../utils/fullscreen';

interface Props {
  onStart: () => void;
}

export default function StartScreen({ onStart }: Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleClick = () => {
    requestFullscreen();
    onStart();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#050505] cursor-pointer overflow-hidden z-50"
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(60,10,20,0.2)_0%,_transparent_60%)] pointer-events-none"></div>
      <motion.div 
        animate={{ opacity: [0.3, 1, 0.3] }} 
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="flex flex-col items-center gap-4"
      >
        <span className="text-red-500/80 font-serif text-xl sm:text-2xl tracking-[0.5em] ml-[0.5em]">点击屏幕开始</span>
        <span className="text-gray-600 font-sans text-xs sm:text-sm tracking-widest uppercase">Press Enter or Click to Start</span>
      </motion.div>
    </motion.div>
  );
}
