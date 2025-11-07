import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get("days") || "30");

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    // Get analytics data
    const analytics = await prisma.analytics.findMany({
      where: {
        date: {
          gte: startDate,
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    // Get booking stats
    const totalBookings = await prisma.booking.count();
    const pendingBookings = await prisma.booking.count({
      where: { status: "pending" },
    });
    const completedBookings = await prisma.booking.count({
      where: { status: "completed" },
    });

    // Get testimonials stats
    const totalTestimonials = await prisma.testimonial.count();
    const avgRating = await prisma.testimonial.aggregate({
      _avg: {
        rating: true,
      },
    });

    // Recent bookings
    const recentBookings = await prisma.booking.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });

    // Service type distribution
    const serviceDistribution = await prisma.booking.groupBy({
      by: ["serviceType"],
      _count: {
        serviceType: true,
      },
      orderBy: {
        _count: {
          serviceType: "desc",
        },
      },
    });

    return NextResponse.json({
      success: true,
      analytics,
      stats: {
        totalBookings,
        pendingBookings,
        completedBookings,
        totalTestimonials,
        avgRating: avgRating._avg.rating || 0,
      },
      recentBookings,
      serviceDistribution,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
