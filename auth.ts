import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import { db } from '@/lib/db'
import authConfig from './auth.config'
import { getUserById } from '@/data/user'
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation'
import { getAccountByUserId } from './data/account'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
    signOut: '/',
  },
  events: {
    async linkAccount({ user }) {
      if (user.id) {
        await db.user.update({
          where: { id: user.id },
          data: {
            emailVerified: new Date(),
          },
        })
      }
    },
  },

  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
})
