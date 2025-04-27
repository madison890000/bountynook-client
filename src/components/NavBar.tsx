'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { getToken, clearToken } from '@/lib/auth'
import { useEffect, useState } from 'react'
import { ProfileLinkButton } from "@/components/ProfileLinkButton";
import Image from 'next/image'

export function NavBar() {
  const [loggedIn, setLoggedIn] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const token = getToken()
    setLoggedIn(!!token)
  }, [pathname])

  const handleLogout = () => {
    clearToken()
    setLoggedIn(false)
    router.push('/login')
  }

  return (
    <nav className="flex justify-between items-center py-3 px-6 bg-gradient-to-br from-[#1f1e1b] to-[#2c2a28] border-b-2 border-yellow-700 shadow-md">

      {/* Logo区域 */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="BountyNook Logo"
          width={48}
          height={48}
          className="rounded-lg shadow-sm"
        />
      </Link>

      {/* 链接区域 */}
      <div className="flex items-center space-x-6 text-yellow-200 text-sm font-semibold">
        <Link href="/create-task" className="hover:text-yellow-300 transition-colors">
          📜 发布任务
        </Link>

        {loggedIn && (
          <Link href="/dashboard" className="hover:text-yellow-300 transition-colors">
            🧭 我的任务
          </Link>
        )}
      </div>

      {/* 登录区块 */}
      <div className="flex items-center space-x-4 text-yellow-200">
        {loggedIn ? (
          <ProfileLinkButton />
        ) : (
          <Link href="/login" className="hover:text-yellow-300 transition-colors text-sm font-semibold">
            🔒 登录
          </Link>
        )}
      </div>
    </nav>
  )
}
