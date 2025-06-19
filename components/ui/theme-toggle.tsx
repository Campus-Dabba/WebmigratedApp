"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20"
      >
        <div className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200"
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4 text-white" />
      ) : (
        <Sun className="h-4 w-4 text-white" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
