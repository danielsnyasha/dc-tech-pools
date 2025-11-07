"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Shield, Users, Zap, Heart, CheckCircle } from "lucide-react";
import Image from "next/image";

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "Committed to delivering the highest quality pool services with exceptional craftsmanship.",
    gradient: "from-blue-600 to-blue-400",
  },
  {
    icon: Shield,
    title: "Reliability",
    description: "Trusted by hundreds of clients across South Africa for over 15 years.",
    gradient: "from-emerald-600 to-emerald-400",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Your satisfaction is our priority. We listen, understand, and deliver beyond expectations.",
    gradient: "from-purple-600 to-purple-400",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Using cutting-edge technology and eco-friendly solutions for modern pool systems.",
    gradient: "from-orange-600 to-orange-400",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "We love what we do, and it shows in every pool we build, renovate, or maintain.",
    gradient: "from-pink-600 to-pink-400",
  },
];

const certifications = [
  "Licensed & Insured Pool Contractors",
  "Certified Pool Operators (CPO)",
  "Health & Safety Compliant",
  "Eco-Friendly Certified",
  "Member of SA Pool Association",
  "15+ Years Industry Experience",
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white dark:bg-gray-950">
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
            className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-blue-100 to-emerald-100 rounded-full"
          >
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              ABOUT US
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            South Africa's Leading
            <br />
            <span className="text-gradient">Pool Specialists</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Since 2008, DC Tech Pools has been transforming backyards across South Africa and neighboring African countries into stunning
            aquatic paradises. We proudly serve clients throughout Southern Africa, bringing world-class pool solutions to the region. Our commitment to quality, innovation, and customer satisfaction sets us apart.
          </p>
        </motion.div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h3>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                Founded in 2008, DC Tech Pools started with a simple vision: to make luxury swimming pools
                accessible to every South African home while maintaining uncompromising quality standards.
              </p>
              <p>
                Over the years, we've grown from a small local operation to one of South Africa's most
                trusted pool service providers. We've completed over 1,000 pool projects, from intimate
                residential pools to large commercial installations.
              </p>
              <p>
                Our team of certified professionals brings decades of combined experience in pool construction,
                renovation, and maintenance. We stay ahead of industry trends, constantly updating our
                skills and adopting the latest eco-friendly technologies.
              </p>
              <p>
                Today, DC Tech Pools is proud to serve communities across South Africa and throughout the African continent,
                including Botswana, Namibia, Zimbabwe, and Mozambique. We deliver not just pools, but lifetime memories and endless summer fun to clients across the region.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/pool/case3-2.jpg"
                alt="DC Tech Pools Team"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h4 className="text-2xl font-bold mb-2">Trusted by 500+ Clients</h4>
                <p className="text-white/90">Building dreams since 2008</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Our Core Values</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-500 border-0 shadow-lg group bg-white dark:bg-gray-800">
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <value.icon className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{value.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-blue-600 via-emerald-600 to-purple-600 border-0 overflow-hidden relative">
            <CardContent className="py-16 px-8 relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                Certified & Trusted Professionals
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-white"
                  >
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{cert}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-12 text-center">
                <a href="#contact">
                  <Button
                    size="xl"
                    className="bg-white text-blue-900 hover:bg-gray-100 hover:text-blue-950 shadow-2xl hover:shadow-white/50 transform hover:scale-105 transition-all duration-300 font-bold"
                  >
                    Partner With Us Today
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
