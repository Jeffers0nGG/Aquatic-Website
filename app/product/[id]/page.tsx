'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/app/components/providers/CartStore';
import { AQUATIC_PRODUCTS, getProductsByCategory } from '@/lib/products';

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = AQUATIC_PRODUCTS.find((p) => p.id === params.id) || AQUATIC_PRODUCTS[0];
  const relatedProducts = getProductsByCategory(product.category).filter((p) => p.id !== product.id);
  
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    });
  };

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
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <motion.div
          className="flex items-center gap-2 mb-8 text-sm text-ocean-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Link href="/" className="hover:text-teal-600 transition">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-teal-600 transition">Products</Link>
          <span>/</span>
          <span className="text-teal-100">{product.name}</span>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Image Gallery */}
          <motion.div variants={item}>
            <div className="space-y-4">
              {/* Main Image */}
              <motion.div
                className="relative bg-ocean-100 rounded-lg overflow-hidden aspect-square cursor-zoom-in"
                onClick={() => setIsZoomed(!isZoomed)}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                {/* Zoom indicator */}
                <motion.div
                  className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Click to zoom
                </motion.div>
              </motion.div>

              {/* Stock Status */}
              <motion.div
                className={`p-3 rounded-lg text-sm font-semibold ${
                  product.inStock 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
              </motion.div>
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div variants={item} className="space-y-6">
            {/* Title & Category */}
            <div>
              <span className="inline-block mb-3 px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-semibold">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-teal-100 mb-3">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-teal-600">${product.price.toFixed(2)}</p>
            </div>

            {/* Description */}
            <div>
              <p className="text-ocean-700 leading-relaxed mb-4">
                {product.description}
              </p>
            </div>

            {/* Specifications */}
            {product.specs && product.specs.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-teal-100 mb-3">Specifications</h3>
                <ul className="space-y-2">
                  {product.specs.map((spec, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3 text-ocean-700"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <span className="text-teal-500 font-bold mt-1">•</span>
                      <span>{spec}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-semibold text-teal-100 mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-3 border border-ocean-600 rounded-lg w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-ocean-100 transition"
                  aria-label="Decrease quantity"
                  disabled={!product.inStock}
                >
                  −
                </button>
                <span className="px-4 py-2 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-ocean-100 transition"
                  aria-label="Increase quantity"
                  disabled={!product.inStock}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <motion.button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full py-4 font-semibold rounded-lg transition-all text-lg ${
                product.inStock
                  ? 'bg-teal-500 hover:bg-teal-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              whileHover={product.inStock ? { scale: 1.02, boxShadow: '0 10px 30px rgba(20, 184, 166, 0.3)' } : {}}
              whileTap={product.inStock ? { scale: 0.98 } : {}}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </motion.button>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-ocean-600">
              <div>
                <p className="text-xs uppercase text-ocean-600 font-semibold mb-1">Shipping</p>
                <p className="text-teal-100">Free on orders over $200</p>
              </div>
              <div>
                <p className="text-xs uppercase text-ocean-600 font-semibold mb-1">Returns</p>
                <p className="text-teal-100">30-day return window</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <motion.section
            className="mt-16 md:mt-24 pt-16 border-t border-ocean-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-serif font-bold text-teal-100 mb-8">
              More {product.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.slice(0, 3).map((relProduct, index) => (
                <motion.div
                  key={relProduct.id}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => window.location.href = `/product/${relProduct.id}`}
                >
                  <div className="relative bg-ocean-100 rounded-lg overflow-hidden aspect-square mb-3">
                    <Image
                      src={relProduct.image}
                      alt={relProduct.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-teal-100 mb-2 group-hover:text-coral-400 transition">
                    {relProduct.name}
                  </h3>
                  <p className="text-teal-600 font-bold">${relProduct.price.toFixed(2)}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              className="relative w-full max-w-4xl aspect-square"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
              />
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-4 right-4 text-white text-2xl bg-black/50 hover:bg-black/70 w-10 h-10 rounded-full flex items-center justify-center transition"
                aria-label="Close zoom"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
