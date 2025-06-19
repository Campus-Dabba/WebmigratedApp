import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { Device } from '@capacitor/device';
import { Network } from '@capacitor/network';
import { Preferences } from '@capacitor/preferences';

// Utility to check if running in native mobile app
export const isNativeApp = () => Capacitor.isNativePlatform();

// Utility to get platform info
export const getPlatformInfo = async () => {
  if (!isNativeApp()) return { platform: 'web' };
  
  const info = await Device.getInfo();
  return {
    platform: info.platform,
    model: info.model,
    osVersion: info.osVersion,
    manufacturer: info.manufacturer
  };
};

// Handle external links in mobile app
export const openExternalLink = async (url: string) => {
  if (isNativeApp()) {
    await Browser.open({ url });
  } else {
    window.open(url, '_blank');
  }
};

// Handle app state changes
export const setupAppStateHandlers = () => {
  if (!isNativeApp()) return;

  App.addListener('appStateChange', ({ isActive }) => {
    console.log('App state changed. Is active?', isActive);
    // You can add logic here for when app becomes active/inactive
  });

  App.addListener('backButton', ({ canGoBack }) => {
    if (!canGoBack) {
      App.exitApp();
    } else {
      window.history.back();
    }
  });
};

// Network status utility
export const getNetworkStatus = async () => {
  if (!isNativeApp()) {
    return { connected: navigator.onLine, connectionType: 'unknown' };
  }
  
  const status = await Network.getStatus();
  return status;
};

// Storage utilities for mobile
export const mobileStorage = {
  async setItem(key: string, value: string) {
    if (isNativeApp()) {
      await Preferences.set({ key, value });
    } else {
      localStorage.setItem(key, value);
    }
  },
  
  async getItem(key: string): Promise<string | null> {
    if (isNativeApp()) {
      const result = await Preferences.get({ key });
      return result.value;
    } else {
      return localStorage.getItem(key);
    }
  },
  
  async removeItem(key: string) {
    if (isNativeApp()) {
      await Preferences.remove({ key });
    } else {
      localStorage.removeItem(key);
    }
  }
};

// Handle OAuth redirects in mobile app
export const handleOAuthRedirect = (url: string) => {
  if (isNativeApp()) {
    // In mobile app, we need to handle OAuth differently
    // This would typically involve using deep links
    console.log('OAuth redirect in mobile app:', url);
    // You might need to parse the URL and extract tokens
    return url;
  }
  return url;
};

export default {
  isNativeApp,
  getPlatformInfo,
  openExternalLink,
  setupAppStateHandlers,
  getNetworkStatus,
  mobileStorage,
  handleOAuthRedirect
};
