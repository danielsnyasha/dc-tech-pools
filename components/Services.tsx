"use client";

import { motion } from "framer-motion";
import { ArrowRight, Hammer, Wrench, Droplets, Leaf, Paintbrush, Settings, Sparkles, Shield, Zap, ThermometerSun, Waves, CircleDot } from "lucide-react";

const services = [
  { icon: Hammer, title: "New Pool Construction", description: "Custom-designed swimming pools from concept to completion. Concrete, fibreglass, infinity and vanishing edge options.", color: "blue" },
  { icon: Paintbrush, title: "Pool Renovations", description: "Transform your aging pool into a modern masterpiece with complete resurfacing, retiling and equipment upgrades.", color: "teal" },
  { icon: Wrench, title: "Weekly Maintenance", description: "Professional care to keep your pool crystal clear year-round — chemistry testing, filtering and equipment checks.", color: "slate" },
  { icon: Settings, title: "Equipment Repair & Upgrades", description: "Expert repair of pumps, filters, heaters and automation systems. Faster turnaround, longer lifespan.", color: "blue" },
  { icon: Droplets, title: "Fibreglass Pool Repairs", description: "Specialized fibreglass restoration — crack repairs, gel coat resurfacing and full colour restoration.", color: "teal" },
  { icon: Paintbrush, title: "Marbelite Repairs", description: "Smooth marbelite finishing and repair. Resurfacing, crack filling, colour matching and waterproofing.", color: "slate" },
  { icon: Leaf, title: "Eco-Friendly Solutions", description: "Solar heating, saltwater chlorination, variable speed pumps and LED upgrades for sustainable pool ownership.", color: "blue" },
  { icon: Shield, title: "Pool Safety Systems", description: "Protect your family with safety nets, fencing, gate locks, alarm systems and non-slip surface treatments.", color: "teal" },
  { icon: ThermometerSun, title: "Pool Heating Solutions", description: "Extend your swimming season with solar, gas or heat pump systems. Pool covers and blankets available.", color: "slate" },
  { icon: Zap, title: "Automation & Smart Pools", description: "WiFi-enabled controllers, automated chemical dosing and remote temperature management from your phone.", color: "blue" },
  { icon: Waves, title: "Water Features & Fountains", description: "Waterfalls, deck jets, bubblers and custom LED-lit rock formations to elevate your pool's aesthetic.", color: "teal" },
  { icon: CircleDot, title: "Pool Tiling & Coping", description: "Mosaic tile installation, coping stone replacement, waterline tile repairs and fully custom tile designs.", color: "slate" },
];

const colorMap = {
  blue: { bg: "bg-blue-50 dark:bg-blue-950/40", text: "text-blue-600 dark:text-blue-400", border: "group-hover:border-blue-200 dark:group-hover:border-blue-800" },
  teal: { bg: "bg-fuchsia-50 dark:bg-fuchsia-950/40", text: "text-fuchsia-600 dark:text-fuchsia-400", border: "group-hover:border-fuchsia-200 dark:group-hover:border-fuchsia-800" },
  slate: { bg: "bg-slate-100 dark:bg-slate-800", text: "text-slate-600 dark:text-slate-300", border: "group-hover:border-slate-300 dark:group-hover:border-slate-600" },
};

export default function Services() {
  return (
    <section id="services" className="py-28 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-600 dark:text-blue-400">
              Our Services
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-5 tracking-tight">
            Complete Pool Solutions
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              Under One Roof
            </span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            From new construction to eco-friendly upgrades, we offer comprehensive
            swimming pool services across South Africa.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => {
            const c = colorMap[service.color as keyof typeof colorMap];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
                className={`group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 ${c.border}`}
              >
                <div className={`w-11 h-11 ${c.bg} ${c.text} rounded-xl flex items-center justify-center mb-4`}>
                  <service.icon className="w-5 h-5" />
                </div>
                <h3 className="text-[16px] font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {service.description}
                </p>
                <a
                  href="#contact"
                  className={`inline-flex items-center gap-1.5 text-sm font-medium ${c.text} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
                >
                  Get a quote
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-16"
        >
          <div
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-blue-900 px-8 py-14 text-center"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(148,163,184,0.08) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-blue-900" />
            <div className="relative z-10">
              <Sparkles className="w-10 h-10 text-fuchsia-400 mx-auto mb-5" />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Not Sure Which Service You Need?
              </h3>
              <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                Our expert team will assess your pool and recommend the best solutions for your needs and budget.
              </p>
              <a href="#contact">
                <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-950 font-semibold rounded-full hover:bg-blue-50 transition-all duration-200 shadow-xl">
                  Schedule Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
