import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Only protect /admin routes and admin-specific API routes
const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
  '/api/admin-emails(.*)',
  '/api/jobs(.*)'
])

// Default admin emails (fallback if database isn't accessible)
const DEFAULT_ADMIN_EMAILS = [
  'musanhunyasha@outlook.com',
  'dennytech84@gmail.com'
]

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    const { userId, sessionClaims } = auth()

    // If not authenticated at all, require sign in
    if (!userId) {
      auth.protect()
      return
    }

    // Get user's primary email from sessionClaims
    const userEmail = sessionClaims?.email as string | undefined

    if (!userEmail) {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }

    // Check if email is in the default whitelist - if yes, allow access
    if (DEFAULT_ADMIN_EMAILS.includes(userEmail)) {
      return NextResponse.next()
    }

    // For non-default emails, deny access
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
