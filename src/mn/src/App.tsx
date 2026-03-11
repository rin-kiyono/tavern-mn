import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { PageState, GameConfig } from './types/types';
import StartScreen from './components/StartScreen';
import SplashScreen from './components/SplashScreen';
import NewGameSetup from './components/NewGameSetup';
import GameDashboard from './components/GameDashboard';

export default function App() {
  const [page, setPage] = useState<PageState>('start');
  const [gameConfig, setGameConfig] = useState<GameConfig | null>(null);

  const handleStartNewGame = (config: GameConfig) => {
    setGameConfig(config);
    setPage('game');
  };

  return (
    <div id="app" className="w-full h-[100dvh] bg-black text-white overflow-hidden relative">
      <AnimatePresence mode="wait">
        {page === 'start' && (
          <StartScreen key="start" onStart={() => setPage('splash')} />
        )}
        {page === 'splash' && (
          <SplashScreen 
            key="splash" 
            onNewGame={() => setPage('setup')} 
            onContinue={() => setPage('game')} 
          />
        )}
        {page === 'setup' && (
          <NewGameSetup 
            key="setup" 
            onCancel={() => setPage('splash')} 
            onConfirm={handleStartNewGame} 
          />
        )}
        {page === 'game' && (
          <GameDashboard key="game" />
        )}
      </AnimatePresence>
    </div>
  );
}
