import { apiFetch } from "@/lib/api-fetch";
import { saveToken, saveUserInfo } from "@/lib/auth";
import { Task, User } from "@/types/model";
import { getLang } from "@/lib/get-lang";

// --- 具体 API 方法 ---
// 用户登录
export async function login(data: { email: string; password: string }) {
  const res = await apiFetch<{ token: string, user: User }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  saveToken(res.token)
  saveUserInfo(res.user) // 🆕 同时保存userInfo到localStorage
}

// 用户注册
export async function signUp(data: { email: string; password: string; name?: string }) {
  const res = await apiFetch<{ token: string, user: User }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  saveToken(res.token)
  saveUserInfo(res.user)
  return res.user
}

// 获取当前登录用户
export async function fetchMe(): Promise<User> {
  const res = await apiFetch('/user/me')
  saveUserInfo(res.user) // 🆕 每次fetchMe也保存一次最新user信息
  return res.user
}

// 获取单个任务详情
export async function fetchTask(id: string): Promise<Task> {
  const res = await apiFetch(`/tasks/item/${id}`)
  return res.task
}

// 获取任务列表，支持分页
export async function fetchTasks({ page = 1, pageSize = 10 }: { page?: number, pageSize?: number }) {
  const lang = getLang();
  const res = await apiFetch(`/tasks/list?page=${page}&pageSize=${pageSize}&lang=${lang}`)
  return res
}

// 创建新任务
export async function createTask(data: {
  title: string
  description: string
  rewardType: 'ONLINE' | 'OFFLINE'
  amount?: number
  currency?: 'USD' | 'CNY'
  rewardNote?: string
}) {
  return apiFetch('/tasks/create', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

// 申请接任务
export async function applyForTask(taskId: string, comment: string) {
  return apiFetch(`/tasks/item/${taskId}/apply`, {
    method: 'POST',
    body: JSON.stringify({ comment }),
  })
}

// 指派某个申请者成为执行人
export async function assignTask(taskId: string, applicationId: string) {
  return apiFetch(`/tasks/item/${taskId}/assign`, {
    method: 'POST',
    body: JSON.stringify({ applicationId }),
  })
}

// 查我发布的任务
export async function fetchMyTasks({ page = 1, pageSize = 10 }: { page?: number; pageSize?: number }) {
  const res = await apiFetch(`/tasks/my-created?page=${page}&pageSize=${pageSize}`)
  return res
}

// 查我申请的任务
export async function fetchMyApplications({ page = 1, pageSize = 10 }: { page?: number; pageSize?: number }) {
  const res = await apiFetch(`/tasks/my-applications?page=${page}&pageSize=${pageSize}`)
  return res
}

// 查我被指派执行的任务
export async function fetchMyAssignedTasks({ page = 1, pageSize = 10 }: { page?: number; pageSize?: number }) {
  const res = await apiFetch(`/tasks/my-assigned?page=${page}&pageSize=${pageSize}`)
  return res
}
