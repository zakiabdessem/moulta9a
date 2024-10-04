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
  const { nextUrl } = req
  const isLogedIn = !!req.auth

  // Define the prefixes and route lists
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isApiRoute = nextUrl.pathname.startsWith('/api/')

  // Helper function to check if the current route matches public routes
  const isPublicRoute = (pathname: string): boolean =>
    publicRoutes.some((route) => {
      if (typeof route === 'string') {
        return pathname === route
      } else if (route instanceof RegExp) {
        return route.test(pathname)
      }
      return false // In case an unsupported type is encountered
    })

  // Check if the current route matches authentication routes
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  // Check if the route is a public API route or a general public route
  const isPublicApiRoute = isApiRoute && isPublicRoute(nextUrl.pathname)
  const isGeneralPublicRoute = !isApiRoute && isPublicRoute(nextUrl.pathname)

  // Log the results
  console.log('Is Public Route:', isPublicRoute(nextUrl.pathname))
  console.log('Is Public API Route:', isPublicApiRoute)
  console.log('Is Auth Route:', isAuthRoute)

  if (isApiAuthRoute) {
    return null
  }

  if (isAuthRoute) {
    if (isLogedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return null
  }

  if (!isLogedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname
    if (nextUrl.search) {
      callbackUrl += nextUrl.search
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl)

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    )
  }

  return null
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
