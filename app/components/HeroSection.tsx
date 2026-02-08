'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  title: string;
  subtitle: string;
  image: string;
  cta?: {
    text: string;
    href: string;
  };
}

const HeroSection = ({ title, subtitle, image, cta }: HeroSectionProps) => {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax effect
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top center',
          scrub: 0.5,
        },
        y: 100,
        ease: 'none',
      });
    });

    return () => ctx.revert();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <section className="relative w-full min-h-[90vh] md:min-h-screen overflow-hidden flex items-center">
      {/* Background image with parallax */}
      <motion.div
        ref={imageRef}
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        <Image
          src={image}
          alt="Hero"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={85}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-2xl">
          <motion.p
            variants={item}
            className="text-coral-400 text-sm md:text-base font-medium uppercase tracking-widest mb-4"
          >
            Experience Premium
          </motion.p>
          <motion.h1
            variants={item}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight"
          >
            {title}
          </motion.h1>
          <motion.p variants={item} className="text-lg md:text-xl text-gray-100 mb-8 max-w-lg">
            {subtitle}
          </motion.p>

          {cta && (
            <motion.div variants={item} className="flex gap-4 flex-wrap">
              <Link href={cta.href}>
                <motion.button
                  className="px-8 py-4 bg-coral-500 hover:bg-coral-600 text-white font-semibold rounded-full transition-all duration-300"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 107, 84, 0.6)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {cta.text}
                </motion.button>
              </Link>
              <motion.button
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-white text-sm text-center">
          <p className="mb-2">Scroll to explore</p>
          <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
