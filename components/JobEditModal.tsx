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
  category?: string
  assignedTo?: string
  status: string
  dueDate?: Date
  completedDate?: Date
}

type Job = {
  id: string
  customerName: string
  serviceType: string
  jobYear?: number
  jobMonth?: number
  jobQuarter?: string
  revenue?: number
  totalExpenses?: number
  profit?: number
  laborCost?: number
  materialsCost?: number
  equipmentCost?: number
  transportCost?: number
  essentialsCost?: number
  allocatedBudget?: number
  actualCost?: number
  jobBreakdown?: JobTask[]
  status: string
}

interface JobEditModalProps {
  job: Job
  isOpen: boolean
  onClose: () => void
  onSave: (updatedJob: Partial<Job>) => void
}

const EXPENSE_CATEGORIES = ['labor', 'materials', 'equipment', 'transport', 'essentials']

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

export default function JobEditModal({ job, isOpen, onClose, onSave }: JobEditModalProps) {
  const [formData, setFormData] = useState({
    jobYear: job.jobYear || new Date().getFullYear(),
    jobMonth: job.jobMonth || new Date().getMonth() + 1,
    jobQuarter: job.jobQuarter || 'Q1',
    revenue: job.revenue || 0,
    laborCost: job.laborCost || 0,
    materialsCost: job.materialsCost || 0,
    equipmentCost: job.equipmentCost || 0,
    transportCost: job.transportCost || 0,
    essentialsCost: job.essentialsCost || 0,
    status: job.status || 'pending',
    jobBreakdown: job.jobBreakdown || []
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
      const response = await fetch(`/api/jobs/${job.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          totalExpenses,
          profit
        })
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Job updated successfully!')
        onSave(formData)
        onClose()
      } else {
        toast.error(data.error || 'Failed to update job')
      }
    } catch (error) {
      console.error('Error updating job:', error)
      toast.error('Failed to update job')
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

  const formatCurrency = (amount: number) => {
    return `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
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
          <div className="sticky top-0 bg-card border-b p-4 md:p-6 flex items-center justify-between z-10">
            <div>
              <h2 className="text-xl md:text-2xl font-bold">Edit Job Details</h2>
              <p className="text-sm text-muted-foreground">
                {job.customerName} - {job.serviceType}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6">
            {/* Job Period */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Job Period</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4 md:p-6 border-2">
              <h4 className="font-semibold mb-4 text-lg">Financial Summary</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                  <p className="text-xl md:text-2xl font-bold text-green-600">{formatCurrency(formData.revenue)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
                  <p className="text-xl md:text-2xl font-bold text-orange-600">{formatCurrency(totalExpenses)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Net Profit</p>
                  <p className={`text-xl md:text-2xl font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(profit)}
                  </p>
                </div>
              </div>
            </div>

            {/* Status */}
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

            {/* Job Breakdown */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Job Breakdown</h3>
                <button
                  type="button"
                  onClick={addTask}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Task
                </button>
              </div>

              <div className="space-y-3">
                {formData.jobBreakdown.map((task, index) => (
                  <div key={index} className="border rounded-lg p-3 md:p-4 space-y-3 bg-accent/30">
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
                            value={task.category || 'labor'}
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
                    No tasks added. Click "Add Task" to create a breakdown.
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t sticky bottom-0 bg-card">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2 rounded-lg border hover:bg-accent transition-colors"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                disabled={submitting}
              >
                {submitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
