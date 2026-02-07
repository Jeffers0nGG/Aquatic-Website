'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductGrid from '../components/ProductGrid';
import { AQUATIC_PRODUCTS, CATEGORIES } from '@/lib/products';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'popular'>('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredAndSorted = useMemo(() => {
    let products = AQUATIC_PRODUCTS;

    // Filter by category
    if (selectedCategory && selectedCategory !== 'All') {
      products = products.filter((p) => p.category === selectedCategory);
    }

    // Sort
    const sorted = [...products];
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        sorted.reverse();
        break;
      default:
        break;
    }

    return sorted;
  }, [selectedCategory, sortBy]);

  const categories = ['All', ...CATEGORIES];

  return (
    <div className="w-full">
      {/* Page Header */}
      <motion.section
        className="py-12 md:py-16 border-b border-ocean-200"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-ocean-900 mb-3">
            All Products
          </h1>
          <p className="text-ocean-700 text-lg">
            Browse our complete selection of aquatic pet care equipment and accessories.
          </p>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <motion.aside
            className={`lg:col-span-1 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Category Filter */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-ocean-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category === 'All' ? null : category);
                      setIsFilterOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-all ${
                      (!selectedCategory && category === 'All') || selectedCategory === category
                        ? 'bg-teal-500 text-white'
                        : 'text-ocean-700 hover:bg-ocean-100'
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Sort Filter */}
            <div>
              <h3 className="text-lg font-semibold text-ocean-900 mb-4">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-4 py-2 border border-ocean-200 rounded-lg bg-white text-ocean-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Sort products"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </motion.aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <motion.button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
              </motion.button>
            </div>

            {/* Results Info */}
            <motion.p
              className="text-ocean-700 text-sm mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Showing {filteredAndSorted.length} products
            </motion.p>

            {/* Products */}
            <AnimatePresence mode="wait">
              <ProductGrid
                key={`${selectedCategory}-${sortBy}`}
                products={filteredAndSorted}
                columns={3}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
