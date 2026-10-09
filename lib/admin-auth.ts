import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

/**
 * The only three accounts with admin access by default. They cannot be
 * removed, and everyone else needs one of them to approve their request
 * from inside the portal.
 */
export const DEFAULT_ADMIN_EMAILS = [
  'danielsnyasha@outlook.com',
  'musanhunyasha@outlook.com',
  'dennytech84@gmail.com',
] as const

/** Emails are compared case-insensitively — Clerk preserves whatever
 * casing the user typed at sign-up, so a capitalised address must not
 * lock a default admin out of their own portal. */
export function normalizeEmail(email: string | null | undefined): string {
  return (email ?? '').trim().toLowerCase()
}

export function isDefaultAdmin(email: string | null | undefined): boolean {
  const normalized = normalizeEmail(email)
  if (!normalized) return false
  return (DEFAULT_ADMIN_EMAILS as readonly string[]).includes(normalized)
}

export type AdminCheck =
  | { ok: true; email: string; isDefault: boolean }
  | { ok: false; status: 401 | 403; error: string }

/**
 * Resolve the signed-in user and confirm they're authorized for the admin
 * portal: one of the three defaults, or an email the three have approved.
 * Anyone can hold a Clerk account, so being signed in is not enough.
 */
export async function requireAdmin(): Promise<AdminCheck> {
  const user = await currentUser()
  const email = normalizeEmail(user?.emailAddresses?.[0]?.emailAddress)

  if (!email) {
    return { ok: false, status: 401, error: 'Not signed in' }
  }

  if (isDefaultAdmin(email)) {
    return { ok: true, email, isDefault: true }
  }

  const approved = await prisma.adminEmail.findUnique({ where: { email } })

  if (!approved) {
    return { ok: false, status: 403, error: 'Not authorized for the admin portal' }
  }

  return { ok: true, email, isDefault: false }
}
