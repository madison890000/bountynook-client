// components/UseCaseSection.tsx
'use client'

import { useTranslations } from 'next-intl'
import { FaMapMarkedAlt, FaHome, FaTools, FaPhotoVideo, FaSearchLocation, FaClipboardList } from 'react-icons/fa'

export function UseCaseSection() {
  const t = useTranslations('UseCases')

  const cases = [
    {
      icon: <FaHome className="text-yellow-400 text-2xl" />,
      title: t('lookHouse'),
      description: t('lookHouseDesc')
    },
    {
      icon: <FaTools className="text-yellow-400 text-2xl" />,
      title: t('superviseRenovation'),
      description: t('superviseRenovationDesc')
    },
    {
      icon: <FaSearchLocation className="text-yellow-400 text-2xl" />,
      title: t('verifyShop'),
      description: t('verifyShopDesc')
    },
    {
      icon: <FaPhotoVideo className="text-yellow-400 text-2xl" />,
      title: t('takePhotos'),
      description: t('takePhotosDesc')
    },
    {
      icon: <FaMapMarkedAlt className="text-yellow-400 text-2xl" />,
      title: t('checkQueue'),
      description: t('checkQueueDesc')
    },
    {
      icon: <FaClipboardList className="text-yellow-400 text-2xl" />,
      title: t('surveyFlyers'),
      description: t('surveyFlyersDesc')
    }
  ]

  return (
    <section className="mt-20 px-4">
      <h2 className="text-2xl font-bold text-yellow-100 mb-6 text-center">{t('title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cases.map((item, i) => (
          <div key={i} className="bg-[#2b2924] border border-yellow-800 p-5 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="flex items-start gap-4">
              {item.icon}
              <div>
                <h3 className="text-yellow-100 font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-yellow-200 text-sm">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
