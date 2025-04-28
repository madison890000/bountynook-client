'use client'

import { useRouter } from 'next/navigation'
import { RewardBadge } from './RewardBadge'
import { TaskStatusBadge } from './TaskStatusBadge'
import { Task } from '@/types/model'
import { SmallPin } from "@/components/SmallPin";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const router = useRouter()
  const t = useTranslations('TaskItem')
  const handleClick = () => {
    router.push(`/tasks/${task.id}`)
  }

  const randomRotation = useMemo(() => {
    const rotations = [-2, -1, 0, 1, 2, 3]; // 旋转角度集合
    return rotations[Math.floor(Math.random() * rotations.length)];
  }, []);

  return (
    <div
      onClick={handleClick}
      className="relative rounded-xl p-5 bg-gradient-to-br from-[#1c1b18] to-[#2d2c28] border border-[#8c7853] shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
      style={{
        transform: `rotate(${randomRotation}deg)`,
        transformOrigin: 'top center', // 让旋转像挂在钉子上一样
      }}
    >
      <div className="absolute top-1 left-1/2 -translate-x-1/2">
        <SmallPin />
      </div>

      {/* 标题处理 */}
      <h3
        className="text-xl font-extrabold text-yellow-50 tracking-widest decoration-yellow-400 flex items-center gap-2 overflow-hidden whitespace-nowrap text-ellipsis">
        📜 {task.title}
      </h3>

      {/* 描述处理（带柔和渐变遮罩） */}
      <div className="relative mt-2">
        <p className="text-[#d6d3c9] text-sm leading-relaxed line-clamp-3">
          {task.description}
        </p>
        <div
          className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-[#1c1b18] to-transparent pointer-events-none"></div>
      </div>

      {/* 底部信息 */}
      <div className="flex flex-wrap justify-between items-center gap-2 text-xs text-[#b8b6a9] mt-4">
        <RewardBadge
          rewardType={task.rewardType}
          amount={task.amount}
          currency={task.currency}
          rewardNote={task.rewardNote}
        />
        <span>{t('creator')}：{task.creator?.name || task.creator?.email}</span>
        <TaskStatusBadge status={task.status} />
      </div>
    </div>
  )
}
