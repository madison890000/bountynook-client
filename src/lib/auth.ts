// src/lib/auth.ts
export const saveToken = (token: string) => localStorage.setItem('token', token)
export const getToken = () => localStorage.getItem('token')
export const clearToken = () => localStorage.removeItem('token')

export function saveUserInfo(user: any) {
  if (typeof window === 'undefined') return
  localStorage.setItem('userInfo', JSON.stringify(user))
}

export function getUserInfo() {
  if (typeof window === 'undefined') return null
  const userStr = localStorage.getItem('userInfo')
  if (!userStr) return null
  try {
    return JSON.parse(userStr)
  } catch (err) {
    console.error('解析userInfo失败', err)
    return null
  }
}
