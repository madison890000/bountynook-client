import { ReactQueryClientProvider } from '@/lib/react-query-client'
import { NavBar } from '@/components/NavBar'
import { Toaster } from 'react-hot-toast'
import { NextIntlClientProvider } from 'next-intl'
import {getLocale} from 'next-intl/server';
import './globals.css'

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
      </body>
    </html>
  )
}
