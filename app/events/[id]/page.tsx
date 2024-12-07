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
    return toast.success(Language.single_event.share_event[language])
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
      return toast.error(Language.single_event.register_now[language])
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
      toast.success(Language.single_event.register_now[language])
    } catch (error) {
      console.error('🚀 ~ error:', error)
      if (axios.isAxiosError(error) && error.response) {
        return toast.error(String(error.response.data.error))
      } else {
        return toast.error(Language.single_event.register_now[language])
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
              {/* Loading state content here */}
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 bg-white rounded-xl shadow-sm">
              <Image
                alt="Event Image"
                className="mb-6 h-64 w-full rounded-lg rounded-b-none object-cover sm:h-96"
                height="584"
                src={data?.image ?? EventImage}
                style={{ aspectRatio: '768/584', objectFit: 'cover' }}
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
                <h2 className="mb-2 text-2xl font-bold">
                  {Language.single_event.title[language]}
                </h2>
                <p className="text-gray-600">
                  <div
                    dangerouslySetInnerHTML={{ __html: data?.description ?? ""}}
                  ></div>
                </p>
              </div>
              {data?.speakers && data?.speakers?.length > 1 && (
                <div className="mb-6 px-12">
                  <h2 className="mb-2 text-2xl font-bold">
                    {Language.single_event.Speakers[language]}
                  </h2>
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
                          style={{ aspectRatio: '48/48', objectFit: 'cover' }}
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
                  <h2 className="mb-4 text-xl font-semibold">
                    {Language.single_event.attendees[language]}
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Users className="mr-2 h-5 w-5 text-gray-500" />
                      <span>
                        {data?.capacity}{' '}
                        {Language.single_event.attendees[language]}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Ticket className="mr-2 h-5 w-5 text-gray-500" />
                      <span>
                        {data?.price} {Language.single_event.da[language]} /{' '}
                        <span className="font-sans text-sm">
                          {Language.single_event.personne[language]}
                        </span>
                      </span>
                    </div>
                    <Dialog>
                      <DialogTrigger className="w-full">
                        <Button
                          {...(enrolled && { disabled: true })}
                          className="w-full text-white"
                        >
                          {Language.single_event.register_now[language]}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="py-4">
                            {Language.single_event.payment_method[language]}
                          </DialogTitle>
                          <div className="pb-4">
                            <Select
                              onValueChange={(value) => setPaymentMethod(value)}
                              value={paymentMethod}
                            >
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={
                                    Language.single_event.payment_method[
                                      language
                                    ]
                                  }
                                />
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
                            {Language.single_event.register_now[language]}
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
                      {Language.single_event.share_event[language]}
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
