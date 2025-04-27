'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { getUserInfo, saveUserInfo } from '@/lib/auth'
import { apiFetch } from '@/lib/api-fetch'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const schema = z.object({
  name: z.string().min(2, '姓名至少2个字符').max(20, '姓名太长了'),
  contact: z.string().min(5, '联系方式太短了').max(50, '联系方式太长了'),
})

type FormData = z.infer<typeof schema>

export default function ProfilePage() {
  const user = getUserInfo()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name || '',
      contact: user?.contact || '',
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      const res = await apiFetch('/user/update', {
        method: 'POST',
        body: JSON.stringify(data),
      })

      toast.success('保存成功！', { icon: '✅' })
      saveUserInfo(res.user)
      router.push('/dashboard')
    } catch (err: any) {
      toast.error(err.message || '保存失败', { icon: '❌' })
    }
  }

  return (
    <div className="max-w-md mx-auto py-12 px-6 bg-gradient-to-br from-[#1c1b18] to-[#2d2c28] border border-yellow-700 rounded-xl shadow-md">
      <h1 className="text-3xl font-extrabold text-center text-yellow-100 mb-8 tracking-widest italic">
        ✍️ 编辑我的资料
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 姓名 */}
        <div>
          <label className="block mb-2 text-yellow-200 font-semibold tracking-wide">姓名</label>
          <input
            {...register('name')}
            placeholder="输入你的名字"
            className="w-full bg-[#2a2926] text-yellow-50 border border-yellow-600 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
        </div>

        {/* 联系方式 */}
        <div>
          <label className="block mb-2 text-yellow-200 font-semibold tracking-wide">联系方式</label>
          <input
            {...register('contact')}
            placeholder="输入手机号、微信号等联系方式"
            className="w-full bg-[#2a2926] text-yellow-50 border border-yellow-600 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {errors.contact && <p className="text-red-400 text-xs mt-1">{errors.contact.message}</p>}
        </div>

        {/* 保存按钮 */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-yellow-700 hover:bg-yellow-600 text-black font-bold py-3 rounded transition-all disabled:opacity-50"
        >
          {isSubmitting ? '保存中...' : '🎯 保存资料'}
        </button>
      </form>
    </div>
  )
}
