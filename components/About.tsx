"use client";

import { motion } from "framer-motion";
import { Award, Shield, Users, Zap, Heart, CheckCircle, ArrowRight } from "lucide-react";
import Image from "next/image";

const values = [
  { icon: Award, title: "Excellence", description: "Highest quality craftsmanship on every single project.", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950/40" },
  { icon: Shield, title: "Reliability", description: "Trusted by hundreds of clients across South Africa for over 15 years.", color: "text-fuchsia-600 dark:text-fuchsia-400", bg: "bg-fuchsia-50 dark:bg-fuchsia-950/40" },
  { icon: Users, title: "Customer First", description: "Your satisfaction is our priority — we listen, understand and deliver.", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950/40" },
  { icon: Zap, title: "Innovation", description: "Cutting-edge technology and eco-friendly solutions for modern pools.", color: "text-fuchsia-600 dark:text-fuchsia-400", bg: "bg-fuchsia-50 dark:bg-fuchsia-950/40" },
  { icon: Heart, title: "Passion", description: "We love what we do, and it shows in every pool we build.", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950/40" },
];

const certifications = [
  "Licensed & Insured Pool Contractors",
  "Certified Pool Operators (CPO)",
  "Health & Safety Compliant",
  "Eco-Friendly Certified",
  "Member of SA Pool Association",
  "15+ Years Industry Experience",
];

const stats = [
  { value: "500+", label: "Happy Clients" },
  { value: "1,000+", label: "Pools Built" },
  { value: "15+", label: "Years Experience" },
  { value: "98%", label: "Satisfaction Rate" },
];

export default function About() {
  return (
    <section id="about" className="py-28 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-600 dark:text-blue-400 mb-4 block">
            About Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-5 tracking-tight">
            South Africa&apos;s Leading
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-fuchsia-500 bg-clip-text text-transparent">
              Pool Specialists
            </span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Since 2008, DC Tech Pools has been transforming backyards across Southern Africa
            into stunning aquatic paradises with uncompromising quality.
          </p>
        </motion.div>

        {/* Story + Image */}
        <div className="grid lg:grid-cols-2 gap-14 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-5">Our Story</h3>
            <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                Founded in 2008, DC Tech Pools started with a simple vision: to make luxury swimming
                pools accessible to every South African home while maintaining uncompromising
                quality standards.
              </p>
              <p>
                Over the years, we&apos;ve grown from a small local operation to one of South Africa&apos;s
                most trusted pool service providers — completing over 1,000 projects, from intimate
                residential pools to large commercial installations.
              </p>
              <p>
                Today, DC Tech Pools proudly serves communities across South Africa and throughout
                the African continent, including Botswana, Namibia, Zimbabwe and Mozambique.
              </p>
            </div>
            <div className="mt-8">
              <a href="#contact">
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all duration-200 shadow-md shadow-blue-600/25">
                  Partner With Us
                  <ArrowRight className="w-4 h-4" />
                </button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-blue-500/15 to-fuchsia-500/10 blur-xl" />
            <div className="relative h-[480px] rounded-3xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800">
              <Image
                src="/images/pool/case3-2.jpg"
                alt="DC Tech Pools - trusted pool specialists"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-3">
                {stats.map((s) => (
                  <div key={s.label} className="bg-slate-950/60 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3">
                    <div className="text-xl font-bold text-white leading-none">{s.value}</div>
                    <div className="text-slate-400 text-xs mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-10 text-center">Our Core Values</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex items-start gap-4 p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-10 h-10 ${v.bg} ${v.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <v.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{v.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{v.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-blue-900 px-8 py-14"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(148,163,184,0.07) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-blue-900" />
            <div className="relative z-10 text-center mb-10">
              <h3 className="text-2xl font-bold text-white">Certified &amp; Trusted Professionals</h3>
            </div>
            <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                >
                  <CheckCircle className="w-4 h-4 text-fuchsia-400 flex-shrink-0" />
                  <span className="text-slate-300 text-sm font-medium">{cert}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
