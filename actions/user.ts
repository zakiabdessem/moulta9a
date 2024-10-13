import { db } from '@/lib/db'

export const getUsersAdmin = async () => {
  return await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      createdAt: true,
    },
  })
}

export const update = async (values: any, userId: string) => {
  return await db.user.update({
    where: { id: userId },
    data: values,
  })
}
