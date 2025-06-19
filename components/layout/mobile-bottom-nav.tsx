"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  Home, 
  Search, 
  ShoppingCart, 
  User, 
  ChefHat,
  Plus,
  MessageCircle,
  Menu,
  LogOut,
  Settings,
  Heart,
  MapPin,
  Bell,
  Clock,
  Star,
  CreditCard,
  HelpCircle,
  Phone
} from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useCart } from "@/components/providers/cart-provider"
import { createClient } from "@/utils/supabase/client"
import { Session } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function MobileBottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { cart } = useCart()
  const cartItemCount = cart.reduce((total: number, item: any) => total + item.quantity, 0)
  const [session, setSession] = useState<Session | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setIsMenuOpen(false)
    router.push("/")
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        {/* Glassmorphism background */}
        <div className="bg-white/90 backdrop-blur-xl border-t border-gray-200/50 shadow-2xl">
          <div className="flex items-center justify-around px-2 py-1 safe-area-padding-bottom">
            {/* Home */}
            <Link
              href="/"
              className={cn(
                "flex flex-col items-center justify-center py-2 px-4 rounded-2xl transition-all duration-300 min-w-0 flex-1",
                isActive("/")
                  ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg transform scale-105" 
                  : "text-gray-500 hover:text-orange-500 active:scale-95"
              )}
            >
              <Home className={cn("h-6 w-6 mb-1", isActive("/") ? "drop-shadow-sm" : "")} />
              <span className="text-xs font-semibold truncate">Home</span>
            </Link>

            {/* Browse/Search */}
            <Link
              href="/browse"
              className={cn(
                "flex flex-col items-center justify-center py-2 px-4 rounded-2xl transition-all duration-300 min-w-0 flex-1",
                isActive("/browse") || isActive("/search")
                  ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg transform scale-105" 
                  : "text-gray-500 hover:text-blue-500 active:scale-95"
              )}
            >
              <Search className={cn("h-6 w-6 mb-1", (isActive("/browse") || isActive("/search")) ? "drop-shadow-sm" : "")} />
              <span className="text-xs font-semibold truncate">Browse</span>
            </Link>

            {/* Cart with animated badge */}
            <Link
              href="/cart"
              className={cn(
                "flex flex-col items-center justify-center py-2 px-4 rounded-2xl transition-all duration-300 min-w-0 flex-1 relative",
                isActive("/cart")
                  ? "bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg transform scale-105" 
                  : "text-gray-500 hover:text-green-500 active:scale-95"
              )}
            >
              <div className="relative">
                <ShoppingCart className={cn("h-6 w-6 mb-1", isActive("/cart") ? "drop-shadow-sm" : "")} />
                {cartItemCount > 0 && (
                  <Badge 
                    className="absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse border-2 border-white"
                  >
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </Badge>
                )}
              </div>
              <span className="text-xs font-semibold truncate">Cart</span>
            </Link>

            {/* Menu/Profile */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className={cn(
                    "flex flex-col items-center justify-center py-2 px-4 rounded-2xl transition-all duration-300 min-w-0 flex-1",
                    isMenuOpen
                      ? "bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg transform scale-105" 
                      : "text-gray-500 hover:text-purple-500 active:scale-95"
                  )}
                >
                  <Menu className={cn("h-6 w-6 mb-1", isMenuOpen ? "drop-shadow-sm" : "")} />
                  <span className="text-xs font-semibold truncate">Menu</span>
                </button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <SheetHeader className="pb-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16 border-4 border-orange-100">
                        <AvatarImage src={session?.user?.user_metadata?.avatar_url} />
                        <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white text-xl font-bold">
                          {session?.user?.email?.charAt(0).toUpperCase() || 'G'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        {session ? (
                          <>
                            <h3 className="text-xl font-bold text-gray-900">
                              {session.user.user_metadata?.full_name || 'Welcome!'}
                            </h3>
                            <p className="text-sm text-gray-500 truncate">{session.user.email}</p>
                          </>
                        ) : (
                          <>
                            <h3 className="text-xl font-bold text-gray-900">Welcome!</h3>
                            <p className="text-sm text-gray-500">Sign in to get started</p>
                          </>
                        )}
                      </div>
                    </div>
                  </SheetHeader>

                  {/* Menu Content */}
                  <div className="flex-1 overflow-y-auto">
                    <div className="space-y-1">
                      {session ? (
                        <>
                          {/* User Actions */}
                          <div className="space-y-1">
                            <MenuButton 
                              icon={User} 
                              label="My Profile" 
                              href="/profile" 
                              color="text-purple-500"
                              onClose={() => setIsMenuOpen(false)}
                            />
                            <MenuButton 
                              icon={Clock} 
                              label="My Orders" 
                              href="/orders" 
                              color="text-blue-500"
                              onClose={() => setIsMenuOpen(false)}
                            />
                            <MenuButton 
                              icon={Heart} 
                              label="Favorites" 
                              href="/favorites" 
                              color="text-red-500"
                              onClose={() => setIsMenuOpen(false)}
                            />
                          </div>

                          <Separator className="my-4" />

                          {/* Cook Actions */}
                          <div className="space-y-1">
                            <div className="px-4 py-2">
                              <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Cook Portal</h4>
                            </div>
                            <MenuButton 
                              icon={ChefHat} 
                              label="Become a Cook" 
                              href="/cook/register" 
                              color="text-orange-500"
                              onClose={() => setIsMenuOpen(false)}
                            />
                            <MenuButton 
                              icon={Settings} 
                              label="Cook Dashboard" 
                              href="/cook/dashboard" 
                              color="text-green-500"
                              onClose={() => setIsMenuOpen(false)}
                            />
                          </div>

                          <Separator className="my-4" />

                          {/* Support */}
                          <div className="space-y-1">
                            <div className="px-4 py-2">
                              <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Support</h4>
                            </div>
                            <MenuButton 
                              icon={MessageCircle} 
                              label="Chat Support" 
                              href="/chatbot" 
                              color="text-blue-500"
                              onClose={() => setIsMenuOpen(false)}
                            />
                            <MenuButton 
                              icon={Phone} 
                              label="Call Us" 
                              href="tel:+919022392820" 
                              color="text-green-500"
                              onClose={() => setIsMenuOpen(false)}
                              isExternal
                            />
                            <MenuButton 
                              icon={HelpCircle} 
                              label="Help & FAQ" 
                              href="/help" 
                              color="text-indigo-500"
                              onClose={() => setIsMenuOpen(false)}
                            />
                          </div>

                          <Separator className="my-4" />

                          {/* Settings & Logout */}
                          <div className="space-y-1">
                            <MenuButton 
                              icon={Settings} 
                              label="Settings" 
                              href="/settings" 
                              color="text-gray-500"
                              onClose={() => setIsMenuOpen(false)}
                            />
                            <button
                              onClick={handleSignOut}
                              className="w-full flex items-center gap-4 px-4 py-3 text-left hover:bg-red-50 rounded-xl transition-colors text-red-600"
                            >
                              <LogOut className="h-5 w-5" />
                              <span className="font-medium">Sign Out</span>
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Guest Actions */}
                          <div className="space-y-1">
                            <MenuButton 
                              icon={User} 
                              label="Sign In" 
                              href="/auth/login" 
                              color="text-blue-500"
                              onClose={() => setIsMenuOpen(false)}
                            />
                            <MenuButton 
                              icon={Plus} 
                              label="Create Account" 
                              href="/auth/register" 
                              color="text-green-500"
                              onClose={() => setIsMenuOpen(false)}
                            />
                          </div>

                          <Separator className="my-4" />

                          {/* Cook Actions */}
                          <div className="space-y-1">
                            <div className="px-4 py-2">
                              <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Cook Portal</h4>
                            </div>
                            <MenuButton 
                              icon={ChefHat} 
                              label="Become a Cook" 
                              href="/cook/register" 
                              color="text-orange-500"
                              onClose={() => setIsMenuOpen(false)}
                            />
                          </div>

                          <Separator className="my-4" />

                          {/* Support */}
                          <div className="space-y-1">
                            <div className="px-4 py-2">
                              <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Support</h4>
                            </div>
                            <MenuButton 
                              icon={MessageCircle} 
                              label="Chat Support" 
                              href="/chatbot" 
                              color="text-blue-500"
                              onClose={() => setIsMenuOpen(false)}
                            />
                            <MenuButton 
                              icon={Phone} 
                              label="Call Us" 
                              href="tel:+919022392820" 
                              color="text-green-500"
                              onClose={() => setIsMenuOpen(false)}
                              isExternal
                            />
                            <MenuButton 
                              icon={HelpCircle} 
                              label="Help & FAQ" 
                              href="/help" 
                              color="text-indigo-500"
                              onClose={() => setIsMenuOpen(false)}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-center text-xs text-gray-400">
                      CampusDabba v1.0 • Made with ❤️ for students
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </>
  )
}

// Helper component for menu buttons
interface MenuButtonProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  href: string
  color: string
  onClose: () => void
  isExternal?: boolean
}

function MenuButton({ icon: Icon, label, href, color, onClose, isExternal }: MenuButtonProps) {
  if (isExternal) {
    return (
      <a
        href={href}
        className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors"
        onClick={onClose}
      >
        <Icon className={cn("h-5 w-5", color)} />
        <span className="font-medium text-gray-900">{label}</span>
      </a>
    )
  }

  return (
    <Link
      href={href}
      className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors"
      onClick={onClose}
    >
      <Icon className={cn("h-5 w-5", color)} />
      <span className="font-medium text-gray-900">{label}</span>
    </Link>
  )
}
