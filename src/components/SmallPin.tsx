'use client'

export function SmallPin({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`w-5 h-5 text-gray-400 drop-shadow-sm ${className}`}
    >
      <circle cx="12" cy="12" r="9" fill="url(#grad)" stroke="currentColor" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <defs>
        <radialGradient id="grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d1d5db" />
          <stop offset="100%" stopColor="#6b7280" />
        </radialGradient>
      </defs>
    </svg>
  )
}
