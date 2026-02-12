import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getImagePath, getGradientPlaceholder } from '../utils/helpers';
import { useBodyScrollLock, useReducedMotion } from '../hooks/useCustomHooks';

const ProductDetailModal = ({ shrimp, isOpen, onClose, onInquire }) => {
    const prefersReducedMotion = useReducedMotion();
    useBodyScrollLock(isOpen);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!shrimp) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-navy-950/80 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={prefersReducedMotion ? {} : { scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full max-w-4xl bg-navy-900 border border-white/10 rounded-2xl shadow-glass overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 bg-navy-950/50 hover:bg-white/10 rounded-full text-white transition-colors duration-200"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Left: Image Gallery */}
                        <div className="md:w-1/2 relative bg-navy-950 flex flex-col items-center justify-center p-6">
                            <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4 shadow-lg">
                                <img
                                    src={getImagePath(shrimp.image)}
                                    alt={shrimp.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent pointer-events-none"></div>
                            </div>

                            {/* Thumbnails (Simulated) */}
                            <div className="flex space-x-2 overflow-x-auto w-full py-2">
                                {[1, 2, 3].map((i) => (
                                    <button
                                        key={i}
                                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${i === 1 ? 'border-neon-violet' : 'border-transparent hover:border-white/30'
                                            }`}
                                    >
                                        <img
                                            src={getImagePath(shrimp.image)}
                                            alt={`View ${i}`}
                                            className="w-full h-full object-cover opacity-80 hover:opacity-100"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right: Details */}
                        <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto custom-scrollbar">
                            <div className="mb-6">
                                <div className="flex items-center space-x-3 mb-2">
                                    <span className="px-2 py-1 text-xs font-semibold bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 rounded">
                                        {shrimp.grade || 'Standard Grade'}
                                    </span>
                                    {shrimp.featured && (
                                        <span className="px-2 py-1 text-xs font-semibold bg-neon-purple/10 text-neon-purple border border-neon-purple/20 rounded">
                                            Featured
                                        </span>
                                    )}
                                </div>
                                <h2 className="heading-md mb-1">{shrimp.name}</h2>
                                <p className="text-gray-400 italic text-sm">{shrimp.scientificName}</p>
                            </div>

                            <div className="space-y-6">
                                {/* Price & Action */}
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                    <div>
                                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Price Range</p>
                                        <p className="text-2xl font-bold text-white">{shrimp.priceRange}</p>
                                    </div>
                                    <button
                                        onClick={() => onInquire(shrimp)}
                                        className="btn-primary"
                                    >
                                        Inquire Now
                                    </button>
                                </div>

                                {/* Description */}
                                <div>
                                    <h3 className="text-white font-semibold mb-2">Description</h3>
                                    <p className="text-gray-300 leading-relaxed text-sm">
                                        {shrimp.description}
                                    </p>
                                </div>

                                {/* Specifications Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                                        <span className="block text-gray-500 text-xs mb-1">Color</span>
                                        <span className="text-white font-medium">{shrimp.color}</span>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                                        <span className="block text-gray-500 text-xs mb-1">Size</span>
                                        <span className="text-white font-medium">{shrimp.sizeRange}</span>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                                        <span className="block text-gray-500 text-xs mb-1">Lifespan</span>
                                        <span className="text-white font-medium">1 - 2 years</span>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                                        <span className="block text-gray-500 text-xs mb-1">Difficulty</span>
                                        <span className="text-white font-medium">{shrimp.difficulty}</span>
                                    </div>
                                </div>

                                {/* Parameters */}
                                <div>
                                    <h3 className="text-white font-semibold mb-3">Water Parameters</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between py-2 border-b border-white/5">
                                            <span className="text-gray-400">Temperature</span>
                                            <span className="text-white font-medium">{shrimp.tankRequirements?.temperature || '68° - 78° F'}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-white/5">
                                            <span className="text-gray-400">pH</span>
                                            <span className="text-white font-medium">{shrimp.tankRequirements?.ph || '6.5 - 7.5'}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-white/5">
                                            <span className="text-gray-400">GH</span>
                                            <span className="text-white font-medium">{shrimp.tankRequirements?.gh || '6 - 8 dGH'}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-white/5">
                                            <span className="text-gray-400">KH</span>
                                            <span className="text-white font-medium">{shrimp.tankRequirements?.kh || '2 - 4 dKH'}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-white/5">
                                            <span className="text-gray-400">TDS</span>
                                            <span className="text-white font-medium">{shrimp.tankRequirements?.tds || '150 - 250'}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Compatibility */}
                                <div>
                                    <h3 className="text-white font-semibold mb-2">Compatibility</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {shrimp.compatibility && shrimp.compatibility.map((mate) => (
                                            <span key={mate} className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-200 border border-white/10">
                                                {mate}
                                            </span>
                                        ))}
                                        {!shrimp.compatibility && (
                                            <span className="text-gray-400 text-sm">Safe with peaceful nano fish and snails.</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProductDetailModal;
