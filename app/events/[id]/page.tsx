'use client'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, MapPin, Share2, Star, Ticket, Users } from 'lucide-react'
import EventImage from '@/public/event-image.png'
import Speaker from '@/public/speaker.jpg'
import Image from 'next/image'

export default function Page() {
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
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
                <span className='text-sm'>September 15-17, 2023</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-gray-500" />
                <span className='text-sm'>9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-gray-500" />
                <span className='text-sm'>San Francisco, CA</span>
              </div>
            </div>
            <div className="mb-6 px-12">
              <h1 className="text-3xl font-bold text-gray-900 font-poppins py-4">
                Tech Conference 2023
              </h1>

              <h2 className="mb-2 text-2xl font-bold">About the Event</h2>
              <p className="text-gray-600">
                Join us for the biggest tech conference of the year! Tech
                Conference 2023 brings together industry leaders, innovators,
                and tech enthusiasts for three days of inspiring talks,
                workshops, and networking opportunities. Explore the latest
                trends in AI, blockchain, cybersecurity, and more.
              </p>
            </div>
            <div className="mb-6 px-12">
              <h2 className="mb-2 text-2xl font-bold">Speakers</h2>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {[1, 2, 3].map((speaker) => (
                  <div key={speaker} className="flex items-center space-x-4">
                    <Image
                      alt={`Speaker ${speaker}`}
                      className="h-12 w-12 rounded-full object-cover"
                      height="48"
                      src={Speaker}
                      style={{
                        aspectRatio: '48/48',
                        objectFit: 'cover',
                      }}
                      width="48"
                    />
                    <div>
                      <p className="font-semibold">Speaker Name</p>
                      <p className="text-sm text-gray-500">
                        Company / Position
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* <div className="mb-6">
              <h2 className="mb-2 text-2xl font-bold">Schedule</h2>
              <div className="space-y-4">
                {['Day 1', 'Day 2', 'Day 3'].map((day) => (
                  <div
                    key={day}
                    className="rounded-lg border bg-white p-4 shadow"
                  >
                    <h3 className="mb-2 font-semibold">{day}</h3>
                    <ul className="list-inside list-disc space-y-2">
                      <li>9:00 AM - Opening Keynote</li>
                      <li>11:00 AM - Workshop Sessions</li>
                      <li>2:00 PM - Panel Discussion</li>
                      <li>4:00 PM - Networking Event</li>
                    </ul>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
          <div>
            <div className="sticky top-6 space-y-6">
              <div className="rounded-lg border bg-white p-6 shadow">
                <h2 className="mb-4 text-xl font-semibold">Event Details</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Users className="mr-2 h-5 w-5 text-gray-500" />
                    <span>500 attendees</span>
                  </div>
                  <div className="flex items-center">
                    <Ticket className="mr-2 h-5 w-5 text-yellow-500" />
                    <span>1000 da / Personne</span>
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
              <div className="rounded-lg border bg-white p-6 shadow">
                <h2 className="mb-4 text-xl font-semibold">Location</h2>
                <Image
                  alt="Event location map"
                  className="mb-4 h-48 w-full rounded object-cover"
                  height="192"
                  src={EventImage}
                  style={{
                    aspectRatio: '384/192',
                    objectFit: 'cover',
                  }}
                  width="384"
                />
                <p className="mb-2 font-semibold">Tech Conference Center</p>
                <p className="text-gray-600">
                  123 Innovation Street, San Francisco, CA 94105
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
