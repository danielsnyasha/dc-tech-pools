import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  const check = await requireAdmin()
  if (!check.ok) {
    return NextResponse.json({ error: check.error }, { status: check.status })
  }

  try {
    const body = await request.json()

    // Create new job
    const newJob = await prisma.booking.create({
      data: {
        customerName: body.customerName,
        email: body.email,
        phone: body.phone,
        serviceType: body.serviceType,
        poolSize: body.poolSize,
        address: body.address,
        city: body.city,
        postalCode: body.postalCode,
        preferredDate: new Date(body.preferredDate),
        preferredTime: body.preferredTime,
        message: body.message,
        status: body.status,
        jobYear: body.jobYear,
        jobMonth: body.jobMonth,
        jobQuarter: body.jobQuarter,
        revenue: body.revenue,
        totalExpenses: body.totalExpenses,
        profit: body.profit,
        laborCost: body.laborCost,
        materialsCost: body.materialsCost,
        equipmentCost: body.equipmentCost,
        transportCost: body.transportCost,
        essentialsCost: body.essentialsCost,
        jobBreakdown: body.jobBreakdown || [],
        // Legacy fields for backward compatibility
        allocatedBudget: body.revenue,
        actualCost: body.totalExpenses,
      },
    })

    return NextResponse.json({ success: true, job: newJob })
  } catch (error) {
    console.error('Error creating job:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create job' },
      { status: 500 }
    )
  }
}
