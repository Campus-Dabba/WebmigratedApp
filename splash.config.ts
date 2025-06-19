import { CapacitorConfig } from '@capacitor/cli';

export const splashConfig = {
  platforms: ['android', 'ios'],
  icon: 'assets/icon.png',
  splashscreen: 'assets/splash.png',
  android: {
    backgroundColor: '#ff6b35',
    resize: 'contain'
  },
  ios: {
    backgroundColor: '#ff6b35',
    resize: 'contain'
  }
};
