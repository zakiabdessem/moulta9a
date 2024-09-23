import { ArrowRightIcon } from '@radix-ui/react-icons'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import React from 'react'

interface BlogPost {
  id: number
  title: string
  description: string
  image: string | StaticImageData
  author: {
    name: string
    avatar: string | StaticImageData
  }
  date: string
}
function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article
      key={post.id}
      className="group relative rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg"
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
      <div className="flex items-center gap-4">
        <Image
          alt={`${post.author.name}'s avatar`}
          className="rounded-full"
          height="40"
          src={post.author.avatar}
          style={{
            aspectRatio: '40/40',
            objectFit: 'cover',
          }}
          width="40"
        />
        <div className="flex-1">
          <h3 className="font-semibold">{post.author.name}</h3>
          <p className="text-sm text-gray-500">{post.date}</p>
        </div>
      </div>
      <h3 className="mt-4 text-xl font-bold">{post.title}</h3>
      <p className="mt-2 text-gray-500">{post.description}</p>
      <Link
        className="mt-4 inline-flex items-center text-sm font-semibold text-gray-800"
        href={`/blog/${post.id}`}
      >
        Read More
        <ArrowRightIcon className="ml-1 h-4 w-4" />
      </Link>
    </article>
  )
}

export default BlogCard
