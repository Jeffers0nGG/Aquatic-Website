import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useCustomHooks';

const SectionWrapper = ({ children, id, className = '', delay = 0 }) => {
    const prefersReducedMotion = useReducedMotion();

    const containerVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            filter: 'blur(4px)'
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1], // easeOutQuart or similar 
                staggerChildren: 0.1,
                delayChildren: 0.2 + delay
            }
        }
    };

    return (
        <motion.section
            id={id}
            className={`relative overflow-hidden ${className}`}
            initial={prefersReducedMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={containerVariants}
        >
            {/* Content */}
            <div className="relative z-10 w-full">
                {children}
            </div>

            {/* Highlight Sweep Line */}
            {!prefersReducedMotion && (
                <motion.div
                    initial={{ left: '-10%', opacity: 0 }}
                    whileInView={{
                        left: '120%',
                        opacity: [0, 1, 0]
                    }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                        delay: 0.3
                    }}
                    className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-white/30 to-transparent transform skew-x-12 pointer-events-none z-20"
                    style={{ willChange: 'left, opacity' }}
                />
            )}
        </motion.section>
    );
};

export default SectionWrapper;
