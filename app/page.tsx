'use client'
import BlogSection from './(protected)/_components/blogSection'
import EventCard from './(protected)/_components/eventCard'
import Hero from './(protected)/_components/hero'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay } from 'swiper/modules'
import { Navbar } from './(protected)/_components/navbar'
import { useUpcomingEvents } from '@/hooks/use-event'
import { Event } from '@prisma/client'
import { useBlogs } from '@/hooks/use-blog'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import Footer from '../components/footer'
import FeaturedEvents from '../components/featuredEvents'

export default function Home() {
  const { data: events, error, isLoading: isLoadingEvent } = useUpcomingEvents()
  const { data: blogs, isLoading: isLoadingBlog } = useBlogs()

  return (
    <main>
      <ToastContainer />
      <Navbar />
      <Hero />

      <div className="max-w-screen-2xl container">
        {events && events.length > 0 && (
          <h2 className="text-3xl font-semibold text-gray-800 mt-8 mb-4">
            Upcoming Events
          </h2>
        )}

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          spaceBetween={30}
          slidesPerView={1}
          className="mySwiper"
          id="events"
        >
          {isLoadingEvent && (
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 lg:p-8 cursor-pointer">
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="relative">
                  <Skeleton className="h-64 w-full" />
                  <Skeleton className="absolute left-4 top-4 h-8 w-24 rounded bg-gray-900" />
                </div>
                <div className="grid gap-6 p-6 md:grid-cols-3">
                  <div className="md:col-span-2">
                    <div className="mb-4 flex justify-between items-center gap-2">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-24 mt-1" />
                      </div>
                      <Skeleton className="h-8 w-16 rounded bg-gray-900" />
                    </div>
                    <Skeleton className="h-8 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-10 w-32 mt-4" />
                  </div>
                  <div className="rounded-lg bg-gray-100 p-4 max-md:hidden">
                    <div className="mb-4 text-center">
                      <Skeleton className="mx-auto h-20 w-20 rounded-full" />
                      <Skeleton className="mt-2 h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2 mt-1" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              </div>
            </div>
          )}
          {events &&
            !isLoadingEvent &&
            events?.length > 0 &&
            events?.map(
              (
                event: Event & {
                  user: {
                    name: string
                    image: string
                  }
                  speakers: {
                    name: string
                    bio: string
                    image: string
                  }[]
                }
              ) => (
                <SwiperSlide
                  key={event.id}
                  className="mx-auto max-w-screen-2xl p-4 md:p-6 lg:p-8"
                >
                  <EventCard event={event} />
                </SwiperSlide>
              )
            )}
        </Swiper>
      </div>

      <FeaturedEvents />

      {!isLoadingBlog && <BlogSection blogs={blogs} />}

      <Footer />
    </main>
  )
}
