import { ReactQueryClientProvider } from '@/lib/react-query-client'
import { NavBar } from '@/components/NavBar'
import { Toaster } from 'react-hot-toast'
import { NextIntlClientProvider } from 'next-intl'
import {getLocale} from 'next-intl/server';
import { Metadata } from 'next'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import './globals.css'



export const metadata: Metadata = {
  title: {
    default: 'BountyNook - Your Cozy Quest Hub',
    template: '%s | BountyNook'
  },
  description: 'BountyNook is a community-driven micro-task platform where you can post or pick real-world side quests — from house viewing to renovation supervision.',
  keywords: [
    'bounty', 'side quests', 'microtasks', 'real-world help', 'earn money', 'freelance missions',
    '看房任务', '代办', '异地帮忙', '装修监工', '实地验证', '本地帮手', '跑腿平台', 'BountyNook'
  ],
  openGraph: {
    title: 'BountyNook - Real-life Help Meets Fun',
    description: 'Post real-world tasks and get help from verified local users. BountyNook connects people for unique, location-based missions.',
    url: 'https://bountynook.com',
    siteName: 'BountyNook',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BountyNook - Cozy Quest Platform'
      }
    ],
    locale: 'zh_CN',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Need Help with Offline Tasks? Try BountyNook!',
    description: 'Post a task. Earn a reward. Help or be helped — across cities.',
    images: ['/og-image.png']
  },
  metadataBase: new URL('https://bountynook.com')
}


export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body>
        <ReactQueryClientProvider>
          <NextIntlClientProvider>
            <NavBar />
            <main className="max-w-6xl mx-auto p-4">{children}</main>
            <Toaster position="top-center" />
          </NextIntlClientProvider>
        </ReactQueryClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
