"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import Image from "next/image";
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
  const [isCook, setIsCook] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const checkCookStatus = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setSession(session);
        if (session?.user) {
          const { data: cook } = await supabase
            .from("cooks")
            .select("*")
            .eq("id", session.user.id)
            .single();
          setIsCook(!!cook);
        }
      } catch (error) {
        console.error("Error checking cook status:", error);
      } finally {
      }
    };

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        checkCookStatus();
      } 
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session?.user) {
        await checkCookStatus();
      } else {
        setIsCook(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);



  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <style dangerouslySetInnerHTML={{
          __html: `
            * {
              box-sizing: border-box;
            }
            
            html, body {
              overflow-x: hidden;
              width: 100%;
              margin: 0;
              padding: 0;
            }
            
            body {
              -webkit-text-size-adjust: 100%;
              -webkit-overflow-scrolling: touch;
            }
            
            .container {
              max-width: 100vw;
              padding-left: 1rem;
              padding-right: 1rem;
            }
            
            @media (max-width: 768px) {
              .container {
                padding-left: 0.75rem;
                padding-right: 0.75rem;
              }
            }
          `
        }} />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CartProvider>
            <div className="relative flex min-h-screen flex-col overflow-x-hidden">
              {/* Top Header - Ultra minimal for mobile app feel */}
              <header className="sticky top-0 z-50 w-full bg-white/98 backdrop-blur-xl supports-[backdrop-filter]:bg-white/98 border-b border-gray-100/50 mobile-header-safe">
                <div className="flex h-14 items-center justify-center px-4 relative">
                  {/* Centered Logo */}
                  <div className="flex items-center space-x-2 absolute left-1/2 transform -translate-x-1/2">
                    <Image
                      src="/campus-dabba-logo.png"
                      alt="CampusDabba"
                      width={28}
                      height={28}
                      className="rounded-lg"
                    />
                    <span className="text-lg font-bold text-gray-900 tracking-tight">CampusDabba</span>
                  </div>
                  
                  {/* Status indicator (optional) */}
                  <div className="absolute right-4 hidden md:block">
                    {session ? <UserNav /> : null}
                  </div>
                </div>
              </header>
              
              {/* Main content with bottom padding for nav */}
              <main className="flex-1 w-full overflow-x-hidden pb-20 md:pb-0">{children}</main>
              
              {/* Mobile Bottom Navigation */}
              <MobileBottomNav />
            </div>
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
