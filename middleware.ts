import { clerkMiddleware } from '@clerk/nextjs/server'

/**
 * Only establishes Clerk's auth context. It deliberately does not gate routes:
 * `auth.protect()` answers unauthenticated page requests with a 404 rather than
 * a redirect, which looks like a broken link instead of a sign-in prompt.
 *
 * Authorization lives where it can give a useful answer:
 *   - admin pages  -> app/admin/layout.tsx (redirects to /sign-in or /unauthorized)
 *   - admin APIs   -> requireAdmin() in lib/admin-auth.ts (401/403 JSON)
 */
export default clerkMiddleware()

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
