'use client'

import { TaskStatusBadge } from "@/components/TaskStatusBadge";
import { RewardBadge } from "@/components/RewardBadge";
import { Task } from "@/types/model";

export function BasicInfoSection({ task }: { task: Task }) {
  return (
    <div
      className="space-y-4 bg-gradient-to-br from-[#2a2420] to-[#3b332c] p-6 rounded-xl border border-[#a38d6d] shadow-md">

      <h1 className="text-2xl md:text-3xl font-extrabold text-[#f2e6c5] tracking-wide">
        📜 {task.title}
      </h1>

      <p className="text-[#d7cbb2] leading-relaxed text-sm md:text-base">
        {task.description}
      </p>

      <div className="space-y-2 text-sm text-[#cbb892] mt-4">

        <div className="flex items-center gap-2">
          💰：
          <RewardBadge
            rewardType={task.rewardType}
            rewardNote={task.rewardNote}
            amount={task.amount}
            currency={task.currency}
          />
        </div>

        <div className="flex items-center gap-2">
          📌：
          <TaskStatusBadge status={task.status} />
        </div>

        <p>🧑：{task.creator.name || 'Momo'}</p>

        {task.assignee && (
          <p>🤝：{task.assignee.name || 'Momo'}</p>
        )}
      </div>
    </div>
  )
}
