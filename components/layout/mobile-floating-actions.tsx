"use client"

import * as React from "react"
import Link from "next/link"
import { Plus, MessageCircle, ChefHat, Phone, Search, Zap } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function MobileFloatingActions() {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    {
      icon: Search,
      label: "Quick Search",
      href: "/browse",
      color: "bg-blue-500 hover:bg-blue-600",
      emoji: "🔍"
    },
    {
      icon: ChefHat,
      label: "Become Cook",
      href: "/cook/register",
      color: "bg-orange-500 hover:bg-orange-600",
      emoji: "👨‍🍳"
    },
    {
      icon: MessageCircle,
      label: "Chat AI",
      href: "/chatbot",
      color: "bg-purple-500 hover:bg-purple-600",
      emoji: "🤖"
    }
  ]

  return (
    <div className="md:hidden fixed bottom-20 right-4 z-40">
      {/* Action buttons with stagger animation */}
      <div className={cn(
        "flex flex-col gap-3 mb-4 transition-all duration-500",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
      )}>
        {actions.map((action, index) => (
          <Link
            key={action.href}
            href={action.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-full text-white shadow-xl transition-all duration-300",
              action.color,
              "transform hover:scale-110 active:scale-95 backdrop-blur-sm"
            )}
            style={{
              transitionDelay: isOpen ? `${index * 100}ms` : '0ms',
              animationDelay: isOpen ? `${index * 100}ms` : '0ms'
            }}
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{action.emoji}</span>
              <span className="text-sm font-semibold whitespace-nowrap">{action.label}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Main FAB with enhanced design */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 text-white shadow-2xl",
          "flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95",
          "ring-4 ring-orange-200 ring-opacity-30 hover:ring-opacity-50",
          "relative overflow-hidden"
        )}
      >
        {/* Background animation */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full",
          "transition-all duration-500",
          isOpen ? "scale-150 opacity-0" : "scale-100 opacity-100"
        )} />
        
        {/* Icon with rotation */}
        <Plus 
          className={cn(
            "h-7 w-7 transition-all duration-500 relative z-10",
            isOpen ? "rotate-45 scale-110" : "rotate-0 scale-100"
          )} 
        />
        
        {/* Pulse effect */}
        <div className={cn(
          "absolute inset-0 rounded-full bg-orange-400 opacity-30",
          "animate-ping",
          !isOpen && "animation-delay-1000"
        )} />
      </button>
    </div>
  )
}
