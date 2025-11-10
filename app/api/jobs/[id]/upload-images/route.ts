import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const formData = await request.formData()
    const files = formData.getAll('images') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No images provided' },
        { status: 400 }
      )
    }

    // Upload images to Cloudinary
    const uploadPromises = files.map(async (file) => {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      return new Promise<string>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'dc-tech-pools/job-completions',
            resource_type: 'image',
          },
          (error, result) => {
            if (error) reject(error)
            else resolve(result!.secure_url)
          }
        )

        uploadStream.end(buffer)
      })
    })

    const imageUrls = await Promise.all(uploadPromises)

    // Update job with new image URLs
    const job = await prisma.booking.findUnique({
      where: { id },
      select: { completionImages: true }
    })

    const updatedImages = [...(job?.completionImages || []), ...imageUrls]

    const updatedJob = await prisma.booking.update({
      where: { id },
      data: {
        completionImages: updatedImages,
      },
    })

    return NextResponse.json({
      success: true,
      images: imageUrls,
      job: updatedJob
    })
  } catch (error) {
    console.error('Error uploading images:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload images' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { imageUrl } = body

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: 'No image URL provided' },
        { status: 400 }
      )
    }

    // Extract public_id from Cloudinary URL
    const urlParts = imageUrl.split('/')
    const fileWithExtension = urlParts[urlParts.length - 1]
    const publicId = `dc-tech-pools/job-completions/${fileWithExtension.split('.')[0]}`

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId)

    // Remove from database
    const job = await prisma.booking.findUnique({
      where: { id },
      select: { completionImages: true }
    })

    const updatedImages = (job?.completionImages || []).filter(url => url !== imageUrl)

    const updatedJob = await prisma.booking.update({
      where: { id },
      data: {
        completionImages: updatedImages,
      },
    })

    return NextResponse.json({
      success: true,
      job: updatedJob
    })
  } catch (error) {
    console.error('Error deleting image:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete image' },
      { status: 500 }
    )
  }
}
