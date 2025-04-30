'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signUp } from "@/lib/endpoints";
import Link from 'next/link'
import Image from "next/image";
import { useTranslations } from 'next-intl'

const schema = z.object({
  email: z.string().email({ message: '请输入有效的邮箱地址' }),
  password: z.string().min(6, { message: '密码至少6位' }),
  name: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  const t = useTranslations('RegisterPage')
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
      router.push('/my')
    } catch (err: any) {
      setError(err.message || t('registerFailed'))
    }
  }

  return (
    <div className="max-w-md mx-auto py-14 px-8 bg-gradient-to-br from-[#1c1b18] to-[#2d2c28] border border-yellow-700 rounded-xl shadow-md">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-yellow-100 tracking-widest italic">
        📝 {t('title')}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 邮箱 */}
        <div>
          <input
            type="email"
            placeholder={t('emailPlaceholder')}
            {...register('email')}
            className="w-full bg-[#2a2926] text-yellow-50 border border-yellow-600 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* 昵称 */}
        <div>
          <input
            type="text"
            placeholder={t('namePlaceholder')}
            {...register('name')}
            className="w-full bg-[#2a2926] text-yellow-50 border border-yellow-600 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
        </div>

        {/* 密码 */}
        <div>
          <input
            type="password"
            placeholder={t('passwordPlaceholder')}
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
          className="w-full bg-gradient-to-br from-[#caa76d] to-[#9a7743] text-[#1e1d1a] font-bold py-3 rounded-lg shadow-md hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Image
            src="/cat.png" // ✅ 你可以换成你可爱的小猫注册图标
            alt="Register Cat"
            width={24}
            height={24}
            className="inline-block"
          />
          {isSubmitting ? t('registering') : t('register')}
        </button>
      </form>

      {/* 登录引导 */}
      <div className="text-center mt-8">
        <p className="text-sm text-yellow-200">
          {t('haveAccount')}{' '}
          <Link href="/login" className="text-yellow-400 underline hover:text-yellow-300 font-bold">
            {t('goLogin')}
          </Link>
        </p>
      </div>
    </div>
  )
}
