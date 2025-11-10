"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, Waves, LogOut } from "lucide-react";
import { SignOutButton, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Gallery", href: "#gallery" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-xl"
            : "bg-transparent"
        }`}
      >
        {/* Top bar */}
        <div
          className={`border-b transition-all duration-300 ${
            isScrolled ? "border-gray-200 dark:border-gray-700" : "border-white/20"
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-12 text-sm">
              <div className="hidden md:flex items-center gap-6">
                <a
                  href="tel:+27649806086"
                  className={`flex items-center gap-2 transition-colors ${
                    isScrolled
                      ? "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                      : "text-white hover:text-blue-200"
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span>+27 649 806 086</span>
                </a>
                <a
                  href="mailto:dennytech84@gmail.com"
                  className={`flex items-center gap-2 transition-colors ${
                    isScrolled
                      ? "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                      : "text-white hover:text-blue-200"
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>dennytech84@gmail.com</span>
                </a>
              </div>
              <div className="ml-auto flex items-center gap-3">
                <ThemeToggle />
                <Link href="/admin">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`${
                      isScrolled ? "text-gray-700 dark:text-gray-300" : "text-white"
                    } hover:bg-blue-600 hover:text-white`}
                  >
                    Admin Portal
                  </Button>
                </Link>
                {isSignedIn && (
                  <SignOutButton redirectUrl="/">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`${
                        isScrolled ? "text-gray-700 dark:text-gray-300" : "text-white"
                      } hover:bg-red-600 hover:text-white flex items-center gap-2`}
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="hidden sm:inline">Logout</span>
                    </Button>
                  </SignOutButton>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main navbar */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <Waves className="w-10 h-10 text-blue-600 relative z-10" />
              </motion.div>
              <div>
                <h1
                  className={`text-2xl font-bold transition-colors ${
                    isScrolled ? "text-gray-900 dark:text-white" : "text-white"
                  }`}
                >
                  DC Tech Pools
                </h1>
                <p
                  className={`text-xs transition-colors ${
                    isScrolled ? "text-gray-600 dark:text-gray-400" : "text-white/80"
                  }`}
                >
                  Premium Pool Services
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      isScrolled
                        ? "text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <a href="#contact">
                <Button variant="gradient" size="lg" className="font-semibold">
                  Get a Quote
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled
                  ? "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-32 left-0 right-0 z-40 lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-xl"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-300"
                  >
                    {link.name}
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  className="pt-4 border-t"
                >
                  <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant="gradient"
                      size="lg"
                      className="w-full font-semibold"
                    >
                      Get a Quote
                    </Button>
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
