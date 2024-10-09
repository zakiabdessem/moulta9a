'use client'
import { Button } from '@/components/ui/button'
import {
  Calendar,
  Clock,
  LocateIcon,
  MapPin,
  Share2,
  Star,
  Ticket,
  Users,
} from 'lucide-react'
import EventImage from '@/public/event-image.png'
import Speaker from '@/public/speaker.jpg'
import Image from 'next/image'
import { Navbar } from '@/app/(protected)/_components/navbar'
import { useParams } from 'next/navigation'
import { useEvent } from '@/hooks/use-event'
import moment from 'moment'
import { Skeleton } from '@/components/ui/skeleton'

export default function Page() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading } = useEvent(id)

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
  }

  const formattedStartDate = moment(data?.dateRangeFrom).format('MMMM D, YYYY')
  const formattedEndDate = moment(data?.dateRangeTo).format('D, YYYY')

  const dateRange = `${formattedStartDate}-${formattedEndDate}`

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
                height="384"
                src={EventImage}
                style={{
                  aspectRatio: '768/384',
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
                      <Ticket className="mr-2 h-5 w-5 text-yellow-500" />
                      <span>{data?.price} da / Personne</span>
                    </div>
                    <Button className="w-full text-white" size="lg">
                      Register Now
                    </Button>
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
    </div>
  )
}
