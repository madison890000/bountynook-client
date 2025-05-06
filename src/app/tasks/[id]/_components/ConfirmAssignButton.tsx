'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CheckCircle } from 'lucide-react'
import { useAutoToast } from '@/hooks/use-auto-toast'
import { updateTaskStatus } from '@/lib/endpoints'
import { useTranslations } from 'next-intl'

type Props = {
  taskId: string
  disabled?: boolean
}

export function ConfirmAssignButton({ taskId, disabled = false }: Props) {
  const [loading, setLoading] = useState(false)
  const toast = useAutoToast()
  const queryClient = useQueryClient()
  const t = useTranslations('TaskDetail') // 假设你的翻译 key 是 TaskDetail.*，根据实际文件改

  const mutation = useMutation({
    mutationFn: async () => {
      setLoading(true)
      return updateTaskStatus(taskId,'ASSIGNED');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task', taskId] })
    },
    onSettled: () => {
      setLoading(false)
    },
  })

  return (
    <button
      onClick={() => mutation.mutate()}
      disabled={loading || disabled}
      className="bg-[#2a2926] text-yellow-100 border border-yellow-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-700 hover:text-black transition disabled:opacity-40"

    >
      <CheckCircle size={16} />
      {loading ? t('assignConfirming') : t('assignConfirm')}
    </button>
  )
}
