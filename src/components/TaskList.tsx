'use client'

import { Task } from "@/types/model";
import { TaskItem } from "@/components/TaskItem";
import { Pagination } from "@/components/Pagination";
import { NoData } from "@/components/NoData";

export function TaskList({ title, tasks, page, pagination, nextPage, prevPage, isLoading, error }: any) {
  return (
    <div>
      {isLoading && <p className="text-center">加载中...</p>}
      {error && <p className="text-center text-red-600">{(error as Error).message}</p>}

      <ul className="space-y-6">
        {tasks.length === 0 ? (
          <NoData
            emoji="📜"
            title="没有悬赏任务"
            description="目前还没有人发布任务，快来第一个发布吧！"
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
