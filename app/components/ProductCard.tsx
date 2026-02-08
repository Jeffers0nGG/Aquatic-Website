'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useCartStore } from './providers/CartStore';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  index?: number;
}

const ProductCard = ({ id, name, price, image, category, index = 0 }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const { addToCart } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Add ripple effect
    const rippId = Date.now();
    setRipples((prev) => [...prev, { id: rippId, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== rippId));
    }, 600);

    // Add to cart
    addToCart({
      id,
      name,
      price,
      image,
      quantity: 1,
    });
  };

  const container = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div variants={container} className="h-full">
      <Link href={`/product/${id}`} className="h-full flex flex-col group">
        <div
          className="relative overflow-hidden bg-ocean-700 rounded-lg mb-4 aspect-product"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 3}
            />
          </motion.div>

          {/* Water ripple effect overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-teal-900/20 to-transparent"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Ripple effect */}
          {ripples.map((ripple) => (
            <motion.div
              key={ripple.id}
              className="absolute pointer-events-none rounded-full border-2 border-teal-400"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: 10,
                height: 10,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 5, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          ))}

          {/* Add to cart button */}
          <motion.button
            className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm group-hover:bg-black/50"
            onClick={handleAddToCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            aria-label={`Add ${name} to cart`}
          >
            <motion.span
              className="px-6 py-2 bg-white text-ocean-900 font-semibold rounded-full text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add to Cart
            </motion.span>
          </motion.button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <p className="text-xs text-teal-300 font-medium uppercase tracking-widest mb-1">
            {category}
          </p>
          <h3 className="text-lg font-serif font-semibold text-teal-100 mb-2 group-hover:text-coral-400 transition-colors line-clamp-2">
            {name}
          </h3>
          <p className="mt-auto text-lg font-semibold text-coral-400">
            ${price.toFixed(2)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
