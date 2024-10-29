'use client'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Share2, Ticket, Users } from 'lucide-react'
import EventImage from '@/public/event-image.png'
import Speaker from '@/public/speaker.jpg'
import Image from 'next/image'
import { Navbar } from '@/app/(protected)/_components/navbar'
import { useParams } from 'next/navigation'
import { useEvent } from '@/hooks/use-event'
import moment from 'moment'
import { Skeleton } from '@/components/ui/skeleton'
import axios from 'axios'
import { useCurrentUser } from '@/hooks/use-current-user'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import Footer from '@/components/footer'
import { useLanguage } from '@/zustand'
import Language from '@/public/language.json'

export default function Page() {
  const { language } = useLanguage() as { language: 'en' | 'ar' }

  const user = useCurrentUser()
  const { id } = useParams<{ id: string }>()
  const { data, isLoading } = useEvent(id)
  const [paymentMethod, setPaymentMethod] = useState('CASH')
  const [enrolled, setEnrolled] = useState(false)

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    return toast.success("Event's link copied to clipboard")
  }

  const startDate = moment(data?.dateRangeFrom)
  const endDate = moment(data?.dateRangeTo)

  const isSameDay = endDate.diff(startDate, 'days') <= 1

  const formattedStartDate = startDate.format('MMMM D, YYYY')
  const formattedEndDate = endDate.format('D, YYYY')

  const dateRange = isSameDay
    ? formattedStartDate
    : `${formattedStartDate} - ${formattedEndDate}`

  const handleEnroll = async (payment_type: string) => {
    if (!user) {
      return toast.error('You need to be logged in to enroll in an event')
    }
    try {
      await axios.post(
        `/api/events/enroll/${id}/`,
        {
          payment_type,
        },
        {
          withCredentials: true,
        }
      )
      setEnrolled(true)
      toast.success('You have successfully enrolled in the event')
    } catch (error) {
      console.error('🚀 ~ error:', error)
      if (axios.isAxiosError(error) && error.response) {
        return toast.error(String(error.response.data.error))
      } else {
        return toast.error('An unknown error occurred')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 bg-white rounded-xl shadow-sm">
              <Skeleton className="mb-6 h-64 w-full rounded-lg rounded-b-none" />
              <div className="mb-6 flex flex-wrap gap-4 px-12">
                <div className="flex items-center">
                  <Skeleton className="mr-2 h-5 w-5" />
                  <Skeleton className="text-sm w-32" />
                </div>
                <div className="flex items-center">
                  <Skeleton className="mr-2 h-5 w-5" />
                  <Skeleton className="text-sm w-32" />
                </div>
              </div>
              <div className="mb-6 px-12">
                <Skeleton className="text-3xl font-bold text-gray-900 font-poppins py-4 w-3/4" />
                <h2 className="mb-2 text-2xl font-bold">
                  <Skeleton className="w-1/2" />
                </h2>
                <Skeleton className="text-gray-600 w-full h-16" />
              </div>
              <div className="mb-6 px-12">
                <h2 className="mb-2 text-2xl font-bold">
                  <Skeleton className="w-1/4" />
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div>
                        <Skeleton className="font-semibold w-32" />
                        <Skeleton className="text-sm text-gray-500 w-48" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="sticky top-6 space-y-6">
                <div className="rounded-lg border bg-white p-6 shadow">
                  <h2 className="mb-4 text-xl font-semibold">
                    <Skeleton className="w-1/4" />
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Skeleton className="mr-2 h-5 w-5" />
                      <Skeleton className="w-20" />
                    </div>
                    <div className="flex items-center">
                      <Skeleton className="mr-2 h-5 w-5" />
                      <Skeleton className="w-20" />
                    </div>
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 bg-white rounded-xl shadow-sm">
              <Image
                alt="Tech Conference 2023"
                className="mb-6 h-64 w-full rounded-lg rounded-b-none object-cover sm:h-96"
                height="584"
                src={data?.image ?? ''}
                style={{
                  aspectRatio: '768/584',
                  objectFit: 'cover',
                }}
                width="768"
              />
              <div className="mb-6 flex flex-wrap gap-4 px-12">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-gray-500" />
                  <span className="text-sm">{dateRange}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-gray-500" />
                  <span className="text-sm">{data?.location}</span>
                </div>
              </div>
              <div className="mb-6 px-12">
                <h1 className="text-3xl font-bold text-gray-900 font-poppins py-4">
                  {data?.title}
                </h1>

                <h2 className="mb-2 text-2xl font-bold">About the Event</h2>
                <p className="text-gray-600">{data?.description}</p>
              </div>
              {data?.speakers && data?.speakers?.length > 1 && (
                <div className="mb-6 px-12">
                  <h2 className="mb-2 text-2xl font-bold">Speakers</h2>
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {data?.speakers.map((speaker) => (
                      <div
                        key={speaker.id}
                        className="flex items-center space-x-4"
                      >
                        <Image
                          alt={`Speaker ${speaker.id}`}
                          className="h-12 w-12 rounded-full object-cover"
                          height="48"
                          src={speaker.image || Speaker}
                          style={{
                            aspectRatio: '48/48',
                            objectFit: 'cover',
                          }}
                          width="48"
                        />
                        <div>
                          <p className="font-semibold">{speaker.name}</p>
                          <p className="text-sm text-gray-500">
                            {speaker.bio.slice(0, 100)}...
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div>
              <div className="sticky top-6 space-y-6">
                <div className="rounded-lg border bg-white p-6 shadow">
                  <h2 className="mb-4 text-xl font-semibold">Event Details</h2>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Users className="mr-2 h-5 w-5 text-gray-500" />
                      <span>{data?.capacity} attendees</span>
                    </div>
                    <div className="flex items-center">
                      <Ticket className="mr-2 h-5 w-5 text-gray-500" />
                      <span>
                        {data?.price} da /{' '}
                        <span className="font-sans text-sm">Personne</span>
                      </span>
                    </div>

                    <Dialog>
                      <DialogTrigger className="w-full">
                        <Button
                          {...(enrolled && { disabled: true })}
                          className="w-full text-white"
                        >
                          Register Now
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="py-4">
                            Payment method
                          </DialogTitle>

                          <div className="pb-4">
                            <Select
                              onValueChange={(value) => setPaymentMethod(value)}
                              value={paymentMethod}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Payment method" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="CHARGILY">
                                  Edahabia
                                </SelectItem>
                                <SelectItem value="CASH">Cash</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <Button
                            onClick={() => handleEnroll(paymentMethod)}
                            {...(enrolled && { disabled: true })}
                            className="w-full text-white"
                          >
                            Register Now
                          </Button>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>

                    <Button
                      onClick={() => handleShare()}
                      className="w-full"
                      variant="outline"
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Event
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
