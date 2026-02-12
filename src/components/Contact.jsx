import React from 'react';
import { motion } from 'framer-motion';
import InquiryModal from './InquiryModal';
import { useInView, useReducedMotion } from '../hooks/useCustomHooks';

const Contact = ({ isInquiryOpen, setIsInquiryOpen }) => {
    const [ref, isInView] = useInView({ threshold: 0.1 });
    const prefersReducedMotion = useReducedMotion();

    const contactMethods = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: 'Email',
            value: 'aciojenan@gmail.com',
            description: 'Send us an email anytime',
            link: 'mailto:aciojenan@gmail.com'
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
            ),
            title: 'Facebook',
            value: 'Jeffers0n Aquatics',
            description: 'Message us on Messenger',
            link: 'https://www.facebook.com/jeffers0ngg2f4st'
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: 'Location',
            value: 'Antipolo City, Philippines',
            description: 'Local pickup available',
            link: 'https://maps.google.com/?q=Antipolo+City+Philippines'
        },
    ];

    return (
        <>
            <section id="contact" ref={ref} className="section-padding bg-navy-950/30">
                <div className="container-custom">
                    {/* Section header */}
                    <motion.div
                        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="heading-lg mb-4">Get in Touch</h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Ready to start your shrimp keeping journey? We're here to help with any questions or inquiries.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Left column - Contact info */}
                        <motion.div
                            initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="space-y-6"
                        >
                            <div>
                                <h3 className="heading-sm mb-4">Contact Information</h3>
                                <p className="text-gray-400 mb-6">
                                    Choose your preferred method to reach out. We typically respond within 24 hours.
                                </p>
                            </div>

                            {/* Contact methods */}
                            <div className="space-y-4">
                                {contactMethods.map((method, index) => (
                                    <div key={method.title} className="card flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-neon-violet/20 to-neon-cyan/20 rounded-xl flex items-center justify-center text-neon-violet flex-shrink-0">
                                            {method.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white mb-1">{method.title}</h4>
                                            {method.link ? (
                                                <a href={method.link} target="_blank" rel="noopener noreferrer" className="text-neon-cyan font-medium mb-1 hover:underline block">
                                                    {method.value}
                                                </a>
                                            ) : (
                                                <p className="text-neon-cyan font-medium mb-1">{method.value}</p>
                                            )}
                                            <p className="text-sm text-gray-400">{method.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Hours */}
                            <div className="card">
                                <h4 className="font-semibold text-white mb-3">Pickup Hours</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Monday - Friday</span>
                                        <span className="text-white">By Appointment</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Saturday - Sunday</span>
                                        <span className="text-white">10:00 AM - 6:00 PM</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right column - Quick inquiry */}
                        <motion.div
                            initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="card"
                        >
                            <h3 className="heading-sm mb-6">Quick Inquiry</h3>
                            <p className="text-gray-400 mb-6">
                                Click the button below to open our inquiry form. Your message will be copied to clipboard for easy sharing via your preferred contact method.
                            </p>

                            <button
                                onClick={() => setIsInquiryOpen(true)}
                                className="btn-primary w-full mb-6"
                            >
                                <span className="flex items-center justify-center space-x-2">
                                    <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                    <span>Open Inquiry Form</span>
                                </span>
                            </button>

                            {/* Info boxes */}
                            <div className="space-y-4">
                                <div className="p-4 glass rounded-lg border-l-4 border-neon-cyan">
                                    <div className="flex items-start space-x-3">
                                        <svg className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        <div>
                                            <h5 className="font-semibold text-white text-sm mb-1">No Data Storage</h5>
                                            <p className="text-xs text-gray-400">
                                                We don't store your information. The form simply formats your inquiry for you to send.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 glass rounded-lg border-l-4 border-neon-violet">
                                    <div className="flex items-start space-x-3">
                                        <svg className="w-5 h-5 text-neon-violet flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                        </svg>
                                        <div>
                                            <h5 className="font-semibold text-white text-sm mb-1">Quick Response</h5>
                                            <p className="text-xs text-gray-400">
                                                We aim to respond to all inquiries within 24 hours during business days.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Inquiry Modal */}
            <InquiryModal
                isOpen={isInquiryOpen}
                onClose={() => setIsInquiryOpen(false)}
            />
        </>
    );
};

export default Contact;
