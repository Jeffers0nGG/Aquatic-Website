import React, { useState, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useScroll as useScrollHook, useScrollProgress, useReducedMotion } from '../hooks/useCustomHooks';
import { scrollToSection } from '../utils/helpers';
import logoImg from '../assets/logo/Jeffers0nAquaticsLOGO.png';

const Navigation = ({ onInquireClick }) => {
    const { isAtTop } = useScrollHook();
    const progress = useScrollProgress();
    const prefersReducedMotion = useReducedMotion();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    // State to track if we are currently scrolling programmatically
    const [disableScrollHide, setDisableScrollHide] = useState(false);
    const scrollTimeoutRef = useRef(null);

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latestVal) => {
        // If we are in "programmatic scroll" mode, ensure navbar is visible and do nothing else
        if (disableScrollHide) {
            if (isHidden) setIsHidden(false);
            return;
        }

        const previousVal = scrollY.getPrevious();
        if (previousVal === undefined) return;
        const diff = latestVal - previousVal;

        // "Always visible when near top (scrollY < 80px)."
        if (latestVal < 80) {
            if (isHidden) setIsHidden(false);
            return;
        }

        // "Hide only when: User scrolls down ... Scroll delta exceeds threshold"
        if (diff > 8) {
            if (!isHidden) setIsHidden(true);
        }
        // "Show immediately when user scrolls up."
        else if (diff < -5) {
            if (isHidden) setIsHidden(false);
        }
    });

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
        // 1. Force navbar visible
        setIsHidden(false);

        // 2. Disable hide-on-scroll logic temporarily
        setDisableScrollHide(true);

        // Clear existing timeout if rapid clicks
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

        // 3. Perform scroll
        scrollToSection(id);
        setIsMobileMenuOpen(false);

        // 4. Re-enable hide logic after scroll animation stabilizes (800ms)
        scrollTimeoutRef.current = setTimeout(() => {
            setDisableScrollHide(false);
        }, 800);
    };

    // Variants for scroll visibility - Engineered Smoothness
    const navScrollVariants = {
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1] // Custom ease-out cubic
            }
        },
        hidden: {
            y: "-110%",
            opacity: 0, // Slight fade out for softness
            transition: {
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1]
            }
        },
    };

    return (
        <>
            {/* Scroll progress indicator */}
            <motion.div
                animate={{
                    y: isHidden ? -20 : 0,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 left-0 right-0 h-1 z-50 bg-navy-900/50 pointer-events-none"
            >
                <div
                    className="h-full bg-gradient-to-r from-neon-violet via-neon-purple to-neon-cyan shadow-glow-md"
                    style={{ width: `${progress}%` }}
                />
            </motion.div>

            {/* Navigation bar container */}
            <motion.nav
                variants={navScrollVariants}
                initial="visible"
                animate={isHidden ? "hidden" : "visible"}
                className={`fixed top-0 left-0 right-0 z-40 flex justify-center transition-all duration-300 pointer-events-none ${isAtTop ? 'py-6' : 'py-3'
                    }`}
            >
                <div className="container-custom px-4 pointer-events-auto w-full">
                    {/* The subtle surface pill */}
                    <div
                        className={`
                    flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-300
                    backdrop-blur-md border border-white/10 shadow-lg
                    ${isAtTop ? 'bg-navy-900/40 md:bg-white/5' : 'bg-navy-900/80 md:bg-white/5'}
                `}
                        style={{
                            WebkitBackdropFilter: 'blur(12px)',
                            backdropFilter: 'blur(12px)',
                        }}
                    >
                        {/* Logo */}
                        <button
                            onClick={() => handleNavClick('hero')}
                            className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-neon-violet rounded-lg pr-2 py-1"
                            aria-label="Go to home"
                        >
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shadow-inner overflow-hidden bg-white/5 border border-white/5 transition-transform duration-300 group-hover:scale-105">
                                <img src={logoImg} alt="Jeffers0n Aquatics Logo" className="w-full h-full object-contain p-1" />
                            </div>
                            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent hidden sm:block tracking-wide">
                                Jeffers0n Aquatics
                            </span>
                        </button>

                        {/* Desktop Navigation Links */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {navLinks.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={() => handleNavClick(link.id)}
                                    className="relative px-4 py-2 text-sm font-medium text-white/90 hover:text-white rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-neon-violet group"
                                >
                                    <span className="relative z-10">{link.label}</span>
                                    {/* Hover indicator */}
                                    <span className="absolute inset-0 bg-white/10 rounded-lg scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out"></span>
                                </button>
                            ))}
                        </div>

                        {/* CTA & Mobile Menu */}
                        <div className="flex items-center space-x-3 sm:space-x-4">
                            <button
                                onClick={onInquireClick}
                                className="hidden md:flex btn-primary py-2 px-5 text-sm"
                                aria-label="Open inquiry form"
                            >
                                Inquire
                            </button>

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden p-2 text-white/90 hover:bg-white/10 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-neon-violet"
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
                    </div>

                    {/* Mobile menu dropdown */}
                    {isMobileMenuOpen && (
                        <div className="lg:hidden mt-2 p-4 rounded-xl bg-navy-900/95 backdrop-blur-xl border border-white/10 animate-fade-in shadow-xl">
                            <div className="flex flex-col space-y-2">
                                {navLinks.map((link) => (
                                    <button
                                        key={link.id}
                                        onClick={() => handleNavClick(link.id)}
                                        className="px-4 py-3 text-left text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-300"
                                    >
                                        {link.label}
                                    </button>
                                ))}
                                <button
                                    onClick={() => {
                                        onInquireClick();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="btn-primary w-full mt-2 justify-center"
                                >
                                    Inquire
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </motion.nav>
        </>
    );
};

export default Navigation;
