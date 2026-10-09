import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import UnauthorizedError from "@/components/UnauthorizedError";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": "https://www.dctechpools.co.za",
  name: "DC Tech Pools",
  url: "https://www.dctechpools.co.za",
  logo: "https://www.dctechpools.co.za/images/pool/beautiful-luxury-outdoor-swimming-pool-hotel-resort.jpg",
  image: "https://www.dctechpools.co.za/images/pool/beautiful-luxury-outdoor-swimming-pool-hotel-resort.jpg",
  description:
    "DC Tech Pools is South Africa's premier swimming pool specialist offering pool construction, renovation, maintenance, repairs, and eco-friendly solutions since 2008.",
  foundingDate: "2008",
  telephone: "+27649806086",
  email: "dennytech84@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "ZA",
  },
  areaServed: [
    { "@type": "Country", name: "South Africa" },
    { "@type": "City", name: "Johannesburg" },
    { "@type": "City", name: "Pretoria" },
    { "@type": "City", name: "Cape Town" },
    { "@type": "City", name: "Durban" },
  ],
  priceRange: "$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Swimming Pool Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "New Pool Construction" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pool Renovations" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Weekly Pool Maintenance" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pool Equipment Repairs" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fibreglass Pool Repairs" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Marbelite Pool Repairs" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Eco-Friendly Pool Solutions" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pool Safety Systems" } },
    ],
  },
  sameAs: [],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
        <WhatsAppButton />
      </main>
    </>
  );
}
