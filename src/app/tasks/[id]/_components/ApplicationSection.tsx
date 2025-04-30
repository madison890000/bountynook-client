'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { applyForTask } from '@/lib/endpoints'
import { getUserInfo } from '@/lib/auth'
import { toast } from 'react-hot-toast'
import { useTranslations } from "next-intl"
import { useAutoToast } from "@/hooks/use-auto-toast";

export function ApplicationSection({ taskId }: { taskId: string }) {
  const [showForm, setShowForm] = useState(false)
  const [comment, setComment] = useState('')
  const queryClient = useQueryClient()
  const user = getUserInfo()
  const t = useTranslations('ApplicationSection')
  const autoToast = useAutoToast()

  const mutation = useMutation({
    mutationFn: (comment: string) => applyForTask(taskId, comment),
    onSuccess: () => {
      autoToast.success('applySuccess', { icon: '✅' })
      queryClient.invalidateQueries({ queryKey: ['task', taskId] })
      setShowForm(false)
      setComment('')
    },
    onError: (err: any) => {
      autoToast.error('applyError', { icon: '❌' })
    },
  })

  const handleApply = () => {
    if (!user) {
      toast.error('Please login first', { icon: '🔒' })
      return
    }
    if (!comment.trim()) {
      toast.error('Please write your application note', { icon: '✍️' })
      return
    }
    mutation.mutate(comment)
  }

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow-lg">
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full py-3 rounded-lg bg-gradient-to-br from-[#caa76d] to-[#9a7743] text-[#1e1d1a] font-bold text-lg shadow-md hover:brightness-110 transition-all"

        >
          {t('apply')}
        </button>
      ) : (
        <div className="space-y-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t('commentPlaceholder')}
            rows={4}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none resize-none"
          />

          <div className="flex space-x-4">
            <button
              onClick={handleApply}
              disabled={mutation.isPending}
              className="flex-1 py-3 rounded-lg bg-gradient-to-br from-[#caa76d] to-[#9a7743] text-[#1e1d1a] font-bold transition-all shadow-md hover:brightness-110 disabled:opacity-50"
            >
              {mutation.isPending ? t('submitting') : t('submit')}
            </button>

            <button
              onClick={() => {
                setShowForm(false)
                setComment('')
              }}
              className="flex-1 py-3 rounded-lg bg-[#44403c] text-[#d6d3c9] font-medium hover:bg-[#5a544f] transition-all shadow-sm"
            >
              {t('cancel')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
