'use client'

import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Trash2 } from 'lucide-react'
import { Navbar } from '../../_components/navbar'
import { Blog } from '@prisma/client'
import moment from 'moment'
import { useBlogsManager } from '@/hooks/use-blog'
import Image from 'next/image'

export default function Page() {
  const { data: initialBlogs } = useBlogsManager() as { data: Blog[] }

  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs)

  useEffect(() => {
    setBlogs(initialBlogs)
  }, [initialBlogs])

  return (
    <div className="container mx-auto">
      <Navbar />
      <h1 className="text-2xl font-bold mb-5">Blog Manager</h1>
      <Table className="p-12">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs &&
            blogs.length > 0 &&
            blogs?.map((blog) => {
              const date = moment(blog.createdAt.toString()).format('LLL')
              return (
                <TableRow key={blog.id}>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>{date}</TableCell>
                  <TableCell>
                    <Image
                      src={blog.image}
                      className='rounded-lg'
                      height={100}
                      width={120}
                      alt={blog.id}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <a href={`/settings/blog/delete/${blog.id}`}>
                        <Trash2 className="h-4 w-4" />
                      </a>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
    </div>
  )
}
