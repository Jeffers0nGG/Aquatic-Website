'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => {
  const footerLinks = [
    { label: 'Store', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Sustainability', href: '#' },
    { label: 'Code of Conduct', href: '#' },
  ];

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
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <footer className="relative mt-20 bg-gradient-to-t from-ocean-900 to-ocean-800 text-white overflow-hidden">
      {/* Decorative waves */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Brand */}
          <motion.div variants={item}>
            <h3 className="text-2xl font-serif font-bold mb-4 flex items-center gap-2">
              <span>🌊</span>
              Aqua Luxe
            </h3>
            <p className="text-ocean-200 text-sm leading-relaxed">
              Premium aquatic-inspired luxury fashion for the modern ocean lover.
            </p>
          </motion.div>

          {/* Shop */}
          <motion.div variants={item}>
            <h4 className="font-semibold text-lg mb-4">Shop</h4>
            <ul className="space-y-2 text-ocean-200 text-sm">
              <li>
                <Link href="/products" className="hover:text-teal-300 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-teal-300 transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-teal-300 transition-colors">
                  Sale
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-teal-300 transition-colors">
                  Collections
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={item}>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2 text-ocean-200 text-sm">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-teal-300 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={item}>
            <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
            <p className="text-ocean-200 text-sm mb-4">
              Subscribe for exclusive offers and updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-ocean-700 text-white placeholder-ocean-300 focus:outline-none text-sm"
                aria-label="Email for newsletter"
              />
              <button
                className="px-4 py-2 bg-teal-500 hover:bg-teal-600 transition-colors font-medium text-sm"
                aria-label="Subscribe to newsletter"
              >
                Sign Up
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-ocean-700 my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between text-ocean-300 text-sm">
          <p>&copy; 2024 Aqua Luxe. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-teal-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-teal-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-teal-300 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
