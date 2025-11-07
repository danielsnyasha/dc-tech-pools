import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const booking = await prisma.booking.create({
      data: {
        customerName: body.customerName,
        email: body.email,
        phone: body.phone,
        serviceType: body.serviceType,
        poolSize: body.poolSize || null,
        address: body.address,
        city: body.city,
        postalCode: body.postalCode || null,
        preferredDate: new Date(body.preferredDate),
        preferredTime: body.preferredTime,
        message: body.message || null,
        status: "pending",
      },
    });

    // Update analytics
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await prisma.analytics.upsert({
      where: {
        date: today,
      },
      update: {
        bookingsCount: {
          increment: 1,
        },
      },
      create: {
        date: today,
        bookingsCount: 1,
        pageViews: 0,
        contactFormCount: 0,
        avgSatisfaction: 0,
      },
    });

    return NextResponse.json(
      { success: true, booking },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const bookings = await prisma.booking.findMany({
      where: status ? { status } : undefined,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
