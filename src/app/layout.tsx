import { ReactQueryClientProvider } from '@/lib/react-query-client'
import { NavBar } from '@/components/NavBar'
import { Toaster } from 'react-hot-toast'
import { NextIntlClientProvider } from 'next-intl'
import {getLocale} from 'next-intl/server';
import { Metadata } from 'next'
import { Analytics } from "@vercel/analytics/react"
import './globals.css'



export const metadata: Metadata = {
  title: {
    default: 'BountyNook - Cozy Quest Hub',
    template: '%s | BountyNook'
  },
  description: 'Pick side quests, earn rewards, and join our bounty community!',
  keywords: ['bounty', 'quests', 'freelance', 'earn money', 'BountyNook', 'side hustle'],
  openGraph: {
    title: 'BountyNook - Cozy Quest Hub',
    description: 'Join BountyNook to discover side quests and rewards!',
    url: 'https://bountynook.com',
    siteName: 'BountyNook',
    images: [
      {
        url: '/og-image.png', // 记得自己加一张
        width: 1200,
        height: 630,
        alt: 'BountyNook Logo'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BountyNook - Side Quests Await!',
    description: 'Pick quests, earn rewards, and enjoy the journey.',
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
      </body>
    </html>
  )
}
