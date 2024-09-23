import EventImage from '@/public/event-image.png'
import BlogCard from './blogCard'
import Speaker from '@/public/speaker.jpg'

const blogPosts = [
  {
    id: 1,
    title: '10 Things to help you with social stress.',
    description:
      'Lorem ipsum dolor sit amet, consectetur Pellentesque sit amet sapien fringilla, mattis mattis tellus. Nullam quis imperdiet augue. Vestibulum.',
    image: EventImage,
    author: {
      name: 'Abdelhakim Farah',
      avatar: Speaker,
    },
    date: 'April 14th, 2023',
  },
  {
    id: 2,
    title: 'The summer 2023 lineup is finally here.',
    description:
      'Lorem ipsum dolor sit amet, consectetur Pellentesque sit amet sapien fringilla, mattis mattis tellus. Nullam quis imperdiet augue. Vestibulum.',
    image: EventImage,
    author: {
      name: 'Abdelhakim Farah',
      avatar: Speaker,
    },
    date: 'April 14th, 2023',
  },
  {
    id: 3,
    title: '10 Things to help you with social stress.',
    description:
      'Lorem ipsum dolor sit amet, consectetur Pellentesque sit amet sapien fringilla, mattis mattis tellus. Nullam quis imperdiet augue. Vestibulum.',
    image: EventImage,
    author: {
      name: 'Abdelhakim Farah',
      avatar: Speaker,
    },
    date: 'April 14th, 2023',
  },
  {
    id: 4,
    title: 'The summer 2023 lineup is finally here.',
    description:
      'Lorem ipsum dolor sit amet, consectetur Pellentesque sit amet sapien fringilla, mattis mattis tellus. Nullam quis imperdiet augue. Vestibulum.',
    image: EventImage,
    author: {
      name: 'Abdelhakim Farah',
      avatar: Speaker,
    },
    date: 'April 14th, 2023',
  },
  {
    id: 5,
    title: 'The summer 2023 lineup is finally here.',
    description:
      'Lorem ipsum dolor sit amet, consectetur Pellentesque sit amet sapien fringilla, mattis mattis tellus. Nullam quis imperdiet augue. Vestibulum.',
    image: EventImage,
    author: {
      name: 'Abdelhakim Farah',
      avatar: Speaker,
    },
    date: 'April 14th, 2023',
  },
]

export default function BlogSection() {
  return (
    <section className="max-w-screen-2xl w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Blogs
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {blogPosts.map((post) => (
            <BlogCard post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
