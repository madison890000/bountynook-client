'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { applyForTask } from '@/lib/endpoints'
import { getUserInfo } from '@/lib/auth'
import { toast } from 'react-hot-toast'

export function ApplicationSection({ taskId }: { taskId: string }) {
  const [showForm, setShowForm] = useState(false)
  const [comment, setComment] = useState('')
  const queryClient = useQueryClient()
  const user = getUserInfo()

  const mutation = useMutation({
    mutationFn: (comment: string) => applyForTask(taskId, comment),
    onSuccess: () => {
      toast.success('申请成功', { icon: '✅' })
      queryClient.invalidateQueries({ queryKey: ['task', taskId] })
      setShowForm(false)
      setComment('')
    },
    onError: (err: any) => {
      toast.error(err.message || '申请失败', { icon: '❌' })
    },
  })

  const handleApply = () => {
    if (!user) {
      toast.error('请先登录', { icon: '🔒' })
      return
    }
    if (!comment.trim()) {
      toast.error('请填写申请说明', { icon: '✍️' })
      return
    }
    mutation.mutate(comment)
  }

  return (
    <div>
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-indigo-600"
        >
          申请接任务
        </button>
      ) : (
        <div className="space-y-3">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="填写你的申请说明..."
          />
          <div className="flex space-x-4">
            <button
              onClick={handleApply}
              disabled={mutation.isPending}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-indigo-600"
            >
              {mutation.isPending ? '申请中...' : '提交申请'}
            </button>
            <button
              onClick={() => {
                setShowForm(false)
                setComment('')
              }}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              取消
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
