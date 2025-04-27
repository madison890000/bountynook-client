'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signUp } from "@/lib/endpoints";
import Link from 'next/link'
import Image from "next/image";

const schema = z.object({
  email: z.string().email({ message: '请输入有效的邮箱地址' }),
  password: z.string().min(6, { message: '密码至少6位' }),
  name: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const router = useRouter()
  const [error, setError] = useState('')

  const onSubmit = async (data: FormData) => {
    try {
      await signUp(data)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || '注册失败')
    }
  }

  return (
    <div className="max-w-md mx-auto py-14 px-8 bg-gradient-to-br from-[#1c1b18] to-[#2d2c28] border border-yellow-700 rounded-xl shadow-md">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-yellow-100 tracking-widest italic">
        📝 注册 BountyNook
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 邮箱 */}
        <div>
          <input
            type="email"
            placeholder="邮箱"
            {...register('email')}
            className="w-full bg-[#2a2926] text-yellow-50 border border-yellow-600 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* 昵称 */}
        <div>
          <input
            type="text"
            placeholder="昵称（可选）"
            {...register('name')}
            className="w-full bg-[#2a2926] text-yellow-50 border border-yellow-600 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
        </div>

        {/* 密码 */}
        <div>
          <input
            type="password"
            placeholder="密码"
            {...register('password')}
            className="w-full bg-[#2a2926] text-yellow-50 border border-yellow-600 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
        </div>

        {/* 错误提示 */}
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        {/* 注册按钮 */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-700 hover:bg-green-600 text-black font-bold py-3 rounded transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Image
            src="/cat.png" // 你需要准备一个小猫注册的icon，例如叫 cat-register.png
            alt="Register Cat"
            width={24}
            height={24}
            className="inline-block"
          />
          {isSubmitting ? '注册中...' : '立即注册'}
        </button>
      </form>

      {/* 登录引导 */}
      <div className="text-center mt-8">
        <p className="text-sm text-yellow-200">
          已有账号？{' '}
          <Link href="/login" className="text-yellow-400 underline hover:text-yellow-300 font-bold">
            返回登录
          </Link>
        </p>
      </div>
    </div>
  )
}
