import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.arnav.campusdabba',
  appName: 'CampusDabba',
  webDir: 'out',
  server: {
    url: 'https://webconvertedapp.netlify.app',
    cleartext: false,
    allowNavigation: ['http://localhost:3000', 'https://*.supabase.co', 'https://*.supabase.io']
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: "#ff6b35",
      showSpinner: true,
      spinnerColor: "#ffffff",
      splashFullScreen: false,
      splashImmersive: false
    },
    StatusBar: {
      style: 'default',
      backgroundColor: '#ff6b35',
      overlaysWebView: false
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    }
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true,
    backgroundColor: "#ff6b35",
    overrideUserAgent: "CampusDabba-Mobile-App",
    appendUserAgent: "CampusDabba-Mobile"
  },
  ios: {
    contentInset: 'automatic',
    backgroundColor: "#ff6b35"
  }
};

export default config;
