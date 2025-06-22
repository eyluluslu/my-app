import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis

let prisma

try {
  prisma = globalForPrisma.prisma ?? new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query'] : [],
    errorFormat: 'minimal'
  })

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
  }
} catch (error) {
  console.warn('Prisma Client initialization failed:', error.message)
  // Create a mock prisma client for build time when database is not available
  prisma = {
    user: { findUnique: () => null, findMany: () => [], create: () => null },
    siteSettings: { findFirst: () => null, create: () => null, update: () => null },
    heroBanner: { findMany: () => [], create: () => null, update: () => null },
    category: { findMany: () => [] },
    product: { findMany: () => [] },
    message: { findMany: () => [] },
    cart: { findFirst: () => null },
    cartItem: { findMany: () => [] }
  }
}

export { prisma } 