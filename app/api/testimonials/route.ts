import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const testimonial = await prisma.testimonial.create({
      data: {
        customerName: body.customerName,
        rating: body.rating,
        comment: body.comment,
        serviceType: body.serviceType,
        isApproved: false,
      },
    });

    return NextResponse.json(
      { success: true, testimonial },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const approved = searchParams.get("approved");

    const testimonials = await prisma.testimonial.findMany({
      where:
        approved !== null
          ? { isApproved: approved === "true" }
          : undefined,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, testimonials });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
