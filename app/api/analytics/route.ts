import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from '@/lib/admin-auth'

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

export async function GET(request: NextRequest) {
  const check = await requireAdmin()
  if (!check.ok) {
    return NextResponse.json({ success: false, error: check.error }, { status: check.status })
  }

  try {
    const { searchParams } = new URL(request.url);
    const days = Math.min(Math.max(parseInt(searchParams.get("days") || "30"), 1), 365);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    const analytics = await prisma.analytics.findMany({
      where: { date: { gte: startDate } },
      orderBy: { date: "asc" },
    });

    // The Analytics table only gains a row on days that had a booking, so a raw
    // series draws a line straight across empty stretches as if they were data.
    // Fill every day in the window so gaps read as the zeros they are.
    const byDay = new Map<string, number>();
    for (const row of analytics) {
      byDay.set(new Date(row.date).toISOString().slice(0, 10), row.bookingsCount);
    }
    const bookingsTrend: { date: string; bookings: number }[] = [];
    for (let i = 0; i <= days; i++) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      const key = d.toISOString().slice(0, 10);
      bookingsTrend.push({ date: key, bookings: byDay.get(key) ?? 0 });
    }

    const [totalBookings, pendingBookings, completedBookings, totalTestimonials] =
      await Promise.all([
        prisma.booking.count(),
        prisma.booking.count({ where: { status: "pending" } }),
        prisma.booking.count({ where: { status: "completed" } }),
        prisma.testimonial.count(),
      ]);

    const avgRating = await prisma.testimonial.aggregate({ _avg: { rating: true } });

    const recentBookings = await prisma.booking.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
    });

    const serviceGroups = await prisma.booking.groupBy({
      by: ["serviceType"],
      _count: { serviceType: true },
      orderBy: { _count: { serviceType: "desc" } },
    });
    // Flatten so the chart binds a plain key instead of a nested "_count.x" path.
    const serviceDistribution = serviceGroups.map((s) => ({
      serviceType: s.serviceType,
      count: s._count.serviceType,
    }));

    const statusGroups = await prisma.booking.groupBy({
      by: ["status"],
      _count: { status: true },
    });
    const statusBreakdown = statusGroups.map((s) => ({
      status: s.status,
      count: s._count.status,
    }));

    // Real money, from the job fields the admin fills in on /admin/jobs.
    const financeRows = await prisma.booking.findMany({
      where: { jobYear: { not: null }, jobMonth: { not: null } },
      select: { jobYear: true, jobMonth: true, revenue: true, profit: true },
    });
    const financeMap = new Map<string, { label: string; revenue: number; profit: number; sort: number }>();
    for (const r of financeRows) {
      const y = r.jobYear as number;
      const m = r.jobMonth as number;
      const key = `${y}-${String(m).padStart(2, "0")}`;
      const entry = financeMap.get(key) ?? {
        label: `${MONTHS[Math.min(Math.max(m - 1, 0), 11)]} ${String(y).slice(2)}`,
        revenue: 0,
        profit: 0,
        sort: y * 12 + m,
      };
      entry.revenue += r.revenue ?? 0;
      entry.profit += r.profit ?? 0;
      financeMap.set(key, entry);
    }
    const financials = [...financeMap.values()].sort((a, b) => a.sort - b.sort).slice(-12);

    const totalRevenue = financials.reduce((s, f) => s + f.revenue, 0);
    const totalProfit = financials.reduce((s, f) => s + f.profit, 0);

    return NextResponse.json({
      success: true,
      bookingsTrend,
      serviceDistribution,
      statusBreakdown,
      financials,
      recentBookings,
      stats: {
        totalBookings,
        pendingBookings,
        completedBookings,
        totalTestimonials,
        avgRating: avgRating._avg.rating || 0,
        totalRevenue,
        totalProfit,
      },
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
