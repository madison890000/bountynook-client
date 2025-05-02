'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { assignTask } from '@/lib/endpoints'
import { useTranslations } from "next-intl";
import { useAutoToast } from "@/hooks/use-auto-toast";
import { ProfileLinkButton } from "@/components/ProfileLinkButton";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { AuthGuardButton } from "@/components/AuthGuardButton";

export function AssignSection({ task, taskId }: { task: any, taskId: string }) {
  const queryClient = useQueryClient()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const info = getUserInfo()
    setUser(info)
  }, [])
  const router = useRouter()
  const t = useTranslations('AssignSection')
  const autoToast = useAutoToast()
  const mutation = useMutation({
    mutationFn: (applicationId: string) => assignTask(taskId, applicationId),
    onSuccess: () => {
      autoToast.success('assignSuccess', { icon: '📜' })
      queryClient.invalidateQueries({ queryKey: ['task', taskId] })
    },
    onError: (err: any) => {
      autoToast.error('assignError', { icon: '❌' })
    },
  })

  if (!task.applications?.length) return null

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-6 tracking-widest">
        🧑‍💼 {t("applicationList")}
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
            <AuthGuardButton>
              <button
                onClick={() =>{
                  if (!user?.contact) {
                    autoToast.error('needContact', { icon: '📞' })
                    setTimeout(() => {
                      router.push('/my/profile')
                    }, 1500)
                    return
                  }
                  mutation.mutate(app.id)
                }}
                disabled={mutation.isPending}
                className="px-6 py-3 rounded-lg font-bold tracking-wide text-yellow-100 border border-yellow-600 bg-gradient-to-br from-yellow-700 via-yellow-600 to-yellow-700 shadow-md hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mutation.isPending ? '📜 分配中...' : `🏹 ${t('assignTo')}`}
              </button>
            </AuthGuardButton>
          </li>
        ))}
      </ul>
      {/* 补充资料提示 */}
      {user && !user?.contact && (
        <div className="mt-6 text-center bg-yellow-200/20 text-yellow-300 p-4 rounded border border-yellow-600 text-sm">
          {t('noContactSection1')}<ProfileLinkButton>{t('noContactSection2')}</ProfileLinkButton>{t('noContactSection3')}
        </div>
      )}
    </div>
  )
}
