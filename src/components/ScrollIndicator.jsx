import React from 'react'
import { ChevronDown } from 'lucide-react'

export default function ScrollIndicator({ targetId = 'brands', variant = 'dark' }) {
  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const isLight = variant === 'light'

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to next section"
      className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-colors group ${
        isLight ? 'text-stone-600 hover:text-stone-900' : 'text-stone-400 hover:text-white'
      }`}
    >
      <span className="text-[10px] font-mono uppercase tracking-widest opacity-70 group-hover:opacity-100">
        Scroll
      </span>
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300 animate-bounce-soft ${
          isLight
            ? 'border border-stone-300/80 bg-white/70 group-hover:bg-white group-hover:border-stone-400'
            : 'border border-stone-600/60 bg-white/5 group-hover:border-white/40 group-hover:bg-white/10'
        }`}
      >
        <ChevronDown size={20} />
      </span>
    </button>
  )
}
