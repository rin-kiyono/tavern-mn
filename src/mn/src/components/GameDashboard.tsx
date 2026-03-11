import React, { useState, useEffect, useRef } from 'react';
import { Map, Backpack, ScrollText, Users, History, Settings, X, ChevronRight, Sparkles, Menu as MenuIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type ModalType = 'affinity' | 'inventory' | 'quests' | 'map' | 'history' | 'settings' | 'menu' | null;

const MOCK_HISTORY = [
  { role: 'system', content: '你醒来时，发现自己身处一座废弃的哥特式大教堂中。月光透过破碎的彩绘玻璃洒在冰冷的石板地上。' },
  { role: 'npc', name: '神秘少女', content: '“你终于醒了，异乡人。时间不多了。”' },
  { role: 'player', content: '“你是谁？这里是哪里？”' },
  { role: 'npc', name: '神秘少女', content: '“我是艾莉丝。这里是‘遗忘之城’的边缘。如果你想活下去，就跟我来。”' },
];

const MOCK_NPCS = [
  { id: 1, name: '艾莉丝', title: '引路人', affinity: 45, max: 100, desc: '在废墟中救下你的神秘少女，似乎隐藏着许多秘密。' },
  { id: 2, name: '卡尔', title: '铁匠', affinity: 12, max: 100, desc: '脾气暴躁但手艺精湛的矮人铁匠。' },
];

const MOCK_INVENTORY = [
  { id: 1, name: '生锈的铁剑', type: '武器', desc: '一把破旧的铁剑，勉强能用来防身。', rarity: 'common' },
  { id: 2, name: '红药水', type: '消耗品', desc: '恢复少量生命值。', rarity: 'common' },
  { id: 3, name: '神秘挂坠', type: '饰品', desc: '散发着微弱魔法波动的银质挂坠。', rarity: 'rare' },
];

const MOCK_QUESTS = [
  { id: 1, title: '逃离废墟', status: 'active', desc: '跟随艾莉丝离开这座危险的大教堂。' },
  { id: 2, title: '寻找记忆', status: 'pending', desc: '你失去了过去的记忆，试着找回它们。' },
];

export default function GameDashboard() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [fontFamily, setFontFamily] = useState('font-serif');
  const [fontSize, setFontSize] = useState('text-base');
  const [dialogue, setDialogue] = useState(MOCK_HISTORY);
  const [inputText, setInputText] = useState('');
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [dialogue]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    setDialogue([...dialogue, { role: 'player', content: inputText }]);
    setInputText('');
    setTimeout(() => {
      setDialogue(prev => [...prev, { 
        role: 'npc', 
        name: '艾莉丝', 
        content: '“你的选择将决定我们的命运。继续前进吧。”' 
      }]);
    }, 1000);
  };

  const openSubModal = (type: ModalType) => {
    setActiveModal(type);
  };

  return (
    <div className={`h-[100dvh] w-full bg-[#0a0a0c] text-gray-300 ${fontFamily} overflow-hidden flex flex-col relative`}>
      {/* Full Screen Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop" 
          alt="Gothic Cathedral" 
          className="w-full h-full object-cover opacity-80"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(60,10,20,0.3)_0%,_transparent_70%)]"></div>
      </div>

      <header className="relative z-10 flex justify-between items-center p-3 sm:p-4 bg-gradient-to-b from-black/80 to-transparent shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-red-900/80 to-black/80 border border-red-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.2)] backdrop-blur-sm">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
          </div>
          <h1 className="text-lg sm:text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-200 drop-shadow-lg">
            暗夜纪元
          </h1>
        </div>
        
        <nav className="flex gap-1 sm:gap-2">
          <NavButton icon={<History className="w-5 h-5 sm:w-6 sm:h-6" />} label="历史" onClick={() => setActiveModal('history')} />
          <NavButton icon={<MenuIcon className="w-5 h-5 sm:w-6 sm:h-6" />} label="菜单" onClick={() => setActiveModal('menu')} />
        </nav>
      </header>

      <main className="flex-1 relative z-10 flex flex-col max-w-5xl mx-auto w-full p-2 sm:p-4 gap-2 sm:gap-4 overflow-hidden">
        {/* Character Art Container */}
        <div className="flex-1 relative w-full pointer-events-none">
          <div className="absolute bottom-0 right-4 sm:right-10 w-48 sm:w-64 h-72 sm:h-96">
            <div className="w-full h-full bg-gradient-to-t from-black/80 to-transparent absolute bottom-0 z-10"></div>
            <div className="w-full h-full bg-white/5 rounded-t-full border-t border-x border-white/10 backdrop-blur-sm flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
               <span className="text-white/30 text-xs sm:text-sm tracking-widest drop-shadow-md">CHARACTER ART</span>
            </div>
          </div>
        </div>

        {/* Dialogue Box (High Transparency) */}
        <div className="h-[40%] min-h-[250px] sm:h-72 rounded-xl border border-red-900/20 bg-black/20 backdrop-blur-md flex flex-col shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden shrink-0">
          <div className="absolute top-0 left-0 w-6 sm:w-8 h-6 sm:h-8 border-t-2 border-l-2 border-red-900/40 rounded-tl-xl"></div>
          <div className="absolute top-0 right-0 w-6 sm:w-8 h-6 sm:h-8 border-t-2 border-r-2 border-red-900/40 rounded-tr-xl"></div>
          <div className="absolute bottom-0 left-0 w-6 sm:w-8 h-6 sm:h-8 border-b-2 border-l-2 border-red-900/40 rounded-bl-xl"></div>
          <div className="absolute bottom-0 right-0 w-6 sm:w-8 h-6 sm:h-8 border-b-2 border-r-2 border-red-900/40 rounded-br-xl"></div>

          <div className={`flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4 ${fontSize} custom-scrollbar`}>
            {dialogue.map((msg, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={idx} 
                className={`flex flex-col ${msg.role === 'player' ? 'items-end' : 'items-start'}`}
              >
                {msg.name && (
                  <span className="text-red-400 text-xs sm:text-sm mb-1 font-bold tracking-wider drop-shadow-md">{msg.name}</span>
                )}
                <div className={`max-w-[85%] sm:max-w-[80%] p-2 sm:p-3 rounded-lg text-sm sm:text-base backdrop-blur-sm ${
                  msg.role === 'player' 
                    ? 'bg-red-950/30 border border-red-900/40 text-red-100' 
                    : msg.role === 'system'
                      ? 'bg-transparent text-gray-300 italic text-center w-full drop-shadow-md'
                      : 'bg-black/20 border border-white/10 text-gray-100'
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="p-2 sm:p-4 border-t border-white/5 bg-black/20 flex gap-2 sm:gap-3">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="输入你的回应..." 
              className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-gray-100 focus:outline-none focus:border-red-500/50 transition-colors placeholder:text-gray-500 backdrop-blur-sm"
            />
            <button 
              onClick={handleSend}
              className="bg-red-900/60 hover:bg-red-800/80 text-red-50 px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg transition-all flex items-center gap-1 sm:gap-2 border border-red-700/40 shadow-[0_0_15px_rgba(153,27,27,0.3)] text-sm sm:text-base whitespace-nowrap backdrop-blur-sm"
            >
              发送 <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {activeModal && (
          <Modal onClose={() => setActiveModal(null)} title={getModalTitle(activeModal)} onBack={activeModal !== 'menu' && activeModal !== 'history' ? () => setActiveModal('menu') : undefined}>
            {activeModal === 'menu' && <MenuView onSelect={openSubModal} />}
            {activeModal === 'affinity' && <AffinityView />}
            {activeModal === 'inventory' && <InventoryView />}
            {activeModal === 'quests' && <QuestView />}
            {activeModal === 'map' && <MapView />}
            {activeModal === 'history' && <HistoryView history={dialogue} />}
            {activeModal === 'settings' && (
              <SettingsView 
                fontFamily={fontFamily} setFontFamily={setFontFamily}
                fontSize={fontSize} setFontSize={setFontSize}
              />
            )}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center w-12 sm:w-16 h-12 sm:h-14 rounded-lg hover:bg-white/10 transition-colors text-gray-300 hover:text-red-300 group relative"
    >
      <div className="mb-0.5 sm:mb-1 group-hover:scale-110 transition-transform drop-shadow-md">{icon}</div>
      <span className="text-[9px] sm:text-[10px] tracking-widest uppercase drop-shadow-md">{label}</span>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-red-500 transition-all group-hover:w-6 sm:group-hover:w-8 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
    </button>
  );
}

function getModalTitle(type: ModalType) {
  switch(type) {
    case 'menu': return '系统菜单';
    case 'affinity': return '羁绊档案';
    case 'inventory': return '行囊';
    case 'quests': return '任务日志';
    case 'map': return '世界地图';
    case 'history': return '历史回溯';
    case 'settings': return '系统设置';
    default: return '';
  }
}

function Modal({ children, onClose, title, onBack }: { children: React.ReactNode, onClose: () => void, title: string, onBack?: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="w-full max-w-4xl max-h-[95vh] sm:max-h-[85vh] h-full sm:h-auto bg-[#121013] border border-red-900/30 sm:rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden relative"
      >
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-white/5 bg-black/40 shrink-0">
          <div className="flex items-center gap-3">
            {onBack && (
              <button onClick={onBack} className="text-gray-500 hover:text-red-400 transition-colors p-1 sm:p-2 rounded-full hover:bg-white/10">
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 rotate-180" />
              </button>
            )}
            <h2 className="text-xl sm:text-2xl font-serif text-red-200 tracking-widest">{title}</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-1 sm:p-2 rounded-full hover:bg-white/10">
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

function MenuView({ onSelect }: { onSelect: (type: ModalType) => void }) {
  const menuItems = [
    { id: 'affinity', icon: <Users className="w-8 h-8 sm:w-10 sm:h-10" />, label: '羁绊档案', desc: '查看与各角色的关系' },
    { id: 'inventory', icon: <Backpack className="w-8 h-8 sm:w-10 sm:h-10" />, label: '行囊', desc: '管理你的物品与装备' },
    { id: 'quests', icon: <ScrollText className="w-8 h-8 sm:w-10 sm:h-10" />, label: '任务日志', desc: '追踪当前的目标' },
    { id: 'map', icon: <Map className="w-8 h-8 sm:w-10 sm:h-10" />, label: '世界地图', desc: '探索遗忘之城' },
    { id: 'settings', icon: <Settings className="w-8 h-8 sm:w-10 sm:h-10" />, label: '系统设置', desc: '调整游戏体验' },
  ] as const;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-3xl mx-auto">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          className="flex items-center gap-4 p-4 sm:p-6 bg-black/40 border border-white/5 rounded-xl hover:bg-red-950/20 hover:border-red-900/50 transition-all group text-left"
        >
          <div className="text-gray-500 group-hover:text-red-400 transition-colors">
            {item.icon}
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-serif text-gray-200 group-hover:text-red-200 transition-colors mb-1">{item.label}</h3>
            <p className="text-xs sm:text-sm text-gray-500">{item.desc}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

function AffinityView() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      {MOCK_NPCS.map(npc => (
        <div key={npc.id} className="bg-black/40 border border-white/5 rounded-lg p-4 sm:p-6 flex gap-4 sm:gap-6 hover:border-red-900/50 transition-colors group">
          <div className="w-20 h-28 sm:w-24 sm:h-32 shrink-0 bg-gradient-to-b from-gray-800 to-black rounded border border-white/10 flex items-center justify-center overflow-hidden relative">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity mix-blend-luminosity"></div>
          </div>
          <div className="flex-1 flex flex-col justify-center min-w-0">
            <div className="text-[10px] sm:text-xs text-red-400 tracking-widest mb-1">{npc.title}</div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-200 mb-1 sm:mb-2 truncate">{npc.name}</h3>
            <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4 line-clamp-2">{npc.desc}</p>
            <div className="w-full mt-auto">
              <div className="flex justify-between text-[10px] sm:text-xs mb-1 text-gray-500">
                <span>羁绊值</span>
                <span>{npc.affinity} / {npc.max}</span>
              </div>
              <div className="h-1.5 w-full bg-black rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-red-900 to-red-500 rounded-full"
                  style={{ width: `${(npc.affinity / npc.max) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function InventoryView() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-4">
      {MOCK_INVENTORY.map(item => (
        <div key={item.id} className="aspect-square bg-black/40 border border-white/5 rounded-lg p-2 sm:p-4 flex flex-col items-center justify-center text-center hover:bg-white/5 hover:border-red-900/30 transition-all cursor-pointer group relative">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full mb-2 sm:mb-3 flex items-center justify-center border ${
            item.rarity === 'rare' ? 'border-purple-500/50 bg-purple-900/20 text-purple-300' : 'border-gray-600/50 bg-gray-800/50 text-gray-400'
          }`}>
            <span className="text-xs">{item.type.charAt(0)}</span>
          </div>
          <h4 className="text-xs sm:text-sm font-medium text-gray-300 group-hover:text-white transition-colors line-clamp-1">{item.name}</h4>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 sm:w-48 bg-black/95 border border-white/10 rounded p-2 sm:p-3 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10 shadow-xl">
            <div className="text-[10px] sm:text-xs text-red-400 mb-1">{item.type}</div>
            <div className="text-xs sm:text-sm text-gray-300">{item.desc}</div>
          </div>
        </div>
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={`empty-${i}`} className="aspect-square bg-black/20 border border-white/5 rounded-lg border-dashed"></div>
      ))}
    </div>
  );
}

function QuestView() {
  return (
    <div className="space-y-3 sm:space-y-4">
      {MOCK_QUESTS.map(quest => (
        <div key={quest.id} className={`p-4 sm:p-5 rounded-lg border ${
          quest.status === 'active' ? 'bg-red-950/20 border-red-900/50' : 'bg-black/40 border-white/5'
        }`}>
          <div className="flex justify-between items-start mb-2 gap-2">
            <h3 className={`text-base sm:text-lg font-medium ${quest.status === 'active' ? 'text-red-200' : 'text-gray-300'}`}>
              {quest.title}
            </h3>
            <span className={`text-[10px] sm:text-xs px-2 py-1 rounded border whitespace-nowrap ${
              quest.status === 'active' ? 'border-red-500/30 text-red-400 bg-red-500/10' : 'border-gray-600/30 text-gray-500 bg-gray-800/50'
            }`}>
              {quest.status === 'active' ? '进行中' : '未开始'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-400">{quest.desc}</p>
        </div>
      ))}
    </div>
  );
}

function MapView() {
  return (
    <div className="w-full h-[50vh] sm:h-[60vh] bg-[#050505] rounded-lg border border-white/10 relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 opacity-20 mix-blend-luminosity" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'sepia(0.5) hue-rotate(320deg) saturate(1.5)'
      }}></div>
      
      <div className="absolute top-1/4 left-1/4 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)] z-10">
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 sm:mt-2 text-[10px] sm:text-xs text-red-200 whitespace-nowrap font-bold tracking-widest">遗忘之城</div>
      </div>
      
      <div className="absolute top-1/2 right-1/3 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gray-500 border border-gray-400 z-10">
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 sm:mt-2 text-[10px] sm:text-xs text-gray-400 whitespace-nowrap">幽暗密林</div>
      </div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <line x1="25%" y1="25%" x2="66%" y2="50%" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4" />
      </svg>
    </div>
  );
}

function HistoryView({ history }: { history: typeof MOCK_HISTORY }) {
  return (
    <div className="space-y-4 sm:space-y-6">
      {history.map((msg, idx) => (
        <div key={idx} className="border-b border-white/5 pb-3 sm:pb-4 last:border-0">
          <div className="flex items-baseline gap-2 sm:gap-3 mb-1">
            <span className={`text-xs sm:text-sm font-bold ${
              msg.role === 'player' ? 'text-blue-400' : 
              msg.role === 'system' ? 'text-gray-500' : 'text-red-400'
            }`}>
              {msg.role === 'player' ? '你' : msg.role === 'system' ? '系统' : msg.name}
            </span>
          </div>
          <div className="text-gray-300 text-xs sm:text-sm leading-relaxed">
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  );
}

function SettingsView({ 
  fontFamily, setFontFamily, 
  fontSize, setFontSize 
}: { 
  fontFamily: string, setFontFamily: (v: string) => void,
  fontSize: string, setFontSize: (v: string) => void
}) {
  return (
    <div className="space-y-6 sm:space-y-8 max-w-md mx-auto">
      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-base sm:text-lg text-gray-200 border-b border-white/10 pb-2">字体设置</h3>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <button 
            onClick={() => setFontFamily('font-sans')}
            className={`p-2 sm:p-3 rounded border text-center transition-colors ${fontFamily === 'font-sans' ? 'bg-red-900/30 border-red-500/50 text-red-200' : 'bg-black/40 border-white/10 text-gray-400 hover:bg-white/5'}`}
          >
            <span className="font-sans text-sm sm:text-base">无衬线体 (现代)</span>
          </button>
          <button 
            onClick={() => setFontFamily('font-serif')}
            className={`p-2 sm:p-3 rounded border text-center transition-colors ${fontFamily === 'font-serif' ? 'bg-red-900/30 border-red-500/50 text-red-200' : 'bg-black/40 border-white/10 text-gray-400 hover:bg-white/5'}`}
          >
            <span className="font-serif text-sm sm:text-base">衬线体 (古典)</span>
          </button>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-base sm:text-lg text-gray-200 border-b border-white/10 pb-2">字号设置</h3>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <button 
            onClick={() => setFontSize('text-sm')}
            className={`p-2 sm:p-3 rounded border text-center transition-colors ${fontSize === 'text-sm' ? 'bg-red-900/30 border-red-500/50 text-red-200' : 'bg-black/40 border-white/10 text-gray-400 hover:bg-white/5'}`}
          >
            <span className="text-xs sm:text-sm">小号</span>
          </button>
          <button 
            onClick={() => setFontSize('text-base')}
            className={`p-2 sm:p-3 rounded border text-center transition-colors ${fontSize === 'text-base' ? 'bg-red-900/30 border-red-500/50 text-red-200' : 'bg-black/40 border-white/10 text-gray-400 hover:bg-white/5'}`}
          >
            <span className="text-sm sm:text-base">中号</span>
          </button>
          <button 
            onClick={() => setFontSize('text-lg')}
            className={`p-2 sm:p-3 rounded border text-center transition-colors ${fontSize === 'text-lg' ? 'bg-red-900/30 border-red-500/50 text-red-200' : 'bg-black/40 border-white/10 text-gray-400 hover:bg-white/5'}`}
          >
            <span className="text-base sm:text-lg">大号</span>
          </button>
        </div>
      </div>
    </div>
  );
}
