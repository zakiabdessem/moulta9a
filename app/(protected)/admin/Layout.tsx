'use client'
import React from 'react'
import Sidebar from '../_components/Sidebar'
import Navigation from '../_components/Navigation'
import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth() // Suspicious, possibly causing the issue

  return (
    <SessionProvider session={session}>
      <div className="bg-gray-100 scrollbar scrollbar-w-3 scrollbar-thumb-rounded-[0.25rem] scrollbar-track-slate-200 scrollbar-thumb-gray-400 min-h-[100vh]">
        <Sidebar />
        <div className="flex-grow p-4 sm:ml-64">
          <div className="h-full p-4 rounded-lg ">
            {/* <NavbarDashboard />*/}

            <main>
              <Navigation />
              <div className="p-4">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </SessionProvider>
  )
}
