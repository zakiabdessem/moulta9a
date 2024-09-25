'use server'

import { db } from '@/lib/db'

import bcrypt from 'bcryptjs'
import * as z from 'zod'

import { generateVerificationToken } from '@/lib/tokens'
import { RegisterSchema } from '@/schemas'
import { getUserByEmail } from '@/data/user'
import { sendVerificationEmail } from '@/lib/mail'
import { Prisma } from '@prisma/client'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password, name } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: 'Email is already taken' }
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  const verificationToken = await generateVerificationToken(email)

  // console.log("/actions/register.ts: register: verificationToken", verificationToken);

  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
    name
  )

  return { success: 'Confirmation email sent!' }
}
