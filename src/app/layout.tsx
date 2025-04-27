'use client'

import { ReactQueryClientProvider } from '@/lib/react-query-client'
import { NavBar } from '@/components/NavBar'
import { Toaster } from 'react-hot-toast'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body>
      <ReactQueryClientProvider>
        <NavBar />
        <main className="max-w-6xl mx-auto p-4">{children}</main>
        <Toaster position="top-center" />
      </ReactQueryClientProvider>
    </body>
    </html>
  )
}
