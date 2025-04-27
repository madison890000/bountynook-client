'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function EmptyTaskList() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
      {/* 小猫图标 */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-6"
      >
        <Image
          src="/empty-cat.png" // 请把一张小猫拿信的小图命名为 empty-cat.png 放到 public 目录下！
          alt="No Tasks"
          width={120}
          height={120}
        />
      </motion.div>

      {/* 标题 */}
      <motion.h2
        className="text-xl font-semibold mb-2"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        没有悬赏任务
      </motion.h2>

      {/* 副标题 */}
      <motion.p
        className="text-sm text-gray-400"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        快来发布第一封悬赏信吧 🪶
      </motion.p>
    </div>
  )
}
