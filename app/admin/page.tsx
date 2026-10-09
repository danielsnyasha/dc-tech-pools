"use client";

import { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Star, Clock, AlertCircle, Inbox } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

/* Brand cyan + pink, read from CSS tokens so light and dark each use their own
   validated step rather than one palette flipped between modes. */
const CYAN = "var(--chart-cyan)";
const PINK = "var(--chart-pink)";
const GRID = "var(--chart-grid)";
const AXIS = "var(--chart-axis)";

const tooltipStyle = {
  background: "var(--chart-tooltip-bg)",
  border: "1px solid var(--chart-tooltip-border)",
  borderRadius: 10,
  color: "var(--chart-tooltip-fg)",
  fontSize: 12,
  boxShadow: "0 8px 24px rgb(0 0 0 / 0.18)",
};

const axisProps = {
  stroke: AXIS,
  tick: { fill: AXIS, fontSize: 11 },
  tickLine: false,
  axisLine: { stroke: GRID },
};

const ZAR = (n: number) => "R" + Math.round(n).toLocaleString("en-ZA");

/* Status is a reserved encoding: fixed meaning, never reused as a series hue,
   and always paired with its label rather than carried by colour alone. */
const STATUS_STYLES: Record<string, string> = {
  completed: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 ring-emerald-500/30",
  confirmed: "bg-sky-500/15 text-sky-700 dark:text-sky-400 ring-sky-500/30",
  pending: "bg-amber-500/15 text-amber-700 dark:text-amber-400 ring-amber-500/30",
  cancelled: "bg-rose-500/15 text-rose-700 dark:text-rose-400 ring-rose-500/30",
};

