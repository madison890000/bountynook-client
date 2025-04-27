'use client'

import { TaskStatusBadge } from "@/components/TaskStatusBadge";
import { RewardBadge } from "@/components/RewardBadge";
import { Task } from "@/types/model";

export function BasicInfoSection({ task }: { task: Task }) {
  return (
    <div className="space-y-4 bg-gradient-to-br from-[#1c1b18] to-[#2d2c28] p-6 rounded-xl border border-[#8c7853] shadow-md">

      {/* 标题 */}
      <h1 className="text-3xl font-extrabold text-yellow-50 tracking-wide decoration-yellow-400">
        📜 {task.title}
      </h1>

      {/* 描述 */}
      <p className="text-[#d6d3c9] leading-relaxed text-sm">
        {task.description}
      </p>

      {/* 信息栏 */}
      <div className="space-y-2 text-sm text-[#b8b6a9] mt-4">

        {/* 奖励 */}
        <div className="flex items-center gap-2">
          💰 奖励：
          <RewardBadge
            rewardType={task.rewardType}
            rewardNote={task.rewardNote}
            amount={task.amount}
            currency={task.currency}
          />
        </div>

        {/* 状态 */}
        <div className="flex items-center gap-2">
          📌 状态：
          <TaskStatusBadge status={task.status} />
        </div>

        {/* 发布者 */}
        <p>🧑 发布者：{task.creator.name || 'Momo'}</p>

        {/* 执行人 */}
        {task.assignee && (
          <p>🤝 执行人：{task.assignee.name || 'Momo'}</p>
        )}
      </div>
    </div>
  )
}
