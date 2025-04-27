'use client'

interface NoDataProps {
  emoji?: string
  title?: string
  description?: string
}

export function NoData({
                         emoji = '📜',
                         title = '暂无数据',
                         description = '这里空空如也，快去探索吧！',
                       }: NoDataProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-yellow-200 opacity-80">
      <div className="text-5xl mb-4">{emoji}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-yellow-400">{description}</p>
    </div>
  )
}
