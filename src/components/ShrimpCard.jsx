import React from 'react';
import { motion } from 'framer-motion';
import { getImagePath, getGradientPlaceholder } from '../utils/helpers';
import { useReducedMotion } from '../hooks/useCustomHooks';

const ShrimpCard = ({ shrimp, onViewDetails, onInquire }) => {
    const prefersReducedMotion = useReducedMotion();
    const imageSrc = shrimp.image ? getImagePath(shrimp.image) : null;

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Beginner Friendly':
                return 'text-green-400 bg-green-400/10 border-green-400/30';
            case 'Intermediate':
                return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
            case 'Advanced':
                return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
            default:
                return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
        }
    };

    const getAvailabilityColor = (availability) => {
        return availability === 'In Stock'
            ? 'text-neon-cyan bg-neon-cyan/10 border-neon-cyan/30'
            : 'text-orange-400 bg-orange-400/10 border-orange-400/30';
    };

    return (
        <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            whileHover={prefersReducedMotion ? {} : { y: -8 }}
            className="card group cursor-pointer h-full flex flex-col"
        >
            {/* Image container */}
            <div className="relative overflow-hidden rounded-lg mb-4 aspect-[4/3] bg-navy-900">
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt={shrimp.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />
                ) : (
                    <div
                        className="w-full h-full"
                        style={{ background: getGradientPlaceholder(shrimp.color) }}
                    />
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                    <div className="text-center space-y-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-sm text-gray-300">Quick Facts</p>
                        <div className="flex items-center justify-center space-x-4 text-xs">
                            <span className="flex items-center space-x-1">
                                <svg className="w-4 h-4 text-neon-violet" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z" />
                                </svg>
                                <span>{shrimp.tankRequirements.minSize}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                                <svg className="w-4 h-4 text-neon-cyan" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                <span>{shrimp.temperament}</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {shrimp.featured && (
                        <span className="px-2 py-1 bg-gradient-to-r from-neon-violet to-neon-purple text-white text-xs font-semibold rounded shadow-glow-sm">
                            Featured
                        </span>
                    )}
                    {shrimp.newest && (
                        <span className="px-2 py-1 bg-neon-cyan/90 text-navy-950 text-xs font-semibold rounded">
                            New
                        </span>
                    )}
                </div>

                {/* Availability badge */}
                <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded border ${getAvailabilityColor(shrimp.availability)}`}>
                        {shrimp.availability}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
                <div className="mb-3">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-neon-violet transition-colors duration-300">
                        {shrimp.name}
                    </h3>
                    <p className="text-sm text-gray-400 italic">{shrimp.scientificName}</p>
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div>
                        <span className="text-gray-500 block text-xs mb-1">Grade</span>
                        <span className="text-white font-medium">{shrimp.grade}</span>
                    </div>
                    <div>
                        <span className="text-gray-500 block text-xs mb-1">Color</span>
                        <span className="text-white font-medium">{shrimp.color}</span>
                    </div>
                    <div>
                        <span className="text-gray-500 block text-xs mb-1">Size</span>
                        <span className="text-white font-medium">{shrimp.sizeRange}</span>
                    </div>
                    <div>
                        <span className="text-gray-500 block text-xs mb-1">Difficulty</span>
                        <span className={`text-xs px-2 py-1 rounded border font-medium ${getDifficultyColor(shrimp.difficulty)}`}>
                            {shrimp.difficulty.replace(' Friendly', '')}
                        </span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {shrimp.description}
                </p>

                {/* Price */}
                <div className="mb-4">
                    <span className="text-2xl font-bold bg-gradient-to-r from-neon-violet to-neon-cyan bg-clip-text text-transparent">
                        {shrimp.priceRange}
                    </span>
                    <span className="text-gray-500 text-sm ml-2">per shrimp</span>
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-3 mt-auto">
                    <button
                        onClick={() => onViewDetails(shrimp)}
                        className="px-4 py-2 glass-strong rounded-lg text-sm font-medium text-white hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neon-violet"
                    >
                        View Details
                    </button>
                    <button
                        onClick={() => onInquire(shrimp)}
                        className="px-4 py-2 bg-gradient-to-r from-neon-violet to-neon-purple rounded-lg text-sm font-semibold text-white shadow-glow-sm hover:shadow-glow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neon-violet"
                    >
                        Inquire
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ShrimpCard;
