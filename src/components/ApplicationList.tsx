'use client'

import { Pagination } from "@/components/Pagination";
import { TaskItem } from "@/components/TaskItem";
import { NoData } from "@/components/NoData";

export function ApplicationList({ title, applications, page, pagination, nextPage, prevPage, isLoading, error, goToDetail }: any) {
  return (
    <div>
      {isLoading && <p className="text-center">加载中...</p>}
      {error && <p className="text-center text-red-600">{(error as Error).message}</p>}

      <ul className="space-y-6">
        {applications.length === 0 ? (
          <NoData
            emoji="📜"
            title="没有申请记录"
            description="你还没有申请任何任务，快去参与挑战吧！"
          />
        ) : (
          applications.map((app) => (
            <TaskItem key={app.id} task={app.task} />
          ))
        )}
      </ul>

      {pagination && (<Pagination onNext={nextPage} onPrev={prevPage} page={page} totalPages={pagination.totalPages} />)}
    </div>
  )
}
