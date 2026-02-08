'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="w-full">
      <motion.section
        className="py-16 md:py-24"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={item} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-teal-100 mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-teal-300 max-w-2xl mx-auto">
              Questions about our shrimps or need breeding advice? We're here to help!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Contact Info */}
            <motion.div
              variants={container}
              className="space-y-6"
            >
              {[
                { icon: '🦐', title: 'Address', content: 'Antipolo City Philippines' },
                { icon: '📞', title: 'Phone', content: '+63 993 593 5045' },
                { icon: '📧', title: 'Email', content: 'aciojenan@gmail.com' },
                { icon: '🕐', title: 'Hours', content: 'Mon-Fri: 9AM-6PM EST\nSat-Sun: 10AM-4PM EST' },
              ].map((contact) => (
                <motion.div
                  key={contact.title}
                  variants={item}
                  className="bg-ocean-700 rounded-lg p-6 hover:bg-ocean-600 transition-colors"
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{contact.icon}</span>
                    <div>
                      <h3 className="font-serif font-bold text-teal-100 mb-1">{contact.title}</h3>
                      <p className="text-teal-300 whitespace-pre-line">{contact.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={item}>
              <form
                onSubmit={handleSubmit}
                className="bg-ocean-700 rounded-lg p-6 md:p-8"
              >
                <h2 className="text-2xl font-serif font-bold text-teal-100 mb-6">Send us a Message</h2>

                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-ocean-600 rounded-lg bg-ocean-600 text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-coral-500"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-ocean-600 rounded-lg bg-ocean-600 text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-coral-500"
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-ocean-600 rounded-lg bg-ocean-600 text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-coral-500"
                  />
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-ocean-600 rounded-lg bg-ocean-600 text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-coral-500"
                  />
                </div>

                <motion.button
                  type="submit"
                  className={`w-full mt-6 py-3 font-semibold rounded-lg transition-all ${
                    submitted
                      ? 'bg-green-600 text-white'
                      : 'bg-coral-500 hover:bg-coral-600 text-white'
                  }`}
                  whileHover={{ scale: submitted ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {submitted ? '✓ Message Sent!' : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
