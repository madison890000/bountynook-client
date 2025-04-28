'use client'

import { useTranslations } from "next-intl";

interface TaskStatusBadgeProps {
  status: 'PENDING' | 'ASSIGNED' | 'COMPLETED'
}

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  const t = useTranslations('TaskStatus')
  let label = t(status);
  let colorClass = ''
  switch (status) {
    case 'PENDING':
      colorClass = 'bg-yellow-700/20 text-yellow-300 border border-yellow-600'
      break
    case 'ASSIGNED':
      colorClass = 'bg-blue-700/20 text-blue-300 border border-blue-600'
      break
    case 'COMPLETED':
      colorClass = 'bg-green-700/20 text-green-300 border border-green-600'
      break
    default:
      label = '未知状态'
      colorClass = 'bg-gray-600/30 text-gray-300 border border-gray-500'
  }

  return (
    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${colorClass}`}>
      {label}
    </span>
  )
}
