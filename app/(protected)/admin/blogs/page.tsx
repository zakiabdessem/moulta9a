'use client'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DEFAULT_URL } from '@/routes'
import { CheckboxIcon } from '@radix-ui/react-icons'
import { PlusIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import moment from 'moment'
import { Blog } from '@prisma/client'
import { useAdminBlog } from '@/hooks/use-blog'
import Image from 'next/image'

export default function Page() {
  const [blogs, setBlogs] = React.useState<Blog[] | undefined>(undefined)

  useEffect(() => {
    async function FetchBlogs() {
      const blogs = await useAdminBlog()
      setBlogs(blogs)
    }

    FetchBlogs()
  }, [])

  return (
    <div className="bg-white rounded-md">
      <div className="flex max-sm:flex-col justify-between p-2">
        <a href={`${DEFAULT_URL}/admin/blogs/create`}>
          <Button className="text-white">
            <PlusIcon className="mr-2" width={16} height={16} />
            Create Blog
          </Button>
        </a>
      </div>
      <div className="bg-white rounded-md">
        {blogs && blogs.length > 0 && <ProductTable blogs={blogs || []} />}
      </div>
    </div>
  )
}

function ProductTable({ blogs }: { blogs: Blog[] }) {
  return (
    <Table>
      <TableCaption className="p-2">
        A table for all of your blogs.
      </TableCaption>
      <TableHeader>
        <TableRow className="bg-gray-50">
          <TableHead className="w-[50px]"></TableHead>

          <TableHead>CreatedAt</TableHead>
          <TableHead>Titre</TableHead>
          <TableHead>Image</TableHead>

          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {blogs &&
          Array.isArray(blogs) &&
          blogs.length > 0 &&
          blogs.map((blog) => {
            const date = moment(blog.createdAt.toString()).format('LLL')
            return (
              <TableRow key={blog.id}>
                <TableCell className="max-h-16 max-w-16">
                  <CheckboxIcon />
                </TableCell>
                <TableCell className="font-medium text-gray-400">
                  {date}
                </TableCell>
                <TableCell className="max-h-16 max-w-16 font-medium">
                  {blog.title.toUpperCase()}
                </TableCell>
                <TableCell className="max-h-16 max-w-16">
                  <Image
                    src={blog.image}
                    alt={blog.id + 'Image'}
                    className="w-48 h-32"
                    width={192}
                    height={128}
                  />
                </TableCell>
              </TableRow>
            )
          })}
      </TableBody>
    </Table>
  )
}
