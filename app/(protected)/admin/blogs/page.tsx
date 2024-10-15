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
import Navigation from '../../_components/Navigation'
import Sidebar from '../../_components/Sidebar'

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
    <div className="bg-gray-100 scrollbar scrollbar-w-3 scrollbar-thumb-rounded-[0.25rem] scrollbar-track-slate-200 scrollbar-thumb-gray-400 min-h-[100vh]">
      <Sidebar />
      <div className="flex-grow p-4 sm:ml-64">
        <div className="h-full p-4 rounded-lg ">
          {/* <NavbarDashboard />*/}

          <main>
            <Navigation />
            <div className="p-4">
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
                  {blogs && blogs.length > 0 && (
                    <ProductTable blogs={blogs || []} />
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
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
