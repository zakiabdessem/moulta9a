'use client'
import BlogSection from './(protected)/_components/blogSection'
import EventCard from './(protected)/_components/eventCard'
import Hero from './(protected)/_components/hero'
import { Navbar } from './(protected)/_components/navbar'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import EventImage from '@/public/event-image.png'
import Speaker from '@/public/speaker.jpg'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper/modules'

export default function Home() {
  return (
    <main className="container flex flex-col bg-white">
      <Navbar />

      <Hero />

      <h2 className="text-3xl font-semibold text-gray-800 mt-8 mb-4">
        Upcoming Events
      </h2>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        spaceBetween={30}
        slidesPerView={1}
        className="mySwiper max-w-screen-2xl container"
      >
        <SwiperSlide className="mx-auto max-w-screen-2xl p-4 md:p-6 lg:p-8">
          <EventCard />
        </SwiperSlide>
        <SwiperSlide className="mx-auto max-w-screen-2xl p-4 md:p-6 lg:p-8">
          <EventCard />
        </SwiperSlide>
      </Swiper>

      <BlogSection />
    </main>
  )
}
