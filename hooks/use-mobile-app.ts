import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Network } from '@capacitor/network';

export const useMobileApp = () => {
  useEffect(() => {
    const initMobileApp = async () => {
      if (!Capacitor.isNativePlatform()) return;

      try {
        // Hide splash screen after app is ready
        await SplashScreen.hide();

        // Configure status bar
        await StatusBar.setStyle({ style: Style.Default });
        await StatusBar.setBackgroundColor({ color: '#ffffff' });

        // Handle app state changes
        App.addListener('appStateChange', ({ isActive }) => {
          console.log('App state changed. Is active?', isActive);
        });

        // Handle back button on Android
        App.addListener('backButton', ({ canGoBack }) => {
          if (!canGoBack) {
            App.exitApp();
          } else {
            window.history.back();
          }
        });

        // Monitor network status
        Network.addListener('networkStatusChange', status => {
          console.log('Network status changed', status);
          // You can update your app's UI based on connectivity
        });

        console.log('Mobile app initialized successfully');
      } catch (error) {
        console.error('Error initializing mobile app:', error);
      }
    };

    initMobileApp();

    // Cleanup listeners on unmount
    return () => {
      if (Capacitor.isNativePlatform()) {
        App.removeAllListeners();
        Network.removeAllListeners();
      }
    };
  }, []);

  return {
    isNativeApp: Capacitor.isNativePlatform(),
    platform: Capacitor.getPlatform()
  };
};
