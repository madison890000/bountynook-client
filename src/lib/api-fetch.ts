import { getToken } from "@/lib/auth";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.bountynook.com/api'

// src/lib/api.ts
export async function apiFetch<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();
  const res = await fetch(baseUrl + url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    next: { revalidate: 0 }, // 可选：禁用 cache
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || 'Request failed')
  }

  return res.json()
}
