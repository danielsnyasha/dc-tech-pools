"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "Sandton, Johannesburg",
    rating: 5,
    service: "New Pool Construction",
    comment:
      "DC Tech Pools transformed our backyard into a paradise! The team was professional, punctual, and delivered beyond our expectations. Our infinity pool is absolutely stunning!",
    date: "2 months ago",
  },
  {
    name: "Michael Van Der Merwe",
    location: "Cape Town",
    rating: 5,
    service: "Pool Renovation",
    comment:
      "We had an old, dated pool that needed serious work. DC Tech Pools completely renovated it with modern tiles, new equipment, and eco-friendly features. It looks brand new!",
    date: "1 month ago",
  },
  {
    name: "Thandi Ndlovu",
    location: "Durban",
    rating: 5,
    service: "Weekly Maintenance",
    comment:
      "Excellent maintenance service! They keep our pool crystal clear year-round. Very reliable and always on time. Highly recommend their maintenance packages.",
    date: "3 weeks ago",
  },
  {
    name: "David Robertson",
    location: "Pretoria",
    rating: 4,
    service: "Equipment Repair",
    comment:
      "Quick response when our pool pump failed. They diagnosed the issue and replaced the pump with a more efficient model. The service was good, though it took slightly longer than expected.",
    date: "1 week ago",
  },
  {
    name: "Lisa Patel",
    location: "Johannesburg",
    rating: 5,
    service: "Eco-Friendly Solutions",
    comment:
      "Love our new solar heating system! DC Tech Pools helped us go green and we're saving so much on electricity. The installation was seamless and the team explained everything clearly.",
    date: "2 weeks ago",
  },
  {
    name: "Johan Botha",
    location: "Stellenbosch",
    rating: 5,
    service: "Fibreglass Repairs",
    comment:
      "Professional fibreglass repair service. They fixed cracks and resurfaced our pool beautifully. The color matching was perfect and it looks as good as new!",
    date: "1 month ago",
  },
  {
    name: "Amara Okafor",
    location: "Gaborone, Botswana",
    rating: 5,
    service: "New Pool Construction",
    comment:
      "We were thrilled to find DC Tech Pools services available in Botswana. They built us a beautiful pool and the team was incredibly professional throughout the entire process.",
    date: "3 months ago",
  },
  {
    name: "Pieter Kruger",
    location: "Windhoek, Namibia",
    rating: 4,
    service: "Pool Renovation",
    comment:
      "Good renovation work on our resort pool. The quality is solid and they completed the project on schedule. Communication could have been better but overall satisfied with the results.",
    date: "2 months ago",
  },
];

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-300 text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default function Testimonials() {
  const averageRating = (
    testimonials.reduce((acc, curr) => acc + curr.rating, 0) / testimonials.length
  ).toFixed(1);

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-gray-950">
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
              CLIENT TESTIMONIALS
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            What Our Clients Say
            <br />
            <span className="text-gradient">About Our Services</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Don't just take our word for it. See what hundreds of satisfied customers across South Africa
            have to say about their experience with DC Tech Pools.
          </p>

          {/* Overall Rating */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-4 rounded-full shadow-xl"
          >
            <div className="text-center">
              <div className="text-5xl font-bold">{averageRating}</div>
              <RatingStars rating={Math.round(parseFloat(averageRating))} />
            </div>
            <div className="border-l border-white/30 pl-4">
              <div className="text-2xl font-bold">20+</div>
              <div className="text-sm opacity-90">Reviews</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-500 border-0 shadow-lg group relative overflow-hidden bg-white dark:bg-gray-800">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <CardContent className="p-6 relative z-10">
                  {/* Quote Icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Quote className="w-6 h-6 text-white" />
                  </div>

                  {/* Rating */}
                  <RatingStars rating={testimonial.rating} />

                  {/* Service Type */}
                  <div className="mt-4 inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                    {testimonial.service}
                  </div>

                  {/* Comment */}
                  <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                    "{testimonial.comment}"
                  </p>

                  {/* Author Info */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonial.location}
                        </p>
                      </div>
                      <div className="text-xs text-gray-400">
                        {testimonial.date}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: "500+", label: "Happy Clients" },
              { value: "98%", label: "Satisfaction Rate" },
              { value: "15+", label: "Years Experience" },
              { value: "24/7", label: "Support Available" },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Join hundreds of satisfied customers across South Africa
          </p>
          <a href="#contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 via-emerald-600 to-purple-600 text-white px-12 py-4 rounded-full text-lg font-bold shadow-2xl hover:shadow-xl hover:opacity-90 transition-all duration-300"
            >
              Get Your Free Quote Today
            </motion.button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
