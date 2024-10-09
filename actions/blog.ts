import { currentUser } from '@/lib/auth'
import { uploadImage } from './cloudinary'
import { db } from '@/lib/db'
import { BlogSchema } from '@/schemas'
import { z } from 'zod'
import { isUrl } from '@/util/Image'

export const create = async (values: z.infer<typeof BlogSchema>) => {
  console.log('🚀 ~ create ~ values:', values)

  const user = await currentUser()
  console.log('🚀 ~ create ~ currentUser:', user)

  if (!user?.id) {
    return { error: 'User not authenticated!' }
  }

  const validatedFields = BlogSchema.safeParse(values)

  if (!validatedFields.success) {
    console.log('🚀 ~ create ~ validatedFields: ', validatedFields.error)
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
    console.error('🚀 ~ create ~ error:', error)
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
