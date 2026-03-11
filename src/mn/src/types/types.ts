export type PageState = 'start' | 'splash' | 'setup' | 'game';

export interface GameConfig {
  playerName: string;
  difficulty: 'story' | 'normal' | 'hardcore';
  background: 'noble' | 'mercenary' | 'scholar';
}
