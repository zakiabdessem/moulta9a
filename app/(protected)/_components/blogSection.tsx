import EventImage from '@/public/event-image.png'
import BlogCard from './blogCard'
import Speaker from '@/public/speaker.jpg'
import { Blog } from '@prisma/client'
import Language from '@/public/language.json'
import { useLanguage } from '@/zustand'

export default function BlogSection({
  blogs,
}: {
  blogs: (Blog & {
    user: {
      name: string
      image: string
    }
  })[]
}) {
  const { language } = useLanguage() as { language: 'en' | 'ar' }

  return (
    <section
      id="blogs"
      className="container max-w-screen-2xl w-full py-12 md:py-24 lg:py-32"
    >
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          {Language.blogsSection.title[language]}
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {blogs && blogs.map((post) => <BlogCard key={post.id} post={post} />)}
        </div>
      </div>
    </section>
  )
}
