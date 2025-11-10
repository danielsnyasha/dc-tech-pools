'use client'

import { useState } from 'react'
import { X, Plus, Trash2, DollarSign } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

type JobTask = {
  taskName: string
  description?: string
  estimatedCost: number
  actualCost?: number
  category: string
  assignedTo?: string
  status: string
}

type NewJobFormData = {
  customerName: string
  email: string
  phone: string
  serviceType: string
  poolSize?: string
  address: string
  city: string
  postalCode?: string
  preferredDate: string
  preferredTime: string
  message?: string
  status: string
  jobYear: number
  jobMonth: number
  jobQuarter: string
  revenue: number
  laborCost: number
  materialsCost: number
  equipmentCost: number
  transportCost: number
  essentialsCost: number
  jobBreakdown: JobTask[]
}

interface JobCreateModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

const MONTHS = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
]

const SERVICE_TYPES = [
  'Pool Maintenance',
  'Pool Cleaning',
  'Equipment Repair',
  'Installation',
  'Chemical Treatment',
  'Renovation',
  'Other'
]

const EXPENSE_CATEGORIES = ['labor', 'materials', 'equipment', 'transport', 'essentials']

export default function JobCreateModal({ isOpen, onClose, onSuccess }: JobCreateModalProps) {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1
  const currentQuarter = `Q${Math.ceil(currentMonth / 3)}`

  const [formData, setFormData] = useState<NewJobFormData>({
    customerName: '',
    email: '',
    phone: '',
    serviceType: 'Pool Maintenance',
    poolSize: '',
    address: '',
    city: '',
    postalCode: '',
    preferredDate: currentDate.toISOString().split('T')[0],
    preferredTime: '09:00',
    message: '',
    status: 'confirmed',
    jobYear: currentDate.getFullYear(),
    jobMonth: currentMonth,
    jobQuarter: currentQuarter,
    revenue: 0,
    laborCost: 0,
    materialsCost: 0,
    equipmentCost: 0,
    transportCost: 0,
    essentialsCost: 0,
    jobBreakdown: []
  })

  const [submitting, setSubmitting] = useState(false)

  const totalExpenses =
    formData.laborCost +
    formData.materialsCost +
    formData.equipmentCost +
    formData.transportCost +
    formData.essentialsCost

  const profit = formData.revenue - totalExpenses

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/jobs/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          preferredDate: new Date(formData.preferredDate).toISOString(),
          totalExpenses,
          profit
        })
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Job created successfully!')
        onSuccess()
        onClose()
        // Reset form
        setFormData({
          customerName: '',
          email: '',
          phone: '',
          serviceType: 'Pool Maintenance',
          poolSize: '',
          address: '',
          city: '',
          postalCode: '',
          preferredDate: new Date().toISOString().split('T')[0],
          preferredTime: '09:00',
          message: '',
          status: 'confirmed',
          jobYear: new Date().getFullYear(),
          jobMonth: new Date().getMonth() + 1,
          jobQuarter: currentQuarter,
          revenue: 0,
          laborCost: 0,
          materialsCost: 0,
          equipmentCost: 0,
          transportCost: 0,
          essentialsCost: 0,
          jobBreakdown: []
        })
      } else {
        toast.error(data.error || 'Failed to create job')
      }
    } catch (error) {
      console.error('Error creating job:', error)
      toast.error('Failed to create job')
    } finally {
      setSubmitting(false)
    }
  }

  const addTask = () => {
    setFormData({
      ...formData,
      jobBreakdown: [
        ...formData.jobBreakdown,
        {
          taskName: '',
          description: '',
          estimatedCost: 0,
          actualCost: 0,
          category: 'labor',
          assignedTo: '',
          status: 'pending'
        }
      ]
    })
  }

  const removeTask = (index: number) => {
    setFormData({
      ...formData,
      jobBreakdown: formData.jobBreakdown.filter((_, i) => i !== index)
    })
  }

  const updateTask = (index: number, field: string, value: any) => {
    const updatedBreakdown = [...formData.jobBreakdown]
    updatedBreakdown[index] = {
      ...updatedBreakdown[index],
      [field]: value
    }
    setFormData({ ...formData, jobBreakdown: updatedBreakdown })
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-card rounded-lg shadow-xl max-w-6xl w-full max-h-[95vh] overflow-y-auto my-8"
        >
          <div className="sticky top-0 bg-card border-b p-6 flex items-center justify-between z-10">
            <div>
              <h2 className="text-2xl font-bold">Create New Job</h2>
              <p className="text-sm text-muted-foreground">
                Add a new job with complete financial tracking in ZAR (Rands)
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Customer Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Customer Name *</label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border bg-background"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border bg-background"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border bg-background"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Service Type *</label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border bg-background"
                    required
                  >
                    {SERVICE_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Pool Size</label>
                  <input
                    type="text"
                    value={formData.poolSize}
                    onChange={(e) => setFormData({ ...formData, poolSize: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border bg-background"
                    placeholder="e.g., 25m x 10m"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border bg-background"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Address *</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border bg-background"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Postal Code</label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border bg-background"
                  />
                </div>
              </div>
            </div>

            {/* Job Schedule */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Job Schedule</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Date *</label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border bg-background"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Time *</label>
                  <input
                    type="time"
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border bg-background"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Year *</label>
                  <input
                    type="number"
                    value={formData.jobYear}
                    onChange={(e) => setFormData({ ...formData, jobYear: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg border bg-background"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Month *</label>
                  <select
                    value={formData.jobMonth}
                    onChange={(e) => {
                      const month = parseInt(e.target.value)
                      const quarter = `Q${Math.ceil(month / 3)}`
                      setFormData({ ...formData, jobMonth: month, jobQuarter: quarter })
                    }}
                    className="w-full px-4 py-2 rounded-lg border bg-background"
                    required
                  >
                    {MONTHS.map(month => (
                      <option key={month.value} value={month.value}>{month.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Quarter</label>
                  <input
                    type="text"
                    value={formData.jobQuarter}
                    className="w-full px-4 py-2 rounded-lg border bg-background"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border bg-background"
                    required
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Financial Information (ZAR - Rands)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="md:col-span-2 lg:col-span-3">
                  <label className="block text-sm font-medium mb-2">Revenue (What You Got) *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.revenue}
                    onChange={(e) => setFormData({ ...formData, revenue: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2 rounded-lg border bg-background"
                    placeholder="R 0.00"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Labor Cost</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.laborCost}
                    onChange={(e) => setFormData({ ...formData, laborCost: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2 rounded-lg border bg-background"
                    placeholder="R 0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Materials Cost</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.materialsCost}
                    onChange={(e) => setFormData({ ...formData, materialsCost: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2 rounded-lg border bg-background"
                    placeholder="R 0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Equipment Cost</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.equipmentCost}
                    onChange={(e) => setFormData({ ...formData, equipmentCost: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2 rounded-lg border bg-background"
                    placeholder="R 0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Transport Cost</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.transportCost}
                    onChange={(e) => setFormData({ ...formData, transportCost: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2 rounded-lg border bg-background"
                    placeholder="R 0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Essentials Cost</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.essentialsCost}
                    onChange={(e) => setFormData({ ...formData, essentialsCost: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2 rounded-lg border bg-background"
                    placeholder="R 0.00"
                  />
                </div>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-6 border-2">
              <h4 className="font-semibold mb-4 text-lg">Financial Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-600">R {formData.revenue.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
                  <p className="text-2xl font-bold text-orange-600">R {totalExpenses.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Net Profit</p>
                  <p className={`text-2xl font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    R {profit.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>

            {/* Job Breakdown (Optional) */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Job Breakdown (Optional)</h3>
                <button
                  type="button"
                  onClick={addTask}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Task
                </button>
              </div>

              <div className="space-y-3">
                {formData.jobBreakdown.map((task, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3 bg-accent/30">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">Task Name *</label>
                          <input
                            type="text"
                            value={task.taskName}
                            onChange={(e) => updateTask(index, 'taskName', e.target.value)}
                            className="w-full px-3 py-2 rounded border bg-background text-sm"
                            placeholder="e.g., Pool Cleaning"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Category *</label>
                          <select
                            value={task.category}
                            onChange={(e) => updateTask(index, 'category', e.target.value)}
                            className="w-full px-3 py-2 rounded border bg-background text-sm"
                            required
                          >
                            {EXPENSE_CATEGORIES.map(cat => (
                              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Assigned To</label>
                          <input
                            type="text"
                            value={task.assignedTo || ''}
                            onChange={(e) => updateTask(index, 'assignedTo', e.target.value)}
                            className="w-full px-3 py-2 rounded border bg-background text-sm"
                            placeholder="Team member"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Estimated Cost (R) *</label>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={task.estimatedCost}
                            onChange={(e) => updateTask(index, 'estimatedCost', parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 rounded border bg-background text-sm"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Actual Cost (R)</label>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={task.actualCost || ''}
                            onChange={(e) => updateTask(index, 'actualCost', parseFloat(e.target.value))}
                            className="w-full px-3 py-2 rounded border bg-background text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Status *</label>
                          <select
                            value={task.status}
                            onChange={(e) => updateTask(index, 'status', e.target.value)}
                            className="w-full px-3 py-2 rounded border bg-background text-sm"
                            required
                          >
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>

                        <div className="md:col-span-3">
                          <label className="block text-sm font-medium mb-1">Description</label>
                          <textarea
                            value={task.description || ''}
                            onChange={(e) => updateTask(index, 'description', e.target.value)}
                            className="w-full px-3 py-2 rounded border bg-background text-sm"
                            rows={2}
                            placeholder="Task details..."
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeTask(index)}
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {formData.jobBreakdown.length === 0 && (
                  <p className="text-center text-muted-foreground py-8 border-2 border-dashed rounded-lg">
                    No tasks added. Click &quot;Add Task&quot; to create a detailed breakdown.
                  </p>
                )}
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium mb-2">Additional Notes</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border bg-background"
                rows={3}
                placeholder="Any special requirements or notes..."
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t sticky bottom-0 bg-card">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 rounded-lg border hover:bg-accent transition-colors"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50"
                disabled={submitting}
              >
                {submitting ? 'Creating...' : 'Create Job'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
