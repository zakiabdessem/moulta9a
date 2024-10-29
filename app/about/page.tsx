'use client'
import Footer from '@/components/footer'
import { Navbar } from '../(protected)/_components/navbar'
import Language from '@/public/language.json'
import { useLanguage } from '@/zustand'

export default function Page() {
  const { language } = useLanguage() as { language: 'en' | 'ar' }

  return (
    <main dir={language == 'ar' ? 'rtl' : 'ltr'}>
      <Navbar />
      <div className="max-w-5xl flex flex-col justify-center items-center py-4 px-6">
        <h1 className="text-4xl font-semibold">
          {Language.about.title[language]}
        </h1>
        <section className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {Language.about.who_are_we.title[language]}
          </h2>
          <p className="text-gray-600 mb-4">
            {Language.about.who_are_we.content[language]}
          </p>
        </section>

        <section className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {Language.about.our_mission.title[language]}
          </h2>
          <p className="text-gray-600">
            {Language.about.our_mission.content[language]}
          </p>
        </section>

        <section className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {Language.about.our_vision.title[language]}
          </h2>
          <p className="text-gray-600">
            {Language.about.our_vision.content[language]}
          </p>
        </section>

        <section className="bg-white rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {Language.about.our_goals.title[language]}
          </h2>
          <ul className="space-y-4">
            {Language.about.our_goals.content[language].map((goal, index) => (
              <li key={index} className="flex">
                <span className="text-gray-600">{goal}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <Footer />
    </main>
  )
}
