import React from 'react';
import { motion } from 'framer-motion';
import { useInView, useReducedMotion } from '../hooks/useCustomHooks';

const GradesSection = () => {
    const [ref, isInView] = useInView({ threshold: 0.1 });
    const prefersReducedMotion = useReducedMotion();

    const grades = [
        {
            name: 'Standard',
            level: 1,
            description: 'Light to moderate coloration. Great for beginners and breeding projects.',
            color: 'from-gray-400 to-gray-500',
            features: ['Affordable', 'Hardy', 'Good breeders'],
        },
        {
            name: 'Sakura / High Grade',
            level: 2,
            description: 'Solid color coverage with minimal transparency. Popular choice for display tanks.',
            color: 'from-blue-400 to-blue-500',
            features: ['Vibrant color', 'Consistent quality', 'Reliable genetics'],
        },
        {
            name: 'Premium',
            level: 3,
            description: 'Deep, consistent coloration throughout the body. Excellent for serious hobbyists.',
            color: 'from-purple-400 to-purple-500',
            features: ['Intense color', 'Minimal transparency', 'Breeding quality'],
        },
        {
            name: 'Show Grade',
            level: 4,
            description: 'The highest quality. Opaque, uniform color from head to tail. Competition-worthy specimens.',
            color: 'from-neon-violet to-neon-purple',
            features: ['Competition quality', 'Perfect coloration', 'Premium genetics'],
        },
    ];

    const comparisonData = [
        { aspect: 'Color Intensity', standard: '●○○○', sakura: '●●○○', premium: '●●●○', show: '●●●●' },
        { aspect: 'Opacity', standard: '●○○○', sakura: '●●○○', premium: '●●●○', show: '●●●●' },
        { aspect: 'Price Range', standard: '$', sakura: '$$', premium: '$$$', show: '$$$$' },
        { aspect: 'Breeding Value', standard: '●●○○', sakura: '●●●○', premium: '●●●●', show: '●●●●' },
    ];

    return (
        <section id="grades" ref={ref} className="section-padding">
            <div className="container-custom">
                {/* Section header */}
                <motion.div
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="heading-lg mb-4">Understanding Shrimp Grades</h2>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        Grading reflects color intensity, coverage, and overall quality. Higher grades showcase deeper, more consistent coloration.
                    </p>
                </motion.div>

                {/* Visual grade scale */}
                <div className="mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {grades.map((grade, index) => (
                            <motion.div
                                key={grade.name}
                                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="card hover:shadow-glow-md transition-all duration-300"
                            >
                                {/* Grade indicator */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`px-4 py-2 bg-gradient-to-r ${grade.color} rounded-lg shadow-glow-sm`}>
                                        <span className="text-white font-bold text-sm">Level {grade.level}</span>
                                    </div>
                                    <div className="flex space-x-1">
                                        {[...Array(4)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`w-2 h-8 rounded-full ${i < grade.level
                                                        ? `bg-gradient-to-t ${grade.color}`
                                                        : 'bg-gray-700'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3">{grade.name}</h3>
                                <p className="text-gray-400 text-sm mb-4">{grade.description}</p>

                                {/* Features */}
                                <div className="space-y-2">
                                    {grade.features.map((feature) => (
                                        <div key={feature} className="flex items-center space-x-2 text-sm">
                                            <svg className="w-4 h-4 text-neon-cyan flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Comparison table */}
                <motion.div
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="card"
                >
                    <h3 className="heading-sm mb-6 text-center">Grade Comparison</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Aspect</th>
                                    <th className="text-center py-4 px-4 text-gray-300 font-semibold">Standard</th>
                                    <th className="text-center py-4 px-4 text-gray-300 font-semibold">Sakura</th>
                                    <th className="text-center py-4 px-4 text-gray-300 font-semibold">Premium</th>
                                    <th className="text-center py-4 px-4 text-gray-300 font-semibold">Show</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonData.map((row, index) => (
                                    <tr key={row.aspect} className={index !== comparisonData.length - 1 ? 'border-b border-white/5' : ''}>
                                        <td className="py-4 px-4 text-gray-300 font-medium">{row.aspect}</td>
                                        <td className="py-4 px-4 text-center text-gray-400">{row.standard}</td>
                                        <td className="py-4 px-4 text-center text-gray-400">{row.sakura}</td>
                                        <td className="py-4 px-4 text-center text-gray-400">{row.premium}</td>
                                        <td className="py-4 px-4 text-center text-neon-violet font-semibold">{row.show}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Info note */}
                <motion.div
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-8 p-6 glass rounded-xl border-l-4 border-neon-cyan"
                >
                    <div className="flex items-start space-x-3">
                        <svg className="w-6 h-6 text-neon-cyan flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <h4 className="font-semibold text-white mb-2">Grading Note</h4>
                            <p className="text-gray-400 text-sm">
                                Grading can vary between breeders and is somewhat subjective. Our grading reflects color intensity, opacity, and overall appearance. Even within the same grade, individual shrimp may vary slightly. Higher grades typically produce better offspring but all grades can be rewarding to keep.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default GradesSection;
