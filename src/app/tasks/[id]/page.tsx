'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { getUserInfo } from '@/lib/auth'
import { fetchTask } from '@/lib/endpoints'
import { ContactSection } from './_components/ContactSection'
import { ApplicationSection } from './_components/ApplicationSection'
import { AssignSection } from './_components/AssignSection'
import { BasicInfoSection } from './_components/BasicInfoSection'
import { useState } from 'react'
import { useTranslations } from "next-intl";
import { ConfirmAssignButton } from "./_components/ConfirmAssignButton";
import { LinkSection } from './_components/LinkSection'

export default function TaskDetailPage() {
  const params = useParams()
  const taskId = params.id as string
  const currentUser = getUserInfo()
  const [contactVisible, setContactVisible] = useState(false)
  const tGlobal = useTranslations('global')
  const t = useTranslations('TaskDetail')
  const { data: task, isLoading, error } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => fetchTask(taskId),
    staleTime: 1000 * 30,
  })

  if (isLoading) return <p className="text-center py-10">{tGlobal('loading')}</p>
  if (error) return <p className="text-center py-10 text-red-600">{(error as Error).message}</p>
  if (!task) return null

  const isCreator = currentUser?.id === task.creator.id
  const isAssignee = currentUser && task.assignees?.some(assignee=> currentUser?.id === assignee?.id);
  const hasAlreadyApplied = task.applications?.some((app: any) => app.user.id === currentUser?.id)

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-8">

      <BasicInfoSection task={task} />

      { (isAssignee || isCreator) && task.link && <LinkSection task={task} />}
      
      <div
        className="mx-auto flex gap-12 w-fit px-4 py-2 rounded-xl border border-yellow-700 bg-gradient-to-br from-[#2a2926] to-[#1c1b18] shadow-[0_0_12px_rgba(255,215,0,0.08)]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className="w-9 h-9 rounded-full bg-yellow-600 text-black flex items-center justify-center text-lg shadow-md">
              🙋
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 animate-ping"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="text-sm text-yellow-100 flex items-center font-semibold tracking-wide leading-snug">
            <div className="text-yellow-200 text-base mr-2">{task.applications?.length || 0}</div>
            <div className="text-yellow-500 text-xs">{t('appliedCountLabel')}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className="w-9 h-9 rounded-full bg-yellow-600 text-black flex items-center justify-center text-lg shadow-md">
              🙋
            </div>
          </div>
          <div className="text-sm text-yellow-100 flex items-center font-semibold tracking-wide leading-snug">
            <div className="text-yellow-200 text-base mr-2">{task.assignees?.length || 0}</div>
            <div className="text-yellow-500 text-xs">{t('assigneeCountLabel')}</div>
          </div>
        </div>
        {isCreator && task.status === 'PENDING' && task.assignees?.length > 0 && (
          <div className="text-right">
            <ConfirmAssignButton taskId={task.id} />
          </div>
        )}
      </div>

      {!isCreator && (
        <ContactSection
          task={task}
          isAssignee={isAssignee}
          contactVisible={contactVisible}
          setContactVisible={setContactVisible}
        />
      )
      }

      {isCreator && (
        <AssignSection task={task} taskId={taskId} />
      )}

      {!isCreator && !isAssignee && task.status === 'PENDING' && !hasAlreadyApplied && (
        <ApplicationSection taskId={taskId} />
      )}
      {hasAlreadyApplied && task.status === 'PENDING' && (
        <div className="text-center text-yellow-500">
          {t('alreadyApplied')}
        </div>
      )}

    </div>
  )
}
