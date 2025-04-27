'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { assignTask } from '@/lib/endpoints'
import { toast } from 'react-hot-toast'

export function AssignSection({ task, taskId }: { task: any, taskId: string }) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (applicationId: string) => assignTask(taskId, applicationId),
    onSuccess: () => {
      toast.success('✅ 成功选中执行人', { icon: '📜' })
      queryClient.invalidateQueries({ queryKey: ['task', taskId] })
    },
    onError: (err: any) => {
      toast.error(err.message || '分配失败', { icon: '❌' })
    },
  })

  if (!task.applications?.length) return null

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-6 tracking-widest">
        🧑‍💼 申请人列表
      </h3>

      <ul className="space-y-5">
        {task.applications.map((app: any) => (
          <li
            key={app.id}
            className="flex justify-between items-center bg-gradient-to-br from-[#1f1e1b] to-[#2c2a28] border border-yellow-700 rounded-xl p-5 shadow-md hover:shadow-lg transition-all"
          >
            <div className="space-y-1">
              <p className="font-bold text-yellow-200">{app.user.name || app.user.email}</p>
              <p className="text-yellow-50 text-sm">{app.comment}</p>
            </div>

            <button
              onClick={() => mutation.mutate(app.id)}
              disabled={mutation.isPending}
              className="px-6 py-3 rounded-lg font-bold tracking-wide text-yellow-100 border border-yellow-600 bg-gradient-to-br from-yellow-700 via-yellow-600 to-yellow-700 shadow-md hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {mutation.isPending ? '📜 分配中...' : '🏹 选TA'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
