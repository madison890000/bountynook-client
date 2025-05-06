export type User = {
  id: string
  email: string
  name?: string
  contact?: string
  avatarUrl?: string
  level?: number
}

export type Task = {
  id: string
  title: string
  description: string
  rewardType: 'ONLINE' | 'OFFLINE';
  rewardNote?: string;
  amount?: number;
  currency?: 'USD' | 'CNY';
  status: 'PENDING' | 'ASSIGNED' | 'COMPLETED'
  creator: {
    id: string
    name?: string | null
    email: string
    contact?: string
  }
  assignees?: {
    id: string
    name?: string | null
    email: string
  }[]
  applications?: {
    id: string
    comment: string
    createdAt: string
    user: {
      id: string
      name?: string
      level?: number
      contact?: string
    }
  }[]
}
