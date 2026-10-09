"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X, Phone, LogOut } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useAuth,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Gallery", href: "#gallery" },
  { name: "About", href: "#about" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo. The wordmark is dark navy, so a lightened variant is used
                on dark backgrounds and the original on the white scrolled navbar.
                width/height match the artwork's true 3:1 ratio to avoid squashing. */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                src="/images/pool/logo-light.png"
                alt="Denny Tech Blue Horizon"
                width={300}
                height={100}
                className={`h-12 w-auto object-contain ${
                  isScrolled ? "hidden dark:block" : "block"
                }`}
                priority
              />
              <Image
                src="/images/pool/logo.png"
                alt="Denny Tech Blue Horizon"
                width={300}
                height={100}
                className={`h-12 w-auto object-contain ${
                  isScrolled ? "block dark:hidden" : "hidden"
                }`}
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isScrolled
                      ? "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30"
                      : "text-white/85 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+27649806086"
                className={`hidden xl:flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                  isScrolled
                    ? "text-slate-500 dark:text-slate-400 hover:text-blue-600"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                +27 649 806 086
              </a>
              <div className={`hidden xl:block w-px h-5 ${isScrolled ? "bg-slate-200 dark:bg-slate-700" : "bg-white/20"}`} />
              <ThemeToggle />
              <SignedIn>
                <Link href="/admin">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`text-sm ${
                      isScrolled
                        ? "text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:bg-blue-50"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    Admin
                  </Button>
                </Link>
                <SignOutButton redirectUrl="/">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`text-sm flex items-center gap-1.5 ${
                      isScrolled
                        ? "text-red-600 hover:bg-red-50"
                        : "text-white/80 hover:bg-white/10"
                    }`}
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Logout
                  </Button>
                </SignOutButton>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`text-sm ${
                      isScrolled
                        ? "text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:bg-blue-50"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    Login
                  </Button>
                </SignInButton>
              </SignedOut>
              <a href="#contact">
                <button
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isScrolled
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/25"
                      : "bg-white text-blue-950 hover:bg-blue-50"
                  }`}
                >
                  Get a Quote
                </button>
              </a>
            </div>

            {/* Mobile Right */}
            <div className="flex lg:hidden items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  isScrolled
                    ? "text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-0 top-20 z-40 lg:hidden"
          >
            <div className="bg-white/98 dark:bg-slate-950/98 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-2xl">
              <div className="container mx-auto px-6 py-5 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 font-medium text-[15px] hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-600 transition-all"
                  >
                    {link.name}
                  </motion.a>
                ))}
                <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
                  <a href="tel:+27649806086" className="flex items-center gap-2.5 px-4 py-2 text-slate-500 text-sm">
                    <Phone className="w-4 h-4" />
                    +27 649 806 086
                  </a>
                  <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors">
                      Get a Free Quote
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
