'use server'

import * as z from 'zod'
import bcrypt from 'bcryptjs'

import { db } from '@/lib/db'
import { SettingsSchema } from '@/schemas'
import { getUserByEmail, getUserById } from '@/data/user'
import { currentUser } from '@/lib/auth'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'
import { uploadImage } from './cloudinary'
import { isUrl } from '@/util/Image'

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser()

  if (!user) {
    return { error: 'Unauthorized!' }
  }

  const dbUser = await getUserById(user.id as string)

  if (!dbUser) {
    return { error: 'Unauthorized!' }
  }

  if (user.isOAuth) {
    values.email = undefined
    values.password = undefined
    values.newPassword = undefined
    values.isTwoFactorEnabled = undefined
    values.image = undefined
    values.phone = undefined
  }

  // if (values.image && values.image[0]) {
  //   values.image = await uploadImage(values.image[0] as any)
  // }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email)

    if (existingUser && existingUser.id !== user.id) {
      return { error: 'Email is already taken!' }
    }

    const verificationToken = await generateVerificationToken(values.email)
    await sendVerificationEmail(
      verificationToken.token,
      verificationToken.email,
      existingUser?.name!
    )

    return { success: 'Verification email sent!' }
  }

  if (values.password && values.password && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    )

    if (!passwordsMatch) {
      return { error: 'Current password is incorrect!' }
    }

    if (!values.newPassword) {
      values.password = undefined
    }

    if (values.newPassword) {
      const hashedPassword = await bcrypt.hash(values.newPassword!, 10)
      values.password = hashedPassword
    }

    values.newPassword = undefined
  }

  try {
    const updateData = { ...values }
    
    if (values.image && values.image[0]) {
      updateData.image = await uploadImage(values.image[0] as any)
    } else {
      updateData.image = undefined // Ensure image is not updated if not provided
    }

    const newUser = await db.user.update({
      where: { id: dbUser.id },
      data: updateData,
    })
  } catch (e) {
    console.log(e)
    return { error: 'Something went wrong!' }
  }

  return { success: 'Settings updated!' }
}
