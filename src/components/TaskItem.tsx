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
      className="relative rounded-xl p-5 bg-gradient-to-br from-[#2a2420] to-[#3b332c] border border-[#a38d6d] shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
      style={{
        transform: `rotate(${randomRotation}deg)`,
        transformOrigin: 'top center',
      }}
    >
      {/* 顶部小钉子 */}
      <div className="absolute top-1 left-1/2 -translate-x-1/2 z-10">
        <SmallPin />
      </div>

      {/* 标题 */}
      <h3
        className="text-xl font-extrabold text-[#f2e6c5] tracking-wide flex items-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis">
        📜 {task.title}
      </h3>

      {/* 描述 */}
      <div className="relative mt-2">
        <p className="text-[#d7cbb2] text-sm leading-relaxed line-clamp-3">
          {task.description}
        </p>
        <div
          className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-[#2a2420] to-transparent pointer-events-none"></div>
      </div>

      {/* 底部信息 */}
      <div className="flex flex-wrap justify-between items-center gap-2 text-xs text-[#cbb892] mt-4">
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
