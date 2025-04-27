'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

export function usePaginationQuery<TData = any>({
                                                  queryKey,
                                                  queryFn,
                                                  initialPage = 1,
                                                  pageSize = 10,
                                                }: {
  queryKey: string
  queryFn: (params: { page: number; pageSize: number }) => Promise<{ tasks: TData[]; pagination: { total: number; totalPages: number } }>
  initialPage?: number
  pageSize?: number
}) {
  const [page, setPage] = useState(initialPage)

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: [queryKey, page],
    queryFn: () => queryFn({ page, pageSize }),
    keepPreviousData: true,
  })

  const nextPage = () => {
    if (data && data.pagination.page < data.pagination.totalPages) {
      setPage(prev => prev + 1)
    }
  }

  const prevPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1)
    }
  }

  return {
    page,
    pageSize,
    setPage,
    nextPage,
    prevPage,
    data: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    isFetching,
    error,
  }
}
