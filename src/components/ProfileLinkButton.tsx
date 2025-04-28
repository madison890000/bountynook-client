'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from "next-intl";

export function ProfileLinkButton({ children }: { children?: React.ReactNode }) {
  const router = useRouter()
  const t = useTranslations('Profile')
  const handleClick = () => {
    router.push('/dashboard/profile')
  }

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center px-3 py-2 bg-primary text-white rounded hover:bg-blue-600 transition"
    >
      {children || t('mine')}
    </button>
  )
}
