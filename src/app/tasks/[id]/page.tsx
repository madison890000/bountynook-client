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
  const isAssignee = currentUser && task.assignee && currentUser?.id === task.assignee?.id
  const hasAlreadyApplied = task.applications?.some((app: any) => app.user.id === currentUser?.id)

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-8">
      <BasicInfoSection task={task} />

      { !isCreator && (
        <ContactSection
          task={task}
          isAssignee={isAssignee}
          contactVisible={contactVisible}
          setContactVisible={setContactVisible}
        />
      )
      }

      {isCreator && task.status === 'PENDING' && (
        <AssignSection task={task} taskId={taskId} />
      )}

      {!isCreator && !isAssignee && task.status === 'PENDING' && !hasAlreadyApplied && (
        <ApplicationSection taskId={taskId} />
      )}
      { hasAlreadyApplied && task.status ==='PENDING' && (
        <div className="text-center text-yellow-500">
          {t('alreadyApplied')}
        </div>
      )}
    </div>
  )
}
