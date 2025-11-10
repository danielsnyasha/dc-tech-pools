"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, MessageSquare, TrendingUp, Star, Clock } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0ea5e9", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444"];

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/analytics?days=30");
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Bookings",
      value: analytics?.stats.totalBookings || 0,
      icon: Calendar,
      gradient: "from-blue-600 to-blue-400",
      change: "+12%",
    },
    {
      title: "Pending Bookings",
      value: analytics?.stats.pendingBookings || 0,
      icon: Clock,
      gradient: "from-orange-600 to-orange-400",
      change: "+5",
    },
    {
      title: "Completed",
      value: analytics?.stats.completedBookings || 0,
      icon: Users,
      gradient: "from-emerald-600 to-emerald-400",
      change: "+8%",
    },
    {
      title: "Avg Rating",
      value: analytics?.stats.avgRating?.toFixed(1) || "5.0",
      icon: Star,
      gradient: "from-purple-600 to-purple-400",
      change: "⭐",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Welcome back! Here&apos;s what&apos;s happening with your pool business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription className="dark:text-gray-400">{stat.title}</CardDescription>
                <div className={`w-10 h-10 bg-gradient-to-br ${stat.gradient} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold">{stat.change}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Bookings Over Time */}
        <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="dark:text-white">Bookings Trend</CardTitle>
            <CardDescription className="dark:text-gray-400">Bookings over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics?.analytics || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="bookingsCount"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  name="Bookings"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Service Distribution */}
        <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="dark:text-white">Service Distribution</CardTitle>
            <CardDescription className="dark:text-gray-400">Most popular services</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics?.serviceDistribution || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="serviceType" angle={-45} textAnchor="end" height={100} fontSize={12} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="_count.serviceType" name="Count" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Customer Satisfaction Chart */}
      <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="dark:text-white">Customer Satisfaction Metrics</CardTitle>
          <CardDescription className="dark:text-gray-400">Overall satisfaction trends and engagement</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics?.analytics || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              />
              <YAxis />
              <Tooltip labelFormatter={(value) => new Date(value).toLocaleDateString()} />
              <Legend />
              <Line type="monotone" dataKey="pageViews" stroke="#8b5cf6" strokeWidth={2} name="Page Views" />
              <Line type="monotone" dataKey="contactFormCount" stroke="#f59e0b" strokeWidth={2} name="Contact Forms" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Bookings */}
      <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="dark:text-white">Recent Bookings</CardTitle>
          <CardDescription className="dark:text-gray-400">Latest appointment requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics?.recentBookings?.slice(0, 5).map((booking: any) => (
              <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{booking.customerName}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{booking.serviceType}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{booking.email} • {booking.phone}</p>
                </div>
                <div className="text-right">
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    booking.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : booking.status === "confirmed"
                      ? "bg-blue-100 text-blue-700"
                      : booking.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {booking.status}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(booking.preferredDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
