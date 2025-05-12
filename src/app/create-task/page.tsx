'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTask } from "@/lib/endpoints";
import { useEffect, useState } from "react";
import { clearDraft, loadDraft, saveDraft } from "@/lib/draft";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useAutoToast } from "@/hooks/use-auto-toast";
import { Task } from "@/types/model";

const schema = z.object({
  title: z.string().min(3, '标题至少3个字符'),
  description: z.string().min(10, '描述至少10个字符'),
  rewardType: z.enum(['ONLINE', 'OFFLINE'], { required_error: '请选择奖励类型' }),
  amount: z.coerce.number().min(1, '奖励金额必须大于0').optional(),
  currency: z.enum(['USD', 'CNY']).optional(),
  rewardNote: z.string().optional(),
  link: z.string().url('请输入有效的URL').optional(),
})

type FormData = z.infer<typeof schema>

export default function CreateTaskPage() {
  const t = useTranslations('CreateTaskPage');
  const autoToast = useAutoToast()
  const [initialValues, setInitialValues] = useState<Partial<FormData>>({})


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
    console.log('watchedValues', watchedValues)
    if (!watchedValues.title && !watchedValues.description && !watchedValues.rewardType) {
      clearDraft()
      return
    }
    saveDraft(watchedValues)
  }, [watchedValues])

  const mutation = useMutation({
    mutationFn: async (data: FormData) => createTask(data),
    onSuccess: ({task}:{task:Task}) => {
      reset({
        title: '',
        description: '',
        rewardType: 'OFFLINE',
        amount: undefined,
        currency: undefined,
        rewardNote: '',
        link: '',
      })
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      autoToast.success('createTaskSuccess', { icon: '✅' })
      setTimeout(() => {
        router.push(`/tasks/${task.id}`)
      },  1500);
    },
    onError: (err: any) => {
      autoToast.error('createTaskError', { icon: '❌' })
    },
  })

  const onSubmit = (data: FormData) => {
    mutation.mutate(data)
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 bg-gradient-to-br from-[#1c1b18] to-[#2d2c28] rounded-xl border border-[#8c7853] shadow-md">
      <h1 className="text-3xl font-extrabold text-center text-yellow-100 mb-8 tracking-widest italic">
        📜 {t('title')}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* 标题 */}
        <div>
          <input
            {...register('title')}
            placeholder={t('taskTitlePlaceholder')}
            className="w-full bg-[#2a2926] text-yellow-50 border border-yellow-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600"
          />
          {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
        </div>

        {/* 描述 */}
        <div>
          <textarea
            {...register('description')}
            placeholder={t('taskContentPlaceholder')}
            rows={4}
            className="w-full bg-[#2a2926] text-yellow-50 border border-yellow-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600"
          />
          {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
        </div>

        {/* 奖励类型（按钮组样式的单选） */}
        <div className="flex gap-3">
          {/* ONLINE - 禁用 */}
          <label
            className={`flex-1 text-center p-3 rounded border transition-all
      ${watchedValues.rewardType === 'ONLINE'
              ? 'bg-gray-500 text-black border-gray-500'
              : 'bg-[#2a2926] text-yellow-50 border-yellow-700'}
      opacity-50 cursor-not-allowed`}
          >
            <input
              {...register('rewardType')}
              type="radio"
              value="ONLINE"
              className="sr-only"
              disabled
            />
            {t('ONLINE')}
          </label>

          {/* OFFLINE - 可选 */}
          <label
            className={`flex-1 text-center p-3 rounded border cursor-pointer transition-all
      ${watchedValues.rewardType === 'OFFLINE'
              ? 'bg-yellow-500 text-black border-yellow-500'
              : 'bg-[#2a2926] text-yellow-50 border-yellow-700'}`}
          >
            <input
              {...register('rewardType')}
              type="radio"
              value="OFFLINE"
              className="sr-only"
            />
            {t('OFFLINE')}
          </label>
        </div>

        {errors.rewardType && (
          <p className="text-red-400 text-xs mt-1">{errors.rewardType.message}</p>
        )}

        {/* 线下奖励备注 */}
        {watchedValues.rewardType === 'OFFLINE' && (
          <div>
            <input
              {...register('rewardNote')}
              placeholder={t('rewardNote')}
              className="w-full bg-[#2a2926] text-yellow-50 border border-yellow-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
            {errors.rewardNote && <p className="text-red-400 text-xs mt-1">{errors.rewardNote.message}</p>}
          </div>
        )}

        {/* 任务链接 */}
        <div>
          <input
            {...register('link')}
            placeholder={t('taskLinkPlaceholder')}
            className="w-full bg-[#2a2926] text-yellow-50 border border-yellow-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600"
          />
          {errors.link && <p className="text-red-400 text-xs mt-1">{errors.link.message}</p>}
        </div>

        {/* 发布按钮 */}
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
          {mutation.isPending ? t('submitting') : t('submit')}
        </button>

      </form>
    </div>
  )
}
