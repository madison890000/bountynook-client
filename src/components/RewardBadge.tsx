'use client'

interface RewardBadgeProps {
  rewardType: 'ONLINE' | 'OFFLINE'
  amount?: number
  currency?: 'USD' | 'CNY'
  rewardNote?: string
}

export function RewardBadge({ rewardType, amount, currency, rewardNote }: RewardBadgeProps) {
  if (rewardType === 'ONLINE' && amount && currency) {
    const currencySymbol = currency === 'USD' ? '$' : '¥'

    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
        💵 {currencySymbol}{amount}
      </div>
    )
  }

  if (rewardType === 'OFFLINE' && rewardNote) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
        🤝 {rewardNote}
      </div>
    )
  }

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-200 text-gray-600 text-xs font-semibold rounded-full">
      🎁 待确认奖励
    </div>
  )
}
