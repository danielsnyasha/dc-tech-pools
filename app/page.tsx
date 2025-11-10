"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

export default function Home() {
  const searchParams = useSearchParams();
  const [showUnauthorizedError, setShowUnauthorizedError] = useState(false);

  useEffect(() => {
    if (searchParams.get('error') === 'unauthorized') {
      setShowUnauthorizedError(true);
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => setShowUnauthorizedError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  return (
    <main className="min-h-screen">
      {showUnauthorizedError && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg animate-in fade-in slide-in-from-top duration-300">
          <p className="font-semibold">Access Denied</p>
          <p className="text-sm">You don't have permission to access the admin portal.</p>
        </div>
      )}
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <About />
      <Testimonials />
      <Booking />
      <Footer />
    </main>
  );
}
