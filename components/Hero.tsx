"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Award, Users, Droplets, Sparkles } from "lucide-react";

function Counter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, (duration * 1000) / steps);
    return () => clearInterval(interval);
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
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-900"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #94a3b8 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-fuchsia-600/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
              <span className="text-sm font-medium text-white/80">
                South Africa&apos;s Premier Pool Specialists
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-[64px] font-bold leading-[1.06] tracking-tight text-white mb-6"
            >
              Transform Your
              <br />
              <span className="bg-gradient-to-r from-sky-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                Backyard
              </span>{" "}
              Into a
              <br />
              Paradise
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-slate-300 leading-relaxed mb-10 max-w-lg"
            >
              Expert swimming pool construction, renovations, maintenance &amp; eco-friendly
              solutions across South Africa. Creating stunning aquatic experiences since 2008.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 mb-14"
            >
              <a href="#contact">
                <button className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-blue-950 font-semibold rounded-full hover:bg-blue-50 transition-all duration-200 shadow-xl shadow-white/10 text-[15px]">
                  Book Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </button>
              </a>
              <a href="#gallery">
                <button className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/25 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-200 backdrop-blur-sm text-[15px]">
                  View Our Work
                </button>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.55 + i * 0.07 }}
                  className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                  <stat.icon className="w-4 h-4 text-fuchsia-400 mb-2" />
                  <div className="text-2xl font-bold text-white leading-none">
                    <Counter value={stat.value} duration={2.2} />
                    {stat.suffix}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Image */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="relative hidden lg:block"
          >
            <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-sky-500/25 via-violet-500/20 to-fuchsia-500/25 blur-2xl" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent z-10" />
              <Image
                src="/images/pool/beautiful-luxury-outdoor-swimming-pool-hotel-resort.jpg"
                alt="Luxury Swimming Pool by DC Tech Pools"
                width={640}
                height={720}
                className="w-full h-[580px] object-cover"
                priority
              />
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="absolute bottom-5 left-5 z-20 flex items-center gap-3 bg-slate-950/70 backdrop-blur-xl border border-white/15 rounded-2xl px-4 py-3"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 via-violet-500 to-fuchsia-500 flex items-center justify-center flex-shrink-0">
                  <Award className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm leading-none">Est. 2008</div>
                  <div className="text-slate-400 text-xs mt-0.5">15+ Years of Excellence</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-9 border-2 border-white/30 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2.5 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
