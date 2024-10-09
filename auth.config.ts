import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

import { LoginSchema } from './schemas'
import { getUserByEmail, getUserById } from './data/user'
import { getAccountByUserId } from './data/account'
import { db } from './lib/db'
import { getTwoFactorConfirmationByUserId } from './data/two-factor-confirmation'

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data

          const user = await getUserByEmail(email)
          if (!user || !user.password) return null

          const passwordMatches = await bcrypt.compare(password, user.password)

          if (passwordMatches) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            }
          }
        }

        return null
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth logins without email verification
      if (account?.provider !== 'credentials') {
        return true
      }

      if (!user?.id) {
        console.error('User ID is missing during sign-in process')
        return false
      }

      const existingUser = await getUserById(user.id)

      if (!existingUser?.emailVerified) {
        return false // Prevent sign-in without email verification
      }

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          user.id
        )

        if (!twoFactorConfirmation) {
          return false // Require two-factor confirmation
        }

        // Remove two-factor confirmation after successful sign-in
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        })
      }

      return true
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as string
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.image = token.image as string
        session.user.isOAuth = token.isOAuth as boolean
      }

      return session
    },

    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      const existingAccount = await getAccountByUserId(existingUser.id)

      // Assign token values from the database
      token.isOAuth = !!existingAccount
      token.name = existingUser.name
      token.email = existingUser.email
      token.role = existingUser.role
      token.image = existingUser.image
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

      return token
    },
  },
} satisfies NextAuthConfig
