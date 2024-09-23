import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'

import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Moulta9a',
  description: 'Moulta9a is a platform for managing events.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
     
          <Toaster />
          {children}
        </body>
      </html>
    </SessionProvider>
  )
}
