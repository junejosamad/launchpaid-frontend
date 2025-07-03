"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface UserTypeToggleProps {
  selectedType: "creator" | "agencyBrand"
  onTypeChange: (type: "creator" | "agencyBrand") => void
}

export const UserTypeToggle: React.FC<UserTypeToggleProps> = ({ selectedType, onTypeChange }) => {
  return (
    <div className="relative inline-flex items-center bg-black border-2 border-purple-500 rounded-full p-1 shadow-xl">
      {/* Background slider */}
      <div
        className={cn(
          "absolute top-1 bottom-1 bg-purple-500 rounded-full transition-all duration-300 ease-out",
          selectedType === "creator" ? "left-1 right-[50%]" : "left-[50%] right-1",
        )}
      />

      {/* Creator button */}
      <button
        onClick={() => onTypeChange("creator")}
        className={cn(
          "relative z-10 flex items-center justify-center gap-3 px-6 py-3 rounded-full text-base font-semibold transition-all duration-300 flex-1 min-w-[140px]",
          selectedType === "creator" ? "text-black" : "text-purple-400 hover:text-purple-300",
        )}
      >
        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
        <span className="whitespace-nowrap">Creator</span>
      </button>

      {/* Agency/Brand button */}
      <button
        onClick={() => onTypeChange("agencyBrand")}
        className={cn(
          "relative z-10 flex items-center justify-center gap-3 px-6 py-3 rounded-full text-base font-semibold transition-all duration-300 flex-1 min-w-[160px]",
          selectedType === "agencyBrand" ? "text-black" : "text-purple-400 hover:text-purple-300",
        )}
      >
        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
        <span className="whitespace-nowrap">Agency/ Brand</span>
      </button>
    </div>
  )
}
