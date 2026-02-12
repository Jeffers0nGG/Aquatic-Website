import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqData } from '../data/shrimpData';
import { useInView, useReducedMotion } from '../hooks/useCustomHooks';

const FAQ = () => {
    const [ref, isInView] = useInView({ threshold: 0.1 });
    const prefersReducedMotion = useReducedMotion();
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section id="faq" ref={ref} className="section-padding">
            <div className="container-custom max-w-4xl">
                {/* Section header */}
                <motion.div
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="heading-lg mb-4">Frequently Asked Questions</h2>
                    <p className="text-lg text-gray-400">
                        Find answers to common questions about our shrimp, care, and purchasing process.
                    </p>
                </motion.div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <motion.div
                            key={faq.id}
                            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.05 }}
                            className="card"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-start justify-between text-left focus:outline-none focus:ring-2 focus:ring-neon-violet rounded-lg p-2 -m-2"
                                aria-expanded={openIndex === index}
                            >
                                <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                                <svg
                                    className={`w-6 h-6 text-gray-400 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
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
                                            <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Still have questions CTA */}
                <motion.div
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-12 text-center"
                >
                    <div className="card bg-gradient-to-br from-neon-violet/10 to-neon-cyan/10 border border-neon-violet/30">
                        <h3 className="text-xl font-semibold text-white mb-2">Still have questions?</h3>
                        <p className="text-gray-400 mb-6">
                            We're here to help! Reach out through our contact form below.
                        </p>
                        <button
                            onClick={() => {
                                const contactSection = document.getElementById('contact');
                                if (contactSection) {
                                    contactSection.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                            className="btn-primary"
                        >
                            Contact Us
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;
