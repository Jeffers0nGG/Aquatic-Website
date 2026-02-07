'use client';

import { motion } from 'framer-motion';

export default function AboutPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="w-full">
      <motion.section
        className="py-16 md:py-24"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={item} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-ocean-900 mb-4">
              About Aqua Luxe
            </h1>
            <p className="text-lg text-ocean-700 max-w-2xl mx-auto">
              Redefining luxury fashion through ocean-inspired design and sustainable practices.
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-gradient-to-r from-teal-50 to-ocean-50 rounded-2xl p-8 md:p-12 mb-12"
          >
            <h2 className="text-2xl font-serif font-bold text-ocean-900 mb-4">Our Story</h2>
            <p className="text-ocean-700 leading-relaxed">
              Aqua Luxe was founded on the belief that fashion should celebrate the beauty of our
              oceans while maintaining the highest standards of luxury and sustainability. Every
              piece in our collection is carefully crafted to combine elegance with environmental
              consciousness.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {[
              { title: 'Sustainable', description: 'Eco-friendly materials and ethical production' },
              { title: 'Premium Quality', description: 'Finest fabrics and impeccable craftsmanship' },
              { title: 'Ocean-Inspired', description: 'Celebrating the beauty of aquatic ecosystems' },
            ].map((value) => (
              <motion.div
                key={value.title}
                variants={item}
                className="bg-white rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow"
                whileHover={{ y: -8 }}
              >
                <h3 className="text-xl font-serif font-bold text-ocean-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-ocean-700">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={item} className="text-center py-12">
            <h2 className="text-2xl font-serif font-bold text-ocean-900 mb-4">
              Join Our Community
            </h2>
            <p className="text-ocean-700 max-w-2xl mx-auto mb-6">
              Discover how we're making a difference in the fashion industry and beyond.
            </p>
            <motion.button
              className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-all"
              whileHover={{ scale: 1.05 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
