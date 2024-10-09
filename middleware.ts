import NextAuth from 'next-auth'

import authConfig from './auth.config'

const { auth } = NextAuth(authConfig)

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from '@/routes'

export default auth((req) => {
  const user = req.auth?.user
  const { nextUrl } = req
  const isLogedIn = !!req.auth // Check if the user is logged in

  const apiAuthPrefix = '/api/auth' // Assuming apiAuthPrefix is defined somewhere
  // Define the prefixes and route lists
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)

  // Helper function to check if the current route matches public routes
  const isPublicRoute = (pathname: string): boolean =>
    publicRoutes.some((route) => {
      if (typeof route === 'string') {
        return pathname === route
      } else if (route instanceof RegExp) {
        return route.test(pathname)
      }
      return false
    })

  const path = nextUrl.pathname || nextUrl?.pathname // Handle undefined scenarios

  // Check if the current route matches authentication routes
  const isAuthRoute = authRoutes.includes(path)

  // Check if it's an admin route or API admin route
  const isAuthAdminRoute =
    path.startsWith('/admin') || path.startsWith('/api/admin')
  console.log('🚀 ~ auth ~ isAuthAdminRoute:', isAuthAdminRoute)

  // Redirect if trying to access admin routes without being logged in or without the proper role
  if (isAuthAdminRoute && (!isLogedIn || user?.role !== 'ADMIN')) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
  }

  // Allow access to API auth routes without redirecting
  if (isApiAuthRoute) {
    return null
  }

  // If it's an auth route and the user is logged in, redirect to the dashboard or home
  if (isAuthRoute) {
    if (isLogedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return null
  }

  // If the route is not public and the user is not logged in, redirect to the login page with a callback URL
  if (!isLogedIn && !isPublicRoute(path)) {
    let callbackUrl = nextUrl.pathname
    if (nextUrl.search) {
      callbackUrl += nextUrl.search
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl)

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    )
  }

  return null // Allow access to all other routes
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
