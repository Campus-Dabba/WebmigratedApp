import { createBrowserClient } from '@supabase/ssr'
import { Capacitor } from '@capacitor/core'
import { Preferences } from '@capacitor/preferences'

// Mobile storage utilities
const mobileStorage = {
  async setItem(key: string, value: string) {
    if (Capacitor.isNativePlatform()) {
      await Preferences.set({ key, value });
    } else {
      localStorage.setItem(key, value);
    }
  },
  
  async getItem(key: string): Promise<string | null> {
    if (Capacitor.isNativePlatform()) {
      const result = await Preferences.get({ key });
      return result.value;
    } else {
      return localStorage.getItem(key);
    }
  },
  
  async removeItem(key: string) {
    if (Capacitor.isNativePlatform()) {
      await Preferences.remove({ key });
    } else {
      localStorage.removeItem(key);
    }
  }
};

export function createMobileClient() {
  const client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        storage: Capacitor.isNativePlatform() ? {
          getItem: async (key: string) => {
            return await mobileStorage.getItem(key);
          },
          setItem: async (key: string, value: string) => {
            await mobileStorage.setItem(key, value);
          },
          removeItem: async (key: string) => {
            await mobileStorage.removeItem(key);
          }
        } : undefined,
        detectSessionInUrl: true,
        flowType: 'pkce'
      }
    }
  )

  return client;
}

// Use this client instead of the regular one in mobile context
export const getMobileSupabaseClient = () => {
  if (Capacitor.isNativePlatform()) {
    return createMobileClient();
  }
  // Fallback to regular client for web
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};
