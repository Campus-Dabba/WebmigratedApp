"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { CartProvider } from "@/components/providers/cart-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { createClient } from "@/utils/supabase/client";

const inter = Inter({ subsets: ["latin"] });
const supabase = createClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="CampusDabba" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#f97316" />
        <style dangerouslySetInnerHTML={{
          __html: `
            * {
              box-sizing: border-box;
              -webkit-tap-highlight-color: transparent;
            }
            
            html, body {
              overflow-x: hidden;
              width: 100%;
              margin: 0;
              padding: 0;
              height: 100%;
              overscroll-behavior: none;
              -webkit-user-select: none;
              user-select: none;
            }
            
            body {
              -webkit-text-size-adjust: 100%;
              -webkit-overflow-scrolling: touch;
              background: #fafafa;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            
            /* Status bar padding */
            .status-bar-safe {
              padding-top: env(safe-area-inset-top);
              padding-top: max(env(safe-area-inset-top), 20px);
            }
            
            /* Home indicator padding */
            .home-indicator-safe {
              padding-bottom: env(safe-area-inset-bottom);
              padding-bottom: max(env(safe-area-inset-bottom), 20px);
            }
          `
        }} />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CartProvider>
            <div className="relative flex min-h-screen flex-col bg-background">
              
              {/* App Content with safe areas */}
              <main className="flex-1 w-full overflow-x-hidden pt-2 pb-20 status-bar-safe">
                {children}
              </main>
              
              {/* Mobile Bottom Navigation - Always visible */}
              <MobileBottomNav />
            </div>
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
