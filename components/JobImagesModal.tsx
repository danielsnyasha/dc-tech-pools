'use client'

import { useState, useRef } from 'react'
import { X, Upload, Download, Trash2, Image as ImageIcon, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import Image from 'next/image'

interface JobImagesModalProps {
  jobId: string
  jobName: string
  images: string[]
  isOpen: boolean
  onClose: () => void
  onUpdate: (images: string[]) => void
}

export default function JobImagesModal({
  jobId,
  jobName,
  images,
  isOpen,
  onClose,
  onUpdate
}: JobImagesModalProps) {
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    // Validate file types
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    const invalidFiles = Array.from(files).filter(file => !validTypes.includes(file.type))

    if (invalidFiles.length > 0) {
      toast.error('Please select only image files (JPG, PNG, WEBP)')
      return
    }

    // Validate file sizes (max 10MB each)
    const oversizedFiles = Array.from(files).filter(file => file.size > 10 * 1024 * 1024)

    if (oversizedFiles.length > 0) {
      toast.error('Each image must be less than 10MB')
      return
    }

    setUploading(true)

    try {
      const formData = new FormData()
      Array.from(files).forEach(file => {
        formData.append('images', file)
      })

      const response = await fetch(`/api/jobs/${jobId}/upload-images`, {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        toast.success(`${files.length} image(s) uploaded successfully!`)
        onUpdate(data.job.completionImages)
      } else {
        toast.error(data.error || 'Failed to upload images')
      }
    } catch (error) {
      console.error('Error uploading images:', error)
      toast.error('Failed to upload images')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleDeleteImage = async (imageUrl: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return

    setDeleting(imageUrl)

    try {
      const response = await fetch(`/api/jobs/${jobId}/upload-images`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl })
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Image deleted successfully!')
        onUpdate(data.job.completionImages)
      } else {
        toast.error(data.error || 'Failed to delete image')
      }
    } catch (error) {
      console.error('Error deleting image:', error)
      toast.error('Failed to delete image')
    } finally {
      setDeleting(null)
    }
  }

  const handleDownloadImage = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${jobName}-${Date.now()}.jpg`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      toast.success('Image downloaded!')
    } catch (error) {
      console.error('Error downloading image:', error)
      toast.error('Failed to download image')
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-card rounded-lg shadow-xl max-w-6xl w-full max-h-[95vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-card border-b p-4 md:p-6 flex items-center justify-between z-10">
            <div>
              <h2 className="text-xl md:text-2xl font-bold">Job Completion Images</h2>
              <p className="text-sm text-muted-foreground">{jobName}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 md:p-6 space-y-6">
            {/* Upload Section */}
            <div className="border-2 border-dashed rounded-lg p-6 md:p-8 text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                disabled={uploading}
              />

              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center">
                  {uploading ? (
                    <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                  ) : (
                    <Upload className="w-8 h-8 text-blue-500" />
                  )}
                </div>

                <div>
                  <p className="font-semibold mb-1">
                    {uploading ? 'Uploading images...' : 'Upload Completion Images'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Click below to select images (JPG, PNG, WEBP - Max 10MB each)
                  </p>
                </div>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {uploading ? 'Uploading...' : 'Select Images'}
                </button>
              </div>
            </div>

            {/* Images Grid */}
            {images.length > 0 ? (
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Uploaded Images ({images.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {images.map((imageUrl, index) => (
                    <motion.div
                      key={imageUrl}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative group rounded-lg overflow-hidden border bg-accent/30"
                    >
                      <div className="aspect-video relative">
                        <Image
                          src={imageUrl}
                          alt={`Job completion ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>

                      {/* Overlay with actions */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleDownloadImage(imageUrl)}
                          className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                          title="Download"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteImage(imageUrl)}
                          disabled={deleting === imageUrl}
                          className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          {deleting === imageUrl ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <Trash2 className="w-5 h-5" />
                          )}
                        </button>
                      </div>

                      {/* Image number badge */}
                      <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                        #{index + 1}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <ImageIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No images uploaded yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Upload images to document job completion
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-card border-t p-4 md:p-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg border hover:bg-accent transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
