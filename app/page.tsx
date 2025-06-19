"use client";
import { useState } from "react";
import { CooksList } from "@/components/student/dashboard/cooks-list";
import { StatesFilter } from "@/components/student/dashboard/states-filter";
import { states } from "@/lib/data/states";
import { StateCards } from "@/components/student/dashboard/StateCards";
import { MapPreview } from "@/components/map/map-preview";
import { RoleBasedRedirect } from "@/components/auth/role-based-redirect";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";

export default function DashboardPage() {
  const [selectedState, setSelectedState] = useState<string>(states[0]);

  return (
    <RoleBasedRedirect>
      <div className="w-full overflow-x-hidden min-h-screen bg-background">
        {/* Hero Section - Mobile App Style */}
        <div className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 mx-4 mt-4 rounded-3xl overflow-hidden mobile-card-enhanced">
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute top-4 right-4">
            <ThemeToggle />
          </div>
          <div className="relative px-6 py-8 text-center text-white">
            <h1 className="text-2xl font-bold mb-2 tracking-tight">
              CampusDabba �
            </h1>
            <p className="text-orange-100 mb-4 text-sm leading-relaxed">
              Taste the love of home-cooked meals, made with mother's care
            </p>
            <div className="flex items-center justify-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></span>
                <span>Mother's Love</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                <span>Homemade Goodness</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 space-y-6 mt-6">
          {/* States Quick Access */}
          <div className="bg-card border border-border rounded-3xl p-6 shadow-lg dark:shadow-2xl transition-all duration-200">
            <h2 className="text-lg font-bold mb-4 text-foreground">📍 Select Your Location</h2>
            <StateCards
              states={states}
              selectedState={selectedState}
              onStateSelect={setSelectedState}
            />
          </div>

          {/* States Filter */}
          <div className="bg-card border border-border rounded-3xl p-6 shadow-lg dark:shadow-2xl transition-all duration-200">
            <StatesFilter
              selectedState={selectedState}
              onStateChange={setSelectedState}
            />
          </div>

          {/* Cooks Section */}
          <div className="bg-card border border-border rounded-3xl p-6 shadow-lg dark:shadow-2xl transition-all duration-200">
            <h2 className="text-lg font-bold mb-4 text-foreground flex items-center gap-2">
              🏠 Available Home Cooks
              <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-full">Live</span>
            </h2>
            <CooksList selectedState={selectedState} />
          </div>
          
          {/* Map Section */}
          <div className="bg-card border border-border rounded-3xl p-6 shadow-lg dark:shadow-2xl transition-all duration-200">
            <h2 className="text-lg font-bold mb-4 text-foreground flex items-center gap-2">
              🗺️ Nearby Home Kitchens
            </h2>
            <MapPreview />
          </div>
        </div>

        {/* Mobile-optimized footer */}
        <div className="mt-8 mx-4 mb-6">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black text-white rounded-3xl p-6 shadow-lg dark:shadow-2xl transition-all duration-200">
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-white mb-2">Need Help? 🤝</h3>
              <p className="text-gray-300 text-sm">We're here to help you 24/7</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <a 
                href="mailto:campusdabba@gmail.com" 
                className="flex flex-col items-center p-4 bg-white/10 dark:bg-white/5 rounded-2xl backdrop-blur-sm transition-all duration-200 active:scale-95"
              >
                <span className="text-2xl mb-2">📧</span>
                <span className="text-sm font-medium">Email Us</span>
              </a>
              <a 
                href="tel:+919022392820" 
                className="flex flex-col items-center p-4 bg-white/10 dark:bg-white/5 rounded-2xl backdrop-blur-sm transition-all duration-200 active:scale-95"
              >
                <span className="text-2xl mb-2">📞</span>
                <span className="text-sm font-medium">Call Us</span>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <Link 
                href="/faq" 
                className="flex flex-col items-center p-3 bg-white/5 dark:bg-white/5 rounded-2xl transition-all duration-200 active:scale-95"
              >
                <span className="text-lg mb-1">❓</span>
                <span className="text-xs">FAQ</span>
              </Link>
              <Link 
                href="/support" 
                className="flex flex-col items-center p-3 bg-white/5 dark:bg-white/5 rounded-2xl transition-all duration-200 active:scale-95"
              >
                <span className="text-lg mb-1">🛠️</span>
                <span className="text-xs">Support</span>
              </Link>
              <Link 
                href="/about" 
                className="flex flex-col items-center p-3 bg-white/5 dark:bg-white/5 rounded-2xl transition-all duration-200 active:scale-95"
              >
                <span className="text-lg mb-1">ℹ️</span>
                <span className="text-xs">About</span>
              </Link>
              <Link 
                href="/careers" 
                className="flex flex-col items-center p-3 bg-white/5 dark:bg-white/5 rounded-2xl transition-all duration-200 active:scale-95"
              >
                <span className="text-lg mb-1">💼</span>
                <span className="text-xs">Careers</span>
              </Link>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-400 dark:text-gray-500">
                © {new Date().getFullYear()} CampusDabba • Made with ❤️ for students
              </p>
            </div>
          </div>
        </div>
      </div>
    </RoleBasedRedirect>
  );
}
