import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ isAdmin: false }, { status: 400 });
  }

  try {
    const adminEmail = await prisma.adminEmail.findUnique({
      where: { email }
    });

    // If found in database, user is an admin
    if (adminEmail) {
      return NextResponse.json({ isAdmin: true });
    }

    // Default admin emails that should be seeded
    const DEFAULT_ADMIN_EMAILS = [
      'musanhunyasha@outlook.com',
      'dennytech84@gmail.com'
    ];

    // If it's a default admin email but not in database, seed it
    if (DEFAULT_ADMIN_EMAILS.includes(email)) {
      try {
        await prisma.adminEmail.create({
          data: {
            email,
            isDefault: true,
            addedBy: 'system'
          }
        });
        return NextResponse.json({ isAdmin: true });
      } catch (error) {
        // Might already exist (race condition), so just return true
        return NextResponse.json({ isAdmin: true });
      }
    }

    return NextResponse.json({ isAdmin: false });
  } catch (error) {
    console.error('Error checking admin status:', error);
    // On database error, deny access for non-default admins
    return NextResponse.json({ isAdmin: false }, { status: 500 });
  }
}
