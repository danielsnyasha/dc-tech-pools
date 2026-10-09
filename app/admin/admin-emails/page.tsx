'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Plus, Trash2, Shield, User, AlertCircle, CheckCircle, XCircle, Clock, Bell } from 'lucide-react'

type AdminEmail = {
  id: string
  email: string
  addedBy?: string
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

type AccessRequest = {
  id: string
  email: string
  clerkUserId?: string
  status: 'pending' | 'approved' | 'denied'
  decidedBy?: string
  createdAt: string
  updatedAt: string
}

export default function AdminEmailsPage() {
  const [adminEmails, setAdminEmails] = useState<AdminEmail[]>([])
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [requestsLoading, setRequestsLoading] = useState(true)
  const [newEmail, setNewEmail] = useState('')
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [activeTab, setActiveTab] = useState<'emails' | 'requests'>('emails')

  useEffect(() => {
    fetchAdminEmails()
    fetchAccessRequests()
  }, [])

  const fetchAdminEmails = async () => {
    try {
      const response = await fetch('/api/admin-emails')
      const data = await response.json()
      if (data.success) setAdminEmails(data.adminEmails || [])
    } catch {
      // silent
    } finally {
      setLoading(false)
    }
  }

  const fetchAccessRequests = async () => {
    try {
      const response = await fetch('/api/access-requests')
      const data = await response.json()
      if (data.success) setAccessRequests(data.requests || [])
    } catch {
      // silent
    } finally {
      setRequestsLoading(false)
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
        body: JSON.stringify({ email: newEmail }),
      })
      const data = await response.json()
      if (data.success) {
        setSuccess(`Successfully added ${newEmail} to admin list`)
        setNewEmail('')
        fetchAdminEmails()
      } else {
        setError(data.error || 'Failed to add email')
      }
    } catch {
      setError('Failed to add email')
    } finally {
      setAdding(false)
    }
  }

  const handleDeleteEmail = async (id: string, email: string) => {
    if (!confirm(`Remove ${email} from admin list?`)) return
    try {
      const response = await fetch(`/api/admin-emails/${id}`, { method: 'DELETE' })
      const data = await response.json()
      if (data.success) {
        setSuccess(`Removed ${email} from admin list`)
        fetchAdminEmails()
      } else {
        setError(data.error || 'Failed to remove email')
      }
    } catch {
      setError('Failed to remove email')
    }
  }

  const handleDecision = async (email: string, action: 'approve' | 'deny') => {
    setError('')
    setSuccess('')
    try {
      const response = await fetch('/api/access-requests', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, action }),
      })
      const data = await response.json()
      if (data.success) {
        setSuccess(`${action === 'approve' ? 'Approved' : 'Denied'} access for ${email}`)
        fetchAccessRequests()
        if (action === 'approve') fetchAdminEmails()
      } else {
        setError(data.error || 'Failed to process request')
      }
    } catch {
      setError('Failed to process request')
    }
  }

  const pendingRequests = accessRequests.filter((r) => r.status === 'pending')
  const resolvedRequests = accessRequests.filter((r) => r.status !== 'pending')

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Access Control</h1>
          <p className="text-muted-foreground">
            Manage who can access the admin portal and review access requests from new users.
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg flex items-center gap-2"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-green-500/10 border border-green-500/50 text-green-500 px-4 py-3 rounded-lg flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            {success}
          </motion.div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab('emails')}
            className={`px-5 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === 'emails'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Authorized Admins
            </div>
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-5 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === 'requests'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Access Requests
              {pendingRequests.length > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                  {pendingRequests.length}
                </span>
              )}
            </div>
          </button>
        </div>

        {/* ── TAB: AUTHORIZED ADMINS ── */}
        {activeTab === 'emails' && (
          <>
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
                Once added, this email can sign in and access the admin portal immediately.
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
                <h2 className="text-xl font-semibold">Authorized Emails</h2>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Loading...</p>
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
                          <div className={`p-2 rounded-lg ${admin.isDefault ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'}`}>
                            <Mail className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold">{admin.email}</p>
                              {admin.isDefault && (
                                <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-500 rounded-full font-medium">
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
                              <span>Added: {new Date(admin.createdAt).toLocaleDateString()}</span>
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
          </>
        )}

        {/* ── TAB: ACCESS REQUESTS ── */}
        {activeTab === 'requests' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Pending */}
            <div className="bg-card rounded-lg border p-6 mb-6">
              <div className="flex items-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-amber-500" />
                <h2 className="text-xl font-semibold">Pending Requests</h2>
                {pendingRequests.length > 0 && (
                  <span className="bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold px-2 py-0.5 rounded-full">
                    {pendingRequests.length} pending
                  </span>
                )}
              </div>

              {requestsLoading ? (
                <p className="text-muted-foreground text-center py-8">Loading...</p>
              ) : pendingRequests.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500 opacity-50" />
                  <p className="text-muted-foreground">No pending access requests</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingRequests.map((req) => (
                    <motion.div
                      key={req.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 flex-shrink-0">
                            <User className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold truncate">{req.email}</p>
                            <p className="text-sm text-muted-foreground">
                              Requested: {new Date(req.updatedAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleDecision(req.email, 'approve')}
                            className="flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleDecision(req.email, 'deny')}
                            className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                            Deny
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* History */}
            {resolvedRequests.length > 0 && (
              <div className="bg-card rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-6">Request History</h2>
                <div className="space-y-3">
                  {resolvedRequests.map((req) => (
                    <div key={req.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`p-2 rounded-lg flex-shrink-0 ${
                            req.status === 'approved'
                              ? 'bg-green-500/10 text-green-500'
                              : 'bg-red-500/10 text-red-500'
                          }`}>
                            {req.status === 'approved'
                              ? <CheckCircle className="w-5 h-5" />
                              : <XCircle className="w-5 h-5" />
                            }
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold truncate">{req.email}</p>
                            <p className="text-sm text-muted-foreground">
                              {req.decidedBy ? `Decided by: ${req.decidedBy}` : ''}{' '}
                              · {new Date(req.updatedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${
                          req.status === 'approved'
                            ? 'bg-green-500/20 text-green-600 dark:text-green-400'
                            : 'bg-red-500/20 text-red-600 dark:text-red-400'
                        }`}>
                          {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
