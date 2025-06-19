"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, LogIn, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/providers/cart-provider";
import { useToast } from "@/components/ui/use-toast";
import InputSearch from "@/components/ui/search-bar";
import { UserNav } from "@/components/layout/User-nav";
import { createClient } from "@/utils/supabase/client";
import { Session } from "@supabase/supabase-js";
import Image from "next/image";

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Browse Cooks",
    href: "/browse",
  },
  {
    title: "My Orders",
    href: "/orders",
  },
  {
    title: "Become a Cook",
    href: "/cook/register",
  },
];

export function MainNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const { cart, getCartTotal } = useCart();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = getCartTotal();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add state for login status
  const [session, setSession] = useState<Session | null>(null);
  const supabase = createClient();
  // This is a mock function. In a real app, you'd check the authentication state.
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    router.push("/login");
  };

  return (
    <div className="mr-2 flex items-center justify-between w-full">
      <div className="flex items-center">
        <Link href="/" className="mr-4 md:mr-6 flex items-center space-x-2">
          <Image
            src="/campus-dabba-logo.png"
            alt="CampusDabba Logo"
            width={40}
            height={40}
            className="h-8 w-8 md:h-10 md:w-10 rounded-lg"
          />
          <span className="hidden sm:inline-block text-lg md:text-xl font-bold text-gray-900">
            CampusDabba
          </span>
        </Link>
        <nav className="hidden lg:flex items-center space-x-4 md:space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === item.href
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      
      {/* Search Bar - Hidden on small screens */}
      <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-4">
        {![
          "/search",
          "/auth/login",
          "/auth/register",
          "/auth/registration",
          "/cook/register",
          "/cook/login",
          "/cook/registration",
        ].includes(pathname) && (
          <Link href="/chatbot">
            <InputSearch />
          </Link>
        )}
      </div>
      
      <div className="flex items-center space-x-2 md:space-x-4">
        <Button variant="outline" size="sm" asChild className="relative">
          <Link href="/cart" className="flex items-center gap-1 md:gap-2">
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline text-sm">
              {cartItemCount}
            </span>
            <span className="sm:hidden bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center absolute -top-2 -right-2">
              {cartItemCount}
            </span>
            <span className="hidden md:inline text-sm">₹{cartTotal}</span>
          </Link>
        </Button>
        {session ? (
          <UserNav
            onLogout={async () => {
              const { error } = await supabase.auth.signOut();
              if (error) {
                toast({
                  title: "Error logging out",
                  description: error.message,
                  variant: "destructive",
                });
                return;
              }
              toast({
                title: "Logged out successfully",
                description: "You have been logged out of your account.",
              });
              setSession(null);
              router.push("/auth/login");
            }}
          />
        ) : (
          <Button variant="ghost" size="sm" asChild>
            <Link href="/auth/login" className="flex items-center gap-1">
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Login</span>
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
