import { Task } from "@/types/model";

export function LinkSection({ task }: { task: Task }) {
  if (!task.link) return null;
  
  return (
    <div className="mt-4 p-4 bg-[#2a2420] rounded-lg border border-[#a38d6d]">
      <h3 className="text-[#f2e6c5] font-semibold mb-2">🔗 任务链接</h3>
      <a 
        href={task.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-[#e6c88e] hover:text-[#f2e6c5] underline break-all"
      >
        {task.link}
      </a>
    </div>
  )
}