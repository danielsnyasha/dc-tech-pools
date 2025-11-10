"use client";

import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import UnauthorizedError from "@/components/UnauthorizedError";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={null}>
        <UnauthorizedError />
      </Suspense>
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
