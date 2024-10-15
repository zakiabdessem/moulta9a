'use client'
import React from 'react'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { useBlog } from '@/hooks/use-blog'
import { useParams } from 'next/navigation'
import { Navbar } from '@/app/(protected)/_components/navbar'
import { Skeleton } from '@/components/ui/skeleton'

export default function Page() {
  const { id } = useParams<{ id: string }>()
  const { data: post, isLoading } = useBlog(id)

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Link href="/" passHref>
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <article className="bg-white rounded-lg overflow-hidden">
            {/* Skeleton for Image */}
            <Skeleton className="w-full h-[400px]" />
            <div className="p-6">
              {/* Skeleton for Title */}
              <Skeleton className="h-8 w-3/4 mb-4" />
              <div className="flex items-center mb-6">
                {/* Skeleton for Avatar */}
                <Skeleton className="h-10 w-10 rounded-full mr-4" />
                <div>
                  {/* Skeleton for User Name */}
                  <Skeleton className="h-4 w-24 mb-2" />
                  {/* Skeleton for Date */}
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
              {/* Skeleton for Content */}
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-2/3 mb-2" />
            </div>
          </article>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Link href="/" passHref>
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <article className="bg-white rounded-lg overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            width={800}
            height={400}
            className="w-full h-[400px] object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center mb-6">
              <Avatar className="h-10 w-10 mr-4">
                <AvatarImage
                  src={post.user.image ?? 'd'}
                  alt={post.user.name ?? 'S'}
                />
                <AvatarFallback>{post.user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{post.user.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>
      </main>
    </div>
  )
}
