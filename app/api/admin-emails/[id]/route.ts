import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

// DELETE admin email
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Check if this is a default admin
    const adminEmail = await prisma.adminEmail.findUnique({
      where: { id }
    })

    if (!adminEmail) {
      return NextResponse.json(
        { success: false, error: 'Admin email not found' },
        { status: 404 }
      )
    }

    if (adminEmail.isDefault) {
      return NextResponse.json(
        { success: false, error: 'Cannot delete default admin emails' },
        { status: 403 }
      )
    }

    await prisma.adminEmail.delete({
      where: { id }
    })

    return NextResponse.json({ success: true, message: 'Admin email removed' })
  } catch (error) {
    console.error('Error deleting admin email:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete admin email' },
      { status: 500 }
    )
  }
}