function ChartEmpty({ label }: { label: string }) {
  return (
    <div className="h-[280px] flex flex-col items-center justify-center text-center gap-2">
      <Inbox className="w-8 h-8 text-slate-300 dark:text-slate-600" />
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">No data yet</p>
      <p className="text-xs text-slate-400 dark:text-slate-500 max-w-[36ch]">{label}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const response = await fetch("/api/analytics?days=30");
        const data = await response.json();
        if (!active) return;

        // The endpoint answers errors with {success:false}. Rendering that as
        // data shows a confident "0 bookings" when nothing actually loaded.
        if (!response.ok || data?.success === false) {
          setLoadError(data?.error || `Request failed (${response.status})`);
          setAnalytics(null);
          return;
        }
        setLoadError(null);
        setAnalytics(data);
      } catch (error) {
        if (!active) return;
        setLoadError(error instanceof Error ? error.message : "Could not reach the server");
        setAnalytics(null);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const s = analytics?.stats;

  const stats = useMemo(
    () => [
      { title: "Total Bookings", value: s?.totalBookings ?? 0, icon: Calendar, accent: "cyan" },
      { title: "Pending", value: s?.pendingBookings ?? 0, icon: Clock, accent: "pink" },
      { title: "Completed", value: s?.completedBookings ?? 0, icon: Users, accent: "cyan" },
      {
        title: "Avg Rating",
        value: s?.avgRating ? Number(s.avgRating).toFixed(1) : "-",
        icon: Star,
        accent: "pink",
      },
    ],
    [s]
  );

  const trend = analytics?.bookingsTrend ?? [];
  const services = analytics?.serviceDistribution ?? [];
  const financials = analytics?.financials ?? [];
  const statuses = analytics?.statusBreakdown ?? [];
  const recent = analytics?.recentBookings ?? [];

  const hasTrend = trend.some((d: any) => d.bookings > 0);
  const hasMoney = financials.some((f: any) => f.revenue || f.profit);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-10 w-10 rounded-full border-2 border-slate-200 dark:border-slate-700 border-t-sky-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Bookings, services and job finances at a glance.
        </p>
      </div>

      {loadError && (
        <div className="flex gap-3 rounded-xl border border-amber-300/70 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 px-4 py-3">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800 dark:text-amber-300 text-sm">
              Could not load dashboard data
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
              {loadError}. Nothing below is real data.
            </p>
          </div>
        </div>
      )}

      {/* Stat tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="relative overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
          >
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-[3px]"
              style={{ background: stat.accent === "cyan" ? CYAN : PINK }}
            />
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between gap-2">
                <CardDescription className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {stat.title}
                </CardDescription>
                <stat.icon
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: stat.accent === "cyan" ? CYAN : PINK }}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tabular-nums text-slate-900 dark:text-white">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Status breakdown - labelled chips, never colour alone */}
      {statuses.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {statuses.map((st: any) => (
            <span
              key={st.status}
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${
                STATUS_STYLES[st.status] ??
                "bg-slate-500/15 text-slate-600 dark:text-slate-300 ring-slate-500/30"
              }`}
            >
              {st.status.charAt(0).toUpperCase() + st.status.slice(1)}
              <span className="tabular-nums opacity-70">{st.count}</span>
            </span>
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base text-slate-900 dark:text-white">Bookings Trend</CardTitle>
            <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
              Daily bookings over the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            {hasTrend ? (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={trend} margin={{ top: 8, right: 12, bottom: 4, left: -16 }}>
                  <CartesianGrid stroke={GRID} strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="date"
                    {...axisProps}
                    minTickGap={28}
                    tickFormatter={(v) =>
                      new Date(v).toLocaleDateString("en-ZA", { month: "short", day: "numeric" })
                    }
                  />
                  <YAxis {...axisProps} allowDecimals={false} width={38} />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    cursor={{ stroke: AXIS, strokeDasharray: "3 3" }}
                    labelFormatter={(v) =>
                      new Date(v).toLocaleDateString("en-ZA", { dateStyle: "medium" })
                    }
                  />
                  {/* Single series: the title names it, so no legend box. */}
                  <Line
                    type="monotone"
                    dataKey="bookings"
                    name="Bookings"
                    stroke={CYAN}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 5, strokeWidth: 2, stroke: "var(--chart-surface)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <ChartEmpty label="Bookings appear here as they come in through the website form." />
            )}
          </CardContent>
        </Card>

        <Card className="border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base text-slate-900 dark:text-white">
              Service Distribution
            </CardTitle>
            <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
              Most requested services
            </CardDescription>
          </CardHeader>
          <CardContent>
            {services.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                {/* Horizontal: service names are long, so they get a real axis
                    instead of 45-degree rotated labels. */}
                <BarChart
                  data={services}
                  layout="vertical"
                  margin={{ top: 4, right: 20, bottom: 4, left: 8 }}
                  barCategoryGap={6}
                >
                  <CartesianGrid stroke={GRID} strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" {...axisProps} allowDecimals={false} />
                  <YAxis type="category" dataKey="serviceType" {...axisProps} width={120} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: GRID, fillOpacity: 0.35 }} />
                  <Bar
                    dataKey="count"
                    name="Bookings"
                    fill={CYAN}
                    radius={[0, 4, 4, 0]}
                    maxBarSize={22}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ChartEmpty label="Once bookings exist, the service mix is broken down here." />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Revenue and profit. Replaces the old chart, which plotted two fields
          (pageViews, contactFormCount) that nothing in the app increments. */}
      <Card className="border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <CardTitle className="text-base text-slate-900 dark:text-white">
                Revenue &amp; Profit
              </CardTitle>
              <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
                Monthly totals from job records
              </CardDescription>
            </div>
            {hasMoney && (
              <div className="flex gap-5">
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Revenue
                  </p>
                  <p className="text-lg font-bold tabular-nums" style={{ color: CYAN }}>
                    {ZAR(s?.totalRevenue ?? 0)}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Profit
                  </p>
                  <p className="text-lg font-bold tabular-nums" style={{ color: PINK }}>
                    {ZAR(s?.totalProfit ?? 0)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {hasMoney ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={financials} margin={{ top: 8, right: 12, bottom: 4, left: 4 }} barGap={2}>
                <CartesianGrid stroke={GRID} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="label" {...axisProps} />
                <YAxis {...axisProps} width={64} tickFormatter={(v) => ZAR(v)} />
                <Tooltip
                  contentStyle={tooltipStyle}
                  cursor={{ fill: GRID, fillOpacity: 0.35 }}
                  formatter={(v: any) => ZAR(Number(v))}
                />
                <Legend wrapperStyle={{ fontSize: 12, color: AXIS }} iconType="circle" iconSize={8} />
                <Bar dataKey="revenue" name="Revenue" fill={CYAN} radius={[4, 4, 0, 0]} maxBarSize={28} />
                <Bar dataKey="profit" name="Profit" fill={PINK} radius={[4, 4, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <ChartEmpty label="Add revenue and costs to a job under Jobs, and monthly totals plot here." />
          )}
        </CardContent>
      </Card>

      <Card className="border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base text-slate-900 dark:text-white">Recent Bookings</CardTitle>
          <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
            Latest appointment requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recent.length > 0 ? (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {recent.slice(0, 5).map((b: any) => (
                <div
                  key={b.id}
                  className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                      {b.customerName}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {b.serviceType}
                    </p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
                      {b.email} / {b.phone}
                    </p>
                  </div>
                  <span
                    className={`flex-shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${
                      STATUS_STYLES[b.status] ??
                      "bg-slate-500/15 text-slate-600 dark:text-slate-300 ring-slate-500/30"
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <ChartEmpty label="New booking requests from the website will be listed here." />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
