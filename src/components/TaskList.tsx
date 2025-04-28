'use client'

import { Task } from "@/types/model";
import { TaskItem } from "@/components/TaskItem";
import { Pagination } from "@/components/Pagination";
import { NoData } from "@/components/NoData";
import { useTranslations } from "next-intl";

export function TaskList({ tasks, page, pagination, nextPage, prevPage, isLoading, error }: any) {
  const t = useTranslations('TaskList')
  return (
    <div>
      {isLoading && <p className="text-center">加载中...</p>}
      {error && <p className="text-center text-red-600">{(error as Error).message}</p>}

      <ul className="space-y-6">
        {tasks.length === 0 ? (
          <NoData
            emoji="📜"
            title={t('noTasksTitle')}
            description={t('noTasksDescription')}
          />
        ) : (
          tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))
        )}
      </ul>

      {pagination && (
        <Pagination onNext={nextPage} onPrev={prevPage} page={page} totalPages={pagination.totalPages} />
      )}
    </div>
  )
}
