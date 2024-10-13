import { db } from '@/lib/db'

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        password: true,
        emailVerified: true,
        isTwoFactorEnabled: true,
        phone: true,
      },
      where: {
        email,
      },
    })

    return user
  } catch {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        password: true,
        image: true,
        emailVerified: true,
        isTwoFactorEnabled: true,
        phone: true,
      },
      where: {
        id,
      },
    })

    return user
  } catch {
    return null
  }
}
