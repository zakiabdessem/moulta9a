'use client'
import { Toaster } from '@/components/ui/sonner'
import React from 'react'
import Sidebar from '../_components/Sidebar'
import Navigation from '../_components/Navigation'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-100 scrollbar scrollbar-w-3 scrollbar-thumb-rounded-[0.25rem] scrollbar-track-slate-200 scrollbar-thumb-gray-400 min-h-[100vh]">
      <Toaster />

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
  )
}

export default Layout
