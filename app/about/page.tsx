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
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-teal-100 mb-4">
              About Jeffers0n Aquat1cs
            </h1>
            <p className="text-lg text-teal-300 max-w-2xl mx-auto">
              Celebrating the beauty and complexity of Neocaridina shrimps through premium breeding and sustainable aquatic practices.
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-gradient-to-r from-ocean-700 to-ocean-600 rounded-2xl p-8 md:p-12 mb-12"
          >
            <h2 className="text-2xl font-serif font-bold text-teal-100 mb-4">Our Story</h2>
            <p className="text-teal-300 leading-relaxed">
              Jeffers0n Aquat1cs was founded on the passion for Neocaridina shrimp breeding and the belief that these amazing creatures deserve premium care. We source the healthiest shrimps from dedicated breeders and provide everything enthusiasts need to create thriving colonies. Every product in our collection is carefully selected to support shrimp health, color development, and successful breeding.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {[
              { title: 'Quality Shrimps', description: 'Healthy vibrant specimens from trusted breeding colonies' },
              { title: 'Premium Supplies', description: 'Everything needed for shrimp success and breeding programs' },
              { title: 'Expert Knowledge', description: 'Comprehensive guides and support for all experience levels' },
            ].map((value) => (
              <motion.div
                key={value.title}
                variants={item}
                className="bg-ocean-700 rounded-lg p-6 hover:bg-ocean-600 transition-colors"
                whileHover={{ y: -8 }}
              >
                <h3 className="text-xl font-serif font-bold text-teal-100 mb-2">
                  {value.title}
                </h3>
                <p className="text-teal-300">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={item} className="text-center py-12">
            <h2 className="text-2xl font-serif font-bold text-teal-100 mb-4">
              Join Our Shrimp Community
            </h2>
            <p className="text-teal-300 max-w-2xl mx-auto mb-6">
              Become part of a growing community of Neocaridina enthusiasts sharing breeding experiences and care wisdom.
            </p>
            <motion.button
              className="px-8 py-3 bg-coral-500 hover:bg-coral-600 text-white font-semibold rounded-lg transition-all"
              whileHover={{ scale: 1.05 }}
            >
              Explore Products
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
