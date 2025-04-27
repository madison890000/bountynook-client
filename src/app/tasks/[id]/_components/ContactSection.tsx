'use client'

import { toast } from 'react-hot-toast'

export function ContactSection({ task, isAssignee, contactVisible, setContactVisible }: any) {
  const handleShowContact = () => {
    if (!isAssignee) {
      toast.error('只有执行人可以查看联系方式！', { icon: '🔒' })
      return
    }
    setContactVisible(true)
  }

  if (!task.creator?.contact) return null

  return (
    <div className="mt-6">
      {contactVisible ? (
        <div className="flex items-center gap-2 bg-green-800/20 border border-green-600 px-4 py-2 rounded-lg shadow-sm">
          📞 联系方式：{task.creator.contact}
        </div>
      ) : (
        <button
          onClick={handleShowContact}
          className="px-4 py-2 bg-yellow-700/30 border border-yellow-600 text-yellow-100 text-sm rounded-lg hover:bg-yellow-700/50 hover:scale-105 transition-all shadow-md"
        >
          🎯 查看联系方式
        </button>
      )}
    </div>
  )
}
