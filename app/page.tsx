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
        title="Premium Aquatic Pet Accessories"
        subtitle="Create the perfect aquatic environment with our curated collection of filters, tanks, lighting, and care products for thriving fish and plants."
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
            <motion.p variants={item} className="text-teal-600 text-sm uppercase font-medium tracking-widest mb-2">
              Essential Equipment
            </motion.p>
            <motion.h2 variants={item} className="text-4xl md:text-5xl font-serif font-bold text-ocean-900 mb-4">
              Best Selling Products
            </motion.h2>
            <motion.p variants={item} className="text-ocean-700 text-lg max-w-2xl mx-auto">
              Explore our most popular aquatic pet care products trusted by aquarists worldwide.
            </motion.p>
          </motion.div>

          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* Category Showcase */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-ocean-50 via-teal-50 to-ocean-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.h2 variants={item} className="text-4xl md:text-5xl font-serif font-bold text-ocean-900 mb-4">
              Shop by Category
            </motion.h2>
            <motion.p variants={item} className="text-ocean-700 text-lg max-w-2xl mx-auto">
              Find everything you need for your aquatic setup
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              { icon: '🐠', title: 'Tanks', count: 4 },
              { icon: '💨', title: 'Filters', count: 4 },
              { icon: '💡', title: 'Lighting', count: 4 },
              { icon: '🌱', title: 'Substrate', count: 2 },
              { icon: '🌿', title: 'Decor', count: 2 },
              { icon: '🌊', title: 'Pumps', count: 2 },
              { icon: '🧪', title: 'Maintenance', count: 4 },
              { icon: '🔥', title: 'Heaters', count: 2 },
              { icon: '🍽️', title: 'Food', count: 2 },
              { icon: '⭐', title: 'Supplements', count: 2 },
            ].map((category) => (
              <motion.a
                key={category.title}
                href={`/products?category=${category.title}`}
                variants={item}
                className="group cursor-pointer"
              >
                <motion.div
                  className="bg-white rounded-lg p-6 text-center shadow-elevation-1 hover:shadow-elevation-3 transition-all"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="text-lg font-semibold text-ocean-900 mb-1">{category.title}</h3>
                  <p className="text-sm text-ocean-600">{category.count} items</p>
                </motion.div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
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
                title: 'Premium Quality',
                description: 'Hand-selected aquatic products from trusted brands worldwide',
              },
              {
                icon: '🚚',
                title: 'Fast Shipping',
                description: 'Quick delivery to keep your aquatic environment flourishing',
              },
              {
                icon: '🛡️',
                title: 'Expert Support',
                description: 'Dedicated customer service from aquarium enthusiasts',
              },
            ].map((benefit, idx) => (
              <motion.div
                key={benefit.title}
                variants={item}
                className="text-center"
              >
                <motion.div
                  className="text-5xl mb-4 text-teal-500"
                  whileHover={{ scale: 1.2 }}
                >
                  {benefit.icon}
                </motion.div>
                <h3 className="text-xl font-serif font-bold text-ocean-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-ocean-700">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-gradient-to-br from-teal-600 to-ocean-700 rounded-2xl p-8 md:p-12 text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Aquatic Expert Tips & Exclusive Deals
            </h2>
            <p className="text-lg text-teal-100 mb-6">
              Subscribe to our newsletter for expert aquascaping guides, product recommendations, and exclusive offers.
            </p>
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Email for newsletter"
              />
              <motion.button
                className="px-8 py-3 bg-coral-500 hover:bg-coral-600 text-white font-semibold rounded-full transition-colors"
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
