import Image from 'next/image'
import React from 'react'
import HeroImage from '@/public/hero-image.png'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/zustand'
import Language from '@/public/language.json'

function Hero() {
  const { language } = useLanguage() as { language: 'en' | 'ar' }

  return (
    <div className="relative h-[600px] w-full overflow-hidden" dir={language == "ar" ? "rtl" : "ltr" }>
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
            {Language.footer.logoText[language]}
          </h2>
          <h1 className="mb-4 text-4xl font-normal tracking-tight text-white sm:text-5xl lg:text-6xl xl:whitespace-nowrap">
            {Language.heroSection.subtitle[language]}{' '}
            <span className="font-bold">
              <span>{Language.heroSection.subtitleword1[language]}</span> &{' '}
              <span>{Language.heroSection.subtitleword2[language]}</span>
            </span>
          </h1>
          <p className="mb-8 text-xl text-gray-300">
            {Language.heroSection.description[language]}{' '}
          </p>
          <Button className=" text-white bg-primary" size="lg">
            {Language.heroSection.exploreButton[language]}{' '}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Hero
