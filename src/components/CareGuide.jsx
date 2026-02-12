import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView, useReducedMotion } from '../hooks/useCustomHooks';

const CareGuide = () => {
    const [ref, isInView] = useInView({ threshold: 0.1 });
    const prefersReducedMotion = useReducedMotion();
    const [openIndex, setOpenIndex] = useState(0);

    const careTopics = [
        {
            title: 'Water Parameters',
            icon: '💧',
            content: 'Neocaridina are adaptable but thrive in stable conditions. Maintain temperature between 65-78°F (18-26°C), pH 6.5-8.0, GH 4-8, KH 3-15, and TDS 150-250 ppm. Stability is more important than exact values. Avoid sudden parameter swings and use a drip acclimation method when introducing new shrimp.',
        },
        {
            title: 'Tank Cycling',
            icon: '🔄',
            content: 'A fully cycled tank is essential before adding shrimp. Cycle for 4-6 weeks to establish beneficial bacteria that convert ammonia to nitrite and then to nitrate. Test water regularly during cycling. Ammonia and nitrite should read 0 ppm before adding shrimp. Consider using live plants to help stabilize parameters.',
        },
        {
            title: 'Feeding',
            icon: '🍃',
            content: 'Shrimp are scavengers and need minimal feeding. Offer specialized shrimp pellets, blanched vegetables (zucchini, spinach, cucumber), or algae wafers 2-3 times per week. Remove uneaten food after 2-3 hours to prevent water quality issues. Biofilm and algae in the tank provide natural food sources.',
        },
        {
            title: 'Molting',
            icon: '🦐',
            content: 'Shrimp molt regularly to grow, shedding their exoskeleton every 3-4 weeks. During molting, they hide and appear vulnerable. Never remove molted shells - shrimp eat them to replenish calcium. Ensure adequate minerals (GH) in water for healthy molts. White ring of death indicates molting problems, often from parameter instability.',
        },
        {
            title: 'Breeding',
            icon: '💕',
            content: 'Neocaridina breed readily in good conditions. Females carry 20-30 eggs under their tail for 3-4 weeks. Provide hiding spots for berried females and shrimplets. Baby shrimp are miniature adults and need no special care. Maintain stable parameters and avoid aggressive tank mates. Colony growth is exponential with proper care.',
        },
        {
            title: 'Tank Setup',
            icon: '🏠',
            content: 'Minimum 5 gallons recommended, though 10+ is ideal for stability. Use sponge filters or cover intake tubes to protect shrimplets. Add plenty of plants (Java moss, Java fern, Anubias) for grazing and hiding. Use inert substrate or buffered soil. Include driftwood and leaf litter for biofilm growth. Avoid copper-based medications.',
        },
        {
            title: 'Common Issues',
            icon: '⚠️',
            content: 'Common problems include: parameter swings (acclimate slowly), failed molts (check GH/KH), white ring of death (parameter shock), bacterial infections (maintain water quality), and planaria (avoid overfeeding). If shrimp are inactive or hiding, test water immediately. Healthy shrimp are active, colorful, and constantly grazing.',
        },
    ];

    const parameters = [
        { name: 'Temperature', value: '65-78°F', icon: '🌡️', color: 'text-orange-400' },
        { name: 'pH', value: '6.5-8.0', icon: '⚗️', color: 'text-blue-400' },
        { name: 'GH', value: '4-8', icon: '💎', color: 'text-purple-400' },
        { name: 'KH', value: '3-15', icon: '🔷', color: 'text-cyan-400' },
        { name: 'TDS', value: '150-250', icon: '📊', color: 'text-green-400' },
    ];

    const checklist = [
        'Tank fully cycled (4-6 weeks)',
        'Ammonia and nitrite at 0 ppm',
        'Stable water parameters',
        'Sponge filter or protected intake',
        'Live plants established',
        'Hiding spots available',
        'No copper in water',
        'Drip acclimation prepared',
    ];

    return (
        <section id="care" ref={ref} className="section-padding bg-navy-950/30">
            <div className="container-custom">
                {/* Section header */}
                <motion.div
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="heading-lg mb-4">Care Guide</h2>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        Everything you need to know to keep your Neocaridina shrimp healthy and thriving.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left column - Parameters and checklist */}
                    <div className="space-y-6">
                        {/* Parameter chips */}
                        <motion.div
                            initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="card"
                        >
                            <h3 className="text-lg font-semibold text-white mb-4">Ideal Parameters</h3>
                            <div className="space-y-3">
                                {parameters.map((param) => (
                                    <div key={param.name} className="flex items-center justify-between p-3 glass rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-2xl">{param.icon}</span>
                                            <span className="text-gray-300 font-medium">{param.name}</span>
                                        </div>
                                        <span className={`font-bold ${param.color}`}>{param.value}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Quick checklist */}
                        <motion.div
                            initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="card"
                        >
                            <h3 className="text-lg font-semibold text-white mb-4">Setup Checklist</h3>
                            <div className="space-y-2">
                                {checklist.map((item, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <div className="w-5 h-5 rounded border-2 border-neon-violet flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg className="w-3 h-3 text-neon-violet" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-sm text-gray-300">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right column - Accordion */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="space-y-4"
                        >
                            {careTopics.map((topic, index) => (
                                <div key={index} className="card">
                                    <button
                                        onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                                        className="w-full flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-neon-violet rounded-lg p-2 -m-2"
                                        aria-expanded={openIndex === index}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-neon-violet/20 to-neon-cyan/20 rounded-xl flex items-center justify-center text-2xl">
                                                {topic.icon}
                                            </div>
                                            <h3 className="text-lg font-semibold text-white">{topic.title}</h3>
                                        </div>
                                        <svg
                                            className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                                                }`}
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    <AnimatePresence>
                                        {openIndex === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-4 mt-4 border-t border-white/10">
                                                    <p className="text-gray-300 leading-relaxed">{topic.content}</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CareGuide;
