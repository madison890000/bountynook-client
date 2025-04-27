'use client'

import { usePaginationQuery } from '@/hooks/use-pagination-query'
import { fetchMyTasks, fetchMyApplications, fetchMyAssignedTasks } from '@/lib/endpoints'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TaskList } from "@/components/TaskList";
import { ApplicationList } from "@/components/ApplicationList";

type TabType = 'CREATED' | 'APPLIED' | 'ASSIGNED'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>('CREATED')
  const router = useRouter()

  const created = usePaginationQuery({
    queryKey: 'myCreatedTasks',
    queryFn: fetchMyTasks,
    initialPage: 1,
    pageSize: 10,
  })

  const applied = usePaginationQuery({
    queryKey: 'myApplications',
    queryFn: fetchMyApplications,
    initialPage: 1,
    pageSize: 10,
  })

  const assigned = usePaginationQuery({
    queryKey: 'myAssignedTasks',
    queryFn: fetchMyAssignedTasks,
    initialPage: 1,
    pageSize: 10,
  })

  const goToDetail = (taskId: string) => {
    router.push(`/tasks/${taskId}`)
  }
  console.log(applied)
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      {/* Tab切换 */}
      <div className="flex justify-center mb-10 gap-4">
        {[
          { label: '📜 我发布的', value: 'CREATED' },
          { label: '📝 我申请的', value: 'APPLIED' },
          { label: '🏹 我执行的', value: 'ASSIGNED' },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-5 py-2 rounded-full font-bold tracking-wide transition-all
        ${activeTab === tab.value
              ? 'bg-yellow-600 text-black shadow-md'
              : 'bg-[#2c2a28] text-yellow-100 hover:bg-yellow-700 hover:text-black'}
      `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab内容 */}
      {activeTab === 'CREATED' && (
        <TaskList
          title="我发布的任务"
          tasks={created.data}
          page={created.page}
          pagination={created.pagination}
          nextPage={created.nextPage}
          prevPage={created.prevPage}
          isLoading={created.isLoading}
          error={created.error}
          goToDetail={goToDetail}
        />
      )}

      {activeTab === 'APPLIED' && (
        <ApplicationList
          title="我申请的任务"
          applications={applied.data}
          page={applied.page}
          pagination={applied.pagination}
          nextPage={applied.nextPage}
          prevPage={applied.prevPage}
          isLoading={applied.isLoading}
          error={applied.error}
          goToDetail={goToDetail}
        />
      )}

      {activeTab === 'ASSIGNED' && (
        <TaskList
          title="我执行的任务"
          tasks={assigned.data}
          page={assigned.page}
          pagination={assigned.pagination}
          nextPage={assigned.nextPage}
          prevPage={assigned.prevPage}
          isLoading={assigned.isLoading}
          error={assigned.error}
          goToDetail={goToDetail}
        />
      )}
    </div>
  )
}
