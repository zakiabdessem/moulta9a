'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CalendarDays, MapPin, Search } from 'lucide-react'
import { useEvents } from '@/hooks/use-event'
import { Event } from '@prisma/client'
import moment from 'moment'
import { Navbar } from '../(protected)/_components/navbar'
import { Skeleton } from '@/components/ui/skeleton'
import { truncateContent } from '@/lib/utils'
import Footer from '@/components/footer'

export default function AllEvents() {
  const [searchTerm, setSearchTerm] = useState('')

  const { data: events, isLoading: isLoadingEvent } = useEvents() || []

  const filteredEvents =
    events &&
    (events as Event[])?.length > 0 &&
    (events as any).filter((event: Event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">All Events</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-grow">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoadingEvent &&
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="flex flex-col">
                <Skeleton className="w-full h-48 rounded-t-lg" />
                <CardHeader>
                  <Skeleton className="h-6 w-1/2" />
                </CardHeader>
                <CardContent className="flex-grow">
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-1/3" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}

          {!isLoadingEvent &&
            filteredEvents &&
            (filteredEvents as any).map((event: Event) => {
              const date = moment(event.createdAt).format('MMMM Do YYYY')
              return (
                <Card key={event.id} className="flex flex-col">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground mb-4">
                      {truncateContent(event.description, 500)}
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {date}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-2 h-4 w-4" />
                      {event.location}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}

          {!isLoadingEvent && (filteredEvents as any)?.length === 0 && (
            <p className="text-center text-muted-foreground mt-8">
              No events found matching your criteria.
            </p>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}
