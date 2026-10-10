"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const services = [
  "New Pool Construction",
  "Pool Renovations",
  "Weekly Maintenance",
  "Equipment Repairs",
  "Fibreglass Repairs",
  "Marbelite Repairs",
  "Eco-Friendly Solutions",
  "Pool Safety Systems",
];

const links = [
  { name: "About Us", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Gallery", href: "#gallery" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

const socials = [
  { icon: Facebook, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Linkedin, href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/images/pool/logo-light.png"
                alt="Denny Tech Blue Horizon"
                width={300}
                height={100}
                className="h-11 w-auto object-contain"
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Southern Africa&apos;s premier swimming pool specialists. Quality craftsmanship
              and eco-friendly solutions since 2008.
            </p>
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-600 flex items-center justify-center transition-all duration-200"
                >
                  <Icon className="w-4 h-4 text-slate-400 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-slate-500 mb-5">Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-slate-400 hover:text-white text-sm transition-colors duration-150">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-slate-500 mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.name}>
                  <a href={l.href} className="text-slate-400 hover:text-white text-sm transition-colors duration-150">
                    {l.name}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/admin" className="text-slate-400 hover:text-white text-sm transition-colors duration-150">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-slate-500 mb-5">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <a
                  href="tel:+27752694119"
                  aria-label="Call +27 75 269 4119"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-200"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
                </a>
                <div>
                  <div className="text-xs text-slate-600 mb-0.5">Phone</div>
                  <a
                    href="tel:+27752694119"
                    className="block text-slate-300 text-sm hover:text-white transition-colors"
                  >
                    +27 75 269 4119
                  </a>
                  <a
                    href="tel:+27649806086"
                    className="block text-slate-500 text-xs hover:text-slate-300 transition-colors"
                  >
                    +27 64 980 6086 (alt)
                  </a>
                </div>
              </div>
              <a href="mailto:dennytech84@gmail.com" className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-200">
                  <Mail className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-xs text-slate-600 mb-0.5">Email</div>
                  <div className="text-slate-300 text-sm break-all group-hover:text-white transition-colors">dennytech84@gmail.com</div>
                </div>
              </a>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-600 mb-0.5">Location</div>
                  <div className="text-slate-400 text-sm">South Africa &amp; Africa</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-sm">
            &copy; {year} DC Tech Pools. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-slate-600">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
