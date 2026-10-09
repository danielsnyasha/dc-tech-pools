import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

let client: PrismaClient | undefined = globalForPrisma.prisma

function getClient(): PrismaClient {
  if (!client) {
    client = new PrismaClient()
    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = client
  }
  return client
}

/**
 * Constructed lazily on first property access.
 *
 * With a missing or invalid DATABASE_URL, Prisma throws from its constructor.
 * Doing that at module scope takes the whole route down with an uncatchable
 * import-time error, so every /admin request 500s even for an admin whose
 * authorization needs no database at all. Deferring construction to first use
 * turns it into an ordinary query-time error that callers can catch.
 */
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const c = getClient()
    const value = Reflect.get(c, prop, c)
    return typeof value === 'function' ? value.bind(c) : value
  },
  has(_target, prop) {
    return prop in getClient()
  },
})
