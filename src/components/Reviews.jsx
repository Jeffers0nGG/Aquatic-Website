import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../data/shrimpData';
import { useInView, useReducedMotion } from '../hooks/useCustomHooks';

const Reviews = () => {
    const [ref, isInView] = useInView({ threshold: 0.1 });
    const prefersReducedMotion = useReducedMotion();
    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    const StarRating = ({ rating }) => {
        return (
            <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
        );
    };

    return (
        <section id="reviews" ref={ref} className="section-padding bg-navy-950/30">
            <div className="container-custom">
                {/* Section header */}
                <motion.div
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="heading-lg mb-4">Customer Reviews</h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Hear from our satisfied customers about their experience with our shrimp and service.
                    </p>
                </motion.div>

                {/* Carousel container */}
                <div className="relative">
                    {/* Left scroll button */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 glass-strong rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neon-violet hidden md:flex"
                        aria-label="Scroll left"
                    >
                        <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Right scroll button */}
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 glass-strong rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neon-violet hidden md:flex"
                        aria-label="Scroll right"
                    >
                        <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Scrollable container */}
                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 scrollbar-hide"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.id}
                                initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="card min-w-[350px] md:min-w-[400px] snap-start flex-shrink-0"
                            >
                                {/* Rating */}
                                <div className="mb-4">
                                    <StarRating rating={testimonial.rating} />
                                </div>

                                {/* Review text */}
                                <p className="text-gray-300 mb-6 leading-relaxed">
                                    "{testimonial.text}"
                                </p>

                                {/* Author info */}
                                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                    <div>
                                        <p className="font-semibold text-white">{testimonial.name}</p>
                                        <p className="text-sm text-gray-500">{testimonial.date}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-gradient-to-br from-neon-violet to-neon-cyan rounded-full flex items-center justify-center text-white font-bold text-lg">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <motion.div
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
                >
                    <div className="card text-center">
                        <div className="text-4xl font-bold bg-gradient-to-r from-neon-violet to-neon-cyan bg-clip-text text-transparent mb-2">
                            500+
                        </div>
                        <p className="text-gray-400">Happy Customers</p>
                    </div>
                    <div className="card text-center">
                        <div className="text-4xl font-bold bg-gradient-to-r from-neon-violet to-neon-cyan bg-clip-text text-transparent mb-2">
                            5.0
                        </div>
                        <p className="text-gray-400">Average Rating</p>
                    </div>
                    <div className="card text-center">
                        <div className="text-4xl font-bold bg-gradient-to-r from-neon-violet to-neon-cyan bg-clip-text text-transparent mb-2">
                            98%
                        </div>
                        <p className="text-gray-400">Satisfaction Rate</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Reviews;
