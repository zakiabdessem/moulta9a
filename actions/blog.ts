import { currentUser } from '@/lib/auth'
import { uploadImage } from './cloudinary'
import { db } from '@/lib/db'
import { BlogSchema } from '@/schemas'
import { z } from 'zod'
import { isUrl } from '@/util/Image'

export const create = async (values: z.infer<typeof BlogSchema>) => {
  const user = await currentUser()

  if (!user?.id) {
    return { error: 'User not authenticated!' }
  }

  const validatedFields = BlogSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  // Check if the user exists in the database
  const userExists = await db.user.findUnique({
    where: { id: user.id },
  })

  if (!userExists) {
    return { error: 'User does not exist!' }
  }

  try {
    const uploadedImage = isUrl(values.image)
      ? values.image
      : await uploadImage(values.image)

    await db.blog.create({
      data: {
        ...values,
        userId: user.id,
        image: uploadedImage,
      },
    })

    return { success: 'Blog Created successfully!' }
  } catch (error) {
    return { error: 'Blog creation failed due to a foreign key constraint!' }
  }
}

export const getBlogsAdmin = async () => {
  return await db.blog.findMany()
}

export const getBlogs = async () => {
  const blogs = await db.blog.findMany({
    // with user data
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  })
  return blogs
}

export const getBlogsManager = async () => {
  const user = await currentUser()

  if (!user?.id) {
    return { error: 'User not authenticated!' }
  }

  return await db.blog.findMany({
    where: { userId: user?.id },
  })
}

export const remove = async (id: string) => {
  const blog = await db.blog.findUnique({
    where: { id },
  })

  if (!blog) {
    return { error: 'Blog not found!' }
  }

  try {
    await db.blog.delete({
      where: { id },
    })

    return { success: 'Blog deleted successfully!' }
  } catch (error) {
    return { error: 'Blog deletion failed!' }
  }
}

export const getBlogClient = async (id: string) => {
  return await db.blog.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      createdAt: true,
      content: true,
      image: true,
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  })
}
