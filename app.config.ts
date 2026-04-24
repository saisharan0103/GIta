import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  android: {
    adaptiveIcon: {
      backgroundColor: '#F7F0E2',
      foregroundImage: './assets/images/generated/krishna-app-icon.png',
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
  },
  extra: {
    geminiApiKey: process.env.GEMINI_API_KEY ?? '',
  },
  icon: './assets/images/generated/krishna-app-icon.png',
  ios: {
    supportsTablet: true,
  },
  name: 'Gita',
  newArchEnabled: true,
  orientation: 'portrait',
  slug: 'gita',
  splash: {
    backgroundColor: '#F7F0E2',
    image: './assets/images/generated/krishna-app-icon.png',
    resizeMode: 'contain',
  },
  userInterfaceStyle: 'light',
  version: '1.0.0',
  web: {
    favicon: './assets/images/generated/krishna-app-icon.png',
  },
};

export default config;
