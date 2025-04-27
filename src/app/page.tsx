'use client'

import { fetchTasks } from "@/lib/endpoints";
import { usePaginationQuery } from "@/hooks/use-pagination-query";
import { Task } from "@/types/model";
import { TaskItem } from "@/components/TaskItem";
import { Pagination } from "@/components/Pagination";
import { EmptyTaskList } from "@/components/EmptyTaskList";

export default function TaskListPage() {
  const {
    data: tasks,
    page,
    pagination,
    nextPage,
    prevPage,
    isLoading,
    error,
  } = usePaginationQuery({
    queryKey: 'tasks',
    queryFn: fetchTasks,
    initialPage: 1,
    pageSize: 10,
  })

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">

      {isLoading && <p className="text-center">加载中...</p>}
      {error && <p className="text-red-600 text-center">{(error as Error).message}</p>}


      <ul className="space-y-6">
        {tasks.length === 0 ? (
          <EmptyTaskList />
        ) : (
          <ul className="space-y-6">
            {tasks.map((task: Task) => (<TaskItem key={task.id} task={task} />))}
          </ul>
        )}
      </ul>

      {pagination && (
        <Pagination onNext={nextPage} onPrev={prevPage} page={page} totalPages={pagination.totalPages} />
      )}
    </div>
  )
}
