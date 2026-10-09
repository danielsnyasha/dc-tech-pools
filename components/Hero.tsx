"use client";

import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Award, Users, Droplets, Sparkles } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Counts up once, when it actually comes into view.
 *
 * The previous version started on mount regardless of visibility and stepped
 * with setInterval, which drifts against the refresh rate and visibly stutters.
 * This drives off requestAnimationFrame and eases out, so the number decelerates
 * into its final value instead of marching there linearly.
 */
function Counter({ value, duration = 1.8 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setCount(value);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      setCount(Math.round(easeOut(progress) * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, value, duration]);

  return <span ref={ref}>{count}</span>;
}

const stats = [
  { icon: Users, value: 500, suffix: "+", label: "Happy Clients" },
  { icon: Award, value: 15, suffix: "+", label: "Years Experience" },
  { icon: Droplets, value: 1000, suffix: "+", label: "Pools Built" },
  { icon: Sparkles, value: 98, suffix: "%", label: "Satisfaction" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Depth: the photo drifts slower than the page. Tied to this section's own
  // scroll progress so it stops moving once the section is gone.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="grain relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-900"
    >
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #94a3b8 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, #000 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, #000 40%, transparent 100%)",
        }}
      />

      {/* Ambient brand light. Fades as you scroll so it doesn't fight the
          section below. */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { opacity: glowOpacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-[620px] h-[620px] bg-sky-500/20 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 right-1/5 w-[460px] h-[460px] bg-fuchsia-600/18 rounded-full blur-[110px]" />
        <div className="absolute top-1/2 left-1/2 w-[380px] h-[380px] bg-violet-600/12 rounded-full blur-[100px]" />
      </motion.div>

      <div className="container mx-auto px-6 lg:px-8 pt-32 pb-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div style={reduce ? undefined : { y: copyY }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="inline-flex items-center gap-2.5 mb-7 pl-2 pr-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2 ml-1">
                <span className="absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-fuchsia-400" />
              </span>
              <span className="text-[13px] font-medium tracking-wide text-white/80">
                South Africa&apos;s Premier Pool Specialists
              </span>
            </motion.div>

            {/*
              Lines reveal from behind a mask rather than fading in together.
              Type that wipes up into place reads as typeset; three stacked
              fade-ups read as a template.
            */}
            <h1 className="text-5xl md:text-6xl lg:text-[64px] font-bold leading-[1.06] tracking-tight text-white mb-6">
              {["Transform Your", "Backyard", "Into a Paradise"].map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={reduce ? { opacity: 0 } : { y: "100%" }}
                    animate={reduce ? { opacity: 1 } : { y: 0 }}
                    transition={{ duration: 0.75, delay: 0.1 + i * 0.09, ease: EASE }}
                  >
                    {line === "Backyard" ? (
                      <span className="bg-gradient-to-r from-sky-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                        {line}
                      </span>
                    ) : (
                      line
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42, ease: EASE }}
              className="text-lg text-slate-300/90 leading-relaxed mb-10 max-w-lg"
            >
              Expert swimming pool construction, renovations, maintenance &amp; eco-friendly
              solutions across South Africa. Creating stunning aquatic experiences since 2008.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
              className="flex flex-col sm:flex-row gap-3 mb-14"
            >
              <a href="#contact">
                <button className="sheen inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-blue-950 font-semibold rounded-full text-[15px] shadow-xl shadow-sky-500/10 hover:shadow-fuchsia-500/20 hover:-translate-y-0.5 active:translate-y-0">
                  Book Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </button>
              </a>
              <a href="#gallery">
                <button className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/25 text-white font-semibold rounded-full text-[15px] backdrop-blur-sm hover:bg-white/10 hover:border-white/40 hover:-translate-y-0.5 active:translate-y-0">
                  View Our Work
                </button>
              </a>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.07, ease: EASE }}
                  className="group relative flex flex-col items-center text-center p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm transition-colors duration-300 hover:bg-white/[0.07] hover:border-fuchsia-400/30"
                >
                  <stat.icon className="w-4 h-4 text-fuchsia-400 mb-2 transition-transform duration-300 group-hover:scale-110" />
                  <div className="text-2xl font-bold text-white leading-none tabular-nums">
                    <Counter value={stat.value} />
                    {stat.suffix}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1.5 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="relative hidden lg:block"
            style={reduce ? undefined : { y: imageY }}
          >
            <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-sky-500/25 via-violet-500/20 to-fuchsia-500/25 blur-2xl" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent z-10" />
              <Image
                src="/images/pool/beautiful-luxury-outdoor-swimming-pool-hotel-resort.jpg"
                alt="Luxury swimming pool built by DC Tech Pools"
                width={720}
                height={810}
                sizes="(max-width: 1024px) 0px, 45vw"
                className="w-full h-[580px] object-cover"
                priority
              />
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.95, ease: EASE }}
                className="absolute bottom-5 left-5 z-20 flex items-center gap-3 bg-slate-950/70 backdrop-blur-xl border border-white/15 rounded-2xl px-4 py-3"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 via-violet-500 to-fuchsia-500 flex items-center justify-center flex-shrink-0">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm leading-none">Est. 2008</div>
                  <div className="text-slate-400 text-xs mt-1">15+ Years of Excellence</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#services"
        aria-label="Scroll to services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 group"
      >
        <div className="w-5 h-9 border-2 border-white/25 rounded-full flex items-start justify-center pt-1.5 transition-colors duration-300 group-hover:border-fuchsia-400/60">
          <motion.div
            animate={reduce ? undefined : { y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2.5 bg-white/60 rounded-full"
          />
        </div>
      </motion.a>
    </section>
  );
}
