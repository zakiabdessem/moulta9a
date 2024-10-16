import { ArrowRightIcon } from '@radix-ui/react-icons'
import moment from 'moment'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import React from 'react'

interface BlogPost {
  id: string
  title: string
  content: string
  image: string | StaticImageData
  user: {
    name: string
    image: string | StaticImageData
  }
  createdAt: string | Date
}
function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article
      key={post.id}
      className="group relative rounded-lg border shadow-md transition-shadow hover:shadow-lg"
    >
      <Image
        alt={post.title}
        className="mb-4 h-60 w-full rounded-md object-cover"
        height="240"
        src={post.image}
        style={{
          aspectRatio: '400/240',
          objectFit: 'cover',
        }}
        width="400"
      />
      <div className="p-6">
        <div className="flex items-center gap-4">
          <Image
            alt={`${post.user.name}'s avatar`}
            className="rounded-full"
            height="40"
            src={post.user.image}
            style={{
              aspectRatio: '40/40',
              objectFit: 'cover',
            }}
            width="40"
          />
          <div className="flex-1">
            <h3 className="font-semibold">{post.user.name}</h3>
            <p className="text-sm text-gray-500">
              {moment(post.createdAt).format('MMMM Do, YYYY')}
            </p>
          </div>
        </div>
        <h3 className="mt-4 text-xl font-bold">{post.title}</h3>
        <p className="mt-2 text-gray-500">{post.content}</p>
        <Link
          className="mt-4 inline-flex items-center text-sm font-semibold text-gray-800"
          href={`/blog/${post.id}`}
        >
          Read More
          <ArrowRightIcon className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}

export default BlogCard
