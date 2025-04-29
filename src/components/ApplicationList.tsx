'use client'

import { Pagination } from "@/components/Pagination";
import { TaskItem } from "@/components/TaskItem";
import { NoData } from "@/components/NoData";
import { useTranslations } from "next-intl";

export function ApplicationList({ applications, page, pagination, nextPage, prevPage, isLoading, error, goToDetail }: any) {
  const t = useTranslations('ApplicationList')
  const tGlobal = useTranslations('global')
  return (
    <div>
      {isLoading && <p className="text-center">{tGlobal('loading')}</p>}
      {error && <p className="text-center text-red-600">{(error as Error).message}</p>}

      <ul className="space-y-6">
        {applications.length === 0 ? (
          <NoData
            emoji="📜"
            title={t('noApplicationsTitle')}
            description={t('noApplicationsDescription')}
          />
        ) : (
          applications.map((app) => (
            <TaskItem key={app.task.id} task={app.task} />
          ))
        )}
      </ul>

      {pagination && (<Pagination onNext={nextPage} onPrev={prevPage} page={page} totalPages={pagination.totalPages} />)}
    </div>
  )
}
