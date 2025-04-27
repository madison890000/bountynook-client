'use client'

interface PaginationProps {
  page: number
  totalPages: number
  onPrev: () => void
  onNext: () => void
}

export function Pagination({ page, totalPages, onPrev, onNext }: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-6 mt-10">

      {/* 上一页 */}
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="px-4 py-2 rounded-lg bg-yellow-100 text-yellow-800 border border-yellow-400 hover:bg-yellow-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        ⬅️ 上一页
      </button>

      {/* 当前页码 */}
      <span className="text-sm text-gray-700 tracking-wider">
        第 <span className="text-yellow-600 font-bold">{page}</span> / {totalPages} 页
      </span>

      {/* 下一页 */}
      <button
        onClick={onNext}
        disabled={page >= totalPages}
        className="px-4 py-2 rounded-lg bg-yellow-100 text-yellow-800 border border-yellow-400 hover:bg-yellow-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        下一页 ➡️
      </button>

    </div>
  )
}
