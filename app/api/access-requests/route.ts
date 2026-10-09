import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/admin-auth'

// GET - all access requests (admins only)
export async function GET() {
  const check = await requireAdmin()
  if (!check.ok) {
    return NextResponse.json({ success: false, error: check.error }, { status: check.status })
  }

  try {
    const requests = await prisma.accessRequest.findMany({
      orderBy: { updatedAt: 'desc' },
    })

    return NextResponse.json({ success: true, requests })
  } catch (error) {
    console.error('Error fetching access requests:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch access requests' },
      { status: 500 }
    )
  }
}

// PATCH - approve or deny a request
export async function PATCH(request: NextRequest) {
  const check = await requireAdmin()
  if (!check.ok) {
    return NextResponse.json({ success: false, error: check.error }, { status: check.status })
  }

  try {
    const { email, action } = (await request.json()) as {
      email?: string
      action?: 'approve' | 'deny'
    }

    if (!email || !action || !['approve', 'deny'].includes(action)) {
      return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 })
    }

    const existing = await prisma.accessRequest.findUnique({ where: { email } })

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'No such access request' },
        { status: 404 }
      )
    }

    const updated = await prisma.accessRequest.update({
      where: { email },
      data: {
        status: action === 'approve' ? 'approved' : 'denied',
        decidedBy: check.email,
      },
    })

    if (action === 'approve') {
      // Grant portal access going forward.
      await prisma.adminEmail.upsert({
        where: { email },
        create: { email, isDefault: false, addedBy: check.email },
        update: { addedBy: check.email },
      })
    } else {
      // Revoke if they had been approved previously.
      try {
        await prisma.adminEmail.delete({ where: { email } })
      } catch {
        // Never had access — nothing to revoke.
      }
    }

    return NextResponse.json({ success: true, request: updated })
  } catch (error) {
    console.error('Error updating access request:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update access request' },
      { status: 500 }
    )
  }
}
