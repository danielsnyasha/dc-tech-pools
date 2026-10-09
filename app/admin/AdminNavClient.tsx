'use client'

import { useState } from "react"
import { UserButton, useClerk } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calendar, BarChart, Briefcase, Shield, LogOut, Menu, X, Bell, Loader2 } from "lucide-react"
import ThemeToggle from "@/components/ThemeToggle"

interface AdminNavClientProps {
  children: React.ReactNode
  pendingRequestsCount: number
}

export default function AdminNavClient({ children, pendingRequestsCount }: AdminNavClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const pathname = usePathname()
  const { signOut } = useClerk()

  // Send them to the public site, not back to /sign-in. Done explicitly so the
  // button can show progress instead of appearing to do nothing on a slow call.
  const handleSignOut = async () => {
    if (signingOut) return
    setSigningOut(true)
    try {
      await signOut({ redirectUrl: "/" })
    } catch {
      setSigningOut(false)
    }
  }

  const navLinks = [
    { href: "/admin", icon: BarChart, label: "Dashboard" },
    { href: "/admin/bookings", icon: Calendar, label: "Bookings" },
    { href: "/admin/jobs", icon: Briefcase, label: "Jobs" },
    {
      href: "/admin/admin-emails",
      icon: Shield,
      label: "Access Control",
      badge: pendingRequestsCount > 0 ? pendingRequestsCount : null,
    },
  ]

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin"
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Action Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-4 py-2 text-center text-sm">
        <div className="container mx-auto flex items-center justify-center gap-2">
          <span className="font-semibold">Admin Portal</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Manage your business operations</span>
        </div>
      </div>

      {/* Admin Navigation */}
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between h-16 gap-2">
            {/* Logo. This bar is bg-white in light mode and gray-900 in dark,
                so the lightened variant is swapped in on the dark surface where
                the navy wordmark would otherwise disappear. */}
            <Link
              href="/admin"
              className="flex items-center gap-3 flex-shrink-0"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Image
                src="/images/pool/logo-light.png"
                alt="DC Tech Pools"
                width={300}
                height={100}
                className="hidden dark:block h-8 sm:h-10 w-auto object-contain"
                priority
              />
              <Image
                src="/images/pool/logo.png"
                alt="DC Tech Pools"
                width={300}
                height={100}
                className="block dark:hidden h-8 sm:h-10 w-auto object-contain"
                priority
              />
              <span className="hidden md:block pl-3 border-l border-gray-200 dark:border-gray-700 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Admin Portal
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 xl:px-4 py-2 rounded-lg flex items-center gap-2 text-xs xl:text-sm transition-colors whitespace-nowrap relative ${
                    isActive(link.href)
                      ? 'bg-blue-600 text-white dark:bg-blue-500'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <link.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden xl:inline">{link.label}</span>
                  {link.badge && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <div className="scale-75 sm:scale-100">
                <ThemeToggle />
              </div>

              {/* Pending requests bell (mobile) */}
              {pendingRequestsCount > 0 && (
                <Link
                  href="/admin/admin-emails"
                  className="lg:hidden relative p-2 text-amber-600 dark:text-amber-400"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {pendingRequestsCount}
                  </span>
                </Link>
              )}

              <Link
                href="/"
                className="hidden lg:flex px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors items-center gap-2 text-xs xl:text-sm whitespace-nowrap"
              >
                <Home className="w-4 h-4" />
                <span className="hidden xl:inline">View Site</span>
              </Link>

              <button
                onClick={handleSignOut}
                disabled={signingOut}
                className="px-2 sm:px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 disabled:opacity-60 text-white transition-colors flex items-center gap-1 sm:gap-2 font-medium text-xs sm:text-sm"
              >
                {signingOut ? (
                  <Loader2 className="w-4 h-4 flex-shrink-0 animate-spin" />
                ) : (
                  <LogOut className="w-4 h-4 flex-shrink-0" />
                )}
                <span className="hidden sm:inline">{signingOut ? "Signing out..." : "Logout"}</span>
              </button>

              <div className="hidden md:block">
                <UserButton afterSignOutUrl="/" />
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg transition-colors flex items-center gap-3 relative ${
                      isActive(link.href)
                        ? 'bg-blue-600 text-white dark:bg-blue-500'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <link.icon className="w-5 h-5 flex-shrink-0" />
                    {link.label}
                    {link.badge && (
                      <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                ))}

                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center gap-3 font-medium"
                >
                  <Home className="w-5 h-5 flex-shrink-0" />
                  View Main Site
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="container mx-auto px-4 py-4 md:py-8">{children}</main>
    </div>
  )
}
