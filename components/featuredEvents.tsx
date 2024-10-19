'use client'
import { CalendarDays, MapPin, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useEvents } from '@/hooks/use-event'
import { Event } from '@prisma/client'
import moment from 'moment'
import { truncateContent } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect, useState } from 'react'

export default function FeaturedEvents() {
  const { data: events, isLoading: isLoadingEvent } = useEvents()

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoadingEvent &&
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="w-full h-48 object-cover" />
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
            events &&
            (events as Event[]).length > 0 &&
            (events as Event[])?.map((event: Event, index: number) => {
              const date = moment(event.createdAt).format('MMMM Do YYYY')
              return (
                <Card key={index} className="overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground mb-4">
                      {truncateContent(event.description, 150)}
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
                    <a href={`/events/${event.id}`}>
                      <Button variant="outline">Learn More</Button>
                    </a>
                  </CardFooter>
                </Card>
              )
            })}
        </div>

        <div className="text-center mt-12">
          <a href="/events">
            <Button className="group">
              View All Events
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
