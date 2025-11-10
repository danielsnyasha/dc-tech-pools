"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Droplets, Award, Users, Sparkles } from "lucide-react";

function Counter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration,
      onUpdate(latest) {
        setCount(Math.floor(latest));
      },
    });
    return controls.stop;
  }, [value, duration]);

  return <>{count}</>;
}

const stats = [
  { icon: Users, value: 500, suffix: "+", label: "Happy Clients" },
  { icon: Award, value: 15, suffix: "+", label: "Years Experience" },
  { icon: Droplets, value: 1000, suffix: "+", label: "Pools Built" },
  { icon: Sparkles, value: 98, suffix: "%", label: "Satisfaction" },
];

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-700 to-emerald-600 animated-gradient"></div>

      {/* Floating Shapes */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 right-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
            >
              <span className="text-sm font-semibold">South Africa&apos;s Premier Pool Specialists</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              Transform Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-emerald-200 to-purple-200">
                Backyard Paradise
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed"
            >
              Expert swimming pool construction, renovations, maintenance, and eco-friendly solutions.
              Creating stunning aquatic experiences since 2008.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <a href="#contact">
                <Button
                  size="xl"
                  className="bg-white text-blue-900 hover:bg-gray-100 hover:text-blue-950 shadow-2xl hover:shadow-white/50 transform hover:scale-105 transition-all duration-300 font-bold"
                >
                  Get Free Consultation
                </Button>
              </a>
              <a href="#services">
                <Button
                  size="xl"
                  className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-blue-900 shadow-xl font-bold"
                >
                  Explore Services
                </Button>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-2">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-bold mb-1">
                    <Counter value={stat.value} duration={2.5} />
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Image Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 rounded-3xl overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 z-10"></div>
                <Image
                  src="/images/pool/beautiful-luxury-outdoor-swimming-pool-hotel-resort.jpg"
                  alt="Luxury Swimming Pool"
                  width={600}
                  height={700}
                  className="w-full h-auto object-cover"
                  priority
                />
              </motion.div>

              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-8 -left-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl z-20 max-w-xs"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">Eco-Friendly</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Sustainable Solutions</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
                className="absolute -top-8 -right-8 bg-gradient-to-br from-purple-600 to-pink-600 p-6 rounded-2xl shadow-2xl z-20"
              >
                <div className="text-center text-white">
                  <div className="text-4xl font-bold">24/7</div>
                  <div className="text-sm">Support</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-3 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
