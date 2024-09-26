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

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />

      <div className="max-w-screen-2xl container">
        <h2 className="text-3xl font-semibold text-gray-800 mt-8 mb-4">
          Upcoming Events
        </h2>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          spaceBetween={30}
          slidesPerView={1}
          className="mySwiper"
        >
          <SwiperSlide className="mx-auto max-w-screen-2xl p-4 md:p-6 lg:p-8">
            <EventCard />
          </SwiperSlide>
          <SwiperSlide className="mx-auto max-w-screen-2xl p-4 md:p-6 lg:p-8">
            <EventCard />
          </SwiperSlide>
        </Swiper>
      </div>

      <BlogSection />
    </main>
  )
}
