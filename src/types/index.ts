export type Verse = {
  id: string;
  chapter: number;
  verse: number;
  sanskrit: string;
  meaning: string;
  theme: string;
  mood_tags: string[];
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export type RootStackParamList = {
  MainTabs: undefined;
  KrishnaChat: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Reels: undefined;
};
