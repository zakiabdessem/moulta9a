import EventImage from '@/public/event-image.png'
import BlogCard from './blogCard'
import Speaker from '@/public/speaker.jpg'
import { Blog } from '@prisma/client'

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
  return (
    <section className="container max-w-screen-2xl w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Blogs
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {blogs && blogs.map((post) => (
            <BlogCard post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
