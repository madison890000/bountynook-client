'use client'

import { useTranslations } from "next-intl";

interface TaskStatusBadgeProps {
  status: 'PENDING' | 'ASSIGNED' | 'COMPLETED'
}

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  const t = useTranslations('TaskStatus')
  let label = t(status);
  const config = {
    PENDING: { label: '等待接单', bg: 'bg-[#f0e1b6]', text: 'text-[#6b4e1f]' },
    ASSIGNED: { label: '执行中', bg: 'bg-[#d3b88d]', text: 'text-[#5a4221]' },
    COMPLETED: { label: '已完成', bg: 'bg-[#ced1cf]', text: 'text-[#3a3f3c]' },
  }[status]

  return (
    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
      {label}
    </span>
  )
}
