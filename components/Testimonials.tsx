"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Sarah Johnson", location: "Sandton, Johannesburg", rating: 5, service: "New Pool Construction", comment: "DC Tech Pools transformed our backyard into a paradise! The team was professional, punctual, and delivered beyond our expectations. Our infinity pool is absolutely stunning!", date: "2 months ago" },
  { name: "Michael Van Der Merwe", location: "Cape Town", rating: 5, service: "Pool Renovation", comment: "We had an old, dated pool that needed serious work. DC Tech Pools completely renovated it with modern tiles, new equipment, and eco-friendly features. It looks brand new!", date: "1 month ago" },
  { name: "Thandi Ndlovu", location: "Durban", rating: 5, service: "Weekly Maintenance", comment: "Excellent maintenance service! They keep our pool crystal clear year-round. Very reliable and always on time. Highly recommend their maintenance packages.", date: "3 weeks ago" },
  { name: "David Robertson", location: "Pretoria", rating: 4, service: "Equipment Repair", comment: "Quick response when our pool pump failed. They diagnosed the issue and replaced the pump with a more efficient model. The service was good, though it took slightly longer than expected.", date: "1 week ago" },
  { name: "Lisa Patel", location: "Johannesburg", rating: 5, service: "Eco-Friendly Solutions", comment: "Love our new solar heating system! DC Tech Pools helped us go green and we're saving so much on electricity. The installation was seamless and the team explained everything clearly.", date: "2 weeks ago" },
  { name: "Johan Botha", location: "Stellenbosch", rating: 5, service: "Fibreglass Repairs", comment: "Professional fibreglass repair service. They fixed cracks and resurfaced our pool beautifully. The color matching was perfect and it looks as good as new!", date: "1 month ago" },
  { name: "Amara Okafor", location: "Gaborone, Botswana", rating: 5, service: "New Pool Construction", comment: "We were thrilled to find DC Tech Pools available in Botswana. They built us a beautiful pool and the team was incredibly professional throughout the entire process.", date: "3 months ago" },
  { name: "Pieter Kruger", location: "Windhoek, Namibia", rating: 4, service: "Pool Renovation", comment: "Good renovation work on our resort pool. The quality is solid and they completed the project on schedule. Communication could have been better but overall satisfied with the results.", date: "2 months ago" },
];

const RatingStars = ({ rating, small = false }: { rating: number; small?: boolean }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`${small ? "w-3.5 h-3.5" : "w-4 h-4"} ${
          i < rating ? "fill-amber-400 text-amber-400" : "fill-white/10 text-white/10"
        }`}
      />
    ))}
  </div>
);

export default function Testimonials() {
  const avg = (testimonials.reduce((a, c) => a + c.rating, 0) / testimonials.length).toFixed(1);

  return (
    <section
      id="testimonials"
      className="py-28 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle, #94a3b8 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-fuchsia-600/08 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-fuchsia-400 mb-4 block">
            Client Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            What Our Clients Say
            <br />
            <span className="bg-gradient-to-r from-sky-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
              About Our Services
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-8">
            Don&apos;t just take our word for it. See what hundreds of satisfied customers
            across South Africa have to say.
          </p>

          {/* Overall Rating */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-5 bg-white/5 border border-white/10 backdrop-blur-sm px-8 py-4 rounded-2xl"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-white leading-none">{avg}</div>
              <div className="mt-1.5">
                <RatingStars rating={Math.round(parseFloat(avg))} />
              </div>
            </div>
            <div className="w-px h-10 bg-white/15" />
            <div className="text-left">
              <div className="text-2xl font-bold text-white leading-none">20+</div>
              <div className="text-slate-400 text-sm mt-0.5">Verified reviews</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-white/20 transition-all duration-300 backdrop-blur-sm flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-9 h-9 rounded-xl bg-fuchsia-500/20 flex items-center justify-center flex-shrink-0">
                  <Quote className="w-4 h-4 text-fuchsia-400" />
                </div>
                <RatingStars rating={t.rating} small />
              </div>

              <span className="inline-block px-2.5 py-1 bg-white/8 text-fuchsia-300 text-xs font-medium rounded-full mb-3 self-start">
                {t.service}
              </span>

              <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-5">
                &quot;{t.comment}&quot;
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{t.location}</div>
                </div>
                <div className="text-slate-600 text-xs">{t.date}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: "500+", label: "Happy Clients" },
            { value: "98%", label: "Satisfaction Rate" },
            { value: "15+", label: "Years Experience" },
            { value: "24/7", label: "Support Available" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-fuchsia-400 mb-1">{s.value}</div>
              <div className="text-slate-500 text-sm">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-400 mb-5">Join hundreds of satisfied customers across South Africa</p>
          <a href="#contact">
            <button className="px-8 py-3.5 bg-white text-blue-950 font-semibold rounded-full hover:bg-blue-50 transition-all duration-200 shadow-xl shadow-white/10 text-[15px]">
              Get Your Free Quote Today
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
