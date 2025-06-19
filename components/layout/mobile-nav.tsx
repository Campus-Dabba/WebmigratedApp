"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ShoppingCart, LogIn, LogOut, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useCart } from "@/components/providers/cart-provider"
import { createClient } from "@/utils/supabase/client"
import { Session } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

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
    title: "Search",
    href: "/chatbot",
  },
  {
    title: "Become a Cook",
    href: "/cook/register",
  },
]

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const { cart, getCartTotal } = useCart()
  const cartItemCount = cart.reduce((total: number, item: any) => total + item.quantity, 0)
  const cartTotal = getCartTotal()
  const [session, setSession] = useState<Session | null>(null)
  const supabase = createClient()
  const router = useRouter()
  const { toast } = useToast()

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

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast({
        title: "Error logging out",
        description: error.message,
        variant: "destructive",
      })
      return
    }
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    })
    setSession(null)
    setOpen(false)
    router.push("/auth/login")
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0 w-[300px] sm:w-[350px]">
        <SheetHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src="/campus-dabba-logo.png"
                alt="CampusDabba"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <SheetTitle className="text-left text-xl font-bold">CampusDabba</SheetTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          {/* Navigation Links */}
          <nav className="flex flex-col gap-3 py-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center text-lg font-medium transition-colors hover:text-primary py-2 px-3 rounded-md",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Cart Section */}
          <div className="border-t pt-4 mb-6">
            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between bg-muted p-4 rounded-lg hover:bg-muted/80 transition-colors"
            >
              <div className="flex items-center gap-3">
                <ShoppingCart className="h-5 w-5" />
                <span className="font-medium">My Cart</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold">{cartItemCount} items</span>
                <span className="text-sm text-muted-foreground">₹{cartTotal}</span>
              </div>
            </Link>
          </div>

          {/* User Authentication */}
          <div className="mt-auto border-t pt-4">
            {session ? (
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground">
                  Logged in as: {session.user.email}
                </div>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="default"
                asChild
                className="w-full flex items-center gap-2"
              >
                <Link href="/auth/login" onClick={() => setOpen(false)}>
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

