'use client'

import { useState } from "react"
import { UserButton, SignOutButton } from "@clerk/nextjs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calendar, MessageSquare, BarChart, Briefcase, Shield, LogOut, Menu, X, CheckCircle } from "lucide-react"
import ThemeToggle from "@/components/ThemeToggle"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: "/admin", icon: BarChart, label: "Dashboard" },
    { href: "/admin/bookings", icon: Calendar, label: "Bookings" },
    { href: "/admin/jobs", icon: Briefcase, label: "Jobs" },
    { href: "/admin/admin-emails", icon: Shield, label: "Admin Emails" },
  ]

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin"
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Action Bar / Tooltip */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-4 py-2 text-center text-sm">
        <div className="container mx-auto flex items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Admin Portal</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Manage your business operations</span>
          </div>
        </div>
      </div>

      {/* Admin Navigation */}
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between h-16 gap-2">
            {/* Logo - Simplified on mobile */}
            <Link href="/admin" className="flex items-center gap-2 flex-shrink-0" onClick={() => setMobileMenuOpen(false)}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">DC</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">DC Tech Pools</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Admin Portal</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 xl:px-4 py-2 rounded-lg flex items-center gap-2 text-xs xl:text-sm transition-colors whitespace-nowrap ${
                    isActive(link.href)
                      ? 'bg-blue-600 text-white dark:bg-blue-500'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <link.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden xl:inline">{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              {/* Theme Toggle */}
              <div className="scale-75 sm:scale-100">
                <ThemeToggle />
              </div>

              {/* View Site Button - Desktop */}
              <Link
                href="/"
                className="hidden lg:flex px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors items-center gap-2 text-xs xl:text-sm whitespace-nowrap"
              >
                <Home className="w-4 h-4" />
                <span className="hidden xl:inline">View Site</span>
              </Link>

              {/* Logout Button */}
              <SignOutButton redirectUrl="/">
                <button className="px-2 sm:px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors flex items-center gap-1 sm:gap-2 font-medium text-xs sm:text-sm">
                  <LogOut className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </SignOutButton>

              {/* User Button - Hidden on smallest screens */}
              <div className="hidden md:block">
                <UserButton afterSignOutUrl="/" />
              </div>

              {/* Mobile Menu Button */}
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
                    className={`px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                      isActive(link.href)
                        ? 'bg-blue-600 text-white dark:bg-blue-500'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <link.icon className="w-5 h-5 flex-shrink-0" />
                    {link.label}
                  </Link>
                ))}

                {/* View Site Button for Mobile */}
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center gap-3 lg:hidden font-medium"
                >
                  <Home className="w-5 h-5 flex-shrink-0" />
                  View Main Site
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 md:py-8">{children}</main>
    </div>
  )
}
