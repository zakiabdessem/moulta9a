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

  // Helper function to check if the current route matches public routes
  const isPublicRoute = (pathname: string): boolean =>
    publicRoutes.some((route) => {
      if (typeof route === 'string') {
        return pathname === route
      } else if (typeof route !== 'string' && (route as RegExp)) {
        return (route as any).test(pathname)
      }
      return false
    })

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
    return // Allow API auth routes to pass through without redirection
  }

  // Handle Auth Routes (Login, Signup) and redirect if logged in
  // if (isAuthRoute) {
  //   if (isLogedIn) {
  //     return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
  //   }
  //   return null
  // }

  // If the route is not public and the user is not logged in, redirect to login page
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

  // If no redirection is required, allow access
  return
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
