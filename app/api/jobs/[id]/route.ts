import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    // Calculate totals
    const totalExpenses =
      (body.laborCost || 0) +
      (body.materialsCost || 0) +
      (body.equipmentCost || 0) +
      (body.transportCost || 0) +
      (body.essentialsCost || 0)

    const profit = (body.revenue || 0) - totalExpenses

    // Update job with new fields
    const updatedJob = await prisma.booking.update({
      where: { id },
      data: {
        jobYear: body.jobYear,
        jobMonth: body.jobMonth,
        jobQuarter: body.jobQuarter,
        revenue: body.revenue,
        totalExpenses,
        profit,
        laborCost: body.laborCost,
        materialsCost: body.materialsCost,
        equipmentCost: body.equipmentCost,
        transportCost: body.transportCost,
        essentialsCost: body.essentialsCost,
        jobBreakdown: body.jobBreakdown,
        status: body.status,
        // Legacy fields for backward compatibility
        allocatedBudget: body.revenue || body.allocatedBudget,
        actualCost: totalExpenses || body.actualCost,
      },
    })

    return NextResponse.json({ success: true, job: updatedJob })
  } catch (error) {
    console.error('Error updating job:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update job' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const job = await prisma.booking.findUnique({
      where: { id },
    })

    if (!job) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, job })
  } catch (error) {
    console.error('Error fetching job:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch job' },
      { status: 500 }
    )
  }
}
