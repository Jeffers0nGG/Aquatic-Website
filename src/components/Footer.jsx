import React from 'react';
import { scrollToSection } from '../utils/helpers';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        navigation: [
            { label: 'Home', id: 'hero' },
            { label: 'Shrimps', id: 'shrimps' },
            { label: 'Grades', id: 'grades' },
            { label: 'Care Guide', id: 'care' },
        ],
        resources: [
            { label: 'Gallery', id: 'gallery' },
            { label: 'Reviews', id: 'reviews' },
            { label: 'FAQ', id: 'faq' },
            { label: 'Contact', id: 'contact' },
        ],
    };

    const socialLinks = [
        {
            name: 'Facebook',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
            ),
        },
        {
            name: 'Instagram',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
            ),
        },
        {
            name: 'YouTube',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
            ),
        },
    ];

    return (
        <footer className="bg-navy-950 border-t border-white/10">
            <div className="container-custom px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand column */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-neon-violet to-neon-cyan rounded-lg flex items-center justify-center shadow-glow-sm">
                                <span className="text-2xl">🦐</span>
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-white to-neon-violet bg-clip-text text-transparent">
                                NeoShrimp
                            </span>
                        </div>
                        <p className="text-gray-400 mb-4 max-w-md">
                            Premium Neocaridina shrimp for aquarium enthusiasts. We specialize in vibrant, healthy specimens with expert care guidance and local availability.
                        </p>
                        {/* Social links */}
                        <div className="flex space-x-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href="#"
                                    className="w-10 h-10 glass-strong rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neon-violet"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation column */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Navigation</h3>
                        <ul className="space-y-2">
                            {footerLinks.navigation.map((link) => (
                                <li key={link.id}>
                                    <button
                                        onClick={() => scrollToSection(link.id)}
                                        className="text-gray-400 hover:text-white transition-colors duration-300 focus:outline-none focus:text-neon-violet"
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources column */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            {footerLinks.resources.map((link) => (
                                <li key={link.id}>
                                    <button
                                        onClick={() => scrollToSection(link.id)}
                                        className="text-gray-400 hover:text-white transition-colors duration-300 focus:outline-none focus:text-neon-violet"
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="pt-8 border-t border-white/10">
                    <div className="p-4 glass rounded-lg mb-6">
                        <h4 className="text-white font-semibold text-sm mb-2">Water Parameter Disclaimer</h4>
                        <p className="text-gray-400 text-xs leading-relaxed">
                            All water parameter recommendations are guidelines based on general best practices for Neocaridina shrimp. Individual results may vary based on your specific setup, water source, and local conditions. Always acclimate new livestock slowly and monitor parameters regularly. We are not responsible for livestock losses due to parameter incompatibility or improper acclimation.
                        </p>
                    </div>

                    {/* Copyright */}
                    <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
                        <p>© {currentYear} NeoShrimp. All rights reserved.</p>
                        <p className="mt-2 md:mt-0">
                            Made with <span className="text-red-400">♥</span> for shrimp keepers
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
