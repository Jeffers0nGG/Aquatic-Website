'use client';

import { motion } from 'framer-motion';
import VideoHeroSection from './components/VideoHeroSection';
import ProductGrid from './components/ProductGrid';
import { AQUATIC_PRODUCTS } from '@/lib/products';

export default function Home() {
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
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  // Featured products
  const featuredProducts = AQUATIC_PRODUCTS.slice(0, 6);

  return (
    <div className="w-full">
      {/* Video Hero Section */}
      <VideoHeroSection
        title="Premium Neocaridina Shrimps & Care"
        subtitle="Discover stunning Neocaridina shrimps and everything you need to establish thriving shrimp colonies with expert care supplies."
        cta={{ text: 'Shop Now', href: '/products' }}
        videoType="underwater"
        overlayColor="from-ocean-900/70 to-teal-900/50"
      />

      {/* Featured Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.p variants={item} className="text-coral-400 text-sm uppercase font-medium tracking-widest mb-2">
              Live Shrimp & Supplies
            </motion.p>
            <motion.h2 variants={item} className="text-4xl md:text-5xl font-serif font-bold text-teal-100 mb-4">
              Best Sellers & Popular Species
            </motion.h2>
            <motion.p variants={item} className="text-teal-300 text-lg max-w-2xl mx-auto">
              Explore our most popular Neocaridina shrimp varieties and essential care supplies trusted by shrimp enthusiasts.
            </motion.p>
          </motion.div>

          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* Category Showcase */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-ocean-800 via-ocean-700 to-ocean-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.h2 variants={item} className="text-4xl md:text-5xl font-serif font-bold text-teal-100 mb-4">
              Shop by Category
            </motion.h2>
            <motion.p variants={item} className="text-teal-300 text-lg max-w-2xl mx-auto">
              Find all your shrimp species and aquatic care needs
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              { icon: '🦐', title: 'Shrimp Species', count: 5 },
              { icon: '🛡️', title: 'Shrimp Care', count: 4 },
              { icon: '🍽️', title: 'Shrimp Food', count: 4 },
              { icon: '🏠', title: 'Tank Setup', count: 4 },
              { icon: '✨', title: 'Accessories', count: 4 },
              { icon: '⭐', title: 'Supplements', count: 4 },
            ].map((category) => (
              <motion.a
                key={category.title}
                href={`/products?category=${category.title}`}
                variants={item}
                className="group cursor-pointer"
              >
                <motion.div
                  className="bg-ocean-600 rounded-lg p-6 text-center hover:bg-ocean-500 transition-all"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="text-lg font-semibold text-teal-100 mb-1">{category.title}</h3>
                  <p className="text-sm text-teal-300">{category.count} items</p>
                </motion.div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-ocean-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              {
                icon: '✓',
                title: 'Premium Shrimps',
                description: 'Hand-selected healthy Neocaridina shrimp from trusted breeders',
              },
              {
                icon: '🚚',
                title: 'Safe Shipping',
                description: 'Secure packaging to ensure your shrimps arrive in perfect condition',
              },
              {
                icon: '🛡️',
                title: 'Expert Guidance',
                description: 'Dedicated support from shrimp keeping enthusiasts and specialists',
              },
            ].map((benefit, idx) => (
              <motion.div
                key={benefit.title}
                variants={item}
                className="text-center"
              >
                <motion.div
                  className="text-5xl mb-4 text-coral-500"
                  whileHover={{ scale: 1.2 }}
                >
                  {benefit.icon}
                </motion.div>
                <h3 className="text-xl font-serif font-bold text-teal-100 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-teal-300">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 bg-ocean-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-gradient-to-br from-coral-600 to-coral-700 rounded-2xl p-8 md:p-12 text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Shrimp Care Tips & Exclusive Offers
            </h2>
            <p className="text-lg text-coral-100 mb-6">
              Subscribe to our newsletter for breeding guides, care tips, color genetics info, and exclusive shrimp releases.
            </p>
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Email for newsletter"
              />
              <motion.button
                className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-full transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
