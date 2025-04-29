'use client'

import { useTranslations } from 'next-intl'
import { toast } from 'react-hot-toast'

export function useAutoToast() {
  const t = useTranslations('Toast')

  return {
    success: (key: string,options?:any) => toast.success(t(key),options ?? {}),
    error: (key: string,options?:any) => toast.error(t(key),options ?? {}),
  }
}
