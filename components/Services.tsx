"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Hammer,
  Wrench,
  Droplets,
  Leaf,
  Paintbrush,
  Settings,
  Sparkles,
  Shield,
  Zap,
  ThermometerSun,
  Waves,
  CircleDot,
} from "lucide-react";

const services = [
  {
    icon: Hammer,
    title: "New Pool Construction",
    description: "Custom-designed swimming pools tailored to your space and style. From concept to completion, we build your dream pool.",
    features: [
      "Custom design consultation",
      "Concrete & fibreglass options",
      "Infinity & vanishing edge pools",
      "Integrated spa & water features",
    ],
    gradient: "from-blue-600 to-blue-400",
    delay: 0.1,
  },
  {
    icon: Paintbrush,
    title: "Pool Renovations",
    description: "Transform your aging pool into a modern masterpiece. Complete makeovers and upgrades to enhance beauty and functionality.",
    features: [
      "Surface resurfacing & retiling",
      "Equipment upgrades",
      "Modern automation systems",
      "Energy-efficient conversions",
    ],
    gradient: "from-emerald-600 to-emerald-400",
    delay: 0.2,
  },
  {
    icon: Wrench,
    title: "Weekly Maintenance",
    description: "Professional pool maintenance services to keep your pool crystal clear and perfectly balanced year-round.",
    features: [
      "Water chemistry testing & balancing",
      "Filter cleaning & backwashing",
      "Vacuuming & brushing",
      "Equipment inspection",
    ],
    gradient: "from-purple-600 to-purple-400",
    delay: 0.3,
  },
  {
    icon: Settings,
    title: "Equipment Repair & Upgrades",
    description: "Expert repair and replacement of all pool equipment. We fix pumps, filters, heaters, and automation systems.",
    features: [
      "Pump & filter repairs",
      "Heater installation & repair",
      "Chlorinator replacement",
      "Automation system upgrades",
    ],
    gradient: "from-orange-600 to-orange-400",
    delay: 0.4,
  },
  {
    icon: Droplets,
    title: "Fibreglass Pool Repairs",
    description: "Specialized fibreglass pool restoration services. We repair cracks, chips, and resurface fibreglass pools.",
    features: [
      "Crack & chip repairs",
      "Gel coat resurfacing",
      "Color restoration",
      "Structural integrity checks",
    ],
    gradient: "from-cyan-600 to-cyan-400",
    delay: 0.5,
  },
  {
    icon: Paintbrush,
    title: "Marbelite Repairs",
    description: "Expert marbelite pool finishing and repair services. Restore the smooth, beautiful surface of your pool.",
    features: [
      "Marbelite resurfacing",
      "Crack & hollow repairs",
      "Color matching",
      "Waterproofing treatment",
    ],
    gradient: "from-pink-600 to-pink-400",
    delay: 0.6,
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Solutions",
    description: "Sustainable pool systems that reduce environmental impact and operating costs. Go green with your pool.",
    features: [
      "Solar heating systems",
      "Saltwater chlorination",
      "Variable speed pumps",
      "LED lighting upgrades",
    ],
    gradient: "from-green-600 to-green-400",
    delay: 0.7,
  },
  {
    icon: Shield,
    title: "Pool Safety Systems",
    description: "Comprehensive safety solutions to protect your family. From covers to fencing and alarms.",
    features: [
      "Safety net installations",
      "Pool fencing & gates",
      "Alarm systems",
      "Non-slip surface treatments",
    ],
    gradient: "from-red-600 to-red-400",
    delay: 0.8,
  },
  {
    icon: ThermometerSun,
    title: "Pool Heating Solutions",
    description: "Extend your swimming season with efficient heating systems. Solar, gas, and heat pump options.",
    features: [
      "Solar heating installation",
      "Gas heater setup",
      "Heat pump systems",
      "Pool blankets & covers",
    ],
    gradient: "from-yellow-600 to-yellow-400",
    delay: 0.9,
  },
  {
    icon: Zap,
    title: "Automation & Smart Pools",
    description: "Modern pool automation for effortless control. Manage your pool from your smartphone.",
    features: [
      "WiFi-enabled controllers",
      "Automated chemical dosing",
      "Remote temperature control",
      "Smart lighting systems",
    ],
    gradient: "from-indigo-600 to-indigo-400",
    delay: 1.0,
  },
  {
    icon: Waves,
    title: "Water Features & Fountains",
    description: "Add elegance with custom water features. Waterfalls, fountains, and decorative elements.",
    features: [
      "Waterfall installations",
      "Deck jets & bubblers",
      "LED lighting effects",
      "Custom rock formations",
    ],
    gradient: "from-teal-600 to-teal-400",
    delay: 1.1,
  },
  {
    icon: CircleDot,
    title: "Pool Tiling & Coping",
    description: "Beautiful and durable tiling solutions. Enhance your pool's aesthetic with quality materials.",
    features: [
      "Mosaic tile installation",
      "Coping stone replacement",
      "Waterline tile repairs",
      "Custom tile designs",
    ],
    gradient: "from-slate-600 to-slate-400",
    delay: 1.2,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-gradient-to-br from-blue-50 via-emerald-50 to-purple-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4 px-6 py-2 bg-white rounded-full shadow-lg"
          >
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              OUR SERVICES
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Complete Pool Solutions
            <br />
            <span className="text-gradient">Under One Roof</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From new construction to maintenance and eco-friendly upgrades, we offer comprehensive
            swimming pool services across South Africa.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: service.delay }}
            >
              <Card className="h-full group hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden relative bg-white dark:bg-gray-800">
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                <CardHeader>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-2xl transition-shadow duration-300`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <CardTitle className="text-2xl mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600 dark:text-gray-300">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: service.delay + 0.1 * idx }}
                        className="flex items-start gap-3"
                      >
                        <div className={`w-2 h-2 bg-gradient-to-br ${service.gradient} rounded-full mt-2 flex-shrink-0`}></div>
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: service.delay + 0.4 }}
                    className="mt-6"
                  >
                    <a href="#contact">
                      <Button variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                        Get a Quote
                      </Button>
                    </a>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <Card className="bg-gradient-to-br from-blue-600 via-emerald-600 to-purple-600 border-0 overflow-hidden relative">
            <CardContent className="py-16 relative z-10">
              <Sparkles className="w-16 h-16 text-white mx-auto mb-6" />
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Not Sure Which Service You Need?
              </h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Our expert team will assess your pool and recommend the best solutions for your needs and budget.
              </p>
              <a href="#contact">
                <Button size="xl" className="bg-white text-blue-900 hover:bg-gray-100 hover:text-blue-950 shadow-2xl hover:shadow-white/50 transform hover:scale-105 transition-all duration-300 font-bold">
                  Schedule Free Consultation
                </Button>
              </a>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
