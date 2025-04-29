'use client'

import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { getToken } from '@/lib/auth'
import { useAutoToast } from "@/hooks/use-auto-toast";

type Props = {
  children: ReactNode
  onAuthClick?: () => void | Promise<void>
  className?: string
}

export function AuthGuardButton({ children, onAuthClick, className }: Props) {
  const router = useRouter()
  const autoToast = useAutoToast()

  const handleClick = async (e) => {
    const token = getToken()
    if (!token) {
      autoToast.error('loginFirst', { icon: '🔒' })
      setTimeout(() => {
        router.push('/login')
      },3*1000)
      e.preventDefault();
      e.stopPropagation()
      return
    }

    await onAuthClick?.()
  }

  return (
    <div onClick={handleClick} className={className} role="button">
      {children}
    </div>
  )
}
