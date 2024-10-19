import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, MapPin, Phone } from 'lucide-react'

import React from 'react'
import { Navbar } from '../(protected)/_components/navbar'

function Page() {
  return (
    <main className="flex-1">
      <Navbar />
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Contact Us
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                We&apos;re here to help and answer any question you might have.
                We look forward to hearing from you.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6" />
                <div>
                  <h3 className="font-bold">Email</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Our friendly team is here to help.
                  </p>
                  <p className="text-sm">hello@acme.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6" />
                <div>
                  <h3 className="font-bold">Phone</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Mon-Fri from 8am to 5pm.
                  </p>
                  <p className="text-sm">+1 (555) 000-0000</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="h-6 w-6" />
                <div>
                  <h3 className="font-bold">Office</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Come say hello at our office HQ.
                  </p>
                  <p className="text-sm">
                    123 Sample St, San Francisco, CA 94105
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
                    First name
                  </label>
                  <Input
                    id="first-name"
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="last-name"
                  >
                    Last name
                  </label>
                  <Input
                    id="last-name"
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="email"
                >
                  Email
                </label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  required
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="message"
                >
                  Message
                </label>
                <Textarea
                  className="min-h-[100px]"
                  id="message"
                  placeholder="Enter your message"
                  required
                />
              </div>
              <Button className="w-full" type="submit">
                Send message
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Page
