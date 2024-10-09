import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

import { LoginSchema } from './schemas'
import { getUserByEmail } from './data/user'

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
    async jwt({ token, user }) {
      // If it's the first time the JWT is being created, add the user role to the token
      if (user) {
        token.role = user.role as any
      }
      return token
    },

    async session({ session, token }) {
      // Add the role from the token to the session
      if (token) {
        session.user.role = token.role
      }
      return session
    },
  },
} satisfies NextAuthConfig
