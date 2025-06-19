"use client"

import { useEffect, useState } from "react"
import { Wifi, Battery, Signal } from "lucide-react"

export function MobileStatusBar() {
  const [currentTime, setCurrentTime] = useState<string>("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: false 
      }))
    }
    
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-6 bg-orange-500 text-white text-xs flex items-center justify-between px-4 status-bar-safe">
      {/* Left side - Time */}
      <div className="font-semibold">
        {currentTime}
      </div>
      
      {/* Right side - Status icons */}
      <div className="flex items-center gap-1">
        <Signal className="h-3 w-3" />
        <Wifi className="h-3 w-3" />
        <Battery className="h-3 w-3" />
        <span className="text-xs">100%</span>
      </div>
    </div>
  )
}
