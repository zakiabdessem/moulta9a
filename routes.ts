const ASSETS_BASE_URL = '@/public'
/**
 * An array of routes that are publicly accessible.
 * These routes do not require authentication.
 *
 * @type {string[]}
 */

export const publicRoutes = [
  '/',
  '/auth/new-verification',
  '/events/',
  '/auth/login',
  '/auth/register',
  '/auth/error',
  '/auth/reset',
  '/auth/new-password',
]

/**
 * An array of routes that are used for authentication.
 * These routes will redirect loged in users to the /settings route.
 *
 * @type {string[]}
 */
export const authRoutes = ['/api/admin', '/admin', '/api/manager', '/manager']

/**
 * The prefix for our auth API Route
 * Routes with this prefix are used for API Authentication Purposes.
 *
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth'

/**
 * The default redirect path after logging in.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/'

/**
 * The default path to the website.
 * @type {string}
 */
export const DEFAULT_URL =
  process.env.NEXT_PUBLIC_DEFAULT_URL || 'http://localhost:3000/'

export function asset(path: string) {
  // NOTE: Fetching remote assets from the Hugo admin dashboard Vercel dist.
  return `${ASSETS_BASE_URL}/${path}`
}
