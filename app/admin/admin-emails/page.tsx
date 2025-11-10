'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Plus, Trash2, Shield, User, AlertCircle } from 'lucide-react'

type AdminEmail = {
  id: string
  email: string
  addedBy?: string
  isDefault: boolean
  createdAt: Date
  updatedAt: Date
}

export default function AdminEmailsPage() {
  const [adminEmails, setAdminEmails] = useState<AdminEmail[]>([])
  const [loading, setLoading] = useState(true)
  const [newEmail, setNewEmail] = useState('')
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchAdminEmails()
  }, [])

  const fetchAdminEmails = async () => {
    try {
      const response = await fetch('/api/admin-emails')
      const data = await response.json()
      if (data.success) {
        setAdminEmails(data.adminEmails || [])
      }
    } catch (error) {
      console.error('Error fetching admin emails:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setAdding(true)

    try {
      const response = await fetch('/api/admin-emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newEmail })
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(`Successfully added ${newEmail} to admin list`)
        setNewEmail('')
        fetchAdminEmails()
      } else {
        setError(data.error || 'Failed to add email')
      }
    } catch (error) {
      setError('Failed to add email')
    } finally {
      setAdding(false)
    }
  }

  const handleDeleteEmail = async (id: string, email: string) => {
    if (!confirm(`Are you sure you want to remove ${email} from the admin list?`)) {
      return
    }

    try {
      const response = await fetch(`/api/admin-emails/${id}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(`Removed ${email} from admin list`)
        fetchAdminEmails()
      } else {
        setError(data.error || 'Failed to remove email')
      }
    } catch (error) {
      setError('Failed to remove email')
    }
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Email Management</h1>
          <p className="text-muted-foreground">
            Manage who can access the admin portal. Only users with emails in this list can sign up and access admin features.
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg flex items-center gap-2"
          >
            <AlertCircle className="w-5 h-5" />
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-green-500/10 border border-green-500/50 text-green-500 px-4 py-3 rounded-lg"
          >
            {success}
          </motion.div>
        )}

        {/* Add Email Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-lg border p-6 mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Plus className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-semibold">Add New Admin</h2>
          </div>

          <form onSubmit={handleAddEmail} className="flex gap-3">
            <div className="flex-1">
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full px-4 py-2 rounded-lg border bg-background"
                required
                disabled={adding}
              />
            </div>
            <button
              type="submit"
              disabled={adding || !newEmail}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {adding ? 'Adding...' : 'Add Email'}
            </button>
          </form>

          <p className="mt-3 text-sm text-muted-foreground">
            Once added, this email can be used to sign up and access the admin portal.
          </p>
        </motion.div>

        {/* Admin Emails List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-lg border p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-green-500" />
            <h2 className="text-xl font-semibold">Authorized Admin Emails</h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading admin emails...</p>
            </div>
          ) : adminEmails.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No admin emails found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {adminEmails.map((admin) => (
                <motion.div
                  key={admin.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        admin.isDefault
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-blue-500/10 text-blue-500'
                      }`}>
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{admin.email}</p>
                          {admin.isDefault && (
                            <span className="px-2 py-1 text-xs bg-green-500/20 text-green-500 rounded-full font-medium">
                              Default Admin
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          {admin.addedBy && (
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              Added by: {admin.addedBy}
                            </span>
                          )}
                          <span>
                            Added: {new Date(admin.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {!admin.isDefault && (
                      <button
                        onClick={() => handleDeleteEmail(admin.id, admin.email)}
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Remove from admin list"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 bg-blue-500/10 border border-blue-500/50 rounded-lg p-6"
        >
          <h3 className="font-semibold text-blue-500 mb-2 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            How It Works
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Only emails in this list can access the admin portal</li>
            <li>• Users must still sign up with Clerk using their authorized email</li>
            <li>• Default admins (musanhunyasha@outlook.com, dennytech84@gmail.com) cannot be removed</li>
            <li>• You can add additional admin emails at any time</li>
            <li>• Removing an email immediately revokes their admin access</li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}
