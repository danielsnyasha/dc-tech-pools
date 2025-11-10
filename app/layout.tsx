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

export const metadata: Metadata = {
  title: "DC Tech Pools - Premium Swimming Pool Services in South Africa",
  description: "Expert swimming pool construction, renovations, maintenance, repairs, and eco-friendly solutions. Transforming backyards across South Africa with quality pool services.",
  keywords: ["swimming pools", "pool construction", "pool maintenance", "pool renovation", "fibreglass pools", "marbelite pools", "pool repairs", "eco-friendly pools", "South Africa"],
  authors: [{ name: "DC Tech Pools", email: "dennytech84@gmail.com" }],
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://dc-tech-pools.com",
    siteName: "DC Tech Pools",
    title: "DC Tech Pools - Premium Swimming Pool Services",
    description: "Expert swimming pool services across South Africa",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
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
