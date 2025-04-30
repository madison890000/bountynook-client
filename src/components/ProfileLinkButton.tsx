'use client'

import { useRouter } from 'next/navigation'

export function ProfileLinkButton({ children }: { children?: React.ReactNode }) {
  const router = useRouter()
  const handleClick = () => {
    router.push('/my/profile')
  }

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center px-4 py-2 bg-gradient-to-br from-[#c6a664] to-[#a6813f] text-[#1e1d1a] font-semibold rounded-lg shadow-sm hover:brightness-110 transition"
    >
      {children}
    </button>
  )
}
