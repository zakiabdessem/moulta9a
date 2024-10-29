'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, MapPin, Phone } from 'lucide-react'

import React from 'react'
import { Navbar } from '../(protected)/_components/navbar'
import { useLanguage } from '@/zustand'
import Language from '@/public/language.json'

function Page() {
  const { language } = useLanguage() as { language: 'en' | 'ar' }

  return (
    <main className="flex-1" dir={language == 'ar' ? 'rtl' : 'ltr'}>
      <Navbar />
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                {Language.contact.title[language]}
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                {Language.contact.description[language]}
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6" />
                <div>
                  <h3 className="font-bold">
                    {Language.contact.email.title[language]}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mx-2">
                    {Language.contact.email.description[language]}
                  </p>
                  <p className="text-sm">almultaqua@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6" />
                <div>
                  <h3 className="font-bold">
                    {Language.contact.phone.title[language]}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mx-2">
                    {Language.contact.phone.description[language]}
                  </p>
                  <p
                    className={`text-sm ${
                      language == 'ar' ? 'text-end' : 'text-start'
                    }`}
                    dir="ltr"
                  >
                    +213 (05) 000-0000
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="h-6 w-6" />
                <div>
                  <h3 className="font-bold">
                    {Language.contact.office.title[language]}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mx-2">
                    {Language.contact.office.description[language]}
                  </p>
                  <p className="text-sm">
                    {Language.contact.location[language]}
                  </p>
                </div>
              </div>
            </div>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="first-name"
                  >
                    {Language.contact.firstname.title[language]}
                  </label>
                  <Input
                    id="first-name"
                    placeholder={
                      Language.contact.firstname.placeholder[language]
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="last-name"
                  >
                    {Language.contact.lastname.title[language]}
                  </label>
                  <Input
                    id="last-name"
                    placeholder={
                      Language.contact.lastname.placeholder[language]
                    }
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="email"
                >
                  {Language.contact.emailInput.title[language]}
                </label>
                <Input
                  id="email"
                  placeholder={
                    Language.contact.emailInput.placeholder[language]
                  }
                  required
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="message"
                >
                  {Language.contact.message.title[language]}
                </label>
                <Textarea
                  className="min-h-[100px]"
                  id="message"
                  placeholder={Language.contact.message.placeholder[language]}
                  required
                />
              </div>
              <Button className="w-full" type="submit">
                {Language.contact.sendButton[language]}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Page
