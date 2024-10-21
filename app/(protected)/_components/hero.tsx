import Image from 'next/image'
import React from 'react'
import HeroImage from '@/public/hero-image.png'
import { Button } from '@/components/ui/button'

function Hero() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black to-[#A29C9B]">
        <Image
          alt="Conference hall background"
          className="h-full w-full object-cover opacity-50"
          src={HeroImage}
        />
      </div>
      <div className="relative z-10 flex h-full flex-col items-start justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-300">
            Moulta9a
          </h2>
          <h1 className="mb-4 text-4xl font-normal tracking-tight text-white sm:text-5xl lg:text-6xl xl:whitespace-nowrap">
            Explore the World of{' '}
            <span className="font-bold">Event & Insights</span>
          </h1>
          <p className="mb-8 text-xl text-gray-300">
            Discover events, conferences, concerts & much more
          </p>
          <Button
            className=" text-white bg-primary"
            size="lg"
          >
            Explore
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Hero
