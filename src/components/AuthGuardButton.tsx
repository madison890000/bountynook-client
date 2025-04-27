'use client'

import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { getToken } from '@/lib/auth'
import { toast } from "react-hot-toast";

type Props = {
  children: ReactNode
  onAuthClick?: () => void | Promise<void>
  className?: string
}

export function AuthGuardButton({ children, onAuthClick, className }: Props) {
  const router = useRouter()

  const handleClick = async (e) => {
    const token = getToken()
    if (!token) {
      toast('请先登录才能执行此操作', { icon: '🔒' })
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
