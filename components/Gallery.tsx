"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const galleryImages = [
  { src: "/images/pool/beautiful-luxury-outdoor-swimming-pool-hotel-resort.jpg", alt: "Luxury outdoor swimming pool at resort", category: "Completed Work" },
  { src: "/images/pool/case3-2.jpg", alt: "Modern pool design", category: "Completed Work" },
  { src: "/images/pool/pool.jpg", alt: "Custom swimming pool installation", category: "Completed Work" },
  { src: "/images/pool/06ef6dca-4a31-45a3-afa6-b98f46f5adf3.jpeg", alt: "Professional pool construction project", category: "Completed Work" },
  { src: "/images/pool/16ea08d3-7501-452d-86ce-a49856e91985.jpeg", alt: "Premium pool installation", category: "Completed Work" },
  { src: "/images/pool/20cd2fa1-e085-4b01-82eb-c430c6b19b2b.jpeg", alt: "Stunning residential pool", category: "Completed Work" },
  { src: "/images/pool/21b69e9e-0075-400a-81dc-2728cee47e44.jpeg", alt: "Modern swimming pool design", category: "Completed Work" },
  { src: "/images/pool/31a068b2-dfef-4e8a-ab3f-5ceda9f0cf57.jpeg", alt: "Elegant pool construction", category: "Completed Work" },
  { src: "/images/pool/36b0ae35-1ad5-4826-ac5c-cbcfb9e8a935.jpeg", alt: "Beautiful backyard pool", category: "Completed Work" },
  { src: "/images/pool/3af1343c-6fb0-43e0-b9a5-469cc2bd7d7b.jpeg", alt: "Luxury pool installation", category: "Completed Work" },
  { src: "/images/pool/5db22ce2-1323-4d18-9263-4d89789c3bd3.jpeg", alt: "Contemporary pool design", category: "Completed Work" },
  { src: "/images/pool/666e06eb-da83-40d9-ad33-0e727ae3a3e9.jpeg", alt: "Professional pool renovation", category: "Completed Work" },
  { src: "/images/pool/a10f7499-de7f-405b-90ae-504c2d490d80.jpeg", alt: "Custom pool project", category: "Completed Work" },
  { src: "/images/pool/b898cd77-5050-487a-a631-9e74a5a7a4db.jpeg", alt: "Quality pool construction", category: "Completed Work" },
  { src: "/images/pool/eca4a878-d874-42f7-aab7-01182b9dbd92.jpeg", alt: "Modern residential pool", category: "Completed Work" },
  { src: "/images/pool/f3a7bbd2-e182-404c-a162-d7a84fd0158f.jpeg", alt: "Premium swimming pool", category: "Completed Work" },
  { src: "/images/pool/f5ba876b-ffd5-47a9-ab23-6147c3e475ac.jpeg", alt: "Beautiful pool installation", category: "Completed Work" },
  { src: "/images/pool/feet-3733084_1920.jpg", alt: "Pool relaxation", category: "Lifestyle" },
];

const categories = ["All", "Completed Work", "Lifestyle"];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const filtered = selectedCategory === "All" ? galleryImages : galleryImages.filter((i) => i.category === selectedCategory);
  const displayed = showAll ? filtered : filtered.slice(0, 9);

  const openLightbox = (i: number) => setSelectedImage(i);
  const closeLightbox = () => setSelectedImage(null);
  const next = () => selectedImage !== null && setSelectedImage((selectedImage + 1) % filtered.length);
  const prev = () => selectedImage !== null && setSelectedImage((selectedImage - 1 + filtered.length) % filtered.length);

  return (
    <section id="gallery" className="seam-top grain py-28 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-600 dark:text-blue-400 mb-4 block">
            Our Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-5 tracking-tight">
            Stunning Pool Projects
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-fuchsia-500 bg-clip-text text-transparent">
              Across South Africa
            </span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Explore our portfolio of breathtaking swimming pools — from luxury resorts
            to private residences.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                  : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-300 hover:text-blue-600 dark:hover:border-blue-700 dark:hover:text-blue-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {displayed.map((image, index) => (
              <motion.div
                key={image.src}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                onClick={() => openLightbox(index)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-300 ${
                  index === 0 ? "lg:row-span-2" : ""
                }`}
                style={{ aspectRatio: index === 0 ? "3/4" : "4/3" }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white opacity-100 md:opacity-0 md:translate-y-2 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-[opacity,transform] duration-300">
                  <p className="text-sm font-semibold text-fuchsia-300">{image.category}</p>
                  <p className="text-[13px] text-white/75">{image.alt}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show more / less */}
        <div className="mt-10 text-center flex flex-col items-center gap-3">
          {!showAll && filtered.length > 9 && (
            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              onClick={() => setShowAll(true)}
              className="px-7 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all duration-200 shadow-md shadow-blue-600/25"
            >
              See More Projects ({filtered.length - 9} more)
            </motion.button>
          )}
          {showAll && filtered.length > 9 && (
            <button
              onClick={() => { setShowAll(false); document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" }); }}
              className="px-7 py-3 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-300 hover:text-blue-600 font-semibold text-sm transition-all duration-200"
            >
              Show Less
            </button>
          )}
          <div className="mt-4">
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-3">Want to see your dream pool come to life?</p>
            <a href="#contact">
              <button className="px-6 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm hover:opacity-90 transition-all duration-200">
                Start Your Pool Project Today
              </button>
            </a>
          </div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="fixed inset-0 bg-slate-950/96 z-50 flex items-center justify-center p-4"
            >
              <button onClick={closeLightbox} className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors z-50">
                <X className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors z-50"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors z-50"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-5xl max-h-[88vh] w-full rounded-2xl overflow-hidden"
              >
                <Image
                  src={filtered[selectedImage].src}
                  alt={filtered[selectedImage].alt}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/80 to-transparent p-6">
                  <p className="text-white font-medium">{filtered[selectedImage].category}</p>
                  <p className="text-slate-400 text-sm">{filtered[selectedImage].alt}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
