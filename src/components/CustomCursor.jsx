import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform, animate } from 'framer-motion';
import { useReducedMotion } from '../hooks/useCustomHooks';

const CustomCursor = () => {
    const prefersReducedMotion = useReducedMotion();
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    // Smooth cursor movement for ring
    const cursorX = useSpring(0, { stiffness: 400, damping: 40 });
    const cursorY = useSpring(0, { stiffness: 400, damping: 40 });

    useEffect(() => {
        if (prefersReducedMotion) return;

        const moveCursor = async (e) => {
            const { clientX: x, clientY: y } = e;
            setMousePosition({ x, y });
            cursorX.set(x);
            cursorY.set(y);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleHover = (e) => {
            // Check if hovering interactive element
            const target = e.target.closest('a, button, input, select, textarea, [class*="card"]');
            setIsHovering(!!target);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleHover);
        window.addEventListener('mouseout', handleHover); // Important to catch leaving

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleHover);
            window.removeEventListener('mouseout', handleHover);
        };
    }, [cursorX, cursorY, prefersReducedMotion]);

    if (prefersReducedMotion) return null;

    return (
        <div className="hidden lg:block pointer-events-none fixed top-0 left-0 z-50 mix-blend-difference">
            {/* Small Inner Dot */}
            <motion.div
                className="fixed bg-white rounded-full w-2 h-2"
                style={{
                    left: 0,
                    top: 0,
                    x: mousePosition.x - 4, // Center on cursor
                    y: mousePosition.y - 4,
                }}
                animate={{
                    scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
                    opacity: isHovering ? 1 : 0.8
                }}
                transition={{ duration: 0.15 }}
            />

            {/* Following Ring - Slight Lag from Spring */}
            <motion.div
                className="fixed border border-white rounded-full w-8 h-8"
                style={{
                    left: 0,
                    top: 0,
                    x: useTransform(cursorX, (raw) => raw - 16), // Center 32px
                    y: useTransform(cursorY, (raw) => raw - 16),
                }}
                animate={{
                    scale: isClicking ? 0.9 : isHovering ? 1.8 : 1,
                    opacity: isHovering ? 1 : 0.5,
                    borderWidth: isHovering ? '1px' : '1px'
                }}
                transition={{ duration: 0.2 }}
            />
        </div>
    );
};

export default CustomCursor;
