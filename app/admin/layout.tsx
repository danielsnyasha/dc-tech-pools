import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { DEFAULT_ADMIN_EMAILS, isDefaultAdmin, normalizeEmail } from '@/lib/admin-auth'
import AdminNavClient from './AdminNavClient'

/**
 * Seeding the three defaults is a once-per-boot job, not a per-request one.
 * Running it inline on every navigation cost three sequential Atlas
 * round-trips each time, which is a visible delay on every page in the portal.
 * The promise is cached so concurrent requests share one pass, and cleared on
 * failure so a transient outage doesn't disable seeding for the process.
 */
let seedPromise: Promise<unknown> | null = null

function seedDefaultAdminsOnce() {
  if (!seedPromise) {
    seedPromise = Promise.all(
      DEFAULT_ADMIN_EMAILS.map((email) =>
        prisma.adminEmail.upsert({
          where: { email },
          create: { email, isDefault: true, addedBy: 'system' },
          update: { isDefault: true },
        })
      )
    ).catch((error) => {
      seedPromise = null
      throw error
    })
  }
  return seedPromise
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // auth() reads the session JWT locally; currentUser() is a network call to
  // Clerk. Prefer the claim when it's present and only pay for the round-trip
  // when it isn't, so adding `email` to the session token in the Clerk
  // dashboard removes that hop entirely. The fallback is what keeps this
  // correct today, since Clerk does not include email in the token by default.
  const { userId, sessionClaims } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const claimEmail =
    typeof sessionClaims?.email === 'string' ? sessionClaims.email : undefined

  let clerkUserId = userId
  let userEmail = normalizeEmail(claimEmail)

  if (!userEmail) {
    const user = await currentUser()
    if (!user) {
      redirect('/sign-in')
    }
    clerkUserId = user.id
    userEmail = normalizeEmail(user.emailAddresses[0]?.emailAddress)
  }

  if (!userEmail) {
    redirect('/unauthorized')
  }

  // The three defaults are authorized from code alone, so their access never
  // depends on the database being reachable.
  const isDefault = isDefaultAdmin(userEmail)

  let authorized = isDefault
  let dbUnavailable = false
  let requestStatus = 'pending'

  if (!isDefault) {
    // Everyone else is authorized only by a record one of the three created.
    try {
      const adminRecord = await prisma.adminEmail.findUnique({ where: { email: userEmail } })

      if (adminRecord) {
        authorized = true
      } else {
        const existing = await prisma.accessRequest.findUnique({ where: { email: userEmail } })

        if (!existing) {
          // First time this person knocks - put them before the three admins.
          await prisma.accessRequest.create({
            data: { email: userEmail, clerkUserId, status: 'pending' },
          })
        } else if (existing.status === 'approved') {
          // Approved before but the AdminEmail row is gone - access was revoked.
          await prisma.accessRequest.update({
            where: { email: userEmail },
            data: { status: 'denied', clerkUserId },
          })
          requestStatus = 'denied'
        } else {
          // A denied request stays denied; retrying must not re-queue them.
          requestStatus = existing.status
        }
      }
    } catch (error) {
      // Can't verify them, so don't admit them - fail closed.
      console.error('[admin] database unavailable while authorizing:', error)
      dbUnavailable = true
    }
  }

  // redirect() throws internally, so it must never sit inside a try/catch.
  if (!authorized) {
    if (dbUnavailable) {
      redirect('/unauthorized?error=db')
    }
    redirect(`/unauthorized?email=${encodeURIComponent(userEmail)}&status=${requestStatus}`)
  }

  // Authorized from here on. Housekeeping runs in parallel and is best-effort,
  // so a database hiccup degrades the portal instead of locking admins out.
  let pendingRequestsCount = 0

  try {
    const [, count] = await Promise.all([
      seedDefaultAdminsOnce(),
      prisma.accessRequest.count({ where: { status: 'pending' } }),
    ])
    pendingRequestsCount = count
  } catch (error) {
    console.error('[admin] database unavailable for seeding/badge count:', error)
  }

  return (
    <AdminNavClient pendingRequestsCount={pendingRequestsCount}>
      {children}
    </AdminNavClient>
  )
}
