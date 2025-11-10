"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Waves, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const footerLinks = {
  services: [
    "New Pool Construction",
    "Pool Renovations",
    "Weekly Maintenance",
    "Equipment Repairs",
    "Fibreglass Repairs",
    "Marbelite Repairs",
    "Eco-Friendly Solutions",
    "Pool Safety Systems",
  ],
  company: [
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <Waves className="w-10 h-10 text-white relative z-10" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">DC Tech Pools</h3>
                <p className="text-sm text-gray-400">Premium Pool Services</p>
              </div>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Southern Africa&apos;s premier swimming pool specialists. Creating stunning aquatic experiences
              across South Africa and neighboring countries with quality craftsmanship and eco-friendly solutions since 2008.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-emerald-600 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((service, index) => (
                <li key={index}>
                  <a
                    href="#services"
                    className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full group-hover:scale-150 transition-transform"></div>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full group-hover:scale-150 transition-transform"></div>
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/admin"
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                >
                  <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full group-hover:scale-150 transition-transform"></div>
                  Admin Portal
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <a
                href="tel:+27649806086"
                className="flex items-start gap-3 text-gray-300 hover:text-blue-400 transition-colors group"
              >
                <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-emerald-600 transition-all duration-300 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Phone</div>
                  <div>+27 649 806 086</div>
                </div>
              </a>
              <a
                href="mailto:dennytech84@gmail.com"
                className="flex items-start gap-3 text-gray-300 hover:text-blue-400 transition-colors group"
              >
                <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-emerald-600 transition-all duration-300 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Email</div>
                  <div className="break-all">dennytech84@gmail.com</div>
                </div>
              </a>
              <div className="flex items-start gap-3 text-gray-300">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Location</div>
                  <div>Serving South Africa & African Region</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>
              © {currentYear} DC Tech Pools. All rights reserved. Designed with passion for
              excellence.
            </p>
            <div className="flex flex-wrap gap-6">
              <a href="#" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
