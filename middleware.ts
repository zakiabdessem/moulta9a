import NextAuth from 'next-auth'
import authConfig from './auth.config'
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from '@/routes'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const user = req.auth?.user
  const { nextUrl } = req
  const isLogedIn = !!req.auth // Check if the user is logged in

  const path = nextUrl.pathname || nextUrl?.pathname // Handle undefined scenarios
  // Check if it's an API auth route
  const isApiAuthRoute = path.startsWith(apiAuthPrefix)

  // Check if it's an admin route
  const isAuthAdminRoute =
    path.startsWith('/admin') || path.startsWith('/api/admin')

  // Check if it's a manager route
  const isAuthManagerRoute =
    path.startsWith('/manager') ||
    path.startsWith('/api/manager') ||
    path.startsWith('/settings/event')

  const isPublicRoute =
    path.startsWith('/') || path.startsWith('/api') || publicRoutes.includes(path)

  // Handle Admin Route Protection
  if (isAuthAdminRoute && (!isLogedIn || user?.role !== 'ADMIN')) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
  }

  // Handle Manager Route Protection
  if (
    isAuthManagerRoute &&
    (!isLogedIn || (user?.role !== 'MANAGER' && user?.role !== 'ADMIN'))
  ) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
  }

  // Allow access to API auth routes without redirecting
  if (isApiAuthRoute) {
    return null // Allow API auth routes to pass through without redirection
  }

  // Handle Auth Routes (Login, Signup) and redirect if logged in
  // if (isAuthRoute) {
  //   if (isLogedIn) {
  //     return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
  //   }
  //   return null
  // }

  // If no redirection is required, allow access
  return null
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
