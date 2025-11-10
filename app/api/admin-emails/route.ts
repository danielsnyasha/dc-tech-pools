import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth, currentUser } from '@clerk/nextjs/server'

// GET all admin emails
export async function GET() {
  try {
    const adminEmails = await prisma.adminEmail.findMany({
      orderBy: [
        { isDefault: 'desc' },
        { createdAt: 'desc' }
      ]
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

// POST - Add new admin email
export async function POST(request: NextRequest) {
  try {
    const user = await currentUser()
    const currentUserEmail = user?.emailAddresses?.[0]?.emailAddress || 'system'

    const body = await request.json()
    const { email } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existing = await prisma.adminEmail.findUnique({
      where: { email }
    })

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Email already exists in admin list' },
        { status: 400 }
      )
    }

    // Create new admin email
    const adminEmail = await prisma.adminEmail.create({
      data: {
        email,
        addedBy: currentUserEmail,
        isDefault: false
      }
    })

    return NextResponse.json({ success: true, adminEmail }, { status: 201 })
  } catch (error) {
    console.error('Error adding admin email:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to add admin email' },
      { status: 500 }
    )
  }
}
