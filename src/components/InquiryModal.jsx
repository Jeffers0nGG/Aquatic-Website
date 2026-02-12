import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatInquiryMessage, copyToClipboard } from '../utils/helpers';
import { useBodyScrollLock, useReducedMotion } from '../hooks/useCustomHooks';

const InquiryModal = ({ isOpen, onClose, selectedShrimp = null }) => {
    const prefersReducedMotion = useReducedMotion();
    useBodyScrollLock(isOpen);

    const [formData, setFormData] = useState({
        name: '',
        contactMethod: 'Messenger', // Messenger, Email, WhatsApp
        message: '',
        strain: '',
        quantity: '10+1',
        location: '',
        isPickup: true,
    });

    const [isCopied, setIsCopied] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (selectedShrimp) {
            setFormData(prev => ({ ...prev, strain: selectedShrimp.name }));
        }
    }, [selectedShrimp]);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.strain.trim()) newErrors.strain = 'Strain is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const message = formatInquiryMessage(formData);
        const success = copyToClipboard(message);

        if (success) {
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
                onClose();
            }, 2000);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

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
                        className="relative w-full max-w-lg bg-navy-900 border border-white/10 rounded-2xl shadow-glass overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-navy-950/50">
                            <h3 className="heading-md">Shrimp Inquiry</h3>
                            <button
                                onClick={onClose}
                                className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Form */}
                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            {isCopied ? (
                                <div className="flex flex-col items-center justify-center py-10 text-center">
                                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 text-green-400">
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-2">Message Copied!</h4>
                                    <p className="text-gray-400">
                                        Your inquiry details have been copied to your clipboard.
                                        <br />
                                        Paste it into {formData.contactMethod} to send it to us.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Your Name *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className={`input-field ${errors.name ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                                                placeholder="John Doe"
                                            />
                                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                        </div>

                                        <div className="col-span-2 sm:col-span-1">
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Contact Method</label>
                                            <select
                                                name="contactMethod"
                                                value={formData.contactMethod}
                                                onChange={handleChange}
                                                className="input-field appearance-none"
                                            >
                                                <option value="Messenger" className="bg-navy-900">Messenger</option>
                                                <option value="Email" className="bg-navy-900">Email</option>
                                                <option value="WhatsApp" className="bg-navy-900">WhatsApp</option>
                                                <option value="SMS" className="bg-navy-900">SMS</option>
                                            </select>
                                        </div>

                                        <div className="col-span-2 sm:col-span-1">
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Quantity</label>
                                            <select
                                                name="quantity"
                                                value={formData.quantity}
                                                onChange={handleChange}
                                                className="input-field appearance-none"
                                            >
                                                <option value="5" className="bg-navy-900">5 Pack</option>
                                                <option value="10+1" className="bg-navy-900">10 + 1 Pack</option>
                                                <option value="20+2" className="bg-navy-900">20 + 2 Pack</option>
                                                <option value="Breeder Pack" className="bg-navy-900">Breeder Pack (50)</option>
                                            </select>
                                        </div>

                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Interested Strain *</label>
                                            <input
                                                type="text"
                                                name="strain"
                                                value={formData.strain}
                                                onChange={handleChange}
                                                className={`input-field ${errors.strain ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                                                placeholder="e.g. Red Cherry"
                                            />
                                            {errors.strain && <p className="text-red-500 text-xs mt-1">{errors.strain}</p>}
                                        </div>

                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Location / Pickup Area</label>
                                            <input
                                                type="text"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleChange}
                                                className="input-field"
                                                placeholder="Your general area"
                                            />
                                        </div>

                                        <div className="col-span-2">
                                            <label className="flex items-center space-x-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="isPickup"
                                                    checked={formData.isPickup}
                                                    onChange={handleChange}
                                                    className="w-4 h-4 rounded text-neon-violet focus:ring-neon-violet bg-white/10 border-transparent"
                                                />
                                                <span className="text-sm text-gray-300">I can pick up locally</span>
                                            </label>
                                        </div>

                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Message (Optional)</label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                className="input-field h-24 resize-none"
                                                placeholder="Any specific questions or preferred pickup time?"
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <button type="submit" className="btn-primary w-full shadow-glow-md">
                                            Copy Inquiry to Clipboard
                                        </button>
                                        <p className="text-center text-xs text-gray-500 mt-3">
                                            We don't store your data. This simply formats a message for you to send.
                                        </p>
                                    </div>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default InquiryModal;
