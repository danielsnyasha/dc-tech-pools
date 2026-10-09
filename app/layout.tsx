import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

const siteUrl = "https://www.dctechpools.co.za";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DC Tech Pools | Swimming Pool Services South Africa",
    template: "%s | DC Tech Pools",
  },
  description:
    "DC Tech Pools — South Africa's premier swimming pool specialists. Expert pool construction, renovations, maintenance & repairs in Johannesburg, Pretoria, Cape Town & beyond. 15+ years experience. Get a free quote today.",
  keywords: [
    "swimming pool South Africa",
    "swimming pool company",
    "pool construction South Africa",
    "pool renovation South Africa",
    "pool maintenance South Africa",
    "pool repairs",
    "fibreglass pool",
    "marbelite pool",
    "swimming pool Johannesburg",
    "swimming pool Pretoria",
    "swimming pool Cape Town",
    "pool installation",
    "eco-friendly pool",
    "pool services",
    "DC Tech Pools",
  ],
  authors: [{ name: "DC Tech Pools", url: siteUrl }],
  creator: "DC Tech Pools",
  publisher: "DC Tech Pools",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: siteUrl,
    siteName: "DC Tech Pools",
    title: "DC Tech Pools | Swimming Pool Services South Africa",
    description:
      "South Africa's premier pool specialists — construction, renovation, maintenance & eco-friendly solutions. 500+ happy clients, 15+ years experience.",
    images: [
      {
        url: "/images/pool/beautiful-luxury-outdoor-swimming-pool-hotel-resort.jpg",
        width: 1200,
        height: 630,
        alt: "DC Tech Pools — Premium Swimming Pool Services South Africa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DC Tech Pools | Swimming Pool Services South Africa",
    description:
      "South Africa's premier pool specialists — construction, renovation, maintenance & eco-friendly solutions.",
    images: ["/images/pool/beautiful-luxury-outdoor-swimming-pool-hotel-resort.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en-ZA" className="scroll-smooth dark" data-scroll-behavior="smooth" suppressHydrationWarning>
        <head>
          {/*
            Runs before first paint so the page never flashes the wrong theme.
            Dark is the default: only an explicit "light" choice opts out, and a
            blocked localStorage (private mode) still lands on dark.
          */}
          <script
            dangerouslySetInnerHTML={{
              __html:
                "(function(){try{var t=localStorage.getItem('theme');" +
                "document.documentElement.classList.toggle('dark',t!=='light');}" +
                "catch(e){document.documentElement.classList.add('dark');}})();",
            }}
          />
        </head>
        <body className={`${nunito.variable} antialiased`}>
          <ThemeProvider>
            <Toaster position="top-center" richColors />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
