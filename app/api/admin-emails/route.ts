import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin, isDefaultAdmin } from '@/lib/admin-auth'

// GET all admin emails
export async function GET() {
  const check = await requireAdmin()
  if (!check.ok) {
    return NextResponse.json({ success: false, error: check.error }, { status: check.status })
  }

  try {
    const adminEmails = await prisma.adminEmail.findMany({
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
    })

    return NextResponse.json({ success: true, adminEmails })
  } catch (error) {
    console.error('Error fetching admin emails:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch admin emails' },
      { status: 500 }
    )
  }
}

// POST - authorize a new admin email
export async function POST(request: NextRequest) {
  const check = await requireAdmin()
  if (!check.ok) {
    return NextResponse.json({ success: false, error: check.error }, { status: check.status })
  }

  try {
    const body = await request.json()
    const { email } = body

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const normalized = email.trim().toLowerCase()

    const existing = await prisma.adminEmail.findUnique({ where: { email: normalized } })

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Email already has admin access' },
        { status: 400 }
      )
    }

    const adminEmail = await prisma.adminEmail.create({
      data: {
        email: normalized,
        addedBy: check.email,
        isDefault: isDefaultAdmin(normalized),
      },
    })

    // If they had a request on file, this grant resolves it.
    try {
      await prisma.accessRequest.update({
        where: { email: normalized },
        data: { status: 'approved', decidedBy: check.email },
      })
    } catch {
      // No request on file — added directly by an admin.
    }

    return NextResponse.json({ success: true, adminEmail }, { status: 201 })
  } catch (error) {
    console.error('Error adding admin email:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to add admin email' },
      { status: 500 }
    )
  }
}
