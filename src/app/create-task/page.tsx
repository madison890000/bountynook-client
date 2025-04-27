'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTask } from "@/lib/endpoints";
import { AuthGuardButton } from "@/components/AuthGuardButton";
import { useEffect, useState } from "react";
import { clearDraft, loadDraft, saveDraft } from "@/lib/draft";
import { toast } from "react-hot-toast";
import { getUserInfo } from "@/lib/auth"
import { ProfileLinkButton } from "@/components/ProfileLinkButton";
import Image from "next/image";

const schema = z.object({
  title: z.string().min(3, '标题至少3个字符'),
  description: z.string().min(10, '描述至少10个字符'),
  rewardType: z.enum(['ONLINE', 'OFFLINE'], { required_error: '请选择奖励类型' }),
  amount: z.coerce.number().min(1, '奖励金额必须大于0').optional(),
  currency: z.enum(['USD', 'CNY']).optional(),
  rewardNote: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export default function CreateTaskPage() {
  const [initialValues, setInitialValues] = useState<Partial<FormData>>({})
  const [user, setUser] = useState<any>(null)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  })

  const watchedValues = watch()
  const router = useRouter()
  const queryClient = useQueryClient()

  useEffect(() => {
    const draft = loadDraft()
    if (draft) {
      setInitialValues(draft)
      reset(draft)
    }
  }, [reset])

  useEffect(() => {
    const info = getUserInfo()
    setUser(info)
  }, [])

  useEffect(() => {
    if (!watchedValues.title && !watchedValues.description && !watchedValues.rewardType) {
      clearDraft()
      return
    }
    saveDraft(watchedValues)
  }, [watchedValues])

  const mutation = useMutation({
    mutationFn: async (data: FormData) => createTask(data),
    onSuccess: () => {
      clearDraft()
      reset()
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('发布成功', { icon: '✅' })
      router.push('/dashboard')
    },
    onError: (err: any) => {
      toast.error(err.message || '发布失败', { icon: '❌' })
    },
  })

  const onSubmit = (data: FormData) => {
    if (!user?.contact) {
      toast.error('请先补充联系方式！', { icon: '📞' })
      setTimeout(() => {
        router.push('/dashboard/profile')
      }, 1500)
      return
    }
    mutation.mutate(data)
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 bg-gradient-to-br from-[#1c1b18] to-[#2d2c28] rounded-xl border border-[#8c7853] shadow-md">
      <h1 className="text-3xl font-extrabold text-center text-yellow-100 mb-8 tracking-widest italic">
        📜 发布新任务
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* 标题 */}
        <div>
          <input
            {...register('title')}
            placeholder="任务标题"
            className="w-full bg-[#2a2926] text-yellow-50 border border-yellow-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600"
          />
          {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
        </div>

        {/* 描述 */}
        <div>
          <textarea
            {...register('description')}
            placeholder="任务描述"
            rows={4}
            className="w-full bg-[#2a2926] text-yellow-50 border border-yellow-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600"
          />
          {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
        </div>

        {/* 奖励类型 */}
        <div>
          <select
            {...register('rewardType')}
            className="w-full bg-[#2a2926] text-yellow-50 border border-yellow-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600"
          >
            <option value="">选择奖励类型</option>
            <option value="ONLINE">线上支付</option>
            <option value="OFFLINE">线下支付</option>
          </select>
          {errors.rewardType && <p className="text-red-400 text-xs mt-1">{errors.rewardType.message}</p>}
        </div>

        {/* 金额和币种 */}
        {watchedValues.rewardType === 'ONLINE' && (
          <>
            <div>
              <input
                {...register('amount')}
                type="number"
                placeholder="奖励金额"
                className="w-full bg-[#2a2926] text-yellow-50 border border-yellow-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
              {errors.amount && <p className="text-red-400 text-xs mt-1">{errors.amount.message}</p>}
            </div>

            <div>
              <select
                {...register('currency')}
                className="w-full bg-[#2a2926] text-yellow-50 border border-yellow-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600"
              >
                <option value="">选择币种</option>
                <option value="USD">美元 (USD)</option>
                <option value="CNY">人民币 (CNY)</option>
              </select>
              {errors.currency && <p className="text-red-400 text-xs mt-1">{errors.currency.message}</p>}
            </div>
          </>
        )}

        {/* 线下奖励备注 */}
        {watchedValues.rewardType === 'OFFLINE' && (
          <div>
            <input
              {...register('rewardNote')}
              placeholder="线下付款备注（如面议）"
              className="w-full bg-[#2a2926] text-yellow-50 border border-yellow-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
            {errors.rewardNote && <p className="text-red-400 text-xs mt-1">{errors.rewardNote.message}</p>}
          </div>
        )}

        {/* 发布按钮 */}
        <AuthGuardButton>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-yellow-700 hover:bg-yellow-600 text-black font-bold py-3 rounded transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Image
              src="/cat.png"
              alt="cat"
              width={34}
              height={34}
              className="inline-block"
            />
            {mutation.isPending ? '发布中...' : '发布任务'}
          </button>
        </AuthGuardButton>

        {/* 补充资料提示 */}
        {user && !user?.contact && (
          <div className="mt-6 bg-yellow-200/20 text-yellow-300 p-4 rounded border border-yellow-600 text-sm">
            你还没有填写联系方式，<ProfileLinkButton>立即完善资料</ProfileLinkButton>，否则无法成功发布任务！
          </div>
        )}
      </form>
    </div>
  )
}
