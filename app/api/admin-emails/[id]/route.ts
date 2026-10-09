import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin, isDefaultAdmin } from '@/lib/admin-auth'

// DELETE - revoke an admin's access
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const check = await requireAdmin()
    if (!check.ok) {
      return NextResponse.json({ success: false, error: check.error }, { status: check.status })
    }
    const callerEmail = check.email

    const { id } = await params

    const adminEmail = await prisma.adminEmail.findUnique({ where: { id } })

    if (!adminEmail) {
      return NextResponse.json(
        { success: false, error: 'Admin email not found' },
        { status: 404 }
      )
    }

    // The three defaults can never be removed, by anyone.
    if (adminEmail.isDefault || isDefaultAdmin(adminEmail.email)) {
      return NextResponse.json(
        { success: false, error: 'Cannot remove a default admin' },
        { status: 403 }
      )
    }

    await prisma.adminEmail.delete({ where: { id } })

    // Mark their request denied so the revoke sticks instead of landing
    // back in the pending queue the next time they open /admin.
    try {
      await prisma.accessRequest.update({
        where: { email: adminEmail.email },
        data: { status: 'denied', decidedBy: callerEmail },
      })
    } catch {
      // They were added directly and never filed a request — nothing to update.
    }

    return NextResponse.json({ success: true, message: 'Access revoked' })
  } catch (error) {
    console.error('Error deleting admin email:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete admin email' },
      { status: 500 }
    )
  }
}
