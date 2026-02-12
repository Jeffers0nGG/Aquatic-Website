import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { scrollToSection } from '../utils/helpers';
import { getImagePath } from '../utils/helpers';
import { useReducedMotion } from '../hooks/useCustomHooks';

const Hero = () => {
    const prefersReducedMotion = useReducedMotion();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { scrollY } = useScroll();

    // Parallax for silhouette
    const yRange = useTransform(scrollY, [0, 500], [0, 150]);
    const opacityRange = useTransform(scrollY, [0, 300], [1, 0]);
    const smoothY = useSpring(yRange, { stiffness: 100, damping: 20 });

    const heroImages = [
        'Neocardina Red Cherry.jpg',
        'Neocardina Blue Dream.jpg',
        'Neocardina Orange.jpg',
        'Neocardina Yellow Fire.jpg',
    ];

    useEffect(() => {
        if (prefersReducedMotion) return;
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [prefersReducedMotion, heroImages.length]);

    const trustBadges = [
        { icon: '✓', text: 'Healthy Stock' },
        { icon: '⚡', text: 'Stable Parameters' },
        { icon: '📍', text: 'Local Pickup' },
    ];

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 2.8, // Start content reveal after bg intro
            },
        },
    };

    const glassPanelVariants = {
        hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 20,
                mass: 1
            }
        },
    };

    const headlineVariants = {
        hidden: {
            backgroundPosition: '200% 0',
            opacity: 0,
            clipPath: 'polygon(0 0, 0 100%, 0 100%, 0 0)'
        },
        visible: {
            backgroundPosition: '0% 0',
            opacity: 1,
            clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 0)',
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
            }
        },
    };

    const subtitleVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: 0.2 } // 200ms after headline
        },
    };

    const buttonVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 }
        },
    };

    const silhouetteVariants = {
        hidden: { opacity: 0, scale: 0.96 },
        visible: {
            opacity: 0.4,
            scale: 1,
            transition: { duration: 1.5, ease: "easeOut", delay: 2.5 }
        },
    };

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image Carousel (Crossfade) */}
            <div className="absolute inset-0 z-0">
                {heroImages.map((image, index) => (
                    <div
                        key={image}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-20' : 'opacity-0'
                            }`}
                    >
                        <img
                            src={getImagePath(image)}
                            alt={`Neocaridina shrimp ${index + 1}`}
                            className="w-full h-full object-cover"
                            loading={index === 0 ? 'eager' : 'lazy'}
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-900/60 to-navy-950/90"></div>
                    </div>
                ))}
            </div>

            {/* Shrimp Silhouette (Abstract Blur Shape) */}
            <motion.div
                variants={silhouetteVariants}
                initial="hidden"
                animate="visible"
                style={{ y: smoothY, opacity: opacityRange }}
                className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -z-10 w-[600px] h-[600px] bg-gradient-radial from-neon-violet/20 to-transparent blur-3xl rounded-full pointer-events-none"
            />

            {/* Hero Content */}
            <motion.div
                variants={containerVariants}
                initial={prefersReducedMotion ? "visible" : "hidden"}
                animate="visible"
                className="container-custom px-4 relative z-10 text-center section-padding"
            >
                <motion.div variants={glassPanelVariants} className="max-w-4xl mx-auto">
                    {/* Badge - Removed glass-strong, added specific style */}
                    <div className="inline-flex items-center space-x-2 bg-navy-900/80 border border-white/10 px-4 py-2 rounded-full mb-8 shadow-glow-sm">
                        <span className="w-2 h-2 bg-neon-cyan rounded-full animate-glow-pulse"></span>
                        <span className="text-sm font-medium text-gray-300">Premium Aquatic Collection</span>
                    </div>

                    {/* Main Heading with Masked Gradient Wipe */}
                    <motion.h1
                        variants={headlineVariants}
                        className="heading-xl mb-6 py-2 bg-gradient-to-r from-white via-neon-violet to-neon-cyan bg-clip-text text-transparent bg-[length:200%_auto]"
                    >
                        Neocaridina Shrimp Showcase
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.div variants={subtitleVariants} className="max-w-3xl mx-auto space-y-3 mb-12">
                        <p className="text-xl md:text-2xl text-gray-300 font-light">
                            Discover vibrant color strains bred for quality and health
                        </p>
                        <p className="text-lg md:text-xl text-gray-400">
                            From beginner-friendly Cherry Shrimp to premium Show Grade specimens
                        </p>
                    </motion.div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16">
                        <motion.button
                            variants={buttonVariants}
                            onClick={() => scrollToSection('shrimps')}
                            className="btn-primary w-full sm:w-auto group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <span className="flex items-center justify-center space-x-2 relative z-10">
                                <span>View Strains</span>
                                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </motion.button>

                        <motion.button
                            variants={buttonVariants}
                            onClick={() => scrollToSection('care')}
                            className="btn-secondary w-full sm:w-auto group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <span className="flex items-center justify-center space-x-2 relative z-10">
                                <span>Care Guide</span>
                                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-[-2px]" fill="none" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </span>
                        </motion.button>
                    </div>

                    {/* Trust badges - Added mb-20 */}
                    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-20">
                        {trustBadges.map((badge, index) => (
                            <motion.div
                                key={badge.text}
                                variants={buttonVariants}
                                className="flex items-center space-x-3 text-gray-300 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors duration-300"
                            >
                                <div className="w-8 h-8 bg-gradient-to-br from-neon-violet/20 to-neon-cyan/20 rounded-full flex items-center justify-center border border-neon-violet/30 shadow-glow-sm">
                                    <span className="text-neon-violet font-bold text-sm">{badge.icon}</span>
                                </div>
                                <span className="text-sm font-medium tracking-wide">{badge.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Scroll indicator - Moved to bottom-4 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 4.5 }}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                >
                    <div className="flex flex-col items-center space-y-2 text-gray-500">
                        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-neon-violet/50 to-transparent"></div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
