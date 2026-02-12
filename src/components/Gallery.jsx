import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryImages } from '../data/shrimpData';
import { getImagePath } from '../utils/helpers';
import { useInView, useReducedMotion, useBodyScrollLock } from '../hooks/useCustomHooks';

const Gallery = () => {
    const [ref, isInView] = useInView({ threshold: 0.1 });
    const prefersReducedMotion = useReducedMotion();
    const [lightboxImage, setLightboxImage] = useState(null);
    useBodyScrollLock(lightboxImage !== null);

    const handleImageClick = (image) => {
        setLightboxImage(image);
    };

    const closeLightbox = () => {
        setLightboxImage(null);
    };

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') closeLightbox();
        };
        if (lightboxImage) {
            document.addEventListener('keydown', handleEscape);
        }
        return () => document.removeEventListener('keydown', handleEscape);
    }, [lightboxImage]);

    return (
        <section id="gallery" ref={ref} className="section-padding">
            <div className="container-custom">
                {/* Section header */}
                <motion.div
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="heading-lg mb-4">Gallery</h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Explore our collection through stunning photography. Click any image to view full size.
                    </p>
                </motion.div>

                {/* Masonry grid */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={image.id}
                            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="break-inside-avoid group cursor-pointer"
                            onClick={() => handleImageClick(image)}
                        >
                            <div className="relative overflow-hidden rounded-xl shadow-glass hover:shadow-glow-md transition-all duration-300">
                                <img
                                    src={getImagePath(image.src)}
                                    alt={image.alt}
                                    className="w-full h-auto transform group-hover:scale-110 transition-transform duration-500"
                                    loading="lazy"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <span className="inline-block px-3 py-1 bg-neon-violet/90 text-white text-sm font-semibold rounded-full">
                                            {image.strain}
                                        </span>
                                    </div>
                                </div>
                                {/* Zoom icon */}
                                <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <svg className="w-5 h-5 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Lightbox */}
                <AnimatePresence>
                    {lightboxImage && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={closeLightbox}
                                className="fixed inset-0 bg-navy-950/95 backdrop-blur-lg z-50 flex items-center justify-center p-4"
                            >
                                {/* Close button */}
                                <button
                                    onClick={closeLightbox}
                                    className="absolute top-4 right-4 p-3 glass-strong rounded-full hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neon-violet z-10"
                                    aria-label="Close lightbox"
                                >
                                    <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                {/* Image */}
                                <motion.div
                                    initial={prefersReducedMotion ? {} : { scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="max-w-5xl w-full"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <img
                                        src={getImagePath(lightboxImage.src)}
                                        alt={lightboxImage.alt}
                                        className="w-full h-auto rounded-xl shadow-glow-lg"
                                    />
                                    <div className="mt-4 text-center">
                                        <span className="inline-block px-4 py-2 glass-strong text-white font-semibold rounded-lg">
                                            {lightboxImage.strain}
                                        </span>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

// Add useEffect import
import { useEffect } from 'react';

export default Gallery;
