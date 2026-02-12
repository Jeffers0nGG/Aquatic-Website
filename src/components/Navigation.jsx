import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useScroll, useScrollProgress, useReducedMotion } from '../hooks/useCustomHooks';
import { scrollToSection } from '../utils/helpers';

const Navigation = ({ onInquireClick }) => {
    const { isAtTop } = useScroll();
    const progress = useScrollProgress();
    const prefersReducedMotion = useReducedMotion();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { label: 'Home', id: 'hero' },
        { label: 'Shrimps', id: 'shrimps' },
        { label: 'Grades', id: 'grades' },
        { label: 'Care Guide', id: 'care' },
        { label: 'Gallery', id: 'gallery' },
        { label: 'Reviews', id: 'reviews' },
        { label: 'FAQ', id: 'faq' },
        { label: 'Contact', id: 'contact' },
    ];

    const handleNavClick = (id) => {
        scrollToSection(id);
        setIsMobileMenuOpen(false);
    };

    // Intro Snap-in Animation
    const navVariants = {
        hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                delay: 2.8, // Match Hero content appearance
                type: 'spring',
                stiffness: 100,
                damping: 20,
                mass: 1
            }
        },
    };

    return (
        <>
            {/* Scroll progress indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.2 }}
                className="fixed top-0 left-0 right-0 h-1 z-50 bg-navy-900/50"
            >
                <div
                    className="h-full bg-gradient-to-r from-neon-violet via-neon-purple to-neon-cyan transition-all duration-300 shadow-glow-md"
                    style={{ width: `${progress}%` }}
                />
            </motion.div>

            {/* Navigation bar */}
            <motion.nav
                variants={navVariants}
                initial={prefersReducedMotion ? "visible" : "hidden"}
                animate="visible"
                className={`fixed top-1 left-0 right-0 z-40 transition-all duration-300 ${isAtTop ? 'py-4' : 'py-2'
                    }`}
            >
                <div className="container-custom px-4">
                    <div
                        className={`${isAtTop ? 'glass' : 'glass-strong'
                            } rounded-2xl px-6 py-4 shadow-glass transition-all duration-300 ${!isAtTop && 'shadow-glow-sm'
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            {/* Logo */}
                            <button
                                onClick={() => handleNavClick('hero')}
                                className="flex items-center space-x-2 group focus:outline-none focus:ring-2 focus:ring-neon-violet rounded-lg px-2 py-1"
                                aria-label="Go to home"
                            >
                                <div className="w-10 h-10 bg-gradient-to-br from-neon-violet to-neon-cyan rounded-lg flex items-center justify-center shadow-glow-sm group-hover:shadow-glow-md transition-all duration-300">
                                    <span className="text-2xl">🦐</span>
                                </div>
                                <span className="text-xl font-bold bg-gradient-to-r from-white to-neon-violet bg-clip-text text-transparent hidden sm:block">
                                    NeoShrimp
                                </span>
                            </button>

                            {/* Desktop Navigation Links */}
                            <div className="hidden lg:flex items-center space-x-1">
                                {navLinks.map((link) => (
                                    <button
                                        key={link.id}
                                        onClick={() => handleNavClick(link.id)}
                                        className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neon-violet relative group overflow-hidden"
                                    >
                                        <span className="relative z-10">{link.label}</span>
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-violet transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                                    </button>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <div className="hidden md:flex items-center space-x-4">
                                <button
                                    onClick={onInquireClick}
                                    className="btn-primary"
                                    aria-label="Open inquiry form"
                                >
                                    Inquire
                                </button>
                            </div>

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neon-violet"
                                aria-label="Toggle mobile menu"
                                aria-expanded={isMobileMenuOpen}
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    {isMobileMenuOpen ? (
                                        <path d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>

                        {/* Mobile menu */}
                        {isMobileMenuOpen && (
                            <div className="lg:hidden mt-4 pt-4 border-t border-white/10 animate-fade-in">
                                <div className="flex flex-col space-y-2">
                                    {navLinks.map((link) => (
                                        <button
                                            key={link.id}
                                            onClick={() => handleNavClick(link.id)}
                                            className="px-4 py-3 text-left text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neon-violet"
                                        >
                                            {link.label}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => {
                                            onInquireClick();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="btn-primary w-full mt-2"
                                    >
                                        Inquire
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </motion.nav>
        </>
    );
};

export default Navigation;
