"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const galleryImages = [
  {
    src: "/images/pool/beautiful-luxury-outdoor-swimming-pool-hotel-resort.jpg",
    alt: "Luxury outdoor swimming pool at resort",
    category: "Completed Work",
  },
  {
    src: "/images/pool/case3-2.jpg",
    alt: "Modern pool design",
    category: "Completed Work",
  },
  {
    src: "/images/pool/pool.jpg",
    alt: "Custom swimming pool installation",
    category: "Completed Work",
  },
  {
    src: "/images/pool/06ef6dca-4a31-45a3-afa6-b98f46f5adf3.jpeg",
    alt: "Professional pool construction project",
    category: "Completed Work",
  },
  {
    src: "/images/pool/16ea08d3-7501-452d-86ce-a49856e91985.jpeg",
    alt: "Premium pool installation",
    category: "Completed Work",
  },
  {
    src: "/images/pool/20cd2fa1-e085-4b01-82eb-c430c6b19b2b.jpeg",
    alt: "Stunning residential pool",
    category: "Completed Work",
  },
  {
    src: "/images/pool/21b69e9e-0075-400a-81dc-2728cee47e44.jpeg",
    alt: "Modern swimming pool design",
    category: "Completed Work",
  },
  {
    src: "/images/pool/31a068b2-dfef-4e8a-ab3f-5ceda9f0cf57.jpeg",
    alt: "Elegant pool construction",
    category: "Completed Work",
  },
  {
    src: "/images/pool/36b0ae35-1ad5-4826-ac5c-cbcfb9e8a935.jpeg",
    alt: "Beautiful backyard pool",
    category: "Completed Work",
  },
  {
    src: "/images/pool/3af1343c-6fb0-43e0-b9a5-469cc2bd7d7b.jpeg",
    alt: "Luxury pool installation",
    category: "Completed Work",
  },
  {
    src: "/images/pool/5db22ce2-1323-4d18-9263-4d89789c3bd3.jpeg",
    alt: "Contemporary pool design",
    category: "Completed Work",
  },
  {
    src: "/images/pool/666e06eb-da83-40d9-ad33-0e727ae3a3e9.jpeg",
    alt: "Professional pool renovation",
    category: "Completed Work",
  },
  {
    src: "/images/pool/a10f7499-de7f-405b-90ae-504c2d490d80.jpeg",
    alt: "Custom pool project",
    category: "Completed Work",
  },
  {
    src: "/images/pool/b898cd77-5050-487a-a631-9e74a5a7a4db.jpeg",
    alt: "Quality pool construction",
    category: "Completed Work",
  },
  {
    src: "/images/pool/eca4a878-d874-42f7-aab7-01182b9dbd92.jpeg",
    alt: "Modern residential pool",
    category: "Completed Work",
  },
  {
    src: "/images/pool/f3a7bbd2-e182-404c-a162-d7a84fd0158f.jpeg",
    alt: "Premium swimming pool",
    category: "Completed Work",
  },
  {
    src: "/images/pool/f5ba876b-ffd5-47a9-ab23-6147c3e475ac.jpeg",
    alt: "Beautiful pool installation",
    category: "Completed Work",
  },
  {
    src: "/images/pool/feet-3733084_1920.jpg",
    alt: "Pool relaxation",
    category: "Lifestyle",
  },
];

const categories = ["All", "Completed Work", "Lifestyle"];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const displayedImages = showAll ? filteredImages : filteredImages.slice(0, 6);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-white dark:bg-gray-950">
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
              OUR PORTFOLIO
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Stunning Pool Projects
            <br />
            <span className="text-gradient">Across South Africa</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our portfolio of breathtaking swimming pools. From luxury resorts to private residences,
            see the quality and craftsmanship that defines DC Tech Pools.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "gradient" : "outline"}
              size="lg"
              onClick={() => setSelectedCategory(category)}
              className="transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {displayedImages.map((image, index) => (
              <motion.div
                key={image.src}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => openLightbox(index)}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-lg font-semibold">{image.category}</p>
                  <p className="text-sm opacity-90">{image.alt}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* See More Button */}
        {!showAll && filteredImages.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 text-center"
          >
            <Button
              size="xl"
              variant="gradient"
              onClick={() => setShowAll(true)}
              className="font-bold"
            >
              See More Projects ({filteredImages.length - 6} more)
            </Button>
          </motion.div>
        )}

        {/* Show Less Button */}
        {showAll && filteredImages.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-12 text-center"
          >
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                setShowAll(false);
                // Scroll to gallery section
                document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-bold"
            >
              Show Less
            </Button>
          </motion.div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            >
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
              >
                <X className="w-8 h-8" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 text-white hover:text-gray-300 transition-colors z-50"
              >
                <ChevronLeft className="w-12 h-12" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 text-white hover:text-gray-300 transition-colors z-50"
              >
                <ChevronRight className="w-12 h-12" />
              </button>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-6xl max-h-[90vh] w-full"
              >
                <Image
                  src={filteredImages[selectedImage].src}
                  alt={filteredImages[selectedImage].alt}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                  <p className="text-white text-xl font-semibold">
                    {filteredImages[selectedImage].category}
                  </p>
                  <p className="text-white/80">{filteredImages[selectedImage].alt}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Want to see your dream pool come to life?
          </p>
          <a href="#contact">
            <Button size="xl" variant="gradient" className="font-bold">
              Start Your Pool Project Today
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
