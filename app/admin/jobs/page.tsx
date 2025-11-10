'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import JobEditModal from '@/components/JobEditModal'
import JobCreateModal from '@/components/JobCreateModal'
import JobImagesModal from '@/components/JobImagesModal'
import {
  Briefcase,
  DollarSign,
  Calendar,
  TrendingUp,
  TrendingDown,
  Filter,
  Plus,
  Edit,
  ChevronDown,
  BarChart3,
  PieChart as PieChartIcon,
  Target,
  Wallet,
  Image as ImageIcon
} from 'lucide-react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  ComposedChart
} from 'recharts'

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
  email: string
  phone: string
  serviceType: string
  poolSize?: string
  address: string
  city: string
  postalCode?: string
  preferredDate: Date
  preferredTime: string
  message?: string
  status: string
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
  completionImages?: string[]
  createdAt: Date
  updatedAt: Date
}

type MonthlyData = {
  month: string;
  monthIndex: number;
  jobs: number;
  revenue: number;
  expenses: number;
  profit: number;
};

type ProjectionData = MonthlyData & {
  projectedRevenue?: number;
  projectedProfit?: number;
};

const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']
const EXPENSE_COLORS = {
  labor: '#3b82f6',
  materials: '#10b981',
  equipment: '#f59e0b',
  transport: '#ef4444',
  essentials: '#8b5cf6'
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
  const [selectedQuarter, setSelectedQuarter] = useState<string>('all')
  const [selectedMonth, setSelectedMonth] = useState<number>(0)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [expandedJob, setExpandedJob] = useState<string | null>(null)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [imagesModalJob, setImagesModalJob] = useState<Job | null>(null)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/bookings')
      const data = await response.json()
      setJobs(data.bookings || [])
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveJob = (updatedJob: Partial<Job>) => {
    setJobs(jobs.map(j => j.id === editingJob?.id ? { ...j, ...updatedJob } : j))
    setEditingJob(null)
    fetchJobs()
  }

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    const yearMatch = selectedYear === 0 || job.jobYear === selectedYear
    const quarterMatch = selectedQuarter === 'all' || job.jobQuarter === selectedQuarter
    const monthMatch = selectedMonth === 0 || job.jobMonth === selectedMonth
    const statusMatch = selectedStatus === 'all' || job.status === selectedStatus
    return yearMatch && quarterMatch && monthMatch && statusMatch
  })

  // Get available years from jobs
  const availableYears = Array.from(
    new Set(
      jobs
        .map(job => job.jobYear || new Date(job.preferredDate).getFullYear())
        .sort((a, b) => b - a)
    )
  )

  // Calculate comprehensive analytics
  const totalRevenue = filteredJobs.reduce((sum, j) => sum + (j.revenue || 0), 0)
  const totalExpenses = filteredJobs.reduce((sum, j) => sum + (j.totalExpenses || 0), 0)
  const totalProfit = totalRevenue - totalExpenses
  const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0

  // Quarterly data with comprehensive metrics
  const quarterlyData = QUARTERS.map(quarter => {
    const quarterJobs = filteredJobs.filter(j => j.jobQuarter === quarter)
    const revenue = quarterJobs.reduce((sum, j) => sum + (j.revenue || 0), 0)
    const expenses = quarterJobs.reduce((sum, j) => sum + (j.totalExpenses || 0), 0)
    const profit = revenue - expenses

    return {
      quarter,
      jobs: quarterJobs.length,
      revenue,
      expenses,
      profit,
      completed: quarterJobs.filter(j => j.status === 'completed').length
    }
  })

  // Monthly data for year-over-year comparison
  const monthlyData: MonthlyData[] = MONTHS.map((month, index) => {
    const monthJobs = filteredJobs.filter(j => j.jobMonth === index + 1)
    const revenue = monthJobs.reduce((sum, j) => sum + (j.revenue || 0), 0)
    const expenses = monthJobs.reduce((sum, j) => sum + (j.totalExpenses || 0), 0)
    const profit = revenue - expenses

    return {
      month,
      monthIndex: index + 1,
      jobs: monthJobs.length,
      revenue,
      expenses,
      profit
    }
  })

  // Previous year comparison
  const previousYearJobs = jobs.filter(j => j.jobYear === selectedYear - 1)
  const previousYearRevenue = previousYearJobs.reduce((sum, j) => sum + (j.revenue || 0), 0)
  const revenueGrowth = previousYearRevenue > 0
    ? ((totalRevenue - previousYearRevenue) / previousYearRevenue) * 100
    : 0

  // Expense breakdown
  const expenseBreakdown = [
    {
      name: 'Labor',
      value: filteredJobs.reduce((sum, j) => sum + (j.laborCost || 0), 0),
      color: EXPENSE_COLORS.labor
    },
    {
      name: 'Materials',
      value: filteredJobs.reduce((sum, j) => sum + (j.materialsCost || 0), 0),
      color: EXPENSE_COLORS.materials
    },
    {
      name: 'Equipment',
      value: filteredJobs.reduce((sum, j) => sum + (j.equipmentCost || 0), 0),
      color: EXPENSE_COLORS.equipment
    },
    {
      name: 'Transport',
      value: filteredJobs.reduce((sum, j) => sum + (j.transportCost || 0), 0),
      color: EXPENSE_COLORS.transport
    },
    {
      name: 'Essentials',
      value: filteredJobs.reduce((sum, j) => sum + (j.essentialsCost || 0), 0),
      color: EXPENSE_COLORS.essentials
    },
  ].filter(item => item.value > 0)

  // Status distribution
  const statusData = [
    { name: 'Pending', value: filteredJobs.filter(j => j.status === 'pending').length },
    { name: 'Confirmed', value: filteredJobs.filter(j => j.status === 'confirmed').length },
    { name: 'Completed', value: filteredJobs.filter(j => j.status === 'completed').length },
    { name: 'Cancelled', value: filteredJobs.filter(j => j.status === 'cancelled').length },
  ].filter(item => item.value > 0)

  // Financial projections (simple linear projection based on current trends)
  const completedJobs = filteredJobs.filter(j => j.status === 'completed')
  const avgJobRevenue = completedJobs.length > 0
    ? completedJobs.reduce((sum, j) => sum + (j.revenue || 0), 0) / completedJobs.length
    : 0
  const avgJobProfit = completedJobs.length > 0
    ? completedJobs.reduce((sum, j) => sum + (j.profit || 0), 0) / completedJobs.length
    : 0

  const projectionData: ProjectionData[] = [...monthlyData]
  const lastMonth = monthlyData[new Date().getMonth()]
  if (lastMonth && avgJobRevenue > 0) {
    const currentMonth = new Date().getMonth()
    for (let i = currentMonth + 1; i < 12; i++) {
      projectionData[i] = {
        ...projectionData[i],
        projectedRevenue: avgJobRevenue * 2, // Projected 2 jobs per month
        projectedProfit: avgJobProfit * 2
      }
    }
  }

  const completionRate = filteredJobs.length > 0
    ? (filteredJobs.filter(j => j.status === 'completed').length / filteredJobs.length) * 100
    : 0

  const formatCurrency = (amount: number) => {
    return `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Job Management</h1>
              <p className="text-muted-foreground">
                Track jobs, analyze performance, and manage finances in ZAR
              </p>
            </div>
            <button
              onClick={() => setCreateModalOpen(true)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors font-semibold"
            >
              <Plus className="w-5 h-5" />
              Create New Job
            </button>
          </div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-lg border p-4 md:p-6 mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Filters</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-lg border bg-background"
              >
                <option value={0}>All Years</option>
                {availableYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Quarter</label>
              <select
                value={selectedQuarter}
                onChange={(e) => setSelectedQuarter(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border bg-background"
              >
                <option value="all">All Quarters</option>
                {QUARTERS.map(q => (
                  <option key={q} value={q}>{q}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Month</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-lg border bg-background"
              >
                <option value={0}>All Months</option>
                {MONTHS.map((month, index) => (
                  <option key={month} value={index + 1}>{month}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border bg-background"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-lg border p-4 md:p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <Briefcase className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold">{filteredJobs.length}</span>
            </div>
            <p className="text-sm text-muted-foreground">Total Jobs</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-lg border p-4 md:p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-green-500" />
              <span className="text-2xl font-bold">{formatCurrency(totalRevenue).split(' ')[1].split('.')[0]}</span>
            </div>
            <p className="text-sm text-muted-foreground">Revenue (R)</p>
            <p className="text-xs text-muted-foreground mt-1">{formatCurrency(totalRevenue)}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-lg border p-4 md:p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <Wallet className="w-8 h-8 text-orange-500" />
              <span className="text-2xl font-bold">{formatCurrency(totalExpenses).split(' ')[1].split('.')[0]}</span>
            </div>
            <p className="text-sm text-muted-foreground">Expenses (R)</p>
            <p className="text-xs text-muted-foreground mt-1">{formatCurrency(totalExpenses)}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-lg border p-4 md:p-6"
          >
            <div className="flex items-center justify-between mb-2">
              {totalProfit >= 0 ? (
                <TrendingUp className="w-8 h-8 text-green-500" />
              ) : (
                <TrendingDown className="w-8 h-8 text-red-500" />
              )}
              <span className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {formatCurrency(Math.abs(totalProfit)).split(' ')[1].split('.')[0]}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Net Profit (R)</p>
            <p className="text-xs text-muted-foreground mt-1">{formatCurrency(totalProfit)}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card rounded-lg border p-4 md:p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <Target className="w-8 h-8 text-purple-500" />
              <span className="text-2xl font-bold">{profitMargin.toFixed(1)}%</span>
            </div>
            <p className="text-sm text-muted-foreground">Profit Margin</p>
            <p className="text-xs text-muted-foreground mt-1">
              {revenueGrowth >= 0 ? '+' : ''}{revenueGrowth.toFixed(1)}% YoY
            </p>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Revenue vs Expenses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-card rounded-lg border p-4 md:p-6"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Monthly Performance (ZAR)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))'
                  }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Legend />
                <Bar dataKey="revenue" name="Revenue" fill="#10b981" />
                <Bar dataKey="expenses" name="Expenses" fill="#ef4444" />
                <Line
                  type="monotone"
                  dataKey="profit"
                  name="Profit"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Quarterly Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-card rounded-lg border p-4 md:p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Quarterly Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={quarterlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))'
                  }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Legend />
                <Bar dataKey="revenue" name="Revenue" fill="#10b981" />
                <Bar dataKey="expenses" name="Expenses" fill="#ef4444" />
                <Bar dataKey="profit" name="Profit" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Expense Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-card rounded-lg border p-4 md:p-6"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <PieChartIcon className="w-5 h-5" />
              Expense Breakdown
            </h3>
            {expenseBreakdown.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={expenseBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {expenseBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))'
                    }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                No expense data available
              </div>
            )}
          </motion.div>

          {/* Financial Projections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-card rounded-lg border p-4 md:p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Financial Projections</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={projectionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))'
                  }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Actual Revenue"
                  stackId="1"
                  stroke="#10b981"
                  fill="#10b981"
                />
                <Area
                  type="monotone"
                  dataKey="projectedRevenue"
                  name="Projected Revenue"
                  stackId="2"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Jobs List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-card rounded-lg border p-4 md:p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Jobs List</h2>
            <p className="text-muted-foreground">{filteredJobs.length} jobs found</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading jobs...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">No jobs found matching your filters</p>
              <button
                onClick={() => setCreateModalOpen(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Your First Job
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div
                      className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 cursor-pointer"
                      onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                    >
                      <div>
                        <p className="font-semibold">{job.customerName}</p>
                        <p className="text-sm text-muted-foreground">{job.serviceType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Period</p>
                        <p className="font-medium">
                          {MONTHS[(job.jobMonth || 1) - 1]} {job.jobYear || new Date(job.preferredDate).getFullYear()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Revenue</p>
                        <p className="font-medium text-green-600">
                          {formatCurrency(job.revenue || 0)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Profit</p>
                        <p className={`font-medium ${(job.profit || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(job.profit || 0)}
                        </p>
                      </div>
                      <div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          job.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                          job.status === 'confirmed' ? 'bg-blue-500/20 text-blue-500' :
                          job.status === 'cancelled' ? 'bg-red-500/20 text-red-500' :
                          'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          {job.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {job.status === 'completed' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setImagesModalJob(job)
                          }}
                          className="p-2 hover:bg-purple-500/10 text-purple-500 rounded-lg transition-colors relative"
                          title="Job completion images"
                        >
                          <ImageIcon className="w-4 h-4" />
                          {job.completionImages && job.completionImages.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                              {job.completionImages.length}
                            </span>
                          )}
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setEditingJob(job)
                        }}
                        className="p-2 hover:bg-blue-500/10 text-blue-500 rounded-lg transition-colors"
                        title="Edit job details"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform cursor-pointer ${
                          expandedJob === job.id ? 'rotate-180' : ''
                        }`}
                        onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                      />
                    </div>
                  </div>

                  {expandedJob === job.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t space-y-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Contact Information</h4>
                          <p className="text-sm"><span className="text-muted-foreground">Email:</span> {job.email}</p>
                          <p className="text-sm"><span className="text-muted-foreground">Phone:</span> {job.phone}</p>
                          <p className="text-sm"><span className="text-muted-foreground">Address:</span> {job.address}, {job.city}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Financial Summary</h4>
                          <p className="text-sm"><span className="text-muted-foreground">Revenue:</span> {formatCurrency(job.revenue || 0)}</p>
                          <p className="text-sm"><span className="text-muted-foreground">Total Expenses:</span> {formatCurrency(job.totalExpenses || 0)}</p>
                          <p className="text-sm"><span className="text-muted-foreground">Net Profit:</span> <span className={(job.profit || 0) >= 0 ? 'text-green-600' : 'text-red-600'}>{formatCurrency(job.profit || 0)}</span></p>
                        </div>
                      </div>

                      {(job.laborCost || job.materialsCost || job.equipmentCost || job.transportCost || job.essentialsCost) && (
                        <div>
                          <h4 className="font-semibold mb-2">Expense Breakdown</h4>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                            {job.laborCost ? <p className="text-sm"><span className="text-muted-foreground">Labor:</span> {formatCurrency(job.laborCost)}</p> : null}
                            {job.materialsCost ? <p className="text-sm"><span className="text-muted-foreground">Materials:</span> {formatCurrency(job.materialsCost)}</p> : null}
                            {job.equipmentCost ? <p className="text-sm"><span className="text-muted-foreground">Equipment:</span> {formatCurrency(job.equipmentCost)}</p> : null}
                            {job.transportCost ? <p className="text-sm"><span className="text-muted-foreground">Transport:</span> {formatCurrency(job.transportCost)}</p> : null}
                            {job.essentialsCost ? <p className="text-sm"><span className="text-muted-foreground">Essentials:</span> {formatCurrency(job.essentialsCost)}</p> : null}
                          </div>
                        </div>
                      )}

                      {job.jobBreakdown && job.jobBreakdown.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">Job Breakdown</h4>
                          <div className="space-y-2">
                            {job.jobBreakdown.map((task, index) => (
                              <div key={index} className="bg-accent/50 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-1">
                                  <p className="font-medium">{task.taskName}</p>
                                  <span className={`px-2 py-1 rounded text-xs ${
                                    task.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                                    task.status === 'in_progress' ? 'bg-blue-500/20 text-blue-500' :
                                    'bg-gray-500/20 text-gray-500'
                                  }`}>
                                    {task.status}
                                  </span>
                                </div>
                                {task.description && (
                                  <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                                )}
                                <div className="flex items-center gap-4 text-sm flex-wrap">
                                  <span className="text-muted-foreground">
                                    Est: {formatCurrency(task.estimatedCost)}
                                  </span>
                                  {task.actualCost && (
                                    <span className="text-muted-foreground">
                                      Actual: {formatCurrency(task.actualCost)}
                                    </span>
                                  )}
                                  {task.category && (
                                    <span className="text-muted-foreground">
                                      Category: {task.category}
                                    </span>
                                  )}
                                  {task.assignedTo && (
                                    <span className="text-muted-foreground">
                                      Assigned: {task.assignedTo}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Modals */}
      {editingJob && (
        <JobEditModal
          job={editingJob}
          isOpen={!!editingJob}
          onClose={() => setEditingJob(null)}
          onSave={handleSaveJob}
        />
      )}

      {createModalOpen && (
        <JobCreateModal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSuccess={fetchJobs}
        />
      )}

      {imagesModalJob && (
        <JobImagesModal
          jobId={imagesModalJob.id}
          jobName={`${imagesModalJob.customerName} - ${imagesModalJob.serviceType}`}
          images={imagesModalJob.completionImages || []}
          isOpen={!!imagesModalJob}
          onClose={() => setImagesModalJob(null)}
          onUpdate={(newImages) => {
            setJobs(jobs.map(j =>
              j.id === imagesModalJob.id
                ? { ...j, completionImages: newImages }
                : j
            ))
          }}
        />
      )}
    </div>
  )
}
